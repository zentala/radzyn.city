# Wizja Migracji Architektury Radzyń Podlaski

> **DEPRECATED (2026-01-13):** This file is no longer the source of truth for the map migration.
> Use `migration-vision.step2.md` for the current, verified plan and tasks.

## Obecny Stan (Before)

```
┌─────────────────┐    ┌─────────────────┐
│   radzyn.city   │    │     guide       │
│                 │    │                 │
│ • News scraping │    │ • Audio guides  │
│ • Weather       │    │ • Interactive   │
│ • Hardcoded     │    │   map           │
│   locations     │    │ • POI management│
│ • Basic places  │    │ • Admin panel   │
│   display       │    │ • Supabase DB   │
│ • No admin for  │    │                 │
│   locations     │    │                 │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
              Duplikacja danych
```

## Docelowy Stan (After)

```
┌─────────────────┐    ┌─────────────────┐
│   radzyn.city   │    │ guide.radzyn.city│
│                 │    │                 │
│ • News scraping │◄───┤ • Audio guides  │
│ • Weather       │API │ • Interactive   │
│ • Location data │    │   map           │
│   via API       │    │ • POI management│
│ • Map embedding │    │ • Admin panel   │
│ • No location   │    │ • Supabase DB   │
│   management    │    │ • REST API      │
└─────────────────┘    └─────────────────┘
```

## Kluczowe Zmiany

### 1. Centralizacja Zarządzania Lokalizacjami
- **Gdzie:** Przeniesienie wszystkich danych o lokalizacjach do guide'a
- **Dlaczego:** Guide ma już zaawansowany system zarządzania treścią
- **Korzyści:** Jedno źródło prawdy, lepsze zarządzanie treścią

### 2. API dla Danych
- **Co:** REST API w guide dla dostępu do POI
- **Dla kogo:** radzyn.city + potencjalnie inne aplikacje
- **Endpointy:**
  - `GET /api/pois` - lista wszystkich POI
  - `GET /api/pois/:id` - szczegóły POI
  - `GET /api/pois/categories` - kategorie

### 3. Embedowanie Mapy
- **Jak:** iframe lub komponent React w radzyn.city
- **URL:** `https://guide.radzyn.city/embed/map`
- **Funkcje:** Filtry, wyszukiwanie, szczegóły POI

### 4. Migracja Danych
- **Źródło:** `src/utils/locationData.ts` w radzyn.city
- **Cel:** Tabela `locations` w Supabase guide'a
- **Narzędzia:** Skrypt migracyjny w guide

## Przepływ Użytkownika

### Przed Migracją
1. Użytkownik wchodzi na radzyn.city/map
2. Widzi placeholder mapy
3. Przegląda listę miejsc z podstawowych danych

### Po Migracji
1. Użytkownik wchodzi na radzyn.city/map
2. Widzi embedded mapę z guide.radzyn.city
3. Ma dostęp do pełnych danych POI
4. Może kliknąć "Szczegóły" → przejście do guide

## Korzyści

- ✅ **Brak duplikacji** danych o lokalizacjach
- ✅ **Bogatsza treść** - audio, multimedia w guide
- ✅ **Łatwiejsze zarządzanie** - jeden admin panel
- ✅ **Skalowalność** - API dla przyszłych integracji
- ✅ **SEO** - lepsza widoczność treści w guide

## Ryzyka i Rozwiązania

| Ryzyko | Rozwiązanie |
|--------|-------------|
| Przestoje podczas migracji | Wersja fallback z cache |
| Problemy z API | Monitoring + fallback do lokalnych danych |
| Utrata funkcjonalności | Testy integracyjne |

## Roadmap Implementacji

1. **Faza 1:** Analiza i projekt API
2. **Faza 2:** Migracja danych do Supabase
3. **Faza 3:** Implementacja API w guide
4. **Faza 4:** Aktualizacja radzyn.city
5. **Faza 5:** Testy i wdrożenie

## Stan Implementacji (2026-01-12)

