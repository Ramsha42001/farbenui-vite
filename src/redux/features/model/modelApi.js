// modelApi.js

import network from '../../services/network';


export const fetchModelNamesApi = async () => {
    try {
        const response = await network.get('/api/modelnames');
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch model names');
    }
};
