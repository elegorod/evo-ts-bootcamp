import { Instant, LocalDate, LocalTime, ZoneOffset } from "@js-joda/core";
import { makeAutoObservable } from "mobx";
import { sumBy, uniqBy } from "lodash";
import PortfolioState, { Ticker } from "../portfolio/PortfolioState";
import loadCurrentPrice from "../client/CurrentPriceClient"
import { loadCandles } from "../client/CandleClient";

const MAX_CONSECUTIVE_DAYS_OFF = 5

export default class MarketState {

  currentPrices: Price[] = []
  periodInfo: PeriodInfo[] = []

  portfolioState: PortfolioState

  period = ViewPeriod.Week
  graphTicker: Ticker | undefined = "IVV"
  loading: boolean = false
  loadingError: string | undefined = undefined

  constructor(portfolioState: PortfolioState) {
    this.portfolioState = portfolioState
    makeAutoObservable(this, {
      portfolioState: false
    })
  }

  setPeriod(period: ViewPeriod) {
    this.period = period
    this.load()
  }

  setGraphTicker(ticker: Ticker) {
    this.graphTicker = ticker
  }

  *load() {
    this.loading = true
    this.loadingError = undefined
    try {
      if (this.currentPrices.length === 0) {
        this.currentPrices = yield Promise.all(this.portfolioState.uniqueTickers.map(async ticker =>
          ({ ticker, price: await loadCurrentPrice(ticker) })))
      }
      const infoPresent = this.periodInfo.some(info => info.period === this.period)
      if (!infoPresent) {
        const candleGroups: TickerCandleGroup[] = yield this.loadCandleGroups()
        const stockProfits = this.calculateStockProfits(candleGroups)
        const profitPoints = this.calculateProfitPoints(candleGroups)
        this.updateSelectedPeriodInfo(stockProfits, candleGroups, profitPoints)
      }
    } catch (e) {
      this.loadingError = e.toString()
    } finally {
      this.loading = false
    }
  }

  private async loadCandleGroups(): Promise<TickerCandleGroup[]> {
    const today = LocalDate.now()
    const todayInstant = today.atTime(LocalTime.MIDNIGHT).toInstant(ZoneOffset.UTC)
    const dateFrom = this.calculateDateFrom(today)
    const dateFromInstant = dateFrom.atTime(LocalTime.MIDNIGHT).toInstant(ZoneOffset.UTC)
    const initialDateFrom = this.period === ViewPeriod.Year ? dateFrom.minusMonths(1) :
      dateFrom.minusDays(MAX_CONSECUTIVE_DAYS_OFF)

    return Promise.all(this.portfolioState.uniqueTickers.map(async ticker => {
      const allCandles = await loadCandles(ticker, initialDateFrom.atTime(LocalTime.MIDNIGHT).toInstant(ZoneOffset.UTC),
        todayInstant, this.period)
      const firstIndex = allCandles.findIndex(candle => candle.instant.epochSecond() >= dateFromInstant.epochSecond())
      let candles
      if (firstIndex < 2) {
        candles = allCandles
      } else {
        candles = allCandles.slice(firstIndex - 1)
      }
      return {
        ticker,
        candles
      }
    }))
  }

  private calculateDateFrom(dateTo: LocalDate): LocalDate {
    let dateFrom
    switch (this.period) {
      case ViewPeriod.Week:
        dateFrom = dateTo.minusDays(7)
        break
      case ViewPeriod.Month:
        dateFrom = dateTo.minusMonths(1)
        break
      case ViewPeriod.Year:
        dateFrom = dateTo.minusYears(1).withDayOfMonth(1)
        break
    }
    return dateFrom
  }

  private updateSelectedPeriodInfo(stockProfits: StockProfit[], candleGroups: TickerCandleGroup[],
    profitPoints: ProfitPoint[]) {
    let info = this.periodInfo.find(periodInfo => periodInfo.period === this.period)
    let infoCreated = false
    if (!info) {
      info = { period: this.period, stockProfits: [], candleGroups: [], profitPoints: [] }
      infoCreated = true
    }
    info.stockProfits = stockProfits
    info.candleGroups = candleGroups
    info.profitPoints = profitPoints
    if (infoCreated) {
      this.periodInfo.push(info)
    }
  }

