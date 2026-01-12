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


