import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

export const quotationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/v1` }),
  endpoints: (build) => ({
    createQuotation: build.mutation({
      query: (body) => ({
        url: '/quotation',
        method: 'POST',
        body,
      }),
    }),
    getQuotations: build.query({
      query: () => ({
        url: '/quotation',
        method: 'GET',
      }),
    }),
  }),
  tagTypes: ['Quotation'],
});

export const { useCreateQuotationMutation, useGetQuotationsQuery } =
  quotationApi;
