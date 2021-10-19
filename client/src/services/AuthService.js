import axios from '../config/axios';
import { ENV } from '../config/env';

const AuthService = {};

AuthService.register = async body => {
    const result = await axios.post(`${ENV.baseApiUrl}/auth/register`, body);

    return result.data;
};

AuthService.login = async body => {
    const result = await axios.post(`${ENV.baseApiUrl}/auth/login`, body);

    return result.data;
};

AuthService.fetchCurrentUser = async () => {
    const result = await axios.get(`${ENV.baseApiUrl}/auth/me`);

    return result.data;
};

AuthService.generateConfirmationToken = async body => {
    const result = await axios.post(`${ENV.baseApiUrl}/auth/confirmation-token`, body);

    return result.data;
};

export default AuthService;
