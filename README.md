# Radzyń Podlaski - Portal Miejski

Otwarty portal dla miasta Radzyń Podlaski i powiatu radzyńskiego, oferujący informacje o mieście, aktualne wydarzenia, pogodę i więcej.

## Funkcje

- Strona główna z aktualnościami i widgetem pogodowym
- Informacje o mieście i powiecie
- Responsywny design (mobile-first)
- Wsparcie dla SEO

## Technologie

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios dla zapytań API

## Instalacja

```bash
# Zainstaluj zależności
pnpm install

# Skopiuj plik zmiennych środowiskowych i dodaj swoje klucze API
cp .env.local.example .env.local

# Uruchom serwer deweloperski
pnpm dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce, aby zobaczyć aplikację.

## Struktura projektu

- `/src/app` - Strony aplikacji (Next.js App Router)
- `/src/components` - Komponenty React
- `/public` - Statyczne zasoby (obrazy, ikony)

## Licencja

MIT
