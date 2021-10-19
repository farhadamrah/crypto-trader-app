import PropTypes from 'prop-types';
import TabPane from './TabPane/TabPane';

const Tabs = props => {
    const { children, ...tabsProps } = props;

    return (
        <div className={`flex flex-col`} {...tabsProps}>
            {children}
        </div>
    );
};

Tabs.propTypes = {};

Tabs.Pane = TabPane;

export default Tabs;
