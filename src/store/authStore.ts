// ============================================================
// Auth Store — Zustand
// ============================================================

import { create } from 'zustand';
import type { User, UserRole } from '../types';
import { DEMO_USERS, DEMO_PROJECT } from '../mocks/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  currentProjectId: string;
  currentProjectName: string;
  dataDate: string;
  login: (email: string, password: string) => boolean;
  loginAs: (user: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  switchUser: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: DEMO_USERS[0], // Default logged-in demo user (Rajesh Kumar, Supervisor)
  isAuthenticated: true,
  currentProjectId: DEMO_PROJECT.id,
  currentProjectName: DEMO_PROJECT.name,
  dataDate: DEMO_PROJECT.dataDate,

  login: (email: string, _password: string) => {
    const user = DEMO_USERS.find(u => u.email === email);
    if (user) {
      set({ user, isAuthenticated: true });
      return true;
    }
    if (email && _password) {
      set({ user: DEMO_USERS[0], isAuthenticated: true });
      return true;
    }
    return false;
  },

  loginAs: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  switchRole: (role: UserRole) => {
    const user = DEMO_USERS.find(u => u.role === role);
    if (user) {
      set({ user });
    }
  },

  switchUser: (role: UserRole) => {
    const user = DEMO_USERS.find(u => u.role === role);
    if (user) {
      set({ user });
    }
  },
}));
