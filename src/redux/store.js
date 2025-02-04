import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import botReducer from '../redux/features/bot/botSlice';
import documentReducer from '../redux/features/document/documentSlice';
import contractReducer from '../redux/features/contract/contractSlice';
// import modelReducer from '../features/model/modelSlice';
import previewReducer from '../redux/features/preview/previewSlice';
import { loadState, saveState } from '../localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bot: botReducer,
    document: documentReducer,
    contract: contractReducer,
    preview: previewReducer,
    // model: modelReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    contract: store.getState().contract,
    preview: store.getState().preview,
  });
});
