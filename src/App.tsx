import { useMemo, useState } from 'react';

type Tab = 'Overview' | 'Tenants' | 'Configuration' | 'Dependencies' | 'Audit log';
type Tenant = { id: string; name: string; owner: string; region: string; segment: string; status: 'Active' | 'Review' | 'Pending'; risk: 'Low' | 'Medium' | 'High'; users: number; spend: number };

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
}));

const audits = [
  ['14:22', 'J. Holloway', 'Updated Customer Portal access policy', 'Policy'],
  ['10:30', 'M. Rossi', 'Approved CRM dependency renewal', 'Approval'],
  ['Yesterday', 'Support Automation', 'Reconciled billing discrepancy for MSA-431', 'System'],
  ['Yesterday', 'C. Liu', 'Added Finance operations user group', 'User'],
];

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Button({ children, onClick, variant = 'primary' }: { children: React.ReactNode; onClick?: () => void; variant?: string }) {
  return <button className={`button ${variant}`} onClick={onClick}>{children}</button>;
}

function App() {
  const [tab, setTab] = useState<Tab>('Overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState(regions[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [segment, setSegment] = useState(segments[0]);
  const [selected, setSelected] = useState<Tenant>(tenants[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([tenants[0].id, tenants[1].id]);
  const [toast, setToast] = useState('');
  const [wizard, setWizard] = useState(false);
  const [step, setStep] = useState(1);
  const [csvOpen, setCsvOpen] = useState(false);

  const filtered = useMemo(() => tenants.filter((tenant) => {
    const text = query.toLowerCase();
    return (!text || tenant.name.toLowerCase().includes(text) || tenant.id.toLowerCase().includes(text) || tenant.owner.toLowerCase().includes(text))
      && (region === regions[0] || tenant.region === region)
      && (status === statuses[0] || tenant.status === status)
      && (segment === segments[0] || tenant.segment === segment);
  }), [query, region, status, segment]);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2400); };
  const toggle = (id: string) => setSelectedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]);

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="topbar shell">
        <div className="brand-wrap"><div className="brand-mark">N</div><div><strong>Northstar Control</strong><small>Enterprise administration</small></div></div>
        <nav className="nav-tabs">{(['Overview', 'Tenants', 'Configuration', 'Dependencies', 'Audit log'] as Tab[]).map((item) => <button key={item} className={tab === item ? 'nav-tab active' : 'nav-tab'} onClick={() => setTab(item)}>{item}</button>)}</nav>
        <div className="utility-bar"><button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀️' : '🌙'}</button><Button variant="secondary" onClick={() => { setWizard(true); setStep(1); }}>New tenant</Button></div>
      </header>

      <main className="main-layout">
        <section className="hero-row"><div><p className="eyebrow">Control plane / 30 Sep 2026</p><h1>{tab}</h1><p className="hero-copy">Monitor tenant health, policy posture, and operational dependencies from one calm workspace.</p></div><div className="hero-actions"><Badge tone="success">All systems operational</Badge><Button variant="secondary" onClick={() => notify('Report export queued')}>Export report</Button></div></section>

        {tab === 'Overview' && <>
          <section className="kpis-grid">{[['Monthly recurring', '$1.84M', '+14.8%'], ['Active tenants', '2,184', '+9.2%'], ['SLA uptime', '99.96%', '+0.12%'], ['Open escalations', '24', '-18.3%']].map(([label, value, delta]) => <div className="kpi-card shell" key={label}><div className="kpi-head"><span>{label}</span><Badge tone={delta.startsWith('+') ? 'success' : 'warning'}>{delta}</Badge></div><strong className="kpi-value">{value}</strong><div className="sparkline"><i/><i/><i/><i/><i/><i/></div></div>)}</section>
          <section className="panel-grid"><div className="card shell"><div className="card-header"><div><h3>Revenue momentum</h3><small>Normalized value, trailing 12 months</small></div><Badge tone="info">Live</Badge></div><Chart color="#8b5cf6" /></div><div className="card shell"><div className="card-header"><div><h3>Operational throughput</h3><small>Workflows by week</small></div></div><Bars /></div><div className="card shell"><div className="card-header"><div><h3>Adoption coverage</h3><small>Active workspace coverage</small></div></div><Chart color="#22c55e" /></div></section>
          <section className="bottom-grid"><div className="card shell"><div className="card-header"><div><h3>Tenant health</h3><small>Risk distribution across portfolio</small></div><Button variant="ghost" onClick={() => setTab('Tenants')}>View tenants</Button></div><div className="health-layout"><div className="donut"><strong>84%</strong><span>healthy</span></div><div className="legend-stack"><div><span className="dot green"/>Healthy<strong>72%</strong></div><div><span className="dot amber"/>Warning<strong>21%</strong></div><div><span className="dot red"/>Critical<strong>7%</strong></div></div></div></div><div className="card shell"><div className="card-header"><div><h3>Operations summary</h3><small>This week</small></div></div><div className="summary-list"><div><span>Deployments</span><strong>18</strong></div><div><span>Policy exceptions</span><strong>04</strong></div><div><span>Pending approvals</span><strong>11</strong></div><div><span>Escalations closed</span><strong>93%</strong></div></div></div></section>
        </>}

        {tab === 'Tenants' && <section className="records-layout"><div className="table-panel shell"><div className="table-toolbar"><input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tenant, ID, or owner"/><select value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select><select value={status} onChange={(event) => setStatus(event.target.value)}>{statuses.map((item) => <option key={item}>{item}</option>)}</select><select value={segment} onChange={(event) => setSegment(event.target.value)}>{segments.map((item) => <option key={item}>{item}</option>)}</select></div><div className="bulk-bar"><span>{selectedIds.length} selected</span><div><Button variant="ghost" onClick={() => notify('Export queued')}>Export</Button><Button variant="secondary" onClick={() => notify('Bulk status update queued')}>Update status</Button><Button variant="danger" onClick={() => notify('Archive request submitted')}>Archive</Button></div></div><div className="table-scroll"><table><thead><tr><th/><th>Tenant</th><th>Owner</th><th>Region</th><th>Status</th><th>Risk</th><th>Spend</th><th>Users</th></tr></thead><tbody>{filtered.slice(0, 120).map((tenant) => <tr key={tenant.id} className={selected.id === tenant.id ? 'selected' : ''} onClick={() => setSelected(tenant)}><td onClick={(event) => event.stopPropagation()}><input type="checkbox" checked={selectedIds.includes(tenant.id)} onChange={() => toggle(tenant.id)}/></td><td><strong>{tenant.name}</strong><small>{tenant.id}</small></td><td>{tenant.owner}</td><td>{tenant.region}</td><td><Badge tone={tenant.status === 'Active' ? 'success' : tenant.status === 'Review' ? 'warning' : 'info'}>{tenant.status}</Badge></td><td><Badge tone={tenant.risk === 'High' ? 'danger' : tenant.risk === 'Medium' ? 'warning' : 'success'}>{tenant.risk}</Badge></td><td>{money(tenant.spend)}</td><td>{tenant.users.toLocaleString()}</td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state"><strong>No tenants found</strong><span>Try clearing a filter or changing your search.</span></div>}</div></div><aside className="detail-panel shell"><div className="card-header"><div><p className="eyebrow">Tenant details</p><h2>{selected.name}</h2></div><Badge tone="success">{selected.status}</Badge></div><div className="detail-metrics"><div><small>Tenant ID</small><strong>{selected.id}</strong></div><div><small>Environment</small><strong>Production</strong></div><div><small>Systems</small><strong>14 connected</strong></div></div><label>Owner<input value={selected.owner} readOnly/></label><label>Policy baseline<select defaultValue="Enhanced"><option>Standard</option><option>Enhanced</option><option>Regional</option></select></label><div className="side-actions"><Button variant="secondary" onClick={() => notify('Draft saved')}>Save draft</Button><Button onClick={() => notify('Configuration published')}>Publish</Button></div></aside></section>}

        {tab === 'Configuration' && <section className="config-layout"><div className="card shell"><div className="card-header"><div><h3>Configuration hierarchy</h3><small>Global control plane topology</small></div><Badge tone="info">12 nodes</Badge></div><Tree name="Global Control Plane" type="domain" depth={0} children={[{ name: 'North America', type: 'region', children: [{ name: 'Production', type: 'environment', children: [{ name: 'Identity', type: 'service' }, { name: 'Billing', type: 'service' }, { name: 'Workflow Engine', type: 'service' }] }] }, { name: 'EMEA', type: 'region', children: [{ name: 'Staging', type: 'environment', children: [{ name: 'Reporting', type: 'service' }, { name: 'Secrets Vault', type: 'service' }] }] }]} /></div><div className="card shell"><div className="card-header"><div><h3>Baseline settings</h3><small>Policy matrix by service</small></div></div><div className="config-grid">{[['Identity', 'SCIM + SAML', 'Healthy', 'success'], ['Billing', 'Usage caps', 'Review', 'warning'], ['Workflow', 'Retry policy', 'Managed', 'info'], ['Edge', 'Traffic shaping', 'Healthy', 'success']].map(([a, b, c, d]) => <div className="config-card" key={a}><small>{a}</small><strong>{b}</strong><Badge tone={d}>{c}</Badge></div>)}</div></div></section>}

        {tab === 'Dependencies' && <section className="card shell"><div className="card-header"><div><h3>Dependency map</h3><small>Inter-service topology and change impact</small></div><Badge tone="success">Healthy</Badge></div><div className="dependency-map">{['Identity', 'Portal', 'CRM', 'Billing', 'Workflow', 'Reporting'].map((item, index) => <div className={`dependency-node n${index}`} key={item}><strong>{item}</strong><small>{index === 3 ? 'Core' : 'Service'}</small></div>)}<div className="connection c1"/><div className="connection c2"/><div className="connection c3"/><div className="connection c4"/></div></section>}

        {tab === 'Audit log' && <section className="card shell"><div className="card-header"><div><h3>Audit history</h3><small>Policy, compliance, and system events</small></div><Button variant="secondary" onClick={() => notify('Audit export queued')}>Export log</Button></div><div className="timeline">{audits.map(([time, actor, action, type]) => <div className="timeline-item" key={action}><div className="timeline-dot"/><div><div className="timeline-topline"><strong>{action}</strong><Badge tone={type === 'Approval' ? 'success' : type === 'System' ? 'info' : 'neutral'}>{type}</Badge></div><small>{actor} · {time}</small></div></div>)}</div></section>}

        <section className="card shell csv-panel"><div className="card-header"><div><p className="eyebrow">Data quality</p><h3>CSV import preview</h3></div><Button variant="secondary" onClick={() => setCsvOpen(!csvOpen)}>{csvOpen ? 'Hide preview' : 'Show preview'}</Button></div>{csvOpen && <div className="csv-content"><div className="table-scroll"><table><thead><tr><th>Company</th><th>Domain</th><th>Owner</th><th>Status</th></tr></thead><tbody>{[['Northwind Dynamics', 'finance.northwind.com', 'R. Miner', 'Active'], ['Atlas Harbor', 'ops.atlasharbor.io', 'M. Green', 'Review'], ['Aster Labs', 'prod.asterlabs.net', 'S. Patel', 'Pending']].map((row) => <tr key={row[0]}>{row.map((value, index) => <td key={value}>{index === 3 ? <Badge tone={value === 'Active' ? 'success' : 'warning'}>{value}</Badge> : value}</td>)}</tr>)}</tbody></table></div><div className="issues-panel"><strong>2 validation issues</strong><p>Row 3: missing attestation date.</p><p>Row 6: duplicate domain.</p></div></div>}</section>
      </main>

      {wizard && <div className="modal-backdrop"><div className="modal-card shell"><div className="card-header"><div><p className="eyebrow">Create tenant</p><h2>New configuration</h2></div><button className="close-button" onClick={() => setWizard(false)}>×</button></div><div className="wizard-steps"><span className={step === 1 ? 'active' : ''}>1 Basics</span><span className={step === 2 ? 'active' : ''}>2 Controls</span><span className={step === 3 ? 'active' : ''}>3 Review</span></div>{step === 1 && <div className="form-grid"><label>Entity name<input placeholder="e.g. Northwind Labs"/></label><label>Owner<input placeholder="e.g. A. Patel"/></label></div>}{step === 2 && <div className="form-grid"><label>Region<select><option>North America</option><option>EMEA</option><option>APAC</option></select></label><label>Policy<input defaultValue="Standard"/></label></div>}{step === 3 && <div className="review-box"><strong>Ready to create tenant</strong><span>Configuration will start in draft status and require approval before publish.</span></div>}<div className="modal-actions"><Button variant="secondary" onClick={() => setWizard(false)}>Cancel</Button>{step < 3 ? <Button onClick={() => setStep(step + 1)}>Next</Button> : <Button onClick={() => { setWizard(false); notify('Tenant created successfully'); }}>Create tenant</Button>}</div></div></div>}
      {toast && <div className="toast success">{toast}</div>}
    </div>
  );
}

function Chart({ color }: { color: string }) { return <svg className="chart-svg" viewBox="0 0 360 150"><polyline fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" points="0,125 35,110 70,118 105,80 140,92 175,57 210,67 245,35 280,55 315,20 360,28"/><polyline fill="none" stroke={color} strokeOpacity=".15" strokeWidth="28" points="0,125 35,110 70,118 105,80 140,92 175,57 210,67 245,35 280,55 315,20 360,28"/></svg>; }
function Bars() { return <div className="bars">{[45, 62, 38, 72, 66, 88, 76, 95, 70, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }}/>)}</div>; }
function Tree({ name, type, depth, children = [] }: { name: string; type: string; depth: number; children?: { name: string; type: string; children?: { name: string; type: string }[] }[] }) { return <div className="tree-node" style={{ marginLeft: depth * 22 }}><div className="tree-row"><span className="tree-bullet"/><strong>{name}</strong><small>{type}</small></div>{children.map((child) => <Tree key={child.name} {...child} depth={depth + 1}/>)}</div>; }
