/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const expandedFolders = createSlice({
  name: "expandedFolders",
  initialState: [],

  reducers: {
    addExpandedFolder(state: string[], action: PayloadAction<string>) {
      state.push(action.payload);
    },
    deleteExpandedFolder(state, action: PayloadAction<string>) {
      return state = state.filter((id) => {return id !== action.payload});
    }
  },
});

export const { addExpandedFolder, deleteExpandedFolder } = expandedFolders.actions;
export default expandedFolders.reducer;
