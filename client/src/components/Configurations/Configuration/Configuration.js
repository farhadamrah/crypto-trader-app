import styles from './Configuration.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Tag from '../../shared/Tag/Tag';
import Button from '../../shared/Button/Button';
import { BUTTON_TYPES } from '../../../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserConfiguration } from '../../../redux/actions/users';
import { showActionConfirmationModal } from '../../../redux/actions/global';

const Configuration = props => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const { isEditable, editConfiguration, ...configuration } = props;

    const { name, is_spot_enabled, is_futures_enabled } = configuration;

    const { active_configuration } = user;

    const isActive = configuration.id === active_configuration;

    const onEditClick = () => {
        editConfiguration(configuration);
    };

    const onStatusChangeClick = () => {
        dispatch(
            showActionConfirmationModal({
                okCallback: updateConfigurationActivationStatus,
                title: `Confirm ${isActive ? 'deactivation' : 'activation'}`,
            })
        );
    };

    const updateConfigurationActivationStatus = () => {
        dispatch(updateUserConfiguration({ id: user.id, active_configuration: isActive ? null : configuration.id }));
    };

    return (
        <>
            <div className={styles.configuration}>
                <div className='flex justify-between'>
                    <h1 className='text-lg font-medium'>{name}</h1>
                    <div className='flex'>
                        {isEditable && (
                            <div className='mr-5' onClick={onEditClick}>
                                <FontAwesomeIcon icon={'pencil-alt'} className='fa-xs text-gray-500 cursor-pointer' />
                            </div>
                        )}
                        <div>
                            <FontAwesomeIcon
                                icon={'dot-circle'}
                                className={classNames({
                                    'text-green-500': isActive,
                                    'text-gray-300': !isActive,
                                })}
                            />
                        </div>
                    </div>
                </div>
                {/*<span className='text-sm text-gray-400 mb-3'>Description</span>*/}
                <div className='text-sm mt-8 mb-4'>
                    {is_spot_enabled && (
                        <Tag className={'mr-2'} color={'green'}>
                            Spot
                        </Tag>
                    )}
                    {is_futures_enabled && <Tag color={'red'}>Futures</Tag>}
                </div>
                <div className={'flex justify-end'}>
                    <Button
                        className={classNames({
                            [styles.activateButton]: !isActive,
                            [styles.deactivateButton]: isActive,
                        })}
                        type={BUTTON_TYPES.primary}
                        onClick={onStatusChangeClick}
                    >
                        {isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                </div>
            </div>
        </>
    );
};

Configuration.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
};

export default Configuration;
