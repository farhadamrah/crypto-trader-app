import PropTypes from 'prop-types';
import Modal from '../../../shared/Modal/Modal';
import Input from '../../../shared/Input/Input';
import FormItem from '../../../shared/Form/FormItem/FormItem';
import { useForm } from 'react-hook-form';
import { updatePassword } from '../../../../redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../../../shared/Modal/Modal';

const PasswordUpdateModal = props => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const { isVisible, hideModal } = props;

    const {
        register: registerFormField,
        handleSubmit,
        reset,
        formState: { isDirty: hasUnsavedChanged },
    } = useForm({});

    const onClose = () => {
        hideModal();
        resetForm();
    };

    const onOk = () => {
        handleSubmit(async values => {
            const updatedUser = await dispatch(updatePassword({ ...values, id: user.id }));

            if (updatedUser) {
                hideModal();
                resetForm();
            }
        })();
    };

    const resetForm = () => {
        reset({ password: '' });
    };

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            onOk={onOk}
            title={'Update password'}
            buttonProps={{
                okText: 'Update',
            }}
            showClose
            showFooter
        >
            <div className='px-5 py-7 border-b border-t border-gray-200'>
                <FormItem label={'Password'}>
                    <Input.Password placeholder={'Password'} {...registerFormField('password')} />
                </FormItem>
            </div>
        </Modal>
    );
};

PasswordUpdateModal.propTypes = {};

export default PasswordUpdateModal;