### ✅ Ukończone:
1. **Analiza architektury** - Porównano struktury danych obu aplikacji
2. **Konfiguracja Supabase** - Dodano `@supabase/supabase-js` do radzyn.city
3. **Klient Supabase** - Utworzono `src/lib/supabase.ts`
4. **Serwis lokalizacji** - Utworzono `src/services/locationService.ts` do pobierania danych
5. **Skrypt migracji** - Przygotowano `scripts/migrate-locations.js`

### ❌ Problemy napotkane:
- **Edycja plików** - System automatycznie przywraca poprzednie wersje plików
- **Duplikacja treści** - Wielokrotne próby edycji powodują duplikację kodu
- **Konflikty cache** - Możliwe problemy z cache systemu plików

### 🚨 Czego unikać:
- Wielokrotnych edycji tego samego pliku bez sprawdzenia rezultatu
- Ręcznych zmian w plikach podczas gdy system może je przywracać
- Pracy w środowisku z aktywnymi procesami cache

### 📋 Co robić dalej (kolejność priorytetowa):

1. **Przejść na WSL** - Jak sugerował użytkownik, środowisko WSL działa lepiej
2. **Uruchomić guide app** - `cd guide && pnpm web` (port 3001)
3. **Skonfigurować .env.local** - Dodać klucze Supabase dla obu aplikacji
4. **Przenieść dane** - Uruchomić skrypt migracji danych z locationData.ts do Supabase
5. **Przetestować API** - Sprawdzić połączenie między aplikacjami
6. **Zaktualizować UI** - Dodać embedding mapy w radzyn.city/map
7. **Usunąć duplikaty** - Wyczyścić zduplikowany kod w plikach

### 🔄 Roadmap Implementacji (zaktualizowany)

1. **Faza 1:** Migracja środowiska (WSL) ✅
2. **Faza 2:** Uruchomienie obu aplikacji
3. **Faza 3:** Migracja danych do Supabase
4. **Faza 4:** Implementacja API w guide
5. **Faza 5:** Aktualizacja radzyn.city
6. **Faza 6:** Testy integracji
7. **Faza 7:** Wdrożenie i czyszczenie

## Aktualizacja (2026-01-13): Integracja mapy bez iframe — reużycie komponentu z `guide`

### Cel
Chcemy, żeby `radzyn.city` używał **tego samego komponentu React mapy**, który jest rozwijany w `guide`, bez embedowania przez iframe. Zależność powinna być kontrolowana (wersje) i możliwie prosta w utrzymaniu mimo dwóch repo.

### Obserwacja (ważne)
To repo zawiera `guide` jako **git submodule** (`/guide`). Dzięki temu możemy uruchomić strategię "shared package" już teraz, a później (opcjonalnie) wypchnąć ją do registry.

### Rekomendowana architektura (docelowo)
- **Źródło danych**: `guide` pozostaje źródłem prawdy dla POI (Supabase) i wystawia publiczne API.
- **UI**: `guide` dostarcza paczkę z komponentem mapy, np. `@radzyn/geo-map`.
- **Integracja**: `radzyn.city` używa `@radzyn/geo-map` jak zwykłej zależności npm. Komponent mapy nie "zna" Supabase – dostaje `dataProvider`/`apiBaseUrl` i pobiera dane przez HTTP.

