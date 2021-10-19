import PropTypes from 'prop-types';
import Drawer from '../shared/Drawer/Drawer';
import Menu from '../shared/Menu/Menu';
import { ROUTES, DRAWER_SIDE } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = props => {
    const location = useLocation();

    const { pathname } = location;

    const { isVisible, closeMenu } = props;

    const onMenuItemClick = () => {
        closeMenu();
    };

    return (
        <>
            <Drawer side={DRAWER_SIDE.left} className={'bg-white'} isVisible={isVisible} onClose={closeMenu}>
                <Menu className={'px-3'}>
                    <Menu.SubMenu
                        className={'text-gray-400'}
                        icon={<FontAwesomeIcon icon={'hand-holding-usd'} className='fa-lg' />}
                        title={'Trade'}
                        isAnyChildMenuActive={pathname.includes(ROUTES.configurations.path)}
                    >
                        <Link
                            className={'w-full block my-2 px-2'}
                            to={ROUTES.configurations.path}
                            onClick={onMenuItemClick}
                        >
                            <Menu.Item
                                className={'text-gray-400'}
                                isActive={pathname.includes(ROUTES.configurations.path)}
                            >
                                Configurations
                            </Menu.Item>
                        </Link>
                    </Menu.SubMenu>
                    <Link className={'w-full block my-2 px-6'} to={ROUTES.settings.path} onClick={onMenuItemClick}>
                        <Menu.Item
                            className={'text-gray-400'}
                            icon={<FontAwesomeIcon icon={'cog'} className='fa-lg text-white-600' />}
                            isActive={pathname.includes(ROUTES.settings.path)}
                        >
                            Settings
                        </Menu.Item>
                    </Link>
                </Menu>
            </Drawer>
        </>
    );
};

MobileMenu.propTypes = {};

export default MobileMenu;
