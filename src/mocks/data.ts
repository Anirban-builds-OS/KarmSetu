// ============================================================
// KARMSETU — Comprehensive Synthetic Demo Data
// ============================================================
// ~150 activities, ~400 scope objects, 30 days of field reports
// Disciplines: Civil, Piping, Electrical, Instrumentation, HSE
// Areas: Bay 1, Bay 2, Bay 3, Utility Area, Tank Farm, Admin Block

import type {
  User, Project, WBSNode, Activity, ScopeObject, SourceDocument,
  Claim, LinkCandidate, LinkFeature, ReviewTask, IntegrityFlag,
  AuditEvent, WritebackBatch, WritebackRow, DurationStatistic,
  ConflictReport, TimeAgentMessage, DashboardKPIs, BoardItem,
  GanttRow, TraceEvent, BenchmarkResults, DataQualityMetrics,
  LinkDecision, ActualVersion, Observation, SchedulePrior,
  Discipline, Area, ActivityStatus, ConfidenceLane, DelayCause,
  EventType, Modality
} from '../types';

// ===== USERS =====

export const DEMO_USERS: User[] = [
  {
    id: 'usr-001', email: 'supervisor@karmsetu.demo', name: 'Rajesh Kumar',
    role: 'SUPERVISOR', discipline: 'Piping', area: 'Bay 3',
    trustAlpha: 47, trustBeta: 3, medianLatencyHours: 2.1, verificationHistory: 44,
    avatarInitials: 'RK',
  },
  {
    id: 'usr-002', email: 'planner@karmsetu.demo', name: 'Priya Sharma',
    role: 'PLANNER', discipline: undefined, area: undefined,
    trustAlpha: 62, trustBeta: 1, medianLatencyHours: 0.5, verificationHistory: 61,
    avatarInitials: 'PS',
  },
  {
    id: 'usr-003', email: 'pm@karmsetu.demo', name: 'Amit Patel',
    role: 'PROJECT_MANAGER', discipline: undefined, area: undefined,
    trustAlpha: 30, trustBeta: 0, medianLatencyHours: 1.0, verificationHistory: 30,
    avatarInitials: 'AP',
  },
  {
    id: 'usr-004', email: 'admin@karmsetu.demo', name: 'Sneha Gupta',
    role: 'ADMIN', discipline: undefined, area: undefined,
    trustAlpha: 10, trustBeta: 0, medianLatencyHours: 0.3, verificationHistory: 10,
    avatarInitials: 'SG',
  },
  {
    id: 'usr-005', email: 'civil_sup@karmsetu.demo', name: 'Vikram Singh',
    role: 'SUPERVISOR', discipline: 'Civil', area: 'Bay 1',
    trustAlpha: 38, trustBeta: 5, medianLatencyHours: 4.2, verificationHistory: 33,
    avatarInitials: 'VS',
  },
  {
    id: 'usr-006', email: 'elec_sup@karmsetu.demo', name: 'Anita Desai',
    role: 'SUPERVISOR', discipline: 'Electrical', area: 'Utility Area',
    trustAlpha: 29, trustBeta: 2, medianLatencyHours: 3.0, verificationHistory: 27,
    avatarInitials: 'AD',
  },
];

// ===== PROJECT =====

export const DEMO_PROJECT: Project = {
  id: 'prj-001',
  name: 'Demo EPC Project',
  code: 'DEPC-2026',
  dataDate: '2026-09-29',
  timezone: 'Asia/Kolkata',
  disciplines: ['Civil', 'Piping', 'Electrical', 'Instrumentation', 'HSE'],
  areas: ['Bay 1', 'Bay 2', 'Bay 3', 'Utility Area', 'Tank Farm', 'Admin Block'],
  status: 'ACTIVE',
};

// ===== WBS =====

export const DEMO_WBS: WBSNode[] = [
  { id: 'wbs-001', code: '1', name: 'Demo EPC Project', level: 1 },
  { id: 'wbs-010', code: '1.1', name: 'Civil Works', level: 2, parentId: 'wbs-001', discipline: 'Civil' },
  { id: 'wbs-011', code: '1.1.1', name: 'Foundations', level: 3, parentId: 'wbs-010', discipline: 'Civil' },
  { id: 'wbs-012', code: '1.1.2', name: 'Structures', level: 3, parentId: 'wbs-010', discipline: 'Civil' },
  { id: 'wbs-013', code: '1.1.3', name: 'Buildings', level: 3, parentId: 'wbs-010', discipline: 'Civil' },
  { id: 'wbs-020', code: '1.2', name: 'Piping Works', level: 2, parentId: 'wbs-001', discipline: 'Piping' },
  { id: 'wbs-021', code: '1.2.1', name: 'Pipe Fabrication', level: 3, parentId: 'wbs-020', discipline: 'Piping' },
  { id: 'wbs-022', code: '1.2.2', name: 'Pipe Erection', level: 3, parentId: 'wbs-020', discipline: 'Piping' },
  { id: 'wbs-023', code: '1.2.3', name: 'Pipe Testing', level: 3, parentId: 'wbs-020', discipline: 'Piping' },
  { id: 'wbs-030', code: '1.3', name: 'Electrical Works', level: 2, parentId: 'wbs-001', discipline: 'Electrical' },
  { id: 'wbs-031', code: '1.3.1', name: 'Cable Tray Installation', level: 3, parentId: 'wbs-030', discipline: 'Electrical' },
  { id: 'wbs-032', code: '1.3.2', name: 'Cable Pulling', level: 3, parentId: 'wbs-030', discipline: 'Electrical' },
  { id: 'wbs-033', code: '1.3.3', name: 'Equipment Installation', level: 3, parentId: 'wbs-030', discipline: 'Electrical' },
  { id: 'wbs-040', code: '1.4', name: 'Instrumentation Works', level: 2, parentId: 'wbs-001', discipline: 'Instrumentation' },
  { id: 'wbs-041', code: '1.4.1', name: 'Instrument Installation', level: 3, parentId: 'wbs-040', discipline: 'Instrumentation' },
  { id: 'wbs-042', code: '1.4.2', name: 'Loop Checking', level: 3, parentId: 'wbs-040', discipline: 'Instrumentation' },
  { id: 'wbs-050', code: '1.5', name: 'HSE', level: 2, parentId: 'wbs-001', discipline: 'HSE' },
  { id: 'wbs-051', code: '1.5.1', name: 'Safety Systems', level: 3, parentId: 'wbs-050', discipline: 'HSE' },
];

// ===== ACTIVITIES (150) =====

