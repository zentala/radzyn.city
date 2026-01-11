/**
 * Events Mock Data
 * Used for development and testing
 */

export interface EventLocation {
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

export interface EventOrganizer {
  name: string;
  phone?: string;
  email?: string;
}

export interface EventCategory {
  id: string;
  name: string;
  slug: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: EventLocation;
  category: EventCategory;
  organizer: EventOrganizer;
  featuredImage?: string;
  isFeatured?: boolean;
  isFree?: boolean;
  ticketUrl?: string;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
}

export const mockEventCategories: EventCategory[] = [
  { id: 'cat-1', name: 'Kultura', slug: 'kultura' },
  { id: 'cat-2', name: 'Sport', slug: 'sport' },
  { id: 'cat-3', name: 'Edukacja', slug: 'edukacja' },
  { id: 'cat-4', name: 'Społeczne', slug: 'spoleczne' },
  { id: 'cat-5', name: 'Rekreacja', slug: 'rekreacja' },
];

export const mockEvents: EventItem[] = [
  {
    id: 'event-1',
    title: 'Dni Radzynia Podlaskiego 2026',
    slug: 'dni-radzynia-podlaskiego-2026',
    description: 'Coroczne święto miasta z koncertami, wystawami i atrakcjami dla całej rodziny. Zapraszamy wszystkich mieszkańców i gości do wspólnego świętowania!',
    startDate: '2026-06-15T10:00:00Z',
    endDate: '2026-06-17T22:00:00Z',
    location: {
      name: 'Plac Wolności',
      address: 'Plac Wolności 1, 21-300 Radzyń Podlaski',
      coordinates: { lat: 51.9547, lng: 22.6176 },
    },
    category: mockEventCategories[0],
    organizer: {
      name: 'Urząd Miasta Radzyń Podlaski',
      phone: '+48 83 355 20 00',
      email: 'urzad@radzyn.pl',
    },
    featuredImage: '/images/event-1.jpg',
    isFeatured: true,
    isFree: true,
    status: 'upcoming',
  },
  {
    id: 'event-2',
    title: 'Koncert Symfoniczny w Pałacu Potockich',
    slug: 'koncert-symfoniczny-w-palacu-potockich',
    description: 'Wyjątkowy koncert symfoniczny w wykonaniu Orkistry Symfonicznej Filharmonii Lubelskiej. W programie utwory Chopina, Mozarta i Beethovena.',
    startDate: '2026-02-14T19:00:00Z',
    endDate: '2026-02-14T21:30:00Z',
    location: {
      name: 'Pałac Potockich',
      address: 'ul. Jana Pawła II 2, 21-300 Radzyń Podlaski',
      coordinates: { lat: 51.9547, lng: 22.6176 },
    },
    category: mockEventCategories[0],
    organizer: {
      name: 'Muzeum Ziemi Radzyńskiej',
      phone: '+48 83 352 00 18',
      email: 'muzeum@radzyn.pl',
    },
    featuredImage: '/images/event-2.jpg',
    isFeatured: true,
    isFree: false,
    ticketUrl: 'https://bilety.muzeum.radzyn.pl',
    status: 'upcoming',
  },
  {
    id: 'event-3',
    title: 'Mecz Piłki Nożnej: Radzyń vs Lublin',
    slug: 'mecz-pilki-noznej-radzyn-vs-lublin',
    description: 'Mecz ligowy pomiędzy drużynami Radzynia i Lublina. Zapraszamy kibiców na emocjonujące spotkanie!',
    startDate: '2026-02-20T15:00:00Z',
    endDate: '2026-02-20T17:00:00Z',
    location: {
      name: 'Stadion Miejski',
      address: 'ul. Sportowa 10, 21-300 Radzyń Podlaski',
      coordinates: { lat: 51.9500, lng: 22.6200 },
    },
    category: mockEventCategories[1],
    organizer: {
      name: 'Radzyński Klub Sportowy',
      phone: '+48 83 351 00 00',
    },
    featuredImage: '/images/event-3.jpg',
    isFeatured: false,
    isFree: true,
    status: 'upcoming',
  },
  {
    id: 'event-4',
    title: 'Warsztaty Ceramiczne dla Dzieci',
    slug: 'warsztaty-ceramiczne-dla-dzieci',
    description: 'Kreatywne warsztaty ceramiczne dla dzieci w wieku 6-12 lat. Pod okiem instruktora dzieci stworzą własne dzieła z gliny.',
    startDate: '2026-02-25T10:00:00Z',
    endDate: '2026-02-25T14:00:00Z',
    location: {
      name: 'Miejski Ośrodek Kultury',
      address: 'ul. Kultury 5, 21-300 Radzyń Podlaski',
      coordinates: { lat: 51.9520, lng: 22.6150 },
    },
    category: mockEventCategories[2],
    organizer: {
      name: 'Miejski Ośrodek Kultury',
      phone: '+48 83 353 00 00',
      email: 'mok@radzyn.pl',
    },
    featuredImage: '/images/event-4.jpg',
    isFeatured: false,
    isFree: true,
    status: 'upcoming',
  },
  {
    id: 'event-5',
    title: 'Jarmark Wielkanocny',
    slug: 'jarmark-wielkanocny',
    description: 'Tradycyjny jarmark wielkanocny z lokalnymi wyrobami rękodzieła, przysmakami i atrakcjami dla całej rodziny.',
    startDate: '2026-04-12T09:00:00Z',
    endDate: '2026-04-12T17:00:00Z',
    location: {
      name: 'Rynek Miejski',
      address: 'Rynek Miejski, 21-300 Radzyń Podlaski',
      coordinates: { lat: 51.9540, lng: 22.6180 },
    },
    category: mockEventCategories[3],
    organizer: {
      name: 'Urząd Miasta Radzyń Podlaski',
      phone: '+48 83 355 20 00',
    },
    featuredImage: '/images/event-5.jpg',
    isFeatured: true,
    isFree: true,
    status: 'upcoming',
  },
  {
    id: 'event-6',
    title: 'Spływ Kajakowy rzeką Bystrzycą',
    slug: 'splyw-kajakowy-rzeka-bystrzyca',
    description: 'Rodzinny spływ kajakowy rzeką Bystrzycą. Trasa prowadzi przez malownicze krajobrazy Puszczy Solskiej.',
    startDate: '2026-05-20T08:00:00Z',
    endDate: '2026-05-20T16:00:00Z',
    location: {
      name: 'Przystań kajakowa',
      address: 'ul. Leśna 15, 21-300 Radzyń Podlaski',
      coordinates: { lat: 51.9400, lng: 22.6000 },
    },
    category: mockEventCategories[4],
    organizer: {
      name: 'Radzyński Klub Turystyczny',
      phone: '+48 83 354 00 00',
      email: 'turystyka@radzyn.pl',
    },
    featuredImage: '/images/event-6.jpg',
    isFeatured: false,
    isFree: false,
    ticketUrl: 'https://bilety.turystyka.radzyn.pl',
    status: 'upcoming',
  },
];

export default mockEvents;
