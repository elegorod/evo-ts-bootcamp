import { Ticker } from "../portfolio/PortfolioState";

export default async function loadCurrentPrice(ticker: Ticker): Promise<number> {
  const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${getApiKey()}`)
  const json = await response.json() as CurrentPriceJson
  if (json.error) throw new Error(`Cannot load current prices: ${json.error}`)
  return json.c
}

export function getApiKey(): string | undefined {
  return process.env.REACT_APP_STOCK_API_KEY
}

interface CurrentPriceJson {
  c: number
  error?: string
}
