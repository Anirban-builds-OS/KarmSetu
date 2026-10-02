// ============================================================
// Settings Page — Project Parameters, Confidence Thresholds, Calendar
// ============================================================

import { useState } from 'react';
import {
  Settings, Sliders, Calendar, ShieldCheck,
  Save, RefreshCw, Sparkles, CheckCircle2
} from 'lucide-react';
import { DEMO_PROJECT } from '../mocks/data';
import { useAppStore } from '../store/appStore';

export function SettingsPage() {
  const { addToast } = useAppStore();
  const [dataDate, setDataDate] = useState(DEMO_PROJECT.dataDate);
  const [autoCommitThreshold, setAutoCommitThreshold] = useState(0.90);
  const [oneTapThreshold, setOneTapThreshold] = useState(0.70);
  const [calendarDays, setCalendarDays] = useState('6_DAYS');

  const handleSave = () => {
    addToast('Project configuration saved! Confidence routing engine updated.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <Settings size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Configuration</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Project Settings &amp; Engine Calibration</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Configure working calendars, confidence lane thresholds, and derivation rules.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-accent-600/30 transition-all self-start md:self-auto"
        >
          <Save size={14} />
          Save Changes
        </button>
      </div>

      {/* Project Master Info */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-navy-800">
          Project Master Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Project Name</label>
            <input
              type="text"
              readOnly
              value={DEMO_PROJECT.name}
              className="w-full p-2.5 rounded-xl bg-navy-950 border border-navy-800 text-white font-medium"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Project Code</label>
            <input
              type="text"
              readOnly
              value={DEMO_PROJECT.code}
              className="w-full p-2.5 rounded-xl bg-navy-950 border border-navy-800 text-accent-300 font-mono font-medium"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Active Data Date (Cutoff)</label>
            <input
              type="date"
              value={dataDate}
              onChange={e => setDataDate(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white font-mono font-medium focus:outline-none focus:border-accent-500"
            />
          </div>
        </div>
      </div>

      {/* Tri-Lane Confidence Threshold Sliders */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-5">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sliders size={15} className="text-accent-400" />
            Confidence Lane Routing Thresholds
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrate the balance between human-in-the-loop oversight and automated P6 derivation.
          </p>
        </div>

        {/* Auto Commit Slider */}
        <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-400">
              Auto-Commit Threshold (No Human Review Needed)
            </span>
            <span className="font-mono font-bold text-white text-sm">
              &ge; {Math.round(autoCommitThreshold * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.75"
            max="0.99"
            step="0.01"
            value={autoCommitThreshold}
            onChange={e => setAutoCommitThreshold(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400">
            Claims with hybrid score at or above this threshold commit directly into the audit ledger.
          </p>
        </div>

        {/* One Tap Slider */}
        <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-400">
              One-Tap Affirm Threshold (Supervisor Single-Click Affirmation)
            </span>
            <span className="font-mono font-bold text-white text-sm">
              &ge; {Math.round(oneTapThreshold * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.50"
            max="0.85"
            step="0.01"
            value={oneTapThreshold}
            onChange={e => setOneTapThreshold(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400">
            Claims between {Math.round(oneTapThreshold * 100)}% and {Math.round(autoCommitThreshold * 100)}% require 1-tap affirmation. Below this is held for Planner Triage.
          </p>
        </div>
      </div>

      {/* Derivation Rules Active */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-navy-800">
          Active Schedule Derivation Rules
        </h3>

        <div className="space-y-2 text-xs">
          {[
            { code: 'R-START', name: 'Earliest Start Rule', desc: 'Sets Actual Start date to the earliest credible field observation event date.' },
            { code: 'R-FINISH-ALL', name: 'Scope Completion Barrier', desc: 'Sets Actual Finish only when 100% of physical scope objects mapped to activity are verified complete.' },
            { code: 'R-PROGRESS-WEIGHTED', name: 'Physical Quantity Weighting', desc: 'Computes percent complete as linear fraction of installed quantities (meters, tonnage, spools).' },
            { code: 'R-ANTI-CLONE', name: 'Anti-Lazy Fraud Detection', desc: 'Quarantines any contractor claim where Actual Date exactly matches Planned Date without time discrepancy.' },
          ].map((rule, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-accent-400 font-bold text-[11px]">{rule.code}</span>
                  <span className="text-white font-medium">{rule.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{rule.desc}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 shrink-0">
                ACTIVE
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
