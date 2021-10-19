import * as TYPES from '../types';

const initialState = {
    isFetching: true,
    isAuthenticated: false,
    user: {},
    confirmationToken: null,
};

const auth = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case TYPES.AUTH_USER_LOGGED_IN: {
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: payload,
            };
        }
        case TYPES.AUTH_USER_LOGGED_OUT: {
            return {
                ...state,
                isAuthenticated: false,
                user: {},
            };
        }
        case TYPES.SET_CURRENT_USER: {
            return {
                ...state,
                user: payload,
            };
        }
        case TYPES.AUTH_CONFIRMATION_TOKEN_CHANGED: {
            return {
                ...state,
                confirmationToken: payload,
            };
        }
        default:
            return state;
    }
};

export default auth;
