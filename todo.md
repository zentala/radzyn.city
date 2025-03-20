# Radzyń City Portal MVP - TODO List

## Priority 3: Technical & Polish

### Performance Optimization
- [ ] Set up basic performance monitoring [5]

### Simple Map Integration
- [ ] Mark key locations on the map [9]
- [ ] Add basic tooltips for locations [7]
- [ ] Create simple POI (points of interest) list [8]

## Priority 4: New Features from Vision Document

### Enhanced Weather Implementation
- [ ] Implement real weather data integration with API [7]
- [ ] Create dedicated weather page at /pogoda/ [6]
- [ ] Add 7-day forecast with detailed information [6]
- [ ] Implement caching for API requests [5]
- [ ] Add visual weather indicators (icons, animations) [8]

### Homepage Dashboard Modules - IMPLEMENTATION PLAN
- [ ] Install Material-UI 5 package and dependencies [10]
  ```
  pnpm add @mui/material @emotion/react @emotion/styled @mui/icons-material
  ```
- [ ] Create modular dashboard layout framework in homepage [10]
- [ ] Set up responsive widget grid system with MUI Grid [9]
- [ ] Implement Dashboard context provider for state management [8]
- [ ] Refactor existing widgets to use MUI Card components [8]
- [ ] Create widget configuration options [6]
- [ ] Add loading states using MUI Skeleton components [8]

### News Aggregation System
- [ ] Set up independent cron-based scraper process [9]
- [ ] Create database schema for storing scraped news [8]
- [ ] Implement fake example data for initial development [10]
- [ ] Add data normalization for multiple sources [7]
- [ ] Create admin interface for scraper configuration [6]

### Announcements/Classifieds System
- [ ] Set up database schema for announcements [8]
- [ ] Create fake example data for initial development [10]
- [ ] Implement filtering and categorization [9]
- [ ] Add sorting by date, relevance, location [7]
- [ ] Create announcement detail page template [8]

### Places Catalog
- [ ] Implement locations database with categories (shops, services, culture, sports, etc.) [9]
- [ ] Create map-based browsing interface [10]
- [ ] Add category filtering system [8]
- [ ] Implement place detail pages [7]
- [ ] Add search functionality for places [8]
- [ ] Create admin tools for place management [6]

## Future Development (Post-MVP)

### Internationalization Support
- Add English language support [5]
- Implement language switcher [4]
- Translate all static content [5]
- Handle language-specific formatting [3]

### Server-side Weather Implementation
- Move API calls to server-side [5]
- Set up proper caching [4]
- Implement error handling [5]
- Add more detailed weather information [6]

### Interactive City Tour
- Create virtual tour of key attractions [7]
- Add 360° photos where available [8]
- Implement guided navigation between points [6]
- Add historical information at each stop [7]

### User-Generated Content
- Allow user photo submissions [6]
- Implement community events submission [7]
- Add commenting functionality [5]
- Create moderation system [4]

### Administration Panel
- Create secure admin login [5]
- Build news/events management interface [7]
- Implement content editing capabilities [6]
- Add analytics dashboard [5]