// ============================================================
// Auth Store — Zustand
// ============================================================

import { create } from 'zustand';
import type { User, UserRole } from '../types';
import { DEMO_USERS, DEMO_PROJECT } from '../mocks/data';
import { rateLimit, rateLimitReset } from '../lib/security';

const AUTH_RATE_KEY = 'auth:login';
const AUTH_MAX_ATTEMPTS = 5;   // max attempts per window
const AUTH_WINDOW_MS   = 60_000; // 60 second window

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  currentProjectId: string;
  currentProjectName: string;
  dataDate: string;
  loginError: string | null;
  /** Returns true on success, false on failure (wrong credentials or rate-limited). */
  login: (email: string, password: string) => boolean;
  loginAs: (user: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: DEMO_USERS[0] ?? null,   // Default demo user
  isAuthenticated: true,
  currentProjectId: DEMO_PROJECT.id,
  currentProjectName: DEMO_PROJECT.name,
  dataDate: DEMO_PROJECT.dataDate,
  loginError: null,

  login: (email, _password) => {
    // Rate-limit: no more than AUTH_MAX_ATTEMPTS per window
    if (!rateLimit(AUTH_RATE_KEY, AUTH_MAX_ATTEMPTS, AUTH_WINDOW_MS)) {
      set({ loginError: 'Too many login attempts. Please wait a moment.' });
      return false;
    }

    // Only accept recognised demo email addresses — never accept arbitrary input
    const matched = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!matched) {
      set({ loginError: 'Unrecognised demo account. Use one of the persona cards.' });
      return false;
    }

    rateLimitReset(AUTH_RATE_KEY);
    set({ user: matched, isAuthenticated: true, loginError: null });
    return true;
  },

  loginAs: (user) => {
    set({ user, isAuthenticated: true, loginError: null });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, loginError: null });
  },

  switchRole: (role) => {
    const target = DEMO_USERS.find(u => u.role === role);
    if (target) set({ user: target });
  },
}));
