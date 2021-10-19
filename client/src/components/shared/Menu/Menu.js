import PropTypes from 'prop-types';
import MenuItem from './MenuItem/MenuItem';
import SubMenu from './SubMenu/SubMenu';

const Menu = props => {
    const { children, className, ...menuProps } = props;

    return (
        <div className={className} {...menuProps}>
            {children}
        </div>
    );
};

Menu.propTypes = {
    className: PropTypes.string,
};

Menu.SubMenu = SubMenu;
Menu.Item = MenuItem;

export default Menu;
