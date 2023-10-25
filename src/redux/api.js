import { createApi, fetchBaseQuery, BaseQueryApi } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatError } from './errorHandle';


const baseQuery = fetchBaseQuery({
  baseUrl: "https://aerial-rescue-8ede90eaba7f.herokuapp.com/",
  prepareHeaders: async (headers, { getState }) => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token)
    if (token) {
      // console.log(token, 'valid token')
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});



// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    registerAccount: builder.mutation({
        query(data) {
          return {
            url: "/api/register",
            method: "POST",
            body: data
          };
        },
        transformErrorResponse: (response, meta, arg) => ({
          message: formatError(response),
          error: formatError(response),
        }),
        

      }),
      loginAccount: builder.mutation({
        query(data) {
          return {
            url: `/api/login`,
            method: "POST",
            body: data

          };

        },
        transformErrorResponse: (response, meta, arg) => ({
          message: formatError(response),
          error: formatError(response),
        }),
        
       
      }),
      getUser: builder.query({
        query: () => `/api/user`,
      }),
      uploadDocument: builder.mutation({
        query(data) {
          return {
            url: `/app/identify`,
            method: "POST",
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

        },
        transformErrorResponse: (response, meta, arg) => ({
            message: formatError(response),
            error: formatError(response),
          }),
      }),
      getAllIdentfyImage: builder.query({
        query: () => `/app/identify`,
        transformErrorResponse: (response, meta, arg) => ({
          message: formatError(response),
          error: formatError(response),
        }),
      }),  

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
   useRegisterAccountMutation,
   useLoginAccountMutation,
   useGetUserQuery,
   useGetAllIdentfyImageQuery,
   useUploadDocumentMutation
  
  } = Api