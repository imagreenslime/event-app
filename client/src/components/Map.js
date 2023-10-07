import React, {useEffect, useState} from 'react';
import USAMap from "react-usa-map";
import '../styles/App.css'

export default function Map({ stateList, setStateList }){
    const mapHandler = (event) => {
        let newState = event.target.dataset.name
        if (stateList.includes(newState, 0)){
            setStateList(stateList.filter(e => e !== newState))
        } else {
            setStateList([...stateList, newState])
        }
    }

    const stateConfig = {}
    for (let i = 0 ; i < stateList.length; i++){
        stateConfig[stateList[i]] = {fill: "navy"}
    }
    const statesCustomConfig = () => {
        return (
            stateConfig
        )
    }

    return (
        <USAMap customize={statesCustomConfig()} onClick={mapHandler} />
    )
}
