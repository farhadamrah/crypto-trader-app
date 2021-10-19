import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes/Routes';
import PropTypes from 'prop-types';
import './components/shared/Icons/Icons';
import { authenticateUser } from './utils/auth';
import Messages from './components/global/Messages/Messages';
import PasswordConfirmationModal from './components/global/PasswordConfirmationModal/PasswordConfirmationModal';

authenticateUser();

const App = props => {
    return (
        <Router>
            <Messages />
            <PasswordConfirmationModal />
            <Routes />
        </Router>
    );
};

App.propTypes = {};

export default App;
