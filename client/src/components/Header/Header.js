import PropTypes from 'prop-types';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BREAKPOINTS } from '../../config/constants';
import useWindowSize from '../../hooks/useWindowSize';

const Header = props => {
    const { openMobileMenu, ...headerProps } = props;

    const { width: windowWidth } = useWindowSize();

    return (
        <div className='bg-white shadow flex justify-end items-center pr-10 px-6 md:py-2 h-14'>
            <div className='flex flex-col'>
                {windowWidth > BREAKPOINTS.lg ? (
                    <ProfileMenu />
                ) : (
                    <FontAwesomeIcon
                        icon='bars'
                        className='fa-2x z-50 text-indigo-700 cursor-pointer'
                        onClick={openMobileMenu}
                    />
                )}
            </div>
        </div>
    );
};

Header.propTypes = {};

export default Header;
