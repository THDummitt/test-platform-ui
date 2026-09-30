:root {
  --bg: #07111f;
  --bg-alt: #0f1d2f;
  --panel: rgba(15, 23, 42, 0.84);
  --panel-strong: #111c2b;
  --panel-soft: #132238;
  --card-border: rgba(148, 163, 184, 0.2);
  --border: rgba(148, 163, 184, 0.2);
  --text: #e2e8f0;
  --muted: #94a3b8;
  --primary: #7c3aed;
  --primary-soft: rgba(124, 58, 237, 0.16);
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #f43f5e;
  --info: #38bdf8;
  --shadow: 0 14px 40px rgba(15, 23, 42, 0.26);
  --input: rgba(15, 23, 42, 0.78);
  --shell: rgba(10, 16, 30, 0.85);
}

:root[data-theme='light'] {
  --bg: #eef4ff;
  --bg-alt: #f7faff;
  --panel: rgba(255, 255, 255, 0.9);
  --panel-strong: #ffffff;
  --panel-soft: #f1f5f9;
  --card-border: rgba(148, 163, 184, 0.25);
  --border: rgba(148, 163, 184, 0.25);
  --text: #0f172a;
  --muted: #475569;
  --primary: #6d28d9;
  --primary-soft: rgba(109, 40, 217, 0.1);
  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;
  --info: #0284c7;
  --shadow: 0 18px 42px rgba(15, 23, 42, 0.1);
  --input: rgba(255, 255, 255, 0.86);
  --shell: rgba(255, 255, 255, 0.8);
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background: radial-gradient(circle at top left, rgba(124, 58, 237, 0.18), transparent 25%), var(--bg);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1520px;
  margin: 0 auto;
  padding: 24px 20px 40px;
}

.shell {
  background: var(--shell);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
  border-radius: 22px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22px;
  gap: 18px;
  flex-wrap: wrap;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-wrap strong {
  display: block;
  font-size: 1rem;
}

.brand-wrap small {
  color: var(--muted);
}

.brand-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), #a78bfa);
  color: white;
  font-weight: 800;
}

.nav-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-tab {
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  border-radius: 12px;
  padding: 8px 14px;
  text-transform: capitalize;
  transition: 0.2s ease;
}

.nav-tab.active {
  background: var(--primary-soft);
  border-color: rgba(124, 58, 237, 0.2);
  color: var(--text);
}

.utility-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-button {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--panel-soft);
}

.main-layout {
  margin-top: 26px;
  display: grid;
  gap: 24px;
}

.kpis-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.kpi-card {
  padding: 18px 20px;
}

.kpi-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
  font-size: 0.8rem;
}

.kpi-value {
  margin-top: 16px;
  font-size: clamp(1.8rem, 2vw, 2.6rem);
  font-weight: 800;
}

.panel-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 20px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 20px;
}

.card {
  padding: 20px 18px;
  border-radius: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}

.card-header h3 {
  margin: 0;
  font-size: 1.05rem;
}

.card-header small {
  color: var(--muted);
  display: block;
  margin-top: 4px;
}

.chart-svg {
  width: 100%;
  height: 160px;
  display: block;
}

.legend-stack {
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}

.legend-item strong {
  margin-left: auto;
  color: var(--text);
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.green { background: var(--success); }
.dot.amber { background: var(--warning); }
.dot.red { background: var(--danger); }

.mini-donut {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 18px auto 0;
}

.donut-ring {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(var(--success) 0 72%, var(--warning) 72% 93%, var(--danger) 93% 100%);
  position: absolute;
  inset: 0;
}

.donut-ring::before {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  background: var(--bg-alt);
}

.donut-center {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  font-weight: 800;
}

.summary-list {
  display: grid;
  gap: 16px;
}

.summary-list div {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  color: var(--muted);
}

.summary-list strong {
  color: var(--text);
}

.summary-list.compact {
  gap: 10px;
}

.records-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(300px, 0.9fr);
  gap: 20px;
}

.table-panel {
  padding: 18px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 18px;
}

.search-wrap {
  flex: 1;
  min-width: 220px;
}

.search-wrap input,
.field-row input,
.field-row select,
.toolbar-actions select {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--input);
  color: var(--text);
  border-radius: 12px;
  padding: 10px 12px;
}

.toolbar-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.bulk-bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 14px;
}

.bulk-left {
  color: var(--muted);
}

