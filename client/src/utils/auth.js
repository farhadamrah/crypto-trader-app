import jwtDecode from 'jwt-decode';
import axios from '../config/axios';
import { ROUTES } from '../config/constants';
import { isPrivateRoute } from './route';

export const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', JSON.stringify(token));
};

export const deleteAuthToken = () => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
};

export const authenticateUser = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token) {
            if (isTokenExpired(token)) {
                redirectToLogin();
            } else {
                setAuthToken(token);
            }
        } else {
            redirectToLogin();
        }
    } catch (error) {
        console.error(error);
        redirectToLogin();
    }
};

export const redirectToLogin = () => {
    deleteAuthToken();

    const { pathname } = window.location;

    if (pathname !== ROUTES.login.path && isPrivateRoute(pathname)) {
        window.location.replace(ROUTES.login.path);
    }
};

export const isTokenExpired = token => {
    try {
        const decoded = jwtDecode(token);

        return decoded.exp * 1000 <= Date.now();
    } catch (error) {
        console.error(error);
    }
};
