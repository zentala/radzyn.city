/**
 * Events mock data used as a portal fallback when Guide API is not available.
 *
 * NOTE: This is NOT the source of truth. Canonical model lives in `src/types/events.ts`.
 */

import type { EventCategory, EventItem } from '@/types/events';

export const mockEventCategories: EventCategory[] = [
  { id: 'kulturalne', name: 'Kulturalne' },
  { id: 'sportowe', name: 'Sportowe' },
  { id: 'edukacyjne', name: 'Edukacyjne' },
  { id: 'spoleczne', name: 'Społeczne' },
  { id: 'rekreacja', name: 'Rekreacja' },
];

export const mockEvents: EventItem[] = [
  {
    id: 'event-1',
    title: 'Dni Radzynia Podlaskiego 2026',
    slug: 'dni-radzynia-podlaskiego-2026',
    description: 'Coroczne święto miasta z koncertami, wystawami i atrakcjami dla całej rodziny. Zapraszamy wszystkich mieszkańców i gości do wspólnego świętowania!',
    startAt: '2026-06-15T10:00:00Z',
    endAt: '2026-06-17T22:00:00Z',
    location: { id: 'mock-plac-wolnosci', name: 'Plac Wolności', address: 'Plac Wolności 1, 21-300 Radzyń Podlaski', coordinates: [22.6176, 51.9547] },
    category: mockEventCategories[0],
    organizer: {
      name: 'Urząd Miasta Radzyń Podlaski',
      phone: '+48 83 355 20 00',
      email: 'urzad@radzyn.pl',
    },
    featuredImageUrl: '/images/event-1.jpg',
    isFeatured: true,
    isFree: true,
    status: 'published',
  },
  {
    id: 'event-2',
    title: 'Koncert Symfoniczny w Pałacu Potockich',
    slug: 'koncert-symfoniczny-w-palacu-potockich',
    description: 'Wyjątkowy koncert symfoniczny w wykonaniu Orkistry Symfonicznej Filharmonii Lubelskiej. W programie utwory Chopina, Mozarta i Beethovena.',
    startAt: '2026-02-14T19:00:00Z',
    endAt: '2026-02-14T21:30:00Z',
    location: { id: 'mock-palac-potockich', name: 'Pałac Potockich', address: 'ul. Jana Pawła II 2, 21-300 Radzyń Podlaski', coordinates: [22.6176, 51.9547] },
    category: mockEventCategories[0],
    organizer: {
      name: 'Muzeum Ziemi Radzyńskiej',
      phone: '+48 83 352 00 18',
      email: 'muzeum@radzyn.pl',
    },
    featuredImageUrl: '/images/event-2.jpg',
    isFeatured: true,
    isFree: false,
    ticketUrl: 'https://bilety.muzeum.radzyn.pl',
    status: 'published',
  },
  {
    id: 'event-3',
    title: 'Mecz Piłki Nożnej: Radzyń vs Lublin',
    slug: 'mecz-pilki-noznej-radzyn-vs-lublin',
    description: 'Mecz ligowy pomiędzy drużynami Radzynia i Lublina. Zapraszamy kibiców na emocjonujące spotkanie!',
    startAt: '2026-02-20T15:00:00Z',
    endAt: '2026-02-20T17:00:00Z',
    location: { id: 'mock-stadion', name: 'Stadion Miejski', address: 'ul. Sportowa 10, 21-300 Radzyń Podlaski', coordinates: [22.62, 51.95] },
    category: mockEventCategories[1],
    organizer: {
      name: 'Radzyński Klub Sportowy',
      phone: '+48 83 351 00 00',
    },
    featuredImageUrl: '/images/event-3.jpg',
    isFeatured: false,
    isFree: true,
    status: 'published',
  },
  {
    id: 'event-4',
    title: 'Warsztaty Ceramiczne dla Dzieci',
    slug: 'warsztaty-ceramiczne-dla-dzieci',
    description: 'Kreatywne warsztaty ceramiczne dla dzieci w wieku 6-12 lat. Pod okiem instruktora dzieci stworzą własne dzieła z gliny.',
    startAt: '2026-02-25T10:00:00Z',
    endAt: '2026-02-25T14:00:00Z',
    location: { id: 'mock-mok', name: 'Miejski Ośrodek Kultury', address: 'ul. Kultury 5, 21-300 Radzyń Podlaski', coordinates: [22.615, 51.952] },
    category: mockEventCategories[2],
    organizer: {
      name: 'Miejski Ośrodek Kultury',
      phone: '+48 83 353 00 00',
      email: 'mok@radzyn.pl',
    },
    featuredImageUrl: '/images/event-4.jpg',
    isFeatured: false,
    isFree: true,
    status: 'published',
  },
  {
    id: 'event-5',
    title: 'Jarmark Wielkanocny',
    slug: 'jarmark-wielkanocny',
    description: 'Tradycyjny jarmark wielkanocny z lokalnymi wyrobami rękodzieła, przysmakami i atrakcjami dla całej rodziny.',
    startAt: '2026-04-12T09:00:00Z',
    endAt: '2026-04-12T17:00:00Z',
    location: { id: 'mock-rynek', name: 'Rynek Miejski', address: 'Rynek Miejski, 21-300 Radzyń Podlaski', coordinates: [22.618, 51.954] },
    category: mockEventCategories[3],
    organizer: {
      name: 'Urząd Miasta Radzyń Podlaski',
      phone: '+48 83 355 20 00',
    },
    featuredImageUrl: '/images/event-5.jpg',
    isFeatured: true,
    isFree: true,
    status: 'published',
  },
  {
    id: 'event-6',
    title: 'Spływ Kajakowy rzeką Bystrzycą',
    slug: 'splyw-kajakowy-rzeka-bystrzyca',
    description: 'Rodzinny spływ kajakowy rzeką Bystrzycą. Trasa prowadzi przez malownicze krajobrazy Puszczy Solskiej.',
    startAt: '2026-05-20T08:00:00Z',
    endAt: '2026-05-20T16:00:00Z',
    location: { id: 'mock-przystan', name: 'Przystań kajakowa', address: 'ul. Leśna 15, 21-300 Radzyń Podlaski', coordinates: [22.6, 51.94] },
    category: mockEventCategories[4],
    organizer: {
      name: 'Radzyński Klub Turystyczny',
      phone: '+48 83 354 00 00',
      email: 'turystyka@radzyn.pl',
    },
    featuredImageUrl: '/images/event-6.jpg',
    isFeatured: false,
    isFree: false,
    ticketUrl: 'https://bilety.turystyka.radzyn.pl',
    status: 'published',
  },
];

export default mockEvents;
