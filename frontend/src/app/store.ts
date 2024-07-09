import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';


import { userAPI } from '../features/userAPI';
import { reposAPI } from '../features/reposAPI';
import { followersAPI } from '../features/followersAPI';

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [reposAPI.reducerPath]: reposAPI.reducer,
    [followersAPI.reducerPath]: followersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      reposAPI.middleware,
      followersAPI.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;