import PropTypes from 'prop-types';

const TAG_COLORS = {
    green: 'bg-green-200 border-green-500',
    red: 'bg-red-200 border-red-500',
};

const Tag = props => {
    const { color, children, className, ...tagProps } = props;

    return (
        <span className={`py-0.5 px-2 text-sm rounded border ${TAG_COLORS[color]} ${className}`} {...tagProps}>
            {children}
        </span>
    );
};

Tag.propTypes = {};

export default Tag;
