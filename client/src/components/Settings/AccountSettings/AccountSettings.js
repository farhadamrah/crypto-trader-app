import PropTypes from 'prop-types';
import { useState } from 'react';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import { BUTTON_TYPES, MESSAGE_TYPE, ROUTES } from '../../../config/constants';
import FormItem from '../../shared/Form/FormItem/FormItem';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../../redux/actions/users';
import { setUserLoggedOut } from '../../../redux/actions/auth';
import { deleteAuthToken } from '../../../utils/auth';
import classNames from 'classnames';
import { showMessageComponent } from '../../../redux/actions/components';

const AccountSettings = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.auth.user);

    const {
        register: registerFormField,
        handleSubmit,
        reset,
        formState: { isDirty: hasUnsavedChanged },
    } = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            api_key: user.api_key,
            secret_key: user.secret_key,
        },
    });

    const [isEditing, setIsEditing] = useState(false);

    const toggleIsEditing = () => {
        setIsEditing(isEditing => !isEditing);
    };

    const onEditClick = () => {
        toggleIsEditing();
    };

    const onDiscardClick = () => {
        reset(user);
        toggleIsEditing();
    };

    const onSaveClick = async values => {
        if (!hasUnsavedChanged) return;

        const updatedUser = await dispatch(updateUser({ id: user.id, ...values }));

        if (updatedUser) {
            reset(updatedUser);
            toggleIsEditing();
        }
    };

    const onDeleteAccountClick = async () => {
        const deletedUser = await dispatch(deleteUser(user.id));

        if (deletedUser) {
            dispatch(setUserLoggedOut());
            deleteAuthToken();
            history.push(ROUTES.login.path);
        }
    };

    return (
        <div className='h-full flex flex-col'>
            <h1 className='text-2xl text-gray-800 font-medium pb-6 mb-10 border-b border-gray-300'>Account Settings</h1>
            <div>
                <div className='bg-white p-5 rounded-md shadow mb-10'>
                    <h2 className='mb-7 text-xl text-gray-800'>Personal Information</h2>
                    <div className='flex-col'>
                        <div className='sm:flex mb-6'>
                            <div className='flex flex-col sm:w-1/2 sm:mr-6 mb-6 sm:mb-0'>
                                <FormItem label={'First name'}>
                                    <Input
                                        className={'border-gray-200 text-gray-700 w-full'}
                                        type={'text'}
                                        placeholder={'First name'}
                                        disabled={!isEditing}
                                        {...registerFormField('first_name')}
                                    />
                                </FormItem>
                            </div>
                            <div className='flex flex-col sm:w-1/2'>
                                <FormItem label={'Last Name'}>
                                    <Input
                                        className={'border-gray-200 text-gray-700 w-full'}
                                        type={'text'}
                                        placeholder={'Last name'}
                                        disabled={!isEditing}
                                        {...registerFormField('last_name')}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <FormItem label={'Email'}>
                                <Input
                                    className={'border-gray-200 text-gray-700 w-full'}
                                    type={'email'}
                                    placeholder={'Email'}
                                    disabled={!isEditing}
                                    {...registerFormField('email')}
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-5 rounded-md shadow mb-10'>
                    <h2 className='mb-7 text-xl text-black'>Binance API</h2>
                    <div className='sm:flex mb-7'>
                        <div className='flex flex-col sm:w-1/2 sm:mr-6 mb-6'>
                            <FormItem label={'API key'}>
                                <Input
                                    className={'border-gray-200 text-gray-700 w-full'}
                                    type={'text'}
                                    placeholder={'API key'}
                                    disabled={!isEditing}
                                    {...registerFormField('api_key')}
                                />
                            </FormItem>
                        </div>
                        <div className='flex flex-col sm:w-1/2'>
                            <FormItem label={'Secret Key'}>
                                <Input
                                    className={'border-gray-200 text-gray-700 w-full'}
                                    type={'text'}
                                    placeholder={'Secret Key'}
                                    disabled={!isEditing}
                                    {...registerFormField('secret_key')}
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button
                        className={'bg-red-600 hover:bg-red-700 focus:bg-red-700 w-40 justify-self-end'}
                        type={BUTTON_TYPES.primary}
                        disabled
                        onClick={onDeleteAccountClick}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
            <div className='border-t border-gray-300 pt-8 mt-9'>
                <div className='flex justify-end'>
                    {!isEditing && (
                        <Button className={'w-56 rounded bg-indigo-700'} type={'primary'} onClick={onEditClick}>
                            Edit
                        </Button>
                    )}

                    <div
                        className={classNames('flex justify-end w-full xl:w-10/12', {
                            hidden: !isEditing,
                        })}
                    >
                        <Button type={'link'} onClick={onDiscardClick}>
                            Discard changes
                        </Button>
                        <Button
                            className={'w-32 ml-6 lg:w-56 rounded bg-indigo-700'}
                            type={'primary'}
                            htmlType={'submit'}
                            disabled={!hasUnsavedChanged}
                            onClick={() => handleSubmit(onSaveClick)()}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

AccountSettings.propTypes = {};

export default AccountSettings;