.bulk-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.data-table-wrap {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

tr {
  border-bottom: 1px solid var(--border);
}

thead th {
  text-align: left;
  color: var(--muted);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 12px 10px;
}

tbody td {
  padding: 14px 10px;
  vertical-align: middle;
}

tbody tr {
  transition: background 0.2s ease;
}

tbody tr:hover,
tbody tr.selected {
  background: rgba(124, 58, 237, 0.08);
}

.tenant-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tenant-cell span {
  color: var(--muted);
  font-size: 0.72rem;
}

.detail-panel {
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.detail-header h2 {
  margin: 0;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: 0.7rem;
}

.detail-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.detail-metrics div {
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
}

.detail-metrics small {
  display: block;
  color: var(--muted);
  margin-bottom: 8px;
}

.detail-section {
  display: grid;
  gap: 14px;
}

.field-row {
  display: grid;
  gap: 8px;
}

.field-row label {
  color: var(--muted);
  font-size: 0.82rem;
}

.side-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.button {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  transition: transform 0.18s ease, opacity 0.18s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button.primary {
  background: linear-gradient(135deg, var(--primary), #a78bfa);
  color: white;
}

.button.secondary {
  background: rgba(148, 163, 184, 0.08);
  color: var(--text);
  border: 1px solid var(--border);
}

.button.ghost {
  border: 1px solid var(--border);
  color: var(--muted);
  background: transparent;
}

.button.danger {
  background: rgba(220, 38, 38, 0.12);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: #fca5a5;
}

.button.md {
  padding: 10px 14px;
}

.button.sm {
  padding: 8px 10px;
  font-size: 0.82rem;
}

.button.full {
  width: 100%;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.badge.neutral {
  background: rgba(148, 163, 184, 0.12);
  color: var(--muted);
}

.badge.success {
  background: rgba(34, 197, 94, 0.12);
  color: #4ade80;
}

.badge.warning {
  background: rgba(245, 158, 11, 0.14);
  color: #fbbf24;
}

.badge.danger {
  background: rgba(244, 63, 94, 0.12);
  color: #fda4af;
}

.badge.info {
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
}

.config-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
}

.tree-container {
  max-height: 440px;
  overflow: auto;
  padding-right: 8px;
  font-size: 0.96rem;
}

.tree-node {
  display: grid;
  gap: 10px;
}

.tree-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(148, 163, 184, 0.04);
}

.tree-bullet {
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
}

.tree-row small {
  margin-left: auto;
  color: var(--muted);
  text-transform: uppercase;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.config-card {
  padding: 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  display: grid;
  gap: 6px;
  background: rgba(148, 163, 184, 0.04);
}

.config-card small {
  color: var(--muted);
}

.dependency-wrap {
  background: radial-gradient(circle at top, rgba(124, 58, 237, 0.12), transparent 30%), rgba(15, 23, 42, 0.3);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 12px;
}

.dependency-svg {
  width: 100%;
  height: 340px;
  display: block;
}

.timeline {
  display: grid;
  gap: 18px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(148, 163, 184, 0.18);
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 14px;
  align-items: flex-start;
}

.timeline-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #38bdf8);
  position: relative;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.18);
}

.timeline-content {
  background: rgba(148, 163, 184, 0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
}

.timeline-topline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.timeline-meta {
  margin-top: 10px;
  color: var(--muted);
  font-size: 0.8rem;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.6);
  backdrop-filter: blur(8px);
  display: none;
  place-items: center;
  z-index: 30;
}

.modal-backdrop.visible {
  display: grid;
}

.modal-card {
  width: min(680px, calc(100vw - 28px));
  padding: 18px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
  margin-bottom: 18px;
}

.close-button {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
}

.wizard-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 18px;
}

.wizard-step {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid var(--border);
  padding: 10px 12px;
  color: var(--muted);
}

.wizard-step.active {
  background: var(--primary-soft);
  border-color: rgba(124, 58, 237, 0.2);
  color: var(--text);
}

.wizard-step span {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.16);
  font-size: 0.76rem;
  font-weight: 700;
}

.wizard-form {
  display: grid;
  gap: 16px;
}

.review-panel {
  background: rgba(148, 163, 184, 0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
}

.review-panel h4 {
  margin: 0 0 12px;
}

.review-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.review-panel li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
}

.review-panel strong {
  color: var(--text);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.error-text {
  color: #fda4af;
}

.csv-panel {
  padding: 18px;
}

.csv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.csv-preview {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 18px;
  align-items: start;
}

.issues-panel {
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.04);
}

.issues-panel h4 {
  margin: 0 0 14px;
}

.issue-row {
  display: grid;
  gap: 3px;
  padding: 10px 0;
  border-top: 1px solid var(--border);
}

.issue-row strong {
  font-size: 0.85rem;
}

.issue-row span {
  color: var(--muted);
}

.issue-row small {
  color: #fda4af;
}

.toast-stack {
  position: fixed;
  right: 18px;
  bottom: 18px;
  display: grid;
  gap: 10px;
  z-index: 50;
}

.toast {
  min-width: 220px;
  max-width: 320px;
  padding: 12px 14px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.92);
  color: white;
}

.toast.success {
  border-color: rgba(34, 197, 94, 0.4);
}

.toast.error {
  border-color: rgba(244, 63, 94, 0.4);
}

.toast.info {
  border-color: rgba(56, 189, 248, 0.4);
}

.skeleton-table {
  display: grid;
  gap: 12px;
  padding-top: 8px;
}

.skeleton-row {
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(148, 163, 184, 0.1), rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.1));
  background-size: 200% 100%;
  animation: pulse 1.4s linear infinite;
}

@keyframes pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.empty-state {
  padding: 44px 18px 20px;
  text-align: center;
  color: var(--muted);
}

.empty-icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  margin: 0 auto 18px;
  display: grid;
  place-items: center;
  font-size: 2rem;
  background: rgba(124, 58, 237, 0.12);
  color: var(--primary);
}

@media (max-width: 1100px) {
  .kpis-grid,
  .panel-grid,
  .bottom-grid,
  .config-layout,
  .csv-preview,
  .records-layout {
    grid-template-columns: 1fr;
  }

  .table-panel {
    order: 1;
  }

  .detail-panel {
    order: 2;
  }
}

@media (max-width: 720px) {
  .topbar {
    align-items: flex-start;
  }

  .nav-tabs,
  .toolbar-actions,
  .bulk-bar,
  .table-toolbar,
  .modal-actions,
  .csv-header,
  .utility-bar {
    width: 100%;
  }

  .nav-tabs,
  .toolbar-actions,
  .bulk-actions,
  .modal-actions,
  .side-actions {
    justify-content: flex-start;
  }

  .detail-metrics {
    grid-template-columns: 1fr;
  }

  .wizard-steps {
    grid-template-columns: 1fr;
  }
}