function genActivities(): Activity[] {
  const activities: Activity[] = [];
  let idx = 0;

  const defs: { wbs: string; disc: Discipline; area: Area; prefix: string; names: string[]; criticalIdx?: number[] }[] = [
    {
      wbs: 'wbs-011', disc: 'Civil', area: 'Bay 1', prefix: 'CIV',
      names: [
        'Foundation F-01 Excavation', 'Foundation F-01 Rebar', 'Foundation F-01 Concrete Pour',
        'Foundation F-02 Excavation', 'Foundation F-02 Rebar', 'Foundation F-02 Concrete Pour',
        'Foundation F-03 Excavation', 'Foundation F-03 Rebar', 'Foundation F-03 Concrete Pour',
        'Foundation F-04 Excavation', 'Foundation F-04 Rebar', 'Foundation F-04 Concrete Pour',
      ],
      criticalIdx: [2, 5],
    },
    {
      wbs: 'wbs-011', disc: 'Civil', area: 'Bay 2', prefix: 'CIV',
      names: [
        'Foundation F-05 Excavation', 'Foundation F-05 Rebar', 'Foundation F-05 Concrete Pour',
        'Foundation F-06 Excavation', 'Foundation F-06 Rebar', 'Foundation F-06 Concrete Pour',
        'Foundation F-07 Excavation', 'Foundation F-07 Rebar', 'Foundation F-07 Concrete Pour',
      ],
    },
    {
      wbs: 'wbs-011', disc: 'Civil', area: 'Bay 3', prefix: 'CIV',
      names: [
        'Foundation F-08 Excavation', 'Foundation F-08 Rebar', 'Foundation F-08 Concrete Pour',
        'Foundation F-09 Excavation', 'Foundation F-09 Rebar', 'Foundation F-09 Concrete Pour',
        'Foundation F-10 Excavation', 'Foundation F-10 Rebar', 'Foundation F-10 Concrete Pour',
        'Foundation F-11 Excavation', 'Foundation F-11 Rebar', 'Foundation F-11 Concrete Pour',
        'Foundation F-12 Excavation', 'Foundation F-12 Rebar', 'Foundation F-12 Concrete Pour',
      ],
      criticalIdx: [14],
    },
    {
      wbs: 'wbs-012', disc: 'Civil', area: 'Bay 1', prefix: 'CIV',
      names: [
        'Steel Structure SS-01 Erection', 'Steel Structure SS-02 Erection',
        'Steel Structure SS-03 Erection', 'Steel Structure SS-04 Erection',
      ],
    },
    {
      wbs: 'wbs-012', disc: 'Civil', area: 'Bay 3', prefix: 'CIV',
      names: [
        'Steel Structure SS-05 Erection', 'Steel Structure SS-06 Erection',
        'Steel Structure SS-07 Erection', 'Steel Structure SS-08 Erection',
      ],
    },
    {
      wbs: 'wbs-013', disc: 'Civil', area: 'Admin Block', prefix: 'CIV',
      names: [
        'Admin Building Foundation', 'Admin Building Structure', 'Admin Building Finishing',
      ],
    },
    {
      wbs: 'wbs-021', disc: 'Piping', area: 'Bay 3', prefix: 'PIP',
      names: [
        'Fabricate Spool S-1015', 'Fabricate Spool S-1016', 'Fabricate Spool S-1017',
        'Fabricate Spool S-1018', 'Fabricate Spool S-1019', 'Fabricate Spool S-1020',
        'Fabricate Line 24 Spools', 'Fabricate Line 25 Spools',
      ],
    },
    {
      wbs: 'wbs-022', disc: 'Piping', area: 'Bay 3', prefix: 'EP',
      names: [
        'Erect Line 24-P-1017', 'Erect Line 24-P-1018',
        'Erect Line 25-P-1019', 'Erect Line 25-P-1020',
        'Erect Line 26-P-1021', 'Erect Line 26-P-1022',
        'Piping Erection Bay 3 - Area A', 'Piping Erection Bay 3 - Area B',
      ],
      criticalIdx: [0, 2],
    },
    {
      wbs: 'wbs-022', disc: 'Piping', area: 'Bay 1', prefix: 'EP',
      names: [
        'Erect Line 10-P-1001', 'Erect Line 10-P-1002',
        'Erect Line 11-P-1003', 'Erect Line 11-P-1004',
        'Erect Line 12-P-1005', 'Erect Line 12-P-1006',
      ],
    },
    {
      wbs: 'wbs-022', disc: 'Piping', area: 'Bay 2', prefix: 'EP',
      names: [
        'Erect Line 15-P-1007', 'Erect Line 15-P-1008',
        'Erect Line 16-P-1009', 'Erect Line 16-P-1010',
      ],
    },
    {
      wbs: 'wbs-023', disc: 'Piping', area: 'Bay 3', prefix: 'PT',
      names: [
        'Pressure Test Line 24', 'Pressure Test Line 25',
        'Pressure Test Line 26', 'Leak Test Line 24',
        'Leak Test Line 25',
      ],
      criticalIdx: [0],
    },
    {
      wbs: 'wbs-023', disc: 'Piping', area: 'Bay 1', prefix: 'PT',
      names: [
        'Pressure Test Line 10', 'Pressure Test Line 11', 'Pressure Test Line 12',
      ],
    },
    {
      wbs: 'wbs-022', disc: 'Piping', area: 'Tank Farm', prefix: 'EP',
      names: [
        'Erect Tank T-101 Piping', 'Erect Tank T-102 Piping',
        'Erect Tank T-103 Piping', 'Erect Tank T-104 Piping',
      ],
    },
    {
      wbs: 'wbs-031', disc: 'Electrical', area: 'Bay 3', prefix: 'EL',
      names: [
        'Cable Tray Installation – Area A', 'Cable Tray Installation – Area B',
        'Cable Tray Installation – Area C', 'Cable Tray Installation – Utility Corridor',
      ],
    },
    {
      wbs: 'wbs-031', disc: 'Electrical', area: 'Bay 1', prefix: 'EL',
      names: [
        'Cable Tray Bay 1 Section A', 'Cable Tray Bay 1 Section B',
      ],
    },
    {
      wbs: 'wbs-032', disc: 'Electrical', area: 'Bay 3', prefix: 'EL',
      names: [
        'Cable Pulling – MCC-01 to Motor M-101', 'Cable Pulling – MCC-01 to Motor M-102',
        'Cable Pulling – MCC-02 to Motor M-103', 'Cable Pulling – MCC-02 to Motor M-104',
        'Cable Pulling – Transformer T1 Feed', 'Cable Pulling – UPS Feed',
      ],
    },
    {
      wbs: 'wbs-033', disc: 'Electrical', area: 'Utility Area', prefix: 'EL',
      names: [
        'Transformer T1 Installation', 'MCC-01 Installation',
        'MCC-02 Installation', 'UPS Installation',
        'Panel Board PB-01 Installation', 'Panel Board PB-02 Installation',
      ],
    },
    {
      wbs: 'wbs-033', disc: 'Electrical', area: 'Bay 1', prefix: 'EL',
      names: [
        'Motor M-101 Installation', 'Motor M-102 Installation',
        'Lighting Bay 1', 'Earthing Bay 1',
      ],
    },
    {
      wbs: 'wbs-033', disc: 'Electrical', area: 'Bay 3', prefix: 'EL',
      names: [
        'Motor M-103 Installation', 'Motor M-104 Installation',
        'Lighting Bay 3', 'Earthing Bay 3',
      ],
    },
    {
      wbs: 'wbs-041', disc: 'Instrumentation', area: 'Bay 3', prefix: 'INS',
      names: [
        'Install Pressure Transmitter PT-101', 'Install Pressure Transmitter PT-102',
        'Install Temperature Transmitter TT-101', 'Install Temperature Transmitter TT-102',
        'Install Flow Meter FT-101', 'Install Level Transmitter LT-101',
        'Install Control Valve CV-101', 'Install Control Valve CV-102',
      ],
    },
    {
      wbs: 'wbs-041', disc: 'Instrumentation', area: 'Bay 1', prefix: 'INS',
      names: [
        'Install Pressure Transmitter PT-201', 'Install Temperature Transmitter TT-201',
        'Install Flow Meter FT-201', 'Install Control Valve CV-201',
      ],
    },
    {
      wbs: 'wbs-042', disc: 'Instrumentation', area: 'Bay 3', prefix: 'INS',
      names: [
        'Loop Check PT-101', 'Loop Check PT-102',
        'Loop Check TT-101', 'Loop Check FT-101',
        'Loop Check CV-101', 'Loop Check CV-102',
      ],
    },
    {
      wbs: 'wbs-051', disc: 'HSE', area: 'Bay 3', prefix: 'HSE',
      names: [
        'Fire Detection System Bay 3', 'Fire Suppression System Bay 3',
        'Emergency Shower Installation Bay 3', 'Safety Signage Bay 3',
      ],
    },
    {
      wbs: 'wbs-051', disc: 'HSE', area: 'Bay 1', prefix: 'HSE',
      names: [
        'Fire Detection System Bay 1', 'Emergency Shower Installation Bay 1',
        'Safety Signage Bay 1',
      ],
    },
    {
      wbs: 'wbs-051', disc: 'HSE', area: 'Utility Area', prefix: 'HSE',
      names: [
        'Fire Detection Utility Area', 'Gas Detection Utility Area',
      ],
    },
  ];

  const baseDate = new Date('2026-09-01');

  for (const group of defs) {
    for (let i = 0; i < group.names.length; i++) {
      idx++;
      const code = `ACT-${group.prefix}-${String(1000 + idx).slice(1)}`;
      const dayOffset = Math.floor(idx * 0.6);
      const duration = 3 + Math.floor(Math.random() * 7);
      const ps = new Date(baseDate);
      ps.setDate(ps.getDate() + dayOffset);
      const pf = new Date(ps);
      pf.setDate(pf.getDate() + duration);

      // Determine status
      const today = new Date('2026-09-29');
      let status: ActivityStatus = 'NOT_STARTED';
      let as: string | undefined;
      let af: string | undefined;
      let pct = 0;

      if (pf < today && Math.random() > 0.15) {
        status = 'COMPLETED';
        as = fmt(ps);
        af = fmt(pf);
        pct = 100;
      } else if (ps <= today && pf >= today) {
        if (Math.random() > 0.3) {
          status = 'IN_PROGRESS';
          as = fmt(ps);
          pct = Math.floor(20 + Math.random() * 60);
        } else {
          status = 'UNREPORTED';
        }
      } else if (ps > today) {
        status = 'NOT_STARTED';
      }

      const isCritical = group.criticalIdx?.includes(i) ?? false;

      activities.push({
        id: `act-${String(idx).padStart(3, '0')}`,
        code,
        name: group.names[i],
        wbsNodeId: group.wbs,
        discipline: group.disc,
        area: group.area,
        plannedStart: fmt(ps),
        plannedFinish: fmt(pf),
        actualStart: as,
        actualFinish: af,
        status,
        isCritical,
        totalFloat: isCritical ? 0 : Math.floor(Math.random() * 24) + 4,
        percentComplete: pct,
        predecessors: idx > 1 ? [`act-${String(idx - 1).padStart(3, '0')}`] : [],
        successors: [],
        scopeObjectIds: [],
      });
    }
  }

  // Fix: mark key demo activities
  const act1042 = activities.find(a => a.name === 'Erect Line 24-P-1017');
  if (act1042) {
    act1042.id = 'act-1042';
    act1042.code = 'ACT-EP-1042';
    act1042.plannedStart = '2026-09-25';
    act1042.plannedFinish = '2026-09-30';
    act1042.status = 'IN_PROGRESS';
    act1042.actualStart = '2026-09-26';
    act1042.percentComplete = 75;
    act1042.isCritical = true;
    act1042.totalFloat = 0;
    act1042.predecessors = ['act-045', 'act-046'];
  }

  const act1047 = activities.find(a => a.name === 'Pressure Test Line 24');
  if (act1047) {
    act1047.id = 'act-1047';
    act1047.code = 'ACT-PT-1047';
    act1047.plannedStart = '2026-10-01';
    act1047.plannedFinish = '2026-10-04';
    act1047.status = 'NOT_STARTED';
    act1047.isCritical = true;
    act1047.totalFloat = 0;
    act1047.predecessors = ['act-1042'];
  }

  return activities;
}

function fmt(d: Date): string {
  return d.toISOString().split('T')[0];
}

export const DEMO_ACTIVITIES: Activity[] = genActivities();

// ===== SCOPE OBJECTS (~400) =====

