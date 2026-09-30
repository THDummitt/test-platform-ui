# Test Platform UI

A synthetic React + TypeScript enterprise administration interface built for experimentation. It has no backend and uses generated in-memory data only.

## Run locally or in Codespaces

```bash
npm install
npm run dev
```

Open the forwarded port `3000`.

## Available views

- Overview dashboard with KPI cards and charts
- Searchable tenant table with 520 generated records
- Filters, bulk actions, detail side panel, and empty state
- Nested configuration hierarchy
- Dependency visualization
- Audit timeline
- CSV import preview with validation issues
- Three-step create tenant wizard
- Toasts, responsive layout, and dark/light mode

Build verification:

```bash
npm run build
```

All company names, users, domains, metrics, and activity are synthetic.
