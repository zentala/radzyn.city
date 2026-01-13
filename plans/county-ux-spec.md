# UX Spec: `/county` (Powiat Radzyński) — Portal radzyn.city

Status: Draft (UX)  
Owner: UX Designer (spec)  
Last updated: 2026-01-13  
Scope: `http://localhost:3800/county`  
Primary input data: `DATA.md` (research notes + draft copy + stats)

---

## Cel strony (Job To Be Done)

Użytkownik (mieszkaniec lub turysta) wchodzi na stronę „Powiat”, żeby **szybko zrozumieć “co tu jest i co warto zrobić”**, a następnie **porównać gminy** i **zaplanować aktywność** (zwiedzanie, rekreacja, dojazd).

### Kluczowe cele UX
- **Szybkie “wow + orientacja”**: powiat w liczbach, mapa kontekstowa, top atrakcje.
- **Porównanie gmin bez bólu**: sortowanie, filtry, wyróżnione rekordy, proste wykresy.
- **Praktyczna użyteczność**: dojazd, szlaki, aktywności, “co robić gdy…”.
- **Wiarygodność**: czytelne źródła, daty, “ostatnia aktualizacja”, ostrzeżenia o danych szacunkowych.

### Non-goals (na teraz)
- Pełny “katalog atrakcji” (to jest rola `/places` + `/map`).
- Płatne rezerwacje, bilety, integracje z zewnętrznymi systemami.
- Szczegółowe dane gospodarcze/branżowe jak w raporcie inwestycyjnym (może później jako osobny raport PDF).

---

## Persony i główne scenariusze

### 1) Mieszkaniec “Odkrywca lokalny”
Chce inspiracji na weekend, lokalne ciekawostki, szlaki, porównanie “co jest w gminie obok”.

### 2) Turysta “Pierwsza wizyta”
Chce top atrakcji, szybkie planowanie: gdzie, jak dojechać, co zobaczyć w 1–2 dni, co robić przy złej pogodzie.

### 3) Uczeń/Student “Szybka wiedza”
Chce liczb + timeline + mapy do pracy szkolnej, łatwe cytowanie źródeł.

### 4) Przedsiębiorca / inwestor lokalny (secondary)
Chce sygnałów: struktura gospodarki, liczba firm, dostępność dróg, “co dominuje”.

---

## Informacja architektura (IA): sekcje i kolejność

### Układ strony (scroll-based, z mini-spisem treści)
1. **Hero + “Powiat w 30 sekund”** (powierzchnia, ludność, gęstość, gminy)
2. **Powiat w liczbach** (kafelki stat + mikro-infografiki)
3. **Gminy: porównaj i odkryj** (najważniejsza sekcja interaktywna)
4. **Atrakcje i dziedzictwo** (top miejsca + linki do /places)
5. **Aktywnie: szlaki, lasy, woda** (rower, spacery, wędkarstwo, “na niepogodę”)
6. **Dojazd i połączenia** (drogi, odległości, kolej/autobus)
7. **Historia na osi czasu** (krótko, atrakcyjnie, gotowe do udostępniania)
8. **CTA / Next steps** (Mapa, Miejsca, Wydarzenia, Kontakt)

### Mini-spis treści (sticky, opcjonalnie)
- Wersja desktop: sticky “On this page” po prawej (widoczne >= md).
- Wersja mobile: “Spis treści” jako rozwijany `Accordion` na górze po hero.

---

## Content strategy (copy + ton)

Ton: nowoczesny, przyjazny, “lokalnie i praktycznie”, bez urzędniczego języka.  
Zasada: **1 akapit = 1 myśl**, krótkie zdania, liczby wytłuszczeniu.

Ważne: w obecnym kodzie strony jest lista gmin zawierająca elementy spoza powiatu (np. Biała Podlaska / Drelów / Parczew). W docelowym UX **pokazujemy tylko gminy powiatu radzyńskiego** (wg `DATA.md` zestawienie: miasto + gminy wiejskie).

---

## Dane (z `DATA.md`) — “source pack” do UI

### Powiat: szybkie fakty (hero / staty)
- Powierzchnia: **965 km²**
- Ludność: **~57 500 – 58 000** (trend spadkowy; zakres + rok)
- Gęstość zaludnienia: **~60 os./km²**
- Gminy: **miasto Radzyń Podlaski + gminy wiejskie** (zestawienie w sekcji porównania)
- Gospodarka (wysoki poziom): **~77% rolnictwo**, **15% przemysł + budownictwo**, **~8% usługi**
- Firmy (REGON): **4 466 podmiotów** (2021)
- Drogi: **400+ km dróg powiatowych**, DK **19** i **63**, S19 (Via Carpatia) w regionie

