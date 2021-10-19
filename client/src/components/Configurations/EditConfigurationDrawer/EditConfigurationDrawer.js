import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Drawer from '../../shared/Drawer/Drawer';
import { DRAWER_SIDE, SIGNAL_TYPES } from '../../../config/constants';
import Tag from '../../shared/Tag/Tag';
import FormItem from '../../shared/Form/FormItem/FormItem';
import Input from '../../shared/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../shared/Button/Button';
import Switch from '../../shared/Switch/Switch';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfiguration } from '../../../redux/actions/configurations';
import useModal from '../../../hooks/useModal';
import NameUpdateModal from './NameUpdateModal/NameUpdateModal';

const getConfigurationFormFields = configuration => {
    return {
        futures_trade_amount: configuration.futures_trade_amount,
        futures_leverage: configuration.futures_leverage,
        futures_take_profit_percentage: configuration.futures_take_profit_percentage,
        futures_stop_loss_percentage: configuration.futures_stop_loss_percentage,
        futures_daily_trades: configuration.futures_daily_trades,
        futures_position_type: configuration.futures_position_type || SIGNAL_TYPES.all,
        concurrent_trades: configuration.concurrent_trades || 1,
    };
};

const EditConfigurationDrawer = props => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const { isVisible, closeDrawer, configuration } = props;

    const { name } = configuration;
    const { active_configuration } = user;

    const isActive = configuration.id === active_configuration;

    const [isEditing, setIsEditing] = useState(false);
    const [isSpotEnabled, setIsSpotEnabled] = useState(configuration.is_spot_enabled);
    const [isFuturesEnabled, setIsFuturesEnabled] = useState(configuration.is_futures_enabled);

    const {
        register: registerFormField,
        handleSubmit,
        reset,
        formState: { isDirty: hasUnsavedChanged },
    } = useForm({
        defaultValues: getConfigurationFormFields(configuration),
    });

    const [isNameUpdateModalVisible, showNameUpdateModal, hideNameUpdateModal] = useModal();

    useEffect(() => {
        setIsSpotEnabled(configuration.is_spot_enabled);
        setIsFuturesEnabled(configuration.is_futures_enabled);
        reset(getConfigurationFormFields(configuration));
    }, [configuration]);

    const onEditClick = () => {
        setIsEditing(true);
    };

    const onDiscardClick = () => {
        setIsEditing(false);
        reset(getConfigurationFormFields(configuration));
    };

    const onSaveClick = () => {
        handleSubmit(async values => {
            values.id = configuration.id;
            values.is_spot_enabled = isSpotEnabled;
            values.is_futures_enabled = isFuturesEnabled;

            const updatedConfiguration = await dispatch(updateConfiguration(values));

            if (updatedConfiguration) {
                setIsEditing(false);
            }
        })();
    };

    const onEditNameClick = () => {
        showNameUpdateModal();
    };

    return (
        <Drawer
            side={DRAWER_SIDE.right}
            isVisible={isVisible}
            onClose={closeDrawer}
            header={
                <div className={'flex justify-between items-center w-full'}>
                    <span className={'text-2xl font-medium'}>Configuration</span>
                    {isEditing ? (
                        <div>
                            <Button type={'link'} className={'mr-5'} onClick={onDiscardClick}>
                                Cancel
                            </Button>
                            <Button type={'primary'} className={'bg-indigo-600 p-2 mr-5'} onClick={onSaveClick}>
                                Save
                            </Button>
                        </div>
                    ) : (
                        <Button type={'primary'} className={'bg-indigo-600 p-2 mr-5'} onClick={onEditClick}>
                            Edit
                        </Button>
                    )}
                </div>
            }
        >
            <div>
                <div className='flex items-center justify-between mb-7 md:mb-12'>
                    <div className='flex items-center'>
                        <h1 className='md:text-2xl mr-3'>{name}</h1>
                        <FontAwesomeIcon
                            icon='pencil-alt'
                            className='text-gray-700 fa-sm md:fa-md cursor-pointer'
                            onClick={onEditNameClick}
                        />
                        <NameUpdateModal
                            isVisible={isNameUpdateModalVisible}
                            hideModal={hideNameUpdateModal}
                            configurationId={configuration.id}
                            configurationName={configuration.name}
                        />
                    </div>
                    {isActive ? <Tag color={'green'}>Active</Tag> : <Tag color={'red'}>Inactive</Tag>}
                </div>

                <div className='mb-8 bg-white p-5 rounded-md shadow'>
                    <div className='flex items-center justify-between mb-6'>
                        <h1 className='text-xl mr-10'>Spot</h1>
                        <Switch checked={false} onChange={setIsSpotEnabled} disabled={true} />
                    </div>
                    <div className='sm:flex mb-5'>
                        <FormItem
                            label={'Trade Amount'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2 sm:mr-8'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={1}
                                disabled={!isSpotEnabled || !isEditing}
                            />
                        </FormItem>
                        <FormItem
                            label={'Take Profit Percentage'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={0.1}
                                disabled={!isSpotEnabled || !isEditing}
                            />
                        </FormItem>
                    </div>
                    <div className='sm:flex'>
                        <FormItem
                            label={'Stop Loss Percentage'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2 sm:mr-8'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={0.1}
                                disabled={!isSpotEnabled || !isEditing}
                            />
                        </FormItem>
                        <FormItem
                            label={'Daily Trade Limit'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={1}
                                step={1}
                                disabled={!isSpotEnabled || !isEditing}
                            />
                        </FormItem>
                    </div>
                </div>

                <div className='mb-8 bg-white p-5 rounded-md shadow'>
                    <div className='flex items-center justify-between mb-6'>
                        <h1 className='text-xl mr-10'>Futures</h1>
                        <Switch checked={isFuturesEnabled} onChange={setIsFuturesEnabled} disabled={!isEditing} />
                    </div>
                    <div className='sm:flex mb-5'>
                        <FormItem
                            label={'Trade Amount'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2 sm:mr-8'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={1}
                                disabled={!isFuturesEnabled || !isEditing}
                                {...registerFormField('futures_trade_amount')}
                            />
                        </FormItem>
                        <FormItem
                            label={'Leverage'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={1}
                                max={125}
                                step={1}
                                disabled={!isFuturesEnabled || !isEditing}
                                {...registerFormField('futures_leverage')}
                            />
                        </FormItem>
                    </div>
                    <div className='sm:flex mb-5'>
                        <FormItem
                            label={'Take Profit Percentage'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2 sm:mr-8'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={0.1}
                                disabled={!isFuturesEnabled || !isEditing}
                                {...registerFormField('futures_take_profit_percentage')}
                            />
                        </FormItem>
                        <FormItem
                            label={'Stop Loss Percentage'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={0.1}
                                disabled={!isFuturesEnabled || !isEditing}
                                {...registerFormField('futures_stop_loss_percentage')}
                            />
                        </FormItem>
                    </div>
                    <div className='sm:flex mb-5'>
                        <FormItem
                            label={'Daily Trade Limit'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2 sm:mr-8'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={1}
                                step={1}
                                disabled={!isFuturesEnabled || !isEditing}
                                {...registerFormField('futures_daily_trades')}
                            />
                        </FormItem>
                        <FormItem
                            label={'Position side'}
                            helpMessage={'Please fill out this field'}
                            className={'mb-4 sm:mb-0 sm:w-1/2'}
                        >
                            <select
                                className={classNames(
                                    'h-8 w-full border border-gray-200 rounded focus:ring focus:ring-indigo-300 px-2 py-1 outline-none'
                                )}
                                disabled={!isFuturesEnabled || !isEditing}
                                {...registerFormField('futures_position_type')}
                            >
                                <option value={SIGNAL_TYPES.all}>Both</option>
                                <option value={SIGNAL_TYPES.buy}>Long</option>
                                <option value={SIGNAL_TYPES.sell}>Short</option>
                            </select>
                        </FormItem>
                    </div>
                </div>

                <div className='mb-8 bg-white p-5 rounded-md shadow'>
                    <h1 className='text-xl mb-6'>Global</h1>
                    <div className='flex sm:pr-7'>
                        <FormItem
                            label={'Concurrent Trades Limit'}
                            helpMessage={'Please fill out this field'}
                            className={'w-full sm:w-1/2'}
                        >
                            <Input
                                type={'number'}
                                className={'h-8 w-full'}
                                min={1}
                                step={1}
                                {...registerFormField('concurrent_trades')}
                            />
                        </FormItem>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

EditConfigurationDrawer.propTypes = {};

export default EditConfigurationDrawer;
