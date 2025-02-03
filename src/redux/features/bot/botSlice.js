// src/features/bot/botSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { insertBotApi, listBotsApi, deleteBotApi, updateBotApi, deployBotApi } from './botApi';

const initialState = {
    bot: null,
    bots: [],
    loading: false,
    error: null,
};

const botSlice = createSlice({
    name: 'bot',
    initialState,
    reducers: {
        insertBotRequest(state) {
            state.loading = true;
            state.error = null;
        },
        insertBotSuccess(state, action) {
            state.bot = action.payload;
            state.loading = false;
        },
        insertBotFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        listBotsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        listBotsSuccess(state, action) {
            state.bots = action.payload;
            state.loading = false;
        },
        listBotsFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        deleteBotRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteBotSuccess(state, action) {
            state.bots = state.bots.filter(bot => bot.bot_id !== action.payload);
            state.loading = false;
        },
        deleteBotFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        updateBotRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateBotSuccess(state, action) {
            const updatedBot = action.payload;
            state.bots = state.bots.map(bot => bot.bot_id === updatedBot.bot_id ? updatedBot : bot);
            state.loading = false;
        },
        updateBotFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        deployBotRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deployBotSuccess(state, action) {
            const updatedBot = action.payload;
            state.bots = state.bots.map(bot => bot.bot_id === updatedBot.bot_id ? updatedBot : bot);
            state.loading = false;
        },
        deployBotFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    insertBotRequest,
    insertBotSuccess,
    insertBotFailure,
    listBotsRequest,
    listBotsSuccess,
    listBotsFailure,
    deleteBotRequest,
    deleteBotSuccess,
    deleteBotFailure,
    updateBotRequest,
    updateBotSuccess,
    updateBotFailure,
    deployBotRequest,
    deployBotSuccess,
    deployBotFailure,
} = botSlice.actions;

// Thunks
export const insertBot = (botData) => async (dispatch) => {
    dispatch(insertBotRequest());
    try {
        const botResponse = await insertBotApi(botData);
        dispatch(insertBotSuccess(botResponse));
        dispatch(listBots(botData.user_name));
    } catch (error) {
        dispatch(insertBotFailure(error.message));
    }
};

export const listBots = (username) => async (dispatch) => {
    dispatch(listBotsRequest());
    try {
        const botsResponse = await listBotsApi(username);
        dispatch(listBotsSuccess(botsResponse));
    } catch (error) {
        dispatch(listBotsFailure(error.message));
    }
};

export const deleteBot = (botId) => async (dispatch) => {
    dispatch(deleteBotRequest());
    try {
        await deleteBotApi(botId);
        dispatch(deleteBotSuccess(botId));
    } catch (error) {
        dispatch(deleteBotFailure(error.message));
    }
};

export const updateBot = (botId, botData) => async (dispatch) => {
    dispatch(updateBotRequest());
    try {
        const updatedBot = await updateBotApi(botId, botData);
        dispatch(updateBotSuccess(updatedBot));
        dispatch(listBots(botData.user_name));
    } catch (error) {
        dispatch(updateBotFailure(error.message));
    }
};

export const deployBot = (fileName, userName) => async (dispatch) => {
    dispatch(deployBotRequest());
    try {
        const updatedBot = await deployBotApi(fileName, userName); // Ensure this API returns the updated bot
        dispatch(deployBotSuccess(updatedBot));
    } catch (error) {
        dispatch(deployBotFailure(error.message));
    }
};

export default botSlice.reducer;
