import PropTypes from 'prop-types';
import ModalComponent from '../../../shared/Modal/Modal';
import Input from '../../../shared/Input/Input';
import FormItem from '../../../shared/Form/FormItem/FormItem';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createConfiguration } from '../../../../redux/actions/configurations';

const Modal = props => {
    const dispatch = useDispatch();

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
            const configuration = await dispatch(createConfiguration(values));

            if (configuration) {
                hideModal();
                resetForm();
            }
        })();
    };

    const resetForm = () => {
        reset({ name: '' });
    };

    return (
        <ModalComponent
            isVisible={isVisible}
            onClose={onClose}
            onOk={onOk}
            title={'Create configuration'}
            buttonProps={{
                okText: 'Create',
            }}
            showClose
            showFooter
        >
            <div className='px-5 py-7 border-b border-t border-gray-200'>
                <FormItem label={'Name'}>
                    <Input type={'text'} placeholder={'Name'} {...registerFormField('name')} />
                </FormItem>
            </div>
        </ModalComponent>
    );
};

Modal.propTypes = {};

export default Modal;