### Dlaczego "pakiet", a nie kopiowanie kodu
- Jedno miejsce rozwoju (bugfixy i feature'y mapy trafiają do obu aplikacji).
- Kontrola kompatybilności przez semver (np. `1.x` API kompatybilne).
- Możliwość testów kontraktowych na poziomie paczki.

### Kontrakt między aplikacjami
Minimalny kontrakt powinien działać zarówno dla `radzyn.city`, jak i dla `guide`:
- **API** (public):
  - `GET /api/v1/pois?bbox=...&q=...&category=...`
  - `GET /api/v1/pois/:id`
  - `GET /api/v1/poi-categories`
- **Deep linking**:
  - `radzyn.city/map?poi=<id>` (otwiera szczegóły w panelu mapy)
  - `radzyn.city/map?category=<slug>` (ustawia filtr)

### Warianty dystrybucji komponentu (2 repo — jak to spiąć)

#### Wariant A (polecany start): "shared package" w `guide` + użycie przez workspace w tym repo
Ponieważ `guide` jest submodule w tym repo, możemy:
- wyodrębnić paczkę w `guide` (np. `guide/packages/geo-map`),
- dodać prosty bundler do biblioteki (np. `tsup` / `vite build --lib`),
- konsumować paczkę w `radzyn.city` w trybie "workspace" (pnpm) albo przez lokalny `file:`.

Zalety:
- najszybsze do wdrożenia w Twoim setupie (bez zewnętrznych registry),
- iteracja "edit → test" bez publikowania paczki.

Wady:
- trzeba dbać o spójne wersje React/Leaflet (peerDependencies).

##### Wariant A — instrukcja wdrożenia krok po kroku (dla devów)

Poniższe kroki zakładają, że pracujemy w tym repo, gdzie `guide` jest dostępny jako submodule w katalogu `./guide`.

**Cel**: wyciągnąć mapę do paczki `@radzyn/geo-map` (utrzymywanej w `guide`) i użyć jej w `radzyn.city` jako zależności lokalnej — bez iframe.

###### 0) Przygotowanie repo

1. Upewnij się, że submodule jest zainicjalizowany:

```bash
git submodule update --init --recursive
```

2. Zainstaluj zależności w root (radzyn.city):

```bash
pnpm install
```

###### 1) Utwórz paczkę w `guide`

1. Dodaj katalog:
- `guide/packages/geo-map/`

2. Minimalna struktura paczki:
- `guide/packages/geo-map/package.json`
- `guide/packages/geo-map/tsconfig.json`
- `guide/packages/geo-map/src/index.ts`
- `guide/packages/geo-map/src/GeoMap.tsx`
- `guide/packages/geo-map/tsup.config.ts` (lub alternatywnie build "lib mode" przez Vite)

3. W `package.json` paczki ustaw:
- `name`: `@radzyn/geo-map`
- `version`: `0.1.0`
- `main/module/types` albo `exports` (preferowane)
- **peerDependencies** (żeby uniknąć duplikacji React/Leaflet w bundlu):
  - `react`, `react-dom`, `leaflet`, `react-leaflet`
- `dependencies` tylko dla tego, co jest realnie "wewnętrzne" dla paczki (np. drobne utilsy).
- `scripts`:
  - `build`: buduje paczkę do `dist`
  - `dev`: build w watch mode (do pracy lokalnej)

4. API komponentu:
- `GeoMap` musi być "host-agnostic":
  - nie importuje Supabase,
  - nie zakłada konkretnego routera,
  - dostaje dane przez `dataProvider` (funkcje fetchujące) albo `apiBaseUrl`.

###### 2) Zdefiniuj kontrakt `dataProvider` (minimum)

Kontrakt powinien obsłużyć:
- pobranie listy POI (z parametrami mapy, np. `bbox`)
- pobranie szczegółów POI
- pobranie kategorii

Rekomendacja:
- paczka publikuje typy DTO (np. `PoiListItem`, `PoiDetails`, `PoiCategory`)
- paczka publikuje typ `GeoMapDataProvider`

###### 3) Podłącz paczkę do `radzyn.city` bez registry (lokalny `file:`)

W `radzyn.city/package.json` dodaj zależność:

```json
{
  "dependencies": {
    "@radzyn/geo-map": "file:./guide/packages/geo-map"
  }
}
```

Następnie:

```bash
pnpm install
```

###### 4) Next.js: dopilnuj transpile lokalnej paczki

Next.js często wymaga transpile lokalnych paczek TS/ESM.
W `next.config.js` dodaj:

- `transpilePackages: ['@radzyn/geo-map']`

Jeśli paczka jest zbudowana do CJS/ESM w `dist`, nadal zalecamy to ustawienie dla spójności.

###### 5) Leaflet CSS i assets

`react-leaflet` wymaga stylów Leaflet. Import powinien być po stronie hosta (`radzyn.city`), np. w globalnym entry (App Router: `src/app/layout.tsx` lub `src/app/globals.css` zależnie od setupu):

```ts
import 'leaflet/dist/leaflet.css';
```

Jeśli używacie własnych markerów/ikon:
- paczka `@radzyn/geo-map` powinna pozwalać wstrzyknąć konfigurację ikon (props),
- albo host mapy odpowiada za podmianę ikon (unikamy hardcodowania ścieżek w paczce).

###### 6) Dev loop (lokalny "watch")

Najprostszy workflow:
- w jednym terminalu budujesz paczkę mapy w watch mode,
- w drugim uruchamiasz `radzyn.city`.

Przykład:

```bash
# terminal A (build watch paczki)
cd guide/packages/geo-map
pnpm install
pnpm dev
```

```bash
# terminal B (portal)
cd /path/to/radzyn.city
pnpm dev
```

Uwagi:
- jeśli paczka ma peerDependencies, instalacja `pnpm install` w root jest kluczowa (to tam resolvuje się React/Leaflet).
- jeśli w `guide` działa osobny `pnpm install`, upewnij się, że paczka mapy nie dubluje Reacta w `dependencies`.

###### 7) Minimalna integracja w UI `radzyn.city`

1. Dodaj stronę `/map` (lub aktualizuj istniejącą), która:
- renderuje `<GeoMap />`,
- dostarcza `dataProvider` wskazujący na API `guide` (np. `https://guide.radzyn.city/api/v1`).

2. Deep linking:
- host (`radzyn.city`) mapuje query params na `initialState` mapy.

###### 8) Kontrakt API (v1) — checklist

W `guide` upewnij się, że publiczne endpointy są stabilne i wersjonowane:
- `/api/v1/pois`
- `/api/v1/pois/:id`
- `/api/v1/poi-categories`

Minimalnie:
- paginacja lub `bbox` (dla mapy),
- filtrowanie po kategorii,
- `published`/`status` (żeby nie publikować draftów).

###### 9) (Opcjonalnie) Ulepszenie wariantu A: pnpm workspace

Jeśli chcesz jeszcze wygodniejszy dev loop i możliwość używania `pnpm -r` / `--filter`,
można dodać `pnpm-workspace.yaml` w root i włączyć `guide/packages/*` do workspace.
To nie jest wymagane do startu, ale ułatwia pracę długofalowo.

---

### Status wdrożenia w tym repo (zrobione) — 2026-01-13

Poniżej jest **faktyczny stan kodu** w `radzyn.city` po wdrożeniu wariantu A (local `file:`) oraz minimalny zestaw testów. To jest też “checklista” dla mid devów.

#### Co było przeszkodą przy “reuse” istniejących komponentów `guide`

W `guide` istnieją już komponenty mapy web (`guide/src/components/geoMap/LeafletMapView.tsx`, `LeafletMapEditor.tsx`), ale są **sprzężone z aplikacją `guide`**:
- zależą od Tailwind utility classes (`cn(...)`), wewnętrznych aliasów `@/*` i typów,
- mają side‑effecty analytics (`trackEvent(...)`),
- zakładają konkretne “plumbing” `guide`.

W praktyce oznacza to, że najbezpieczniej jest wyciągnąć **host-agnostic** mapę do paczki i nie próbować importować gotowych komponentów `guide/src/components/geoMap/*` wprost.

#### Co zostało dodane/zmienione (konkretne pliki)

**1) Shared package w `guide`**
- Dodano paczkę `@radzyn/geo-map` w: `guide/packages/geo-map/`
- Pliki paczki (MVP, bez bundlera):
  - `guide/packages/geo-map/package.json`
  - `guide/packages/geo-map/index.js`
  - `guide/packages/geo-map/index.d.ts`
  - `guide/packages/geo-map/GeoMap.js`

