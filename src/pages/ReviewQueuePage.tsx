// ============================================================
// Review Queue — Planner & PM Triage, Feature Scoring, Decisions
// ============================================================

import { useState } from 'react';
import {
  ClipboardList, CheckCircle2, XCircle, AlertTriangle, ArrowRight,
  ShieldCheck, HelpCircle, ChevronRight, User, Calendar, FileText,
  ThumbsUp, RefreshCw, BarChart2
} from 'lucide-react';
import { DEMO_REVIEW_TASKS, DEMO_CONFLICTS } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { ReviewTask } from '../types';

export function ReviewQueuePage() {
  const { addToast } = useAppStore();
  const [tasks, setTasks] = useState<ReviewTask[]>(DEMO_REVIEW_TASKS);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'CONFLICTS' | 'ACCEPTED'>('PENDING');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    DEMO_REVIEW_TASKS[0]?.id || ''
  );

  const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  const handleDecision = (taskId: string, decision: 'ACCEPTED' | 'REJECTED') => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: decision };
      }
      return t;
    }));

    if (decision === 'ACCEPTED') {
      addToast(`Task ${taskId} approved! Actual date committed to P6 schedule ledger.`, 'success');
    } else {
      addToast(`Task ${taskId} rejected & quarantined for supervisor clarification.`, 'warning');
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'PENDING') return t.status === 'PENDING';
    if (activeTab === 'ACCEPTED') return t.status === 'ACCEPTED';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <ClipboardList size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Planner Triage</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Review Queue &amp; Confidence Governance</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Resolve ambiguous claims, inspect explainable linking features, and resolve cross-contractor conflicts.
          </p>
        </div>

        {/* Tab Badges */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-950 border border-navy-800">
          <button
            type="button"
            onClick={() => setActiveTab('PENDING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'PENDING'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pending ({tasks.filter(t => t.status === 'PENDING').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('CONFLICTS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'CONFLICTS'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Conflicts ({DEMO_CONFLICTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ACCEPTED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ACCEPTED'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Approved ({tasks.filter(t => t.status === 'ACCEPTED').length})
          </button>
        </div>
      </div>

      {/* Main Split Screen */}
      {activeTab === 'CONFLICTS' ? (
        /* Conflict Resolution Panel */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle size={16} />
              Cross-Reporter Conflict Detected: Multiple sources claim contradictory finish dates.
            </span>
            <span className="font-mono text-[11px] font-bold">1 Unresolved Conflict</span>
          </div>

          {DEMO_CONFLICTS.map(conf => (
            <div key={conf.id} className="p-6 rounded-2xl bg-navy-900 border border-navy-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <div>
                  <span className="font-mono text-xs font-bold text-accent-400">{conf.activityCode}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">Line 24-P-1018 Erection Date Discrepancy</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300">
                  {conf.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conf.sources.map((src, i) => (
                  <div key={i} className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{src.reporter}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">{src.sourceType}</span>
                    </div>
                    <div className="text-slate-400">
                      Reported Event Date: <strong className="text-accent-300 font-mono">{src.eventDate}</strong>
                    </div>
                    <div className="text-slate-400">
                      Reporting Latency: <strong className="text-slate-300">{src.latencyHours}h lag</strong>
                    </div>
                    <div className="text-slate-400">
                      Historical Trust Score: <strong className="text-emerald-400 font-mono">{Math.round(src.trustIndicator * 100)}%</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToast(`Resolved in favor of ${src.reporter} (${src.eventDate})`, 'success')}
                      className="w-full mt-2 py-1.5 rounded-lg bg-navy-800 hover:bg-accent-600 text-slate-200 hover:text-white font-medium text-xs transition-colors"
                    >
                      Select this Date ({src.eventDate})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Regular Split Layout (Triage List + Feature Deep Dive) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Triage List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-8 rounded-2xl bg-navy-900 border border-navy-800 text-center text-slate-400 text-xs">
                No tasks in this lane.
              </div>
            ) : (
              filteredTasks.map(task => {
                const isSelected = selectedTaskId === task.id;
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-navy-800/90 border-accent-500 shadow-md ring-1 ring-accent-500/30'
                        : 'bg-navy-900/80 border-navy-800 hover:border-navy-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-accent-400">{task.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        (task.claim.confidenceLane || 'ONE_TAP') === 'AUTO_COMMIT'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : (task.claim.confidenceLane || 'ONE_TAP') === 'ONE_TAP'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {(task.claim.confidenceLane || 'ONE_TAP').replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-white mt-1.5 line-clamp-1">
                      {task.claim.rawSource}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-navy-800/60 text-[11px] text-slate-400">
                      <span>Source: {task.claim.sourceDocumentId}</span>
                      <span className="font-mono font-bold text-accent-300">
                        {Math.round(task.confidence * 100)}% match
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column (7 cols): Selected Task Feature Breakdown */}
          {selectedTask && (
            <div className="lg:col-span-7 p-6 rounded-2xl bg-navy-900 border border-navy-700 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">Triage Task Detail</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{selectedTask.id}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Lane:</span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-accent-500/10 text-accent-300 border border-accent-500/20">
                    {selectedTask.claim.confidenceLane || 'ONE_TAP'}
                  </span>
                </div>
              </div>

              {/* Raw Claim Snippet */}
              <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 text-xs">
                <div className="text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                  <FileText size={13} className="text-accent-400" />
                  Ingested Field Claim Snippet:
                </div>
                <div className="text-white italic font-serif text-sm">
                  &quot;{selectedTask.claim.rawSource}&quot;
                </div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                  <span>Modality: <strong className="text-cyan-300 font-mono">{selectedTask.claim.modality}</strong></span>
                  <span>Event Date: <strong className="text-slate-200 font-mono">{selectedTask.claim.eventTime}</strong></span>
                  <span>Reporter: <strong className="text-slate-200">{selectedTask.claim.reporterName}</strong></span>
                </div>
              </div>

              {/* Top Activity Candidate & Feature Breakdown */}
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Best Matching Activity Candidate
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    Score: {Math.round(selectedTask.confidence * 100)}%
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-navy-900 border border-navy-700/80">
                  <div className="font-mono text-xs font-bold text-accent-400">{selectedTask.suggestedActivityCode || 'ACT-EP-1042'}</div>
                  <div className="text-xs font-semibold text-white mt-0.5">{selectedTask.suggestedActivityName || 'Erect Line 24-P-1017'}</div>
                </div>

                {/* Feature Scoring Breakdown */}
                <div className="space-y-2 pt-2 border-t border-navy-800">
                  <div className="text-[11px] font-semibold text-slate-300">
                    Why did the engine select this activity? (Explainable Scoring):
                  </div>

                  {[
                    { label: 'Scope Object Resolution (P-1017 tag match)', weight: '40%', score: 96, color: 'bg-emerald-500' },
                    { label: 'Discipline Compatibility (Piping)', weight: '25%', score: 100, color: 'bg-blue-500' },
                    { label: 'Temporal Schedule Proximity (Near planned window)', weight: '20%', score: 90, color: 'bg-purple-500' },
                    { label: 'Network Predecessor Completion (F-12 concrete poured)', weight: '15%', score: 88, color: 'bg-amber-500' },
                  ].map((feat, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>{feat.label} <span className="text-slate-500">({feat.weight})</span></span>
                        <span className="font-mono font-bold text-slate-200">{feat.score}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full ${feat.color}`} style={{ width: `${feat.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleDecision(selectedTask.id, 'REJECTED')}
                  className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-rose-950 hover:text-rose-300 border border-navy-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Reject / Clarify
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addToast('Opening alternative activity search modal...', 'info')}
                    className="px-3 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    Reassign Activity
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDecision(selectedTask.id, 'ACCEPTED')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 size={14} />
                    One-Tap Confirm &amp; Commit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
