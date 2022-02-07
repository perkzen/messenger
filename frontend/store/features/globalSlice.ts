import { Modal } from '../models/Modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  modal: Modal;
  apiError: string;
  loading: boolean;
}

const initialState: GlobalState = {
  modal: null,
  apiError: '',
  loading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addModal: (state, action: PayloadAction<Modal>) => {
      state.modal = action.payload;
    },
    removeModal: (state) => {
      state.modal = null;
    },
    addError: (state, action: PayloadAction<string>) => {
      state.apiError = action.payload;
    },
    removeError: (state) => {
      state.apiError = '';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addModal, removeModal, addError, removeError, setLoading } =
  globalSlice.actions;
export default globalSlice.reducer;
