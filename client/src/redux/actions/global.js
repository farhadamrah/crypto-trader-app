import * as TYPES from '../types';

export const setAppLoading = payload => ({
    type: TYPES.APP_LOADING_CHANGED,
    payload,
});

export const setSidebarCollapsedState = payload => ({
    type: TYPES.SIDEBAR_COLLAPSED_STATE_CHANGED,
    payload,
});

export const toggleSidebarCollapsedState = () => ({
    type: TYPES.SIDEBAR_COLLAPSED_STATE_TOGGLED,
});

export const showPasswordConfirmationModal = callback => ({
    type: TYPES.PASSWORD_CONFIRMATION_MODAL_PROPS_CHANGED,
    payload: { isVisible: true, successCallback: callback },
});

export const hidePasswordConfirmationModal = () => ({
    type: TYPES.PASSWORD_CONFIRMATION_MODAL_PROPS_CHANGED,
    payload: { isVisible: false, successCallback: null },
});

export const showActionConfirmationModal = modalProps => ({
    type: TYPES.ACTION_CONFIRMATION_MODAL_PROPS_CHANGED,
    payload: { isVisible: true, ...modalProps },
});

export const hideActionConfirmationModal = () => dispatch => {
    dispatch({
        type: TYPES.ACTION_CONFIRMATION_MODAL_PROPS_CHANGED,
        payload: { isVisible: false },
    });

    setTimeout(() => {
        dispatch({
            type: TYPES.ACTION_CONFIRMATION_MODAL_PROPS_CHANGED,
            payload: { okCallback: null, title: '', okText: '' },
        });
    }, 200);
};
