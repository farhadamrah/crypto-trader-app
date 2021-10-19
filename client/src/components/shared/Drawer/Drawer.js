import PropTypes from 'prop-types';
import { DRAWER_SIDE } from '../../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Drawer = props => {
    const { isVisible, onClose, children, className, side, header, title, showClose, ...drawerProps } = props;

    const DRAWER_STYLES = {
        [DRAWER_SIDE.left]: `w-9/12  left-0 ${isVisible ? '-translate-x-0' : '-translate-x-full'}`,

        [DRAWER_SIDE.right]: `w-8/12 md:w-6/12 right-0 overflow-y-scroll ${
            isVisible ? '-translate-x-0' : 'translate-x-full'
        }`,
    };

    return (
        <>
            <div
                className={`bg-black h-full w-full fixed right-0 top-0 z-40 transition-all duration-300 ease-in-out ${
                    isVisible ? 'opacity-50' : 'opacity-0 invisible'
                } `}
                onClick={onClose}
            />
            <div
                className={`h-screen bg-gray-100 space-y-6 fixed inset-y-0 transform transition duration-300 ease-in-out z-50 ${DRAWER_STYLES[side]} ${className}`}
                {...drawerProps}
            >
                <div className={`py-4 ${header && 'border-b'} `}>
                    <div className='px-2 lg:px-7 flex items-center'>
                        <div className='flex flex-grow'>{header}</div>
                        <FontAwesomeIcon
                            icon='times'
                            className='fa-lg text-gray-500 cursor-pointer'
                            onClick={onClose}
                        />
                    </div>
                </div>
                <div className='px-2 lg:px-7'>{children}</div>
            </div>
        </>
    );
};

Drawer.propTypes = {
    className: PropTypes.string,
    side: PropTypes.oneOf(Object.values(DRAWER_SIDE)),
};

export default Drawer;
