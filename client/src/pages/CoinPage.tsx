import Chart from "../components/data/Chart"
import Trade from "../components/Trade"
import { useParams } from "react-router-dom"

export interface CoinProps {
    // url: string
    // name: string
    // price: number
}

export default (props: CoinProps) => {
    const {name} = useParams<{name}>()
    return (
        <div>
            <Chart name={name}/>
            <Trade/>
        </div>
    )
}
