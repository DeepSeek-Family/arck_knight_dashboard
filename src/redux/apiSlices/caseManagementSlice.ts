import { api } from "../api/baseApi";

export const caseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ---------------------------------------
    // GET case PROFILE
    // ---------------------------------------
    getCase: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: { name: string; value: string }) => {
            params.append(arg.name, arg.value);
          });
        }
        return {
          url: `/dashboard/case/management/case?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
      providesTags: ["AdminData"],
    }),
    // ---------------------------------------
    // GET case PROFILE
    // ---------------------------------------
    getProjects: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: { name: string; value: string }) => {
            params.append(arg.name, arg.value);
          });
        }
        return {
          url: `/dashboard/case/management?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
      providesTags: ["AdminData"],
    }),
    // ---------------------------------------
    // GET CASES BY PROJECT ID
    // ---------------------------------------
    getCasesByProjectId: builder.query({
      query: (projectId: string) => {
        return {
          url: `/dashboard/case/management/case/${projectId}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
      providesTags: ["AdminData"],
    }),
    // ---------------------------------------
    // DELETE PROJECT
    // ---------------------------------------
    deleteProject: builder.mutation({
      query: (projectId: string) => {
        return {
          url: `/dashboard/case/management/project/${projectId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    // ---------------------------------------
    // DELETE CASE
    // ---------------------------------------
    deleteCase: builder.mutation({
      query: (caseId: string) => {
        return {
          url: `/dashboard/case/management/${caseId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    // ---------------------------------------
    // UPDATE CASE
    // ---------------------------------------
    updateCase: builder.mutation({
      query: ({ caseId, data }) => {
        return {
          url: `/dashboard/case/management/${caseId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AdminData"],
    }),
  }),
});

export const {
  useGetCaseQuery,
  useGetProjectsQuery,
  useGetCasesByProjectIdQuery,
  useDeleteProjectMutation,
  useDeleteCaseMutation,
  useUpdateCaseMutation,
} = caseApi;
