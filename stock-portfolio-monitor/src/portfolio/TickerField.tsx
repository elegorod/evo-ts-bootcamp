import { debounce } from 'lodash'
import { useCallback, useState, useMemo } from 'react'
import search, { StockSymbol } from '../client/SymbolSearchClient'
import { Ticker } from './PortfolioState'
import { TickerTable } from './TickerTable'

interface TickerFieldProps {
  value: string
  onChange: (ticker: Ticker) => void
}

export function TickerField({ onChange, value }: TickerFieldProps) {
  const [symbols, setSymbols] = useState<StockSymbol[]>([])

  const searchDebounced = useMemo(() =>
    debounce(query => {
      if (query.length >= 2) {
        search(query).then(setSymbols)
      }
    }, 700), [setSymbols])

  const onInputChange = useCallback(event => {
    const ticker = event.target.value
    onChange(ticker)
    searchDebounced(ticker)
  }, [onChange, searchDebounced])

  const onTickerSelect = useCallback(ticker => {
    onChange(ticker)
    setSymbols([])
  }, [onChange])

  return (
    <div>
      <input type="text" id="ticker" required value={value} onChange={onInputChange} />
      <div><i>E. g., MSFT or Microsoft, then select from suggestions)</i></div>
      <TickerTable symbols={symbols} onSelect={onTickerSelect} />
    </div>
  )
}
