import { Instant } from "@js-joda/core";
import { Candle, ViewPeriod } from "../market/MarketState";
import { Ticker } from "../portfolio/PortfolioState";
import { getApiKey } from "./CurrentPriceClient";

export async function loadCandles(ticker: Ticker, dateFrom: Instant, dateTo: Instant,
  period: ViewPeriod): Promise<Candle[]> {
  const PeriodResolution: Record<ViewPeriod, string> = {
    [ViewPeriod.Week]: "60",
    [ViewPeriod.Month]: "D",
    [ViewPeriod.Year]: "M"
  }
  const resolution = PeriodResolution[period]
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution}&from=${dateFrom.epochSecond()}` +
    `&to=${dateTo.epochSecond()}&token=${getApiKey()}`)
  const json = await response.json() as CandleJson
  if (json.error) throw new Error(`Cannot load candles: ${json.error}`)
  let result: Candle[] = []
  if (json.s === "ok") {
    result = json.t.map((t, i) => ({
      instant: Instant.ofEpochSecond(t, 0),
      open: json.o[i],
      high: json.h[i],
      low: json.l[i],
      close: json.c[i]
    }))
  }
  return result
}

interface CandleJson {
  c: number[]
  h: number[]
  l: number[]
  o: number[]
  t: number[]
  s: string
  error?: string
}
