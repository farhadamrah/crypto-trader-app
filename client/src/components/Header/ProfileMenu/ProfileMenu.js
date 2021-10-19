import { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from '../../../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAuthToken } from '../../../utils/auth';
import { setCurrentUser, setUserLoggedOut } from '../../../redux/actions/auth';

const ProfileMenu = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.auth.user);

    const onLogoutClick = () => {
        dispatch(setUserLoggedOut());
        deleteAuthToken();
        history.push(ROUTES.login.path);
    };

    return (
        <Menu as='div' className='relative inline-block text-left z-30'>
            <Menu.Button className='flex items-center relative cursor-pointer'>
                <img
                    className={'rounded-full w-10 h-auto mr-1'}
                    src={`https://ui-avatars.com/api/?background=4338CA&color=fff&name=${user.first_name}+${user.last_name}`}
                />
                {/*<FontAwesomeIcon icon='user-circle' className='fa-2x mr-2' />*/}
                <span>
                    {user.first_name} {user.last_name}
                </span>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-300'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-200'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='px-1 py-1 '>
                        <Link to={ROUTES.settings.path}>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'hover:bg-gray-100 text-black' : 'text-gray-900'
                                        } group flex rounded-md items-center w-full px-3 py-2 text-sm`}
                                    >
                                        <FontAwesomeIcon icon='cog' className='text-indigo-600 w-6 mr-3' />
                                        Settings
                                    </button>
                                )}
                            </Menu.Item>
                        </Link>
                    </div>
                    <div className='px-1 py-1'>
                        <Link to={'#'} onClick={onLogoutClick}>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'hover:bg-gray-100 text-black' : 'text-gray-900'
                                        } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
                                    >
                                        {/*<img src={logOut} className='w-6 ml-1 mr-2' alt='icon' />*/}
                                        <FontAwesomeIcon icon='sign-out-alt' className='text-red-600 w-6 mr-3' />
                                        Log out
                                    </button>
                                )}
                            </Menu.Item>
                        </Link>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

ProfileMenu.propTypes = {};

export default ProfileMenu;
