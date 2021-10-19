import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../shared/Button/Button';
import { BUTTON_TYPES } from '../../../config/constants';
import useModal from '../../../hooks/useModal';
import { useDispatch } from 'react-redux';
import { showPasswordConfirmationModal } from '../../../redux/actions/global';
import PasswordUpdateModal from './PasswordUpdateModal/PasswordUpdateModal';

const Security = props => {
    const dispatch = useDispatch();

    const [isPasswordUpdateModalVisible, showPasswordUpdateModal, hidePasswordUpdateModal] = useModal();

    const onEditPasswordClick = () => {
        dispatch(showPasswordConfirmationModal(handlePasswordUpdate));
    };

    const handlePasswordUpdate = () => {
        showPasswordUpdateModal();
    };

    return (
        <div className='h-full flex flex-col'>
            <h1 className='text-2xl text-gray-800 font-medium pb-6 mb-10 border-b border-gray-300'>Security</h1>
            <div className='flex justify-between items-center bg-white p-5 rounded-md'>
                <span>Password</span>
                <Button type={BUTTON_TYPES.primary} className={'bg-indigo-600 w-32'} onClick={onEditPasswordClick}>
                    Edit
                </Button>
                <PasswordUpdateModal isVisible={isPasswordUpdateModalVisible} hideModal={hidePasswordUpdateModal} />
            </div>
        </div>
    );
};

Security.propTypes = {};

export default Security;
