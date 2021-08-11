import { useEffect, useState } from "react"
import ReactHighcharts from "react-highcharts/ReactHighstock.src"

export interface ChartProps {
    name: string
}

const connection = new WebSocket("wss://crypto-data-stream.johnturkson.com")

export function Chart(props: ChartProps) {
    const [data, setData] = useState([])
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
        plotOptions: {
            series: {
                showInNavigator: true,
                gapSize: 6,
                
            }
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
        xAxis: {
            type: "date",
        },
        rangeSelector: {
            buttons: [
                {
                    type: "day",
                    count: 1,
                    text: "1d",
                }, {
                    type: "day",
                    count: 7,
                    text: "7d"
                }, {
                    type: "month",
                    count: 1,
                    text: "1m"
                }, {
                    type: "month",
                    count: 3,
                    text: "3m"
                },
                {
                    type: "all",
                    text: "All"
                }],
            selected: 4
        },
        series: [
            {
                name: "Price",
                type: "spline",
                dataSorting: {
                    enabled: true
                },
                data: data,
                tooltip: {
                    valueDecimals: props.name == "Dogecoin" ? 4 : 2
                },
            }
        ]
    })
    
    useEffect(() => {
        connection.onmessage = message => {
            let currData = data
            let json = JSON.parse(message.data)
            
            if (props.name == "Bitcoin") {
                if (json["asset"] != "BTC-USD") return
            } else if (props.name == "Ethereum") {
                if (json["asset"] != "ETH-USD") return
            } else if (props.name == "Dogecoin") {
                if (json["asset"] != "DOGE-USD") return
            }
            
            currData.push([json["time"] - 2.52e+7, parseFloat(json["price"])])
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
