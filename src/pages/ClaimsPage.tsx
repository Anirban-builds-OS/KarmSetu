// ============================================================
// Claims Page — Extracted Claims Explorer & Modality Classifier
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Search, Filter, CheckCircle2, AlertCircle,
  Tag, Calendar, Layers, ShieldCheck, ArrowRight
} from 'lucide-react';
import { DEMO_CLAIMS } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { Modality, EventType } from '../types';

export function ClaimsPage() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedModality, setSelectedModality] = useState<string>('ALL');
  const [selectedClaim, setSelectedClaim] = useState<typeof DEMO_CLAIMS[0] | null>(
    DEMO_CLAIMS[0] || null
  );

  const filteredClaims = DEMO_CLAIMS.filter(c => {
    if (selectedModality !== 'ALL' && c.modality !== selectedModality) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.rawSource.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.objectRefs.some(t => t.toLowerCase().includes(q))
      );
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
              <FileText size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Claims Extraction</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Field Claims &amp; Linguistic Modality</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            NLP extracts claims with linguistic modality (PAST_DONE vs ONGOING vs HEDGED) to eliminate false completions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/70 border border-navy-700 text-xs text-slate-300 font-mono">
            {DEMO_CLAIMS.length} Extracted Claims
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search claim text, ID, or scope object tag..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-900 border border-navy-700 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-accent-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-xl border border-navy-800">
          {['ALL', 'PAST_DONE', 'ONGOING', 'PLANNED', 'NEGATED'].map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedModality(m)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                selectedModality === m
                  ? 'bg-accent-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Claims Table */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-800 text-slate-400 font-medium">
                <th className="py-2.5 px-3">Claim ID / Text</th>
                <th className="py-2.5 px-2">Modality</th>
                <th className="py-2.5 px-2">Event Type</th>
                <th className="py-2.5 px-2">Event Date</th>
                <th className="py-2.5 px-2">Resolved Tag</th>
                <th className="py-2.5 px-2">Confidence</th>
                <th className="py-2.5 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60">
              {filteredClaims.map(claim => (
                <tr key={claim.id} className="hover:bg-navy-800/40 transition-colors">
                  <td className="py-3 px-3 max-w-md">
                    <div className="font-mono text-[11px] font-bold text-accent-400">{claim.id}</div>
                    <div className="text-slate-200 mt-0.5 italic font-serif">&quot;{claim.rawSource}&quot;</div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      claim.modality === 'PAST_DONE'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : claim.modality === 'ONGOING'
                        ? 'bg-blue-500/20 text-blue-300'
                        : claim.modality === 'NEGATED'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {claim.modality}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="font-medium text-slate-300">{claim.eventType}</span>
                  </td>
                  <td className="py-3 px-2 font-mono text-[11px] text-slate-400">
                    {claim.eventTime}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex flex-wrap gap-1">
                      {claim.objectRefs.map((tag, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-accent-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="font-mono font-bold text-emerald-400">
                      {Math.round(claim.extractorConfidence * 100)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        addToast(`Navigating to full audit trail for Activity ACT-EP-1042`, 'info');
                        navigate('/trace/ACT-EP-1042');
                      }}
                      className="text-xs text-accent-400 hover:text-accent-300 font-medium inline-flex items-center gap-1 hover:underline"
                      title="Inspect complete provenance trace for this claim"
                    >
                      Audit Trace <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
