import styles from './Button.module.scss';
import PropTypes from 'prop-types';
import { BUTTON_TYPES } from '../../../config/constants';
import classNames from 'classnames';

const BUTTON_STYLES = {
    [BUTTON_TYPES.primary]: styles.primaryButton,
    [BUTTON_TYPES.link]: styles.linkButton,
};

const Button = props => {
    const { children, className, type, htmlType, disabled, ...buttonProps } = props;

    return (
        <button
            className={classNames(BUTTON_STYLES[type], className, { [styles.disabledPrimaryButton]: disabled })}
            type={htmlType}
            {...buttonProps}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    classname: PropTypes.string,
    type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
};

export default Button;
