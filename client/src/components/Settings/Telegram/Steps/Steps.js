import StartBot from './StartBot/StartBot';
import CopyTelegramID from './CopyTelegramID/CopyTelegramID';
import EnterTelegramId from './EnterTelegramID/EnterTelegramID';

const Steps = props => {
    const { steps, currentStep, telegramId, setTelegramId } = props;

    const renderStepContent = () => {
        switch (currentStep) {
            case steps.startBot: {
                return <StartBot />;
            }
            case steps.copyId: {
                return <CopyTelegramID />;
            }
            case steps.enterId: {
                return <EnterTelegramId telegramId={telegramId} setTelegramId={setTelegramId} />;
            }
            default:
                return null;
        }
    };

    return renderStepContent();
};

export default Steps;
