// ============================================================
// Users Page — Team Members, Roles, & Bayesian Trust Scores
// ============================================================

import { useState } from 'react';
import {
  Users, ShieldCheck, Clock, Award, CheckCircle2,
  ArrowRight, UserCheck, Sparkles
} from 'lucide-react';
import { DEMO_USERS } from '../mocks/data';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import type { User } from '../types';

export function UsersPage() {
  const { user: currentUser, loginAs } = useAuthStore();
  const { addToast } = useAppStore();

  const handleSwitchUser = (targetUser: User) => {
    loginAs(targetUser);
    addToast(`Switched active session to ${targetUser.name} (${targetUser.role})`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <Users size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Team &amp; Reputation</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Users &amp; Bayesian Reporter Trust Scores</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Every reporter has a Bayesian Beta distribution (&alpha; positive verifications, &beta; overrides) weighting their claims in conflict resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/70 border border-navy-700 text-xs text-slate-300 font-mono">
            {DEMO_USERS.length} Project Stakeholders
          </span>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_USERS.map(u => {
          const trustScore = Math.round((u.trustAlpha / (u.trustAlpha + u.trustBeta)) * 100);
          const isCurrent = currentUser?.id === u.id;

          return (
            <div
              key={u.id}
              className={`p-5 rounded-2xl border transition-all shadow-md space-y-4 ${
                isCurrent
                  ? 'bg-navy-800/90 border-accent-500 ring-1 ring-accent-500/40'
                  : 'bg-navy-900/80 border-navy-700/80 hover:border-navy-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow">
                    {u.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{u.name}</h3>
                    <span className="text-xs text-slate-400">{u.role.replace('_', ' ')}</span>
                  </div>
                </div>

                {isCurrent && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-500/20 text-accent-300 border border-accent-500/30">
                    Active You
                  </span>
                )}
              </div>

              {/* Trust & Latency Metrics */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-400" /> Trust Score
                  </span>
                  <div className="text-base font-bold text-emerald-400 mt-0.5 font-mono">
                    {trustScore}%
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    &alpha;={u.trustAlpha}, &beta;={u.trustBeta}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={12} className="text-accent-400" /> Latency
                  </span>
                  <div className="text-base font-bold text-slate-200 mt-0.5 font-mono">
                    {u.medianLatencyHours}h
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {u.verificationHistory} claims checked
                  </span>
                </div>
              </div>

              {/* Area & Discipline info */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Discipline: <strong className="text-slate-200">{u.discipline || 'All'}</strong></span>
                <span>Area: <strong className="text-slate-200">{u.area || 'Entire Site'}</strong></span>
              </div>

              {/* Switch Persona Button for Judges */}
              <button
                type="button"
                onClick={() => handleSwitchUser(u)}
                className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isCurrent
                    ? 'bg-navy-950 text-slate-400 cursor-default'
                    : 'bg-navy-800 hover:bg-accent-600 text-slate-200 hover:text-white'
                }`}
              >
                <UserCheck size={14} />
                {isCurrent ? 'Current Session' : `Switch Persona to ${u.name.split(' ')[0]}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
