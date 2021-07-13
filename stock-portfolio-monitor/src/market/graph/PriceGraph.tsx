import { DateTimeFormatter, Instant, ZoneId, ZoneOffset } from "@js-joda/core";
import { ApexOptions } from "apexcharts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Chart from "react-apexcharts"
import { MarketContext } from "../../App";
import { ViewPeriod } from "../MarketState";

const dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
const dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
const monthFormatter = DateTimeFormatter.ofPattern("yyyy-MM")

export const PriceGraph = observer(() => {
  const state = useContext(MarketContext)
  const candleGroup = state.selectedCandleGroup
  let data: any[] = []
  if (candleGroup) {
    data = candleGroup.candles.map(candle => ({
      x: formatDateTime(candle.instant, state.period),
      y: [candle.open, candle.high, candle.low, candle.close]
    }))
  }

  const series = [{
    data: data
  }]

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 500,
      id: "priceGraph",
      fontFamily: "inherit",
      toolbar: {
        show: false
      }
    },
    title: {
      text: 'Selected ticker price',
      align: 'left'
    },
    xaxis: {
      type: 'category'
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        minWidth: 40,
        style: {
          fontSize: "0.9em"
        }
      }
    }
  }

  return (
    <Chart options={options} series={series} type="candlestick" width="1000" height="500" />
  )
})

export function formatDateTime(instant: Instant, period: ViewPeriod) {
  let result
  switch (period) {
    case ViewPeriod.Week:
      result = dateTimeFormatter.format(instant.atZone(ZoneId.systemDefault()))
      break
    case ViewPeriod.Month:
      result = dateFormatter.format(instant.atZone(ZoneOffset.UTC))
      break
    case ViewPeriod.Year:
      result = monthFormatter.format(instant.atZone(ZoneOffset.UTC))
      break
  }
  return result
}
