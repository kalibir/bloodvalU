import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getCoordinatesAction} from "../../store/actions/mapActions";

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/technoparkstrasse%201.json?access_token=pk.eyJ1IjoiZ3lzZW4iLCJhIjoiY2tjczdwZmx0MWx2czJ5czZ4YmRwY2N3MiJ9.gG6Fwsh2FHbveiQAiBb1bg"


const GeoMap = props => {
    const [mapData, setMapData] = useState({
        coordinates: ""
    })
    const dispatch = useDispatch()
    console.log("mapdata  :", mapData)

    // useEffect(() => {
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => setMapData({...mapData, coordinates: data}));

    // }, [])

    const handleFetch = async e => {
        const response = await dispatch(getCoordinatesAction("chemmin des cornillons", "genthod", "Switzerland"))
        console.log("response", response);
        const coordinates = response.data.features[0].geometry.coordinates
        setMapData({...mapData, coordinates: coordinates})
    }


    return (
        <>
            <h1>maps</h1>
            <button onClick={handleFetch}>FETCH</button>
        </>
    )
}

export default GeoMap