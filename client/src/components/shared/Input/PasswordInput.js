import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useState } from 'react';

const PasswordInput = forwardRef((props, ref) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const onShowPasswordClick = () => {
        setIsPasswordShown(state => !state);
    };

    return (
        <div className={'relative w-full flex'}>
            <Input ref={ref} {...props} type={isPasswordShown ? 'text' : 'password'} />
            <div className={'absolute h-full w-full r-1 t-0 flex items-center justify-end pr-3 pointer-events-none'}>
                <FontAwesomeIcon
                    icon={isPasswordShown ? 'eye-slash' : 'eye'}
                    className='cursor-pointer text-gray-400 pointer-events-auto'
                    onClick={onShowPasswordClick}
                />
            </div>
        </div>
    );
});

export default PasswordInput;