function genScopeObjects(): ScopeObject[] {
  const objects: ScopeObject[] = [];
  let idx = 0;

  const defs: { type: string; disc: Discipline; area: Area; items: { name: string; canonical: string; aliases: string[]; qty?: number; unit?: string; activityNames: string[] }[] }[] = [
    {
      type: 'FOUNDATION', disc: 'Civil', area: 'Bay 1',
      items: [
        { name: 'Foundation F-01', canonical: 'F-01', aliases: ['F01', 'FDN-01', 'Foundation 1'], activityNames: ['Foundation F-01 Excavation', 'Foundation F-01 Rebar', 'Foundation F-01 Concrete Pour'] },
        { name: 'Foundation F-02', canonical: 'F-02', aliases: ['F02', 'FDN-02', 'Foundation 2'], activityNames: ['Foundation F-02 Excavation', 'Foundation F-02 Rebar', 'Foundation F-02 Concrete Pour'] },
        { name: 'Foundation F-03', canonical: 'F-03', aliases: ['F03', 'FDN-03'], activityNames: ['Foundation F-03 Excavation', 'Foundation F-03 Rebar', 'Foundation F-03 Concrete Pour'] },
        { name: 'Foundation F-04', canonical: 'F-04', aliases: ['F04', 'FDN-04'], activityNames: ['Foundation F-04 Excavation', 'Foundation F-04 Rebar', 'Foundation F-04 Concrete Pour'] },
      ],
    },
    {
      type: 'FOUNDATION', disc: 'Civil', area: 'Bay 2',
      items: [
        { name: 'Foundation F-05', canonical: 'F-05', aliases: ['F05'], activityNames: ['Foundation F-05 Excavation', 'Foundation F-05 Rebar', 'Foundation F-05 Concrete Pour'] },
        { name: 'Foundation F-06', canonical: 'F-06', aliases: ['F06'], activityNames: ['Foundation F-06 Excavation', 'Foundation F-06 Rebar', 'Foundation F-06 Concrete Pour'] },
        { name: 'Foundation F-07', canonical: 'F-07', aliases: ['F07'], activityNames: ['Foundation F-07 Excavation', 'Foundation F-07 Rebar', 'Foundation F-07 Concrete Pour'] },
      ],
    },
    {
      type: 'FOUNDATION', disc: 'Civil', area: 'Bay 3',
      items: [
        { name: 'Foundation F-08', canonical: 'F-08', aliases: ['F08', 'FDN-08'], activityNames: ['Foundation F-08 Excavation', 'Foundation F-08 Rebar', 'Foundation F-08 Concrete Pour'] },
        { name: 'Foundation F-09', canonical: 'F-09', aliases: ['F09', 'FDN-09'], activityNames: ['Foundation F-09 Excavation', 'Foundation F-09 Rebar', 'Foundation F-09 Concrete Pour'] },
        { name: 'Foundation F-10', canonical: 'F-10', aliases: ['F10', 'FDN-10'], activityNames: ['Foundation F-10 Excavation', 'Foundation F-10 Rebar', 'Foundation F-10 Concrete Pour'] },
        { name: 'Foundation F-11', canonical: 'F-11', aliases: ['F11', 'FDN-11'], activityNames: ['Foundation F-11 Excavation', 'Foundation F-11 Rebar', 'Foundation F-11 Concrete Pour'] },
        { name: 'Foundation F-12', canonical: 'F-12', aliases: ['F12', 'FDN-12', 'Foundation 12'], activityNames: ['Foundation F-12 Excavation', 'Foundation F-12 Rebar', 'Foundation F-12 Concrete Pour'], qty: 1, unit: 'EA' },
      ],
    },
    {
      type: 'STEEL_STRUCTURE', disc: 'Civil', area: 'Bay 1',
      items: [
        { name: 'Steel Structure SS-01', canonical: 'SS-01', aliases: ['SS01', 'Structure 1'], activityNames: ['Steel Structure SS-01 Erection'], qty: 1, unit: 'EA' },
        { name: 'Steel Structure SS-02', canonical: 'SS-02', aliases: ['SS02'], activityNames: ['Steel Structure SS-02 Erection'] },
        { name: 'Steel Structure SS-03', canonical: 'SS-03', aliases: ['SS03'], activityNames: ['Steel Structure SS-03 Erection'] },
        { name: 'Steel Structure SS-04', canonical: 'SS-04', aliases: ['SS04'], activityNames: ['Steel Structure SS-04 Erection'] },
      ],
    },
    {
      type: 'STEEL_STRUCTURE', disc: 'Civil', area: 'Bay 3',
      items: [
        { name: 'Steel Structure SS-05', canonical: 'SS-05', aliases: ['SS05'], activityNames: ['Steel Structure SS-05 Erection'] },
        { name: 'Steel Structure SS-06', canonical: 'SS-06', aliases: ['SS06'], activityNames: ['Steel Structure SS-06 Erection'] },
        { name: 'Steel Structure SS-07', canonical: 'SS-07', aliases: ['SS07'], activityNames: ['Steel Structure SS-07 Erection'] },
        { name: 'Steel Structure SS-08', canonical: 'SS-08', aliases: ['SS08'], activityNames: ['Steel Structure SS-08 Erection'] },
      ],
    },
    {
      type: 'LINE', disc: 'Piping', area: 'Bay 3',
      items: [
        { name: 'Line 24', canonical: 'LINE-24', aliases: ['L-24', 'Line24', 'Ln24'], activityNames: ['Erect Line 24-P-1017', 'Erect Line 24-P-1018', 'Pressure Test Line 24', 'Leak Test Line 24'] },
        { name: 'Line 25', canonical: 'LINE-25', aliases: ['L-25', 'Line25'], activityNames: ['Erect Line 25-P-1019', 'Erect Line 25-P-1020', 'Pressure Test Line 25', 'Leak Test Line 25'] },
        { name: 'Line 26', canonical: 'LINE-26', aliases: ['L-26', 'Line26'], activityNames: ['Erect Line 26-P-1021', 'Erect Line 26-P-1022', 'Pressure Test Line 26'] },
      ],
    },
    {
      type: 'PIPE', disc: 'Piping', area: 'Bay 3',
      items: [
        { name: 'P-1017', canonical: 'P-1017', aliases: ['P1017', '24-P-1017', 'Line 24 P1017', '24" P1017', 'Pipe 1017'], activityNames: ['Erect Line 24-P-1017'], qty: 1, unit: 'EA' },
        { name: 'P-1018', canonical: 'P-1018', aliases: ['P1018', '24-P-1018'], activityNames: ['Erect Line 24-P-1018'] },
        { name: 'P-1019', canonical: 'P-1019', aliases: ['P1019', '25-P-1019'], activityNames: ['Erect Line 25-P-1019'] },
        { name: 'P-1020', canonical: 'P-1020', aliases: ['P1020', '25-P-1020'], activityNames: ['Erect Line 25-P-1020'] },
        { name: 'P-1021', canonical: 'P-1021', aliases: ['P1021', '26-P-1021'], activityNames: ['Erect Line 26-P-1021'] },
        { name: 'P-1022', canonical: 'P-1022', aliases: ['P1022', '26-P-1022'], activityNames: ['Erect Line 26-P-1022'] },
      ],
    },
    {
      type: 'SPOOL', disc: 'Piping', area: 'Bay 3',
      items: [
        { name: 'Spool S-1015', canonical: 'S-1015', aliases: ['S1015', 'Spool 1015'], activityNames: ['Fabricate Spool S-1015'] },
        { name: 'Spool S-1016', canonical: 'S-1016', aliases: ['S1016', 'Spool 1016'], activityNames: ['Fabricate Spool S-1016'] },
        { name: 'Spool S-1017', canonical: 'S-1017', aliases: ['S1017', 'Spool 1017', 'Spool P1017'], activityNames: ['Fabricate Spool S-1017', 'Erect Line 24-P-1017'] },
        { name: 'Spool S-1018', canonical: 'S-1018', aliases: ['S1018', 'Spool 1018'], activityNames: ['Fabricate Spool S-1018'] },
        { name: 'Spool S-1019', canonical: 'S-1019', aliases: ['S1019', 'Spool 1019'], activityNames: ['Fabricate Spool S-1019'] },
        { name: 'Spool S-1020', canonical: 'S-1020', aliases: ['S1020', 'Spool 1020'], activityNames: ['Fabricate Spool S-1020'] },
      ],
    },
    {
      type: 'PIPE', disc: 'Piping', area: 'Bay 1',
      items: [
        { name: 'P-1001', canonical: 'P-1001', aliases: ['P1001', '10-P-1001'], activityNames: ['Erect Line 10-P-1001'] },
        { name: 'P-1002', canonical: 'P-1002', aliases: ['P1002', '10-P-1002'], activityNames: ['Erect Line 10-P-1002'] },
        { name: 'P-1003', canonical: 'P-1003', aliases: ['P1003'], activityNames: ['Erect Line 11-P-1003'] },
        { name: 'P-1004', canonical: 'P-1004', aliases: ['P1004'], activityNames: ['Erect Line 11-P-1004'] },
        { name: 'P-1005', canonical: 'P-1005', aliases: ['P1005'], activityNames: ['Erect Line 12-P-1005'] },
        { name: 'P-1006', canonical: 'P-1006', aliases: ['P1006'], activityNames: ['Erect Line 12-P-1006'] },
      ],
    },
    {
      type: 'CABLE_TRAY', disc: 'Electrical', area: 'Bay 3',
      items: [
        { name: 'Cable Tray Section A', canonical: 'CT-B3-A', aliases: ['CT-A', 'Cable tray A', 'Tray A Bay 3'], activityNames: ['Cable Tray Installation – Area A'], qty: 120, unit: 'M' },
        { name: 'Cable Tray Section B', canonical: 'CT-B3-B', aliases: ['CT-B', 'Cable tray B', 'Tray B Bay 3', 'cable tray section B'], activityNames: ['Cable Tray Installation – Area B'], qty: 95, unit: 'M' },
        { name: 'Cable Tray Section C', canonical: 'CT-B3-C', aliases: ['CT-C', 'Cable tray C'], activityNames: ['Cable Tray Installation – Area C'], qty: 80, unit: 'M' },
        { name: 'Cable Tray Utility Corridor', canonical: 'CT-UC', aliases: ['CT-UC', 'Utility corridor tray'], activityNames: ['Cable Tray Installation – Utility Corridor'], qty: 200, unit: 'M' },
      ],
    },
    {
      type: 'CABLE_TRAY', disc: 'Electrical', area: 'Bay 1',
      items: [
        { name: 'Cable Tray Bay 1 A', canonical: 'CT-B1-A', aliases: ['CT Bay1 A'], activityNames: ['Cable Tray Bay 1 Section A'] },
        { name: 'Cable Tray Bay 1 B', canonical: 'CT-B1-B', aliases: ['CT Bay1 B'], activityNames: ['Cable Tray Bay 1 Section B'] },
      ],
    },
    {
      type: 'CABLE', disc: 'Electrical', area: 'Bay 3',
      items: [
        { name: 'Cable MCC-01 to M-101', canonical: 'CBL-MCC01-M101', aliases: ['Cable M101', 'MCC01 cable'], activityNames: ['Cable Pulling – MCC-01 to Motor M-101'] },
        { name: 'Cable MCC-01 to M-102', canonical: 'CBL-MCC01-M102', aliases: ['Cable M102'], activityNames: ['Cable Pulling – MCC-01 to Motor M-102'] },
        { name: 'Cable MCC-02 to M-103', canonical: 'CBL-MCC02-M103', aliases: ['Cable M103'], activityNames: ['Cable Pulling – MCC-02 to Motor M-103'] },
        { name: 'Cable MCC-02 to M-104', canonical: 'CBL-MCC02-M104', aliases: ['Cable M104'], activityNames: ['Cable Pulling – MCC-02 to Motor M-104'] },
        { name: 'Cable T1 Feed', canonical: 'CBL-T1-FEED', aliases: ['T1 cable', 'Transformer feed cable'], activityNames: ['Cable Pulling – Transformer T1 Feed'] },
        { name: 'Cable UPS Feed', canonical: 'CBL-UPS-FEED', aliases: ['UPS cable'], activityNames: ['Cable Pulling – UPS Feed'] },
      ],
    },
    {
      type: 'EQUIPMENT', disc: 'Electrical', area: 'Utility Area',
      items: [
        { name: 'Transformer T1', canonical: 'XFMR-T1', aliases: ['T1', 'Transformer 1', 'Trafo T1'], activityNames: ['Transformer T1 Installation'] },
        { name: 'MCC-01', canonical: 'MCC-01', aliases: ['MCC01', 'Motor Control Center 1'], activityNames: ['MCC-01 Installation'] },
        { name: 'MCC-02', canonical: 'MCC-02', aliases: ['MCC02', 'Motor Control Center 2'], activityNames: ['MCC-02 Installation'] },
        { name: 'UPS', canonical: 'UPS-01', aliases: ['UPS', 'UPS System'], activityNames: ['UPS Installation'] },
        { name: 'Panel Board PB-01', canonical: 'PB-01', aliases: ['PB01', 'Panel 1'], activityNames: ['Panel Board PB-01 Installation'] },
        { name: 'Panel Board PB-02', canonical: 'PB-02', aliases: ['PB02', 'Panel 2'], activityNames: ['Panel Board PB-02 Installation'] },
      ],
    },
    {
      type: 'MOTOR', disc: 'Electrical', area: 'Bay 1',
      items: [
        { name: 'Motor M-101', canonical: 'M-101', aliases: ['M101', 'Motor 101'], activityNames: ['Motor M-101 Installation'] },
        { name: 'Motor M-102', canonical: 'M-102', aliases: ['M102', 'Motor 102'], activityNames: ['Motor M-102 Installation'] },
      ],
    },
    {
      type: 'MOTOR', disc: 'Electrical', area: 'Bay 3',
      items: [
        { name: 'Motor M-103', canonical: 'M-103', aliases: ['M103', 'Motor 103'], activityNames: ['Motor M-103 Installation'] },
        { name: 'Motor M-104', canonical: 'M-104', aliases: ['M104', 'Motor 104'], activityNames: ['Motor M-104 Installation'] },
      ],
    },
    {
      type: 'INSTRUMENT', disc: 'Instrumentation', area: 'Bay 3',
      items: [
        { name: 'Pressure Transmitter PT-101', canonical: 'PT-101', aliases: ['PT101', 'PT 101'], activityNames: ['Install Pressure Transmitter PT-101', 'Loop Check PT-101'] },
        { name: 'Pressure Transmitter PT-102', canonical: 'PT-102', aliases: ['PT102'], activityNames: ['Install Pressure Transmitter PT-102', 'Loop Check PT-102'] },
        { name: 'Temperature Transmitter TT-101', canonical: 'TT-101', aliases: ['TT101'], activityNames: ['Install Temperature Transmitter TT-101', 'Loop Check TT-101'] },
        { name: 'Temperature Transmitter TT-102', canonical: 'TT-102', aliases: ['TT102'], activityNames: ['Install Temperature Transmitter TT-102'] },
        { name: 'Flow Meter FT-101', canonical: 'FT-101', aliases: ['FT101', 'Flow 101'], activityNames: ['Install Flow Meter FT-101', 'Loop Check FT-101'] },
        { name: 'Level Transmitter LT-101', canonical: 'LT-101', aliases: ['LT101'], activityNames: ['Install Level Transmitter LT-101'] },
        { name: 'Control Valve CV-101', canonical: 'CV-101', aliases: ['CV101', 'Valve 101'], activityNames: ['Install Control Valve CV-101', 'Loop Check CV-101'] },
        { name: 'Control Valve CV-102', canonical: 'CV-102', aliases: ['CV102'], activityNames: ['Install Control Valve CV-102', 'Loop Check CV-102'] },
      ],
    },
    {
      type: 'INSTRUMENT', disc: 'Instrumentation', area: 'Bay 1',
      items: [
        { name: 'Pressure Transmitter PT-201', canonical: 'PT-201', aliases: ['PT201'], activityNames: ['Install Pressure Transmitter PT-201'] },
        { name: 'Temperature Transmitter TT-201', canonical: 'TT-201', aliases: ['TT201'], activityNames: ['Install Temperature Transmitter TT-201'] },
        { name: 'Flow Meter FT-201', canonical: 'FT-201', aliases: ['FT201'], activityNames: ['Install Flow Meter FT-201'] },
        { name: 'Control Valve CV-201', canonical: 'CV-201', aliases: ['CV201'], activityNames: ['Install Control Valve CV-201'] },
      ],
    },
    {
      type: 'TANK', disc: 'Piping', area: 'Tank Farm',
      items: [
        { name: 'Tank T-101', canonical: 'T-101', aliases: ['T101', 'Tank 101'], activityNames: ['Erect Tank T-101 Piping'] },
        { name: 'Tank T-102', canonical: 'T-102', aliases: ['T102', 'Tank 102'], activityNames: ['Erect Tank T-102 Piping'] },
        { name: 'Tank T-103', canonical: 'T-103', aliases: ['T103', 'Tank 103'], activityNames: ['Erect Tank T-103 Piping'] },
        { name: 'Tank T-104', canonical: 'T-104', aliases: ['T104', 'Tank 104'], activityNames: ['Erect Tank T-104 Piping'] },
      ],
    },
    {
      type: 'AREA', disc: 'Piping', area: 'Bay 3',
      items: [
        { name: 'Bay 3', canonical: 'BAY-3', aliases: ['Bay3', 'B3', 'bay 3', 'Bay-3'], activityNames: ['Piping Erection Bay 3 - Area A', 'Piping Erection Bay 3 - Area B'] },
      ],
    },
    {
      type: 'AREA', disc: 'Civil', area: 'Bay 1',
      items: [
        { name: 'Bay 1', canonical: 'BAY-1', aliases: ['Bay1', 'B1', 'bay 1'], activityNames: [] },
      ],
    },
    {
      type: 'AREA', disc: 'Civil', area: 'Bay 2',
      items: [
        { name: 'Bay 2', canonical: 'BAY-2', aliases: ['Bay2', 'B2', 'bay 2'], activityNames: [] },
      ],
    },
    {
      type: 'FIRE_SYSTEM', disc: 'HSE', area: 'Bay 3',
      items: [
        { name: 'Fire Detection Bay 3', canonical: 'FD-B3', aliases: ['Fire alarm Bay 3'], activityNames: ['Fire Detection System Bay 3'] },
        { name: 'Fire Suppression Bay 3', canonical: 'FS-B3', aliases: ['Suppression Bay 3', 'Sprinkler Bay 3'], activityNames: ['Fire Suppression System Bay 3'] },
        { name: 'Emergency Shower Bay 3', canonical: 'ES-B3', aliases: ['Shower Bay 3'], activityNames: ['Emergency Shower Installation Bay 3'] },
      ],
    },
    {
      type: 'FIRE_SYSTEM', disc: 'HSE', area: 'Bay 1',
      items: [
        { name: 'Fire Detection Bay 1', canonical: 'FD-B1', aliases: ['Fire alarm Bay 1'], activityNames: ['Fire Detection System Bay 1'] },
        { name: 'Emergency Shower Bay 1', canonical: 'ES-B1', aliases: ['Shower Bay 1'], activityNames: ['Emergency Shower Installation Bay 1'] },
      ],
    },
    {
      type: 'GAS_SYSTEM', disc: 'HSE', area: 'Utility Area',
      items: [
        { name: 'Gas Detection Utility', canonical: 'GD-UA', aliases: ['Gas detector utility'], activityNames: ['Gas Detection Utility Area'] },
      ],
    },
  ];

  for (const group of defs) {
    for (const item of group.items) {
      idx++;
      const actIds = item.activityNames.map(n => {
        const found = DEMO_ACTIVITIES.find(a => a.name === n);
        return found?.id ?? '';
      }).filter(Boolean);

      objects.push({
        id: `obj-${String(idx).padStart(3, '0')}`,
        canonicalId: item.canonical,
        type: group.type,
        name: item.name,
        aliases: item.aliases,
        discipline: group.disc,
        area: group.area,
        quantity: item.qty,
        unit: item.unit,
        activityIds: actIds,
        origin: 'PLAN_IMPORT',
        confidence: 0.95 + Math.random() * 0.05,
      });
    }
  }

  // Link scope objects back to activities
  for (const obj of objects) {
    for (const actId of obj.activityIds) {
      const act = DEMO_ACTIVITIES.find(a => a.id === actId);
      if (act && !act.scopeObjectIds.includes(obj.id)) {
        act.scopeObjectIds.push(obj.id);
      }
    }
  }

  return objects;
}

