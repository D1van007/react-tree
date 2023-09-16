/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { INode } from "../../types/types";

const nodeSlice = createSlice({
  name: "node",
  initialState:<INode> {
    treeName: "GUID",
    nodeId: "",
    parentNodeId: "",
    nodeName: "",
    newNodeName: undefined,
  },
  reducers: {
    setNodeId(state, action) {
      state.nodeId = action.payload;
    },
    setParentNodeId(state, action) {
      state.parentNodeId = action.payload;
    },
    setNodeName(state, action) {
      state.nodeName = action.payload;
    },
    setNewNodeName(state, action) {
      state.newNodeName= action.payload;
    },
  },
});

export const { setNodeId, setParentNodeId, setNodeName, setNewNodeName } = nodeSlice.actions;
export default nodeSlice.reducer;
