// ============================================================
// KARMSETU — Core Type Definitions
// ============================================================

// --- Enums ---

export type UserRole = 'SUPERVISOR' | 'PLANNER' | 'PROJECT_MANAGER' | 'ADMIN';

export type Discipline = 'Civil' | 'Piping' | 'Electrical' | 'Instrumentation' | 'HSE';

export type Area = 'Bay 1' | 'Bay 2' | 'Bay 3' | 'Utility Area' | 'Tank Farm' | 'Admin Block';

export type ActivityStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'SUSPENDED'
  | 'UNREPORTED';

export type EventType =
  | 'STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'BLOCKED'
  | 'REWORK'
  | 'NEGATED'
  | 'PLANNED'
  | 'HEDGED';

export type Modality =
  | 'PAST_DONE'
  | 'ONGOING'
  | 'PLANNED'
  | 'NEGATED'
  | 'HEDGED';

export type ConfidenceLane =
  | 'AUTO_COMMIT'
  | 'ONE_TAP'
  | 'PLANNER_REVIEW';

export type IntegrityFlagType =
  | 'PLANNED_EQ_ACTUAL'
  | 'BACKDATED'
  | 'STALE_COPY'
  | 'OUT_OF_SEQUENCE'
  | 'FUTURE_DATE';

export type ReviewStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'REASSIGNED';

export type SourceType =
  | 'DPR'
  | 'SPREADSHEET'
  | 'CSV'
  | 'XLSX'
  | 'XER'
  | 'PDF'
  | 'OCR'
  | 'VOICE'
  | 'CHAT'
  | 'MANUAL';

export type ProcessingStatus =
  | 'UPLOADED'
  | 'PARSED'
  | 'NORMALIZED'
  | 'CLAIMS_EXTRACTED'
  | 'OBJECTS_RESOLVED'
  | 'ACTIVITIES_LINKED'
  | 'REVIEW_REQUIRED'
  | 'COMPLETED'
  | 'QUARANTINED'
  | 'EXTRACTION_PENDING';

export type DelayCause =
  | 'CRANE'
  | 'MATERIAL'
  | 'MANPOWER'
  | 'PERMIT'
  | 'DESIGN'
  | 'ACCESS'
  | 'WEATHER'
  | 'REWORK'
  | 'OTHER';

// --- Core Entities ---

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  discipline?: Discipline;
  area?: Area;
  trustAlpha: number;
  trustBeta: number;
  medianLatencyHours: number;
  verificationHistory: number;
  avatarInitials: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  dataDate: string;
  timezone: string;
  disciplines: Discipline[];
  areas: Area[];
  status: 'ACTIVE' | 'CLOSED';
}

export interface WBSNode {
  id: string;
  code: string;
  name: string;
  level: number;
  parentId?: string;
  discipline?: Discipline;
  area?: Area;
  children?: WBSNode[];
}

export interface Activity {
  id: string;
  code: string;
  name: string;
  wbsNodeId: string;
  discipline: Discipline;
  area: Area;
  plannedStart: string;
  plannedFinish: string;
  actualStart?: string;
  actualFinish?: string;
  status: ActivityStatus;
  isCritical: boolean;
  totalFloat: number;
  percentComplete: number;
  predecessors: string[];
  successors: string[];
  scopeObjectIds: string[];
  derivedFrom?: string;
  ruleId?: string;
  modelVersion?: string;
}

export interface ActivityRelation {
  id: string;
  predecessorId: string;
  successorId: string;
  type: 'FS' | 'FF' | 'SS' | 'SF';
  lag: number;
}

export interface ScopeObject {
  id: string;
  canonicalId: string;
  type: string;
  name: string;
  aliases: string[];
  discipline: Discipline;
  area: Area;
  quantity?: number;
  unit?: string;
  activityIds: string[];
  origin: 'PLAN_IMPORT' | 'FIELD_REPORT' | 'MANUAL';
  confidence: number;
}

// --- Evidence Layer ---