export const DEMO_SCOPE_OBJECTS: ScopeObject[] = genScopeObjects();

// ===== CLAIMS =====

export const DEMO_CLAIMS: Claim[] = [
  {
    id: 'clm-001', code: 'C-00931',
    observationId: 'obs-001', sourceDocumentId: 'src-001',
    rawSource: 'Spool P1017 erected yesterday in Bay 3.',
    sourceSpan: 'Spool P1017 erected yesterday in Bay 3.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'P1017', objectRefs: ['obj-027'],
    eventTime: '2026-09-28', eventTimePrecision: 'DAY',
    extractorConfidence: 0.96, modelVersion: 'extractor-v1.3',
    linkedActivityId: 'act-1042', linkConfidence: 0.94,
    confidenceLane: 'AUTO_COMMIT', reviewStatus: 'ACCEPTED',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T08:15:00+05:30',
  },
  {
    id: 'clm-002', code: 'C-00932',
    observationId: 'obs-002', sourceDocumentId: 'src-001',
    rawSource: 'Line 24 P1017 completed yesterday.',
    sourceSpan: 'Line 24 P1017 completed yesterday.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'Line 24 P1017', objectRefs: ['obj-027', 'obj-024'],
    eventTime: '2026-09-28', eventTimePrecision: 'DAY',
    extractorConfidence: 0.93, modelVersion: 'extractor-v1.3',
    linkedActivityId: 'act-1042', linkConfidence: 0.91,
    confidenceLane: 'AUTO_COMMIT', reviewStatus: 'ACCEPTED',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T08:16:00+05:30',
  },
  {
    id: 'clm-003', code: 'C-00933',
    observationId: 'obs-003', sourceDocumentId: 'src-001',
    rawSource: 'Foundation F-12 started.',
    sourceSpan: 'Foundation F-12 started.',
    eventType: 'STARTED', modality: 'PAST_DONE',
    objectText: 'F-12', objectRefs: ['obj-017'],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.97, modelVersion: 'extractor-v1.3',
    linkedActivityId: 'act-039',
    linkConfidence: 0.89, confidenceLane: 'AUTO_COMMIT',
    reviewStatus: 'ACCEPTED',
    reporterName: 'Vikram Singh', reporterId: 'usr-005',
    discipline: 'Civil', area: 'Bay 3',
    createdAt: '2026-09-29T09:00:00+05:30',
  },
  {
    id: 'clm-004', code: 'C-00934',
    observationId: 'obs-004', sourceDocumentId: 'src-002',
    rawSource: 'Piping in Bay 3 is stuck because crane unavailable.',
    sourceSpan: 'Piping in Bay 3 is stuck because crane unavailable.',
    eventType: 'BLOCKED', modality: 'ONGOING',
    objectText: 'Bay 3', objectRefs: ['obj-079'],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    delayReason: 'CRANE', delayNote: 'Crane unavailable since 14:00',
    extractorConfidence: 0.91, modelVersion: 'extractor-v1.3',
    confidenceLane: 'PLANNER_REVIEW', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T14:30:00+05:30',
  },
  {
    id: 'clm-005', code: 'C-00935',
    observationId: 'obs-005', sourceDocumentId: 'src-002',
    rawSource: 'Cable tray section B is almost complete.',
    sourceSpan: 'Cable tray section B is almost complete.',
    eventType: 'IN_PROGRESS', modality: 'ONGOING',
    objectText: 'Cable tray section B', objectRefs: ['obj-050'],
    quantity: 90, unit: '%',
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.88, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined,
    linkConfidence: 0.82, confidenceLane: 'ONE_TAP',
    reviewStatus: 'PENDING',
    reporterName: 'Anita Desai', reporterId: 'usr-006',
    discipline: 'Electrical', area: 'Bay 3',
    createdAt: '2026-09-29T10:00:00+05:30',
  },
  {
    id: 'clm-006', code: 'C-00936',
    observationId: 'obs-006', sourceDocumentId: 'src-002',
    rawSource: 'Will finish spool 204 tomorrow.',
    sourceSpan: 'Will finish spool 204 tomorrow.',
    eventType: 'PLANNED', modality: 'PLANNED',
    objectText: 'spool 204', objectRefs: [],
    eventTime: '2026-09-30', eventTimePrecision: 'DAY',
    extractorConfidence: 0.85, modelVersion: 'extractor-v1.3',
    confidenceLane: 'ONE_TAP', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T15:00:00+05:30',
  },
  {
    id: 'clm-007', code: 'C-00937',
    observationId: 'obs-007', sourceDocumentId: 'src-003',
    rawSource: 'P-1017 erection not done yet.',
    sourceSpan: 'P-1017 erection not done yet.',
    eventType: 'NEGATED', modality: 'NEGATED',
    objectText: 'P-1017', objectRefs: ['obj-027'],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.94, modelVersion: 'extractor-v1.3',
    linkedActivityId: 'act-1042', linkConfidence: 0.92,
    confidenceLane: 'PLANNER_REVIEW', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T16:00:00+05:30',
  },
  {
    id: 'clm-008', code: 'C-00938',
    observationId: 'obs-008', sourceDocumentId: 'src-003',
    rawSource: 'Piping erection in Bay 3 completed.',
    sourceSpan: 'Piping erection in Bay 3 completed.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'Bay 3', objectRefs: ['obj-079'],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.90, modelVersion: 'extractor-v1.3',
    confidenceLane: 'PLANNER_REVIEW', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T16:30:00+05:30',
  },
  {
    id: 'clm-009', code: 'C-00939',
    observationId: 'obs-009', sourceDocumentId: 'src-004',
    rawSource: 'MCC-01 installation completed on 27th Sept.',
    sourceSpan: 'MCC-01 installation completed on 27th Sept.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'MCC-01', objectRefs: ['obj-059'],
    eventTime: '2026-09-27', eventTimePrecision: 'DAY',
    extractorConfidence: 0.95, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.87,
    confidenceLane: 'AUTO_COMMIT', reviewStatus: 'ACCEPTED',
    reporterName: 'Anita Desai', reporterId: 'usr-006',
    discipline: 'Electrical', area: 'Utility Area',
    createdAt: '2026-09-29T08:30:00+05:30',
  },
  {
    id: 'clm-010', code: 'C-00940',
    observationId: 'obs-010', sourceDocumentId: 'src-004',
    rawSource: 'Transformer T1 installation done on 28 sep.',
    sourceSpan: 'Transformer T1 installation done on 28 sep.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'Transformer T1', objectRefs: ['obj-058'],
    eventTime: '2026-09-28', eventTimePrecision: 'DAY',
    extractorConfidence: 0.96, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.93,
    confidenceLane: 'AUTO_COMMIT', reviewStatus: 'ACCEPTED',
    reporterName: 'Anita Desai', reporterId: 'usr-006',
    discipline: 'Electrical', area: 'Utility Area',
    createdAt: '2026-09-29T08:35:00+05:30',
  },
  // More claims for variety — Hinglish, typos, abbreviations
  {
    id: 'clm-011', code: 'C-00941',
    observationId: 'obs-011', sourceDocumentId: 'src-005',
    rawSource: 'F-08 ka excavation ho gya kal.',
    sourceSpan: 'F-08 ka excavation ho gya kal.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'F-08', objectRefs: ['obj-008'],
    eventTime: '2026-09-28', eventTimePrecision: 'DAY',
    extractorConfidence: 0.87, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.85,
    confidenceLane: 'ONE_TAP', reviewStatus: 'PENDING',
    reporterName: 'Vikram Singh', reporterId: 'usr-005',
    discipline: 'Civil', area: 'Bay 3',
    createdAt: '2026-09-29T09:30:00+05:30',
  },
  {
    id: 'clm-012', code: 'C-00942',
    observationId: 'obs-012', sourceDocumentId: 'src-005',
    rawSource: 'SS-05 erection shuru ho raha hai aaj',
    sourceSpan: 'SS-05 erection shuru ho raha hai aaj',
    eventType: 'STARTED', modality: 'ONGOING',
    objectText: 'SS-05', objectRefs: ['obj-021'],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.86, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.84,
    confidenceLane: 'ONE_TAP', reviewStatus: 'PENDING',
    reporterName: 'Vikram Singh', reporterId: 'usr-005',
    discipline: 'Civil', area: 'Bay 3',
    createdAt: '2026-09-29T09:45:00+05:30',
  },
  {
    id: 'clm-013', code: 'C-00943',
    observationId: 'obs-013', sourceDocumentId: 'src-005',
    rawSource: 'PT-101 install complete, loop check pending.',
    sourceSpan: 'PT-101 install complete, loop check pending.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'PT-101', objectRefs: ['obj-065'],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.94, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.91,
    confidenceLane: 'AUTO_COMMIT', reviewStatus: 'ACCEPTED',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Instrumentation', area: 'Bay 3',
    createdAt: '2026-09-29T10:30:00+05:30',
  },
  {
    id: 'clm-014', code: 'C-00944',
    observationId: 'obs-014', sourceDocumentId: 'src-006',
    rawSource: 'Fire alarm Bay 3 installation 95% done.',
    sourceSpan: 'Fire alarm Bay 3 installation 95% done.',
    eventType: 'IN_PROGRESS', modality: 'ONGOING',
    objectText: 'Fire alarm Bay 3', objectRefs: ['obj-083'],
    quantity: 95, unit: '%',
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.89, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.86,
    confidenceLane: 'ONE_TAP', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'HSE', area: 'Bay 3',
    createdAt: '2026-09-29T11:00:00+05:30',
  },
  // CONFLICT: Supervisor says completed 28 Sep, Contractor says 27 Sep
  {
    id: 'clm-015', code: 'C-00945',
    observationId: 'obs-015', sourceDocumentId: 'src-007',
    rawSource: 'P-1018 erection completed 27th September.',
    sourceSpan: 'P-1018 erection completed 27th September.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'P-1018', objectRefs: ['obj-028'],
    eventTime: '2026-09-27', eventTimePrecision: 'DAY',
    extractorConfidence: 0.93, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.88,
    confidenceLane: 'PLANNER_REVIEW', reviewStatus: 'PENDING',
    reporterName: 'Contractor DPR', reporterId: 'usr-ext-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T07:00:00+05:30',
  },
  {
    id: 'clm-016', code: 'C-00946',
    observationId: 'obs-016', sourceDocumentId: 'src-001',
    rawSource: 'P-1018 erection done on 28th.',
    sourceSpan: 'P-1018 erection done on 28th.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'P-1018', objectRefs: ['obj-028'],
    eventTime: '2026-09-28', eventTimePrecision: 'DAY',
    extractorConfidence: 0.95, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.90,
    confidenceLane: 'PLANNER_REVIEW', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T08:20:00+05:30',
  },
  // REWORK scenario
  {
    id: 'clm-017', code: 'C-00947',
    observationId: 'obs-017', sourceDocumentId: 'src-008',
    rawSource: 'Rework needed on spool S-1016, weld defect found.',
    sourceSpan: 'Rework needed on spool S-1016, weld defect found.',
    eventType: 'REWORK', modality: 'ONGOING',
    objectText: 'S-1016', objectRefs: ['obj-032'],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.92, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.86,
    confidenceLane: 'PLANNER_REVIEW', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T12:00:00+05:30',
  },
  // FUTURE DATE > data date
  {
    id: 'clm-018', code: 'C-00948',
    observationId: 'obs-018', sourceDocumentId: 'src-008',
    rawSource: 'Pressure test Line 24 planned for 2 October.',
    sourceSpan: 'Pressure test Line 24 planned for 2 October.',
    eventType: 'PLANNED', modality: 'PLANNED',
    objectText: 'Line 24', objectRefs: ['obj-024'],
    eventTime: '2026-10-02', eventTimePrecision: 'DAY',
    extractorConfidence: 0.91, modelVersion: 'extractor-v1.3',
    linkedActivityId: 'act-1047', linkConfidence: 0.88,
    confidenceLane: 'ONE_TAP', reviewStatus: 'PENDING',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001',
    discipline: 'Piping', area: 'Bay 3',
    createdAt: '2026-09-29T12:15:00+05:30',
  },
  // Unknown tag
  {
    id: 'clm-019', code: 'C-00949',
    observationId: 'obs-019', sourceDocumentId: 'src-008',
    rawSource: 'Widget XYZ-999 installation started in Area Z.',
    sourceSpan: 'Widget XYZ-999 installation started in Area Z.',
    eventType: 'STARTED', modality: 'PAST_DONE',
    objectText: 'XYZ-999', objectRefs: [],
    eventTime: '2026-09-29', eventTimePrecision: 'DAY',
    extractorConfidence: 0.72, modelVersion: 'extractor-v1.3',
    confidenceLane: 'PLANNER_REVIEW', reviewStatus: 'PENDING',
    reporterName: 'Vikram Singh', reporterId: 'usr-005',
    discipline: 'Civil', area: 'Bay 3',
    createdAt: '2026-09-29T13:00:00+05:30',
  },
  // Backdated / PLANNED_EQ_ACTUAL
  {
    id: 'clm-020', code: 'C-00950',
    observationId: 'obs-020', sourceDocumentId: 'src-009',
    rawSource: 'Cable Tray Installation – Area C completed Sep 25.',
    sourceSpan: 'Cable Tray Installation – Area C completed Sep 25.',
    eventType: 'COMPLETED', modality: 'PAST_DONE',
    objectText: 'Cable Tray Area C', objectRefs: ['obj-051'],
    eventTime: '2026-09-25', eventTimePrecision: 'DAY',
    extractorConfidence: 0.90, modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined, linkConfidence: 0.85,
    confidenceLane: 'ONE_TAP', reviewStatus: 'PENDING',
    reporterName: 'Anita Desai', reporterId: 'usr-006',
    discipline: 'Electrical', area: 'Bay 3',
    createdAt: '2026-09-29T14:00:00+05:30',
  },
  // Additional auto-committed claims
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `clm-${21 + i}`,
    code: `C-00${951 + i}`,
    observationId: `obs-${21 + i}`,
    sourceDocumentId: 'src-010',
    rawSource: `Activity ${i + 1} of DPR batch - completed as reported.`,
    sourceSpan: `Activity ${i + 1} of DPR batch - completed as reported.`,
    eventType: 'COMPLETED' as EventType,
    modality: 'PAST_DONE' as Modality,
    objectText: `Object-${i + 1}`,
    objectRefs: [] as string[],
    eventTime: '2026-09-28',
    eventTimePrecision: 'DAY' as const,
    extractorConfidence: 0.92 + Math.random() * 0.06,
    modelVersion: 'extractor-v1.3',
    linkedActivityId: undefined,
    linkConfidence: 0.88 + Math.random() * 0.1,
    confidenceLane: 'AUTO_COMMIT' as ConfidenceLane,
    reviewStatus: 'ACCEPTED' as const,
    reporterName: ['Rajesh Kumar', 'Vikram Singh', 'Anita Desai'][i % 3],
    reporterId: ['usr-001', 'usr-005', 'usr-006'][i % 3],
    discipline: ['Piping', 'Civil', 'Electrical'][i % 3] as Discipline,
    area: ['Bay 3', 'Bay 1', 'Utility Area'][i % 3] as Area,
    createdAt: `2026-09-29T0${7 + i}:00:00+05:30`,
  })),
];

