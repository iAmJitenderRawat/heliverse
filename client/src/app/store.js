import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import pageReducer from "../features/pagination/pageSlice";
import getUsersReducer from "../features/users/getUsersSlice";
import { customTeamApi } from "../features/team/teamSlice";
import propsSlice from "../features/properties/propsSlice";

export const store = configureStore({
  reducer: {
    getUsers: getUsersReducer,
    pagination: pageReducer,
    getProps: propsSlice,
    [customTeamApi.reducerPath]: customTeamApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customTeamApi.middleware),
});