### Rekreacja / turystyka (wybór)
- Szlaki rowerowe: **3** (żółty 23 km, czerwony ~27 km, zielony ~30 km; razem **~80+ km**)
- Szlak Renesansu Lubelskiego: **~250 km** (powiat jako punkt trasy)
- Atrakcje: Pałac Potockich (XVIII), Kościół Św. Trójcy (XVII), Pałac w Czemiernikach (XVI), pałace wiejskie (Branica, Białka, Żabików)
- Kompleksy leśne: Jaski, Główne, Płudy, Bedlno
- “Na niepogodę”: **AquaMiś** (pływalnia)

### Dojazd (użyteczne odległości)
- Lublin: **~80 km**
- Warszawa: **~150 km**
- Sławatycze (granica): **~70 km**
- Biała Podlaska: **~45 km**
- Łuków: **~23 km**
- Kolej: stacja PKP **Bedlno Radzyńskie**; od 2025 “dojazd autobusowy do PKP”

### Historia (timeline)
- **1468** prawa miejskie Radzynia
- **1749–1756** budowa Pałacu Potockich (Jakub Fontana)
- **1810** utworzenie powiatu (Księstwo Warszawskie)
- **1863** Powstanie Styczniowe (walki 22–23 stycznia)
- **1999** przywrócenie powiatu
- **2023** 555-lecie praw miejskich

---

## Najważniejszy moduł: “Gminy — porównaj i odkryj”

### Główne pytania użytkownika
- “Która gmina jest największa / najmniejsza?”
- “Gdzie jest najwięcej ludzi, a gdzie najrzadziej?”
- “Która jest najbliżej miasta / najdalej / najbardziej ‘leśna’?”
- “W czym dana gmina się wyróżnia (rekordy, ciekawostki)?”

### Proponowana interakcja (desktop)
Układ 2-kolumnowy:
- **Lewa kolumna**: wybór metryki + “rekordy” + mini-wykres (bar chart)
- **Prawa kolumna**: tabela porównawcza (sortowanie, sticky header)

### Proponowana interakcja (mobile)
Układ “cards-first”:
- Przełącznik metryki (segmented control) → lista kart gmin posortowana wg metryki.
- Każda karta ma “Rozwiń” (drawer/bottom sheet) z detalami, ciekawostkami i linkami.

### Metryki do przełączania (MVP)
- Powierzchnia (km²)
- Ludność
- Gęstość
- Trend (2011→2021; badge: stabilna/spadek)

### Metryki rozszerzone (Phase 2 — opcjonalnie)
- Liczba wsi/sołectw
- Firmy (REGON) — tam, gdzie mamy dane
- “Mieszkania: średnia powierzchnia nowych mieszkań” (jeśli dane pewne)

### Zestaw gmin (wg `DATA.md`)
Poniższe dane traktujemy jako “display values” i dodajemy disclaimer, jeśli szacunkowe:
- Radzyń Podlaski (miasto): 19 km², ~14 400–15 400, 799 os./km², trend -10%
- Radzyń Podlaski (gmina): 155 km², ~8 000–8 100, 52 os./km², 24 wsie, trend ~stabilny
- Wohyń: 178 km², ~6 400–6 500, 36 os./km², trend -10%
- Kąkolewnica: 147 km², ~7 900–7 930, 54 os./km², trend -8%
- Borki: 112 km², ~5 900–5 970, 53 os./km², trend -5%
- Ulan-Majorat: 108 km², ~5 500–5 900, 55 os./km², trend -10%
- Czemierniki: 107 km², ~4 000–4 240, 38 os./km², trend -15%
- Komarówka Podlaska: ~95 km², ~4 100–4 130, ~43 os./km², trend -11%

### “Rekordy” (precomputed highlights)
- Największa powierzchnia: Wohyń (178 km²)
- Największa ludność: Radzyń Podlaski (miasto)
- Największa gęstość: Radzyń Podlaski (miasto)
- Najwięcej wsi: gmina Radzyń (24)
- Najstabilniejsza demografia: gmina Radzyń (~-0,2% w dekadzie)
- Największy spadek: Czemierniki (-15%)

---

## Wireframe (tekstowy) — docelowy układ

### 1) Hero
**H1:** Powiat Radzyński  
**Subheadline:** “Przewodnik dla mieszkańców i gości — co warto zobaczyć, gdzie jechać i jak porównać gminy.”  
**Hero media:** duże zdjęcie/ilustracja + gradient (jak homepage)  
**Quick facts chips:** 965 km² | ~58 tys. mieszkańców | ~60 os./km² | 8 gmin + miasto
**CTA:** “Porównaj gminy” (scroll) + “Zobacz mapę” (`/map`)