// ===== SOURCE DOCUMENTS =====

export const DEMO_SOURCES: SourceDocument[] = [
  {
    id: 'src-001', projectId: 'prj-001', sourceType: 'DPR', fileName: 'DPR_29_SEP_PIPING.pdf',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001', discipline: 'Piping',
    reportDate: '2026-09-29', receivedTime: '2026-09-29T08:00:00+05:30',
    hash: 'a3f2e1d4b5c6a7f8e9d0c1b2a3f4e5d6', status: 'COMPLETED',
    observationCount: 14, claimCount: 19, resolvedObjectCount: 16,
    matchedActivityCount: 13, needsReviewCount: 3,
  },
  {
    id: 'src-002', projectId: 'prj-001', sourceType: 'CHAT', fileName: 'Field Chat - 29 Sep',
    reporterName: 'Multiple', reporterId: 'usr-001', discipline: undefined,
    reportDate: '2026-09-29', receivedTime: '2026-09-29T14:00:00+05:30',
    hash: 'b4c3d2e1f5a6b7c8d9e0f1a2b3c4d5e6', status: 'COMPLETED',
    observationCount: 6, claimCount: 8, resolvedObjectCount: 5,
    matchedActivityCount: 4, needsReviewCount: 2,
  },
  {
    id: 'src-003', projectId: 'prj-001', sourceType: 'VOICE', fileName: 'Voice Report - Rajesh',
    reporterName: 'Rajesh Kumar', reporterId: 'usr-001', discipline: 'Piping',
    reportDate: '2026-09-29', receivedTime: '2026-09-29T16:00:00+05:30',
    hash: 'c5d4e3f2a6b7c8d9e0f1a2b3c4d5e6f7', status: 'COMPLETED',
    observationCount: 3, claimCount: 4, resolvedObjectCount: 3,
    matchedActivityCount: 2, needsReviewCount: 2,
  },
  {
    id: 'src-004', projectId: 'prj-001', sourceType: 'XLSX', fileName: 'Electrical_Progress_Sep29.xlsx',
    reporterName: 'Anita Desai', reporterId: 'usr-006', discipline: 'Electrical',
    reportDate: '2026-09-29', receivedTime: '2026-09-29T08:30:00+05:30',
    hash: 'd6e5f4a3b7c8d9e0f1a2b3c4d5e6f7a8', status: 'COMPLETED',
    observationCount: 8, claimCount: 10, resolvedObjectCount: 9,
    matchedActivityCount: 8, needsReviewCount: 1,
  },
  {
    id: 'src-005', projectId: 'prj-001', sourceType: 'DPR', fileName: 'DPR_29_SEP_CIVIL.pdf',
    reporterName: 'Vikram Singh', reporterId: 'usr-005', discipline: 'Civil',
    reportDate: '2026-09-29', receivedTime: '2026-09-29T09:00:00+05:30',
    hash: 'e7f6a5b4c8d9e0f1a2b3c4d5e6f7a8b9', status: 'COMPLETED',
    observationCount: 5, claimCount: 6, resolvedObjectCount: 5,
    matchedActivityCount: 4, needsReviewCount: 1,
  },
];

