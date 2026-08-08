import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { UserEntity } from '@/types';

export interface AuthSession {
  user: UserEntity;
  token: string;
  refreshToken?: string | null;
}

interface AuthState {
  user: UserEntity | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
  setTokens: (token: string, refreshToken?: string | null) => void;
}

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      login: (session) =>
        set({
          user: session.user,
          token: session.token,
          refreshToken: session.refreshToken ?? null,
          isAuthenticated: true
        }),
      logout: () =>
        set({
          ...initialState
        }),
      setTokens: (token, refreshToken) =>
        set((state) => ({
          ...state,
          token,
          refreshToken: refreshToken ?? state.refreshToken,
          isAuthenticated: true
        }))
    }),
    {
      name: 'oticacouple-auth',
      storage: createJSONStorage(() => localStorage)
    }
  )
);