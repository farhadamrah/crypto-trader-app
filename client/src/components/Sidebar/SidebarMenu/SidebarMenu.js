import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../../shared/Menu/Menu';
import { ROUTES } from '../../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const SidebarMenu = props => {
    const location = useLocation();

    const { pathname } = location;

    const { isSidebarCollapsed } = props;

    return (
        <>
            <Menu className={'flex flex-col items-center justify-center'}>
                <Menu.SubMenu
                    className={'text-gray-400'}
                    icon={<FontAwesomeIcon icon={'hand-holding-usd'} className='fa-lg' />}
                    title={'Trade'}
                    isMenuCollapsed={isSidebarCollapsed}
                    isAnyChildMenuActive={[ROUTES.configurations.path, ROUTES.history.path].some(path =>
                        pathname.includes(path)
                    )}
                >
                    <Link className={'w-full block my-2 px-2'} to={ROUTES.configurations.path}>
                        <Menu.Item
                            className={'text-gray-400'}
                            isMenuCollapsed={isSidebarCollapsed}
                            isActive={pathname.includes(ROUTES.configurations.path)}
                        >
                            Configurations
                        </Menu.Item>
                    </Link>
                    <Link className={'w-full block my-2 px-2'} to={ROUTES.history.path}>
                        <Menu.Item
                            className={'text-gray-400'}
                            isMenuCollapsed={isSidebarCollapsed}
                            isActive={pathname.includes(ROUTES.history.path)}
                        >
                            History
                        </Menu.Item>
                    </Link>
                </Menu.SubMenu>

                <Link className={'w-full block my-2 px-6'} to={ROUTES.settings.path}>
                    <Menu.Item
                        className={'text-gray-400'}
                        icon={<FontAwesomeIcon icon={'cog'} className='fa-lg' />}
                        isMenuCollapsed={isSidebarCollapsed}
                        isActive={pathname.includes(ROUTES.settings.path)}
                    >
                        Settings
                    </Menu.Item>
                </Link>
            </Menu>
        </>
    );
};

SidebarMenu.propTypes = {};

export default SidebarMenu;
