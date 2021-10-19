import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import Layout from '../Layout/Layout';
import PrivateRoute from '../shared/PrivateRoute/PrivateRoute';
import Settings from '../Settings/Settings';
import Configurations from '../Configurations/Configurations';
import History from '../History/History';
import { useSelector } from 'react-redux';

const PrivateRoutes = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Layout>
            <Switch>
                <PrivateRoute path={ROUTES.settings.path} component={Settings} isAuthenticated={isAuthenticated} />
                <PrivateRoute
                    exact
                    path={ROUTES.configurations.path}
                    component={Configurations}
                    isAuthenticated={isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path={ROUTES.configurations.path}
                    component={Configurations}
                    isAuthenticated={isAuthenticated}
                />
                <PrivateRoute exact path={ROUTES.history.path} component={History} isAuthenticated={isAuthenticated} />
                <Redirect from={'/'} to={ROUTES.login.path} />
            </Switch>
        </Layout>
    );
};

PrivateRoutes.propTypes = {};

export default PrivateRoutes;
