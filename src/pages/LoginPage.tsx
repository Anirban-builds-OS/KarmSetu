// ============================================================
// Login Page — Premium Landing Experience for SIH 2026 Judges
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Brain, Layers, BarChart2,
  FileInput, CheckCircle2, Sparkles, Lock, Eye, EyeOff,
  Clock, Upload, Network
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { DEMO_USERS } from '../mocks/data';
import type { UserRole } from '../types';

const PERSONAS = [
  {
    role: 'SUPERVISOR' as UserRole,
    name: 'Rajesh Kumar',
    title: 'Site Supervisor',
    description: 'Files daily progress reports from the field. Reports spool erection, foundation pours, cable pulls.',
    icon: Upload,
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
  },
  {
    role: 'PLANNER' as UserRole,
    name: 'Priya Sharma',
    title: 'Planning Engineer',
    description: 'Reviews AI-linked claims, resolves conflicts, approves schedule actuals before write-back to P6.',
    icon: BarChart2,
    color: 'from-accent-500 to-blue-600',
    borderColor: 'border-accent-500/30',
    bgColor: 'bg-accent-500/10',
    textColor: 'text-accent-400',
  },
  {
    role: 'PROJECT_MANAGER' as UserRole,
    name: 'Amit Patel',
    title: 'Project Manager',
    description: 'Views executive dashboards, monitors data quality, oversees write-back integrity across disciplines.',
    icon: Shield,
    color: 'from-violet-500 to-purple-600',
    borderColor: 'border-violet-500/30',
    bgColor: 'bg-violet-500/10',
    textColor: 'text-violet-400',
  },
  {
    role: 'ADMIN' as UserRole,
    name: 'Sneha Gupta',
    title: 'System Administrator',
    description: 'Manages users, system health, configuration, and audit compliance across the platform.',
    icon: Lock,
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
  },
];

