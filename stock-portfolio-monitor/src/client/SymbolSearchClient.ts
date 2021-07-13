import { Ticker } from "../portfolio/PortfolioState"

const apiKey = process.env.REACT_APP_STOCK_API_KEY

export default async function search(query: string): Promise<StockSymbol[]> {
  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=${apiKey}`)
  const json = await response.json() as SearchResultJson
  let result: StockSymbol[] = []
  if (json.result) {
    result = json.result.map(row => ({
      ticker: row.symbol,
      description: row.description,
      type: row.type
    }))
  }
  return result
}

export interface StockSymbol {
  ticker: Ticker
  description: string
  type: string
}

interface SearchResultJson {
  result: {
    description: string
    symbol: string
    type: string
  }[]
}
