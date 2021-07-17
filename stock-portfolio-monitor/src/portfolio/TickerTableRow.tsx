import { useCallback } from "react";
import { StockSymbol } from "../client/SymbolSearchClient";
import { Ticker } from "./PortfolioState";

interface TickerTableRowProps {
  symbol: StockSymbol
  onSelect: (ticker: Ticker) => void
}

export function TickerTableRow({ symbol, onSelect }: TickerTableRowProps) {
  const onClick = useCallback(
    () => onSelect(symbol.ticker),
    [symbol.ticker, onSelect])

  return (
    <tr>
      <td><button type="button" onClick={onClick}>{symbol.ticker}</button></td>
      <td>{symbol.description}</td>
      <td>{symbol.type}</td>
    </tr>
  )
}
