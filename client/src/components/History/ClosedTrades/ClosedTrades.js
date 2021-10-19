import { TRADE_STATUSES } from '../../../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTradesList } from '../../../redux/actions/trades';
import TradesTable from '../TradesTable/TradesTable';

const ClosedTrades = () => {
    const dispatch = useDispatch();

    const trades = useSelector(state => state.trades.list);

    useEffect(() => {
        dispatch(getTradesList({ status: TRADE_STATUSES.closed }));
    }, []);

    return <TradesTable trades={trades} />;
};

export default ClosedTrades;
