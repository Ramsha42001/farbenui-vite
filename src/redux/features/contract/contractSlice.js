import { createSlice } from '@reduxjs/toolkit';
import { createContractApi, listContractsApi, deleteContractApi } from './contractApi';
import { deleteDocumentApi } from '../document/documentApi';

const initialState = {
    contract: null,
    contracts: [],
    loading: false,
    isLoading: false,
    error: null,
};

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        createContractRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createContractSuccess(state, action) {
            state.contract = action.payload;
            state.loading = false;
        },
        createContractFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        listContractsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        listContractsSuccess(state, action) {
            state.contracts = action.payload;
            state.loading = false;
        },
        listContractsFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        deleteContractRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteContractSuccess(state, action) {
            state.contracts = state.contracts.filter(contract => contract.id !== action.payload);
            state.loading = false;
        },
        deleteContractFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        setLoadingContract(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const {
    createContractRequest,
    createContractSuccess,
    createContractFailure,
    listContractsRequest,
    listContractsSuccess,
    listContractsFailure,
    deleteContractRequest,
    deleteContractSuccess,
    deleteContractFailure,
    setLoadingContract,
} = contractSlice.actions;

export const createContract = (params) => async (dispatch) => {
    const {documentData, token} = params;
    dispatch(createContractRequest());
    try {
        const contractResponse = await createContractApi(documentData, token);
        dispatch(createContractSuccess(contractResponse));
    } catch (error) {
        dispatch(createContractFailure(error.message));
    }
};

export const listContracts = (email) => async (dispatch) => {
    dispatch(listContractsRequest());
    try {
        const token = localStorage.getItem('token');
        const contractsResponse = await listContractsApi(token);
        dispatch(listContractsSuccess(contractsResponse));
    } catch (error) {
        dispatch(listContractsFailure(error.message));
        if(error.message.includes('401')){
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
    }
};

export const deleteContract = (filename) => async (dispatch) => {
    dispatch(deleteContractRequest());
    try {
        const token = localStorage.getItem('token');
        await deleteContractApi(filename,token);
        dispatch(deleteContractSuccess(filename));
    } catch (error) {
        dispatch(deleteContractFailure(error.message));
    }
};

export default contractSlice.reducer;