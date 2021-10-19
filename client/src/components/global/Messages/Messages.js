import styles from './Messages.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MESSAGE_TYPE } from '../../../config/constants';
import { useSelector } from 'react-redux';

const ICONS = {
    [MESSAGE_TYPE.success]: 'check-circle',
    [MESSAGE_TYPE.warning]: 'exclamation-circle',
    [MESSAGE_TYPE.error]: 'times',
};

const ICONS_STYLE = {
    [MESSAGE_TYPE.success]: 'text-green-500',
    [MESSAGE_TYPE.warning]: 'text-yellow-500',
    [MESSAGE_TYPE.error]: 'text-red-500',
};

const Messages = () => {
    const messages = useSelector(state => state.components.messages);

    return (
        <div className={styles.container}>
            {messages.map(message => {
                return (
                    <div
                        key={message.id}
                        className={`bg-white shadow-md rounded px-5 py-3 flex items-center justify-center my-2`}
                    >
                        <FontAwesomeIcon
                            icon={ICONS[message.type]}
                            className={`fa-lg mr-3 ${ICONS_STYLE[message.type]}`}
                        />
                        <span>{message.message}</span>
                    </div>
                );
            })}
        </div>
    );
};

Messages.propTypes = {};

export default Messages;
