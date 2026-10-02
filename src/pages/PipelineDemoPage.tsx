// ============================================================
// Pipeline Demo Page — End-to-End KarmSetu Engine Walkthrough
// "The field speaks. The plan listens."
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play, Pause, RotateCcw, FastForward, CheckCircle2, AlertTriangle,
  ArrowRight, Brain, Shield, Sparkles, FileText, Network, Clock,
  Upload, Layers, Activity, ChevronRight, Hash, Database, Download,
  Check, Info, Sparkle, RefreshCw
} from 'lucide-react';
import { useAppStore } from '../store/appStore';

interface PipelineScenario {
  id: string;
  name: string;
  discipline: string;
  badge: string;
  badgeColor: string;
  rawFieldReport: {
    source: string;
    author: string;
    time: string;
    text: string;
  };
  stages: {
    title: string;
    subtitle: string;
    details: {
      label: string;
      value: string | number;
      highlight?: boolean;
    }[];
    status: 'success' | 'warning' | 'info';
    codeSnippet?: string;
    explanation: string;
  }[];
}

const DEMO_SCENARIOS: PipelineScenario[] = [
  {
    id: 'civil-pour',
    name: 'Foundation Pour FDN-P101A (Civil)',
    discipline: 'Civil',
    badge: 'Auto-Commit (96% Confidence)',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    rawFieldReport: {
      source: 'WhatsApp Site Group & Voice Note',
      author: 'Rajesh Kumar (Civil Supervisor)',
      time: '28-Sep-2026 18:45 IST',
      text: 'Today 28-Sep completed final 45m3 M35 pour on pump foundation FDN-P101A at Bay 4. QA/QC Kumar inspected slump 120mm, rebar certified. Curing compound applied. 100% finished, ready for pump skid erection next week.',
    },
    stages: [
      {
        title: 'Stage 1: Ingestion & Normalization',
        subtitle: 'Multi-modal ingest normalizes voice audio transcript and site chat',
        explanation: 'Audio parsed via Whisper-v3 fine-tuned on Indian construction EPC terms; slang normalized.',
        status: 'success',
        details: [
          { label: 'Source Protocol', value: 'WhatsApp Webhook / AMR Audio' },
          { label: 'OCR & NLP Tokens', value: '38 tokens extracted' },
          { label: 'Language & Dialect', value: 'English / Hindi Mix (EPC domain)' },
          { label: 'Normalization Score', value: '0.992' },
        ],
        codeSnippet: `{\n  "raw_id": "ING-2026-0928-882",\n  "clean_text": "Completed final 45m3 M35 pour on pump foundation FDN-P101A at Bay 4...",\n  "timestamp": "2026-09-28T18:45:00+05:30",\n  "author": "Rajesh Kumar (EMP-88102)"\n}`,
      },
      {
        title: 'Stage 2: Observation Extraction',
        subtitle: 'Entity recognition identifies tags, quantities, materials, and test sign-offs',
        explanation: 'Extracted semantic entities: Physical tag FDN-P101A, volume 45 m3, grade M35, slump 120mm.',
        status: 'success',
        details: [
          { label: 'Detected Tag', value: 'FDN-P101A', highlight: true },
          { label: 'Quantity & UoM', value: '45 m³ (Concrete M35)' },
          { label: 'Location Anchor', value: 'Bay 4, Area 02 (Compressor House)' },
          { label: 'QA/QC Witness', value: 'Slump 120mm, Rebar signed off' },
        ],
        codeSnippet: `{\n  "entities": [\n    { "type": "TAG", "value": "FDN-P101A" },\n    { "type": "QUANTITY", "amount": 45, "uom": "m3" },\n    { "type": "DISCIPLINE", "value": "Civil" },\n    { "type": "STATUS_HINT", "value": "100% finished" }\n  ]\n}`,
      },
      {
        title: 'Stage 3: Claim / Event Synthesis',
        subtitle: 'Structured atomic claim constructed with cryptographic provenance',
        explanation: 'Transforms unstructured observation into formal Claim CLM-2026-0814 with progress event.',
        status: 'success',
        details: [
          { label: 'Claim ID', value: 'CLM-2026-0814', highlight: true },
          { label: 'Claim Event Type', value: 'PHYSICAL_PROGRESS_COMPLETION' },
          { label: 'Claimed Status', value: '100% Completed' },
          { label: 'Event Date', value: '2026-09-28' },
        ],
        codeSnippet: `{\n  "claim_id": "CLM-2026-0814",\n  "event_type": "POUR_COMPLETED",\n  "reported_progress": 100,\n  "evidence_count": 2,\n  "parent_ingest_id": "ING-2026-0928-882"\n}`,
      },
      {
        title: 'Stage 4: Physical Scope Object Resolution',
        subtitle: 'Matches entity tag against canonical Engineering Scope Hierarchy',
        explanation: 'Disambiguates FDN-P101A against 14,200 project tags. Exact 1.0 match to Compressor Foundation.',
        status: 'success',
        details: [
          { label: 'Canonical Object', value: 'OBJ-CIV-FDN-0101', highlight: true },
          { label: 'Object Name', value: 'Pump Foundation P-101A/B Skid Base' },
          { label: 'Engineering WBS', value: 'DEPC.02.CIV.FDN' },
          { label: '3D Model / Coordinates', value: 'E421.2, N819.5, EL +104.2m' },
        ],
        codeSnippet: `{\n  "scope_object_id": "OBJ-CIV-FDN-0101",\n  "tag": "FDN-P101A",\n  "wbs_path": "DEPC.02.CIV.FDN",\n  "discipline": "Civil",\n  "alias_matched": "FDN-P101A/B"\n}`,
      },
      {
        title: 'Stage 5: Activity Candidate Retrieval',
        subtitle: 'Searches 2,400 P6 schedule activities linked to this physical scope object',
        explanation: 'Filters active P6 network for activities in current schedule window matching Civil Pour.',
        status: 'success',
        details: [
          { label: 'Top Candidate #1', value: 'ACT-EP-1042 (P(A)=0.96)', highlight: true },
          { label: 'Candidate #2', value: 'ACT-EP-1043 (Grouting - P(A)=0.03)' },
          { label: 'Candidate #3', value: 'ACT-EP-1090 (Inspection - P(A)=0.01)' },
          { label: 'Candidate Pool', value: '3 candidate activities evaluated' },
        ],
        codeSnippet: `{\n  "candidates": [\n    { "act_code": "ACT-EP-1042", "desc": "Pour Foundation Concrete P-101A", "score": 0.96 },\n    { "act_code": "ACT-EP-1043", "desc": "Grout Equipment Baseplate P-101A", "score": 0.03 }\n  ]\n}`,
      },
      {
        title: 'Stage 6: Schedule-Aware Bayesian Linking',
        subtitle: 'Calculates posterior probability using spatial, temporal, and predecessor priors',
        explanation: 'Combines text embedding (0.94) + predecessor rebar signoff (1.0) + calendar feasibility (0.95).',
        status: 'success',
        details: [
          { label: 'Bayesian Posterior', value: '0.962 (96.2% Confident)', highlight: true },
          { label: 'Predecessor Check', value: 'PASSED (ACT-EP-1041 Rebar is 100%)' },
          { label: 'Discipline Compatibility', value: '1.0 (Civil matches Civil)' },
          { label: 'Spatial Proximity', value: '1.0 (Exact Area-02 Grid 4-C)' },
        ],
        codeSnippet: `// Bayesian Linking Formulation\nP(Activity | Evidence) = [ P(Evidence | Activity) * P(Activity) ] / P(Evidence)\nScore breakdown:\n- Semantic similarity:  0.94\n- Predecessor closure:  1.00\n- Calendar alignment:   0.95\n=> Combined Posterior = 0.962`,
      },
      {
        title: 'Stage 7: Actual Date Derivation',
        subtitle: 'Translates field timestamp into formal P6 schedule actual dates',
        explanation: 'Mathematically verifies start and finish constraints against Data Date (2026-09-28).',
        status: 'success',
        details: [
          { label: 'Derived Actual Start', value: '2026-09-26 08:00' },
          { label: 'Derived Actual Finish', value: '2026-09-28 17:30', highlight: true },
          { label: 'Schedule Percent Complete', value: '100.0%' },
          { label: 'Remaining Duration', value: '0.0 Days (Activity Completed)' },
        ],
        codeSnippet: `{\n  "actv_code": "ACT-EP-1042",\n  "status": "COMPLETED",\n  "act_start_date": "2026-09-26 08:00:00",\n  "act_end_date": "2026-09-28 17:30:00",\n  "remain_durn_hr_cnt": 0\n}`,
      },
      {
        title: 'Stage 8: Confidence Lane Decision',
        subtitle: 'Auto-routing engine directs high-confidence actions to Auto-Commit',
        explanation: 'Threshold is 0.85 with 0 integrity violations. Since 0.962 > 0.85, auto-approved for writeback.',
        status: 'success',
        details: [
          { label: 'Assigned Lane', value: 'AUTO-COMMIT LANE', highlight: true },
          { label: 'Confidence Score', value: '96.2% (Threshold: 85.0%)' },
          { label: 'Integrity Check', value: '20 / 20 Rules Passed (Clean)' },
          { label: 'Human Review Needed', value: 'No (Auto-stamped with AI reason)' },
        ],
        codeSnippet: `{\n  "routing_decision": "AUTO_COMMIT",\n  "confidence_lane": "GREEN",\n  "policy": "POLICY_CIVIL_STANDARD_POUR",\n  "requires_supervisor_override": false\n}`,
      },
      {
        title: 'Stage 9: Human-in-the-Loop Safeguard',
        subtitle: 'Planner verification queue (bypassed in Auto-Commit, logged for retrospective audit)',
        explanation: 'Auto-approved, but available on the Planner Review dashboard for non-blocking inspection.',
        status: 'success',
        details: [
          { label: 'Review Mode', value: 'Automated Fast-Path' },
          { label: 'Planner Queue Status', value: 'Approved (AI Auto-Delegate)' },
          { label: 'Reviewer Account', value: 'SYSTEM_KARMSETU_AUTOBOT' },
          { label: 'Override Window', value: '24 hours post write-back' },
        ],
        codeSnippet: `{\n  "review_status": "APPROVED",\n  "reviewer": "SYSTEM",\n  "rationale": "High confidence Bayesian match with valid predecessor completion certificate."\n}`,
      },
      {
        title: 'Stage 10: Immutable Audit Ledger',
        subtitle: 'Cryptographic SHA-256 block links field report to schedule actuals',
        explanation: 'Immutable audit entry guarantees tamper-proof traceability for claims & contract disputes.',
        status: 'success',
        details: [
          { label: 'Block Hash', value: '8f7a93c...4e21a0', highlight: true },
          { label: 'Parent Block Hash', value: '003d12b...9a77c4' },
          { label: 'Merkle Root', value: '55c829e...118f92' },
          { label: 'Signed By', value: 'KarmSetu Engine v2.4 (HMAC-SHA256)' },
        ],
        codeSnippet: `{\n  "ledger_seq": 10482,\n  "block_hash": "8f7a93ce14d69f0b3e5a7b8e1248c89b21a0...",\n  "prev_hash": "003d12b77a984f1e9a77c412e88a7650...",\n  "payload": { "act_id": "ACT-EP-1042", "status": "COMPLETED", "date": "2026-09-28" }\n}`,
      },
      {
        title: 'Stage 11: P6 / XER Write-Back Export',
        subtitle: 'Generates native Primavera P6 XER record ready for bi-directional synchronization',
        explanation: 'Generates standard Primavera P6 table row with exact internal calendar keys and statuses.',
        status: 'success',
        details: [
          { label: 'Export Protocol', value: 'Oracle Primavera P6 XER 21.12' },
          { label: 'Target Table', value: '%T TASK' },
          { label: 'Sync Status', value: 'READY FOR STAGING EXPORT', highlight: true },
          { label: 'Format Variants', value: 'XER · CSV · REST API Webhook' },
        ],
        codeSnippet: `%T TASK\n%F task_id task_code actv_code task_name status_code act_start_date act_end_date\n49281 ACT-EP-1042 ACT-EP-1042 Pour Foundation Concrete P-101A TK_Complete 2026-09-26 08:00 2026-09-28 17:30`,
      },
      {
        title: 'Stage 12: Execution Memory Learning',
        subtitle: 'Feedbacks field performance into memory graph to improve future planning',
        explanation: 'Updates crew pour productivity rate in Execution Memory: M35 pour was 18% faster than baseline.',
        status: 'success',
        details: [
          { label: 'Memory Object', value: 'MEM-CIVIL-POUR-AREA2', highlight: true },
          { label: 'Actual vs Estimated Duration', value: '2.5 days (Estimated: 3.0 days)' },
          { label: 'Productivity Variance', value: '+16.7% efficiency' },
          { label: 'Ontology Update', value: 'Weight for "M35 Bay 4" increased by 0.04' },
        ],
        codeSnippet: `{\n  "execution_memory_update": {\n    "scope_tag": "OBJ-CIV-FDN-0101",\n    "actual_duration_hours": 20,\n    "planned_duration_hours": 24,\n    "productivity_factor": 1.20,\n    "fine_tune_vector_updated": true\n  }\n}`,
      },
    ],
  },
  {
    id: 'piping-spool',
    name: 'Spool Erection SP-MS-042 (Piping)',
    discipline: 'Piping',
    badge: 'Human Review Required (68% Confidence)',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    rawFieldReport: {
      source: 'Site Foreman Voice Note',
      author: 'Mohan Singh (Piping Foreman)',
      time: '28-Sep-2026 16:30 IST',
      text: 'Main steam line spool 42 hung on rack 3 yesterday. Fit-up inspection done. But bolting on flange FL-42B still pending torque wrench calibration. About 70 percent done.',
    },
    stages: [
      {
        title: 'Stage 1: Ingestion & Normalization',
        subtitle: 'Voice note transcribed and converted to structured claim tokens',
        explanation: 'Transcribed from audio: "spool 42 hung", "flange FL-42B", "70 percent done".',
        status: 'success',
        details: [
          { label: 'Source Protocol', value: 'Voice Audio / Mobile Ingest' },
          { label: 'Audio Duration', value: '24 seconds' },
          { label: 'Confidence of Transcript', value: '0.94' },
          { label: 'Tokens Extracted', value: '31 tokens' },
        ],
      },
      {
        title: 'Stage 2: Observation Extraction',
        subtitle: 'Extracted piping spool tag, progress percentage, and outstanding constraint',
        explanation: 'Detected tag: SP-MS-042 (Main Steam Spool 42), percent: 70%, issue: torque wrench calibration.',
        status: 'success',
        details: [
          { label: 'Spool Tag', value: 'SP-MS-042', highlight: true },
          { label: 'Work Element', value: 'Erection & Fit-up' },
          { label: 'Claimed Progress', value: '70% In-Progress' },
          { label: 'Flagged Blocker', value: 'Torque wrench calibration pending' },
        ],
      },
      {
        title: 'Stage 3: Claim / Event Synthesis',
        subtitle: 'Structured progress claim created with partial progress status',
        explanation: 'Synthesized into claim CLM-2026-0818 with status IN_PROGRESS (70%).',
        status: 'success',
        details: [
          { label: 'Claim ID', value: 'CLM-2026-0818', highlight: true },
          { label: 'Event Type', value: 'PARTIAL_ERECTION' },
          { label: 'Reported Percent', value: '70%' },
          { label: 'Target Date', value: '2026-09-28' },
        ],
      },
      {
        title: 'Stage 4: Physical Scope Object Resolution',
        subtitle: 'Matched against Piping Line List & Isometric Drawings',
        explanation: 'Resolved to ISO-MS-004-R2: 12-inch Main Steam Piping Spool 42, Pipe Rack 3.',
        status: 'success',
        details: [
          { label: 'Scope Object ID', value: 'OBJ-PIP-SPL-0042', highlight: true },
          { label: 'Line Number', value: '12"-MS-004-B31.3' },
          { label: 'Isometric Drawing', value: 'ISO-MS-004-R2' },
          { label: 'Discipline', value: 'Mechanical / Piping' },
        ],
      },
      {
        title: 'Stage 5: Activity Candidate Retrieval',
        subtitle: 'Two candidate activities found in P6 with overlapping descriptions',
        explanation: 'Found ACT-EP-2081 (Erect Spool SP-042) and ACT-EP-2082 (Flange Bolting & Torqueing).',
        status: 'warning',
        details: [
          { label: 'Candidate #1', value: 'ACT-EP-2081 (Erect Spool - 68%)', highlight: true },
          { label: 'Candidate #2', value: 'ACT-EP-2082 (Bolt & Torque - 32%)' },
          { label: 'Ambiguity Alert', value: 'Report spans both erection and bolting tasks' },
          { label: 'Schedule Step Count', value: '2-step work breakdown in P6' },
        ],
      },
      {
        title: 'Stage 6: Schedule-Aware Bayesian Linking',
        subtitle: 'Posterior probability falls below auto-commit threshold due to split scope',
        explanation: 'Score is 0.684. Predecessor ACT-EP-2080 (Scaffolding) is complete, but bolting is partial.',
        status: 'warning',
        details: [
          { label: 'Bayesian Posterior', value: '0.684 (68.4% Confidence)', highlight: true },
          { label: 'Auto-Threshold', value: '0.850 (Requirement Not Met)' },
          { label: 'Discipline Alignment', value: '1.0 (Piping)' },
          { label: 'Split Risk Flag', value: 'Work spans multiple WBS line items' },
        ],
      },
      {
        title: 'Stage 7: Actual Date Derivation',
        subtitle: 'Derives In-Progress state with Actual Start on 2026-09-27 and remaining 2 days',
        explanation: 'Activity ACT-EP-2081 marked IN_PROGRESS with 70% physical completion.',
        status: 'info',
        details: [
          { label: 'Actual Start', value: '2026-09-27' },
          { label: 'Actual Finish', value: 'None (Still in progress)' },
          { label: 'Calculated Remaining', value: '1.5 days duration remaining' },
          { label: 'Proposed Percent', value: '70.0%' },
        ],
      },
      {
        title: 'Stage 8: Confidence Lane Decision',
        subtitle: 'Routed to Planner Review Queue for Human-in-the-Loop decision',
        explanation: 'Confidence score (68.4%) is in the AMBER lane [60% - 85%]. Requires Planner sign-off.',
        status: 'warning',
        details: [
          { label: 'Assigned Lane', value: 'HUMAN REVIEW QUEUE (AMBER)', highlight: true },
          { label: 'Confidence Score', value: '68.4%' },
          { label: 'Routing Reason', value: 'Ambiguous split between erection & bolting' },
          { label: 'Priority Level', value: 'Medium' },
        ],
      },
      {
        title: 'Stage 9: Human-in-the-Loop Review',
        subtitle: 'Priya Sharma (Planner) validates and approves actual start date',
        explanation: 'Planner accepts actual start date of 27-Sep and sets Remaining Duration to 2 days.',
        status: 'success',
        details: [
          { label: 'Reviewer', value: 'Priya Sharma (Planning Engineer)' },
          { label: 'Action Taken', value: 'APPROVED WITH ADJUSTMENT', highlight: true },
          { label: 'Planner Note', value: 'Confirmed erection done. Bolting queued for tomorrow.' },
          { label: 'Review Latency', value: '14 minutes from ingest' },
        ],
      },
      {
        title: 'Stage 10: Immutable Audit Ledger',
        subtitle: 'Ledger records human review override decision alongside AI suggestion',
        explanation: 'Audits both the AI candidate score (0.684) and Planner sign-off digital signature.',
        status: 'success',
        details: [
          { label: 'Audit Sequence', value: '#10485', highlight: true },
          { label: 'Action Category', value: 'HUMAN_APPROVAL_POST_INSPECTION' },
          { label: 'Signer Public Key', value: '0x88f2...b109' },
          { label: 'Hash Verification', value: 'VALID & VERIFIED' },
        ],
      },
      {
        title: 'Stage 11: P6 / XER Write-Back Export',
        subtitle: 'Formatted into Primavera P6 TASK record with In-Progress status',
        explanation: 'Writes `status_code=TK_Active` and `remain_durn_hr_cnt=16`.',
        status: 'success',
        details: [
          { label: 'P6 Activity Code', value: 'ACT-EP-2081' },
          { label: 'P6 Status', value: 'TK_Active (In Progress)' },
          { label: 'Percent Complete', value: '70.0%' },
          { label: 'Staging Status', value: 'APPROVED FOR WRITE-BACK', highlight: true },
        ],
      },
      {
        title: 'Stage 12: Execution Memory Learning',
        subtitle: 'Records split activity pattern to improve future piping spool recommendations',
        explanation: 'System learns that field crews frequently bundle fit-up with erection for 12-inch racks.',
        status: 'success',
        details: [
          { label: 'Memory Pattern ID', value: 'PAT-PIP-SPOOL-SPLIT-01' },
          { label: 'Adjustment', value: 'Prompt field supervisor next time for torque status' },
          { label: 'Model Confidence Bias', value: '+0.08 on next 12" spool' },
          { label: 'Knowledge Graph Updated', value: 'YES' },
        ],
      },
    ],
  },
];

