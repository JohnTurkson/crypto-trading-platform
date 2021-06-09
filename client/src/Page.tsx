//import React, { useState } from 'react';

import List from "./List";
import Navbar from "./Navbar";
import Coin from "./Coin";
import React from "react";

function Page() {

    const props = {
        image:"https://bitcoin.org/img/icons/opengraph.png?1621851118",
        name: "Bitcoin",
        price: 30000
    }

    return (
         <div>
             <img src="https://png.pngtree.com/element_pic/00/16/07/115783931601b5c.jpg" width = "200" height = "200"/>
             <Navbar></Navbar>
             <List></List>
             <Coin {...props}> </Coin>

         </div>
     )

}

export default Page;
