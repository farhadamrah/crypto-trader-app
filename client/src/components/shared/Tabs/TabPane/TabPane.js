import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TabPane = props => {
    const { icon, children, className, ...tabPaneProps } = props;

    return (
        <div className={`flex justify-between cursor-pointer py-3 mb-3  ${className}`} {...tabPaneProps}>
            <div className='flex items-center'>
                <FontAwesomeIcon icon={icon} className='fa-2x mr-2' />
                <span className='text-lg font-medium'>{children}</span>
            </div>
            <FontAwesomeIcon icon='chevron-right' className='fa-1x self-center mr-10 2xl:mr-16' />
        </div>
    );
};

TabPane.propTypes = {
    className: PropTypes.string,
    key: PropTypes.string,
};

export default TabPane;
