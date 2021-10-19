import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.svg';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import { BUTTON_TYPES, ROUTES } from '../../../config/constants';
import { Link, useHistory } from 'react-router-dom';
import FormItem from '../../shared/Form/FormItem/FormItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { register } from '../../../redux/actions/auth';
import styles from '../Auth.module.scss';

const Register = props => {
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const onShowPassword = () => {
        setIsShowingPassword(!isShowingPassword);
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        register: registerFormField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = async values => {
        const user = await dispatch(register(values));

        if (user) {
            history.push(ROUTES.settings.path);
        }
    };

    return (
        <div className='flex justify-center w-full max-w-lg'>
            <div className='w-11/12 max-w-sm flex flex-col justify-between'>
                <div className='flex flex-col items-center my-6'>
                    <img className={styles.logo} src={logo} alt='logo' />
                    <h1 className={styles.brandName}>Crypto Trader</h1>
                </div>
                <div>
                    <h2 className={styles.pageTitle}>Register</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <FormItem className='mb-4' label={'First Name'}>
                            <Input type={'text'} placeholder={'First Name'} {...registerFormField('first_name')} />
                        </FormItem>
                        <FormItem className='mb-4' label={'Last Name'}>
                            <Input type={'text'} placeholder={'Last Name'} {...registerFormField('last_name')} />
                        </FormItem>
                        <FormItem className='mb-4' label={'Email'}>
                            <Input type={'email'} placeholder={'Email'} {...registerFormField('email')} />
                        </FormItem>
                        <FormItem className='mb-4' label={'Password'}>
                            <Input.Password placeholder={'Password'} {...registerFormField('password')} />
                        </FormItem>
                        <Button type={BUTTON_TYPES.primary} className={'w-full bg-indigo-600 hover:bg-indigo-700 mt-4'}>
                            Create Account
                        </Button>
                        {/*<div className='text-center'>*/}
                        {/*    <Link to={ROUTES.resetPassword.path}>*/}
                        {/*        <Button className={'mt-2'} type={BUTTON_TYPES.link}>*/}
                        {/*            {'Reset Password?'}*/}
                        {/*        </Button>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </form>
                </div>
                <div className='text-center text-gray-700 text-lg font-medium my-6'>
                    <span>Already have an account?</span>
                    <Link to={ROUTES.login.path}>
                        <Button className={'ml-1'} type={BUTTON_TYPES.link}>
                            Log in
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Register.propTypes = {};

export default Register;
