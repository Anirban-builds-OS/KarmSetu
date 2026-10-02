// ============================================================
// Activity Trace Page — Full Provenance Timeline for a Single Activity
// Shows the complete journey: Plan Import → Field Reports → AI Linking
//   → Confidence Decision → Human Review → Audit Ledger → Write-back
// ============================================================

import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Calendar, CheckCircle2, AlertTriangle,
  FileText, Brain, Shield, Layers, Network, Upload, Clock,
  Hash, ExternalLink, ChevronRight, ChevronDown, Eye, Sparkles,
  User, Cpu, Download, GitCommit
} from 'lucide-react';
import { DEMO_TRACE_EVENTS, DEMO_ACTIVITIES, DEMO_CLAIMS, DEMO_GANTT_ROWS } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { TraceEvent } from '../types';

// Simulated activity detail used when viewing trace
const DEMO_ACTIVITY_DETAIL = {
  code: 'ACT-EP-1042',
  name: 'Erect Line 24-P-1017',
  discipline: 'Piping' as const,
  area: 'Bay 3' as const,
  wbs: 'DEPC.02.PIP.FAB',
  plannedStart: '2026-09-25',
  plannedFinish: '2026-09-30',
  actualStart: '2026-09-26',
  actualFinish: undefined as string | undefined,
  percentComplete: 75,
  isCritical: true,
  totalFloat: 0,
  status: 'IN_PROGRESS' as const,
  scopeObjects: [
    { id: 'obj-027', tag: 'P-1017', name: 'Spool Pipe P-1017', confidence: 0.96 },
    { id: 'obj-028', tag: 'P-1017-FL1', name: 'Flange FL-1017A/B', confidence: 0.91 },
  ],
  linkedClaims: [
    { id: 'clm-001', code: 'C-00931', eventType: 'COMPLETED', confidence: 0.94, reporter: 'Rajesh Kumar', date: '2026-09-28' },
    { id: 'clm-002', code: 'C-00932', eventType: 'IN_PROGRESS', confidence: 0.88, reporter: 'Mohan Singh', date: '2026-09-27' },
  ],
  predecessors: [
    { code: 'ACT-EP-1041', name: 'Fabricate Spool P-1017', status: 'COMPLETED', percent: 100 },
    { code: 'ACT-EP-1040', name: 'Material Receipt P-1017', status: 'COMPLETED', percent: 100 },
  ],
  successors: [
    { code: 'ACT-EP-1043', name: 'Hydro Test Line 24', status: 'NOT_STARTED', percent: 0 },
  ],
  derivation: {
    rule: 'R-START → R-PROGRESS → R-FINISH-ALL',
    modelVersion: 'v2.4.1-sih-demo',
    bayesianPosterior: 0.94,
    lane: 'AUTO_COMMIT' as const,
    integrityChecks: { passed: 20, total: 20 },
  },
  auditHashes: {
    latestBlock: '8f7a93ce14d69f0b3e5a7b8e1248c89b',
    previousBlock: '003d12b77a984f1e9a77c412e88a7650',
    merkleRoot: '55c829e90f3ab8c4c0d10b5118f92a4e',
  },
};

const TRACE_TYPE_CONFIG: Record<TraceEvent['type'], {
  icon: typeof Calendar;
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
}> = {
  PLAN: {
    icon: Calendar,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/20',
    borderColor: 'border-slate-500/40',
    label: 'Plan Import',
  },
  FIELD: {
    icon: User,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/40',
    label: 'Field Report',
  },
  SYSTEM: {
    icon: Cpu,
    color: 'text-accent-400',
    bgColor: 'bg-accent-500/20',
    borderColor: 'border-accent-500/40',
    label: 'AI / Engine',
  },
  REVIEW: {
    icon: Eye,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/20',
    borderColor: 'border-violet-500/40',
    label: 'Human Review',
  },
  EXPORT: {
    icon: Download,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/40',
    label: 'Write-back',
  },
};

