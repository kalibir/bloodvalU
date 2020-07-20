import axios from "axios";



export const getCoordinatesAction = (street, zip, country) => async (dispatch) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${street.split(" ").join("%20")}%20${zip.split(" ").join("%20")}%20${country.split(" ").join("%20")}.json?access_token=pk.eyJ1IjoiZ3lzZW4iLCJhIjoiY2tjczdwZmx0MWx2czJ5czZ4YmRwY2N3MiJ9.gG6Fwsh2FHbveiQAiBb1bg`);
        return response
    } catch (error) {
        console.log("error message", error);
        return error
    }
}