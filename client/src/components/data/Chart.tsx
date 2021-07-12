import React, {Component} from "react"
import ReactHighcharts from "react-highcharts/ReactHighstock.src"
import priceData from "./btcdata.json"
import moment from "moment"


export interface ChartProps {
    //url: string
    name: string
}

export function Chart(props: ChartProps) {
    const options = {style: "currency", currency: "USD"}
    const numberFormat = new Intl.NumberFormat("en-US", options)
    const configPrice = {

        yAxis: [{
            offset: 20,

            labels: {
                // formatter: function () {
                //    return numberFormat.format(this.value)
                //}
                //,
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
            //formatter: function () {
            //    return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
            //}
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

            data: priceData,
            tooltip: {
                valueDecimals: 2
            },

        }
        ]
    }

    return (
        <div>
            <ReactHighcharts config={configPrice}></ReactHighcharts>
        </div>
    )
}

export default Chart

/*
import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import priceData from './btcdata.json'
import moment from 'moment'

export default class App extends Component {
    render() {
        const options = {style: 'currency', currency: 'USD'};
        const numberFormat = new Intl.NumberFormat('en-US', options);
        const configPrice = {

            yAxis: [{
                offset: 20,

                labels: {
                   // formatter: function () {
                    //    return numberFormat.format(this.value)
                    //}
                    //,
                    x: -15,
                    style: {
                        "color": "#000", "position": "absolute"

                    },
                    align: 'left'
                },
            },

            ],
            tooltip: {
                shared: true,
                //formatter: function () {
                //    return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
                //}
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
                text: `Bitcoin stock price`
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
                type: 'date',
            },
            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 1,
                    text: '1d',
                }, {
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                },
                    {
                        type: 'all',
                        text: 'All'
                    }],
                selected: 4
            },
            series: [{
                name: 'Price',
                type: 'spline',

                data: priceData,
                tooltip: {
                    valueDecimals: 2
                },

            }
            ]
        };
        return (
            <div>
                <ReactHighcharts config = {configPrice}></ReactHighcharts>
            </div>
        )
    }
}


 */

/*
import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

export interface CoinProps {
    //url: string
    name: string
    // price: number
}

export function Chart(props: CoinProps) {


    const options: Highcharts.Options = {
        title: {
            text: props.name
        },
        series: [{
            type: 'line',
            data: [1, 2, 3]
        }]
    }
    // <img src = {props.url}> </img>
            return (
                <div>
                    <HighchartsReact highcharts = {Highcharts} options = {options} constructorType={'stockChart'}></HighchartsReact>
                </div>
            )

        }



export default Chart

 */