export function PipelineDemoPage() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'audit'>('visual');

  const scenario = DEMO_SCENARIOS[selectedScenarioIndex];
  const activeStage = scenario.stages[currentStageIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      const delay = (2400 / playbackSpeed);
      timer = setTimeout(() => {
        if (currentStageIndex < scenario.stages.length - 1) {
          setCurrentStageIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          addToast('Full pipeline simulation completed successfully!', 'success');
        }
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStageIndex, scenario.stages.length, playbackSpeed, addToast]);

  const handleScenarioChange = (index: number) => {
    setSelectedScenarioIndex(index);
    setCurrentStageIndex(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStageIndex < scenario.stages.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStageIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-navy-700 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-300">
                <Sparkles size={18} />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-accent-400">Core Architecture Interactive Walkthrough</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">KarmSetu End-to-End Progress Pipeline</h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              "The field speaks. The plan listens." Experience the live 12-stage transformation from noisy, unstructured field communication to mathematically verified Primavera P6 schedule actuals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
            >
              Back to Landing
            </button>
            <button
              type="button"
              onClick={() => navigate('/writeback')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent-600 hover:bg-accent-500 text-white shadow-lg shadow-accent-600/30 transition-all flex items-center gap-1.5"
            >
              <span>Write-back Center</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Selector & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Scenario Selection Cards */}
        <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3">
          {DEMO_SCENARIOS.map((sc, idx) => {
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleScenarioChange(idx)}
                className={`flex-1 text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-navy-900 border-accent-500/60 shadow-lg shadow-accent-500/10'
                    : 'bg-navy-900/50 border-navy-800 hover:bg-navy-900/80 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{sc.discipline}</span>
                </div>
                <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {sc.name}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {sc.rawFieldReport.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Playback Controls */}
        <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
            <span className="font-semibold text-white">Pipeline Execution Controls</span>
            <span className="font-mono text-accent-400">Stage {currentStageIndex + 1} / {scenario.stages.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Auto Simulate'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStageIndex === 0}
              className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 disabled:opacity-40 text-slate-300 border border-navy-700"
              title="Previous Step"
            >
              <RotateCcw size={14} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentStageIndex === scenario.stages.length - 1}
              className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 disabled:opacity-40 text-slate-300 border border-navy-700"
              title="Next Step"
            >
              <FastForward size={14} />
            </button>

            <div className="flex items-center bg-navy-950 rounded-lg p-0.5 border border-navy-800">
              {([1, 2, 4] as const).map(speed => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-1 text-[10px] font-bold rounded ${
                    playbackSpeed === speed
                      ? 'bg-accent-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Raw Field Report Ingest Preview */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-ping" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Raw Field Input (Messy Origin)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {scenario.rawFieldReport.source} · {scenario.rawFieldReport.author} · {scenario.rawFieldReport.time}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-navy-950/80 border border-navy-800/80 font-mono text-xs text-amber-200/90 leading-relaxed">
          "{scenario.rawFieldReport.text}"
        </div>
      </div>

      {/* Horizontal Pipeline Steps Ribbon */}
      <div className="relative overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-[980px]">
          {scenario.stages.map((st, i) => {
            const isCurrent = currentStageIndex === i;
            const isCompleted = currentStageIndex > i;
            return (
              <button
                key={st.title}
                type="button"
                onClick={() => {
                  setCurrentStageIndex(i);
                  setIsPlaying(false);
                }}
                className={`flex-1 text-left p-3 rounded-xl border transition-all duration-300 relative ${
                  isCurrent
                    ? 'bg-accent-600/20 border-accent-500 shadow-lg shadow-accent-500/20 scale-105 z-10'
                    : isCompleted
                    ? 'bg-navy-900/90 border-emerald-500/30 text-slate-300 hover:bg-navy-800'
                    : 'bg-navy-900/40 border-navy-800 text-slate-500 hover:bg-navy-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-mono font-bold">
                    {i + 1}.
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                  ) : null}
                </div>
                <div className={`text-xs font-bold truncate ${
                  isCurrent ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-400'
                }`}>
                  {st.title.split(':')[1]?.trim() || st.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Card */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-700 shadow-2xl space-y-6">
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-accent-400">
              <span>STEP {currentStageIndex + 1} OF {scenario.stages.length}</span>
              <span>·</span>
              <span className="uppercase text-emerald-400 font-semibold">{activeStage.status}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{activeStage.title}</h2>
            <p className="text-xs text-slate-300 mt-0.5">{activeStage.subtitle}</p>
          </div>

          {/* Tab switchers */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-950 border border-navy-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'visual' ? 'bg-accent-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual Analysis
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'code' ? 'bg-accent-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Engine Payload JSON
            </button>
          </div>
        </div>

        {/* Tab Content: Visual View */}
        {activeTab === 'visual' && (
          <div className="space-y-5">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeStage.details.map(d => (
                <div
                  key={d.label}
                  className={`p-4 rounded-xl border ${
                    d.highlight
                      ? 'bg-accent-600/10 border-accent-500/40 shadow-md'
                      : 'bg-navy-950/60 border-navy-800'
                  }`}
                >
                  <div className="text-[11px] text-slate-400 font-medium">{d.label}</div>
                  <div className={`text-sm font-bold mt-1 font-mono ${
                    d.highlight ? 'text-accent-300' : 'text-white'
                  }`}>
                    {d.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation Callout */}
            <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800/80 flex items-start gap-3">
              <Info size={18} className="text-accent-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Algorithmic Rationale &amp; Proof</div>
                <div className="text-xs text-slate-300 mt-1 leading-relaxed">{activeStage.explanation}</div>
              </div>
            </div>

            {/* Stage-Specific Visual Showcase */}
            {currentStageIndex === 5 && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-navy-950 to-navy-900 border border-accent-500/30">
                <div className="text-xs font-bold text-accent-300 uppercase tracking-wider mb-3">
                  Schedule-Aware Bayesian Weighting Matrix
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-navy-900 border border-navy-800">
                    <div className="text-lg font-bold text-white font-mono">0.94</div>
                    <div className="text-[10px] text-slate-400 mt-1">NLP Cosine Similarity</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-900 border border-navy-800">
                    <div className="text-lg font-bold text-emerald-400 font-mono">1.00</div>
                    <div className="text-[10px] text-slate-400 mt-1">Predecessor Complete</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-900 border border-navy-800">
                    <div className="text-lg font-bold text-accent-400 font-mono">0.98</div>
                    <div className="text-[10px] text-slate-400 mt-1">Spatial Co-location</div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-600/20 border border-emerald-500/40">
                    <div className="text-lg font-bold text-emerald-300 font-mono">0.962</div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-semibold">Posterior P(Act|Claim)</div>
                  </div>
                </div>
              </div>
            )}

            {currentStageIndex === 10 && (
              <div className="p-4 rounded-xl bg-navy-950 border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
                  <span>Generated Primavera P6 Native XER Batch Output</span>
                  <span className="font-mono text-[10px] text-slate-400">TABLE: %T TASK</span>
                </div>
                <div className="p-3 rounded-lg bg-black/60 font-mono text-xs text-emerald-300/90 overflow-x-auto whitespace-pre">
                  {`%T TASK\n%F task_id task_code actv_code task_name status_code act_start_date act_end_date\n49281 ACT-EP-1042 ACT-EP-1042 Pour Foundation Concrete P-101A TK_Complete 2026-09-26 08:00 2026-09-28 17:30`}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Code View */}
        {activeTab === 'code' && (
          <div className="relative">
            <pre className="p-4 rounded-xl bg-navy-950 border border-navy-800 font-mono text-xs text-accent-200 overflow-x-auto leading-relaxed">
              {activeStage.codeSnippet || '// No raw JSON payload required for this stage.'}
            </pre>
          </div>
        )}

        {/* Next / Previous Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-navy-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStageIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 disabled:opacity-40 text-slate-200 border border-navy-700"
          >
            ← Previous Stage
          </button>

          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Step {currentStageIndex + 1} of {scenario.stages.length}: {activeStage.title.split(':')[1] || activeStage.title}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStageIndex === scenario.stages.length - 1}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent-600 hover:bg-accent-500 disabled:opacity-40 text-white shadow-lg shadow-accent-600/20"
          >
            Next Stage →
          </button>
        </div>
      </div>

      {/* Deep Link Quick Jump to Related Subsystems */}
      <div className="p-5 rounded-2xl bg-navy-900/60 border border-navy-800">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
          Explore Corresponding Specialized Platform Modules
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => navigate('/review')}
            className="p-3 rounded-xl bg-navy-900 border border-navy-800 hover:border-accent-500/50 text-left transition-colors"
          >
            <div className="text-xs font-bold text-white">Review Queue</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Stage 8 &amp; 9 Human Safeguards</div>
          </button>
          <button
            type="button"
            onClick={() => navigate('/scope-graph')}
            className="p-3 rounded-xl bg-navy-900 border border-navy-800 hover:border-accent-500/50 text-left transition-colors"
          >
            <div className="text-xs font-bold text-white">Scope Graph</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Stage 4 Physical Canonical Tags</div>
          </button>
          <button
            type="button"
            onClick={() => navigate('/audit')}
            className="p-3 rounded-xl bg-navy-900 border border-navy-800 hover:border-accent-500/50 text-left transition-colors"
          >
            <div className="text-xs font-bold text-white">Audit Ledger</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Stage 10 SHA-256 Provenance</div>
          </button>
          <button
            type="button"
            onClick={() => navigate('/writeback')}
            className="p-3 rounded-xl bg-navy-900 border border-navy-800 hover:border-accent-500/50 text-left transition-colors"
          >
            <div className="text-xs font-bold text-white">P6 Write-back</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Stage 11 XER / CSV Export</div>
          </button>
        </div>
      </div>
    </div>
  );
}
