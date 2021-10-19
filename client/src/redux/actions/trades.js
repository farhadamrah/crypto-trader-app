import * as TYPES from '../types';
import TradeService from '../../services/TradeService';

export const setTradesList = list => ({
    type: TYPES.TRADES_LIST_CHANGED,
    payload: list,
});

export const getTradesList = params => async dispatch => {
    try {
        const response = await TradeService.getTrades(params);

        const trades = response.data;

        dispatch(setTradesList(trades));

        return trades;
    } catch (error) {
        console.error(error);
    }
};
