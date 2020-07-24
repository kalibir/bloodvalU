import Axios from "../../axios";


export const validateQRCode = (QRCodeObj, context) => async (dispatch) => {
    try {
        const response = await Axios.post(`${context}/validate/`, QRCodeObj);
        const {data} = response
        return response
    } catch (error) {
        return error
    }
}