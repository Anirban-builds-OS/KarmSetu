// ============================================================
// App Store — Global UI state (toasts, sidebar, theme, demoMode)
// ============================================================

import { create } from 'zustand';
import { storageGet, storageSet, generateId } from '../lib/security';

// ---- Types ----

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface AppState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  demoMode: boolean;
  theme: 'dark' | 'light';
  toasts: Toast[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

// ---- Theme helpers ----

function applyTheme(theme: 'dark' | 'light'): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }
  root.setAttribute('data-theme', theme);
  storageSet('karmsetu_theme', theme);
}

// ---- Initial state read from localStorage (before first render) ----

const rawTheme = storageGet('karmsetu_theme');
const initialTheme: 'dark' | 'light' =
  rawTheme === 'light' ? 'light' : 'dark';

const rawCollapsed = storageGet('karmsetu_sidebar_collapsed');
const initialCollapsed = rawCollapsed === 'true';

// Apply theme immediately so there is no flash-of-wrong-theme
if (typeof document !== 'undefined') {
  applyTheme(initialTheme);
}

// ---- Store ----

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: initialCollapsed,
  demoMode: true,
  theme: initialTheme,
  toasts: [],

  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebarCollapsed: () =>
    set(s => {
      const next = !s.sidebarCollapsed;
      storageSet('karmsetu_sidebar_collapsed', String(next));
      return { sidebarCollapsed: next };
    }),

  setSidebarCollapsed: (collapsed) => {
    storageSet('karmsetu_sidebar_collapsed', String(collapsed));
    set({ sidebarCollapsed: collapsed });
  },

  toggleTheme: () =>
    set(s => {
      const next: 'dark' | 'light' = s.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return { theme: next };
    }),

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  addToast: (message, type = 'info') => {
    const id = generateId('toast');
    set(s => ({ toasts: [...s.toasts, { id, message, type }] }));
    // Auto-dismiss after 4 s
    setTimeout(() => {
      set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }));
    }, 4_000);
  },

  removeToast: (id) =>
    set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}));