const PIPELINE_STEPS = [
  { icon: FileInput, label: 'Field Report', sublabel: 'DPR / Voice / Chat' },
  { icon: Eye, label: 'Observation', sublabel: 'NLP Extraction' },
  { icon: Layers, label: 'Claim / Event', sublabel: 'Structured Event' },
  { icon: Network, label: 'Scope Object', sublabel: 'Canonical Matching' },
  { icon: Brain, label: 'Activity Link', sublabel: 'Bayesian Linking' },
  { icon: Clock, label: 'Actual Dates', sublabel: 'Schedule Derivation' },
  { icon: Shield, label: 'Confidence Lane', sublabel: 'Auto / Review' },
  { icon: Zap, label: 'P6 Write-back', sublabel: 'XER / CSV Export' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { loginAs } = useAuthStore();
  const { addToast } = useAppStore();
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);
  const [animatingStep, setAnimatingStep] = useState(0);

  // Animate pipeline steps
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingStep(prev => (prev + 1) % PIPELINE_STEPS.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handlePersonaLogin = (role: UserRole) => {
    const user = DEMO_USERS.find(u => u.role === role);
    if (user) {
      loginAs(user);
      addToast(`Welcome, ${user.name}! Logged in as ${role.replace('_', ' ')}`, 'success');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col overflow-hidden relative">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent-600/5 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[120px]" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-600/3 blur-[80px]" style={{ animation: 'pulse 6s ease-in-out infinite' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Top Banner */}
      <div className="relative z-10 w-full bg-gradient-to-r from-accent-600/20 via-violet-600/10 to-emerald-600/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <Sparkles size={13} className="text-amber-400" />
            <span className="text-amber-300 font-medium">SIH 2026 — Problem Statement SIH26122</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Interactive Prototype Demo Environment</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-500">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">v1.0.0-demo</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-2xl shadow-accent-600/30 mb-4">
            <span className="text-white font-extrabold text-2xl tracking-tight">K</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            KARM<span className="text-accent-400">SETU</span>
          </h1>
          <p className="text-sm text-accent-300/80 font-medium mt-1 italic tracking-wide">
            "The field speaks. The plan listens."
          </p>
          <p className="text-xs text-slate-400 max-w-lg mx-auto mt-3 leading-relaxed">
            Smart Infrastructure Project Execution & Progress Intelligence — Bridging unstructured multi-source 
            field reporting directly into structured, defensible Primavera P6 schedule actuals.
          </p>
        </div>

        {/* Animated Pipeline Strip */}
        <div className="w-full max-w-4xl mb-10">
          <div className="flex items-center justify-between gap-0 overflow-x-auto pb-2">
            {PIPELINE_STEPS.map((step, i) => {
              const isActive = i === animatingStep;
              const isPast = i < animatingStep;
              return (
                <div key={step.label} className="flex items-center flex-shrink-0">
                  <div className={`flex flex-col items-center gap-1 px-2 transition-all duration-300 ${
                    isActive ? 'scale-110' : isPast ? 'opacity-70' : 'opacity-40'
                  }`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                        : isPast
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-navy-800 text-navy-400'
                    }`}>
                      {isPast ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                    </div>
                    <span className={`text-[10px] font-semibold whitespace-nowrap transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500'
                    }`}>{step.label}</span>
                    <span className={`text-[9px] whitespace-nowrap transition-colors ${
                      isActive ? 'text-accent-300' : 'text-slate-600'
                    }`}>{step.sublabel}</span>
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div className={`w-6 h-0.5 mx-0.5 rounded transition-colors ${
                      isPast ? 'bg-emerald-500/40' : isActive ? 'bg-accent-500/40' : 'bg-navy-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Persona Cards */}
        <div className="w-full max-w-4xl">
          <div className="text-center mb-5">
            <h2 className="text-lg font-bold text-white">Select Your Persona</h2>
            <p className="text-xs text-slate-400 mt-1">
              Experience KarmSetu from different stakeholder perspectives — each role has tailored views & permissions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERSONAS.map(persona => {
              const isHovered = hoveredPersona === persona.role;
              return (
                <button
                  key={persona.role}
                  type="button"
                  onClick={() => handlePersonaLogin(persona.role)}
                  onMouseEnter={() => setHoveredPersona(persona.role)}
                  onMouseLeave={() => setHoveredPersona(null)}
                  className={`group relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? `${persona.borderColor} bg-white/[0.04] shadow-xl scale-[1.02]`
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${persona.color} flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                    <persona.icon size={18} className="text-white" />
                  </div>
                  <div className="font-bold text-white text-sm">{persona.name}</div>
                  <div className={`text-[11px] font-medium ${persona.textColor} mt-0.5`}>{persona.title}</div>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{persona.description}</p>
                  <div className={`mt-3 flex items-center gap-1.5 text-[11px] font-semibold transition-colors ${
                    isHovered ? persona.textColor : 'text-slate-500'
                  }`}>
                    <span>Enter as {persona.title}</span>
                    <ArrowRight size={12} className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Key Features Strip */}
        <div className="w-full max-w-4xl mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Brain, label: 'Bayesian Activity Linking', value: 'Top-1: 94.2%' },
            { icon: Shield, label: 'Schedule Integrity', value: '20-point checks' },
            { icon: Zap, label: 'Auto-Commit Coverage', value: '78.4% hands-free' },
            { icon: BarChart2, label: 'P6/XER Write-back', value: 'XER · CSV · REST' },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-900/60 border border-navy-700/40">
              <f.icon size={16} className="text-accent-400 flex-shrink-0" />
              <div>
                <div className="text-[11px] font-semibold text-white">{f.label}</div>
                <div className="text-[10px] text-accent-300 font-mono">{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] text-slate-500">
          <span>© 2026 KarmSetu — Smart Infrastructure Progress Intelligence</span>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-navy-800 border border-navy-700">React + Vite + TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-navy-800 border border-navy-700">Zustand State</span>
            <span className="px-2 py-0.5 rounded bg-navy-800 border border-navy-700">Tailwind v4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
