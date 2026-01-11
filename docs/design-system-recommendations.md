# REKOMENDACJE NAPRAWY SYSTEMU DESIGNU

## UX DESIGNER & UI DEVELOPER PERSPECTIVE

Data: 2026-01-11
Author: Claude Sonnet 4.5 (UX/UI Analysis)

---

## FILOZOFIA DESIGNU

### Obecny stan:
- **Styl:** Baroque-inspired (barokowy pałac Potockich)
- **Paleta:** Navy Blue (#25456B) + Gold (#BE9C55)
- **Mood:** Elegancki, historyczny, polski

### Cel docelowy:
> **"Elancko w chuj"** - User requirement

**Interpretacja:**
- Minimalistyczny ale bogaty w detale
- Spójne zaokrąglenia i spacing
- Perfekcyjny kontrast i czytelność
- Smooth animations i transitions
- Zero visual bugs

---

## SYSTEM KOLORÓW - PRZEPROJEKTOWANIE

### Problem: Niespójne kolory między light i dark mode

### Rozwiązanie: Color System 2.0

```typescript
// Nowy system - 3 warstwy kolorów:

1. SURFACE COLORS (tła)
   - background.body      // Main page bg
   - background.surface   // Cards, sheets
   - background.level1-3  // Elevated surfaces

2. CONTENT COLORS (tekst, ikony)
   - text.primary         // Main text (WCAG AAA)
   - text.secondary       // Subtle text (WCAG AA)
   - text.tertiary        // Disabled text (WCAG AA Large)

3. BRAND COLORS (akcje, akcenty)
   - primary.solid        // Buttons, links
   - secondary.solid      // Highlights, badges
   - semantic colors      // Success, warning, error, info
```

### Reguły kontrastowe:

| Kombinacja | Light Mode | Dark Mode | Min Contrast |
|------------|------------|-----------|--------------|
| Body text | black → white bg | white → black bg | 7:1 (AAA) |
| Secondary text | gray → white bg | light gray → black bg | 4.5:1 (AA) |
| Brand buttons | white → navy bg | white → navy bg | 4.5:1 (AA) |
| Accent cards | **dynamic** | **dynamic** | 4.5:1 (AA) |

### Implementacja dynamic contrast:

```typescript
// theme/joy-theme.ts

const getContrastColor = (bgColor: string, mode: 'light' | 'dark') => {
  const luminance = calculateLuminance(bgColor);

  if (mode === 'dark') {
    return luminance > 0.5 ? 'neutral.900' : 'white';
  } else {
    return luminance > 0.5 ? 'neutral.900' : 'white';
  }
};

// Usage w komponencie:
<Card variant="solid" color="warning">
  <Typography
    sx={{
      color: (theme) =>
        theme.palette.mode === 'dark'
          ? 'neutral.900'  // Ciemny tekst na jasnym tle
          : 'white'        // Jasny tekst na ciemnym tle
    }}
  >
    Wydarzenia
  </Typography>
</Card>
```

---

## SYSTEM ZAOKRĄGLEŃ - HIERARCHIA

### Problem: Inconsistent borderRadius (6px, 8px, 2, 'md')

### Rozwiązanie: Unified Border Radius System

```typescript
// 5-step scale (Golden Ratio inspired)

borderRadius: {
  none: '0px',     // Navbar, footer, full-width elements
  sm:   '4px',     // Chips, badges, small buttons
  md:   '8px',     // Cards, inputs, standard buttons
  lg:   '12px',    // Large cards, modals
  xl:   '16px',    // Hero sections, feature cards
  full: '9999px',  // Pills, avatars
}
```

### Reguły użycia:

| Element | Border Radius | Uzasadnienie |
|---------|---------------|--------------|
| Navbar | `none` | Full-width, shouldn't have rounded corners |
| Footer | `none` | Full-width, shouldn't have rounded corners |
| Buttons | `md` (8px) | Standard clickable elements |
| Inputs | `md` (8px) | Match buttons |
| Cards | `lg` (12px) | More prominent, softer |
| Chips/Badges | `sm` (4px) | Small, subtle rounding |
| Hero cards | `xl` (16px) | Feature elements |
| Avatars | `full` | Perfect circles |

### Component overrides - USUNĄĆ hardcoded wartości:

```typescript
// ❌ BEFORE:
JoyButton: {
  styleOverrides: {
    root: { borderRadius: '6px' }  // Hardcoded!
  }
}

// ✅ AFTER:
JoyButton: {
  defaultProps: {
    sx: { borderRadius: 'md' }  // Używa tokenu
  }
}
```

---

## TYPOGRAPHY - SYSTEM SKALOWANIA

### Problem: Mixing Material UI variants (h6, body2) z Joy UI levels

### Rozwiązanie: Pure Joy UI Typography

```typescript
// ONLY Joy UI levels:

Headings:
  h1, h2, h3, h4

Titles:
  title-lg, title-md, title-sm

Body:
  body-lg, body-md, body-sm, body-xs
```

### Font pairing:

```typescript
// Display font (Headings)
"Playfair Display"  // Serif, elegant, baroque

// Body font
"Source Sans Pro"   // Sans-serif, readable, modern

// Mono font (Code)
"Fira Code"         // For technical content
```

### Hierarchia:

```typescript
// Homepage Hero
<Typography level="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
  Radzyń Podlaski
</Typography>

// Section headings
<Typography level="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
  Odkryj Radzyń
</Typography>

// Card titles
<Typography level="title-lg">
  Pałac Potockich
</Typography>

// Body text
<Typography level="body-md">
  Barokowy pałac z XVIII wieku...
</Typography>
```

---

## SPACING SYSTEM - 8PT GRID

### Obecny stan:
```typescript
spacing = (factor: number) => `${factor * 8}px`
```

✅ To jest DOBRE! 8pt grid to industry standard.

### Reguły użycia:

| Spacing | Value | Usage |
|---------|-------|-------|
| 0.5 | 4px | Tight (icon + text) |
| 1 | 8px | Small gaps |
| 2 | 16px | Standard gap |
| 3 | 24px | Section spacing |
| 4 | 32px | Large section spacing |
| 6 | 48px | Hero sections |
| 8 | 64px | Page sections |

### Implementacja w komponentach:

```typescript
// ✅ Card spacing
<Card sx={{ p: 3 }}>  // 24px padding

// ✅ Stack spacing
<Stack spacing={2}>  // 16px gap

// ✅ Grid spacing
<Grid spacing={3}>  // 24px gap
```

---

## DARK MODE - PROPER IMPLEMENTATION

### Problem: FOUC (Flash of Unstyled Content)

### Rozwiązanie: 3-step approach

#### 1. Initial Theme Script (CRITICAL)

```tsx
// src/app/layout.tsx <head>

<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          // Get saved preference or system preference
          const savedMode = localStorage.getItem('joy-mode');
          const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          const mode = savedMode || systemMode;

          // Set immediately before render
          document.documentElement.setAttribute('data-joy-color-scheme', mode);
          document.documentElement.style.colorScheme = mode;

          // Prevent FOUC
          document.documentElement.classList.add('color-scheme-ready');
        } catch (e) {
          console.error('Theme initialization error:', e);
        }
      })();
    `,
  }}