### 2) Powiat w liczbach (kafelki)
Grid 2×3 (desktop), 1×6 (mobile):
- Powierzchnia
- Ludność + trend
- Gęstość
- Firmy (REGON)
- Struktura gospodarki (rolnictwo/przemysł/usługi)
- Drogi (DK19, DK63, 400+ km dróg powiatowych)

### 3) Gminy — porównanie (sekcja flagship)
Nagłówek + opis 1–2 zdania.  
Segmented control: Powierzchnia | Ludność | Gęstość | Trend  
Pod spodem:
- mini-wykres
- tabela / lista kart
- “Rekordy” jako `Chip` / `Alert` / `Card` (np. “Wohyń: największa powierzchnia”)

### 4) Atrakcje i dziedzictwo
Karty top 6 (MVP: 3–4) + filtry: Pałace | Kościoły | Natura | Dla rodzin  
Każda karta:
- obraz / placeholder
- tytuł, lokalizacja (gmina), 1-liner
- CTA: “Zobacz na mapie” (deep link do `/map?poi=...` w przyszłości) lub “Zobacz miejsca”

### 5) Aktywnie
Bloki tematyczne:
- Szlaki rowerowe (80+ km; breakdown 23/27/30)
- Lasy (lista kompleksów leśnych)
- Woda / wędkarstwo (Bystrzyca)
- “Na niepogodę” (AquaMiś)

### 6) Dojazd i połączenia
Kafle “Samochodem” / “Koleją” / “Autobusem” + lista odległości (chips).
MVP bez mapy tras (tylko praktyczne liczby).

### 7) Historia na osi czasu
Pionowa timeline (mobile) / pozioma (desktop), max 6–8 punktów.
Każdy punkt: rok + ikona + 1 zdanie.

### 8) CTA i linkowanie
“Co dalej?”:
- Mapa (`/map`)
- Miejsca (`/places`)
- Wydarzenia (`/events`)
- Kontakt (`/contact`)

---

## UI components (Joy UI) — rekomendacje implementacyjne (dla dev)

Wskazówki zgodne z obecnym stylem repo (Joy UI + `PageContainer`, `Section`):
- Layout: `PageContainer` + sekcje `Section`
- Układ responsywny: `Grid` (Joy) + `sx` breakpoints
- Interakcje: `Tabs` / `ButtonGroup` / `Chip` / `Accordion` / `Drawer`
- “Powiat w liczbach”: `Card` + duża typografia + mały opis
- Tabela porównawcza gmin: `Table` (Joy) albo lista kart z `Stack`

---

## Dostępność (a11y) — minimalny standard
- Metryki przełączane: kontrolka dostępna z klawiatury, `aria-pressed` / `role="tablist"`.
- Tabela: poprawne nagłówki kolumn, sticky header nie psuje czytników.
- Wszystkie wykresy: alternatywa tekstowa (“Wohyń 178 km²…”) + możliwość pobrania danych (CSV w Phase 2).
- Kontrast: WCAG AA minimum, szczególnie dla “badge/chip” i tekstów pomocniczych.

---

## SEO / shareability
- Sekcje mają anchor IDs (`#gminy`, `#atrakcje`, `#dojazd`, `#historia`).
- `metadata.ts`: rozszerzyć opis o unikalne wartości (“porównanie gmin”, “powiat w liczbach”).
- Shareable state (Phase 2): query params typu `?metric=population&sort=desc`.

---

## Ryzyka i rzeczy do weryfikacji (ważne)

Ponieważ `DATA.md` zawiera wartości “~ / zakresy / dane starsze”, w UI potrzebujemy:
- pola **Rok danych** przy każdej metryce (np. “Ludność: 2023/2024 (szac.)”).
- etykiet “szacunek” dla liczb typu `~95 km²`.
- weryfikacji typów gmin (np. czy “Czemierniki” to faktycznie miejsko-wiejska; podejrzenie: wymaga potwierdzenia).
- weryfikacji wartości ekstremalnych (np. wynagrodzenie 7 200 zł w Czemiernikach) przed ekspozycją jako “rekord”.

---

## Definicja sukcesu (UX metrics)
- Użytkownik jest w stanie w < 15s zrozumieć “co to za miejsce” (hero + liczby).
- Użytkownik potrafi porównać gminy w < 30s (metryka + sort).
- Minimum 2 sensowne CTA kliknięcia: `/map` lub `/places` lub `/events`.

---

## Kolejne kroki (proponowany plan wdrożenia)

1. Uporządkować dane (source of truth): JSON dla powiatu + JSON dla gmin (z rokiem i źródłem).
2. Zrefaktorować `/county` do sekcji zgodnych z IA (bez “losowych kart”).
3. Dodać moduł porównania gmin (MVP: metryka + sort + karty/tabela).
4. Dopiąć linkowanie do `/map` i `/places` (CTA).