**Kontrakt paczki (MVP)**
- `GeoMap` przyjmuje:
  - `pois?: GeoMapPoi[]` (tryb “static”)
  - `dataProvider?: GeoMapDataProvider` (tryb “API”, jeszcze placeholder viewport)
  - `selectedPoiId?: string`, `onPoiSelect?: (poi) => void`
  - `testId?: string` (dla E2E)
- Format współrzędnych w paczce: **`[lng, lat]`** (zgodne z GeoJSON / `guide`).

**2) Podłączenie paczki do `radzyn.city`**
- `radzyn.city/package.json`:
  - dodano zależność lokalną: `"@radzyn/geo-map": "file:./guide/packages/geo-map"`
- `radzyn.city/next.config.js`:
  - dodano: `transpilePackages: ['@radzyn/geo-map']`
- `radzyn.city/src/app/layout.tsx`:
  - dodano globalny import: `import 'leaflet/dist/leaflet.css';`

**3) Realna mapa na route `/map`**
- Dodano klientowy wrapper: `radzyn.city/src/app/map/MapClient.tsx`
  - dynamic import mapy: `dynamic(() => import('@radzyn/geo-map').then(m => m.GeoMap), { ssr: false })`
  - mapuje lokalne dane `src/utils/locationData.ts`
  - konwertuje współrzędne z `radzyn.city` (**`[lat,lng]`**) do paczki (**`[lng,lat]`**)
  - implementuje filtr kategorii i panel szczegółów
