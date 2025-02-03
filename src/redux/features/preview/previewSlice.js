import { createSlice } from '@reduxjs/toolkit';
import { invoicePreviewApi, updateInvoiceDetailsApi, generateInvoiceApi } from './previewApi';

const initialState = {
    invoice: null,
    loading: false,
    isLoading: false, // State for background loading
    error: null,            
};

const previewSlice = createSlice({
    name: 'preview',
    initialState,
    reducers: {
        previewInvoiceRequest(state) {
            state.loading = true;
            state.error = null;
        },
        previewInvoiceSuccess(state, action) {
            state.invoice = action.payload;
            state.loading = false;
        },
        previewInvoiceFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        updatePreviewRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updatePreviewSuccess(state, action) {
            state.invoice = action.payload;
            state.loading = false;
        },
        updatePreviewFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        // Background loading state
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        generateInvoiceSuccess(state, action) {
            state.invoice = action.payload;
            state.loading = false;
        },
        generateInvoiceFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        // Background loading state
        setLoadingInvoice(state, action) {
            state.isLoadingInvoice = action.payload;
        },
    },
});

export const {
    previewInvoiceRequest,
    previewInvoiceSuccess, 
    previewInvoiceFailure,
    updatePreviewRequest,
    updatePreviewSuccess,
    updatePreviewFailure,
    setLoading,
    generateInvoiceSuccess,
    generateInvoiceFailure,
    setLoadingInvoice,
} = previewSlice.actions;

// Thunk for invoice preview
export const previewInvoice = (filename) => async (dispatch) => {
    dispatch(previewInvoiceRequest());
    try {
        const token = localStorage.getItem('token');
        const invoiceResponse = await invoicePreviewApi(filename, token);
        // Save response to localStorage for persistence
        localStorage.setItem('invoicePreview', JSON.stringify(invoiceResponse));
        dispatch(previewInvoiceSuccess(invoiceResponse));
    } catch (error) {
        dispatch(previewInvoiceFailure(error.message));
        if(error.message.includes('401')){
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
    }
};

// Thunk for updating invoice preview
export const updatePreview = (invoiceData) => async (dispatch) => {
    dispatch(updatePreviewRequest());
    try {
        const token = localStorage.getItem('token');
        const response = await updateInvoiceDetailsApi(invoiceData, token);
        dispatch(updatePreviewSuccess(response));
    } catch (error) {
        dispatch(updatePreviewFailure(error.message));
        if(error.message.includes('401')){
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
    }
};

export const generateInvoice = (filename) => async (dispatch) => {
    dispatch(setLoadingInvoice(true));
    try {
        const token = localStorage.getItem('token');
        const response = await generateInvoiceApi(filename, token);
        dispatch(generateInvoiceSuccess(response));
    } catch (error) {
        dispatch(generateInvoiceFailure(error.message));
        if(error.message.includes('401')){
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
    }
};

export default previewSlice.reducer;