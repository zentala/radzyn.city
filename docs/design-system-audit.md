# RAPORT AUDYTU SYSTEMU DESIGNU - RADZYN.CITY

Data: 2026-01-11
Status: Analiza po migracji Material UI → Joy UI

## EXECUTIVE SUMMARY

System designu jest dobrze przemyślany z barokową paletą kolorów (navy blue + gold), ale implementacja ma **25 krytycznych problemów**:

- ❌ Mixing Material UI i Joy UI components
- ❌ FOUC (Flash of Unstyled Content) przy ładowaniu
- ❌ Niedziałający link logo w navbar
- ❌ Problemy z kontrastem WCAG w dark mode
- ❌ Nieużywanie zdefiniowanych design tokens
- ❌ Duplikacja kodu (design-tokens.ts + joy-theme.ts)

---

## 1. THEME CONFIGURATION

**Lokalizacja:** `src/theme/joy-theme.ts`

### 1.1. KOLORY

#### Light Mode
```typescript
Primary:   #25456B (Navy Blue)
Secondary: #BE9C55 (Gold)
Neutral:   #F9F7F2 → #2A2A2A
Success:   #556B4F (Sage Green)
Warning:   #B2734F (Terracotta)
Error:     #8B3A41 (Burgundy)
Info:      #5D7895 (Steel Blue)
```

#### Dark Mode
```typescript
Primary:   #6B8CB9 (Lighter Navy)
Secondary: #F3AE47 (Brighter Gold)
Neutral:   #000000 → #FFFFFF (inverted)
Success:   #81C784
Warning:   #FFD54F
Error:     #EF5350
Info:      #64B5F6
```

### 🔴 PROBLEM 1: Niekompletne definicje kolorów

**Tylko primary ma:**
```typescript
solidBg: '#25456B',
solidHoverBg: '#1E3856',
solidActiveBg: '#172B42',
```

**Brakuje dla:** secondary, success, warning, error, info

**Skutek:** Joy UI komponenty z `variant="solid" color="warning"` mogą nie działać poprawnie.

**Fix:** Dodać solidBg/softBg/solidHoverBg dla wszystkich kolorów.

---

### 🟡 PROBLEM 2: Duplikacja design tokens

**Znaleziono 2 źródła prawdy:**
- `src/theme/joy-theme.ts`
- `src/utils/design-tokens.ts` ← DUPLIKAT!

**Skutek:** Zmiany trzeba robić w 2 miejscach, ryzyko niezgodności.

**Fix:** Usunąć `design-tokens.ts`, używać tylko `joy-theme.ts`.

---

### 1.2. ZAOKRĄGLENIA (Border Radius)

#### Zdefiniowane tokeny:
```typescript
xs:   '2px'
sm:   '4px'
md:   '8px'
lg:   '12px'
xl:   '16px'
'2xl': '24px'
full: '9999px'
```

### 🔴 PROBLEM 3: Hardcoded borderRadius w component overrides

```typescript
// theme/joy-theme.ts
JoyButton: { borderRadius: '6px' }    // ❌ Nie używa tokenu!
JoyInput:  { borderRadius: '6px' }    // ❌ 6px nie istnieje
JoyChip:   { borderRadius: '6px' }    // ❌ jako token
JoyCard:   { borderRadius: '8px' }    // ✅ OK (md)
JoySheet:  { borderRadius: '8px' }    // ✅ OK (md)
```

**Skutek:** Niespójne zaokrąglenia (6px vs 8px), trudne do globalnej zmiany.

**Fix:** Zamienić '6px' na token 'sm' (4px) lub 'md' (8px).

---

### 1.3. FONTY

```typescript
display: "Playfair Display", "Georgia", serif       // ✅ Headings
body:    "Source Sans Pro", "Montserrat", sans-serif // ✅ Body
mono:    "Fira Code", "JetBrains Mono", monospace   // ✅ Code
```

**Status:** ✅ Poprawnie zdefiniowane i załadowane w globals.css

---

## 2. GLOBAL STYLES

**Lokalizacja:** `src/app/globals.css`

### ✅ Pozytywne:
- Import Google Fonts
- Custom scrollbar z Joy UI CSS variables
- Focus styles dla accessibility
- Smooth scrolling

### 🟡 PROBLEM 4: Brak transitions dla theme switching

```css
/* BRAKUJE: */
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

**Skutek:** Nagłe przeskoki kolorów przy zmianie dark/light mode.

**Fix:** Dodać globalne transitions.

---

### 🟡 PROBLEM 5: Brak color-scheme meta

```html
<!-- BRAKUJE w layout.tsx: -->
<meta name="color-scheme" content="light dark" />
```

**Skutek:** Przeglądarka nie dostosuje native elementów (scrollbar, inputs) do motywu.

**Fix:** Dodać meta tag i CSS property.

---

## 3. NAVIGATION COMPONENT

**Używana wersja:** `src/components/layout/Navigation.tsx`

### 🔴 PROBLEM 6: Logo link NIE DZIAŁA

```tsx
// OBECNY KOD (BŁĘDNY):
<Link href={logoHref} style={{ textDecoration: 'none' }}>
  <Typography level="h4" sx={{...}}>
    Radzyń Podlaski
  </Typography>
