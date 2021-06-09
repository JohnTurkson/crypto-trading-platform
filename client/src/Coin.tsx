import React, { useState } from "react";
import {Card} from "@material-ui/core";

function Coin(props: { image: string, name: string, price:number }) {
    // props: image, name, price

    return (
        <span id = "coin">
            <img src={props.image} width ="50" height = "50"/>
            <h2>{props.name}</h2>
            <h2>{props.price}</h2>
        </span>
    )

}

export default Coin;