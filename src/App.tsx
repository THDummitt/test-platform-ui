import { useMemo, useState } from 'react';

type Tab = 'Overview' | 'Tenants' | 'Configuration' | 'Dependencies' | 'Audit log';
type Tenant = { id: string; name: string; owner: string; region: string; segment: string; status: 'Active' | 'Review' | 'Pending'; risk: 'Low' | 'Medium' | 'High'; users: number; spend: number; created: string; uptime: number; incidents: number };
type SortKey = keyof Tenant;
type SortDir = 'asc' | 'desc' | null;
type ColumnKey = keyof Tenant;

const regions = ['All regions', 'North America', 'EMEA', 'APAC', 'LATAM'];
const statuses = ['All statuses', 'Active', 'Review', 'Pending'];
const segments = ['All segments', 'Finance', 'Healthcare', 'Manufacturing', 'Retail'];
const companies = ['Aster Labs', 'Northwind Dynamics', 'Helio Meridian', 'Summit Core', 'Juniper Nexus', 'Blue Harbor', 'Veridian Delta', 'Atlas Harbor'];
const owners = ['A. Patel', 'K. Moore', 'J. Rivera', 'A. Chen', 'L. Hughes'];

const tenants: Tenant[] = Array.from({ length: 520 }, (_, index) => ({
  id: `TEN-${String(1000 + index).padStart(5, '0')}`,
  name: `${companies[index % companies.length]} ${['Group', 'Systems', 'Partners', 'Works'][index % 4]}`,
  owner: owners[index % owners.length],
  region: regions[1 + (index % 4)],
  segment: segments[1 + (index % 4)],
  status: (['Active', 'Review', 'Pending'] as const)[index % 3],
  risk: (['Low', 'Medium', 'High'] as const)[index % 3],
  users: 420 + index * 17,
  spend: 54000 + index * 1730,
  created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  uptime: Number((95 + Math.random() * 5).toFixed(2)),
  incidents: Math.floor(Math.random() * 12),
}));

const audits = [
  ['14:22', 'J. Holloway', 'Updated Customer Portal access policy', 'Policy'],
  ['10:30', 'M. Rossi', 'Approved CRM dependency renewal', 'Approval'],
  ['Yesterday', 'Support Automation', 'Reconciled billing discrepancy for MSA-431', 'System'],
  ['Yesterday', 'C. Liu', 'Added Finance operations user group', 'User'],
];

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const percent = (value: number) => `${value.toFixed(2)}%`;

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Button({ children, onClick, variant = 'primary', size = 'md' }: { children: React.ReactNode; onClick?: () => void; variant?: string; size?: string }) {
  return <button className={`button ${variant} ${size}`} onClick={onClick}>{children}</button>;
}

interface ColumnDef {
  key: ColumnKey;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: Tenant) => React.ReactNode;
}

const allColumns: ColumnDef[] = [
  { key: 'name', label: 'Tenant', sortable: true, width: '220px', render: (value, row) => <><strong>{value}</strong><small>{row.id}</small></> },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'region', label: 'Region', sortable: true },
  { key: 'segment', label: 'Segment', sortable: true },
  { key: 'status', label: 'Status', sortable: true, render: (value) => <Badge tone={value === 'Active' ? 'success' : value === 'Review' ? 'warning' : 'info'}>{value}</Badge> },
  { key: 'risk', label: 'Risk', sortable: true, render: (value) => <Badge tone={value === 'High' ? 'danger' : value === 'Medium' ? 'warning' : 'success'}>{value}</Badge> },
  { key: 'spend', label: 'Spend', sortable: true, render: (value) => money(value) },
  { key: 'users', label: 'Users', sortable: true, render: (value) => value.toLocaleString() },
  { key: 'uptime', label: 'Uptime', sortable: true, render: (value) => percent(value) },
  { key: 'incidents', label: 'Incidents', sortable: true },
  { key: 'created', label: 'Created', sortable: true },
];

