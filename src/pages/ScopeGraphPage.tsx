// ============================================================
// Scope Graph — Physical Scope Objects & Alias Resolution
// ============================================================

import { useState } from 'react';
import {
  Network, Search, Filter, Layers, CheckCircle2,
  Tag, ArrowRight, Database, Boxes, Sparkles
} from 'lucide-react';
import { DEMO_SCOPE_OBJECTS } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { ScopeObject } from '../types';

export function ScopeGraphPage() {
  const { addToast } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');
  const [selectedObject, setSelectedObject] = useState<ScopeObject | null>(
    DEMO_SCOPE_OBJECTS[0] || null
  );

  const filteredObjects = DEMO_SCOPE_OBJECTS.filter(obj => {
    if (selectedDiscipline !== 'ALL' && obj.discipline !== selectedDiscipline) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = obj.name.toLowerCase().includes(q);
      const matchCanonical = obj.canonicalId.toLowerCase().includes(q);
      const matchAlias = obj.aliases.some(a => a.toLowerCase().includes(q));
      return matchName || matchCanonical || matchAlias;
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
              <Network size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Physical Twin</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Scope Graph &amp; Alias Resolution</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Decoupling physical assets from schedule activities. Handles OCR spelling mistakes, contractor shorthand, and tag normalization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/70 border border-navy-700 text-xs text-slate-300 font-mono">
            {DEMO_SCOPE_OBJECTS.length} Registered Scope Objects
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search canonical tag (P-1017), alias (Spool 1017), or name..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-900 border border-navy-700 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-accent-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-xl border border-navy-800">
          {['ALL', 'Civil', 'Piping', 'Electrical', 'Instrumentation'].map(disc => (
            <button
              key={disc}
              type="button"
              onClick={() => setSelectedDiscipline(disc)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                selectedDiscipline === disc
                  ? 'bg-accent-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {disc}
            </button>
          ))}
        </div>
      </div>

      {/* Split Grid: Objects List + Object Detail & Alias Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Objects List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
          {filteredObjects.map(obj => {
            const isSelected = selectedObject?.id === obj.id;
            return (
              <div
                key={obj.id}
                onClick={() => setSelectedObject(obj)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-navy-800 border-accent-500 shadow-md ring-1 ring-accent-500/30'
                    : 'bg-navy-900/80 border-navy-800 hover:border-navy-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent-400">{obj.canonicalId}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                    {obj.discipline} • {obj.area}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white mt-1">{obj.name}</div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 truncate">
                  <span>Aliases:</span>
                  <span className="text-slate-300 font-mono">{obj.aliases.join(', ')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 cols): Selected Object Deep Dive */}
        {selectedObject && (
          <div className="lg:col-span-7 p-6 rounded-2xl bg-navy-900 border border-navy-700 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Canonical Asset Profile</span>
                <h3 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                  <Boxes size={20} className="text-accent-400" />
                  {selectedObject.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent-500/10 text-accent-300 border border-accent-500/20 font-mono">
                {selectedObject.canonicalId}
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                <span className="text-[10px] text-slate-400 uppercase">Discipline</span>
                <div className="text-xs font-semibold text-white mt-0.5">{selectedObject.discipline}</div>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                <span className="text-[10px] text-slate-400 uppercase">Area</span>
                <div className="text-xs font-semibold text-white mt-0.5">{selectedObject.area}</div>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                <span className="text-[10px] text-slate-400 uppercase">Quantity</span>
                <div className="text-xs font-semibold text-white mt-0.5">
                  {selectedObject.quantity || 1} {selectedObject.unit || 'EA'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800">
                <span className="text-[10px] text-slate-400 uppercase">Physical Status</span>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">Erected / Placed</div>
              </div>
            </div>

            {/* Ingested Alias Normalization Engine */}
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Tag size={14} className="text-accent-400" />
                  Fuzzy Alias &amp; Shorthand Dictionary
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Auto-learned</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Any occurrences of these phrases in daily reports, voice chats, or OCR scans resolve immediately to this object:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedObject.aliases.map((alias, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-navy-900 border border-navy-700 text-accent-300"
                  >
                    &quot;{alias}&quot;
                  </span>
                ))}
              </div>
            </div>

            {/* Associated Activities */}
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers size={14} className="text-blue-400" />
                Linked Schedule Activities ({selectedObject.activityIds.length})
              </span>

              <div className="space-y-2">
                {selectedObject.activityIds.map((actId, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between text-xs"
                  >
                    <span className="font-mono text-accent-400 font-bold">{actId}</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                      <CheckCircle2 size={13} /> Linked
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
