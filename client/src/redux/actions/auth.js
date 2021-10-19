import AuthService from '../../services/AuthService';
import * as TYPES from '../types';
import { setAuthToken } from '../../utils/auth';
import { showMessageComponent } from './components';
import { ERROR_MESSAGES, MESSAGE_TYPE } from '../../config/constants';

export const setUserLoggedIn = user => ({
    type: TYPES.AUTH_USER_LOGGED_IN,
    payload: user,
});

export const setUserLoggedOut = () => ({
    type: TYPES.AUTH_USER_LOGGED_OUT,
});

export const setCurrentUser = user => ({
    type: TYPES.SET_CURRENT_USER,
    payload: user,
});

export const setConfirmationToken = token => ({
    type: TYPES.AUTH_CONFIRMATION_TOKEN_CHANGED,
    payload: token,
});

export const login = userData => async dispatch => {
    try {
        const response = await AuthService.login(userData);

        const { token, ...user } = response.data;

        setAuthToken(token);

        dispatch(setUserLoggedIn(user));

        console.log(response.data);

        return user;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const register = userData => async dispatch => {
    try {
        const response = await AuthService.register(userData);

        const { token, ...user } = response.data;

        setAuthToken(token);

        dispatch(setUserLoggedIn(user));

        return user;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const fetchCurrentUser = () => async dispatch => {
    try {
        const response = await AuthService.fetchCurrentUser();

        const user = response.data;

        dispatch(setUserLoggedIn(user));

        return user;
    } catch (error) {
        console.error(error.response?.data.error.message || error);
    }
};

export const generateConfirmationToken = password => async dispatch => {
    try {
        const response = await AuthService.generateConfirmationToken({ password });

        const token = response.data;

        dispatch(setConfirmationToken(token));

        return token;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};
