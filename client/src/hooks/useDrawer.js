import { useState } from 'react';
import PropTypes from 'prop-types';

const useDrawer = props => {
    const [isVisible, setIsVisible] = useState(false);

    const openDrawer = () => {
        setIsVisible(true);
    };

    const closeDrawer = () => {
        setIsVisible(false);
    };

    return [isVisible, openDrawer, closeDrawer];
};

useDrawer.propTypes = {};

export default useDrawer;