// ===== LINK CANDIDATES (for ACT-1042 demo) =====

export const DEMO_LINK_CANDIDATES: LinkCandidate[] = [
  {
    activityId: 'act-1042', activityCode: 'ACT-EP-1042', activityName: 'Erect Line 24-P-1017',
    posterior: 0.94, isNull: false,
    features: [
      { name: 'object_overlap', label: 'Object overlap', value: 0.31, maxValue: 0.35 },
      { name: 'text_similarity', label: 'Text similarity', value: 0.23, maxValue: 0.25 },
      { name: 'embedding_similarity', label: 'Embedding similarity', value: 0.12, maxValue: 0.15 },
      { name: 'discipline_match', label: 'Discipline match', value: 0.08, maxValue: 0.08 },
      { name: 'area_match', label: 'Area match', value: 0.06, maxValue: 0.06 },
      { name: 'schedule_prior', label: 'Schedule prior', value: 0.09, maxValue: 0.12 },
      { name: 'predecessor_done', label: 'Predecessor state', value: 0.03, maxValue: 0.05 },
      { name: 'quantity_consistency', label: 'Qty consistency', value: 0.02, maxValue: 0.04 },
    ],
    reasoning: [
      'P1017 resolves to the scope graph for ACT-1042.',
      'The activity belongs to Piping / Bay 3.',
      'The activity is inside the current planned window.',
      'Required predecessor activities are substantially complete.',
    ],
  },
  {
    activityId: 'act-1047', activityCode: 'ACT-PT-1047', activityName: 'Pressure Test Line 24',
    posterior: 0.21, isNull: false,
    features: [
      { name: 'object_overlap', label: 'Object overlap', value: 0.08, maxValue: 0.35 },
      { name: 'text_similarity', label: 'Text similarity', value: 0.05, maxValue: 0.25 },
      { name: 'embedding_similarity', label: 'Embedding similarity', value: 0.03, maxValue: 0.15 },
      { name: 'discipline_match', label: 'Discipline match', value: 0.08, maxValue: 0.08 },
      { name: 'area_match', label: 'Area match', value: 0.06, maxValue: 0.06 },
      { name: 'schedule_prior', label: 'Schedule prior', value: -0.05, maxValue: 0.12 },
      { name: 'predecessor_done', label: 'Predecessor state', value: -0.02, maxValue: 0.05 },
      { name: 'quantity_consistency', label: 'Qty consistency', value: -0.02, maxValue: 0.04 },
    ],
    reasoning: [
      'Line 24 is a shared scope object.',
      'Activity belongs to Piping / Bay 3.',
      'Activity is NOT in the current planned window (starts Oct 1).',
      'Predecessors are incomplete.',
    ],
  },
  {
    activityId: '', activityCode: 'NULL', activityName: 'Unmatched / New Activity',
    posterior: 0.08, isNull: true,
    features: [],
    reasoning: ['No additional activity-specific match available.'],
  },
];

// ===== SCHEDULE PRIOR (for ACT-1042) =====

export const DEMO_SCHEDULE_PRIOR: SchedulePrior = {
  plannedStart: '2026-09-25',
  plannedFinish: '2026-09-30',
  currentStatus: 'IN_PROGRESS',
  predecessorsComplete: 2,
  predecessorsTotal: 2,
  totalFloat: 0,
  isCritical: true,
};

// ===== REVIEW TASKS =====

export const DEMO_REVIEW_TASKS: ReviewTask[] = [
  {
    id: 'rvw-001', claimId: 'clm-008',
    claim: DEMO_CLAIMS.find(c => c.id === 'clm-008')!,
    suggestedActivityId: undefined, suggestedActivityCode: undefined,
    suggestedActivityName: 'Multiple children activities',
    confidence: 0.61, reason: 'Coarse-to-fine mismatch. Field report refers to parent-level scope.',
    category: 'COARSE_MISMATCH', status: 'PENDING',
    createdAt: '2026-09-29T16:35:00+05:30', age: '8h',
  },
  {
    id: 'rvw-002', claimId: 'clm-004',
    claim: DEMO_CLAIMS.find(c => c.id === 'clm-004')!,
    suggestedActivityCode: 'ACT-EP-1042', suggestedActivityName: 'Erect Line 24-P-1017',
    confidence: 0.73, reason: 'Blocking event in Bay 3 — CRANE unavailability.',
    category: 'LOW_CONFIDENCE', status: 'PENDING',
    createdAt: '2026-09-29T14:35:00+05:30', age: '10h',
  },
  {
    id: 'rvw-003', claimId: 'clm-015',
    claim: DEMO_CLAIMS.find(c => c.id === 'clm-015')!,
    suggestedActivityCode: 'ACT-EP-1043', suggestedActivityName: 'Erect Line 24-P-1018',
    confidence: 0.88, reason: 'Conflicting actual date with C-00946.',
    category: 'CONFLICT', status: 'PENDING',
    createdAt: '2026-09-29T08:05:00+05:30', age: '16h',
  },
  {
    id: 'rvw-004', claimId: 'clm-019',
    claim: DEMO_CLAIMS.find(c => c.id === 'clm-019')!,
    suggestedActivityCode: undefined, suggestedActivityName: undefined,
    confidence: 0.0, reason: 'Unresolved object XYZ-999. No matching scope object found.',
    category: 'UNMATCHED', status: 'PENDING',
    createdAt: '2026-09-29T13:05:00+05:30', age: '11h',
  },
  {
    id: 'rvw-005', claimId: 'clm-017',
    claim: DEMO_CLAIMS.find(c => c.id === 'clm-017')!,
    suggestedActivityCode: 'ACT-PIP-1033', suggestedActivityName: 'Fabricate Spool S-1016',
    confidence: 0.86, reason: 'Rework on completed activity — may require activity reopen.',
    category: 'OUT_OF_SEQUENCE', status: 'PENDING',
    createdAt: '2026-09-29T12:05:00+05:30', age: '12h',
  },
  {
    id: 'rvw-006', claimId: 'clm-007',
    claim: DEMO_CLAIMS.find(c => c.id === 'clm-007')!,
    suggestedActivityCode: 'ACT-EP-1042', suggestedActivityName: 'Erect Line 24-P-1017',
    confidence: 0.92, reason: 'Negation conflicts with earlier completion report C-00931.',
    category: 'CONFLICT', status: 'PENDING',
    createdAt: '2026-09-29T16:05:00+05:30', age: '8h',
  },
];

