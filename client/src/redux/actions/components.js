import * as TYPES from '../types';

export const destroyAllMessageComponents = () => ({
    type: TYPES.DESTROY_ALL_MESSAGE_COMPONENTS,
});

export const showMessageComponent = (type, message, { duration = 2, destroyAll = false } = {}) => dispatch => {
    const messageId = new Date().getTime();

    if (destroyAll) {
        dispatch(destroyAllMessageComponents());
    }

    dispatch({
        type: TYPES.SHOW_MESSAGE_COMPONENT,
        payload: {
            id: messageId,
            type,
            message,
        },
    });

    setTimeout(() => {
        dispatch(destroyMessageComponent(messageId));
    }, duration * 1000);

    return messageId;
};

export const destroyMessageComponent = messageId => ({
    type: TYPES.DESTROY_MESSAGE_COMPONENT,
    payload: messageId,
});
