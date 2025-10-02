import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10001/v1';

// Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  code: string;
  data?: T;
  error?: string;
}

export interface LoginResponseData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  accessToken: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    signup: builder.mutation<ApiResponse<LoginResponseData>, SignupRequest>({
      query: (signupDto) => ({
        url: '/auth-service/signup',
        method: 'POST',
        body: signupDto,
      }),
    }),

    login: builder.mutation<ApiResponse<LoginResponseData>, LoginRequest>({
      query: (loginDto) => ({
        url: '/auth-service/login',
        method: 'POST',
        body: loginDto,
      }),
    }),

    refresh: builder.mutation<ApiResponse<LoginResponseData>, void>({
      query: () => ({
        url: '/auth-service/refresh',
        method: 'POST',
      }),
    }),

    logout: builder.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: '/auth-service/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApiSlice;
