import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const customTeamApi = createApi({
  reducerPath: "customTeamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => "/customTeam",
      providesTags: ["Team"],
    }),
    addMember: builder.mutation({
      query: (payload) => ({
        url: "/customTeam",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Team"],
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/customTeam/${id}`,
        method: "DELETE",
        // credentials: "include",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});
export const { useGetMembersQuery, useAddMemberMutation, useDeleteMemberMutation } =
  customTeamApi;
