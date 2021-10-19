import PropTypes from 'prop-types';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { isPrivateRoute } from '../../utils/route';
import AuthPage from '../Auth/AuthPage';

const PublicRoutes = props => {
    const history = useHistory();
    const location = useLocation();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated && !isPrivateRoute(location.pathname)) {
            history.push(ROUTES.settings.path);
        }
    }, [isAuthenticated]);

    return (
        <Switch>
            <Route
                path={[ROUTES.login.path, ROUTES.register.path]}
                render={() => (
                    <AuthPage>
                        <Route exact path={ROUTES.login.path} component={Login} />
                        <Route exact path={ROUTES.register.path} component={Register} />
                    </AuthPage>
                )}
            />

            {!isPrivateRoute(location.pathname) && <Redirect from={'/'} to={ROUTES.login.path} />}
        </Switch>
    );
};

PublicRoutes.propTypes = {};

export default PublicRoutes;
