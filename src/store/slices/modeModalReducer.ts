/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export interface IModeModale {
  modeModale: "delete" | "create" | "rename" | "default";
}

const modeModaleSlice = createSlice({
  name: "modeModal",
  initialState: <IModeModale>{
    modeModale: "default",
  },
  reducers: {
    setModeModale(state, action) {
      state.modeModale = action.payload;
    },
  },
});

export const { setModeModale } = modeModaleSlice.actions;
export default modeModaleSlice.reducer;
