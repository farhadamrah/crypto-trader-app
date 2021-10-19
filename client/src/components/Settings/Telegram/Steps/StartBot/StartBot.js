import Button from '../../../../shared/Button/Button';

const StartBot = props => {
    return (
        <div className={'my-10 lg:h-32'}>
            <h2 className='text-gray-700 text-2xl text-center font-medium'>
                Start our Telegram bot to receive notifications
            </h2>
            <div className='flex justify-center mt-6'>
                <a href={'https://telegram.me/cryptosignalstraderbot'} target={'_blank'} rel='noopener noreferrer'>
                    <Button className={'text-xl'} type={'link'}>
                        Go to Telegram
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default StartBot;
