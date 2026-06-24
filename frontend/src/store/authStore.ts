import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'COMPANY';
  company?: {
    id: string;
    name: string;
    totalLimit: number;
    usedLimit: number;
    tier: 'MEGA' | 'GOLD';
  };
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  updateCompanyLimit: (usedLimit: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      updateCompanyLimit: (usedLimit) =>
        set((state) => ({
          user: state.user?.company
            ? {
                ...state.user,
                company: { ...state.user.company, usedLimit },
              }
            : state.user,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
