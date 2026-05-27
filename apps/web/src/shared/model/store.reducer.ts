import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * raw api slice
 * has to be injected later into
 */
export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: () => ({}),
});
