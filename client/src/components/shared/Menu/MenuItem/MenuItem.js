import PropTypes from 'prop-types';
import classNames from 'classnames';

const MenuItem = props => {
    const { children, className, icon, isMenuCollapsed, isActive } = props;

    return (
        <div
            className={classNames(
                'flex items-center w-full p-2 pl-3 rounded-lg cursor-pointer transition-colors duration-200',

                {
                    'bg-indigo-600 text-white': isActive,
                    [`hover:text-gray-800 hover:bg-gray-100 ${className} `]: !isActive,
                }
            )}
        >
            <span
                className={classNames({
                    'text-white': isActive,
                    'text-indigo-600': !isActive,
                })}
            >
                {icon}
            </span>
            <span
                className={classNames('mx-4 text-lg font-normal transition-opacity duration-300', {
                    'opacity-0 invisible': isMenuCollapsed,
                    'opacity-100 visible': !isMenuCollapsed,
                })}
            >
                {children}
            </span>
        </div>
    );
};

MenuItem.propTypes = {
    className: PropTypes.string,
};

export default MenuItem;
