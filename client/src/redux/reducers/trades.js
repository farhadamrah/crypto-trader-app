import * as TYPES from '../types';

const initialState = {
    list: [],
};

const trades = (state = initialState, action) => {
    const { payload } = action;

    switch (action.type) {
        case TYPES.TRADES_LIST_CHANGED: {
            return {
                ...state,
                list: payload,
            };
        }
        default:
            return state;
    }
};

export default trades;