- Zmieniono: `radzyn.city/src/app/map/page.tsx`
  - renderuje `MapClient`
  - obsługuje deep linki:
    - `?poi=<id>` (wybór POI i pokazanie w panelu)
    - `?category=<slug>` (wstępny filtr kategorii)

#### Testy (dodane) + dowód wykonania

**Nowy test E2E (Playwright)**
- Plik: `radzyn.city/tests/map.spec.ts`
- Co sprawdza (MVP):
  - czy `/map` renderuje mapę (`data-testid="geo-map"`) oraz `.leaflet-container`
  - czy deep link `/map?poi=palac-potockich` pokazuje “Pałac Potockich” w panelu

**Komenda uruchomienia**
```bash
pnpm test -- tests/map.spec.ts
```

**Status wykonania**
- Test został uruchom i przeszedł lokalnie: **1 passed (chromium)**.

#### Znane ograniczenie (nie blokuje dev/E2E, ale blokuje `pnpm build`)

`pnpm build` w tym repo aktualnie może failować na istniejących (pre-existing) błędach ESLint/TS w innych modułach (np. brak `import React` w layoutach i inne problemy). To jest niezależne od mapy, ale musi zostać posprzątane przed produkcyjnym buildem.

#### Proponowane commity (conventional commits)

1) `feat(geo-map): add host-agnostic @radzyn/geo-map package in guide submodule`
2) `feat(map): use shared GeoMap on /map with category filter and deep-link`
3) `test(map): add Playwright coverage for /map and poi deep-link`

---

### Co jeszcze jest do zrobienia (żeby devy “dokończyły” wizję) — checklisty + DoD

Ta sekcja jest celowo “operacyjna”: mówi **co** zrobić, **gdzie**, **jak sprawdzić**, i **co może pójść źle**.

#### Cel końcowy (Definition of Done)

Uznajemy migrację mapy za “skończoną” dopiero, gdy spełnione są wszystkie poniższe punkty:
- `radzyn.city` nie ma już żadnych “hardcoded POI” jako docelowego źródła (lokalne dane mogą pozostać wyłącznie jako fallback/cache na awarie API).
- `guide` jest **single source of truth** dla POI i kategorii (Supabase + publiczne API).
- `radzyn.city/map` renderuje mapę z paczki `@radzyn/geo-map` i pobiera dane przez HTTP z `guide`.
- Deep linking działa w obie strony:
  - wejście na `radzyn.city/map?poi=<id>` otwiera wskazany POI,
  - klik na marker aktualizuje URL (co najmniej `?poi=<id>`),
  - opcjonalnie: `?category=<slug>` i `?q=<query>`.