</Link>
```

**Błąd:** Zagnieżdżenie `<a><a>` (Next.js Link renderuje <a>, Typography może też)

**Skutek:**
- Kliknięcie nie przekierowuje
- Hover pokazuje URL ale nic się nie dzieje
- Invalid HTML

**Fix:**
```tsx
<Typography
  component={Link}
  href={logoHref}
  level="h4"
  sx={{...}}
>
  Radzyń Podlaski
</Typography>
```

---

### 🟡 PROBLEM 7: Niejednolite zaokrąglenia

- Desktop buttons: `borderRadius: 0` (celowo proste)
- Mobile menu items: `borderRadius: 'md'` (8px)
- Header: brak borderRadius

**Decyzja:** To jest OK design choice (underline tabs na desktop, rounded na mobile).

---

### 🔴 PROBLEM 8: Podwójny padding top

```tsx
// Navigation.tsx line 180:
<Box sx={{ height: 64 }} />  // Spacer 64px

// layout.tsx line 44:
<Box component="main" sx={{ pt: 8 }}>  // +64px padding!
// RAZEM: 128px zamiast 64px!
```

**Skutek:** Zbyt duży odstęp między navbar a treścią.

**Fix:** Usunąć `pt: 8` z layout.tsx (spacer w Navigation wystarcza).

---

## 4. FOOTER COMPONENT

**Lokalizacja:** `src/components/layout/Footer.tsx`

### 🟡 PROBLEM 9: Słaby kontrast w dark mode

```tsx
<Sheet sx={{ bgcolor: 'background.level3' }}>
  <Typography sx={{ color: 'primary.500' }}>
    Radzyń Podlaski
  </Typography>
</Sheet>
```

**Dark mode:**
- Tło: #4A4539 (ciemny brąz)
- Tekst: #6B8CB9 (light navy)
- **Kontrast: ~3.5:1** (FAIL WCAG AA dla małego tekstu)

**Fix:** Użyć `primary.solidColor` zamiast `primary.500` lub zwiększyć jasność tekstu.

---

### 🟢 PROBLEM 10: Footer zaokrąglenia (user complaint)

```tsx
<Sheet
  variant="solid"
  sx={{
    bgcolor: 'background.level3',
    mt: 'auto',
  }}
>
```

**User zgłosił:** "Footer ma zaokrąglenia mimo że jest na całą szerokość"

**Analiza:** Sheet domyślnie ma `borderRadius: 8px` z theme overrides.

**Fix:**
```tsx
sx={{
  bgcolor: 'background.level3',
  mt: 'auto',
  borderRadius: 0,  // Wyłącz dla footera
}}
```

---

## 5. HOMEPAGE

**Lokalizacja:** `src/app/page.tsx`

### 🔴 PROBLEM 11: KRYTYCZNY - Kontrast tekstu na kartach w dark mode

**Quick Links Cards (lines 66-179):**

```tsx
<Card variant="solid" color="warning">
  <Typography sx={{ color: 'white' }}>Wydarzenia</Typography>
</Card>
```

**Kontrast w dark mode:**
| Karta | Tło | Tekst | Kontrast | WCAG |
|-------|-----|-------|----------|------|
| Primary | #6B8CB9 | white | 3.6:1 | ❌ FAIL AA |
| Success | #81C784 | white | 2.6:1 | ❌ FAIL AA |
| **Warning** | **#FFD54F** | **white** | **1.7:1** | **❌ KRYTYCZNY FAIL** |
| Neutral | #7D7668 | white | 3.2:1 | ❌ FAIL AA |

**User zgłosił:** "Wydarzenia szaro-blado na szarym tle"

**Skutek:** Tekst nieczytelny, naruszenie WCAG 2.1 Level AA.

**Fix:**
```tsx
<Typography
  level="h3"
  sx={{
    color: 'var(--variant-solidColor)',  // Dynamiczny kolor z Joy UI
  }}
>
```

Lub:
```tsx
sx={{
  color: (theme) =>
    theme.palette.mode === 'dark' ? 'neutral.900' : 'white',
}}
```

---

### 🟡 PROBLEM 12: Hero gradient hardcoded

```tsx
<Box sx={{
  background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
}}>
```

**Skutek:** W dark mode gradient może być zbyt ciemny.

**Fix:**
```tsx
background: (theme) =>
  theme.palette.mode === 'dark'
    ? 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)'
    : 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
```

---

## 6. KOMPONENTY - MIXING MATERIAL UI & JOY UI

### 🔴 PROBLEM 13-20: Mieszanie @mui/material i @mui/joy

**Dotknięte pliki:**
- `EventCard.tsx`
- `NewsCard.tsx`
- `WeatherWidget.tsx`
- `CityHighlights.tsx`

**Przykłady błędów:**

```tsx
// ❌ BŁĄD: Material UI import
import { CardMedia } from '@mui/material';

// ❌ BŁĄD: Material UI variant
<Typography variant="h6" component="h3">

// ❌ BŁĄD: Joy UI nie ma 'filled'
<Chip variant="filled" />

