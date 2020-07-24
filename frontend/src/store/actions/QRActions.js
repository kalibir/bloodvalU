import Axios from "../../axios";


export const validateQRCode = (QRCodeObj, context) => async (dispatch) => {
    try {
        const response = await Axios.post(`${context}/validate/`, QRCodeObj);
        const {data} = response
        console.log(`response`, data)
        return response
    } catch (error) {
        console.log("error message", error.response);
        return error
    }
}