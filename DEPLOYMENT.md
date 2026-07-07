# Deployment Guide — Global Careers by Testbook

## Overview

The site builds to a single `dist/index.html` (all JS/CSS inlined via `vite-plugin-singlefile`).
It can be deployed on any static host. The recommended setup is a GitHub → CI/CD pipeline.

---

## 1. GitHub Setup

Your tech team should:

```bash
git clone <this-repo-url>
cd germany-nursing
npm install
```

---

## 2. Environment

No `.env` file is required — the Supabase credentials are embedded in `src/lib/supabase.js`
(anon key, safe for frontend use). If you want to move them to env vars in future:

```bash
# .env
VITE_SUPABASE_URL=https://lrcimdchhbsgbnvdmpwd.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Then update `src/lib/supabase.js` to use `import.meta.env.VITE_SUPABASE_URL` etc.

---

## 3. Build

```bash
npm run build
# Outputs: dist/index.html
```

---

## 4. Hosting Options

### Option A — Testbook CDN / Static Server (recommended)
Upload `dist/index.html` to your CDN or static server at the target URL.
All routes use `HashRouter` (`/#/life-in-germany`) so no server-side routing config is needed.

### Option B — Vercel (fastest for testing)
```bash
npm install -g vercel
vercel --prod
```
Set output directory to `dist`.

### Option C — Nginx
```nginx
server {
  listen 80;
  server_name globalcareers.testbook.com;
  root /var/www/germany-nursing;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

---

## 5. CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Germany Nursing

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy
        # Replace with your actual deploy step — S3, SCP, Vercel, etc.
        run: echo "Upload dist/index.html to your host here"
```

---

## 6. Supabase RLS Check

Before going live, verify these Row Level Security policies exist in your Supabase project:

| Table | Operation | Role | Condition |
|---|---|---|---|
| `form_leads` | INSERT | anon | `true` (allow all inserts) |
| `form_leads` | SELECT | anon | `lead_phone = current_phone` (or restrict as needed) |
| `bd_members` | SELECT | anon | `is_active = true` |
| `bd_counter` | SELECT | anon | `id = 1` |
| `bd_counter` | UPDATE | anon | `id = 1` |
| `users` | SELECT | anon | `phone = <submitted phone>` (for dedup only) |

---

## 7. Post-Deployment Checklist

- [ ] Form submits successfully and lead appears in BD Dashboard → 📥 Social Media Leads with source `website`
- [ ] Duplicate phone is silently skipped (submit same number twice → only one row in DB)
- [ ] Round-robin: check `bd_counter.next_idx` advances after each submission
- [ ] OG tags render correctly (use [opengraph.xyz](https://www.opengraph.xyz) to preview)
- [ ] Favicon loads (check browser tab)
- [ ] `/terms` page accessible and linked from footer
- [ ] WhatsApp button opens correct number
