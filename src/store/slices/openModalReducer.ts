/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface IOpenModal {
  isOpenModal: boolean;
}

const openModalSlice = createSlice({
  name: 'openModal',
  initialState: {
    isOpenModal: false,
  },
  reducers: {
    setOpenModal(state, action) {
      state.isOpenModal = action.payload;
    },
  },
});

export const { setOpenModal } = openModalSlice.actions;
export default openModalSlice.reducer;