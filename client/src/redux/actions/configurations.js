import * as TYPES from '../types';
import ConfigurationService from '../../services/ConfigurationService';
import { ERROR_MESSAGES, MESSAGE_TYPE } from '../../config/constants';
import { showMessageComponent } from './components';

export const setConfigurationsList = list => ({
    type: TYPES.CONFIGURATIONS_LIST_CHANGED,
    payload: list,
});

export const addNewConfiguration = configuration => ({
    type: TYPES.CONFIGURATION_CREATED,
    payload: configuration,
});

export const setUpdatedConfiguration = configuration => ({
    type: TYPES.CONFIGURATION_UPDATED,
    payload: configuration,
});

export const getConfigurationsList = () => async dispatch => {
    try {
        const response = await ConfigurationService.getConfigurations();

        const configurations = response.data;

        dispatch(setConfigurationsList(configurations));

        return configurations;
    } catch (error) {
        console.error(error);
    }
};

export const createConfiguration = configurationData => async dispatch => {
    try {
        const response = await ConfigurationService.createConfiguration(configurationData);

        const configuration = response.data;

        dispatch(addNewConfiguration(configuration));

        return configuration;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};

export const updateConfiguration = configurationData => async dispatch => {
    try {
        const response = await ConfigurationService.updateConfiguration(configurationData);

        const updatedConfiguration = response.data;

        dispatch(setUpdatedConfiguration(updatedConfiguration));

        return updatedConfiguration;
    } catch (error) {
        const errorResponseMessage = error.response?.data.error.message || ERROR_MESSAGES.defaultError;

        console.error(errorResponseMessage || error);

        dispatch(showMessageComponent(MESSAGE_TYPE.error, errorResponseMessage, { destroyAll: true }));
    }
};
