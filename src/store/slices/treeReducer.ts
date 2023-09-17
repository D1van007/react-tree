/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { ITree } from "../../types/types";

const treeSlice = createSlice({
  name: "tree",
  initialState: {
    tree: <ITree>{}
  },
  reducers: {
    setTree(state, action) {
      state.tree = action.payload;
    },
  },
});

export const { setTree } = treeSlice.actions;
export default treeSlice.reducer;
