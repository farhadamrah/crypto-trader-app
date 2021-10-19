import React from 'react';
import PropTypes from 'prop-types';

const FormItem = props => {
    const { label, hasValidationError, helpMessage, children, className, ...formItemProps } = props;

    return (
        <div className={`flex flex-col ${className}`} {...formItemProps}>
            {label && <span className='mb-1.5 font-medium text-sm text-gray-800'>{label}</span>}
            {children}
            {hasValidationError && <p className='text-red-500 text-xs mt-1'>{helpMessage}</p>}
        </div>
    );
};

FormItem.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
};

export default FormItem;
