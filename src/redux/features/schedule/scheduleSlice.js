import { createSlice } from '@reduxjs/toolkit';
import { scheduleInvoiceApi} from './scheduleApi';

const initialState = {
    invoice: null,
    loading: false,
    isLoading: false, // State for background loading
    error: null,            
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        previewScheduleRequest(state) {
            state.loading = true;
            state.error = null;
        },
        previewScheduleSuccess(state, action) {
            state.invoice = action.payload;
            state.loading = false;
        },
        previewScheduleFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        updateScheduleRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateScheduleSuccess(state, action) {
            state.invoice = action.payload;
            state.loading = false;
        },
        updateScheduleFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        // Background loading state
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        generateScheduleSuccess(state, action) {
            state.invoice = action.payload;
            state.loading = false;
        },
        generateScheduleFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        // Background loading state
        setLoadingSchedule(state, action) {
            state.isLoadingSchedule = action.payload;
        },
    },
});

export const {
    previewScheduleRequest,
    previewScheduleSuccess, 
    previewScheduleFailure,
    updateScheduleRequest,
    updateScheduleSuccess,
    updateScheduleFailure,
    setLoadingSchedule,
    generateScheduleSuccess,
    generateScheduleFailure,
} = scheduleSlice.actions;

// Thunk for invoice preview
export const scheduleInvoice = (invoiceData) => async (dispatch) => {
    dispatch(previewScheduleRequest());
    try {
        const token = localStorage.getItem('token');
        const invoiceResponse = await scheduleInvoiceApi(invoiceData, token);
        // Save response to localStorage for persistence
        localStorage.setItem('invoiceSchedule', JSON.stringify(invoiceResponse));
        dispatch(previewScheduleSuccess(invoiceResponse));
        return invoiceResponse;
    } catch (error) {
        dispatch(previewScheduleFailure(error.message));
        if(error.message.includes('401')){
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
    }
};


export default scheduleSlice.reducer;