- Jest jasny plan wersjonowania paczki (semver) i kontrola kompatybilności.
- Testy: minimum smoke E2E + testy kontraktowe DTO / dataProvider.
- Produkcyjny build i CI: `pnpm build` przechodzi w `radzyn.city` (obecnie repo ma pre-existing błędy lint/TS — trzeba je naprawić osobnym PR-em).

#### Etap 1 (MVP już zrobione): local data → shared UI package

To jest obecny stan tego repo: paczka działa i `/map` jest realną mapą. Devy NIE muszą już robić nic w tym etapie.

#### Etap 2 (V1): `dataProvider` + API z `guide` (najważniejsze “co dalej”)

**2.1) Guide: publiczne endpointy API**
- W `guide` zaimplementować stabilne, wersjonowane endpointy:
  - `GET /api/v1/pois?bbox=west,south,east,north&q=...&category=...`
  - `GET /api/v1/pois/:id`
  - `GET /api/v1/poi-categories`
- Minimalne zasady:
  - zwracamy tylko `published`/public POI,
  - rate limiting + cache headers (przynajmniej `ETag` lub `Cache-Control`),
  - CORS: zezwolić na `https://radzyn.city` (i lokalnie `http://localhost:3800`).

**2.2) Kontrakt DTO (wspólny)**
- Ustalić 1 format DTO, najlepiej w paczce `@radzyn/geo-map` jako typy exportowane (docelowo TS, w MVP może być d.ts):
  - `PoiListItem`: `id`, `name`, `coordinates: [lng,lat]`, `category: {slug,name}`
  - `PoiDetails`: jw + opcjonalne: `description`, `address`, `media`, `openingHours`
  - `PoiCategory`: `slug`, `name`
- Wymuszenie porządku współrzędnych: **zawsze `[lng, lat]` w API i w paczce**.

**2.3) Radzyn.city: implementacja `dataProvider`**
- Dodać plik: `radzyn.city/src/app/map/dataProvider.ts` (albo `src/services/geoMapDataProvider.ts`)
  - export: `createGuideDataProvider({ apiBaseUrl })`
  - implementuje `listPois({ viewport, q, category })`
  - mapuje odpowiedź z API → `GeoMapPoi[]`.
- Zmienić `MapClient.tsx`:
  - zamiast `pois={filteredPois}` zacząć używać `dataProvider={...}` i trzymać stan `pois` w hoście (żeby móc filtrować i trzymać panel szczegółów).
  - dodać obsługę błędów (toast/alert) i fallback do lokalnych danych tylko, jeśli API nie działa (feature flag).

**2.4) URL sync (żeby devy się nie pogubiły)**
- Zasada: host (`radzyn.city`) jest właścicielem URL.
- Minimalnie:
  - przy starcie: czytaj `searchParams.poi` i ustaw `selectedPoiId`
  - przy kliknięciu markera: `router.replace({ query: { ... , poi: id } })` (bez full reload)
- Dodaj test E2E:
  - klik marker → URL zawiera `poi=...` (i nadal widoczne szczegóły).

**Definition of Done (Etap 2)**
- Można wyłączyć lokalne `locationData` jako domyślne źródło na `/map` (zostaje fallback).
- `radzyn.city/tests/map.spec.ts` ma test na:
  - render mapy,
  - deep link,
  - url update on click (nowy).

#### Etap 3 (V2): bbox loading + cache + perf

**3.1) BBOX-driven loading**
- `GeoMap` powinien raportować viewport (bbox/zoom/center) do hosta (np. callback `onViewportChange`).
- Host woła `dataProvider.listPois({ viewport })` i robi debouncing (np. 250–400ms).

**3.2) Cache**
- Cache na hoście (in-memory) po `(bbox, category, q)` + TTL.
- Opcjonalnie: Service Worker / edge cache.

**3.3) Observability**
- telemetry: latency, error rate, empty results.

#### Etap 4: dystrybucja paczki (semver) — kiedy wyjść poza `file:`

