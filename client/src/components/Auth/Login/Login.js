import styles from '../Auth.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.svg';
import { BUTTON_TYPES } from '../../../config/constants';
import { ROUTES } from '../../../config/constants';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import FormItem from '../../shared/Form/FormItem/FormItem';

const Login = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        register: registerFormField,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = async values => {
        const user = await dispatch(login(values));

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
                    <h2 className={styles.pageTitle}>Login</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <FormItem className={'mb-4'} label={'Email'}>
                            <Input type={'text'} placeholder={'Email'} {...registerFormField('email')} />
                        </FormItem>
                        <FormItem className={'mb-4 relative'} label={'Password'}>
                            <Input.Password placeholder={'Password'} {...registerFormField('password')} />
                        </FormItem>
                        <Button type={BUTTON_TYPES.primary} className={'w-full bg-indigo-600 hover:bg-indigo-700 mt-4'}>
                            Sign in
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
                    <span>Don't have an account yet?</span>
                    <Link to={ROUTES.register.path}>
                        <Button className={'ml-1'} type={BUTTON_TYPES.link}>
                            Join now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {};

export default Login;
