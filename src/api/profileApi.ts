import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Profiles {
  id: number;
  username: string;
  email: string;
  phone: string;
  profile_pic?: string;
}

export const profileApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.100.105:8000" }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<Profiles[], void>({
      query: () => `/api/profile/`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserProfileQuery } = profileApi;