// Available key activities for instant trace inspection
const SELECTABLE_ACTIVITIES = [
  { code: 'ACT-EP-1042', name: 'Erect Line 24-P-1017', discipline: 'Piping' as const, status: 'IN_PROGRESS' as const, critical: true },
  { code: 'ACT-EP-1041', name: 'Fabricate Spool P-1017', discipline: 'Piping' as const, status: 'COMPLETED' as const, critical: true },
  { code: 'ACT-EP-1040', name: 'Material Receipt P-1017', discipline: 'Piping' as const, status: 'COMPLETED' as const, critical: false },
  { code: 'ACT-PT-1047', name: 'Pressure Test Line 24', discipline: 'Piping' as const, status: 'NOT_STARTED' as const, critical: true },
  { code: 'ACT-CIV-003', name: 'Foundation F-01 Concrete Pour', discipline: 'Civil' as const, status: 'COMPLETED' as const, critical: true },
  { code: 'ACT-ELE-025', name: 'Cable Tray Installation Bay 2', discipline: 'Electrical' as const, status: 'IN_PROGRESS' as const, critical: false },
];

export function ActivityTracePage() {
  const navigate = useNavigate();
  const { activityCode } = useParams<{ activityCode?: string }>();
  const { addToast } = useAppStore();
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [showScopeObjects, setShowScopeObjects] = useState(true);
  const [showPredecessors, setShowPredecessors] = useState(true);

  const currentCode = activityCode || 'ACT-EP-1042';
  const matchedPreset = SELECTABLE_ACTIVITIES.find(a => a.code.toLowerCase() === currentCode.toLowerCase());

  // Dynamically resolve activity detail
  const act = {
    ...DEMO_ACTIVITY_DETAIL,
    code: matchedPreset?.code || currentCode.toUpperCase(),
    name: matchedPreset?.name || (currentCode === 'ACT-EP-1042' ? DEMO_ACTIVITY_DETAIL.name : `Activity ${currentCode.toUpperCase()}`),
    discipline: matchedPreset?.discipline || DEMO_ACTIVITY_DETAIL.discipline,
    status: matchedPreset?.status || DEMO_ACTIVITY_DETAIL.status,
    isCritical: matchedPreset ? matchedPreset.critical : DEMO_ACTIVITY_DETAIL.isCritical,
  };

  const traceEvents = DEMO_TRACE_EVENTS;

  const toggleEvent = (id: string) => {
    setExpandedEvent(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-navy-700 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                title="Go back"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Activity Trace &amp; Provenance Ledger</span>
            </div>

            {/* Quick Activity Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Trace Activity:</span>
              <select
                value={act.code}
                onChange={e => {
                  navigate(`/trace/${e.target.value}`);
                  addToast(`Loaded provenance trail for ${e.target.value}`, 'info');
                }}
                className="bg-navy-950/80 text-xs border border-white/20 rounded-xl px-3 py-1.5 text-accent-300 font-mono font-semibold focus:outline-none focus:border-accent-400"
              >
                {SELECTABLE_ACTIVITIES.map(a => (
                  <option key={a.code} value={a.code} className="bg-navy-900 text-white font-sans">
                    {a.code} — {a.name} ({a.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-bold text-accent-300">{act.code}</span>
                {act.isCritical && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    CRITICAL PATH
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  act.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  act.status === 'IN_PROGRESS' ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30' :
                  'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                }`}>
                  {act.status.replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-xl font-bold text-white mt-1">{act.name}</h1>
              <p className="text-xs text-slate-300 mt-0.5">
                {act.discipline} · {act.area} · WBS: {act.wbs}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/gantt')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <span>View on Gantt</span>
                <ExternalLink size={12} />
              </button>
              <button
                type="button"
                onClick={() => navigate('/pipeline')}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-accent-600 hover:bg-accent-500 text-white shadow-lg shadow-accent-600/30 flex items-center gap-1.5 transition-all"
              >
                <Sparkles size={12} />
                <span>Pipeline Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
          <div className="text-[10px] text-slate-400 font-medium">Planned Start</div>
          <div className="text-sm font-bold font-mono text-white mt-0.5">{act.plannedStart}</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
          <div className="text-[10px] text-slate-400 font-medium">Planned Finish</div>
          <div className="text-sm font-bold font-mono text-white mt-0.5">{act.plannedFinish}</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-accent-500/30">
          <div className="text-[10px] text-slate-400 font-medium">Actual Start (Derived)</div>
          <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{act.actualStart || '—'}</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
          <div className="text-[10px] text-slate-400 font-medium">Actual Finish</div>
          <div className="text-sm font-bold font-mono text-slate-400 mt-0.5">{act.actualFinish || 'In Progress'}</div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
          <div className="text-[10px] text-slate-400 font-medium">Physical Complete</div>
          <div className="text-sm font-bold text-white mt-0.5">{act.percentComplete}%</div>
          <div className="w-full h-1.5 rounded-full bg-navy-800 mt-1.5">
            <div className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400" style={{ width: `${act.percentComplete}%` }} />
          </div>
        </div>
        <div className="p-3 rounded-xl bg-navy-900 border border-navy-800">
          <div className="text-[10px] text-slate-400 font-medium">Bayesian Confidence</div>
          <div className="text-sm font-bold font-mono text-accent-300 mt-0.5">{(act.derivation.bayesianPosterior * 100).toFixed(1)}%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5 font-semibold">{act.derivation.lane.replace('_', ' ')}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timeline — Left 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-navy-900 border border-navy-700 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-4">
              <div className="flex items-center gap-2">
                <GitCommit size={16} className="text-accent-400" />
                <h2 className="text-sm font-bold text-white">Provenance Timeline</h2>
                <span className="text-[10px] text-slate-400 font-mono">({traceEvents.length} events)</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                {(['PLAN', 'FIELD', 'SYSTEM', 'REVIEW', 'EXPORT'] as const).map(type => {
                  const config = TRACE_TYPE_CONFIG[type];
                  return (
                    <span key={type} className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${config.borderColor} ${config.bgColor} ${config.color}`}>
                      <config.icon size={10} />
                      {config.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500/40 via-navy-700 to-emerald-500/40" />

              <div className="space-y-1">
                {traceEvents.map((evt, idx) => {
                  const config = TRACE_TYPE_CONFIG[evt.type];
                  const isExpanded = expandedEvent === evt.id;
                  const isLast = idx === traceEvents.length - 1;

                  return (
                    <div key={evt.id} className="relative group">
                      <button
                        type="button"
                        onClick={() => toggleEvent(evt.id)}
                        className={`w-full text-left pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                          isExpanded
                            ? `${config.bgColor} ${config.borderColor} shadow-lg`
                            : 'border-transparent hover:bg-navy-800/50'
                        }`}
                      >
                        {/* Timeline dot */}
                        <div className={`absolute left-2.5 top-4 w-[14px] h-[14px] rounded-full border-2 ${config.borderColor} ${config.bgColor} flex items-center justify-center z-10`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${config.color.replace('text-', 'bg-')}`} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold ${config.color}`}>{evt.title}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${config.bgColor} ${config.color} border ${config.borderColor}`}>
                                {config.label.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{evt.description}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                            <span className="font-mono text-[10px] text-slate-500">{evt.date} {evt.time}</span>
                            {isExpanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-500" />}
                          </div>
                        </div>
                      </button>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className={`ml-12 mr-4 mt-1 mb-2 p-4 rounded-xl border ${config.borderColor} bg-navy-950/80 space-y-2 text-xs`}>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <span className="text-slate-400">Event Type:</span>
                              <span className={`ml-1.5 font-semibold ${config.color}`}>{config.label}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Timestamp:</span>
                              <span className="ml-1.5 font-mono text-white">{evt.date} {evt.time} IST</span>
                            </div>
                            {evt.entityRef && (
                              <div>
                                <span className="text-slate-400">Entity Reference:</span>
                                <span className="ml-1.5 font-mono text-accent-400">{evt.entityRef}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-slate-400">Sequence Index:</span>
                              <span className="ml-1.5 font-mono text-white">#{idx + 1} of {traceEvents.length}</span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-navy-800">
                            <span className="text-slate-400">Full Description:</span>
                            <p className="mt-1 text-slate-200 leading-relaxed">{evt.description}</p>
                          </div>
                          {evt.type === 'SYSTEM' && (
                            <div className="p-2 rounded-lg bg-navy-900 border border-navy-800 font-mono text-[10px] text-accent-300">
                              Engine: {act.derivation.modelVersion} · Rule: {act.derivation.rule.split('→')[0]?.trim()}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar — Context Panels */}
        <div className="space-y-4">
          {/* Scope Objects Panel */}
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800">
            <button
              type="button"
              onClick={() => setShowScopeObjects(!showScopeObjects)}
              className="w-full flex items-center justify-between text-xs font-bold text-white"
            >
              <div className="flex items-center gap-2">
                <Network size={14} className="text-accent-400" />
                Linked Scope Objects ({act.scopeObjects.length})
              </div>
              {showScopeObjects ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {showScopeObjects && (
              <div className="mt-3 space-y-2">
                {act.scopeObjects.map(obj => (
                  <div key={obj.id} className="p-3 rounded-lg bg-navy-950 border border-navy-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-accent-300">{obj.tag}</span>
                      <span className="font-mono text-emerald-400 font-bold">{(obj.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="text-slate-400 mt-0.5">{obj.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{obj.id}</div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => navigate('/scope-graph')}
                  className="w-full text-center py-2 text-[11px] text-accent-400 hover:text-accent-300 font-semibold transition-colors"
                >
                  View Full Scope Graph →
                </button>
              </div>
            )}
          </div>

          {/* Linked Claims */}
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-3">
              <FileText size={14} className="text-amber-400" />
              Source Claims ({act.linkedClaims.length})
            </div>
            <div className="space-y-2">
              {act.linkedClaims.map(c => (
                <div key={c.id} className="p-3 rounded-lg bg-navy-950 border border-navy-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-400">{c.code}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      c.eventType === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-accent-500/20 text-accent-400'
                    }`}>
                      {c.eventType}
                    </span>
                  </div>
                  <div className="text-slate-400 mt-1">By {c.reporter} · {c.date}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Confidence: {(c.confidence * 100).toFixed(0)}%</div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => navigate('/claims')}
                className="w-full text-center py-2 text-[11px] text-accent-400 hover:text-accent-300 font-semibold transition-colors"
              >
                View All Claims →
              </button>
            </div>
          </div>

          {/* Predecessors / Successors */}
          <div className="p-4 rounded-xl bg-navy-900 border border-navy-800">
            <button
              type="button"
              onClick={() => setShowPredecessors(!showPredecessors)}
              className="w-full flex items-center justify-between text-xs font-bold text-white"
            >
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-violet-400" />
                Network Dependencies
              </div>
              {showPredecessors ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {showPredecessors && (
              <div className="mt-3 space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Predecessors</div>
                  {act.predecessors.map(p => (
                    <div key={p.code} className="p-2.5 rounded-lg bg-navy-950 border border-navy-800 text-xs mb-1.5 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-200">{p.code}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{p.name}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-emerald-400">{p.percent}%</span>
                        {p.status === 'COMPLETED' && <CheckCircle2 size={12} className="text-emerald-400" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Successors</div>
                  {act.successors.map(s => (
                    <div key={s.code} className="p-2.5 rounded-lg bg-navy-950 border border-navy-800 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-200">{s.code}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{s.name}</div>
                      </div>
                      <span className="text-[10px] text-slate-500">{s.status.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Derivation Engine Details */}
          <div className="p-4 rounded-xl bg-navy-900 border border-accent-500/30">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-3">
              <Brain size={14} className="text-accent-400" />
              Derivation Engine
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Model Version</span>
                <span className="font-mono text-white">{act.derivation.modelVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Derivation Rule</span>
                <span className="font-mono text-accent-300">{act.derivation.rule}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bayesian Posterior</span>
                <span className="font-mono font-bold text-emerald-400">{(act.derivation.bayesianPosterior * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Confidence Lane</span>
                <span className="font-mono font-bold text-emerald-400">{act.derivation.lane.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Integrity Checks</span>
                <span className="font-mono text-white">{act.derivation.integrityChecks.passed} / {act.derivation.integrityChecks.total} PASSED</span>
              </div>
            </div>
          </div>

          {/* Audit Hash Chain */}
          <div className="p-4 rounded-xl bg-navy-900 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-3">
              <Shield size={14} className="text-emerald-400" />
              SHA-256 Audit Hashes
            </div>
            <div className="space-y-2 text-[10px] font-mono">
              <div>
                <span className="text-slate-400">Latest Block:</span>
                <div className="text-emerald-400 mt-0.5 break-all">{act.auditHashes.latestBlock}</div>
              </div>
              <div>
                <span className="text-slate-400">Previous Block:</span>
                <div className="text-slate-300 mt-0.5 break-all">{act.auditHashes.previousBlock}</div>
              </div>
              <div>
                <span className="text-slate-400">Merkle Root:</span>
                <div className="text-accent-300 mt-0.5 break-all">{act.auditHashes.merkleRoot}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/audit')}
              className="w-full mt-3 text-center py-2 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold border-t border-navy-800 transition-colors"
            >
              View Full Audit Ledger →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
