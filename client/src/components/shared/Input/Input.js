import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PasswordInput from './PasswordInput';

const Input = forwardRef((props, ref) => {
    const { className, ...inputProps } = props;

    return (
        <input
            ref={ref}
            className={`w-full px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring focus:ring-indigo-300 rounded ${className}`}
            {...inputProps}
        />
    );
});

Input.propTypes = {
    classname: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
};

Input.Password = PasswordInput;

export default Input;
