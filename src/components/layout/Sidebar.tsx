// ============================================================
// Sidebar Navigation
// ============================================================

import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, MessageSquare, FileInput,
  FileBarChart, BarChart3, ClipboardList, FileText,
  Network, Shield, Brain, Upload, AlertTriangle,
  Settings, Users, Activity, ChevronDown, Sparkles, LogIn, GitBranch,
  PanelLeftClose, PanelLeftOpen, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/pipeline', icon: Sparkles, label: 'Pipeline Engine', badge: 'Demo' },
  { to: '/trace', icon: GitBranch, label: 'Activity Trace', badge: 'Audit' },
  { to: '/todays-board', icon: CalendarCheck, label: "Today's Board", badge: 3 },
  { to: '/time-agent', icon: MessageSquare, label: 'Time Agent' },
  { to: '/ingest', icon: FileInput, label: 'Ingestion' },
  { to: '/plans', icon: FileBarChart, label: 'Plans' },
  { to: '/gantt', icon: BarChart3, label: 'Gantt' },
  { to: '/review', icon: ClipboardList, label: 'Review Queue', badge: 6 },
  { to: '/claims', icon: FileText, label: 'Claims' },
  { to: '/scope-graph', icon: Network, label: 'Scope Graph' },
  { to: '/audit', icon: Shield, label: 'Audit Ledger' },
  { to: '/memory', icon: Brain, label: 'Execution Memory' },
  { to: '/writeback', icon: Upload, label: 'Write-back' },
  { to: '/data-quality', icon: AlertTriangle, label: 'Data Quality' },
];

const ADMIN_ITEMS = [
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/system-health', icon: Activity, label: 'System Health' },
];

export function Sidebar() {
  const { user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapsed } = useAppStore();
  const location = useLocation();

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        {/* Header / Brand */}
        {sidebarCollapsed ? (
          <div className="py-3 px-2 flex flex-col items-center gap-2 border-b border-white/10">
            <Link
              to="/dashboard"
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/25 hover:scale-105 transition-transform"
              title="KARMSETU — Execution Intelligence"
            >
              <span className="text-white font-bold text-base">K</span>
            </Link>
            <button
              type="button"
              onClick={toggleSidebarCollapsed}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Expand sidebar (Click to expand)"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen size={16} />
            </button>
          </div>
        ) : (
          <div className="px-4 py-3.5 flex items-center justify-between border-b border-white/10">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-md shadow-accent-500/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <div>
                <div className="text-white font-bold text-base tracking-wide leading-tight">KARMSETU</div>
                <div className="text-[10px] text-navy-400 tracking-widest uppercase">Execution Intelligence</div>
              </div>
            </Link>
            <button
              type="button"
              onClick={toggleSidebarCollapsed}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Minimize sidebar (Collapse to icon rail)"
              aria-label="Minimize sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {!sidebarCollapsed && (
            <div className="px-4 py-1.5">
              <span className="text-[10px] font-semibold text-navy-500 uppercase tracking-wider">Main</span>
            </div>
          )}
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              title={sidebarCollapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ''}` : undefined}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive || location.pathname.startsWith(item.to) ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} className="shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          ))}

          {(user?.role === 'ADMIN' || user?.role === 'PROJECT_MANAGER') && (
            <>
              {sidebarCollapsed ? (
                <div className="my-2 mx-3 border-t border-white/10" />
              ) : (
                <div className="px-4 py-2 mt-2">
                  <span className="text-[10px] font-semibold text-navy-500 uppercase tracking-wider">Admin</span>
                </div>
              )}
              {ADMIN_ITEMS.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `sidebar-nav-item ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/10 p-2.5">
          {sidebarCollapsed ? (
            <div className="flex flex-col items-center gap-2">
              {/* Collapsed Project icon */}
              <div
                className="w-8 h-8 rounded-lg bg-accent-600/30 border border-accent-500/20 flex items-center justify-center cursor-pointer hover:bg-accent-600/40 transition-colors"
                title="Demo EPC Project (DEPC-2026)"
              >
                <span className="text-accent-400 text-[10px] font-bold">EP</span>
              </div>

              {/* Collapsed User avatar */}
              {user && (
                <div
                  className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm cursor-pointer"
                  title={`${user.name} — ${user.role.replace('_', ' ')}`}
                >
                  {user.avatarInitials}
                </div>
              )}

              {/* Collapsed Judge Portal Link */}
              <Link
                to="/login"
                className="w-8 h-8 rounded-lg bg-gradient-to-r from-accent-600/20 to-purple-600/20 border border-accent-500/30 text-accent-300 hover:text-white flex items-center justify-center transition-colors"
                title="Judge Portal / Personas"
              >
                <Sparkles size={15} className="text-accent-400" />
              </Link>

              {/* Bottom Expand Toggle button */}
              <button
                type="button"
                onClick={toggleSidebarCollapsed}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <>
              {/* Project selector */}
              <div className="sidebar-nav-item mb-2 !mx-0">
                <div className="w-6 h-6 rounded bg-accent-600/30 flex items-center justify-center">
                  <span className="text-accent-400 text-[10px] font-bold">EP</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white truncate font-medium">Demo EPC Project</div>
                  <div className="text-[10px] text-navy-400 font-mono">DEPC-2026</div>
                </div>
                <ChevronDown size={14} className="text-navy-500 shrink-0" />
              </div>

              {/* User */}
              {user && (
                <div className="flex items-center gap-2 px-2.5 py-1.5 mb-1 rounded-lg bg-navy-900/60 border border-navy-800/80">
                  <div className="w-7 h-7 rounded-full bg-accent-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-bold">{user.avatarInitials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white truncate font-medium">{user.name}</div>
                    <div className="text-[10px] text-accent-400 font-medium">{user.role.replace('_', ' ')}</div>
                  </div>
                </div>
              )}

              {/* Judge Portal / Landing Link */}
              <Link
                to="/login"
                className="flex items-center justify-between w-full px-3 py-2 mb-2 rounded-lg bg-gradient-to-r from-accent-600/20 to-purple-600/20 border border-accent-500/30 text-accent-300 hover:text-white hover:border-accent-400 text-xs font-semibold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-accent-400 group-hover:rotate-12 transition-transform" />
                  <span>Judge Portal / Personas</span>
                </div>
                <LogIn size={13} className="text-accent-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* System status & minimize hint */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 pulse" />
                  <span className="text-[10px] text-navy-400">System operational</span>
                </div>
                <button
                  type="button"
                  onClick={toggleSidebarCollapsed}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5 transition-colors"
                  title="Minimize sidebar"
                >
                  <span>Minimize</span>
                  <PanelLeftClose size={12} />
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
