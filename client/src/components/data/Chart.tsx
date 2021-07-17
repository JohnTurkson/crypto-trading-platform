import React, {useEffect, useState} from "react"
import ReactHighcharts from "react-highcharts/ReactHighstock.src"
import priceData from "./btcdata.json"

export interface ChartProps {
    //url: string
    name: string
}

const connection = new WebSocket("wss://crypto-data-stream.johnturkson.com")

export function Chart(props: ChartProps) {
    const options = {style: "currency", currency: "USD"}
    const numberFormat = new Intl.NumberFormat("en-US", options)

    const [data, setData] = useState(priceData)
    const [config, setConfig] = useState({

        yAxis: [{
            offset: 20,

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

        //rangeSelector: {
        //    selected: 1
        //},
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
            buttons: [{
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
        series: [{
            name: "Price",
            type: "spline",

            //data: priceData,
            data: data,
            tooltip: {
                valueDecimals: 2
            },

        }
        ]
    })
    /*

    useEffect(() => {
        connection.onmessage = message => {
            //console.log(message)
            //let currData = data;
            let json = JSON.parse(message.data)
            //currData.push([json["time"], parseFloat(json["price"])])
            //console.log(currData)
            //setData([data,currData])
            //setData(currData)
            setData([data, [json["time"], parseFloat(json["price"])] ])

            let newConfig = config
            newConfig.series[0].data = data;
            setConfig(newConfig)
            console.log(data)

        }
    })

     */

    return (
        <div>
            <ReactHighcharts config={config}></ReactHighcharts>
        </div>
    )
}

export default Chart