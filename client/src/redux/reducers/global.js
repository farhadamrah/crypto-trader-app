import * as TYPES from '../types';

const initialState = {
    isAppLoading: true,
    isSidebarCollapsed: false,
    passwordConfirmationModalProps: {
        isVisible: false,
        successCallback: null,
    },
    actionConfirmationModalProps: {
        isVisible: false,
        okCallback: null,
        title: '',
        okText: '',
    },
};

const global = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case TYPES.APP_LOADING_CHANGED: {
            return {
                ...state,
                isAppLoading: payload,
            };
        }
        case TYPES.SIDEBAR_COLLAPSED_STATE_CHANGED: {
            return {
                ...state,
                isSidebarCollapsed: payload,
            };
        }
        case TYPES.SIDEBAR_COLLAPSED_STATE_TOGGLED: {
            return {
                ...state,
                isSidebarCollapsed: !state.isSidebarCollapsed,
            };
        }
        case TYPES.PASSWORD_CONFIRMATION_MODAL_PROPS_CHANGED: {
            return {
                ...state,
                passwordConfirmationModalProps: {
                    ...state.passwordConfirmationModalProps,
                    ...payload,
                },
            };
        }
        case TYPES.ACTION_CONFIRMATION_MODAL_PROPS_CHANGED: {
            console.log(payload);
            return {
                ...state,
                actionConfirmationModalProps: {
                    ...state.actionConfirmationModalProps,
                    ...payload,
                },
            };
        }
        default:
            return state;
    }
};

export default global;
