import React from 'react';
import { BREAKPOINTS } from '../../config/constants';
import styles from './Auth.module.scss';
import useWindowSize from '../../hooks/useWindowSize';

const AuthPage = props => {
    const { width: windowWidth } = useWindowSize();

    return (
        <div className='min-h-screen h-auto flex justify-center'>
            {windowWidth >= BREAKPOINTS.xl && <div className={styles.background} />}
            {props.children}
        </div>
    );
};

export default AuthPage;
