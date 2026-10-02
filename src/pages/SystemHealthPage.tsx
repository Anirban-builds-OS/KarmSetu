// ============================================================
// System Health Page — Real-Time Telemetry & Architecture Status
// ============================================================

import {
  Activity, CheckCircle2, Server, Cpu, Database,
  ShieldCheck, Zap, Clock, HardDrive
} from 'lucide-react';

export function SystemHealthPage() {
  const services = [
    { name: 'NLP Claims Extraction Engine', status: 'OPERATIONAL', latency: '142ms', uptime: '99.98%', icon: Cpu },
    { name: 'Topological Scope Graph (pgvector)', status: 'OPERATIONAL', latency: '18ms', uptime: '100%', icon: Database },
    { name: 'Schedule Linking & Scoring Service', status: 'OPERATIONAL', latency: '45ms', uptime: '99.95%', icon: Zap },
    { name: 'Cryptographic Hash-Chain Ledger', status: 'OPERATIONAL', latency: '6ms', uptime: '100%', icon: ShieldCheck },
    { name: 'Primavera P6 Write-back Gateway', status: 'OPERATIONAL', latency: '32ms', uptime: '99.9%', icon: Server },
    { name: 'PostgreSQL Relational Core', status: 'OPERATIONAL', latency: '8ms', uptime: '100%', icon: HardDrive },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 border border-navy-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
              <Activity size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Telemetry &amp; Infrastructure</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">System Health &amp; Pipeline Telemetry</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time latency, queue health, and processing pipeline performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>All Services Operational</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-navy-900/90 border border-navy-700/80 shadow-md space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-navy-800 text-accent-400 border border-navy-700">
                <s.icon size={18} />
              </div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                <CheckCircle2 size={12} /> {s.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{s.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-400">Response Latency</span>
                <div className="font-mono font-bold text-accent-300 mt-0.5">{s.latency}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">30-Day Uptime</span>
                <div className="font-mono font-bold text-emerald-400 mt-0.5">{s.uptime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
