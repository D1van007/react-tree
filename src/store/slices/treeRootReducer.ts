/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ITree } from '../../types/types';


const treeRootSlice = createSlice({
  name: 'treeRoot',
  initialState: {
    treeRoot: <ITree>{},
  },
  reducers: {
    setTreeRoot(state, action) {
      state.treeRoot = action.payload;
    },
  },
});

export const { setTreeRoot } = treeRootSlice.actions;
export default treeRootSlice.reducer;