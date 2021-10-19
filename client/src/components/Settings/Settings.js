import PropTypes from 'prop-types';
import useWindowSize from '../../hooks/useWindowSize';
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { BREAKPOINTS, ROUTES } from '../../config/constants';
import Tabs from '../shared/Tabs/Tabs';
import AccountSettings from './AccountSettings/AccountSettings';
import Security from './Security/Security';
import Telegram from './Telegram/Telegram';
import Select from './AccountSettings/Select/Select';

const Settings = props => {
    const { pathname } = useLocation();

    const { width: windowWidth } = useWindowSize();

    return (
        <div className='lg:flex w-full lg:h-full pb-0 pr-0 text-gray-800'>
            {windowWidth > BREAKPOINTS.lg ? (
                <div className='w-4/12 h-full pl-10 pt-10 border-r border-gray-300'>
                    <h1 className='text-2xl text-gray-800 font-medium pb-6 mb-10 border-b border-gray-300'>Settings</h1>
                    <Tabs className={'text-gray-600'}>
                        <Link to={ROUTES.accountSettings.path}>
                            <Tabs.Pane
                                icon={'user-circle'}
                                className={'hover:text-gray-900 pb-6 border-b border-gray-300'}
                            >
                                Account Settings
                            </Tabs.Pane>
                        </Link>
                        <Link to={ROUTES.securitySettings.path}>
                            <Tabs.Pane
                                icon={'shield-alt'}
                                className={'hover:text-gray-900 pb-6 border-b border-gray-300'}
                            >
                                Security
                            </Tabs.Pane>
                        </Link>

                        <Link to={ROUTES.telegramSettings.path}>
                            <Tabs.Pane icon={['fab', 'telegram']} className={'hover:text-gray-900'}>
                                Telegram
                            </Tabs.Pane>
                        </Link>
                    </Tabs>
                </div>
            ) : (
                <div className='p-10 pb-4 pr-8'>
                    <h1 className='text-2xl text-gray-800 font-medium mb-4'>Settings</h1>
                    <Select />
                </div>
            )}

            <div className='h-full flex-grow p-10'>
                <Switch>
                    <Route exact path={ROUTES.accountSettings.path} component={AccountSettings} />
                    <Route exact path={ROUTES.securitySettings.path} component={Security} />
                    <Route exact path={ROUTES.telegramSettings.path} component={Telegram} />
                    <Redirect to={ROUTES.accountSettings.path} />
                </Switch>
            </div>
        </div>
    );
};

Settings.propTypes = {};

export default Settings;
