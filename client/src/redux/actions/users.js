import { showMessageComponent } from './components';
import { ERROR_MESSAGES, MESSAGE_TYPE } from '../../config/constants';
import UserService from '../../services/UserService';
import { setCurrentUser } from './auth';

export const updateUser = userData => async dispatch => {
    try {
        const response = await UserService.updateUser(userData);

        const updatedUser = response.data;

        dispatch(setCurrentUser(updatedUser));

        return updatedUser;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const updatePassword = userData => async (dispatch, getStore) => {
    try {
        const store = getStore();
        const { confirmationToken } = store.auth;

        const response = await UserService.updatePassword(userData, confirmationToken);

        const updatedUser = response.data;

        return updatedUser;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const connectTelegram = userData => async dispatch => {
    try {
        const response = await UserService.connectTelegram(userData);

        const updatedUser = response.data;

        dispatch(setCurrentUser(updatedUser));

        return updatedUser;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const disconnectTelegram = userId => async (dispatch, getStore) => {
    try {
        const store = getStore();
        const { confirmationToken } = store.auth;

        const response = await UserService.disconnectTelegram(userId, confirmationToken);

        const updatedUser = response.data;

        dispatch(setCurrentUser(updatedUser));

        return updatedUser;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const updateUserConfiguration = userData => async dispatch => {
    try {
        const response = await UserService.updateActiveConfiguration(userData);

        const updatedUser = response.data;

        dispatch(setCurrentUser(updatedUser));

        return updatedUser;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const deleteUser = userId => async dispatch => {
    try {
        const response = await UserService.deleteUser(userId);

        const deletedUser = response.data;

        return deletedUser;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};