// ❌ BŁĄD: Nieistniejący color
<Chip sx={{ backgroundColor: 'primary.light' }} />

// ❌ BŁĄD: Material UI icon prop
<Icon fontSize="small" color="action" />
```

**Poprawne użycie Joy UI:**

```tsx
// ✅ Joy UI import
import { CardCover } from '@mui/joy';  // Zamiast CardMedia

// ✅ Joy UI level
<Typography level="h3" component="h3">

// ✅ Joy UI variant
<Chip variant="solid" />

// ✅ Joy UI color
<Chip sx={{ bgcolor: 'primary.solidBg' }} />

// ✅ Joy UI icon styling
<Icon sx={{ fontSize: 'md', color: 'neutral.600' }} />
```

---

## 7. BUILD ERRORS

### 🔴 PROBLEM 21: Brak React import

```typescript
// ❌ src/app/admin/layout.tsx:29
// ❌ src/app/events/layout.tsx:16
Error: 'React' is not defined.  no-undef
```

**Fix:**
```tsx
import React from 'react';  // Dodać na początku pliku
```

---

### 🟡 PROBLEM 22: Unused imports

```typescript
// src/app/admin/scraper/page.tsx
'ModalClose' is defined but never used.

// src/app/contact/page.tsx
'Sheet' is defined but never used.
```

**Fix:** Usunąć nieużywane importy.

---

## 8. FOUC (Flash of Unstyled Content)

**User zgłosił:** "Najpierw brak czarnego tła, potem ładuje się czarne tło"

### 🔴 PROBLEM 23-25: Brak optymalizacji SSR

**ThemeRegistry.tsx:**
```tsx
<CssVarsProvider theme={joyTheme} defaultMode="system">
  {children}
</CssVarsProvider>
```

**Braki:**
1. Brak `suppressHydrationWarning` w layout.tsx
2. Brak `disableTransitionOnChange={false}`
3. **Brak initial theme script w <head>**

**Skutek:**
- Flash white screen przy pierwszym ładowaniu
- Zmiana kolorów tekstu podczas hydration
- Płynne przejście dopiero po JS załadowaniu

**Fix:** Dodać do `layout.tsx` <head>:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          const mode = localStorage.getItem('joy-mode') ||
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.setAttribute('data-joy-color-scheme', mode);
        } catch (e) {}
      })();
    `,
  }}
/>
```

---

## 9. PROBLEMY Z BORDER RADIUS

### 🟡 PROBLEM 16: borderRadius używa spacing zamiast borderRadius token

```tsx
// ❌ CityHighlights.tsx
sx={{
  borderRadius: 2,  // To jest theme.spacing(2) = 16px!
}}

// ✅ Powinno być:
sx={{
  borderRadius: 'md',  // lub 'xl' jeśli chcemy 16px
}}
```

**Znajdź wszystkie wystąpienia:**
```bash
grep -r "borderRadius: [0-9]" src/
```

---

## PODSUMOWANIE PRIORYTETÓW

### 🔴 KRYTYCZNE (Fix natychmiast):

1. ✅ **FOUC** - Dodać initial theme script
2. ✅ **Logo link** - Naprawić nested links
3. ✅ **Kontrast tekstu** - Fix white text na jasnych tłach w dark mode
4. ✅ **Material UI mixing** - Zamienić wszystkie Material imports na Joy
5. ✅ **Brak solidBg** - Dodać dla wszystkich kolorów
6. ✅ **Build errors** - Dodać React imports

### 🟡 WYSOKIE (Fix w tym tygodniu):

7. Duplikacja design-tokens.ts
8. Hardcoded borderRadius 6px
9. Podwójny padding top (128px → 64px)
10. Footer zaokrąglenia (borderRadius: 0)
11. Footer kontrast w dark mode

### 🟢 ŚREDNIE (Optymalizacja):

12. Transitions dla theme switching
13. color-scheme meta tag
14. Hero gradient w dark mode
15. Unused imports cleanup

---

## REKOMENDACJE FINALNE

### Architektura:
1. **Single Source of Truth** - tylko joy-theme.ts, usunąć design-tokens.ts
2. **Konsekwentne użycie Joy UI** - zero Material UI imports
3. **Design tokens we wszystkich stylach** - zero hardcoded values

### Performance:
4. Initial theme script dla SSR
5. CSS transitions dla smooth theme switching
6. Code splitting dla niewykorzystanych komponentów

### Accessibility:
7. WCAG AA dla wszystkich kombinacji kolorów
8. Focus indicators
9. Semantic HTML (fix nested links)

### Developer Experience:
10. TypeScript strict mode
11. ESLint rules dla Joy UI best practices
12. Dokumentacja design system w Storybook

---

**OCENA KOŃCOWA:** 6/10

✅ Mocne strony:
- Przemyślana paleta barokowa
- Dobrze zdefiniowane tokeny
- Responsive design

❌ Słabe strony:
- Mixing Material UI i Joy UI
- Problemy z kontrastem
- FOUC przy ładowaniu
- Nieużywanie własnych tokenów

**CZAS NAPRAWY:** ~8-12 godzin work
