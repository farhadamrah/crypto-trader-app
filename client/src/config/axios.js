import axios from 'axios';
import { redirectToLogin } from '../utils/auth';

const instance = axios.create();

instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            redirectToLogin();
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default instance;
