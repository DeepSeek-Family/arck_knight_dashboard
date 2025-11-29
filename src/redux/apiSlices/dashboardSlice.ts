import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/users",
        };
      },
    }),
    // update user isBanned status
    updateUserStatus: builder.mutation<
      any,
      { userId: string; isBanned: boolean }
    >({
      query: ({ userId, isBanned }) => {
        return {
          method: "PATCH",
          url: `/dashboard/users/${userId}`,
          body: { isBanned },
        };
      },
    }),
  }),
});

export const { useGeneralStatsQuery, useUpdateUserStatusMutation } =
  dashboardSlice;