Wariant A (`file:`) jest świetny na start, ale docelowo:
- przenieść paczkę na TS (`src/index.ts`, `src/GeoMap.tsx`) i dodać bundler (`tsup`/Vite lib mode),
- dodać `exports` i build do `dist/`,
- publikacja (GitHub Packages / npm) i instalacja po wersji (semver).

#### FAQ / gotchas (żeby devy się nie wywróciły)

- **Leaflet + SSR**: mapę zawsze importuj dynamicznie z `ssr:false`, inaczej będą błędy `window is not defined`.
- **Leaflet CSS**: musi być importowany globalnie (`src/app/layout.tsx` lub `globals.css`), inaczej brak ikon/rozjechany layout.
- **Porządek współrzędnych**: paczka i API to `[lng,lat]`. `radzyn.city` historycznie ma `[lat,lng]` → zawsze konwertuj na granicy.
- **CORS**: bez poprawnego CORS API z `guide` nie zadziała w przeglądarce, nawet jeśli “curl działa”.
- **Submodule workflow**: zmiany w `guide/packages/geo-map` wymagają commitów w repo `guide` + update wskazania submodule w `radzyn.city` (osobny commit).
- **`pnpm build`**: to repo ma pre-existing lint/TS errors niezwiązane z mapą — naprawić osobnym PR-em, inaczej “green build” nie będzie możliwy.

---

### Next step (V1): `dataProvider` pod API `guide` + DTO (kontrakt) + minimalny fetch (bez zmiany UI)

Ta sekcja jest gotowa do skopiowania przez devów 1:1.

#### Kontrakt API (v1) — odpowiedzi DTO (przykłady JSON)

**1) `GET /api/v1/pois?bbox=west,south,east,north&category=<slug>&q=<text>`**

Preferowany format: **zwracamy listę** (bez wrappera), bo to upraszcza integrację:

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

**2) `GET /api/v1/pois/:id`**

```json
{
  "id": "palac-potockich",
  "name": "Pałac Potockich",
  "coordinates": [22.6190, 51.7830],
  "category": { "slug": "zabytki", "name": "Zabytki" },
  "description": "Barokowy pałac z XVIII wieku…",
  "address": "ul. Jana Pawła II 2, 21-300 Radzyń Podlaski",
  "website": "https://palacpotockich.pl"
}
```

**3) `GET /api/v1/poi-categories`**

```json
[
  { "slug": "zabytki", "name": "Zabytki" },
  { "slug": "kultura", "name": "Kultura" }
]
```

**Zasada krytyczna (żeby nie było bugów w geometrii):** `coordinates` w API to zawsze **`[lng, lat]`**.

#### Minimalny `dataProvider` (radzyn.city) — gotowy kod

W `radzyn.city` dodaj plik:
- `src/app/map/guideDataProvider.ts`

Wymagania:
- `apiBaseUrl` np. `https://guide.radzyn.city` (albo staging)
- `listPois(...)` mapuje response DTO → `GeoMapPoi[]`
- Obsługa query params: `bbox`, `q`, `category`

> Uwaga: ten provider może być dodany już teraz **bez przepinania UI** — na start zostaje lokalne `locationData`, a provider służy jako “next step” do włączenia feature flagą.

#### Guide: jak realnie wystawić to API (w praktyce — Supabase Edge Functions)

`guide` jest Vite/Expo i dziś nie ma serwera Node w repo. Najprostszy stabilny hosting API to:
- **Supabase Edge Functions** (Deno) w katalogu `guide/supabase/functions/`.

**Status: ✅ IMPLEMENTED** (2026-01-13)

Utworzono kompletny skeleton API v1 w `guide/supabase/functions/api-v1/`:
- `index.ts` - główny handler z routingiem dla wszystkich endpointów
- `_shared/cors.ts` - helper CORS
- `README.md` - dokumentacja i instrukcje

**Zaimplementowane endpointy:**
- ✅ `GET /api/v1/pois` (list z filtrami bbox, q, category)
- ✅ `GET /api/v1/pois/:id` (details)
- ✅ `GET /api/v1/poi-categories`

