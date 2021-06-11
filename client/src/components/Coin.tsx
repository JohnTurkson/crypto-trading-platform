import React, {Dispatch, FormEvent, SetStateAction} from "react";

const Coin = ({ url, name, price }: { url: string, name: string, price: number }) => {

    return (
        <div id = "coin" style ={{display: "block"}}>
                <img src={url}></img>
                <p>{name}</p>
                <p>{price}</p>
        </div>
    )
}

export default Coin