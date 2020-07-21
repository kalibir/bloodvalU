import axios from "axios";
import Axios from "../../axios";
import {updateRequestInAll} from "./bloodRequestActions";



export const getCoordinatesAction = (street, zip, country) => async (dispatch) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${street.split(" ").join("%20")}%20${zip.split(" ").join("%20")}%20${country.split(" ").join("%20")}.json?access_token=pk.eyJ1IjoiZ3lzZW4iLCJhIjoiY2tjczdwZmx0MWx2czJ5czZ4YmRwY2N3MiJ9.gG6Fwsh2FHbveiQAiBb1bg`);
        return response
    } catch (error) {
        console.log("error message", error);
        return error
    }
}

export const getRequestsOfSingleSeeker = (seekerID) => async (dispatch) => {
    try {
        const response = await Axios.get(`request/seeker/${seekerID}/`)
        return response
    } catch (error) {
        console.log("error message", error.response)
        return error
    }
}

export const applyToRequestOnMap = (request_id) => async (dispatch) => {
    try {
        return await Axios.post(`request/apply/${request_id}/`);
    } catch (error) {
        console.log("error message", error.response);
        console.log("error", error)
        return error
    }
}