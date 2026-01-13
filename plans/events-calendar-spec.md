# Specyfikacja: Wydarzenia (kalendarz) + integracja z Supabase (guide) — Radzyń City Portal

## 1) Cel biznesowy (Business Analysis)

Chcemy odejść od hardcodowanych danych wydarzeń w:
- `src/app/page.tsx` (sekcja „Nadchodzące wydarzenia”)
- `src/app/events/page.tsx` (lista + filtry)

…i przejść na **jedno źródło prawdy** w Supabase (w ramach `guide`), dostępne dla `radzyn.city` przez publiczne API (Supabase Edge Function `api-v1`).

### Kluczowe wymagania
- Strona główna pokazuje **N** nadchodzących wydarzeń.
- `/events` pokazuje listę + filtry (kategoria, miesiąc, wyszukiwarka).
- `/events/[slug]` pokazuje stronę szczegółów wydarzenia.
- Wydarzenie ma **powiązaną lokalizację** z bazy danych (`public.locations`) po kluczu (`location_id`).

### Pytania BA (do potwierdzenia)
1. **Źródło danych**: kto dostarcza eventy? ręcznie (admin) czy import z zewnętrznego feeda?
2. **Zakres**: to są „imprezy/kalendarz” (current events) czy „wydarzenia historyczne / oś czasu”? (w tym spec: current events).
3. **Publikacja**: czy potrzebujemy workflow `draft → published → cancelled`? (w tym spec: tak).
4. **Czas**: czy eventy mają godzinę (np. koncert 19:00), czy tylko datę?
5. **Powtarzalność**: czy potrzebujemy wydarzeń cyklicznych (np. co tydzień) w MVP? (w tym spec: nie).
6. **Lokalizacja**:
   - Czy każde wydarzenie ma być powiązane z `locations`?
   - Czy dopuszczamy wyjątki (event bez matcha w DB) — wtedy `location_*_override`?
7. **Media**: czy obraz wydarzenia jest URL (zewnętrzny) czy Supabase Storage?
8. **SEO**: czy `slug` ma być stabilny i ręcznie ustawiany?
9. **Wielojęzyczność**: czy eventy będą PL/EN? (w MVP: PL).

## 2) Architektura rozwiązania (Solution Architect)

### Single Source of Truth
- **Supabase (guide)** przechowuje dane w DB i wystawia publiczne API.
- **radzyn.city** konsumuje dane przez `NEXT_PUBLIC_GUIDE_API_BASE_URL` (tak samo jak POI dla mapy/miejsc).

### Komponenty
- **DB schema (Supabase)**:
  - `public.event_categories`
  - `public.events` (FK `events.location_id → locations.id`)
- **API**: Supabase Edge Function `guide/supabase/functions/api-v1`
  - `GET /events`
  - `GET /events/:slug`
  - `GET /event-categories`
- **Portal**:
  - `src/hooks/useEvents.ts` (API-first + fallback na local mocks)
  - `src/types/events.ts` (kanoniczny model danych)
  - aktualizacja UI w `src/app/page.tsx`, `src/app/events/page.tsx`
  - nowa strona `src/app/events/[slug]/page.tsx`

### Wymogi niefunkcjonalne
- **Graceful fallback**: jeśli API nie działa albo env var nie jest ustawiony, portal używa lokalnych danych (dev/demo).
- **Cache**: Edge Function ustawia `Cache-Control` (krótkie cache dla list, dłuższe dla detali).
- **Stabilność kontraktu**: DTO dla eventów jest stabilne i wersjonowane implicitnie w `api-v1`.

## 3) Model danych (Software Architect)

### 3.1 `public.event_categories`
- `id` (text, PK) — slug/identyfikator kategorii, np. `culture`, `sport`
- `name` (text) — nazwa do UI (PL)

### 3.2 `public.events`
Minimalny zestaw pól:
- `id` (uuid, PK)
- `slug` (text, unique, not null) — klucz URL `/events/[slug]`
- `title` (text, not null)
- `description` (text, not null)
- `start_at` (timestamptz, not null)
- `end_at` (timestamptz, null)
- `category_id` (text, FK → `event_categories.id`)
- `location_id` (uuid, FK → `locations.id`, nullable)
- `location_name_override`, `location_address_override` (text, nullable) — fallback jeśli brak powiązania
- `organizer` (jsonb, nullable) — np. `{ name, phone, email, website }`
- `featured_image_url` (text, nullable)
- `is_featured` (bool)
- `is_free` (bool)
- `ticket_url` (text, nullable)
- `status` (text) — `draft|published|cancelled`
- `created_at`, `updated_at` (timestamptz)

### 3.3 Powiązanie event → location („po key”)
Rekomendacja MVP:
- **`events.location_id`** jako klucz łączenia (UUID z `locations.id`).
Zalety:
- referencyjna integralność (FK),
- łatwe joiny po stronie API,
- spójność z istniejącym modelem `locations`.

Opcja rozszerzenia (nie-MVP):
- dodać `locations.slug` jako stabilny, „ludzki” key (wymaga backfill + admin UI).

## 4) API Contract (DTO)

### `GET /events`
Query params (MVP):
- `q` (optional)
- `category` (optional) — `event_categories.id`
- `status` (optional; default `published`)
- `limit` (optional; default 50)

Response: `EventListItem[]`:
- `id`, `slug`, `title`, `description`
- `startAt`, `endAt`
- `status`
- `category?: { id, name }`
- `location?: { id, name, address?, coordinates? }`
- `featuredImageUrl?`, `isFeatured?`, `isFree?`, `ticketUrl?`

### `GET /events/:slug`
Response: `EventDetails` (jak wyżej, może zawierać `organizer`).

### `GET /event-categories`
Response: `{ id, name }[]`

## 5) QA / Definition of Done (Quality Assurance)

### Kryteria akceptacji
- `/` pokazuje sekcję „Nadchodzące wydarzenia” w oparciu o dane z hooka `useEvents` (API albo fallback).
- `/events` renderuje eventy w kartach i działa:
  - filtr kategorii
  - filtr miesiąca (na podstawie `startAt`)
  - wyszukiwarka (title/description/location)
- `/events/[slug]` renderuje szczegóły (title, data, opis, lokalizacja) i link „Wróć do wydarzeń”.
- Eventy mają lokalizację połączoną z DB: `location.id` (UUID) zwracane w DTO; UI pokazuje nazwę i (jeśli jest) adres.

### Testy (minimum)
- Playwright: `/events` ma karty eventów i działa dropdown „Dodaj do kalendarza”.
- (opcjonalnie) Playwright: `/events/[slug]` renderuje stronę szczegółów.

## 6) Backlog / Task breakdown (Scrum Master)

### EPIC: Events powered by Supabase (Guide as source of truth)
- **DB**
  - migracja: schema `event_categories`, `events` + RLS (public read)
  - seed: przykładowe eventy + powiązania do `locations`
- **API**
  - endpointy `GET /events`, `GET /events/:slug`, `GET /event-categories`
  - cache headers + błędy 404/500
- **Portal**
  - `src/types/events.ts` jako model kanoniczny
  - `useEvents` hook + provider (API-first + fallback)
  - refactor `EventCard` pod ISO daty i link do szczegółów
  - przepięcie strony głównej i `/events`
  - dodanie `/events/[slug]`
- **QA**
  - smoke testy Playwright
  - weryfikacja fallback (brak env / API down)