export interface SourceDocument {
  id: string;
  projectId: string;
  sourceType: SourceType;
  fileName: string;
  reporterName: string;
  reporterId: string;
  discipline?: Discipline;
  reportDate: string;
  receivedTime: string;
  hash: string;
  status: ProcessingStatus;
  observationCount: number;
  claimCount: number;
  resolvedObjectCount: number;
  matchedActivityCount: number;
  needsReviewCount: number;
}

export interface Observation {
  id: string;
  sourceDocumentId: string;
  rawText: string;
  sequenceIndex: number;
  reporterId: string;
  reportDate: string;
  discipline?: Discipline;
  area?: Area;
}

export interface Claim {
  id: string;
  code: string;
  observationId: string;
  sourceDocumentId: string;
  rawSource: string;
  sourceSpan: string;
  eventType: EventType;
  modality: Modality;
  objectText: string;
  objectRefs: string[];
  quantity?: number;
  unit?: string;
  eventTime: string;
  eventTimePrecision: 'DAY' | 'APPROX' | 'UNKNOWN';
  delayReason?: DelayCause;
  delayNote?: string;
  extractorConfidence: number;
  modelVersion: string;
  linkedActivityId?: string;
  linkConfidence?: number;
  confidenceLane?: ConfidenceLane;
  reviewStatus: ReviewStatus;
  reporterName: string;
  reporterId: string;
  discipline?: Discipline;
  area?: Area;
  createdAt: string;
}

export interface LinkCandidate {
  activityId: string;
  activityCode: string;
  activityName: string;
  posterior: number;
  isNull: boolean;
  features: LinkFeature[];
  reasoning: string[];
}

export interface LinkFeature {
  name: string;
  label: string;
  value: number;
  maxValue: number;
}

export interface LinkDecision {
  id: string;
  claimId: string;
  candidates: LinkCandidate[];
  selectedCandidateIndex: number;
  lane: ConfidenceLane;
  decidedBy: 'SYSTEM' | string;
  reason?: string;
  ruleId: string;
  modelVersion: string;
  timestamp: string;
}

// --- Derivation ---

export interface ActualVersion {
  id: string;
  activityId: string;
  version: number;
  actualStart?: string;
  actualFinish?: string;
  percentComplete: number;
  derivedFrom: string;
  ruleId: string;
  modelVersion: string;
  validFrom: string;
  validTo?: string;
  isLatest: boolean;
}

// --- Review ---

export interface ReviewTask {
  id: string;
  claimId: string;
  claim: Claim;
  suggestedActivityId?: string;
  suggestedActivityCode?: string;
  suggestedActivityName?: string;
  confidence: number;
  reason: string;
  category: 'UNMATCHED' | 'LOW_CONFIDENCE' | 'CONFLICT' | 'OUT_OF_SEQUENCE' | 'INTEGRITY_FLAG' | 'COARSE_MISMATCH';
  status: ReviewStatus;
  assignedTo?: string;
  resolvedBy?: string;
  resolutionNote?: string;
  createdAt: string;
  resolvedAt?: string;
  age: string;
}

// --- Integrity ---

export interface IntegrityFlag {
  id: string;
  type: IntegrityFlagType;
  activityId: string;
  activityCode: string;
  description: string;
  evidence: Record<string, string>;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  status: 'OPEN' | 'REVIEWED' | 'DISMISSED';
  createdAt: string;
}

// --- Audit ---

export interface AuditEvent {
  id: string;
  code: string;
  timestamp: string;
  actor: string;
  actorType: 'SYSTEM' | 'USER';
  action: string;
  entityType: string;
  entityRef: string;
  payloadHash: string;
  previousHash: string;
  currentHash: string;
  ruleId?: string;
  modelVersion?: string;
  details?: string;
}

// --- Write-back ---

export interface WritebackRow {
  activityId: string;
  activityCode: string;
  activityName: string;
  beforeActualStart?: string;
  beforeActualFinish?: string;
  afterActualStart?: string;
  afterActualFinish?: string;
  sourceClaimIds: string[];
  confidence: number;
  derivationRule: string;
}

