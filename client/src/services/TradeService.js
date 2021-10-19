import axios from '../config/axios';
import { ENV } from '../config/env';

const TradeService = {};

TradeService.getTrades = async params => {
    const result = await axios.get(`${ENV.baseApiUrl}/trades`, { params });

    return result.data;
};

export default TradeService;
