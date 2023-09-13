/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export interface INode {
  treeName: string;
  nodeId?: string;
  parentNodeId?: string;
  nodeName?: string;
  newNodeName?: string;
}

const nodeSlice = createSlice({
  name: "node",
  initialState: {
    treeName: "GUID",
    nodeId: "",
    parentNodeId: "",
    nodeName: "",
    newNodeName: "",
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
