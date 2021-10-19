import PropTypes from 'prop-types';
import Configuration from './Configuration/Configuration';
import NewConfiguration from './NewConfiguration/NewConfiguration';
import { useEffect, useState } from 'react';
import EditConfigurationDrawer from './EditConfigurationDrawer/EditConfigurationDrawer';
import NewConfigurationModal from './NewConfiguration/Modal/Modal';
import useModal from '../../hooks/useModal';
import useDrawer from '../../hooks/useDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigurationsList } from '../../redux/actions/configurations';
import ActionConfirmModal from '../global/ActionConfirmModal/ActionConfirmModal';

const Configurations = props => {
    const dispatch = useDispatch();

    const configurations = useSelector(state => state.configurations.list);
    const user = useSelector(state => state.auth.user);

    const [isNewConfigurationModalVisible, showNewConfigurationModal, hideNewConfigurationModal] = useModal();
    const [isConfigurationEditDrawerVisible, openConfigurationEditDrawer, closeConfigurationEditDrawer] = useDrawer();

    const [selectedConfiguration, setSelectedConfiguration] = useState({});

    useEffect(() => {
        dispatch(getConfigurationsList());
    }, []);

    useEffect(() => {
        if (!isConfigurationEditDrawerVisible) {
            setSelectedConfiguration({});
        }
    }, [isConfigurationEditDrawerVisible]);

    useEffect(() => {
        if (Object.keys(selectedConfiguration).length) {
            const matchedConfiguration = configurations.find(
                configuration => configuration.id === selectedConfiguration.id
            );
            setSelectedConfiguration(matchedConfiguration);
        }
    }, [configurations]);

    const editConfiguration = configuration => {
        setSelectedConfiguration(configuration);
        openConfigurationEditDrawer();
    };

    return (
        <>
            <div className='px-6 py-10 flex flex-wrap gap-6'>
                {configurations.map(configuration => {
                    return (
                        <Configuration
                            key={configuration.id}
                            isEditable={configuration.user_id === user.id}
                            editConfiguration={editConfiguration}
                            // showConfigurationStatusChangeModal={showConfigurationStatusChangeModal}
                            {...configuration}
                        />
                    );
                })}
                <NewConfiguration showNewConfigurationModal={showNewConfigurationModal} />
            </div>

            <EditConfigurationDrawer
                isVisible={isConfigurationEditDrawerVisible}
                closeDrawer={closeConfigurationEditDrawer}
                configuration={selectedConfiguration}
            />

            <ActionConfirmModal />

            <NewConfigurationModal isVisible={isNewConfigurationModalVisible} hideModal={hideNewConfigurationModal} />
        </>
    );
};

Configurations.propTypes = {};

export default Configurations;
