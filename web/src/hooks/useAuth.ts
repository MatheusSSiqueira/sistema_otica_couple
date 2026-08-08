import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { api, refreshClient } from '@/services';
import { useAuthStore } from '@/store';
import type { UserEntity } from '@/types';

type JwtPayload = {
  exp?: number;
  sub?: string;
  email?: string;
  name?: string;
  role?: string | number;
  [key: string]: unknown;
};

export interface LoginSession {
  user: UserEntity;
  token: string;
  refreshToken?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RefreshSessionResponse {
  accessToken?: string;
  token?: string;
  refreshToken?: string | null;
  user?: UserEntity;
}

export interface LoginResponse {
  accessToken?: string;
  token?: string;
  refreshToken?: string | null;
  user?: UserEntity;
}

const SESSION_END_REDIRECT = '/login';
const REFRESH_BUFFER_MS = 60_000;
const REFRESH_ENDPOINT = '/auth/refresh';
const LOGIN_ENDPOINT = import.meta.env.VITE_AUTH_LOGIN_PATH ?? '/auth/login';

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];

    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const json = window.atob(normalized);

    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

function getTokenExpiryMs(token: string | null) {
  if (!token) {
    return null;
  }

  const payload = decodeJwtPayload(token);

  if (!payload?.exp) {
    return null;
  }

  return payload.exp * 1000;
}

async function requestTokenRefresh(refreshToken: string) {
  const response = await refreshClient.post<RefreshSessionResponse>(REFRESH_ENDPOINT, {
    refreshToken
  });

  const nextToken = response.data.accessToken ?? response.data.token;

  if (!nextToken) {
    throw new Error('Refresh token response did not include an access token.');
  }

  return {
    accessToken: nextToken,
    refreshToken: response.data.refreshToken ?? refreshToken,
    user: response.data.user ?? null
  };
}

async function requestLogin(credentials: LoginCredentials) {
  const response = await api.post<LoginResponse>(LOGIN_ENDPOINT, credentials);
  const accessToken = response.data.accessToken ?? response.data.token;

  if (!accessToken || !response.data.user) {
    throw new Error('Login response must include a user and an access token.');
  }

  return {
    user: response.data.user,
    token: accessToken,
    refreshToken: response.data.refreshToken ?? null
  };
}

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const authState = useAuthStore();
  const refreshTimerRef = useRef<number | null>(null);

  const redirectToLogin = useCallback(() => {
    if (location.pathname !== SESSION_END_REDIRECT) {
      navigate(SESSION_END_REDIRECT, { replace: true });
    }
  }, [location.pathname, navigate]);

  const logout = useCallback(() => {
    useAuthStore.getState().logout();
    redirectToLogin();
  }, [redirectToLogin]);

  const login = useCallback(
    (session: LoginSession) => {
      useAuthStore.getState().login(session);
      if (location.pathname === SESSION_END_REDIRECT) {
        navigate('/dashboard', { replace: true });
      }
    },
    [location.pathname, navigate]
  );

  const loginWithCredentials = useCallback(
    async (credentials: LoginCredentials) => {
      const session = await requestLogin(credentials);
      useAuthStore.getState().login(session);

      if (location.pathname === SESSION_END_REDIRECT) {
        navigate('/dashboard', { replace: true });
      }

      return session;
    },
    [location.pathname, navigate]
  );

  const refreshSession = useCallback(async () => {
    const currentRefreshToken = useAuthStore.getState().refreshToken;

    if (!currentRefreshToken) {
      logout();
      return null;
    }

    try {
      const refreshedSession = await requestTokenRefresh(currentRefreshToken);
      useAuthStore.getState().setTokens(refreshedSession.accessToken, refreshedSession.refreshToken);

      if (refreshedSession.user) {
        useAuthStore.getState().login({
          user: refreshedSession.user,
          token: refreshedSession.accessToken,
          refreshToken: refreshedSession.refreshToken
        });
      }

      return refreshedSession;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  useEffect(() => {
    if (refreshTimerRef.current) {
      window.clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    if (!authState.token || !authState.refreshToken) {
      return;
    }

    const expiryMs = getTokenExpiryMs(authState.token);

    if (!expiryMs) {
      return;
    }

    const refreshInMs = Math.max(expiryMs - Date.now() - REFRESH_BUFFER_MS, 0);

    refreshTimerRef.current = window.setTimeout(() => {
      void refreshSession();
    }, refreshInMs);

    return () => {
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [authState.refreshToken, authState.token, refreshSession]);

  useEffect(() => {
    if (location.pathname === SESSION_END_REDIRECT) {
      return;
    }

    if (!authState.isAuthenticated) {
      redirectToLogin();
    }
  }, [authState.isAuthenticated, location.pathname, redirectToLogin]);

  const sessionExpired = useMemo(() => {
    const expiryMs = getTokenExpiryMs(authState.token);
    return expiryMs ? expiryMs <= Date.now() : false;
  }, [authState.token]);

  return {
    ...authState,
    login,
    loginWithCredentials,
    logout,
    refreshSession,
    sessionExpired
  };
}