// ===== INTEGRITY FLAGS =====

export const DEMO_INTEGRITY_FLAGS: IntegrityFlag[] = [
  {
    id: 'iflag-001', type: 'PLANNED_EQ_ACTUAL',
    activityId: 'act-005', activityCode: 'ACT-CIV-005',
    description: 'Actual dates match planned dates exactly.',
    evidence: {
      'Planned Start': '2026-09-04',
      'Actual Start': '2026-09-04',
      'Planned Finish': '2026-09-07',
      'Actual Finish': '2026-09-07',
      'Reporter': 'Auto-import',
      'Report Latency': '0h',
    },
    severity: 'WARNING', status: 'OPEN', createdAt: '2026-09-29T07:00:00+05:30',
  },
  {
    id: 'iflag-002', type: 'BACKDATED',
    activityId: 'act-020', activityCode: 'ACT-CIV-020',
    description: 'Report submitted 4 days after event date.',
    evidence: {
      'Event Date': '2026-09-25',
      'Report Date': '2026-09-29',
      'Latency': '96h',
      'Reporter': 'Vikram Singh',
    },
    severity: 'INFO', status: 'OPEN', createdAt: '2026-09-29T09:00:00+05:30',
  },
  {
    id: 'iflag-003', type: 'STALE_COPY',
    activityId: 'act-012', activityCode: 'ACT-CIV-012',
    description: 'Repeated identical dates across 3 consecutive reports.',
    evidence: {
      'Pattern': '3 reports with identical dates',
      'Date': '2026-09-20',
      'Sources': 'DPR Sep 20, DPR Sep 22, DPR Sep 25',
    },
    severity: 'WARNING', status: 'OPEN', createdAt: '2026-09-29T07:30:00+05:30',
  },
];

// ===== AUDIT EVENTS =====

function sha256Mock(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0') + 
    Math.abs(hash * 31).toString(16).padStart(8, '0') +
    Math.abs(hash * 37).toString(16).padStart(8, '0') +
    Math.abs(hash * 41).toString(16).padStart(8, '0');
}

function generateAuditChain(): AuditEvent[] {
  const events: AuditEvent[] = [];
  let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';

  const rawEvents = [
    { action: 'PLAN_IMPORTED', entityType: 'plan', entityRef: 'plan-001', actor: 'SYSTEM', details: 'Baseline plan imported: 150 activities, 18 WBS nodes' },
    { action: 'SCOPE_GRAPH_BUILT', entityType: 'scope_graph', entityRef: 'sg-001', actor: 'SYSTEM', details: 'Scope graph constructed: 400 objects, 580 relationships' },
    { action: 'SOURCE_INGESTED', entityType: 'source_document', entityRef: 'src-001', actor: 'usr-001', details: 'DPR_29_SEP_PIPING.pdf ingested' },
    { action: 'CLAIMS_EXTRACTED', entityType: 'source_document', entityRef: 'src-001', actor: 'SYSTEM', details: '19 claims extracted from source' },
    { action: 'CLAIM_CREATED', entityType: 'claim', entityRef: 'clm-001', actor: 'SYSTEM', details: 'Claim C-00931 created: COMPLETED / P1017' },
    { action: 'OBJECT_RESOLVED', entityType: 'scope_object', entityRef: 'obj-027', actor: 'SYSTEM', details: 'P1017 → P-1017 (canonical)' },
    { action: 'CLAIM_LINKED', entityType: 'link_decision', entityRef: 'ld-001', actor: 'SYSTEM', details: 'C-00931 → ACT-EP-1042 (0.94)', ruleId: 'link-v2', modelVersion: 'linker-v0.9' },
    { action: 'ACTUAL_DERIVED', entityType: 'actual_version', entityRef: 'av-001', actor: 'SYSTEM', details: 'ACT-EP-1042: actual_finish = 2026-09-28', ruleId: 'R-FINISH-ALL' },
    { action: 'AUTO_COMMITTED', entityType: 'claim', entityRef: 'clm-001', actor: 'SYSTEM', details: 'Claim auto-committed (lane: AUTO_COMMIT, confidence: 0.94)' },
    { action: 'SOURCE_INGESTED', entityType: 'source_document', entityRef: 'src-002', actor: 'usr-001', details: 'Field Chat ingested' },
    { action: 'CLAIMS_EXTRACTED', entityType: 'source_document', entityRef: 'src-002', actor: 'SYSTEM', details: '8 claims extracted from chat' },
    { action: 'REVIEW_CREATED', entityType: 'review_task', entityRef: 'rvw-001', actor: 'SYSTEM', details: 'Review task created for C-00938 (coarse mismatch)' },
    { action: 'CLAIM_LINKED', entityType: 'link_decision', entityRef: 'ld-002', actor: 'SYSTEM', details: 'C-00933 → ACT-CIV Foundation F-12 (0.89)', ruleId: 'link-v2' },
    { action: 'ACTUAL_DERIVED', entityType: 'actual_version', entityRef: 'av-002', actor: 'SYSTEM', details: 'Foundation F-12 Excavation: actual_start = 2026-09-29', ruleId: 'R-START' },
    { action: 'INTEGRITY_FLAG', entityType: 'integrity_flag', entityRef: 'iflag-001', actor: 'SYSTEM', details: 'PLANNED_EQ_ACTUAL detected on ACT-CIV-005' },
    { action: 'CONFLICT_DETECTED', entityType: 'conflict', entityRef: 'conf-001', actor: 'SYSTEM', details: 'Conflicting dates for P-1018: 27 Sep vs 28 Sep' },
    { action: 'SOURCE_INGESTED', entityType: 'source_document', entityRef: 'src-004', actor: 'usr-006', details: 'Electrical_Progress_Sep29.xlsx ingested' },
    { action: 'CLAIM_LINKED', entityType: 'link_decision', entityRef: 'ld-003', actor: 'SYSTEM', details: 'C-00939 → MCC-01 Installation (0.87)', ruleId: 'link-v2' },
    { action: 'WRITEBACK_EXPORTED', entityType: 'writeback_batch', entityRef: 'wb-001', actor: 'usr-002', details: '18 actuals exported to CSV' },
  ];

  const baseTime = new Date('2026-09-29T07:00:00+05:30');

  for (let i = 0; i < rawEvents.length; i++) {
    const re = rawEvents[i];
    const time = new Date(baseTime.getTime() + i * 300000);
    const payloadStr = JSON.stringify({ action: re.action, ref: re.entityRef, ts: time.toISOString() });
    const payloadHash = sha256Mock(payloadStr);
    const currentHash = sha256Mock(prevHash + payloadHash);

    events.push({
      id: `evt-${String(i + 1).padStart(6, '0')}`,
      code: `EVT-${String(i + 1).padStart(6, '0')}`,
      timestamp: time.toISOString(),
      actor: re.actor,
      actorType: re.actor === 'SYSTEM' ? 'SYSTEM' : 'USER',
      action: re.action,
      entityType: re.entityType,
      entityRef: re.entityRef,
      payloadHash,
      previousHash: prevHash,
      currentHash,
      ruleId: (re as { ruleId?: string }).ruleId,
      modelVersion: (re as { modelVersion?: string }).modelVersion,
      details: re.details,
    });

    prevHash = currentHash;
  }

  // Extend to ~132 events
  for (let i = rawEvents.length; i < 132; i++) {
    const time = new Date(baseTime.getTime() + i * 300000);
    const action = ['CLAIM_CREATED', 'OBJECT_RESOLVED', 'CLAIM_LINKED', 'ACTUAL_DERIVED'][i % 4];
    const payloadStr = JSON.stringify({ action, idx: i, ts: time.toISOString() });
    const payloadHash = sha256Mock(payloadStr);
    const currentHash = sha256Mock(prevHash + payloadHash);

    events.push({
      id: `evt-${String(i + 1).padStart(6, '0')}`,
      code: `EVT-${String(i + 1).padStart(6, '0')}`,
      timestamp: time.toISOString(),
      actor: 'SYSTEM',
      actorType: 'SYSTEM',
      action,
      entityType: action === 'CLAIM_CREATED' ? 'claim' : action === 'OBJECT_RESOLVED' ? 'scope_object' : 'link_decision',
      entityRef: `ref-${i}`,
      payloadHash,
      previousHash: prevHash,
      currentHash,
    });

    prevHash = currentHash;
  }

  return events;
}

export const DEMO_AUDIT_EVENTS: AuditEvent[] = generateAuditChain();

// ===== WRITEBACK =====

export const DEMO_WRITEBACK: WritebackBatch = {
  id: 'wb-001',
  dataDate: '2026-09-29',
  format: 'CSV',
  rowCount: 18,
  violations: 2,
  pendingDataDate: 2,
  status: 'DRAFT',
  createdAt: '2026-09-29T18:00:00+05:30',
  rows: [
    { activityId: 'act-1042', activityCode: 'ACT-EP-1042', activityName: 'Erect Line 24-P-1017', beforeActualStart: undefined, beforeActualFinish: undefined, afterActualStart: '2026-09-26', afterActualFinish: '2026-09-28', sourceClaimIds: ['clm-001', 'clm-002'], confidence: 0.94, derivationRule: 'R-FINISH-ALL' },
    { activityId: 'act-039', activityCode: 'ACT-CIV-039', activityName: 'Foundation F-12 Excavation', beforeActualStart: undefined, beforeActualFinish: undefined, afterActualStart: '2026-09-29', afterActualFinish: undefined, sourceClaimIds: ['clm-003'], confidence: 0.89, derivationRule: 'R-START' },
  ],
};

