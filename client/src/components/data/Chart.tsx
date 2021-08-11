import { useEffect, useState } from "react"
import ReactHighcharts from "react-highcharts/ReactHighstock.src"
import { PriceData } from "../../../../data-stream/src/data/PriceData"

export interface ChartProps {
    name: string
}

const connection = new WebSocket("wss://crypto-data-stream.johnturkson.com")

export function Chart(props: ChartProps) {
    const [data, setData] = useState([])
    const [mostRecentTime, setMostRecentTime] = useState(0)
    const [config, setConfig] = useState({
        yAxis: [
            {
                offset: 6,
                labels: {
                    x: -15,
                    style: {
                        "color": "#000", "position": "absolute"
                    },
                    align: "left"
                },
            },
        ],
        tooltip: {
            shared: true,
        },
        title: {
            text: props.name
        },
        chart: {
            height: 600,
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: true
        },
        xAxis: [
            {
                type: "date",
            },
        ],
        series: [
            {
                name: "Price",
                type: "line",
                dataSorting: {
                    enabled: true
                },
                data: data,
                tooltip: {
                    valueDecimals: 4
                },
            }
        ]
    })
    
    useEffect(() => {
        connection.onmessage = message => {
            const currData = data
            const json: PriceData = JSON.parse(message.data)
            const asset = `${props.name}-USD`
            const interval = 1000
            if (json.time - mostRecentTime <= interval) return
            if (json.asset !== asset) return
            currData.push([new Date(json.time), parseFloat(json.price)])
            setData([data, currData])
            setData(currData)
            let newConfig = config
            newConfig.series[0].data = data
            setConfig(newConfig)
            console.log(data)
        }
    })
    
    return (
        <div>
            <ReactHighcharts config={config} updateArgs={[true]} isPureConfig={false}/>
        </div>
    )
}

export default Chart
