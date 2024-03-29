import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quotationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    createQuotation: build.mutation({
      query: (body) => ({
        url: '/quotation',
        method: 'POST',
        body,
      }),
    }),
  }),
  tagTypes: ['Quotation'],
});

export const {} = quotationApi;
