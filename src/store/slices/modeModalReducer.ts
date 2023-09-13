/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { modeModaleEnum } from "../../types/types";

export interface IModeModale {
  modeModale: modeModaleEnum;
}

const modeModaleSlice = createSlice({
  name: "modeModal",
  initialState: {
    modeModale: "",
  },
  reducers: {
    setModeModale(state, action) {
      state.modeModale = action.payload;
    },
  },
});

export const { setModeModale } = modeModaleSlice.actions;
export default modeModaleSlice.reducer;
