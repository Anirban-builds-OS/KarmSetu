// ============================================================
// Gantt Page — Plan vs Actual Schedule & Critical Path View
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Filter, Calendar, ChevronRight,
  AlertTriangle, CheckCircle2, Clock, Layers, Eye, GitBranch
} from 'lucide-react';
import { DEMO_GANTT_ROWS, DEMO_PROJECT } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { Discipline, Area } from '../types';

export function GanttPage() {
  const { addToast } = useAppStore();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  const [selectedRow, setSelectedRow] = useState<typeof DEMO_GANTT_ROWS[0] | null>(null);

  const filteredRows = DEMO_GANTT_ROWS.filter(r => {
    if (showCriticalOnly && !r.isCritical) return false;
    if (selectedDiscipline !== 'ALL' && r.discipline !== selectedDiscipline) return false;
    return true;
  });

  // Calculate timeline grid from Sep 01 to Oct 15 (45 days)
  const startDate = new Date('2026-09-01').getTime();
  const totalDays = 45;
  const dayMs = 24 * 60 * 60 * 1000;

  const getOffsetPercent = (dateStr?: string) => {
    if (!dateStr) return 0;
    const diff = new Date(dateStr).getTime() - startDate;
    return Math.max(0, Math.min(100, (diff / (totalDays * dayMs)) * 100));
  };

  const getWidthPercent = (startStr?: string, finishStr?: string) => {
    if (!startStr || !finishStr) return 3;
    const diff = new Date(finishStr).getTime() - new Date(startStr).getTime();
    return Math.max(2, Math.min(100, (diff / (totalDays * dayMs)) * 100));
  };

  // Data date line percent
  const dataDatePercent = getOffsetPercent(DEMO_PROJECT.dataDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <BarChart3 size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Schedule Intelligence</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Plan vs Actual Gantt &amp; Critical Path</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Compare imported baseline bars against mathematically derived actual progress dates.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCriticalOnly(!showCriticalOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              showCriticalOnly
                ? 'bg-rose-600 text-white border-rose-500 shadow'
                : 'bg-navy-900 text-slate-300 border-navy-700 hover:bg-navy-800'
            }`}
          >
            Critical Path Only
          </button>

          <select
            value={selectedDiscipline}
            onChange={e => setSelectedDiscipline(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-navy-900 border border-navy-700 text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Disciplines</option>
            <option value="Civil">Civil</option>
            <option value="Piping">Piping</option>
            <option value="Electrical">Electrical</option>
            <option value="Instrumentation">Instrumentation</option>
            <option value="HSE">HSE</option>
          </select>
        </div>
      </div>

      {/* Legend & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-navy-900/80 border border-navy-800 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-600"></span>
            <span className="text-slate-300">Baseline Plan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            <span className="text-slate-300">Derived Actual (Complete)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-500"></span>
            <span className="text-slate-300">Actual (In Progress)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500"></span>
            <span className="text-slate-300">Critical Path Delay</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-accent-300">
          <Calendar size={13} />
          <span>Data Date Cutoff: {DEMO_PROJECT.dataDate}</span>
        </div>
      </div>

      {/* Gantt Table & Visual Grid */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-xl overflow-x-auto">
        <div className="min-w-[950px]">
          {/* Header row with timeline markers */}
          <div className="grid grid-cols-12 pb-3 border-b border-navy-800 text-[11px] font-mono text-slate-400">
            <div className="col-span-5 px-3 font-semibold uppercase">Activity Details</div>
            <div className="col-span-7 relative flex justify-between px-2">
              <span>01 Sep</span>
              <span>10 Sep</span>
              <span>20 Sep</span>
              <span className="text-accent-400 font-bold">29 Sep (Data Date)</span>
              <span>08 Oct</span>
              <span>15 Oct</span>
            </div>
          </div>

          {/* Activity rows */}
          <div className="divide-y divide-navy-800/60 mt-1">
            {filteredRows.map(row => {
              const baseLeft = getOffsetPercent(row.baselineStart);
              const baseWidth = getWidthPercent(row.baselineStart, row.baselineFinish);

              const actLeft = getOffsetPercent(row.actualStart || row.baselineStart);
              const actWidth = getWidthPercent(
                row.actualStart || row.baselineStart,
                row.actualFinish || (row.status === 'IN_PROGRESS' ? DEMO_PROJECT.dataDate : row.baselineFinish)
              );

              return (
                <div
                  key={row.activityId}
                  onClick={() => setSelectedRow(row)}
                  className="grid grid-cols-12 py-3 hover:bg-navy-800/40 rounded-lg cursor-pointer transition-colors items-center"
                >
                  {/* Left: Code, Name, Discipline */}
                  <div className="col-span-5 px-3 min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-accent-400">
                        {row.activityCode}
                      </span>
                      {row.isCritical && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          CRITICAL
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">
                        {row.discipline} • {row.area}
                      </span>
                      <Link
                        to={`/trace/${row.activityCode}`}
                        onClick={e => e.stopPropagation()}
                        title={`View Provenance Trace for ${row.activityCode}`}
                        className="ml-auto p-1 rounded hover:bg-accent-500/20 text-slate-400 hover:text-accent-300 transition-colors"
                      >
                        <GitBranch size={12} />
                      </Link>
                    </div>
                    <div className="text-xs font-medium text-slate-200 truncate mt-0.5">
                      {row.activityName}
                    </div>
                  </div>

                  {/* Right: Gantt Bars & Vertical Data Date Line */}
                  <div className="col-span-7 relative h-10 flex flex-col justify-center px-2">
                    {/* Vertical Data Date marker */}
                    <div
                      className="absolute top-0 bottom-0 w-px bg-accent-400/60 z-20 pointer-events-none"
                      style={{ left: `${dataDatePercent}%` }}
                    />

                    {/* Baseline Bar (Top) */}
                    <div
                      className="h-2 rounded bg-slate-700/80 mb-1 relative"
                      style={{
                        marginLeft: `${baseLeft}%`,
                        width: `${baseWidth}%`,
                      }}
                      title={`Baseline: ${row.baselineStart} to ${row.baselineFinish}`}
                    />

                    {/* Actual / Derived Bar (Bottom) */}
                    {row.actualStart ? (
                      <div
                        className={`h-2.5 rounded relative shadow-sm ${
                          row.status === 'COMPLETED'
                            ? 'bg-emerald-500'
                            : row.isCritical
                            ? 'bg-rose-500'
                            : 'bg-blue-500'
                        }`}
                        style={{
                          marginLeft: `${actLeft}%`,
                          width: `${actWidth}%`,
                        }}
                        title={`Derived Actual: ${row.actualStart} to ${row.actualFinish || 'In Progress'}`}
                      />
                    ) : (
                      <div
                        className="h-1 rounded bg-slate-800"
                        style={{
                          marginLeft: `${baseLeft}%`,
                          width: `${baseWidth}%`,
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Row Detail Drawer */}
      {selectedRow && (
        <div className="p-5 rounded-2xl bg-navy-900 border border-navy-700 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-navy-800">
            <div>
              <span className="font-mono text-xs font-bold text-accent-400">{selectedRow.activityCode}</span>
              <h3 className="text-sm font-bold text-white">{selectedRow.activityName}</h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedRow(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400">Baseline Plan:</span>
              <div className="font-mono text-white mt-0.5">{selectedRow.baselineStart} &rarr; {selectedRow.baselineFinish}</div>
            </div>
            <div>
              <span className="text-slate-400">Derived Actual:</span>
              <div className="font-mono text-emerald-400 mt-0.5">
                {selectedRow.actualStart ? `${selectedRow.actualStart} → ${selectedRow.actualFinish || 'Ongoing'}` : 'Not started'}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Execution Status:</span>
              <div className="font-bold text-white mt-0.5">{selectedRow.status} ({selectedRow.percentComplete}%)</div>
            </div>
            <div>
              <span className="text-slate-400">Schedule Float:</span>
              <div className="font-mono text-white mt-0.5">{selectedRow.isCritical ? '0 days (Critical)' : '16 days float'}</div>
            </div>
          </div>

          <div className="pt-3 border-t border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400">
              Inspect immutable audit trail, linked field reports, scope graph objects &amp; Bayesian confidence lane:
            </span>
            <Link
              to={`/trace/${selectedRow.activityCode}`}
              className="px-3.5 py-1.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-accent-600/20 shrink-0"
            >
              <GitBranch size={13} />
              <span>Trace Activity Provenance</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
