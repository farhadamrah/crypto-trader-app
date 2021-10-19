import { combineReducers } from 'redux';
import auth from './auth';
import components from './components';
import global from './global';
import configurations from './configurations';
import trades from './trades';

const rootReducer = combineReducers({
    auth,
    configurations,
    components,
    global,
    trades,
});

export default rootReducer;
