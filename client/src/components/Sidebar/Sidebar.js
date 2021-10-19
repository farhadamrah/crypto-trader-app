import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import logo from '../../assets/images/logo.svg';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarCollapsedState } from '../../redux/actions/global';

const Sidebar = props => {
    const dispatch = useDispatch();

    const isSidebarCollapsed = useSelector(state => state.global.isSidebarCollapsed);

    const onSidebarToggle = () => {
        dispatch(toggleSidebarCollapsedState());
    };

    return (
        <div
            className={classNames('min-h-screen fixed shadow pt-4 transition-all duration-300 ease-in-out', {
                'w-24': isSidebarCollapsed,
                'w-72': !isSidebarCollapsed,
            })}
        >
            <FontAwesomeIcon
                icon={isSidebarCollapsed ? 'chevron-circle-right' : 'chevron-circle-left'}
                className={classNames(
                    'fa-2x text-indigo-600 bg-transparent cursor-pointer mt-2 absolute transition-all duration-300 ease-in-out top-1',
                    { 'left-20': isSidebarCollapsed, 'left-64 ml-4': !isSidebarCollapsed }
                )}
                onClick={onSidebarToggle}
            />
            <div className='flex flex-col items-center justify-start px-4 ml-1 mb-10'>
                <img className='w-24 h-24' src={logo} alt='logo' />
                <span
                    className={classNames(
                        'text-gray-600 ml-4 text-2xl font-bold transition-opacity delay-150 duration-300 whitespace-nowrap',
                        {
                            'opacity-0 invisible': isSidebarCollapsed,
                        }
                    )}
                >
                    Crypto Trader
                </span>
            </div>

            <SidebarMenu isSidebarCollapsed={isSidebarCollapsed} />
        </div>
    );
};

Sidebar.propTypes = {};

export default Sidebar;
