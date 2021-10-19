import styles from './NewConfiguration.module.scss';
import PropTypes from 'prop-types';

const NewConfiguration = props => {
    const { showNewConfigurationModal } = props;

    return (
        <div className={styles.configuration} onClick={showNewConfigurationModal}>
            <span className='text-4xl text-gray-400 font-thin'>+</span>
        </div>
    );
};

NewConfiguration.propTypes = {};

export default NewConfiguration;