// ===== DASHBOARD KPIs =====

export const DEMO_KPIS: DashboardKPIs = {
  totalActivities: DEMO_ACTIVITIES.length,
  scopeObjects: DEMO_SCOPE_OBJECTS.length,
  claimsToday: 28,
  needsReview: 6,
  autoCommitted: 17,
  unreported: 11,
  integrityFlags: 3,
};

// ===== TODAY'S BOARD =====

export const DEMO_BOARD: BoardItem[] = [
  { activityId: 'act-1042', activityCode: 'ACT-EP-1042', activityName: 'Erect Line 24-P-1017', area: 'Bay 3', discipline: 'Piping', expectedToday: 'Completion', status: 'IN_PROGRESS' },
  { activityId: 'act-045', activityCode: 'ACT-EP-1043', activityName: 'Erect Line 24-P-1018', area: 'Bay 3', discipline: 'Piping', expectedToday: 'Continue', status: 'IN_PROGRESS' },
  { activityId: 'act-039', activityCode: 'ACT-CIV-039', activityName: 'Foundation F-12 Excavation', area: 'Bay 3', discipline: 'Civil', expectedToday: 'Start', status: 'NOT_STARTED' },
  { activityId: 'act-070', activityCode: 'ACT-EL-070', activityName: 'Cable Tray Installation – Area B', area: 'Bay 3', discipline: 'Electrical', expectedToday: 'Completion', status: 'IN_PROGRESS' },
  { activityId: 'act-085', activityCode: 'ACT-INS-085', activityName: 'Install Pressure Transmitter PT-101', area: 'Bay 3', discipline: 'Instrumentation', expectedToday: 'Start', status: 'NOT_STARTED' },
  { activityId: 'act-100', activityCode: 'ACT-HSE-100', activityName: 'Fire Detection System Bay 3', area: 'Bay 3', discipline: 'HSE', expectedToday: 'Continue', status: 'IN_PROGRESS' },
];

// ===== GANTT ROWS =====

export const DEMO_GANTT_ROWS: GanttRow[] = DEMO_ACTIVITIES.slice(0, 40).map(a => ({
  activityId: a.id,
  activityCode: a.code,
  activityName: a.name,
  discipline: a.discipline,
  area: a.area,
  baselineStart: a.plannedStart,
  baselineFinish: a.plannedFinish,
  actualStart: a.actualStart,
  actualFinish: a.actualFinish,
  derivedStart: a.actualStart,
  derivedFinish: a.actualFinish,
  percentComplete: a.percentComplete,
  isCritical: a.isCritical,
  status: a.status,
}));

// ===== ACTIVITY TRACE =====

export const DEMO_TRACE_EVENTS: TraceEvent[] = [
  { id: 'tr-001', date: '2026-09-25', time: '07:00', title: 'Plan imported', description: 'ACT-EP-1042 imported from baseline plan. Planned: 25 Sep – 30 Sep.', type: 'PLAN' },
  { id: 'tr-002', date: '2026-09-26', time: '08:15', title: 'Supervisor reports started', description: 'Rajesh Kumar reported erection work started in Bay 3.', type: 'FIELD', entityRef: 'clm-001' },
  { id: 'tr-003', date: '2026-09-26', time: '08:16', title: 'Claim resolved to object P1017', description: 'Object P1017 resolved via alias match to canonical P-1017.', type: 'SYSTEM', entityRef: 'obj-027' },
  { id: 'tr-004', date: '2026-09-26', time: '08:17', title: 'Actual start derived', description: 'Rule R-START applied. Actual start = 26 Sep 2026.', type: 'SYSTEM' },
  { id: 'tr-005', date: '2026-09-28', time: '08:15', title: 'Spool completion reported', description: '"Spool P1017 erected yesterday in Bay 3." — Rajesh Kumar via DPR.', type: 'FIELD', entityRef: 'clm-001' },
  { id: 'tr-006', date: '2026-09-28', time: '08:16', title: 'Activity linked (94%)', description: 'Claim C-00931 linked to ACT-EP-1042 via hybrid scoring. Auto-commit lane.', type: 'SYSTEM' },
  { id: 'tr-007', date: '2026-09-28', time: '08:17', title: 'Activity completed', description: 'Rule R-FINISH-ALL: all in-scope objects complete. Actual finish = 28 Sep 2026.', type: 'SYSTEM' },
  { id: 'tr-008', date: '2026-09-28', time: '08:18', title: 'Ledger updated', description: 'Audit event EVT-000008 created. Hash chain extended.', type: 'SYSTEM', entityRef: 'evt-000008' },
  { id: 'tr-009', date: '2026-09-29', time: '18:00', title: 'Exported to CSV', description: 'Activity actual included in write-back batch WB-001.', type: 'EXPORT', entityRef: 'wb-001' },
];

// ===== CONFLICT =====

export const DEMO_CONFLICTS: ConflictReport[] = [
  {
    id: 'conf-001', activityId: 'act-045', activityCode: 'ACT-EP-1043',
    sources: [
      { reporter: 'Rajesh Kumar', role: 'SUPERVISOR', timestamp: '2026-09-29T08:20:00+05:30', eventDate: '2026-09-28', eventType: 'COMPLETED', trustIndicator: 0.94, latencyHours: 24, sourceType: 'DPR' },
      { reporter: 'Contractor DPR', role: 'SUPERVISOR', timestamp: '2026-09-29T07:00:00+05:30', eventDate: '2026-09-27', eventType: 'COMPLETED', trustIndicator: 0.78, latencyHours: 48, sourceType: 'DPR' },
    ],
    status: 'OPEN',
  },
];

// ===== MEMORY =====

export const DEMO_MEMORY: DurationStatistic[] = [
  {
    discipline: 'Piping', workType: 'Erection', area: 'Bay 3',
    median: 3.2, p25: 2.0, p75: 5.0, sampleSize: 17,
    delayCauses: [{ cause: 'CRANE', count: 4 }, { cause: 'MATERIAL', count: 3 }, { cause: 'WEATHER', count: 2 }],
    lastObserved: '2026-09-28', status: 'SUFFICIENT',
  },
  {
    discipline: 'Piping', workType: 'Fabrication', area: 'Bay 3',
    median: 2.5, p25: 1.5, p75: 4.0, sampleSize: 12,
    delayCauses: [{ cause: 'MATERIAL', count: 5 }, { cause: 'MANPOWER', count: 2 }],
    lastObserved: '2026-09-27', status: 'SUFFICIENT',
  },
  {
    discipline: 'Civil', workType: 'Excavation',
    median: 1.8, p25: 1.0, p75: 3.0, sampleSize: 22,
    delayCauses: [{ cause: 'WEATHER', count: 6 }, { cause: 'ACCESS', count: 3 }],
    lastObserved: '2026-09-29', status: 'SUFFICIENT',
  },
  {
    discipline: 'Civil', workType: 'Concrete Pour',
    median: 2.0, p25: 1.5, p75: 2.5, sampleSize: 15,
    delayCauses: [{ cause: 'WEATHER', count: 4 }],
    lastObserved: '2026-09-28', status: 'SUFFICIENT',
  },
  {
    discipline: 'Electrical', workType: 'Cable Tray Installation',
    median: 4.5, p25: 3.0, p75: 6.0, sampleSize: 8,
    delayCauses: [{ cause: 'MATERIAL', count: 3 }],
    lastObserved: '2026-09-27', status: 'SUFFICIENT',
  },
  {
    discipline: 'Electrical', workType: 'Cable Pulling',
    median: 2.8, p25: 2.0, p75: 4.0, sampleSize: 5,
    delayCauses: [{ cause: 'ACCESS', count: 2 }],
    lastObserved: '2026-09-26', status: 'INSUFFICIENT',
  },
  {
    discipline: 'Instrumentation', workType: 'Instrument Installation',
    median: 1.5, p25: 1.0, p75: 2.0, sampleSize: 3,
    delayCauses: [],
    lastObserved: '2026-09-29', status: 'INSUFFICIENT',
  },
];

// ===== TIME AGENT DEMO =====

export const DEMO_TIME_AGENT_MESSAGES: TimeAgentMessage[] = [
  {
    id: 'ta-001', role: 'user', content: 'Spool P1017 was erected yesterday in Bay 3.',
    timestamp: '2026-09-29T08:15:00+05:30',
  },
  {
    id: 'ta-002', role: 'system', content: 'Extracted claim and linked to activity.',
    timestamp: '2026-09-29T08:15:02+05:30',
    extraction: {
      eventType: 'COMPLETED', modality: 'PAST_DONE',
      objectText: 'P-1017', objectRefs: ['obj-027'],
      eventTime: '2026-09-28', area: 'Bay 3', confidence: 0.96,
    },
    linkedActivity: {
      code: 'ACT-EP-1042', name: 'Erect Line 24-P-1017',
      confidence: 0.94, lane: 'AUTO_COMMIT',
    },
  },
];

// ===== BENCHMARK =====

export const DEMO_BENCHMARK: BenchmarkResults = {
  extraction: { precision: 0.91, recall: 0.88, f1: 0.89, sampleSize: 200 },
  linking: { top1Accuracy: 0.85, top3Accuracy: 0.94, unmatchedDetection: 0.82, calibrationECE: 0.043, sampleSize: 200 },
  derivation: { absoluteDateError: 0.3, sampleSize: 150 },
  decision: { autoCommitPrecision: 0.97, autoCommitCoverage: 0.62, askBackRate: 0.15, sampleSize: 200 },
  datasetLabel: 'Synthetic Benchmark v1',
  generatedAt: '2026-09-29T00:00:00+05:30',
};

// ===== DATA QUALITY =====

export const DEMO_DATA_QUALITY: DataQualityMetrics = {
  parseSuccessRate: 0.96,
  quarantinedSources: 2,
  unresolvedObjects: 4,
  unmatchedClaims: 3,
  conflicts: 1,
  missingDates: 2,
  suspiciousPlannedEqActual: 1,
  backdatedReports: 1,
  staleReports: 1,
  extractionPending: 0,
};
