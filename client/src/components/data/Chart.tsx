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