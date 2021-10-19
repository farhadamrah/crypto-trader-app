import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, redirect: pathname, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (isAuthenticated ? <Component {...rest} {...props} /> : <Redirect to={pathname} />)}
        />
    );
};

PrivateRoute.defaultProps = { redirect: '/login' };

export default PrivateRoute;