**Checklist (guide)**
- ✅ Zaimplementować endpointy (powyżej)
- ✅ CORS: allow `https://radzyn.city`, `http://localhost:3800`
- ✅ Security: tylko `kind = 'poi'` (RLS już otwarty dla MVP)
- ✅ Performance: cache headers (`Cache-Control: public, max-age=60-3600`)

**Komendy (guide)**

```bash
# inside guide/
pnpm install
pnpm env:web # jeśli macie taki krok

# Supabase CLI (wymaga instalacji CLI)
supabase start
supabase functions serve api-v1 --no-verify-jwt
supabase functions deploy api-v1
```

> **Next step**: skonfigurować Supabase CLI w środowisku dev i przetestować lokalnie. API jest gotowe do deploymentu.

#### Wariant B: publikacja paczki (GitHub Packages / npm private)
Gdy stabilizujemy API komponentu mapy:
- publikujemy `@radzyn/geo-map` (semver),
- `radzyn.city` instaluje normalnie z registry.

Zalety:
- czyste zależności, niezależne repo,
- łatwa kontrola wersji i rollback.

Wady:
- dochodzi pipeline publikacji i tokeny.

#### Wariant C: Module Federation / remote module (runtime sharing)
`guide` wystawia zbuildowany remote moduł, `radzyn.city` ładuje go w runtime.
To działa "bez iframe", ale zwiększa złożoność (runtime loading, kompatybilność bundlera, cache invalidation).

Rekomendacja:
- tylko jeśli bardzo zależy nam na niezależnych deployach UI mapy bez publish.

### Wymagania techniczne paczki mapy (`@radzyn/geo-map`)
- **Peer dependencies**: `react`, `react-dom`, `leaflet`, `react-leaflet`.
- **Styling**: nie wymuszać Tailwind; preferować neutralne CSS lub MUI-friendly (np. className + sx wrappers po stronie hosta).
- **API**: komponent powinien przyjmować `dataProvider` (funkcje fetchujące) oraz opcjonalnie `onPoiClick`, `initialState`.

---

## Feature: "Suggestions" (tryb z propozycjami + głosowanie)

### Cel
Wprowadzić publiczny tryb, w którym użytkownicy widzą propozycje zmian/funkcji ("Suggestions"), mogą na nie głosować, a zespół może nadawać status i komunikować postęp.

### Model danych (propozycja)
Poniżej minimalny zestaw tabel (nazwy i pola po angielsku):

```sql
create table suggestions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  status text not null default 'proposed', -- proposed|under_review|planned|in_progress|implemented|rejected|duplicate
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text null, -- later: user_id
  merged_into_id uuid null references suggestions(id)
);

create table suggestion_votes (
  id uuid primary key default gen_random_uuid(),
  suggestion_id uuid not null references suggestions(id) on delete cascade,
  voter_hash text not null, -- hashed identifier (auth user id or hashed session)
  created_at timestamptz not null default now(),
  unique (suggestion_id, voter_hash)
);
```

### Zasady statusów
- `proposed`: nowa propozycja, zbiera głosy
- `under_review`: zespół analizuje (widać publicznie)
- `planned`: zaakceptowane do realizacji, ale bez startu
- `in_progress`: w trakcie
- `implemented`: wdrożone
- `rejected`: odrzucone (z uzasadnieniem w opisie lub polu `resolution_note` jeśli dodamy)
- `duplicate`: duplikat (wskazuje `merged_into_id`)

### Zasady głosowania (MVP)
- 1 głos na sugestię per użytkownik/sesję.
- Jeśli brak logowania: `voter_hash` jako hash z "anon session id" (np. cookie) + rate limiting.
- Jeśli jest logowanie (Supabase Auth): `voter_hash = user_id`.

### UI (MVP)
- Lista sugestii z filtrami: status, sort po głosach i dacie.
- Widok szczegółów sugestii: opis + liczba głosów + przycisk głosowania.
- "Special mode": osobna sekcja/route np. `/suggestions` lub przełącznik w UI.

### Moderacja (admin)
- Zmiana statusu, łączenie duplikatów, ewentualnie ukrywanie spamu.
