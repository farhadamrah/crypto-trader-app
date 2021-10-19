import styles from './Modal.module.scss';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import { BUTTON_TYPES } from '../../../config/constants';
import classNames from 'classnames';

const Modal = props => {
    const {
        children,
        isVisible,
        onClose,
        onOk,
        title,
        showClose,
        showFooter,
        buttonProps: { cancelText = 'Cancel', okText = 'Ok' } = {},
    } = props;

    return (
        <Transition appear show={isVisible} as={Fragment}>
            <Dialog as='div' className='fixed inset-0 z-50 overflow-y-auto' onClose={onClose}>
                <div className='min-h-screen px-4 text-center'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        leave='ease-in duration-200'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay
                            className={classNames('fixed inset-0', {
                                'bg-black opacity-50': isVisible,
                            })}
                        />
                    </Transition.Child>

                    <span className='inline-block h-screen align-middle' aria-hidden='true'>
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <div className='inline-block w-full max-w-md my-8 py-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            {title && (
                                <div className='flex justify-between px-5 pb-3'>
                                    <h1 className='text-2xl text-gray-700 font-medium'>{title}</h1>
                                </div>
                            )}

                            {showClose && (
                                <FontAwesomeIcon
                                    icon={'times'}
                                    className='absolute right-5 top-5 fa-lg cursor-pointer text-gray-500 hover:text-gray-900 transition duration-200'
                                    onClick={onClose}
                                />
                            )}

                            {children}

                            {showFooter && (
                                <div className='flex justify-end px-5 pt-4'>
                                    <Button className={styles.cancelButton} type={BUTTON_TYPES.link} onClick={onClose}>
                                        {cancelText}
                                    </Button>
                                    <Button className={styles.okButton} type={BUTTON_TYPES.primary} onClick={onOk}>
                                        {okText}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

Modal.propTypes = {};

export default Modal;
