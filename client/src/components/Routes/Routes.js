import PropTypes from 'prop-types';
import React, { Suspense, lazy, useEffect } from 'react';
import { useLocation, Switch, Redirect } from 'react-router-dom';
import { isPrivateRoute } from '../../utils/route';
import PublicRoutes from './PublicRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../redux/actions/auth';
import Spinner from '../shared/Spinner/Spinner';
import { ROUTES, SPINNER_SIZES } from '../../config/constants';
import { setAppLoading } from '../../redux/actions/global';
const PrivateRoutes = React.lazy(() => import('./PrivateRoutes'));

const Routes = props => {
    const dispatch = useDispatch();
    const location = useLocation();

    const isAppLoading = useSelector(state => state.global.isAppLoading);

    useEffect(() => {
        const loadApp = async () => {
            if (localStorage.getItem('token')) {
                await dispatch(fetchCurrentUser());
            }

            dispatch(setAppLoading(false));
        };

        loadApp();
    }, []);

    return isAppLoading ? (
        <Spinner size={SPINNER_SIZES.medium} />
    ) : (
        <>
            <PublicRoutes />
            {isPrivateRoute(location.pathname) ? (
                <Suspense fallback={<Spinner size={SPINNER_SIZES.medium} />}>
                    <PrivateRoutes />
                </Suspense>
            ) : null}
        </>
    );
};

Routes.propTypes = {};

export default Routes;
