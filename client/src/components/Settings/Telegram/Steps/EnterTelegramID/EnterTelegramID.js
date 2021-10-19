import FormItem from '../../../../shared/Form/FormItem/FormItem';
import Input from '../../../../shared/Input/Input';

const EnterTelegramId = props => {
    const { telegramId, setTelegramId } = props;

    const onTelegramIdChange = e => {
        setTelegramId(e.target.value);
    };

    return (
        <div className={'my-10 lg:h-32'}>
            <h2 className='text-gray-700 text-2xl text-center font-medium'>Enter Telegram ID</h2>
            <FormItem className={'mt-6'}>
                <Input type={'text'} placeholder={'Telegram ID'} value={telegramId} onChange={onTelegramIdChange} />
            </FormItem>
        </div>
    );
};

export default EnterTelegramId;