export interface WritebackBatch {
  id: string;
  dataDate: string;
  format: 'XER' | 'CSV' | 'JSON' | 'P6_REST';
  rowCount: number;
  violations: number;
  pendingDataDate: number;
  status: 'DRAFT' | 'CONFIRMED' | 'EXPORTED';
  createdAt: string;
  exportedAt?: string;
  rows: WritebackRow[];
}

// --- Memory ---

export interface DurationStatistic {
  discipline: Discipline;
  workType: string;
  area?: Area;
  median: number;
  p25: number;
  p75: number;
  sampleSize: number;
  delayCauses: { cause: DelayCause; count: number }[];
  lastObserved: string;
  status: 'SUFFICIENT' | 'INSUFFICIENT';
}

// --- Conflict ---

export interface ConflictReport {
  id: string;
  activityId: string;
  activityCode: string;
  sources: ConflictSource[];
  status: 'OPEN' | 'RESOLVED';
  resolvedBy?: string;
  resolution?: string;
}

export interface ConflictSource {
  reporter: string;
  role: string;
  timestamp: string;
  eventDate: string;
  eventType: EventType;
  trustIndicator: number;
  latencyHours: number;
  sourceType: SourceType;
}

// --- Time Agent ---

export interface TimeAgentMessage {
  id: string;
  role: 'user' | 'system';
  content: string;
  timestamp: string;
  extraction?: ClaimExtraction;
  linkedActivity?: {
    code: string;
    name: string;
    confidence: number;
    lane: ConfidenceLane;
  };
}

export interface ClaimExtraction {
  eventType: EventType;
  modality: Modality;
  objectText: string;
  objectRefs: string[];
  eventTime: string;
  area?: string;
  confidence: number;
}

// --- Dashboard KPIs ---

export interface DashboardKPIs {
  totalActivities: number;
  scopeObjects: number;
  claimsToday: number;
  needsReview: number;
  autoCommitted: number;
  unreported: number;
  integrityFlags: number;
}

// --- Board ---

export interface BoardItem {
  activityId: string;
  activityCode: string;
  activityName: string;
  area: Area;
  discipline: Discipline;
  expectedToday: string;
  status: ActivityStatus;
}

// --- Benchmark ---

export interface BenchmarkResults {
  extraction: {
    precision: number;
    recall: number;
    f1: number;
    sampleSize: number;
  };
  linking: {
    top1Accuracy: number;
    top3Accuracy: number;
    unmatchedDetection: number;
    calibrationECE: number;
    sampleSize: number;
  };
  derivation: {
    absoluteDateError: number;
    sampleSize: number;
  };
  decision: {
    autoCommitPrecision: number;
    autoCommitCoverage: number;
    askBackRate: number;
    sampleSize: number;
  };
  datasetLabel: string;
  generatedAt: string;
}

// --- Data Quality ---

export interface DataQualityMetrics {
  parseSuccessRate: number;
  quarantinedSources: number;
  unresolvedObjects: number;
  unmatchedClaims: number;
  conflicts: number;
  missingDates: number;
  suspiciousPlannedEqActual: number;
  backdatedReports: number;
  staleReports: number;
  extractionPending: number;
}

// --- Schedule Prior ---

export interface SchedulePrior {
  plannedStart: string;
  plannedFinish: string;
  currentStatus: ActivityStatus;
  predecessorsComplete: number;
  predecessorsTotal: number;
  totalFloat: number;
  isCritical: boolean;
}

// --- Gantt ---

export interface GanttRow {
  activityId: string;
  activityCode: string;
  activityName: string;
  discipline: Discipline;
  area: Area;
  baselineStart: string;
  baselineFinish: string;
  actualStart?: string;
  actualFinish?: string;
  derivedStart?: string;
  derivedFinish?: string;
  percentComplete: number;
  isCritical: boolean;
  status: ActivityStatus;
}

// --- Activity Trace ---

export interface TraceEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  type: 'PLAN' | 'FIELD' | 'SYSTEM' | 'REVIEW' | 'EXPORT';
  entityRef?: string;
  evidenceIds?: string[];
}
