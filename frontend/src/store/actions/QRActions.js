import Axios from "../../axios";



export const validateQRCode = (QRCodeObj) => async (dispatch) => {
    try {
        const response = await Axios.post(`tests/validate/`, QRCodeObj);
        const {data} = response
        return response
    } catch (error) {
        return error
    }
}