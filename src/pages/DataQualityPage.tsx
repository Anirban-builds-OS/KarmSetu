// ============================================================
// Data Quality Page — Schedule Integrity Flags & Auditing
// ============================================================

import { useState } from 'react';
import {
  AlertTriangle, ShieldAlert, CheckCircle2, XCircle,
  Clock, ArrowRight, ShieldCheck, Filter, AlertOctagon
} from 'lucide-react';
import { DEMO_INTEGRITY_FLAGS, DEMO_DATA_QUALITY } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { IntegrityFlag } from '../types';

export function DataQualityPage() {
  const { addToast } = useAppStore();
  const [flags, setFlags] = useState<IntegrityFlag[]>(DEMO_INTEGRITY_FLAGS);

  const handleResolve = (flagId: string) => {
    setFlags(prev => prev.map(f => {
      if (f.id === flagId) {
        return { ...f, status: 'REVIEWED' };
      }
      return f;
    }));
    addToast(`Flag ${flagId} marked as resolved.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
              <ShieldAlert size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Schedule Integrity Guard</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Data Quality &amp; Integrity Watchdog</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Detects fraudulent reporting, suspicious Planned=Actual copying, stale progress clones, and out-of-sequence execution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/70 border border-navy-700 text-xs text-slate-300 font-mono">
            {flags.filter(f => f.status === 'OPEN').length} Active Violations
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <span className="text-xs text-slate-400">Parse Success Rate</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {Math.round(DEMO_DATA_QUALITY.parseSuccessRate * 100)}%
          </div>
          <span className="text-[10px] text-slate-400">OCR &amp; schema parser</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <span className="text-xs text-slate-400">Quarantined Sources</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">
            {DEMO_DATA_QUALITY.quarantinedSources}
          </div>
          <span className="text-[10px] text-slate-400">held for verification</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <span className="text-xs text-slate-400">Planned = Actual Clones</span>
          <div className="text-2xl font-bold text-rose-400 mt-1">
            {DEMO_DATA_QUALITY.suspiciousPlannedEqActual}
          </div>
          <span className="text-[10px] text-rose-400 font-medium">Lazy contractor updates</span>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <span className="text-xs text-slate-400">Unresolved Scope Tags</span>
          <div className="text-2xl font-bold text-cyan-400 mt-1">
            {DEMO_DATA_QUALITY.unresolvedObjects}
          </div>
          <span className="text-[10px] text-slate-400">missing in Scope Graph</span>
        </div>
      </div>

      {/* Integrity Flags List */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle size={16} className="text-rose-400" />
            Detected Integrity Violations &amp; Exceptions
          </h3>
        </div>

        <div className="space-y-3">
          {flags.map(flag => (
            <div
              key={flag.id}
              className={`p-4 rounded-xl border transition-all ${
                flag.status !== 'OPEN'
                  ? 'bg-navy-950/40 border-navy-800 opacity-60'
                  : 'bg-navy-950/90 border-rose-500/40 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-rose-400">{flag.type.replace(/_/g, ' ')}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                    Activity: {flag.activityId}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-mono text-[11px]">{flag.createdAt.split('T')[0]}</span>
                  {flag.status !== 'OPEN' ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 size={13} /> Resolved
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleResolve(flag.id)}
                      className="px-3 py-1 rounded-lg bg-navy-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-medium text-xs transition-colors"
                    >
                      Acknowledge &amp; Clear
                    </button>
                  )}
                </div>
              </div>

              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                {flag.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
