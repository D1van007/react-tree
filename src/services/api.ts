import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { INewNode, ITree } from "../types/types";

export const api = createApi({
  reducerPath: "treeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.vmarmysh.com",
    credentials: "same-origin",
  }),
  endpoints: (builder) => ({
    getTree: builder.mutation<ITree, string>({
      query(treeName) {
        return {
          url: `api.user.tree.get?treeName=${treeName}`,
          method: "POST",
        };
      },
    }),
    createNewNode: builder.mutation<ITree, INewNode>({
      query(newNode) {
        const {treeName, parentNodeId, nodeName} = newNode
        return {
          url: `api.user.tree.get?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetTreeMutation, useCreateNewNodeMutation } = api;
