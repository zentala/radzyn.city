# Radzyń City Portal - TODO List

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

## Previous TODO Items (Legacy)

## Priority 1: UI Framework Standardization
- [x] Replace Tailwind CSS with MUI components in several key pages [10]
- [x] Refactor PlaceholderImage component to use MUI styling exclusively [9]
- [x] Update News, City, County, and Contact pages to use MUI components [10]
- [x] Convert Events page from Tailwind to MUI styling system [9]
- [ ] Convert remaining pages from Tailwind to MUI styling system [9]
- [ ] Remove Tailwind CSS dependencies from project [8]
- [ ] Implement consistent MUI theming throughout application [9]
- [ ] Convert all custom CSS to MUI's sx prop and styled components [8]

## Completed Features
- ✅ Simple Map Integration
- ✅ Enhanced Weather Implementation
- ✅ Homepage Dashboard Modules with Material UI
- ✅ Real web scraping for local news sources
- ✅ AI-based categorization of news articles
- ✅ Keyword extraction and tagging
- ✅ Independent cron-based scraper process
- ✅ Admin interface for scraper configuration
- ✅ Material UI design system implementation
- ✅ Consistent component styling with MUI theme

## Priority 3: Technical & Polish

### Performance Optimization
- [ ] Set up basic performance monitoring [5]
- [ ] Implement code-splitting to reduce initial load time [6]
- [ ] Add service worker for offline capabilities [7]
- [x] Optimize image loading with MUI Skeleton placeholders [4]

### Responsive Enhancements
- [ ] Implement responsive tables for mobile views [6]
- [x] Add mobile-specific navigation improvements [7]
- [x] Create adaptive layouts with MUI responsive utilities [8]

## Priority 4: Current Implementation Focus

### Announcements/Classifieds System
- [ ] Set up database schema for announcements [8]
- [ ] Create fake example data for initial development [10]
- [ ] Implement filtering and categorization [9]
- [ ] Add sorting by date, relevance, location [7]
- [ ] Create announcement detail page template [8]
- [ ] Add form for community-submitted announcements [9]

### Places Catalog
- [x] Enhance locations database with additional fields [7]
- [x] Add detailed business information (hours, contact info) [8]
- [x] Implement user ratings and reviews [9]
- [x] Create dedicated place detail pages [7]
- [x] Add search functionality for places [8]
- [ ] Create admin tools for place management [6]

## Future Development (Post-MVP)

### Interactive City Experience
- [ ] Create virtual tour of key attractions [7]
- [ ] Add 360° photos where available [8]
- [ ] Implement guided navigation between points [6]
- [ ] Add historical information at each stop [7]
- [ ] Create AR (Augmented Reality) experiences for landmarks [10]

### Community Engagement Features
- [ ] Allow user photo submissions [6]
- [ ] Implement community events submission [7]
- [ ] Add commenting functionality to news and places [5]
- [ ] Create user accounts and profiles [8]
- [ ] Add social sharing integration [4]
- [ ] Implement community forum or discussion board [9]

### Administration Panel
- [ ] Create secure admin login with role-based access [7]
- [ ] Build comprehensive content management system [9]
- [ ] Add analytics dashboard with visitor tracking [8]
- [ ] Implement content approval workflows [6]
- [ ] Create automated content moderation system [8]

### Mobile App Development
- [ ] Convert web app to PWA (Progressive Web App) [8]
- [ ] Implement push notifications for local news and events [7]
- [ ] Add offline capabilities for essential information [6]
- [ ] Create dedicated mobile interfaces [9]
