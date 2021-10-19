import styles from './Connected.module.scss';
import PropTypes from 'prop-types';
import Button from '../../../shared/Button/Button';
import { BUTTON_TYPES } from '../../../../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { disconnectTelegram } from '../../../../redux/actions/users';
import { showPasswordConfirmationModal } from '../../../../redux/actions/global';

const Connected = props => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const { telegramId, telegramUsername } = props;

    const onDisconnectClick = () => {
        dispatch(showPasswordConfirmationModal(handleTelegramDisconnect));
    };

    const handleTelegramDisconnect = () => {
        dispatch(disconnectTelegram(user.id));
    };

    return (
        <div className={'my-4'}>
            <h2 className='text-gray-700 text-2xl text-center font-medium'>Telegram notifications is turned on</h2>
            <div className='flex items-center flex-wrap mt-8 text-lg'>
                <span className='font-medium mr-5'>Telegram ID:</span>
                <span>{telegramId}</span>
            </div>
            {telegramUsername && (
                <div className='flex items-center flex-wrap mt-8 text-lg'>
                    <span className='font-medium mr-5'>Username:</span>
                    <span>{telegramUsername}</span>
                </div>
            )}
            <div className={'flex justify-center mt-8'}>
                <Button className={styles.disconnectButton} type={BUTTON_TYPES.primary} onClick={onDisconnectClick}>
                    Disconnect
                </Button>
            </div>
        </div>
    );
};

Connected.propTypes = {};

export default Connected;
