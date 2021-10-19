import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SubMenu = props => {
    const { children, className, title, icon, isMenuCollapsed, isAnyChildMenuActive } = props;

    const [isExpanded, setIsExpanded] = useState(isAnyChildMenuActive);

    const onSubMenuClick = () => {
        setIsExpanded(expanded => !expanded);
    };

    return (
        <div className={'w-full my-2 px-6'}>
            <div
                className={classNames(
                    'flex items-center justify-between p-2 pl-3 hover:text-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition duration-300 rounded-lg',
                    className,
                    {
                        'bg-gray-100 text-gray-800': isExpanded,
                    }
                )}
                onClick={onSubMenuClick}
            >
                <div>
                    <span className={'text-indigo-600'}>{icon}</span>
                    <span
                        className={classNames('mx-4 text-lg font-normal', {
                            'opacity-0 invisible': isMenuCollapsed,
                            'opacity-100 visible': !isMenuCollapsed,
                        })}
                    >
                        {title}
                    </span>
                </div>
                <FontAwesomeIcon
                    className={classNames('', {
                        'opacity-0 invisible': isMenuCollapsed,
                        'opacity-100 visible': !isMenuCollapsed,
                    })}
                    icon={isExpanded ? 'chevron-up' : 'chevron-down'}
                />
            </div>
            <div
                className={classNames('border-l-2 border-gray-100 ml-6 mt-2', {
                    hidden: isMenuCollapsed || !isExpanded,
                })}
            >
                {children}
            </div>
        </div>
    );
};

SubMenu.propTypes = {
    className: PropTypes.string,
};

export default SubMenu;