function ColumnConfigurator({ visible, columns, onToggle, onClose }: { visible: boolean; columns: ColumnDef[]; onToggle: (key: ColumnKey) => void; onClose: () => void }) {
  if (!visible) return null;
  return (
    <div className="column-config-modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h3>Configure columns</h3>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        <div className="column-list">
          {allColumns.map((col) => (
            <label key={col.key} className="column-toggle">
              <input
                type="checkbox"
                checked={columns.some((c) => c.key === col.key)}
                onChange={() => onToggle(col.key)}
              />
              <span>{col.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState<Tab>('Tenants');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState(regions[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [segment, setSegment] = useState(segments[0]);
  const [owner, setOwner] = useState('All owners');
  const [risk, setRisk] = useState('All risks');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selected, setSelected] = useState<Tenant>(tenants[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([tenants[0].id, tenants[1].id]);
  const [toast, setToast] = useState('');
  const [wizard, setWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [csvOpen, setCsvOpen] = useState(false);
  const [columnConfigOpen, setColumnConfigOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<ColumnDef[]>(allColumns.slice(0, 8));
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  };

  const toggle = (id: string) => setSelectedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);

  const handleSort = (key: ColumnKey) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') setSortDir(null);
      else setSortDir('asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    const text = query.toLowerCase();
    const result = tenants.filter((t) =>
      (!text || t.name.toLowerCase().includes(text) || t.id.toLowerCase().includes(text) || t.owner.toLowerCase().includes(text)) &&
      (region === regions[0] || t.region === region) &&
      (status === statuses[0] || t.status === status) &&
      (segment === segments[0] || t.segment === segment) &&
      (owner === 'All owners' || t.owner === owner) &&
      (risk === 'All risks' || t.risk === risk)
    );

    if (sortDir) {
      return [...result].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === 'string') {
          return sortDir === 'asc' ? aVal.localeCompare(String(bVal)) : String(bVal).localeCompare(aVal);
        }
        return sortDir === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
      });
    }

    return result;
  }, [query, region, status, segment, owner, risk, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = filtered.slice(start, end);

  const pageSelectedCount = pageData.filter((item) => selectedIds.includes(item.id)).length;
  const allPageSelected = pageData.length > 0 && pageSelectedCount === pageData.length;

  const toggleAllPage = () => {
    if (allPageSelected) {
      setSelectedIds((ids) => ids.filter((id) => !pageData.some((row) => row.id === id)));
      return;
    }
    setSelectedIds((ids) => [...new Set([...ids, ...pageData.map((row) => row.id)])]);
  };

  const addColumn = (key: ColumnKey) => {
    const next = allColumns.find((c) => c.key === key);
    if (next && !visibleColumns.some((c) => c.key === key)) {
      setVisibleColumns([...visibleColumns, next]);
    }
  };

  const removeColumn = (key: ColumnKey) => {
    const updated = visibleColumns.filter((c) => c.key !== key);
    if (updated.length > 0) setVisibleColumns(updated);
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="topbar shell">
        <div className="brand-wrap">
          <div className="brand-mark">N</div>
          <div>
            <strong>Northstar Control</strong>
            <small>Enterprise administration</small>
          </div>
        </div>
        <nav className="nav-tabs">
          {(['Overview', 'Tenants', 'Configuration', 'Dependencies', 'Audit log'] as Tab[]).map((item) => (
            <button key={item} className={tab === item ? 'nav-tab active' : 'nav-tab'} onClick={() => setTab(item)}>
              {item}
            </button>
          ))}
        </nav>
        <div className="utility-bar">
          <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Button variant="secondary" onClick={() => { setWizard(true); setStep(1); }}>New tenant</Button>
        </div>
      </header>

      <main className="main-layout">
        {tab === 'Overview' && (
          <>
            <section className="kpis-grid">
              {[['Monthly recurring', '$1.84M', '+14.8%'], ['Active tenants', '2,184', '+9.2%'], ['SLA uptime', '99.96%', '+0.12%'], ['Open escalations', '24', '-18.3%']].map(([label, value, delta]) => (
                <div className="kpi-card shell" key={label}>
                  <div className="kpi-head">
                    <span>{label}</span>
                    <Badge tone={delta.startsWith('+') ? 'success' : 'warning'}>{delta}</Badge>
                  </div>
                  <strong className="kpi-value">{value}</strong>
                </div>
              ))}
            </section>
          </>
        )}

        {tab === 'Tenants' && (
          <section className="records-layout">
            <div className="table-panel shell">
              <div className="table-toolbar">
                <input
                  className="search-input"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search tenant, ID, or owner"
                />
                <button className="filter-toggle" onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)}>
                  🔧 {advancedFiltersOpen ? 'Hide' : 'Show'} filters
                </button>
              </div>

              {advancedFiltersOpen && (
                <div className="filters-panel">
                  <div className="filter-row">
                    <select value={region} onChange={(e) => { setRegion(e.target.value); setCurrentPage(1); }}>
                      {regions.map((r) => <option key={r}>{r}</option>)}
                    </select>
                    <select value={status} onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}>
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <select value={segment} onChange={(e) => { setSegment(e.target.value); setCurrentPage(1); }}>
                      {segments.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <select value={owner} onChange={(e) => { setOwner(e.target.value); setCurrentPage(1); }}>
                      <option>All owners</option>
                      {owners.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <select value={risk} onChange={(e) => { setRisk(e.target.value); setCurrentPage(1); }}>
                      <option>All risks</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <button className="filter-clear" onClick={() => {
                      setQuery('');
                      setRegion(regions[0]);
                      setStatus(statuses[0]);
                      setSegment(segments[0]);
                      setOwner('All owners');
                      setRisk('All risks');
                      setCurrentPage(1);
                    }}>Clear filters</button>
                  </div>
                </div>
              )}

              <div className="bulk-bar">
                <span>{selectedIds.length} selected</span>
                <div className="bulk-actions">
                  {selectedIds.length > 0 && (
                    <>
                      <Button variant="ghost" onClick={() => notify('Export queued')} size="sm">Export</Button>
                      <Button variant="secondary" onClick={() => notify('Bulk update queued')} size="sm">Update status</Button>
                      <Button variant="danger" onClick={() => notify('Archive request submitted')} size="sm">Archive</Button>
                    </>
                  )}
                </div>
              </div>

              <div className="table-controls">
                <div className="controls-left">
                  <button className="icon-button" onClick={() => setColumnConfigOpen(true)} title="Configure columns">⚙️</button>
                  <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                    <option value={25}>25 rows</option>
                    <option value={50}>50 rows</option>
                    <option value={100}>100 rows</option>
                    <option value={250}>250 rows</option>
                  </select>
                </div>
                <span className="results-info">{filtered.length} results</span>
              </div>

              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>
                        <input
                          type="checkbox"
                          checked={allPageSelected}
                          onChange={toggleAllPage}
                        />
                      </th>
                      {visibleColumns.map((col) => (
                        <th
                          key={col.key}
                          style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                          onClick={() => col.sortable && handleSort(col.key)}
                          className={sortKey === col.key ? `sort-${sortDir}` : ''}
                        >
                          <span>{col.label}</span>
                          {col.sortable && sortKey === col.key && (
                            <span className="sort-indicator">{sortDir === 'asc' ? '↑' : sortDir === 'desc' ? '↓' : ''}</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((tenant) => (
                      <tr
                        key={tenant.id}
                        className={selected.id === tenant.id ? 'selected' : ''}
                        onClick={() => setSelected(tenant)}
                      >
                        <td onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(tenant.id)}
                            onChange={() => toggle(tenant.id)}
                          />
                        </td>
                        {visibleColumns.map((col) => (
                          <td key={col.key}>
                            {col.render ? col.render(tenant[col.key], tenant) : tenant[col.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="empty-state">
                    <strong>No tenants found</strong>
                    <span>Try clearing filters or changing your search.</span>
                  </div>
                )}
              </div>

              {filtered.length > pageSize && (
                <div className="pagination">
                  <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
                  <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>‹</button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>›</button>
                  <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
                </div>
              )}
            </div>

            <aside className="detail-panel shell">
              <div className="card-header">
                <div>
                  <p className="eyebrow">Tenant details</p>
                  <h2>{selected.name}</h2>
                </div>
                <Badge tone="success">{selected.status}</Badge>
              </div>
              <div className="detail-metrics">
                <div><small>Tenant ID</small><strong>{selected.id}</strong></div>
                <div><small>Environment</small><strong>Production</strong></div>
                <div><small>Systems</small><strong>14 connected</strong></div>
              </div>
              <label>Owner<input value={selected.owner} readOnly /></label>
              <label>Policy baseline<select defaultValue="Enhanced"><option>Standard</option><option>Enhanced</option><option>Regional</option></select></label>
              <label>Uptime<input value={percent(selected.uptime)} readOnly /></label>
              <label>Incidents this month<input value={selected.incidents} readOnly /></label>
              <div className="side-actions">
                <Button variant="secondary" onClick={() => notify('Draft saved')}>Save draft</Button>
                <Button onClick={() => notify('Configuration published')}>Publish</Button>
              </div>
            </aside>
          </section>
        )}

        {tab === 'Audit log' && (
          <section className="card shell">
            <div className="card-header">
              <div>
                <h3>Audit history</h3>
                <small>Policy, compliance, and system events</small>
              </div>
              <Button variant="secondary" onClick={() => notify('Audit export queued')}>Export log</Button>
            </div>
            <div className="timeline">
              {audits.map(([time, actor, action, type]) => (
                <div className="timeline-item" key={action}>
                  <div className="timeline-dot" />
                  <div>
                    <div className="timeline-topline">
                      <strong>{action}</strong>
                      <Badge tone={type === 'Approval' ? 'success' : type === 'System' ? 'info' : 'neutral'}>{type}</Badge>
                    </div>
                    <small>{actor} · {time}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <ColumnConfigurator
        visible={columnConfigOpen}
        columns={visibleColumns}
        onToggle={(key) => {
          if (visibleColumns.some((c) => c.key === key)) {
            removeColumn(key);
          } else {
            addColumn(key);
          }
        }}
        onClose={() => setColumnConfigOpen(false)}
      />

      {wizard && (
        <div className="modal-backdrop">
          <div className="modal-card shell">
            <div className="card-header">
              <div>
                <p className="eyebrow">Create tenant</p>
                <h2>New configuration</h2>
              </div>
              <button className="close-button" onClick={() => setWizard(false)}>✕</button>
            </div>
            <div className="wizard-steps">
              <span className={step === 1 ? 'active' : ''}>1 Basics</span>
              <span className={step === 2 ? 'active' : ''}>2 Controls</span>
              <span className={step === 3 ? 'active' : ''}>3 Review</span>
            </div>
            {step === 1 && (
              <div className="form-grid">
                <label>Entity name<input placeholder="e.g. Northwind Labs" /></label>
                <label>Owner<input placeholder="e.g. A. Patel" /></label>
              </div>
            )}
            {step === 2 && (
              <div className="form-grid">
                <label>Region<select><option>North America</option><option>EMEA</option><option>APAC</option></select></label>
                <label>Policy<input defaultValue="Standard" /></label>
              </div>
            )}
            {step === 3 && (
              <div className="review-box">
                <strong>Ready to create tenant</strong>
                <span>Configuration will start in draft status and require approval before publish.</span>
              </div>
            )}
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setWizard(false)}>Cancel</Button>
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              ) : (
                <Button onClick={() => { setWizard(false); notify('Tenant created successfully'); }}>Create tenant</Button>
              )}
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast success">{toast}</div>}
    </div>
  );
}

export default App;
