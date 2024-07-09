import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/types';

export const userAPI = createApi({

  reducerPath: 'userAPI',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),

  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (username) => `/users/${username}`,
    }),
  }),

});

export const { useGetUserQuery } = userAPI;