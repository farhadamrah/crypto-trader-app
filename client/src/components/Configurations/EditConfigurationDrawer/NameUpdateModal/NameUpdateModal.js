import PropTypes from 'prop-types';
import Modal from '../../../shared/Modal/Modal';
import Input from '../../../shared/Input/Input';
import FormItem from '../../../shared/Form/FormItem/FormItem';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateConfiguration } from '../../../../redux/actions/configurations';
import { useEffect } from 'react';

const NameUpdateModal = props => {
    const dispatch = useDispatch();

    const { isVisible, hideModal, configurationId, configurationName } = props;

    const {
        register: registerFormField,
        handleSubmit,
        reset,
        formState: { isDirty: hasUnsavedChanged },
    } = useForm({});

    useEffect(() => {
        reset({ name: configurationName });
    }, [configurationName]);

    const onClose = () => {
        hideModal();
    };

    const onOk = () => {
        handleSubmit(async values => {
            const updatedConfiguration = await dispatch(updateConfiguration({ ...values, id: configurationId }));

            if (updatedConfiguration) {
                hideModal();
            }
        })();
    };

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            onOk={onOk}
            title={'Update name'}
            buttonProps={{
                okText: 'Update',
            }}
            showClose
            showFooter
        >
            <div className='px-5 py-7 border-b border-t border-gray-200'>
                <FormItem label={'Name'}>
                    <Input placeholder={'Name'} {...registerFormField('name')} />
                </FormItem>
            </div>
        </Modal>
    );
};

NameUpdateModal.propTypes = {};

export default NameUpdateModal;
