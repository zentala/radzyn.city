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
- [x] Create Supabase Edge Functions API v1 in `guide` (skeleton implemented)
- [ ] Deploy + verify Supabase Edge Function (local serve + curl, then deploy + curl)
- [ ] Set `NEXT_PUBLIC_GUIDE_API_BASE_URL` to the *Supabase API gateway* host (not Studio)
- [ ] Connect `radzyn.city` to use API as primary source (keep local fallback until stable)
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

