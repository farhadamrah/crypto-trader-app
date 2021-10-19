import Modal from '../../shared/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { hideActionConfirmationModal } from '../../../redux/actions/global';

const ActionConfirmModal = () => {
    const dispatch = useDispatch();

    const modalProps = useSelector(state => state.global.actionConfirmationModalProps);

    const { isVisible, okCallback, title, okText } = modalProps;

    const onClose = () => {
        dispatch(hideActionConfirmationModal());
    };

    const onOk = () => {
        if (okCallback) {
            okCallback();
        }
        dispatch(hideActionConfirmationModal());
    };

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            onOk={onOk}
            title={title || 'Confirm action'}
            buttonProps={{
                okText: okText || 'Confirm',
            }}
            showClose
            showFooter
        >
            <div className='py-4' />
        </Modal>
    );
};

export default ActionConfirmModal;
