import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: (params?: { page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", String(params.page));
        if (params?.limit) queryParams.append("limit", String(params.limit));

        return {
          method: "GET",
          url: `/dashboard/users${
            queryParams.toString() ? "?" + queryParams.toString() : ""
          }`,
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
    // delete user
    deleteUser: builder.mutation<any, string>({
      query: (userId) => {
        return {
          method: "DELETE",
          url: `/dashboard/users/${userId}`,
        };
      },
    }),
  }),
});

export const {
  useGeneralStatsQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = dashboardSlice;
