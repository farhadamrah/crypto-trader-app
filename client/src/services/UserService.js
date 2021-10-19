import axios from '../config/axios';
import { ENV } from '../config/env';

const UserService = {};

UserService.updateUser = async ({ id, ...body }) => {
    const result = await axios.put(`${ENV.baseApiUrl}/users/${id}`, body);

    return result.data;
};

UserService.updatePassword = async ({ id, ...body }, confirmationToken) => {
    const result = await axios.patch(`${ENV.baseApiUrl}/users/${id}/password`, body, {
        headers: { 'app-confirmation-token': confirmationToken },
    });

    return result.data;
};

UserService.connectTelegram = async ({ id, ...body }) => {
    const result = await axios.patch(`${ENV.baseApiUrl}/users/${id}/telegram`, body);

    return result.data;
};

UserService.disconnectTelegram = async (id, confirmationToken) => {
    const result = await axios.delete(`${ENV.baseApiUrl}/users/${id}/telegram`, {
        headers: { 'app-confirmation-token': confirmationToken },
    });

    return result.data;
};

UserService.updateActiveConfiguration = async ({ id, ...body }) => {
    const result = await axios.patch(`${ENV.baseApiUrl}/users/${id}/configuration`, body);

    return result.data;
};

UserService.deleteUser = async id => {
    const result = await axios.delete(`${ENV.baseApiUrl}/users/${id}`);

    return result.data;
};

export default UserService;
