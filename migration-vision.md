# Wizja Migracji Architektury Radzyń Podlaski

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

## Aktualizacja (2026-01-13): Integracja mapy bez iframe — reużycie komponentu z `guide`

### Cel
Chcemy, żeby `radzyn.city` używał **tego samego komponentu React mapy**, który jest rozwijany w `guide`, bez embedowania przez iframe. Zależność powinna być kontrolowana (wersje) i możliwie prosta w utrzymaniu mimo dwóch repo.

### Obserwacja (ważne)
To repo zawiera `guide` jako **git submodule** (`/guide`). Dzięki temu możemy uruchomić strategię “shared package” już teraz, a później (opcjonalnie) wypchnąć ją do registry.

### Rekomendowana architektura (docelowo)
- **Źródło danych**: `guide` pozostaje źródłem prawdy dla POI (Supabase) i wystawia publiczne API.
- **UI**: `guide` dostarcza paczkę z komponentem mapy, np. `@radzyn/geo-map`.
- **Integracja**: `radzyn.city` używa `@radzyn/geo-map` jak zwykłej zależności npm. Komponent mapy nie “zna” Supabase – dostaje `dataProvider`/`apiBaseUrl` i pobiera dane przez HTTP.

### Dlaczego “pakiet”, a nie kopiowanie kodu
- Jedno miejsce rozwoju (bugfixy i feature’y mapy trafiają do obu aplikacji).
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

#### Wariant A (polecany start): “shared package” w `guide` + użycie przez workspace w tym repo
Ponieważ `guide` jest submodule w tym repo, możemy:
- wyodrębnić paczkę w `guide` (np. `guide/packages/geo-map`),
- dodać prosty bundler do biblioteki (np. `tsup` / `vite build --lib`),
- konsumować paczkę w `radzyn.city` w trybie “workspace” (pnpm) albo przez lokalny `file:`.

Zalety:
- najszybsze do wdrożenia w Twoim setupie (bez zewnętrznych registry),
- iteracja “edit → test” bez publikowania paczki.

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
- `guide/packages/geo-map/tsup.config.ts` (lub alternatywnie build “lib mode” przez Vite)

3. W `package.json` paczki ustaw:
- `name`: `@radzyn/geo-map`
- `version`: `0.1.0`
- `main/module/types` albo `exports` (preferowane)
- **peerDependencies** (żeby uniknąć duplikacji React/Leaflet w bundlu):
  - `react`, `react-dom`, `leaflet`, `react-leaflet`
- `dependencies` tylko dla tego, co jest realnie “wewnętrzne” dla paczki (np. drobne utilsy).
- `scripts`:
  - `build`: buduje paczkę do `dist`
  - `dev`: build w watch mode (do pracy lokalnej)

4. API komponentu:
- `GeoMap` musi być “host-agnostic”:
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

###### 6) Dev loop (lokalny “watch”)

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
To działa “bez iframe”, ale zwiększa złożoność (runtime loading, kompatybilność bundlera, cache invalidation).

Rekomendacja:
- tylko jeśli bardzo zależy nam na niezależnych deployach UI mapy bez publish.

### Wymagania techniczne paczki mapy (`@radzyn/geo-map`)
- **Peer dependencies**: `react`, `react-dom`, `leaflet`, `react-leaflet`.
- **Styling**: nie wymuszać Tailwind; preferować neutralne CSS lub MUI-friendly (np. className + sx wrappers po stronie hosta).
- **API**: komponent powinien przyjmować `dataProvider` (funkcje fetchujące) oraz opcjonalnie `onPoiClick`, `initialState`.

---

## Feature: “Suggestions” (tryb z propozycjami + głosowanie)

### Cel
Wprowadzić publiczny tryb, w którym użytkownicy widzą propozycje zmian/funkcji (“Suggestions”), mogą na nie głosować, a zespół może nadawać status i komunikować postęp.

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
- Jeśli brak logowania: `voter_hash` jako hash z “anon session id” (np. cookie) + rate limiting.
- Jeśli jest logowanie (Supabase Auth): `voter_hash = user_id`.

### UI (MVP)
- Lista sugestii z filtrami: status, sort po głosach i dacie.
- Widok szczegółów sugestii: opis + liczba głosów + przycisk głosowania.
- “Special mode”: osobna sekcja/route np. `/suggestions` lub przełącznik w UI.

### Moderacja (admin)
- Zmiana statusu, łączenie duplikatów, ewentualnie ukrywanie spamu.




