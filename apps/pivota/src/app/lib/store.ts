import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './features/country/countrySlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      country: countryReducer,
    },
  });
};

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
