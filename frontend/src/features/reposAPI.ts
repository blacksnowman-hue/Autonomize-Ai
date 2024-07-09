import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Repo } from '../types/types';

export const reposAPI = createApi({

  reducerPath: 'reposAPI',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),

  endpoints: (builder) => ({
    getUserRepos: builder.query<Repo[], string>({
      query: (username) => `/users/${username}/repos`,
    }),
  }),

});

export const { useGetUserReposQuery } = reposAPI;