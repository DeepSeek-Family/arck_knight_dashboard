import { api } from "../api/baseApi";

const ruleSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getRules: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/rule/terms",
                };
            },
        }),
        // create
        createRule: builder.mutation({
            query: ({ type, content }) => {
                return {
                    method: "POST",
                    url: `/rule`,
                    body: { content, type },
                };
            },
        }),

        // get privacy role
        getPrivacyRole: builder.query({
            query: () => {
                return {
                    method: "GET",
                    url: "/rule/privacy",
                };
            },
        }),
        //create privacy
        createPrivacyRule: builder.mutation({
            query: ({ type, content }) => {
                return {
                    method: "POST",
                    url: `/rule`,
                    body: { content, type },
                };
            },
        }),
    }),
});

export const {
    useGetRulesQuery,
    useCreateRuleMutation,
    useGetPrivacyRoleQuery,
    useCreatePrivacyRuleMutation,
} = ruleSlice;