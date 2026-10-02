// ============================================================
// App Store — Global state (toast, sidebar, demo mode)
// ============================================================

import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface AppState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  demoMode: boolean;
  toasts: Toast[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const initialCollapsed = typeof window !== 'undefined'
  ? localStorage.getItem('karmsetu_sidebar_collapsed') === 'true'
  : false;

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  sidebarCollapsed: initialCollapsed,
  demoMode: true,
  toasts: [],

  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleSidebarCollapsed: () => set(s => {
    const next = !s.sidebarCollapsed;
    try {
      localStorage.setItem('karmsetu_sidebar_collapsed', String(next));
    } catch {
      // ignore
    }
    return { sidebarCollapsed: next };
  }),

  setSidebarCollapsed: (collapsed) => {
    try {
      localStorage.setItem('karmsetu_sidebar_collapsed', String(collapsed));
    } catch {
      // ignore
    }
    set({ sidebarCollapsed: collapsed });
  },

  addToast: (message, type = 'info') => {
    const id = Date.now().toString(36);
    set(s => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }));
    }, 4000);
  },

  removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}));
