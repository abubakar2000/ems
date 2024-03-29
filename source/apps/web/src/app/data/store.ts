import { configureStore } from '@reduxjs/toolkit';
import { quotationApi } from './quotation/quotation.api';

export const store = configureStore({
  reducer: {
    [quotationApi.reducerPath]: quotationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotationApi.middleware),
});