  private calculateStockProfits(candleGroups: TickerCandleGroup[]): StockProfit[] {
    return this.portfolioState.uniqueTickers.map(ticker => {
      const firstCandle = this.findFirstCandle(ticker, candleGroups)
      let value = 0
      let percent = 0
      let previousInvestedValue = 0
      if (firstCandle) {
        const currentPrice = this.currentPrices.find(price => price.ticker === ticker)?.price
        if (currentPrice !== undefined) {
          const firstDate = firstCandle.instant.atZone(ZoneOffset.UTC).toLocalDate()
          const items = this.portfolioState.items.filter(item => item.ticker === ticker)
          items.forEach(item => {
            const previousPrice = item.date.isBefore(firstDate) ? firstCandle.close : item.price
            previousInvestedValue += previousPrice * item.count
            value += (currentPrice - previousPrice) * item.count
          })
          if (previousInvestedValue > 0) {
            percent = value / previousInvestedValue * 100
          }
        }
      }
      return {
        ticker,
        value,
        percent,
        previousInvestedValue
      }
    })
  }

  private findFirstCandle(ticker: Ticker, candleGroups: TickerCandleGroup[]): Candle | undefined {
    return candleGroups.find(group => group.ticker === ticker)?.candles?.[0]
  }

  private calculateProfitPoints(candleGroups: TickerCandleGroup[]): ProfitPoint[] {
    const allInstants = uniqBy(candleGroups.flatMap(group =>
      group.candles.map(candle => candle.instant)),
      instant => instant.epochSecond()).sort((a, b) =>
        a.epochSecond() - b.epochSecond())
    const lastPrices = new Map<Ticker, number>()
    const firstCandleInfos = new Map<Ticker, { date: LocalDate, price: number }>()
    const tickers = this.portfolioState.uniqueTickers
    tickers.forEach(ticker => {
      const firstCandle = this.findFirstCandle(ticker, candleGroups)
      if (firstCandle) {
        lastPrices.set(ticker, firstCandle.close)
        firstCandleInfos.set(ticker, {
          date: firstCandle.instant.atZone(ZoneOffset.UTC).toLocalDate(),
          price: firstCandle.close
        })
      }
    })

    return allInstants.map(instant => ({
      instant,
      value: sumBy(tickers, ticker => {
        let value = 0
        const firstCandleInfo = firstCandleInfos.get(ticker)
        const lastPrice = lastPrices.get(ticker)
        if (firstCandleInfo !== undefined && lastPrice !== undefined) {
          const items = this.portfolioState.items.filter(item => item.ticker === ticker)
          const candlePrice = candleGroups.find(group => group.ticker === ticker)?.candles
            ?.find(candle => candle.instant.equals(instant))?.close
          let analyzedPrice: number
          if (candlePrice !== undefined) {
            analyzedPrice = candlePrice
            lastPrices.set(ticker, analyzedPrice)
          } else {
            analyzedPrice = lastPrice
          }
          const date = instant.atZone(ZoneOffset.UTC).toLocalDate()
          value += sumBy(items.filter(item => !item.date.isAfter(date)),
            item => {
              const previousPrice = item.date.isBefore(firstCandleInfo.date) ? firstCandleInfo.price : item.price
              return (analyzedPrice - previousPrice) * item.count
            })
        }
        return value
      })
    }))
  }

  refresh() {
    this.currentPrices = []
    this.periodInfo = []
    this.load()
  }

  get selectedCandleGroup(): TickerCandleGroup | undefined {
    let result = undefined
    if (this.graphTicker) {
      const info = this.periodInfo.find(periodInfo => periodInfo.period === this.period)
      if (info) {
        result = info.candleGroups.find(group => group.ticker === this.graphTicker)
      }
    }
    return result
  }

  get selectedStockProfits(): StockProfit[] {
    return this.periodInfo.find(periodInfo => periodInfo.period === this.period)?.stockProfits ?? []
  }

  get selectedProfitPoints(): ProfitPoint[] {
    let result: ProfitPoint[] = []
    const group = this.selectedCandleGroup
    const allPoints = this.periodInfo.find(periodInfo => periodInfo.period === this.period)?.profitPoints
    if (group && allPoints) {
      const instants = group.candles.map(candle => candle.instant)
      result = allPoints.filter(point =>
        instants.some(instant => instant.equals(point.instant)))
    }
    return result
  }

}

interface Price {
  ticker: Ticker
  price: number
}

export enum ViewPeriod {
  Week = "Week",
  Month = "Month",
  Year = "Year"
}

interface PeriodInfo {
  period: ViewPeriod
  stockProfits: StockProfit[]
  candleGroups: TickerCandleGroup[]
  profitPoints: ProfitPoint[]
}

interface TickerCandleGroup {
  ticker: Ticker
  candles: Candle[]
}

export interface Candle {
  instant: Instant
  open: number
  high: number
  low: number
  close: number
}

interface ProfitPoint {
  instant: Instant
  value: number
}

interface StockProfit {
  ticker: Ticker
  value: number
  percent: number
  previousInvestedValue: number
}
