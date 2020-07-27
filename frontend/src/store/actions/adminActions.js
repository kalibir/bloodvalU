import Axios from "../../axios";


export const toggleVerifyAction = (seekerID) => async () => {
    try {
        return await Axios.post(`seeker/verify/${seekerID}/`);
    } catch (error) {
        console.log("error", error.response)
        return error
    }
}