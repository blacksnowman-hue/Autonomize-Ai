import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Follower } from '../types/types';

export const followersAPI = createApi({

  reducerPath: 'followersAPI',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),

  endpoints: (builder) => ({
    getUserFollowers: builder.query<Follower[], string>({
      query: (username) => `/users/${username}/followers`,
    }),
  }),

});

export const { useGetUserFollowersQuery } = followersAPI;