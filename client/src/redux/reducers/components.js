import * as TYPES from '../types';

const initialState = {
    messages: [],
};

const messages = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case TYPES.SHOW_MESSAGE_COMPONENT: {
            return {
                ...state,
                messages: [...state.messages, payload],
            };
        }
        case TYPES.DESTROY_MESSAGE_COMPONENT: {
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== payload),
            };
        }
        case TYPES.DESTROY_ALL_MESSAGE_COMPONENTS: {
            return {
                ...state,
                messages: [],
            };
        }
        default:
            return state;
    }
};

export default messages;
