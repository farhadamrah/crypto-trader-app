import PropTypes from 'prop-types';
import { Tab } from '@headlessui/react';
import Table from '../shared/Table/Table';
import { useEffect } from 'react';
import { getTradesList } from '../../redux/actions/trades';
import { useDispatch, useSelector } from 'react-redux';
import { SIGNAL_TYPES, TRADE_STATUSES, TRADE_MODES } from '../../config/constants';
import classNames from 'classnames';
import OpenTrades from './OpenTrades/OpenTrades';
import ClosedTrades from './ClosedTrades/ClosedTrades';

const TABS = {
    open: 'open',
    closed: 'closed',
};

const History = props => {
    return (
        <div className={'mx-6 my-8'}>
            <h1 className='mb-7 text-2xl text-gray-800 font-medium'>Trades</h1>
            <Tab.Group>
                <Tab.List className='flex border-b-2'>
                    <Tab
                        ket={TABS.open}
                        className={({ selected }) =>
                            classNames(
                                'text-gray-600 mr-6 py-1 block hover:text-blue-500 focus:outline-none font-medium border-blue-500',
                                selected ? 'border-b-2 text-blue-500' : ''
                            )
                        }
                    >
                        Open
                    </Tab>
                    <Tab
                        ket={TABS.closed}
                        className={({ selected }) =>
                            classNames(
                                'text-gray-600 mr-6 py-1 block hover:text-blue-500 focus:outline-none font-medium border-blue-500',
                                selected ? 'border-b-2 text-blue-500' : ''
                            )
                        }
                    >
                        Closed
                    </Tab>
                </Tab.List>
                <Tab.Panels className='mt-4 w-full'>
                    <Tab.Panel key={TABS.open} className={classNames('py-3')}>
                        <OpenTrades />
                    </Tab.Panel>
                    <Tab.Panel key={TABS.closed} className={classNames('py-3')}>
                        <ClosedTrades />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

History.propTypes = {};

export default History;
