import PropTypes from 'prop-types';
import { Switch as SwitchComponent } from '@headlessui/react';
import classNames from 'classnames';

const Switch = props => {
    const { checked, onChange, disabled } = props;

    const handleChange = checked => {
        if (disabled) return;

        onChange(checked);
    };

    return (
        <SwitchComponent
            checked={checked}
            onChange={handleChange}
            className={classNames(
                'relative inline-flex flex-shrink-0 h-6 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
                { 'bg-green-300': checked, 'bg-gray-300': !checked }
            )}
        >
            <span
                aria-hidden='true'
                className={classNames(
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200',
                    {
                        'translate-x-8': checked,
                        'translate-x-0': !checked,
                    }
                )}
            />
        </SwitchComponent>
    );
};

Switch.propTypes = {};

export default Switch;
