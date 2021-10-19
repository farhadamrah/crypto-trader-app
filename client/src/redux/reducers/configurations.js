import * as TYPES from '../types';

const initialState = {
    list: [],
};

const configurations = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case TYPES.CONFIGURATIONS_LIST_CHANGED: {
            return {
                ...state,
                list: payload,
            };
        }
        case TYPES.CONFIGURATION_CREATED: {
            return {
                ...state,
                list: state.list.concat(payload),
            };
        }
        case TYPES.CONFIGURATION_UPDATED: {
            return {
                ...state,
                list: state.list.map(configuration => {
                    if (configuration.id === payload.id) {
                        return payload;
                    }

                    return configuration;
                }),
            };
        }
        default:
            return state;
    }
};

export default configurations;
