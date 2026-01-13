# Radzyń City Portal - TODO List
> Source of truth: this file. Legacy: `todo.md`.

## 📋 Joy UI Migration Plan
**Complete migration documentation:** [`plans/joy-ui-migrate-task.md`](plans/joy-ui-migrate-task.md)

### Phase 1: Foundation (Week 1-2) ✅
- [x] Install Joy UI dependencies (@mui/joy)
- [x] Create Joy UI theme configuration (src/theme/joy-theme.ts)
- [x] Create design token utilities (src/utils/design-tokens.ts)
- [x] Update ThemeRegistry to use Joy UI CssVarsProvider
- [x] Clean up globals.css (remove Tailwind directives)
- [x] Create base layout components (PageContainer, Section)
- [x] Create foundation components (Button, Typography, Card, Icon)
- [x] Set up component directory structure
- [x] Create mock data files (news, events, places, weather)
- [ ] Test theme configuration

### Phase 2: Core Components (Week 3-4)
- [ ] Migrate Button component
- [ ] Migrate Input/TextField components
- [ ] Migrate Card components
- [ ] Migrate Chip component
- [ ] Migrate Alert component
- [ ] Migrate Skeleton component

### Phase 3: Navigation & Layout (Week 5-6)
- [ ] Migrate Navigation component
- [ ] Create responsive layouts
- [ ] Implement footer component
- [ ] Update layout.tsx

### Phase 4: Page Migration - Public (Week 7-9)
- [ ] Migrate homepage
- [ ] Migrate news pages
- [ ] Migrate events pages
- [ ] Migrate places pages
- [ ] Migrate contact page

---

## 📅 Events: Supabase-backed calendar (Guide as source of truth)

### Target state
- [x] Define Events architecture + backlog (`plans/events-calendar-spec.md`)
- [x] Add Supabase schema migration for `event_categories` + `events` (with `events.location_id → locations.id`)
- [x] Data model note: Guide POI API exposes `location.id` as UUID (not slug), so Events link to locations via FK `events.location_id` (UUID). Event time is stored as ISO timestamps (`start_at`, `end_at`) and formatted for PL in the portal UI.
- [x] Add seed sample categories + events linked to venues/POIs
- [x] Extend `guide` Edge Function `api-v1` with public endpoints:
  - `GET /event-categories`
  - `GET /events`
  - `GET /events/:slug`
- [x] Portal integration:
  - Replace hardcoded events on homepage + `/events`
  - Add `/events/[slug]` details page
  - Add API-first hooks with local fallback
- [x] Playwright smoke tests for list + details navigation

### Phase 5: Page Migration - Admin (Week 10-11)
- [ ] Migrate admin dashboard
- [ ] Migrate admin scraper page
- [ ] Implement admin-specific components

### Phase 6: Advanced Components (Week 12)
- [ ] Implement Priority 2-3 components
- [ ] Add interactive components
- [ ] Implement form components

### Phase 7: Testing & Polish (Week 13)
- [ ] Test all pages
- [ ] Fix bugs
- [ ] Optimize performance
- [ ] Ensure responsive design

### Phase 8: Documentation & Handoff (Week 14)
- [ ] Update documentation
- [ ] Create component library docs
- [ ] Final review

---

## 🗺️ Map migration: reuse `guide` map as React component (no iframe)

### Target state
- [x] Define shared contract: `MapDataProvider` (fetch POIs, categories, details)
- [x] Create shared package in `guide`: `@radzyn/geo-map` (React component + types)
- [x] Publish distribution strategy (workspace first, then GH Packages / npm)
- [x] Integrate `@radzyn/geo-map` into `radzyn.city` `/map`
- [x] Add deep-linking contract (e.g. `?poi=<id>`, `?category=<slug>`)
- [x] Add minimal observability (API errors, empty state, fallback UI)
- [x] Create Supabase Edge Functions API v1 in `guide` (implemented + queries fixed)
- [x] Configure local env for Edge Function (`guide/supabase/.env.local`)
- [x] Verified local Edge Function serve via terminal (Deno bypass for WSL2)
- [x] Sync Home Page and Places Page with new API source (useGuideData hook)
- [ ] Deploy + verify Supabase Edge Function to production Supabase
- [ ] Set `NEXT_PUBLIC_GUIDE_API_BASE_URL` for production env
- [ ] Finalize docs: use `migration-vision.step2.md` as the single source of truth

---

## 💡 Suggestions (feature requests) + voting (special mode)

### Target state
- [ ] Define database schema (suggestions, votes, comments optional)
- [ ] Implement status workflow: `proposed` → `under_review` → `planned` → `in_progress` → `implemented` / `rejected` / `duplicate`
- [ ] Public "Suggestions mode" UI (list + detail + vote)
- [ ] One vote per user/session with rate limiting
- [ ] Admin moderation UI (status changes, merging duplicates)
- [ ] API endpoints (public read, public vote, admin update)


---

## 📰 News: Multi-source scraper system (Supabase-backed)

### Phase 1: Persistence & Tracking
- [x] Create Supabase schema for `news_sources`, `news_articles`, and `news_categories`
- [ ] Implement central scraper configuration (selectors + frequencies)
- [ ] Migrate `scraperService.ts` to use Supabase instead of memory
- [ ] Implement deduplication logic based on `source_url`

### Phase 2: Implementation & Integration
- [ ] Implement `iledzisiaj.pl` scraper (cheerio/puppeteer)
- [ ] Implement `radzyn.24wspolnota.pl` scraper
- [ ] Implement `kochamradzyn.pl` scraper
- [ ] Implement official city/gmina portal scrapers
- [ ] Implement AI-driven categorization and summaries

### Phase 3: Scheduling & Maintenance
- [ ] Set up GitHub Actions workflow for periodic scraping
- [ ] Add `frequency_minutes` check to the scraper orchestrator
- [ ] Implement basic error reporting for failed scrapes

---

## ✅ Completed Features
- [x] **Developer Experience**: Cleaned up VS Code tasks by removing non-functional geo-map dev script and updating service dependencies
- [x] **Developer Experience**: Added VS Code tasks and launch configurations for project services (Portal, GeoMap package, Supabase, Scraper)
- [x] **Graceful Shutdown**: Implemented port checking and cleanup handlers for dev server and background services
- [x] **County Page**: Reworked "Historia (oś czasu)" into a proper Joy UI timeline component (dots + connectors + date chip)
