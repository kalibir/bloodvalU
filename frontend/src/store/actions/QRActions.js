import Axios from "../../axios";


export const validateQRCode = (QRCodeObj, context) => async (dispatch) => {
    try {
        let response
        if (context === "request") {
            response = await Axios.post(`request/validate/`, QRCodeObj);
        } else {
            response = await Axios.post(`tests/validate/`, QRCodeObj);
        }
        const {data} = response
        console.log(`response`, data)
        return response
    } catch (error) {
        console.log("error message", error.response);
        return error
    }
}