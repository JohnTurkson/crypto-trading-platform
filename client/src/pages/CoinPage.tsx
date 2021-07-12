import CoinList from "../containers/CoinList"
import { createChart } from "lightweight-charts"
import {useState} from "react"
import Chart from "../components/data/Chart"
import Trade from "../components/Trade"

export interface CoinProps {
    //url: string
    name: string
    // price: number
}

export default (props: CoinProps) => {

    return (
        <div>
        <Chart name = {props.name}/>

        <Trade></Trade>
        </div>

    )
}