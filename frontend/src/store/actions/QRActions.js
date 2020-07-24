import Axios from "../../axios";


export const validateQRCode = (QRCodeObj, context) => async (dispatch) => {
    try {
        let response
        if (context === "request") {
            console.log("validating", context)
            response = await Axios.post(`request/validate/`, QRCodeObj);
        } else {
            console.log("validating", context)
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