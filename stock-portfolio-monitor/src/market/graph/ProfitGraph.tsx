import { ApexOptions } from "apexcharts";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Chart from "react-apexcharts"
import { MarketContext } from "../../App";
import { formatDateTime } from "./PriceGraph";

export const ProfitGraph = observer(() => {
  const state = useContext(MarketContext)
  const profitPoints = state.selectedProfitPoints
  const data = profitPoints.map(point => ({
    x: formatDateTime(point.instant, state.period),
    y: point.value.toFixed(2)
  }))

  const series = [{
    name: "Total profit",
    data
  }]

  return (
    <Chart options={options} series={series} width="1000" height="250" />
  )
})

const options: ApexOptions = {
  chart: {
    type: 'line',
    height: 250,
    id: "profitGraph",
    fontFamily: "inherit",
    toolbar: {
      show: false
    }
  },
  title: {
    text: 'Total profit',
    align: 'left'
  },
  xaxis: {
    type: 'category',
    tickPlacement: "between"
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
  },
  stroke: {
    curve: "smooth"
  },
  annotations: {
    yaxis: [
      {
        y: 0,
        borderColor: '#48cea1',
        label: {
          borderColor: '#b2ead7',
          style: {
            color: '#000',
            background: '#b2ead7'
          },
          text: '0'
        }
      }
    ]
  }
}
