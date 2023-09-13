import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "./../services/api";

import openModalReducer from "./slices/openModalReducer";
import modeModalReducer from "./slices/modeModalReducer";
import treeRootReducer from "./slices/treeRootReducer";
import nodeReducer from "./slices/nodeReducer";

export const store = configureStore({
  reducer: {
    treeRoot: treeRootReducer,
    node: nodeReducer,
    openModal: openModalReducer,
    modeModal: modeModalReducer,
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
