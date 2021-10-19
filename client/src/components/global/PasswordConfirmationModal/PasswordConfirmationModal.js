import Modal from '../../shared/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { hidePasswordConfirmationModal } from '../../../redux/actions/global';
import { useForm } from 'react-hook-form';
import FormItem from '../../shared/Form/FormItem/FormItem';
import Input from '../../shared/Input/Input';
import { generateConfirmationToken } from '../../../redux/actions/auth';

const PasswordConfirmationModal = () => {
    const dispatch = useDispatch();

    const modalProps = useSelector(state => state.global.passwordConfirmationModalProps);

    const {
        register: registerFormField,
        handleSubmit,
        reset,
        formState: { isDirty: hasUnsavedChanged },
    } = useForm({});

    const { isVisible, successCallback } = modalProps;

    const onClose = () => {
        dispatch(hidePasswordConfirmationModal());
        resetForm();
    };

    const onOk = () => {
        handleSubmit(async values => {
            const token = await dispatch(generateConfirmationToken(values.password));

            if (token) {
                if (successCallback) {
                    successCallback();
                }

                dispatch(hidePasswordConfirmationModal());
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
            title={'Confirm Password'}
            buttonProps={{
                okText: 'Confirm',
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

export default PasswordConfirmationModal;
