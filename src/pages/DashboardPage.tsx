// ============================================================
// Dashboard Page — Executive & Operational Overview
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, CheckCircle, AlertTriangle, Clock, ArrowRight,
  ShieldCheck, Brain, Zap, Layers, BarChart2,
  Calendar, Eye
} from 'lucide-react';
import {
  DEMO_KPIS, DEMO_ACTIVITIES, DEMO_INTEGRITY_FLAGS,
  DEMO_CLAIMS, DEMO_PROJECT, DEMO_MEMORY
} from '../mocks/data';

export function DashboardPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');

  const filteredActivities = selectedDiscipline === 'ALL'
    ? DEMO_ACTIVITIES
    : DEMO_ACTIVITIES.filter(a => a.discipline === selectedDiscipline);

  const completedCount = filteredActivities.filter(a => a.status === 'COMPLETED').length;
  const inProgressCount = filteredActivities.filter(a => a.status === 'IN_PROGRESS').length;
  const criticalCount = filteredActivities.filter(a => a.isCritical).length;
  const totalCount = filteredActivities.length;
  const overallProgress = Math.round((completedCount + (inProgressCount * 0.5)) / (totalCount || 1) * 100);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 border border-navy-700/80 p-6 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent-500/20 text-accent-300 border border-accent-500/30">
                SIH 2026 • SIH26122
              </span>
              <span className="text-xs text-slate-400 font-mono">Data Date: {DEMO_PROJECT.dataDate}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              KARMSETU Progress Intelligence
            </h1>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              Bridging messy, multi-source unstructured site reporting directly into structured, defensible Primavera P6 schedule actuals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/todays-board"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-medium text-xs shadow-lg shadow-accent-600/20 transition-all hover:scale-[1.02]"
            >
              <Calendar size={14} />
              Open Today&apos;s Board
            </Link>
            <Link
              to="/time-agent"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-600 text-slate-200 font-medium text-xs transition-all hover:scale-[1.02]"
            >
              <Brain size={14} className="text-accent-400" />
              Chat Time Agent
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Activities</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Layers size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{DEMO_KPIS.totalActivities}</span>
            <span className="text-xs text-slate-400 font-mono">({DEMO_KPIS.scopeObjects} Scope Objs)</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp size={14} />
            <span>{completedCount} Completed • {inProgressCount} Active</span>
          </div>
        </div>

        {/* KPI 2: Today's Claims */}
        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Claims Ingested Today</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{DEMO_KPIS.claimsToday}</span>
            <span className="text-xs text-emerald-400 font-medium">100% Resolved</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Auto-committed:</span>
            <span className="text-emerald-400 font-semibold">{DEMO_KPIS.autoCommitted} (61%)</span>
          </div>
        </div>

        {/* KPI 3: Needs Review */}
        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Planner Review Queue</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">{DEMO_KPIS.needsReview}</span>
            <span className="text-xs text-slate-400">require confirmation</span>
          </div>
          <div className="mt-3">
            <Link
              to="/review"
              className="text-xs text-accent-400 hover:text-accent-300 font-medium flex items-center gap-1"
            >
              Go to review queue <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* KPI 4: Schedule Integrity Alerts */}
        <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Integrity Flags</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-400">{DEMO_KPIS.integrityFlags}</span>
            <span className="text-xs text-slate-400">audit exceptions</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 truncate">
            {DEMO_INTEGRITY_FLAGS[0]?.description || 'Planned = Actual detected'}
          </div>
        </div>
      </div>

      {/* The Core KarmSetu Pipeline Visualizer */}
      <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-700/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} className="text-accent-400" />
              Live Derivation Pipeline (End-to-End Bridge)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              How unstructured site signals transform into mathematically sound, audit-trailed P6 dates.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-1 rounded bg-accent-500/10 text-accent-300 border border-accent-500/20">
            Pipeline Active • 0 Latency
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { step: '1. FIELD', label: 'Field Signal', desc: 'DPR / Voice / Chat', badge: '100% Ingested', color: 'border-blue-500/40 bg-blue-950/40 text-blue-300' },
            { step: '2. EXTRACT', label: 'Observation', desc: 'Verb, date, target', badge: 'GPT-4o / RoBERTa', color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' },
            { step: '3. CLAIM', label: 'Modality Claim', desc: 'PAST_DONE / ONGOING', badge: '98.4% Confidence', color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300' },
            { step: '4. OBJECT', label: 'Scope Object', desc: 'Spool / Pile / Tray', badge: 'Alias Match', color: 'border-teal-500/40 bg-teal-950/40 text-teal-300' },
            { step: '5. LINK', label: 'Activity Link', desc: 'Hybrid Scoring (0.94)', badge: 'Scope Graph', color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' },
            { step: '6. DERIVE', label: 'Actual Dates', desc: 'R-START / R-FINISH', badge: 'Rules Engine', color: 'border-amber-500/40 bg-amber-950/40 text-amber-300' },
            { step: '7. LEDGER', label: 'Audit Trail', desc: 'SHA-256 Hash Chain', badge: 'Tamper Proof', color: 'border-purple-500/40 bg-purple-950/40 text-purple-300' },
            { step: '8. WRITE', label: 'P6 Write-back', desc: 'XER / CSV / API', badge: 'Dry-run Verified', color: 'border-rose-500/40 bg-rose-950/40 text-rose-300' },
          ].map((item, idx) => (
            <div key={idx} className={`p-3 rounded-xl border ${item.color} flex flex-col justify-between`}>
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-75">{item.step}</div>
                <div className="text-xs font-semibold text-white mt-1">{item.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">{item.desc}</div>
              </div>
              <div className="mt-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-center">
                {item.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Confidence Lanes & Activities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Confidence Lane Breakdown Card */}
          <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Tri-Lane Confidence Routing
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated routing prevents hallucinated actuals while cutting planner manual work by 70%.
                </p>
              </div>
              <Link to="/review" className="text-xs text-accent-400 hover:text-accent-300 flex items-center gap-1">
                View Queue <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              {/* Auto-commit */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400">Auto-Commit</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold">
                    &ge; 0.90 Score
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mt-2">61%</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  17 items automatically derived and ledgered without human bottleneck.
                </p>
              </div>

              {/* One-Tap Review */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400">One-Tap Affirm</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 font-bold">
                    0.70 &ndash; 0.89
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mt-2">24%</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Single click confirmation for supervisors with explainable feature rationale.
                </p>
              </div>

              {/* Planner Review */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-400">Planner Review</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300 font-bold">
                    &lt; 0.70 Score
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mt-2">15%</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  6 items held in triage for multi-candidate resolution or conflicting reports.
                </p>
              </div>
            </div>
          </div>

          {/* Activities Table by Discipline */}
          <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-navy-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart2 size={16} className="text-accent-400" />
                  Key Activities Execution Status
                </h3>
                <span className="text-xs text-slate-400">
                  Showing {filteredActivities.length} activities ({overallProgress}% complete)
                </span>
              </div>

              {/* Discipline Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-navy-950 p-1 rounded-xl border border-navy-800">
                {['ALL', 'Civil', 'Piping', 'Electrical', 'Instrumentation', 'HSE'].map(disc => (
                  <button
                    key={disc}
                    type="button"
                    onClick={() => setSelectedDiscipline(disc)}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                      selectedDiscipline === disc
                        ? 'bg-accent-600 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800'
                    }`}
                  >
                    {disc}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-navy-800 text-slate-400 font-medium">
                    <th className="py-2.5 px-3">Code / Name</th>
                    <th className="py-2.5 px-2">Discipline & Area</th>
                    <th className="py-2.5 px-2">Planned Dates</th>
                    <th className="py-2.5 px-2">Derived Actuals</th>
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800/60">
                  {filteredActivities.slice(0, 7).map(act => (
                    <tr key={act.id} className="hover:bg-navy-800/40 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-mono text-[11px] text-accent-400 font-semibold">{act.code}</div>
                        <div className="text-slate-200 font-medium truncate max-w-xs">{act.name}</div>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                          {act.discipline} • {act.area}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-mono text-[11px] text-slate-400">
                        {act.plannedStart} &rarr; {act.plannedFinish}
                      </td>
                      <td className="py-2.5 px-2 font-mono text-[11px]">
                        {act.actualStart ? (
                          <span className="text-emerald-400">
                            {act.actualStart} {act.actualFinish ? `&rarr; ${act.actualFinish}` : '(ongoing)'}
                          </span>
                        ) : (
                          <span className="text-slate-500">&mdash;</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          act.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : act.status === 'IN_PROGRESS'
                            ? 'bg-blue-500/20 text-blue-300'
                            : act.status === 'UNREPORTED'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {act.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <Link
                          to={`/claims?activity=${act.id}`}
                          className="p-1 rounded hover:bg-navy-700 text-slate-400 hover:text-white inline-flex items-center"
                          title="View linked claims and audit trail"
                        >
                          <Eye size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400">
              <span>Showing 7 of {filteredActivities.length} items</span>
              <Link to="/gantt" className="text-accent-400 hover:text-accent-300 font-medium flex items-center gap-1">
                View Full Gantt Schedule &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Integrity Alerts & Execution Memory */}
        <div className="space-y-6">
          {/* Schedule Integrity Guard */}
          <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-400" />
                Integrity Watchdog
              </h3>
              <Link to="/data-quality" className="text-xs text-accent-400 hover:text-accent-300">
                All Flags ({DEMO_INTEGRITY_FLAGS.length})
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {DEMO_INTEGRITY_FLAGS.map(flag => (
                <div key={flag.id} className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-rose-400">
                    <span>{flag.type.replace(/_/g, ' ')}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Flagged</span>
                  </div>
                  <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">
                    {flag.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-navy-800">
                    <span className="font-mono text-accent-400">{flag.activityId}</span>
                    <span className="text-amber-400 font-medium">Auto-quarantined</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Memory Preview */}
          <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Brain size={16} className="text-purple-400" />
                Execution Memory Insights
              </h3>
              <Link to="/memory" className="text-xs text-accent-400 hover:text-accent-300">
                Explore &rarr;
              </Link>
            </div>

            <div className="mt-3 space-y-3">
              {DEMO_MEMORY.slice(0, 3).map((mem, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-200">{mem.discipline} • {mem.workType}</span>
                    <span className="font-mono text-[11px] text-emerald-400 font-bold">{mem.median}d median</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                    <span>IQR: {mem.p25}d &ndash; {mem.p75}d</span>
                    <span>&bull;</span>
                    <span>Sample: {mem.sampleSize} spools</span>
                  </div>
                  {mem.delayCauses.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-500">Top Delays:</span>
                      {mem.delayCauses.map((dc, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 text-[10px]">
                          {dc.cause} ({dc.count})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Claims Stream */}
          <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers size={16} className="text-blue-400" />
                Recent Field Claims
              </h3>
              <Link to="/claims" className="text-xs text-accent-400 hover:text-accent-300">
                All Claims &rarr;
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {DEMO_CLAIMS.slice(0, 4).map(claim => (
                <div key={claim.id} className="p-2.5 rounded-lg bg-navy-950/60 border border-navy-800/80 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-400">{claim.id}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-accent-500/10 text-accent-300">
                      {claim.modality}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-1 line-clamp-1 italic">
                    &quot;{claim.rawSource}&quot;
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span>Source: {claim.sourceDocumentId}</span>
                    <span className="text-emerald-400 font-semibold">{Math.round(claim.extractorConfidence * 100)}% Match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
