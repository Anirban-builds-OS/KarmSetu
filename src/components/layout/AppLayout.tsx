// ============================================================
// App Layout Component — Shell containing Sidebar, Topbar, & Outlet
// ============================================================

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAppStore } from '../../store/appStore';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export function AppLayout() {
  const { toasts, removeToast, theme } = useAppStore();

  const isDark = theme === 'dark';

  return (
    <div className={`flex h-screen w-screen overflow-hidden antialiased font-sans ${isDark ? 'bg-navy-950 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Primary Sidebar */}
      <Sidebar />

      {/* Main Body */}
      <div className={`flex flex-col flex-1 min-w-0 h-full overflow-hidden ${isDark ? 'bg-navy-950' : 'bg-gray-50'}`}>
        <Topbar />

        {/* Viewport Content */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${isDark ? 'bg-gradient-to-b from-navy-950 via-slate-900 to-navy-950' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'}`}>
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Toast Notification Stack */}
      <aside aria-label="Notifications" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => {
          const iconMap = {
            success: <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />,
            error: <XCircle size={16} className="text-rose-400 shrink-0" />,
            warning: <AlertTriangle size={16} className="text-amber-400 shrink-0" />,
            info: <Info size={16} className="text-accent-400 shrink-0" />,
          };

          const borderMap = {
            success: 'border-emerald-500/40 bg-emerald-950/90 text-emerald-100',
            error: 'border-rose-500/40 bg-rose-950/90 text-rose-100',
            warning: 'border-amber-500/40 bg-amber-950/90 text-amber-100',
            info: 'border-accent-500/40 bg-navy-900/90 text-slate-100',
          };

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${
                borderMap[toast.type] || borderMap.info
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs font-medium">
                {iconMap[toast.type] || iconMap.info}
                <span>{toast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
