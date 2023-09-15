import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "./../services/api";

import openModalReducer from "./slices/openModalReducer";
import modeModalReducer from "./slices/modeModalReducer";
import nodeReducer from "./slices/nodeReducer";
import expandedFoldersReducer from "./slices/expandedFoldersReducer";

export const store = configureStore({
  reducer: {
    node: nodeReducer,
    openModal: openModalReducer,
    modeModal: modeModalReducer,
    expandedFolders: expandedFoldersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
