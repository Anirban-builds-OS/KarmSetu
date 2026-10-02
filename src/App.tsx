// ============================================================
// Main Application Routing — KarmSetu Platform
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

import { LoginPage } from './pages/LoginPage';
import { PipelineDemoPage } from './pages/PipelineDemoPage';
import { ActivityTracePage } from './pages/ActivityTracePage';
import { DashboardPage } from './pages/DashboardPage';
import { TodaysBoardPage } from './pages/TodaysBoardPage';
import { TimeAgentPage } from './pages/TimeAgentPage';
import { IngestPage } from './pages/IngestPage';
import { PlansPage } from './pages/PlansPage';
import { GanttPage } from './pages/GanttPage';
import { ReviewQueuePage } from './pages/ReviewQueuePage';
import { ClaimsPage } from './pages/ClaimsPage';
import { ScopeGraphPage } from './pages/ScopeGraphPage';
import { AuditLedgerPage } from './pages/AuditLedgerPage';
import { ExecutionMemoryPage } from './pages/ExecutionMemoryPage';
import { WritebackPage } from './pages/WritebackPage';
import { DataQualityPage } from './pages/DataQualityPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import { SystemHealthPage } from './pages/SystemHealthPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="pipeline" element={<PipelineDemoPage />} />
          <Route path="trace/:activityCode" element={<ActivityTracePage />} />
          <Route path="trace" element={<ActivityTracePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="todays-board" element={<TodaysBoardPage />} />
          <Route path="time-agent" element={<TimeAgentPage />} />
          <Route path="ingest" element={<IngestPage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="gantt" element={<GanttPage />} />
          <Route path="review" element={<ReviewQueuePage />} />
          <Route path="claims" element={<ClaimsPage />} />
          <Route path="scope-graph" element={<ScopeGraphPage />} />
          <Route path="audit" element={<AuditLedgerPage />} />
          <Route path="memory" element={<ExecutionMemoryPage />} />
          <Route path="writeback" element={<WritebackPage />} />
          <Route path="data-quality" element={<DataQualityPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="admin/system-health" element={<SystemHealthPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
