import { useState } from 'react';
import PropTypes from 'prop-types';
import { TOOLTIP_SIDE } from '../../../config/constants';

const TOOLTIP_STYLES = {
    [TOOLTIP_SIDE.top]: '-translate-x-24 -translate-y-8',
    [TOOLTIP_SIDE.right]: 'translate-x-2 -translate-y-1',
    [TOOLTIP_SIDE.bottom]: '-translate-x-24 translate-y-6',
    [TOOLTIP_SIDE.left]: '-translate-x-56 -translate-y-1',
};

const Tooltip = props => {
    const [showTooltip, setShowTooltip] = useState(false);

    const { title, side, children, className, ...tooltipProps } = props;

    return (
        <div onMouseEnter={() => setShowTooltip(!showTooltip)} onMouseLeave={() => setShowTooltip(!showTooltip)}>
            {children}
            <span
                className={`bg-gray-700 text-white py-1 text-center w-36 absolute rounded transform transition-all duration-300 ease-in-out ${
                    !showTooltip ? 'opacity-0 invisible' : ''
                }  ${TOOLTIP_STYLES[side]} ${className}`}
                {...tooltipProps}
            >
                {title}
            </span>
        </div>
    );
};

Tooltip.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    side: PropTypes.oneOf(Object.values(TOOLTIP_SIDE)),
};

export default Tooltip;
