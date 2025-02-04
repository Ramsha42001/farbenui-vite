import network from '../../../services/network';

// API to create a document
export const createBotApi = async (botData, token) => {
    try {
        const response = await network.post(
            '/create-bot',
            botData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create document');
    }
};

export const getBotsApi = async (token) => {
    try {
        const response = await network.get(
            '/get-bots',
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get bots');
    }
};


export const deleteBotApi = async (botId) => {
    try {
        const response = await network.get(`/api/deletebots/${botId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete bot');
    }
};

export const updateBotApi = async (botId, botData) => {
    try {
        const queryString = new URLSearchParams(botData).toString();
        const response = await network.get(`/api/Updatebots/${botId}?${queryString}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update bot');
    }
};

export const deployBotApi= async(fileName,userName)=>{
    try {
        const response = await network.get(`/api/deploy?file_name=${fileName}&user_name=${userName}`)
        console.log(response);
        return response.data;
    }
    catch{
        console.log("Failed to deploy Bot");
    }
};
