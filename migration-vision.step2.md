# Map migration (Step 2) — single source of truth (v2)

This document replaces `migration-vision.md` as the authoritative implementation guide for the map migration.

## Goal

- `radzyn.city` uses the shared React map component from `guide` (**no iframe**).
- POI data is served from `guide` through **Supabase Edge Functions** (we “live with functions”).
- Host (`radzyn.city`) owns routing/deep links and UX, `guide` owns data (single source of truth).

## Current state (facts)

### Shared UI package

- `guide/packages/geo-map` exists as `@radzyn/geo-map` and is consumed from `radzyn.city` via local `file:` dependency.
- `radzyn.city` route `/map` renders the map and has Playwright smoke test.

### API (guide)

- `guide/supabase/functions/api-v1` exists (edge function skeleton + routing).
- **Important**: until the function is actually served/deployed behind the real Supabase API gateway URL, remote URLs can return 404.

## Decision: “we live with functions”

There is no `/api/v1` “pretty” prefix in `radzyn.city`. We use Supabase Edge Functions gateway paths:

- **Production / remote Supabase**:
  - `https://<project-ref>.supabase.co/functions/v1/api-v1`
- **Local Supabase**:
  - `http://127.0.0.1:54321/functions/v1/api-v1`

### Environment variable (radzyn.city)

Set:

- `NEXT_PUBLIC_GUIDE_API_BASE_URL=<function-root-url>`

Examples:

- `NEXT_PUBLIC_GUIDE_API_BASE_URL=http://127.0.0.1:54321/functions/v1/api-v1`
- `NEXT_PUBLIC_GUIDE_API_BASE_URL=https://<project-ref>.supabase.co/functions/v1/api-v1`

> Note: `https://supabase.dev.zntl` currently responds with Supabase Studio (Next.js 404 for `/functions/v1/...`). That means it is **not** the API gateway host. You must use the **Supabase API URL** shown in Studio: Project Settings → API → “URL”.

## API contract (DTO)

### GET `/pois`

Query params:
- `bbox=west,south,east,north` (optional)
- `q=<text>` (optional)
- `category=<slug>` (optional)

Response (array):

```json
[
  {
    "id": "palac-potockich",
    "name": "Pałac Potockich",
    "coordinates": [22.6190, 51.7830],
    "category": { "slug": "zabytki", "name": "Zabytki" }
  }
]
```

### GET `/pois/:id`

Response:

```json
{
  "id": "palac-potockich",
  "name": "Pałac Potockich",
  "coordinates": [22.6190, 51.7830],
  "category": { "slug": "zabytki", "name": "Zabytki" }
}
```

### GET `/poi-categories`

```json
[
  { "slug": "zabytki", "name": "Zabytki" }
]
```

**Coordinates are always `[lng, lat]`.**

## What to do next (tasks)

### A) For the agent (code tasks)

#### A1) Make the edge function runnable (local serve) and verifiable

- Add a local `.cursorignore` / TS lint exclusions or configure TypeScript to not typecheck Deno files in `guide/supabase/functions/**` inside `radzyn.city` workspace (otherwise editors will show TS errors like “Cannot find name Deno”).
- Verify local serve works:
  - `cd guide && npx supabase functions serve api-v1 --no-verify-jwt --env-file supabase/.env.local`
- Verify endpoints:
  - `curl -i http://127.0.0.1:54321/functions/v1/api-v1/poi-categories`
  - `curl -i http://127.0.0.1:54321/functions/v1/api-v1/pois`

#### A2) Fix/confirm DB queries in edge function

- Ensure the schema matches:
  - `locations.kind = 'poi'`
  - `locations.coordinates` is geography/geometry point and mapping to `[lng,lat]` is correct
  - categories join works (table name, relationship).

#### A3) Radzyn.city: feature-flag API usage

- Keep local data as default.
- If `NEXT_PUBLIC_GUIDE_API_BASE_URL` is set, use API provider.
- Add a test that is skipped when env is not set (so CI stays green).

### B) For mid devs (ops tasks)

#### B1) Find the correct API base URL

In Supabase Studio:
- Project Settings → API → copy “URL”
- Build function root:
  - `${URL}/functions/v1/api-v1`

#### B2) Deploy edge function

Requires Supabase CLI authentication:
- `cd guide`
- `npx supabase login` (interactive)
- `npx supabase link --project-ref <project-ref>`
- `npx supabase functions deploy api-v1`

#### B3) Smoke test remote

- `curl -i ${URL}/functions/v1/api-v1/poi-categories`
- If TLS uses custom CA, ensure your environment trusts it (CI may need CA bundle).

## What is “done” vs “not done” (Definition of Done)

**Done:**
- Shared package exists and `/map` renders it.
- Playwright smoke test for `/map` passes without any external API.
- Edge Function `api-v1` implemented with PostGIS support and category joins.
- `radzyn.city` has `guideDataProvider` and feature-flag ready in `MapClient`.
- Local `.env.local` for `guide` prepared with discovered keys.
- **SUCCESS**: Edge Function verified via Deno bypass in WSL2 (coordinates parsing fixed).
- **SUCCESS**: Database tables created manually via Studio.
- **SUCCESS**: `useGuideData` hook created and integrated into Home Page Map Widget and Places Page.

**Not done yet:**
- Verified remote deployed function URL.
- Deploy migrations to production.

## Notes about env files in this repo

This repo's tooling may ignore `.env*` files in the editor environment. If you need an example, keep it in documentation (this file) and create your local `.env.local` manually.


