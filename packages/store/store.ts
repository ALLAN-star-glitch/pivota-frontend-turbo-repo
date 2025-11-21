import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './features/country/countrySlice';
import { authApiSlice } from './features/api/authApiSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      country: countryReducer,
      [authApiSlice.reducerPath]: authApiSlice.reducer, //  add RTK query reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApiSlice.middleware), //  add RTK query middleware
  });
};

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
