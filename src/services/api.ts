import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ITree } from "../types/types";

export const api = createApi({
  reducerPath: "treeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.vmarmysh.com", credentials: 'same-origin'
  }),
  endpoints: (builder) => ({
    getTree: builder.mutation<ITree, string>({
      query(data) {
        return {
          url: `api.user.tree.get?treeName=${data}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useGetTreeMutation } = api;

