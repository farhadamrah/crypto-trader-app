import axios from '../config/axios';
import { ENV } from '../config/env';

const ConfigurationService = {};

ConfigurationService.getConfigurations = async () => {
    const result = await axios.get(`${ENV.baseApiUrl}/trade/configurations`);

    return result.data;
};

ConfigurationService.createConfiguration = async body => {
    const result = await axios.post(`${ENV.baseApiUrl}/trade/configurations`, body);

    return result.data;
};

ConfigurationService.updateConfiguration = async ({ id, ...body }) => {
    const result = await axios.put(`${ENV.baseApiUrl}/trade/configurations/${id}`, body);

    return result.data;
};

export default ConfigurationService;
