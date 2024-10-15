"use client";
import { useState } from "react";

const Sample = () => {
const[count,setCount]=useState(0);
const increment=()=>{
    const newCount=count+1;
    setCount(newCount);
};

  return (
    <> 
    <button onClick={increment}> increment -</button>
    <button>{count}</button>
    </>
  )
}

export default Sample