import { debounce } from 'lodash-es'
import { useCallback, useState, useMemo } from 'react'
import search, { StockSymbol } from '../client/SymbolSearchClient'
import { Ticker } from './PortfolioState'
import { TickerTable } from './TickerTable'

interface TickerFieldProps {
  value: string
  onChange: (ticker: Ticker) => void
}

export function TickerField(props: TickerFieldProps) {
  const [symbols, setSymbols] = useState<StockSymbol[]>([])

  const searchDebounced = useMemo(() =>
    debounce(query => {
      if (query.length >= 2) {
        search(query).then(setSymbols)
      }
    }, 700), [setSymbols])

  const onChangeProp = props.onChange
  const onInputChange = useCallback(event => {
    const ticker = event.target.value
    onChangeProp(ticker)
    searchDebounced(ticker)
  }, [onChangeProp, searchDebounced])

  const onTickerSelect = useCallback(ticker => {
    onChangeProp(ticker)
    setSymbols([])
  }, [onChangeProp])

  return (
    <div>
      <input type="text" name="ticker" required value={props.value} onChange={onInputChange} />
      <TickerTable symbols={symbols} onSelect={onTickerSelect} />
    </div>
  )
}
