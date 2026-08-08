import axios, { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/store';

const apiBaseURL = import.meta.env.VITE_API_URL ?? '/api';
const refreshEndpoint = '/auth/refresh';

type RefreshResponse = {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
};

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const refreshClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes(refreshEndpoint)) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshResponse = await refreshClient.post<RefreshResponse>(refreshEndpoint, {
        refreshToken
      });

      const nextAccessToken = refreshResponse.data.accessToken ?? refreshResponse.data.token;

      if (!nextAccessToken) {
        throw new Error('Refresh token response did not include an access token.');
      }

      const nextRefreshToken = refreshResponse.data.refreshToken ?? refreshToken;

      useAuthStore.getState().setTokens(nextAccessToken, nextRefreshToken);

      const retryHeaders = AxiosHeaders.from(originalRequest.headers);
      retryHeaders.set('Authorization', `Bearer ${nextAccessToken}`);
      originalRequest.headers = retryHeaders;

      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    }
  }
);