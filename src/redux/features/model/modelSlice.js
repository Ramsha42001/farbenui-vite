// modelSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchModelNamesApi } from './modelApi';

const initialState = {
    modelNames: [],
    loading: false,
    error: null,
};

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        fetchModelNamesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchModelNamesSuccess(state, action) {
            state.modelNames = action.payload;
            state.loading = false;
        },
        fetchModelNamesFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    fetchModelNamesRequest,
    fetchModelNamesSuccess,
    fetchModelNamesFailure,
} = modelSlice.actions;

// Thunk to fetch model names and handle API interaction
export const fetchModelNames = () => async (dispatch) => {
    dispatch(fetchModelNamesRequest());
    try {
        const response = await fetchModelNamesApi();
        dispatch(fetchModelNamesSuccess(response.model_names));
    } catch (error) {
        dispatch(fetchModelNamesFailure(error.message));
    }
};

export default modelSlice.reducer;
