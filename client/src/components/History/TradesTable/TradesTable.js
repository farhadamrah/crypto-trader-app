import Table from '../../shared/Table/Table';
import { SIGNAL_TYPES, TRADE_MODES } from '../../../config/constants';
import classNames from 'classnames';
import { level } from 'winston';

const TradesTable = props => {
    const { trades } = props;

    const renderProfit = (type, openPrice, closePrice, leverage) => {
        let profit;

        if (type === SIGNAL_TYPES.buy) {
            profit = ((closePrice - openPrice) / openPrice) * 100 * leverage;
        } else if (type === SIGNAL_TYPES.sell) {
            profit = ((openPrice - closePrice) / openPrice) * 100 * leverage;
        }

        return profit.toFixed(2) + '%';
    };

    return (
        <Table records={trades}>
            <Table.Column title={'Symbol'} dataIndex={'symbol'} />
            <Table.Column
                title={'Mode'}
                dataIndex={'mode'}
                render={mode => <span>{mode === TRADE_MODES.spot ? 'Spot' : 'Futures'}</span>}
            />
            <Table.Column
                title={'Type'}
                dataIndex={'type'}
                render={type => (
                    <span
                        className={classNames('px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full', {
                            'bg-green-500 text-white': type === SIGNAL_TYPES.buy,
                            'bg-red-100 text-red-700': type === SIGNAL_TYPES.sell,
                        })}
                    >
                        {type === SIGNAL_TYPES.buy ? 'Buy' : 'Sell'}
                    </span>
                )}
            />
            <Table.Column
                title={'Take profit percentage'}
                dataIndex={'take_profit_percentage'}
                render={percentage => percentage + '%'}
            />
            <Table.Column
                title={'Stop loss percentage'}
                dataIndex={'stop_loss_percentage'}
                render={percentage => percentage + '%'}
            />
            <Table.Column
                title={'Leverage'}
                render={record => (record.mode === TRADE_MODES.spot ? '-' : record.leverage)}
            />
            <Table.Column title={'Quantity'} dataIndex={'quantity'} />
            <Table.Column title={'Amount'} dataIndex={'amount'} render={amount => amount.toFixed(2)} />
            <Table.Column title={'Open price'} dataIndex={'open_price'} />
            <Table.Column title={'Close price'} dataIndex={'close_price'} />
            <Table.Column
                title={'Profit'}
                render={record => renderProfit(record.type, record.open_price, record.close_price, record.leverage)}
            />
        </Table>
    );
};

export default TradesTable;
