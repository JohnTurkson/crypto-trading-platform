import {useEffect, useState} from "react"
import ReactHighcharts from "react-highcharts/ReactHighstock.src"

export interface ChartProps {
    //url: string
    name: string
}

const connection = new WebSocket("wss://crypto-data-stream.johnturkson.com")


export function Chart(props: ChartProps) {
    const options = {style: "currency", currency: "USD"}
    const numberFormat = new Intl.NumberFormat("en-US", options)

    const [data, setData] = useState([])
    const [config, setConfig] = useState({

        yAxis: [{
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

    //if (props.name == "Dogecoin") {
    //    let newConfig = config
    //    newConfig.series[0].tooltip.valueDecimals = 4
    //    setConfig(newConfig)
    //}

    useEffect(() => {
        connection.onmessage = message => {
            console.log(message)
            let currData = data
            let json = JSON.parse(message.data)
            console.log(json)
            // + 1654100
            // * 1000
            // + 1.8e+7
            //if (json["asset"] != "BTC-USD") return

            console.log(props.name)

            if (props.name == "Bitcoin") {
                if (json["asset"] != "BTC-USD") return
            } else if (props.name == "Ethereum") {
                if (json["asset"] != "ETH-USD") return
            } else if (props.name == "Dogecoin") {
                if (json["asset"] != "DOGE-USD") return
            }

            currData.push([json["time"] - 2.52e+7, parseFloat(json["price"])])
            //console.log(currData)
            setData([data,currData])
            setData(currData)

            //setData([data, [json["time"], parseFloat(json["price"])] ])

            let newConfig = config
            newConfig.series[0].data = data;
            setConfig(newConfig)
            console.log(data)

            //config.series[0].data = [data, [json["time"] + 1654100, parseFloat(json["price"])] ];

        }
    })


// updateArgs={[true]} isPureConfig ={false}
    return (
        <div>
            <ReactHighcharts config={config} updateArgs={[true]} isPureConfig ={false}></ReactHighcharts>
        </div>
    )
}

export default Chart