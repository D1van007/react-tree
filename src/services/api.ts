import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { INode, ITree } from "../types/types";
import { baseUrl } from "../constants/paths";

export const api = createApi({
  reducerPath: "treeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "same-origin",
  }),
  endpoints: (builder) => ({
    getTree: builder.mutation<ITree, string>({
      query(treeName) {
        return {
          url: `api.user.tree.get`,
          method: "POST",
          params: {
            treeName,
          },
        };
      },
    }),
    createNode: builder.mutation<ITree, INode>({
      query(newNode) {
        const { treeName, parentNodeId, nodeName } = newNode;
        return {
          url: `api.user.tree.node.create`,
          method: "POST",
          params: {
            treeName,
            parentNodeId,
            nodeName,
          },
        };
      },
    }),
    renameNode: builder.mutation<ITree, INode>({
      query(newName) {
        const { treeName, nodeId, newNodeName } = newName;
        return {
          url: `api.user.tree.node.rename`,
          method: "POST",
          params: {
            treeName,
            nodeId,
            newNodeName,
          },
        };
      },
    }),
    deleteNode: builder.mutation<ITree, INode>({
      query: (node) => {
        const { treeName, nodeId } = node;
        return {
          url: `api.user.tree.node.delete`,
          method: "POST",
          params: {
            treeName,
            nodeId,
          },

        };
      },
    }),
  }),
});

export const {
  useGetTreeMutation,
  useCreateNodeMutation,
  useDeleteNodeMutation,
  useRenameNodeMutation,
} = api;
