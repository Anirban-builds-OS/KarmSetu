// ============================================================
// Plans Page — Baseline vs Working Schedule & WBS Hierarchy
// ============================================================

import { useState } from 'react';
import {
  FileBarChart, Layers, Calendar, ChevronRight,
  Upload, Search, Filter, CheckCircle2, ArrowRight
} from 'lucide-react';
import { DEMO_WBS, DEMO_ACTIVITIES, DEMO_PROJECT } from '../mocks/data';
import { useAppStore } from '../store/appStore';

export function PlansPage() {
  const { addToast } = useAppStore();
  const [selectedWbs, setSelectedWbs] = useState<string>('wbs-022');
  const [search, setSearch] = useState('');

  const filteredActivities = DEMO_ACTIVITIES.filter(a => {
    if (selectedWbs && a.wbsNodeId !== selectedWbs) return false;
    if (search.trim()) {
      return a.name.toLowerCase().includes(search.toLowerCase()) || a.code.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <FileBarChart size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Schedule Engine</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Schedule Plans &amp; WBS Hierarchy</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Browse P6 baseline and working schedules. Activities link dynamically to physical scope objects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => addToast('Simulating Primavera P6 XER import...', 'info')}
            className="px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-medium text-xs flex items-center gap-1.5 shadow transition-all"
          >
            <Upload size={14} />
            <span>Import New Schedule</span>
          </button>
        </div>
      </div>

      {/* Grid: WBS Tree on Left, Activities on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* WBS Tree */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-navy-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers size={14} className="text-accent-400" />
              Work Breakdown Structure
            </h3>
            <button
              type="button"
              onClick={() => setSelectedWbs('')}
              className="text-[11px] text-accent-400 hover:text-accent-300"
            >
              Show All
            </button>
          </div>

          <div className="space-y-1 mt-2">
            {DEMO_WBS.map(node => (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedWbs(node.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  selectedWbs === node.id
                    ? 'bg-accent-600 text-white font-semibold shadow'
                    : 'text-slate-300 hover:bg-navy-800'
                }`}
                style={{ paddingLeft: `${node.level * 12}px` }}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-mono text-[10px] opacity-75">{node.code}</span>
                  <span className="truncate">{node.name}</span>
                </div>
                {node.discipline && (
                  <span className="text-[10px] opacity-75 shrink-0 px-1.5 py-0.2 rounded bg-black/30">
                    {node.discipline}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Activities List */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-navy-800">
            <div>
              <h3 className="text-sm font-bold text-white">Activities in WBS Node</h3>
              <span className="text-xs text-slate-400">{filteredActivities.length} activities found</span>
            </div>

            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search activities..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-accent-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-navy-800 text-slate-400 font-medium">
                  <th className="py-2 px-3">Code / Name</th>
                  <th className="py-2 px-2">Planned Dates</th>
                  <th className="py-2 px-2">Actuals</th>
                  <th className="py-2 px-2">Float</th>
                  <th className="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60">
                {filteredActivities.slice(0, 10).map(act => (
                  <tr key={act.id} className="hover:bg-navy-800/40 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-mono text-[11px] font-bold text-accent-400">{act.code}</div>
                      <div className="text-slate-200 font-medium">{act.name}</div>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[11px] text-slate-400">
                      {act.plannedStart} &rarr; {act.plannedFinish}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[11px]">
                      {act.actualStart ? (
                        <span className="text-emerald-400">
                          {act.actualStart} {act.actualFinish ? `&rarr; ${act.actualFinish}` : '(active)'}
                        </span>
                      ) : (
                        <span className="text-slate-500">&mdash;</span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[11px]">
                      {act.isCritical ? (
                        <span className="text-rose-400 font-bold">0d (Crit)</span>
                      ) : (
                        <span className="text-slate-400">{act.totalFloat}d</span>
                      )}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        act.status === 'COMPLETED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : act.status === 'IN_PROGRESS'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {act.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