/>
```

#### 2. CSS Transitions

```css
/* globals.css */

html:not(.color-scheme-ready) * {
  transition: none !important;  /* Prevent transition on first load */
}

html.color-scheme-ready * {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              border-color 0.2s ease;
}
```

#### 3. ThemeRegistry Enhancement

```tsx
// src/components/ThemeRegistry.tsx

<CssVarsProvider
  theme={joyTheme}
  defaultMode="system"
  modeStorageKey="joy-mode"
  disableTransitionOnChange={false}  // Enable smooth transitions
>
  {children}
</CssVarsProvider>
```

---

## KOMPONENTY - REFACTORING PLAN

### 1. Navigation (CRITICAL)

**Fix:**
```tsx
// ❌ BEFORE (nested links):
<Link href="/">
  <Typography>Radzyń Podlaski</Typography>
</Link>

// ✅ AFTER:
<Typography
  component={Link}
  href="/"
  level="h4"
  sx={{
    textDecoration: 'none',
    color: 'white',
    '&:hover': { opacity: 0.9 }
  }}
>
  Radzyń Podlaski
</Typography>
```

**Remove double padding:**
```tsx
// layout.tsx
<Box component="main">  {/* Remove pt: 8 */}
  {children}
</Box>
```

---

### 2. Homepage Quick Links

**Fix contrast w dark mode:**

```tsx
<Card
  variant="solid"
  color="warning"
  sx={{
    // Dynamic text color based on bg
    '& .MuiTypography-root': {
      color: (theme) =>
        theme.palette.mode === 'dark'
          ? 'neutral.900'  // Dark text on light warning bg
          : 'white'        // Light text on dark warning bg
    }
  }}
>
  <Typography level="h3">Wydarzenia</Typography>
</Card>
```

---

### 3. Footer

**Remove unwanted borderRadius:**

```tsx
<Sheet
  variant="solid"
  sx={{
    bgcolor: 'background.level3',
    mt: 'auto',
    borderRadius: 0,  // No rounding for full-width
    width: '100%',
  }}
>
```

---

### 4. EventCard, NewsCard - Eliminate Material UI

**BEFORE:**
```tsx
import { Card, CardContent, Typography } from '@mui/joy';
import { CardMedia } from '@mui/material';  // ❌ MIXING!

<CardMedia
  component="img"
  height="200"
  image={imageUrl}
/>
```

**AFTER:**
```tsx
import { Card, CardContent, Typography, CardCover, AspectRatio } from '@mui/joy';

<Card>
  <AspectRatio ratio="16/9">
    <CardCover>
      <img src={imageUrl} alt={title} />
    </CardCover>
  </AspectRatio>
  <CardContent>
    <Typography level="title-lg">{title}</Typography>
  </CardContent>
