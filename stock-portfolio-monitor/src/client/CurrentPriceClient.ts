import { Ticker } from "../portfolio/PortfolioState";

const apiKey = process.env.REACT_APP_STOCK_API_KEY

export default async function loadCurrentPrice(ticker: Ticker): Promise<number> {
  const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`)
  const json = await response.json()
  if (json.error) throw new Error("Cannot load current prices: " + json.error)
  return json.c
}
