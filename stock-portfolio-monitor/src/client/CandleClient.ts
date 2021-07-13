import { Instant } from "@js-joda/core";
import { Candle, ViewPeriod } from "../market/MarketState";
import { Ticker } from "../portfolio/PortfolioState";

const apiKey = process.env.REACT_APP_STOCK_API_KEY

export async function loadCandles(ticker: Ticker, dateFrom: Instant, dateTo: Instant, period: ViewPeriod): Promise<Candle[]> {
  let resolution
  switch (period) {
    case ViewPeriod.Week:
      resolution = "60"
      break
    case ViewPeriod.Month:
      resolution = "D"
      break
    case ViewPeriod.Year:
      resolution = "M"
      break
  }
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution}&from=${dateFrom.epochSecond()}&to=${dateTo.epochSecond()}&token=${apiKey}`)
  const json = await response.json() as CandleJson
  if (json.error) throw new Error("Cannot load candles: " + json.error)
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
