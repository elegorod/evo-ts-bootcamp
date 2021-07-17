import { StockSymbol } from "../client/SymbolSearchClient"
import { Ticker } from "./PortfolioState"
import { TickerTableRow } from "./TickerTableRow"

interface TickerTableProps {
  symbols: StockSymbol[]
  onSelect: (ticker: Ticker) => void
}

export function TickerTable({ symbols, onSelect }: TickerTableProps) {
  return (
    symbols.length > 0 ?
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map(symbol =>
            <TickerTableRow key={symbol.ticker} symbol={symbol} onSelect={onSelect} />
          )}
        </tbody>
      </table>
      : null
  )
}
