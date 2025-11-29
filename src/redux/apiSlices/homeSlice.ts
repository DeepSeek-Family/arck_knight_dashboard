import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    overview: builder.query<any, void>({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/user/case/",
        };
      },
    }),
    recentProject: builder.query<any, void>({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/user/recent-projects",
        };
      },
    }),
  }),
});

export const { useOverviewQuery, useRecentProjectQuery } = homeSlice;
