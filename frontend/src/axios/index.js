import baseUrl from '../constants'
import { store } from '../store';
import axios from "axios";


const Axios = axios.create({
    baseUrl: baseUrl
})

Axios.defaults.baseURL = baseUrl;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Axios.interceptors.request.use(function (config) {
    const token = store.getState().authReducer.token; // You can access the redux state directly by using the getState function
                                                      // As you can see we can directly get the token from the almost as if it were a local state :)
    if(token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

export default Axios;
