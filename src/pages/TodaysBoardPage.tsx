// ============================================================
// Today's Board — Mobile-First Supervisor Execution Checklist
// ============================================================

import { useState } from 'react';
import {
  CalendarCheck, CheckCircle2, Play, AlertOctagon, Clock,
  Filter, ChevronRight, X, ShieldAlert,
  ThumbsUp, Sparkles
} from 'lucide-react';
import { DEMO_BOARD } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { DelayCause, ActivityStatus } from '../types';

interface BoardCardState {
  activityId: string;
  activityCode: string;
  activityName: string;
  area: string;
  discipline: string;
  expectedToday: string;
  status: ActivityStatus;
  percent: number;
  blockingCause?: DelayCause;
  exceptionNotes?: string;
}

export function TodaysBoardPage() {
  const { addToast } = useAppStore();
  const [items, setItems] = useState<BoardCardState[]>(
    DEMO_BOARD.map(b => ({
      ...b,
      percent: b.status === 'COMPLETED' ? 100 : b.status === 'IN_PROGRESS' ? 60 : 0
    }))
  );

  const [activeArea, setActiveArea] = useState<string>('ALL');
  const [selectedItemForException, setSelectedItemForException] = useState<BoardCardState | null>(null);
  const [exceptionCause, setExceptionCause] = useState<DelayCause>('CRANE');
  const [exceptionNote, setExceptionNote] = useState('');

  const handleStart = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.activityId === id) {
        addToast(`Activity ${item.activityCode} marked IN PROGRESS. Actual Start logged as 2026-09-29.`, 'success');
        return { ...item, status: 'IN_PROGRESS', percent: 25 };
      }
      return item;
    }));
  };

  const handleComplete = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.activityId === id) {
        addToast(`Activity ${item.activityCode} marked COMPLETED. R-FINISH-ALL satisfied!`, 'success');
        return { ...item, status: 'COMPLETED', percent: 100 };
      }
      return item;
    }));
  };

  const handleSaveException = () => {
    if (!selectedItemForException) return;
    setItems(prev => prev.map(item => {
      if (item.activityId === selectedItemForException.activityId) {
        addToast(`Exception logged on ${item.activityCode}: ${exceptionCause} delay`, 'warning');
        return {
          ...item,
          status: 'SUSPENDED',
          blockingCause: exceptionCause,
          exceptionNotes: exceptionNote
        };
      }
      return item;
    }));
    setSelectedItemForException(null);
    setExceptionNote('');
  };

  const filteredItems = activeArea === 'ALL'
    ? items
    : items.filter(i => i.area === activeArea || i.discipline === activeArea);

  const areas = ['ALL', 'Bay 3', 'Bay 1', 'Utility Area', 'Civil', 'Piping', 'Electrical'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700/80 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <CalendarCheck size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Supervisor Board</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Today&apos;s Execution Board</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time daily reporting for site supervisors. Updates feed the derivation engine instantly.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-navy-950/70 border border-navy-700 text-xs">
            <span className="text-slate-400">Today:</span>{' '}
            <span className="font-mono font-semibold text-accent-400">29-Sep-2026</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter size={14} className="text-slate-500 shrink-0 ml-1" />
        {areas.map(area => (
          <button
            key={area}
            type="button"
            onClick={() => setActiveArea(area)}
            className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-colors ${
              activeArea === area
                ? 'bg-accent-600 text-white font-semibold shadow-sm'
                : 'bg-navy-900/80 text-slate-400 hover:text-white border border-navy-800 hover:border-navy-700'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {filteredItems.map(item => {
          const isDone = item.status === 'COMPLETED';
          const isWorking = item.status === 'IN_PROGRESS';
          const isBlocked = item.status === 'SUSPENDED';

          return (
            <div
              key={item.activityId}
              className={`p-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : isBlocked
                  ? 'bg-rose-950/25 border-rose-500/40'
                  : isWorking
                  ? 'bg-navy-900/95 border-accent-500/40'
                  : 'bg-navy-900/80 border-navy-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-accent-400">{item.activityCode}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {item.discipline}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-navy-800 text-slate-300">
                      {item.area}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isBlocked
                        ? 'bg-rose-500/20 text-rose-300'
                        : isWorking
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mt-1.5">{item.activityName}</h3>

                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-500" />
                      Plan Target: <strong className="text-slate-300">{item.expectedToday}</strong>
                    </span>
                    {item.blockingCause && (
                      <span className="flex items-center gap-1 text-rose-400 font-medium">
                        <AlertOctagon size={13} /> Blocked: {item.blockingCause}
                      </span>
                    )}
                  </div>

                  {item.exceptionNotes && (
                    <div className="mt-2 p-2 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-200 text-xs italic">
                      &quot;{item.exceptionNotes}&quot;
                    </div>
                  )}
                </div>

                {/* Supervisor Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {!isDone && (
                    <>
                      {item.status === 'NOT_STARTED' && (
                        <button
                          type="button"
                          onClick={() => handleStart(item.activityId)}
                          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95"
                        >
                          <Play size={13} fill="white" />
                          Start Work
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleComplete(item.activityId)}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all active:scale-95"
                      >
                        <CheckCircle2 size={14} />
                        Mark Done
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedItemForException(item)}
                        className="px-2.5 py-2 rounded-xl bg-navy-800 hover:bg-rose-950/60 hover:border-rose-500/50 border border-navy-700 text-slate-300 hover:text-rose-300 text-xs font-medium flex items-center gap-1 transition-all"
                        title="Log exception, hold up or delay cause"
                      >
                        <ShieldAlert size={14} />
                        Hold / Delay
                      </button>
                    </>
                  )}

                  {isDone && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                      <ThumbsUp size={14} />
                      Completed &amp; Signed
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exception Modal */}
      {selectedItemForException && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <div className="flex items-center gap-2">
                <AlertOctagon size={18} className="text-rose-400" />
                <h3 className="font-bold text-white text-sm">Raise Site Exception</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItemForException(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <div className="text-xs text-slate-400">Target Activity:</div>
              <div className="text-sm font-semibold text-white">
                {selectedItemForException.activityCode} &ndash; {selectedItemForException.activityName}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Delay / Bottleneck Root Cause:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['CRANE', 'MATERIAL', 'MANPOWER', 'PERMIT', 'DESIGN', 'ACCESS', 'WEATHER', 'REWORK'] as DelayCause[]).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setExceptionCause(c)}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      exceptionCause === c
                        ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                        : 'bg-navy-800 text-slate-300 border-navy-700 hover:bg-navy-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Supervisor Remarks / Specific Impediment:
              </label>
              <textarea
                value={exceptionNote}
                onChange={e => setExceptionNote(e.target.value)}
                placeholder="e.g. 50T Mobile Crane boom cylinder leaking; replacement requested from contractor yard."
                className="w-full h-24 p-3 rounded-xl bg-navy-950 border border-navy-700 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedItemForException(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-navy-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveException}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30"
              >
                Confirm Exception
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
