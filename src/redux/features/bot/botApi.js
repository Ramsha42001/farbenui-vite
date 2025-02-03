import network from '../../../services/network';

export const insertBotApi = async (botData) => {
    try {
        const queryString = new URLSearchParams(botData).toString();
        const response = await network.get(`/api/bots?${queryString}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to insert bot');
    }
};

export const listBotsApi = async (username) => {
    try {
        const response = await network.get(`/api/bots/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch bots');
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
