// ============================================================
// Ingestion Center — Multi-source Field Ingestion & Pipeline
// ============================================================

import { useState } from 'react';
import {
  Upload, FileText, CheckCircle2, Clock, AlertTriangle,
  Play, RefreshCw, Layers, ArrowRight,
  Database, Sparkles
} from 'lucide-react';
import { DEMO_SOURCES } from '../mocks/data';
import { useAppStore } from '../store/appStore';
import { generateId } from '../lib/security';
import type { SourceDocument, SourceType } from '../types';

export function IngestPage() {
  const { addToast } = useAppStore();
  const [sources, setSources] = useState<SourceDocument[]>(DEMO_SOURCES);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const sampleUploads: Array<{ name: string; type: SourceType; size: string; claims: number }> = [
    { name: 'DPR_Piping_Bay3_2026-09-29.pdf',       type: 'PDF',  size: '2.4 MB', claims: 8  },
    { name: 'Contractor_Daily_Civil_Log.xlsx',       type: 'XLSX', size: '1.1 MB', claims: 14 },
    { name: 'Site_Foreman_WhatsApp_Export.txt',      type: 'CHAT', size: '420 KB', claims: 6  },
    { name: 'Primavera_P6_Export_DEPC.xer',          type: 'XER',  size: '5.8 MB', claims: 32 },
  ];

  const handleSimulateUpload = (sample: typeof sampleUploads[0]) => {
    setIsUploading(true);
    setCurrentStep(1);
    addToast(`Uploaded ${sample.name}. Starting multi-stage extraction pipeline...`, 'info');

    setTimeout(() => setCurrentStep(2), 700);
    setTimeout(() => setCurrentStep(3), 1500);
    setTimeout(() => setCurrentStep(4), 2200);
    setTimeout(() => {
      setCurrentStep(5);
      setIsUploading(false);

      const newDoc: SourceDocument = {
        id: generateId('src'),
        projectId: 'prj-001',
        fileName: sample.name,
        sourceType: sample.type,
        reporterName: 'Site Engineer',
        reporterId: 'usr-001',
        discipline: 'Piping',
        reportDate: new Date().toISOString().split('T')[0] ?? '',
        receivedTime: new Date().toISOString(),
        status: 'COMPLETED',
        observationCount: sample.claims,
        claimCount: sample.claims,
        resolvedObjectCount: sample.claims,
        matchedActivityCount: sample.claims,
        needsReviewCount: 0,
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      };

      setSources(prev => [newDoc, ...prev]);
      addToast(`Pipeline finished! ${sample.claims} claims successfully extracted from ${sample.name}.`, 'success');
    }, 3000);
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
            <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Ingestion Center</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Multi-Source Ingestion &amp; Parsing Pipeline</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Ingest DPRs, PDFs, Excel logs, WhatsApp chat exports, voice transcripts, and Primavera XER files.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-navy-950/70 border border-navy-700 text-xs text-slate-300 font-mono">
            {sources.length} Ingested Documents
          </span>
        </div>
      </div>

      {/* Upload Zone & Interactive Demo Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drag and Drop Zone */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-navy-900/90 border-2 border-dashed border-navy-700 hover:border-accent-500/50 transition-all flex flex-col items-center justify-center text-center group">
          <div className="w-14 h-14 rounded-2xl bg-accent-600/10 border border-accent-500/20 flex items-center justify-center text-accent-400 group-hover:scale-110 transition-transform">
            <Upload size={24} />
          </div>
          <h3 className="text-sm font-bold text-white mt-3">Upload Field Documents or Schedule Files</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Drag and drop DPR PDFs, Excel reports, P6 XER exports, or photos. Automatic OCR and schema normalization enabled.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSimulateUpload(sampleUploads[0])}
              className="px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-medium text-xs shadow-md transition-all"
            >
              Browse Files
            </button>
            <span className="text-xs text-slate-500">or try one-click sample below</span>
          </div>
        </div>

        {/* 1-Click Test Samples */}
        <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-navy-800">
              <Sparkles size={14} className="text-accent-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                1-Click Simulation Samples
              </h3>
            </div>
            <div className="space-y-2 mt-3">
              {sampleUploads.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isUploading}
                  onClick={() => handleSimulateUpload(sample)}
                  className="w-full text-left p-2.5 rounded-xl bg-navy-950/80 hover:bg-navy-800 border border-navy-800/80 hover:border-accent-500/40 text-xs flex items-center justify-between transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-slate-200 truncate group-hover:text-white">
                      {sample.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {sample.type} • {sample.size} • ~{sample.claims} claims
                    </div>
                  </div>
                  <Play size={14} className="text-accent-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-navy-800 text-[11px] text-slate-400">
            Simulates real-world messy site reports with OCR typos, slang, and timestamps.
          </div>
        </div>
      </div>

      {/* Real-time Extraction Pipeline Stepper (Visible during or after upload) */}
      {(isUploading || currentStep > 0) && (
        <div className="p-5 rounded-2xl bg-navy-900 border border-navy-700 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <RefreshCw size={14} className={isUploading ? 'animate-spin text-accent-400' : 'text-emerald-400'} />
              Active Ingestion Pipeline Telemetry
            </h3>
            <span className="text-xs font-mono text-accent-400">
              {isUploading ? `Step ${currentStep} of 5` : 'Pipeline Complete (0.8s latency)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[
              { step: 1, label: 'Document Parsed', sub: 'PDF text & OCR extracted' },
              { step: 2, label: 'Normalized', sub: 'Dates converted to ISO-8601' },
              { step: 3, label: 'Claims Extracted', sub: 'Verbs & modality identified' },
              { step: 4, label: 'Scope Resolved', sub: 'Aliases mapped to canonical' },
              { step: 5, label: 'Activities Linked', sub: 'Hybrid scoring computed' },
            ].map(s => {
              const done = currentStep >= s.step;
              const active = currentStep === s.step;
              return (
                <div
                  key={s.step}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    done
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : active
                      ? 'bg-accent-950/40 border-accent-500 text-white animate-pulse'
                      : 'bg-navy-950/40 border-navy-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold">0{s.step}</span>
                    {done && <CheckCircle2 size={13} className="text-emerald-400" />}
                  </div>
                  <div className="font-semibold">{s.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{s.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Ingested Documents List */}
      <div className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-accent-400" />
              Source Ingestion Ledger
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Every document is SHA-256 hashed and retained for legal and claims defensibility.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-800 text-slate-400 font-medium">
                <th className="py-2.5 px-3">Document Name</th>
                <th className="py-2.5 px-2">Format</th>
                <th className="py-2.5 px-2">Uploaded At</th>
                <th className="py-2.5 px-2">Status</th>
                <th className="py-2.5 px-2">Claims Found</th>
                <th className="py-2.5 px-2">SHA-256 Hash</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60">
              {sources.map(doc => (
                <tr key={doc.id} className="hover:bg-navy-800/40 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-200">{doc.fileName}</div>
                    <div className="text-[11px] text-slate-400 italic line-clamp-1">
                      Reporter: {doc.reporterName} • {doc.observationCount} observations
                    </div>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {doc.sourceType}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-400 font-mono text-[11px]">
                    {doc.reportDate}
                  </td>
                  <td className="py-2.5 px-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      doc.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : doc.status === 'QUARANTINED'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="font-mono font-bold text-accent-400">{doc.claimCount}</span>
                  </td>
                  <td className="py-2.5 px-2 font-mono text-[10px] text-slate-500 truncate max-w-[120px]">
                    {doc.hash}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => addToast(`Opening raw document viewer for ${doc.fileName}`, 'info')}
                      className="text-xs text-accent-400 hover:text-accent-300 font-medium inline-flex items-center gap-1"
                    >
                      Inspect <ArrowRight size={12} />
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