</Card>
```

---

## BROKEN LINKS - TEST IMPLEMENTATION

### Create: `tests/broken-links.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const PAGES = [
  '/',
  '/city',
  '/county',
  '/map',
  '/places',
  '/events',
  '/contact',
  '/news',
  '/pogoda',
];

test.describe('Broken Links Detection', () => {
  for (const page of PAGES) {
    test(`should have no broken links on ${page}`, async ({ page: pw }) => {
      await pw.goto(`http://localhost:3800${page}`);

      // Get all links
      const links = await pw.locator('a[href]').all();
      const brokenLinks: string[] = [];

      for (const link of links) {
        const href = await link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          continue;
        }

        // Check internal links
        if (href.startsWith('/')) {
          const response = await pw.goto(`http://localhost:3800${href}`, {
            waitUntil: 'domcontentloaded',
            timeout: 5000
          }).catch(() => null);

          if (!response || response.status() >= 400) {
            brokenLinks.push(href);
          }
        }

        // Check external links
        if (href.startsWith('http')) {
          const response = await fetch(href, { method: 'HEAD' }).catch(() => null);
          if (!response || response.status >= 400) {
            brokenLinks.push(href);
          }
        }
      }

      expect(brokenLinks).toEqual([]);
      if (brokenLinks.length > 0) {
        console.log(`Broken links on ${page}:`, brokenLinks);
      }
    });
  }
});
```

---

## MIGRATION CHECKLIST

### Phase 1: Critical Fixes (Today)

- [ ] Fix logo link (nested links)
- [ ] Add FOUC prevention script
- [ ] Fix text contrast on cards (dark mode)
- [ ] Remove double padding (128px → 64px)
- [ ] Add solidBg/softBg for all colors
- [ ] Fix React imports (build errors)

### Phase 2: Component Cleanup (Day 2)

- [ ] Remove all @mui/material imports
- [ ] Convert CardMedia → CardCover
- [ ] Convert Material Typography variants → Joy levels
- [ ] Fix Chip variant="filled" → variant="solid"
- [ ] Remove 'primary.light' references
- [ ] Fix Icon color props

### Phase 3: Theme Refinement (Day 3)

- [ ] Remove design-tokens.ts duplication
- [ ] Fix hardcoded borderRadius: '6px'
- [ ] Add borderRadius: 0 to footer
- [ ] Fix hero gradient for dark mode
- [ ] Add CSS transitions for theme switching
- [ ] Add color-scheme meta tag

### Phase 4: Testing & Polish (Day 4)

- [ ] Add broken links test
- [ ] Run all Playwright tests
- [ ] Manual dark/light mode testing
- [ ] Contrast checker (WCAG)
- [ ] Responsive testing (mobile/tablet/desktop)
- [ ] Performance audit (Lighthouse)

---

## SUCCESS METRICS

### Before:
- ❌ 8/12 tests passing
- ❌ Material UI + Joy UI mixing
- ❌ WCAG contrast fails
- ❌ FOUC on load
- ❌ Broken logo link
- ❌ Inconsistent borderRadius

### After:
- ✅ 12/12 tests passing
- ✅ 100% Joy UI components
- ✅ WCAG AA compliant
- ✅ Zero FOUC
- ✅ All links working
- ✅ Consistent design tokens

---

## VISUAL EXAMPLE - BEFORE/AFTER

### Homepage Quick Links

**BEFORE (Dark Mode):**
```
[WARNING CARD - #FFD54F]
    Wydarzenia          ← white text
    ^^^^^ KONTRAST: 1.7:1 ❌ FAIL
```

**AFTER (Dark Mode):**
```
[WARNING CARD - #FFD54F]
    Wydarzenia          ← neutral.900 text
    ^^^^^ KONTRAST: 9.2:1 ✅ PASS AAA
```

---

## FINAL RECOMMENDATION

### Architektura:
1. **Jedna biblioteka:** Joy UI only, zero Material
2. **Jeden source of truth:** joy-theme.ts
3. **Design tokens wszędzie:** Zero hardcoded values

### Design:
4. **WCAG AA minimum:** Dla wszystkich text/bg combinations
5. **Smooth transitions:** Dla theme switching
6. **Spójne zaokrąglenia:** Używanie tokenów

### Performance:
7. **Zero FOUC:** Initial theme script
8. **Fast hydration:** Suppress warnings
9. **Lazy loading:** Dla heavy components

### DX (Developer Experience):
10. **TypeScript strict:** Catch errors early
11. **Component library:** Storybook docs
12. **Automated tests:** Dla critical flows

---

**EXECUTION TIME:** 12-16 godzin pracy
**COMPLEXITY:** Medium-High
**RISK:** Low (incremental changes)
**IMPACT:** High (user experience + maintainability)

🎯 **Goal:** "Elegancko w chuj" - Achieved through consistency, contrast, and cohesion.
