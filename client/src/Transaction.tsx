import React, { useState } from "react";

function Transaction(props: { nameOfCoin: string, timeStamp: string, purchasePrice:number, soldPrice: number}) {
    // props: image, name, price

    return (
        <span id = "transaction">
            <h2>{props.nameOfCoin}</h2>
            <h2>{props.timeStamp}</h2>
            <h2>{props.purchasePrice}</h2>
            <h2>{props.soldPrice}</h2>
        </span>
    )

}

export default Transaction;