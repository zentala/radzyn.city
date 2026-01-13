# Radzyń Podlaski - Portal Miejski

Otwarty portal dla miasta Radzyń Podlaski i powiatu radzyńskiego, oferujący informacje o mieście, aktualne wydarzenia, pogodę i więcej.

## Funkcje

- Strona główna z aktualnościami i widgetem pogodowym
- Informacje o mieście i powiecie
- Automatyczne pobieranie wiadomości z różnych źródeł (web scraping)
- Analiza i kategoryzacja wiadomości przy użyciu AI
- System tagowania i filtrowania wiadomości 
- Responsywny design (mobile-first)
- Wsparcie dla SEO

## Technologie

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios dla zapytań API
- Cheerio/Puppeteer dla web scrapingu
- OpenAI API dla analizy wiadomości

## Instalacja

```bash
# Zainstaluj zależności
pnpm install

# Utwórz .env.local i dodaj swoje klucze API (plik nie jest commitowany)
cat > .env.local << 'EOF'
# OpenWeatherMap API key (server-side, not exposed to the browser)
OPENWEATHER_API_KEY=YOUR_KEY_HERE
EOF

# Uruchom serwer deweloperski
pnpm dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce, aby zobaczyć aplikację.

## Struktura projektu

- `/src/app` - Strony aplikacji (Next.js App Router)
- `/src/components` - Komponenty React
- `/src/services` - Serwisy aplikacji (news, scraper, AI)
- `/src/utils` - Pomocnicze funkcje i typy
- `/public` - Statyczne zasoby (obrazy, ikony)
- `/scripts` - Skrypty pomocnicze (np. scraper)

## Scraper wiadomości

Portal posiada funkcję automatycznego pobierania wiadomości z różnych źródeł. Skonfigurowane źródła znajdziesz w pliku `src/services/scraperService.ts`.

Aby ręcznie uruchomić scraper:

```bash
# Uruchom scraper dla wszystkich źródeł
pnpm scrape

# Uruchom scraper dla konkretnego źródła
pnpm scrape --source="Radzyń Info"
```

Scrapowane wiadomości są analizowane przy użyciu AI, które:
- Generuje zwięzłe podsumowanie artykułu
- Określa sentyment artykułu (pozytywny, neutralny, negatywny)
- Szacuje czas czytania
- Sugeruje tagi i kategorię
- Wyciąga słowa kluczowe

## Licencja

MIT
