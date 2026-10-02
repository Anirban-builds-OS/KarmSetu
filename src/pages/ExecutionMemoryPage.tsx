// ============================================================
// Execution Memory — Bayesian Duration Intelligence & Benchmarks
// ============================================================

import { useState } from 'react';
import {
  Brain, BarChart2, TrendingUp, AlertTriangle,
  Clock, ShieldCheck, Sparkles, Filter, CheckCircle2
} from 'lucide-react';
import { DEMO_MEMORY, DEMO_BENCHMARK } from '../mocks/data';
import { useAppStore } from '../store/appStore';

export function ExecutionMemoryPage() {
  const { addToast } = useAppStore();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');

  const filteredStats = selectedDiscipline === 'ALL'
    ? DEMO_MEMORY
    : DEMO_MEMORY.filter(m => m.discipline === selectedDiscipline);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <Brain size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400">Institutional Learning</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Execution Memory &amp; Duration Priors</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Statistical learning over site execution history. Informs schedule priors, flags unrealistic durations, and categorizes recurring bottlenecks.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 bg-navy-950 p-1 rounded-xl border border-navy-800">
          {['ALL', 'Piping', 'Civil', 'Electrical', 'Instrumentation'].map(disc => (
            <button
              key={disc}
              type="button"
              onClick={() => setSelectedDiscipline(disc)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                selectedDiscipline === disc
                  ? 'bg-purple-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {disc}
            </button>
          ))}
        </div>
      </div>

      {/* AI Benchmark Metrics Row */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              SIH 2026 AI Extraction &amp; Linking Benchmark Metrics
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Evaluation Dataset: {DEMO_BENCHMARK.datasetLabel} (n={DEMO_BENCHMARK.extraction.sampleSize})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Extraction F1</span>
            <div className="text-xl font-bold text-white mt-0.5">
              {Math.round(DEMO_BENCHMARK.extraction.f1 * 100)}%
            </div>
            <span className="text-[10px] text-emerald-400">P: {DEMO_BENCHMARK.extraction.precision} &bull; R: {DEMO_BENCHMARK.extraction.recall}</span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Top-1 Link Acc</span>
            <div className="text-xl font-bold text-accent-400 mt-0.5">
              {Math.round(DEMO_BENCHMARK.linking.top1Accuracy * 100)}%
            </div>
            <span className="text-[10px] text-slate-400">Top-3: {Math.round(DEMO_BENCHMARK.linking.top3Accuracy * 100)}%</span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Auto-Commit Precision</span>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">
              {Math.round(DEMO_BENCHMARK.decision.autoCommitPrecision * 100)}%
            </div>
            <span className="text-[10px] text-slate-400">Coverage: {Math.round(DEMO_BENCHMARK.decision.autoCommitCoverage * 100)}%</span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Date Derivation Error</span>
            <div className="text-xl font-bold text-white mt-0.5 font-mono">
              &plusmn;{DEMO_BENCHMARK.derivation.absoluteDateError}d
            </div>
            <span className="text-[10px] text-slate-400">Mean absolute err</span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase">ECE Calibration</span>
            <div className="text-xl font-bold text-cyan-400 mt-0.5 font-mono">
              {DEMO_BENCHMARK.linking.calibrationECE}
            </div>
            <span className="text-[10px] text-emerald-400">&lt; 0.05 well-calibrated</span>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 text-xs">
            <span className="text-[10px] text-slate-400 uppercase">Ask-Back Rate</span>
            <div className="text-xl font-bold text-amber-400 mt-0.5">
              {Math.round(DEMO_BENCHMARK.decision.askBackRate * 100)}%
            </div>
            <span className="text-[10px] text-slate-400">Supervisor triage</span>
          </div>
        </div>
      </div>

      {/* Historical Duration Priors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStats.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-navy-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{item.discipline}</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{item.workType}</h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                item.status === 'SUFFICIENT'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-amber-500/20 text-amber-300'
              }`}>
                {item.status} DATA
              </span>
            </div>

            {/* Distribution Stats */}
            <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-navy-950 border border-navy-800">
              <div>
                <span className="text-[10px] text-slate-400">P25 Fast</span>
                <div className="text-sm font-mono font-bold text-slate-300 mt-0.5">{item.p25}d</div>
              </div>
              <div className="border-x border-navy-800">
                <span className="text-[10px] text-accent-400 font-bold">Median</span>
                <div className="text-base font-mono font-extrabold text-accent-300 mt-0.5">{item.median}d</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">P75 Slow</span>
                <div className="text-sm font-mono font-bold text-slate-300 mt-0.5">{item.p75}d</div>
              </div>
            </div>

            {/* Delay Cause Distribution */}
            {item.delayCauses.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Reported Delay Causes (Root Bottlenecks):
                </span>
                <div className="space-y-1">
                  {item.delayCauses.map((dc, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">{dc.cause}</span>
                      <span className="font-mono text-amber-400 font-medium">{dc.count} incidents</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic py-2 text-center">
                No significant delay causes recorded.
              </div>
            )}

            <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>Sample: {item.sampleSize} objects</span>
              <span>Observed: {item.lastObserved}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
