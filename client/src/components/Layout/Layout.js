import PropTypes from 'prop-types';
import styles from './Layout.module.scss';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { BREAKPOINTS } from '../../config/constants';
import MobileMenu from '../MobileMenu/MobileMenu';
import useDrawer from '../../hooks/useDrawer';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Layout = props => {
    const { children, ...layoutProps } = props;

    const isSidebarCollapsed = useSelector(state => state.global.isSidebarCollapsed);

    const { width: windowWidth } = useWindowSize();

    const [isMobileMenuVisible, openMobileMenu, closeMobileMenu] = useDrawer();

    return (
        <div className={'min-h-screen flex'}>
            {windowWidth > BREAKPOINTS.lg ? (
                <Sidebar />
            ) : (
                <MobileMenu isVisible={isMobileMenuVisible} closeMenu={closeMobileMenu} />
            )}
            <div
                className={classNames('flex flex-auto w-full flex-col transition-all duration-300', {
                    [`${styles.expandedRightSideLayout} ml-24`]: windowWidth > BREAKPOINTS.lg && isSidebarCollapsed,
                    [`${styles.collapsedRightSideLayout} ml-72`]: windowWidth > BREAKPOINTS.lg && !isSidebarCollapsed,
                })}
            >
                <Header openMobileMenu={openMobileMenu} />
                <main className='flex-auto transition-all duration-300 bg-gray-100'>{children}</main>
            </div>
        </div>
    );
};

Layout.propTypes = {};

export default Layout;
