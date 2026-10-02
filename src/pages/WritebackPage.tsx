// ============================================================
// Writeback Page — P6 / XER / CSV Schedule Synchronization
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload, Download, FileSpreadsheet, CheckCircle2,
  AlertTriangle, ShieldCheck, Play, ArrowRight,
  Database, RefreshCw, FileText, GitBranch
} from 'lucide-react';
import { DEMO_WRITEBACK, DEMO_PROJECT } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import type { WritebackBatch } from '../types';

export function WritebackPage() {
  const { addToast } = useAppStore();
  const [batch, setBatch] = useState<WritebackBatch>(DEMO_WRITEBACK);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'CSV' | 'XER' | 'XML'>('CSV');

  const handleDownload = () => {
    setIsExporting(true);
    addToast(`Compiling Primavera ${exportFormat} export batch...`, 'info');

    setTimeout(() => {
      setIsExporting(false);
      setBatch(prev => ({ ...prev, status: 'EXPORTED' }));
      addToast(`Downloaded P6_Actuals_Update_${DEMO_PROJECT.dataDate}.${exportFormat.toLowerCase()}`, 'success');

      // Create dummy file download trigger
      const element = document.createElement('a');
      const file = new Blob([
        `Activity_ID,Activity_Name,Actual_Start,Actual_Finish,Derivation_Rule,Confidence\n` +
        batch.rows.map(r => `${r.activityCode},"${r.activityName}",${r.afterActualStart || ''},${r.afterActualFinish || ''},${r.derivationRule},${r.confidence}`).join('\n')
      ], { type: 'text/csv' });
      element.href = URL.createObjectURL(file);
      element.download = `P6_Actuals_Update_${DEMO_PROJECT.dataDate}.csv`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
              <Upload size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">P6 Schedule Bridge</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Primavera P6 / XER Write-Back Center</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Export validated, audit-trailed actual dates directly into Primavera P6 without manual data entry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-navy-950 p-1 rounded-xl border border-navy-800 text-xs">
            {(['CSV', 'XER', 'XML'] as const).map(fmt => (
              <button
                key={fmt}
                type="button"
                onClick={() => setExportFormat(fmt)}
                className={`px-3 py-1 rounded-lg font-mono font-bold transition-all ${
                  exportFormat === fmt
                    ? 'bg-accent-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                .{fmt}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-accent-600/20 transition-all active:scale-95"
          >
            {isExporting ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
            <span>Export Actuals</span>
          </button>
        </div>
      </div>

      {/* Pre-flight Dry Run Validation Banner */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Pre-Flight Dry Run Validation Checks</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400">
            Passed 18 of 20
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-xs">
          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between">
            <span className="text-slate-300">Data Date Consistency (&le; {DEMO_PROJECT.dataDate})</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between">
            <span className="text-slate-300">Predecessor Sequence Integrity</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between">
            <span className="text-slate-300">No Planned = Actual Copying</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Write-Back Diff Table */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-accent-400" />
              Schedule Actuals Staging Diff ({batch.rows.length} Activities)
            </h3>
            <span className="text-xs text-slate-400">
              Comparing current P6 working plan state against KarmSetu derived execution dates.
            </span>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            batch.status === 'EXPORTED'
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-amber-500/20 text-amber-300'
          }`}>
            {batch.status}
          </span>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-800 text-slate-400 font-medium">
                <th className="py-2.5 px-3">Activity Code / Name</th>
                <th className="py-2.5 px-2">Before P6 Actuals</th>
                <th className="py-2.5 px-2">After Derived Actuals</th>
                <th className="py-2.5 px-2">Derivation Rule</th>
                <th className="py-2.5 px-2">Confidence</th>
                <th className="py-2.5 px-2">Source Claims</th>
                <th className="py-2.5 px-3 text-right">Audit Trail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60">
              {batch.rows.map(row => (
                <tr key={row.activityId} className="hover:bg-navy-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-mono text-[11px] font-bold text-accent-400">{row.activityCode}</div>
                    <div className="text-slate-200 font-medium mt-0.5">{row.activityName}</div>
                  </td>
                  <td className="py-3 px-2 font-mono text-[11px] text-slate-500">
                    {row.beforeActualStart || 'None'} &rarr; {row.beforeActualFinish || 'None'}
                  </td>
                  <td className="py-3 px-2 font-mono text-[11px]">
                    <span className="text-emerald-400 font-semibold">
                      {row.afterActualStart || '&mdash;'} &rarr; {row.afterActualFinish || 'Ongoing'}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-800 text-slate-300 border border-navy-700">
                      {row.derivationRule}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="font-mono font-bold text-emerald-400">
                      {Math.round(row.confidence * 100)}%
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1 font-mono text-[10px] text-accent-400">
                      {row.sourceClaimIds.join(', ')}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to={`/trace/${row.activityCode}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent-400 hover:text-accent-300 bg-accent-500/10 hover:bg-accent-500/20 border border-accent-500/30 px-2.5 py-1 rounded-lg transition-all"
                      title="Inspect complete provenance trace"
                    >
                      <GitBranch size={11} />
                      <span>Trace</span>
                    </Link>
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
