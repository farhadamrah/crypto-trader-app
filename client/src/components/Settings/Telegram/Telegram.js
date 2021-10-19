import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../shared/Button/Button';
import classNames from 'classnames';
import Steps from './Steps/Steps';
import { useDispatch, useSelector } from 'react-redux';
import Connected from './Connected/Connected';
import { connectTelegram } from '../../../redux/actions/users';

const STEPS = {
    startBot: 1,
    copyId: 2,
    enterId: 3,
};

const Telegram = props => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const [currentStep, setCurrentStep] = useState(STEPS.startBot);
    const [telegramId, setTelegramId] = useState('');

    const onNextStepClick = async () => {
        if (currentStep === STEPS.enterId) {
            const updatedUser = await dispatch(connectTelegram({ telegram_id: telegramId, id: user.id }));

            if (updatedUser) {
                setCurrentStep(STEPS.startBot);
                setTelegramId('');
            }
        } else {
            setCurrentStep(step => step + 1);
        }
    };

    const onPreviousStepClick = () => {
        setCurrentStep(step => step - 1);
    };

    return (
        <div className='h-full flex flex-col'>
            <h1 className='text-2xl text-gray-800 font-medium pb-6 mb-10 border-b border-gray-300'>Telegram</h1>
            <div className='bg-white p-5 rounded-md shadow flex flex-col justify-between'>
                {user.telegram_id ? (
                    <Connected telegramId={user.telegram_id} telegramUsername={user.telegram_username} />
                ) : (
                    <>
                        <div>
                            <div className='bg-gray-100 xl:flex items-center justify-between rounded-md p-3 mb-5'>
                                <div
                                    className='flex items-center cursor-pointer'
                                    onClick={() => setCurrentStep(STEPS.startBot)}
                                >
                                    <span
                                        className={classNames(
                                            'rounded-full shadow w-8 h-8 font-semibold mr-2 flex justify-center items-center cursor-pointer',
                                            {
                                                'bg-indigo-600 text-white': currentStep === STEPS.startBot,
                                                'bg-green-400 text-white': currentStep > STEPS.startBot,
                                            }
                                        )}
                                    >
                                        {STEPS.startBot}
                                    </span>
                                    <span
                                        className={classNames('cursor-pointer', {
                                            'text-indigo-700': currentStep === STEPS.startBot,
                                            'text-green-500': currentStep > STEPS.startBot,
                                        })}
                                    >
                                        Start bot
                                    </span>
                                </div>
                                <FontAwesomeIcon
                                    icon={currentStep > STEPS.startBot ? 'grip-lines' : 'ellipsis-h'}
                                    className={classNames(
                                        'text-gray-400 transform rotate-90 xl:rotate-0 ml-2 xl:ml-0',
                                        {
                                            'text-green-500': currentStep > STEPS.startBot,
                                        }
                                    )}
                                />
                                <div
                                    className='flex items-center cursor-pointer'
                                    onClick={() => setCurrentStep(STEPS.copyId)}
                                >
                                    <span
                                        className={classNames(
                                            'rounded-full shadow w-8 h-8 font-semibold mr-2 flex justify-center items-center cursor-pointer',
                                            {
                                                'bg-white text-indigo-600': currentStep < STEPS.copyId,
                                                'bg-indigo-600 text-white': currentStep === STEPS.copyId,
                                                'bg-green-400 text-white': currentStep > STEPS.copyId,
                                            }
                                        )}
                                    >
                                        {STEPS.copyId}
                                    </span>
                                    <span
                                        className={classNames('cursor-pointer', {
                                            'text-indigo-700': currentStep === STEPS.copyId,
                                            'text-green-500': currentStep > STEPS.copyId,
                                        })}
                                    >
                                        Copy Telegram ID
                                    </span>
                                </div>
                                <FontAwesomeIcon
                                    icon={currentStep > STEPS.copyId ? 'grip-lines' : 'ellipsis-h'}
                                    className={classNames(
                                        'text-gray-400 transform rotate-90 xl:rotate-0 ml-2 xl:ml-0',
                                        {
                                            'text-green-500': currentStep > STEPS.copyId,
                                        }
                                    )}
                                />
                                <div
                                    className='flex items-center cursor-pointer'
                                    onClick={() => setCurrentStep(STEPS.enterId)}
                                >
                                    <span
                                        className={classNames(
                                            'rounded-full shadow w-8 h-8 font-semibold mr-2 flex justify-center items-center cursor-pointer',
                                            {
                                                'bg-indigo-600 text-white': currentStep === STEPS.enterId,
                                                'bg-white text-indigo-600': currentStep < STEPS.enterId,
                                            }
                                        )}
                                    >
                                        {STEPS.enterId}
                                    </span>
                                    <span
                                        className={classNames('cursor-pointer', {
                                            'text-indigo-700': currentStep === STEPS.enterId,
                                            'text-green-500': currentStep > STEPS.enterId,
                                        })}
                                    >
                                        Enter Telegram ID
                                    </span>
                                </div>
                            </div>
                            <Steps
                                steps={STEPS}
                                currentStep={currentStep}
                                telegramId={telegramId}
                                setTelegramId={setTelegramId}
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <Button
                                className={'bg-indigo-600 hover:bg-indigo-700'}
                                type={'primary'}
                                onClick={onNextStepClick}
                            >
                                {currentStep === STEPS.enterId ? 'Connect' : 'Next'}
                            </Button>
                            <Button
                                className={classNames('mt-3', {
                                    invisible: currentStep === STEPS.startBot,
                                })}
                                type={'link'}
                                onClick={onPreviousStepClick}
                            >
                                Go back
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

Telegram.propTypes = {};

export default Telegram;
