// ============================================================
// Topbar Component — Header, Project Context, Persona Switching
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, Bell, Search, Shield, ChevronDown, Check,
  Calendar, RefreshCw, Sparkles, UserCheck, AlertTriangle,
  PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { DEMO_USERS, DEMO_PROJECT, DEMO_INTEGRITY_FLAGS } from '../../mocks/data';
import type { UserRole } from '../../types';

export function Topbar() {
  const { user, loginAs, switchRole } = useAuthStore();
  const { toggleSidebar, sidebarCollapsed, toggleSidebarCollapsed, addToast, demoMode } = useAppStore();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const pendingFlags = DEMO_INTEGRITY_FLAGS.filter(f => f.status === 'OPEN');

  const handleRoleSelect = (role: UserRole) => {
    const targetUser = DEMO_USERS.find(u => u.role === role);
    if (targetUser) {
      loginAs(targetUser);
      addToast(`Switched persona to ${targetUser.name} (${role.replace('_', ' ')})`, 'info');
    } else {
      switchRole(role);
      addToast(`Switched active role to ${role}`, 'info');
    }
    setRoleMenuOpen(false);
  };

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      toggleSidebar();
    } else {
      toggleSidebarCollapsed();
    }
  };

  return (
    <header className="topbar">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Toggle/Minimize Sidebar Button */}
        <button
          type="button"
          className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none"
          onClick={handleToggleSidebar}
          title={sidebarCollapsed ? "Expand sidebar" : "Minimize sidebar"}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Minimize sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={19} className="text-accent-400" />
          ) : (
            <PanelLeftClose size={19} />
          )}
        </button>

        {/* Project & Data Date pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-800/80 border border-navy-700/60 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">{DEMO_PROJECT.name}</span>
            <span className="text-slate-400 font-mono text-[11px]">({DEMO_PROJECT.code})</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300">
            <Calendar size={13} className="text-accent-400" />
            <span className="text-slate-400">Data Date:</span>
            <span className="font-mono font-medium text-accent-300">{DEMO_PROJECT.dataDate}</span>
          </div>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search activities (ACT-EP-1042), tags (P-1017), claims, spools..."
            className="w-full pl-9 pr-12 py-1.5 text-xs bg-navy-900/80 border border-navy-700/70 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Pipeline Engine Demo Button */}
        <Link
          to="/pipeline"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent-600/30 to-purple-600/30 border border-accent-500/40 text-accent-300 hover:text-white text-xs font-semibold transition-all hover:scale-105 shadow-sm"
          title="Interactive 12-Stage Pipeline Simulation"
        >
          <Sparkles size={13} className="text-accent-400" />
          <span>Pipeline Demo</span>
        </Link>

        {/* Integrity Flags / Alerts Bell */}
        <div className="relative">
          <button
            type="button"
            className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="Integrity Alerts & Notifications"
          >
            <Bell size={18} />
            {pendingFlags.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                {pendingFlags.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-navy-900 border border-navy-700 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-400" />
                  Schedule Integrity Alerts
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{pendingFlags.length} active</span>
              </div>
              <div className="divide-y divide-navy-800/60 max-h-64 overflow-y-auto mt-2">
                {pendingFlags.map(flag => (
                  <div key={flag.id} className="py-2 text-xs">
                    <div className="flex items-center justify-between text-amber-300 font-medium text-[11px]">
                      <span>{flag.type.replace(/_/g, ' ')}</span>
                      <span className="text-[10px] text-slate-400">{flag.createdAt.split('T')[0]}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] mt-0.5">{flag.description}</p>
                    <div className="text-[10px] text-accent-400 mt-1 font-mono">
                      Activity: {flag.activityId}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Persona / Role Switcher Quick Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-800 border border-navy-700/80 hover:border-accent-500/50 transition-all text-left"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent-600 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold">
              {user?.avatarInitials || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                {user?.name}
                <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="text-[10px] text-accent-400 font-medium">
                {user?.role.replace('_', ' ')}
              </div>
            </div>
          </button>

          {/* Role Dropdown */}
          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-navy-900 border border-navy-700 shadow-2xl p-2 z-50">
              <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-navy-800">
                Switch Role / Persona (Judge Demo)
              </div>
              <div className="mt-1 space-y-1">
                {(['SUPERVISOR', 'PLANNER', 'PROJECT_MANAGER', 'ADMIN'] as UserRole[]).map(role => {
                  const demoUser = DEMO_USERS.find(u => u.role === role);
                  const isCurrent = user?.role === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isCurrent
                          ? 'bg-accent-600/20 text-accent-300 font-medium border border-accent-500/30'
                          : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-slate-200">{demoUser?.name}</div>
                        <div className="text-[10px] text-slate-400">{role.replace('_', ' ')}</div>
                      </div>
                      {isCurrent && <Check size={14} className="text-accent-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
