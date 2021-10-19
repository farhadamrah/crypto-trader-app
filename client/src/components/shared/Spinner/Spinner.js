import styles from './Spinner.module.scss';
import { SPINNER_SIZES } from '../../../config/constants';

const SPINNER_STYLES = {
    [SPINNER_SIZES.small]: 'w-16 h-16',
    [SPINNER_SIZES.medium]: 'w-32 h-32',
    [SPINNER_SIZES.large]: 'w-64 h-64',
};

const Spinner = props => {
    const { size } = props;

    return (
        <div className={'flex flex-col justify-center items-center fixed w-full h-full z-50 pointer-events-none'}>
            <div
                className={`${styles.spinner} ${SPINNER_STYLES[size]} ease-linear rounded-full border-8 border-t-8 border-gray-200`}
            />
            <h2 className='text-center text-black text-xl font-bold mt-4'>Loading...</h2>
        </div>
    );
};

export default Spinner;
