/**
 * Places Mock Data
 * Used for development and testing
 */

export interface PlaceCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PlaceContact {
  phone?: string;
  email?: string;
  website?: string;
}

export interface PlaceOpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface PlaceReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface PlaceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: PlaceCategory;
  address: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  openingHours?: PlaceOpeningHours;
  contact?: PlaceContact;
  features?: string[];
  rating?: number;
  reviews?: number;
  reviewsData?: PlaceReview[];
  isFeatured?: boolean;
  isVerified?: boolean;
}

export const mockPlaceCategories: PlaceCategory[] = [
  { id: 'cat-1', name: 'Zabytki', slug: 'zabytki' },
  { id: 'cat-2', name: 'Kultura', slug: 'kultura' },
  { id: 'cat-3', name: 'Sport', slug: 'sport' },
  { id: 'cat-4', name: 'Gastronomia', slug: 'gastronomia' },
  { id: 'cat-5', name: 'Rekreacja', slug: 'rekreacja' },
  { id: 'cat-6', name: 'Instytucje', slug: 'instytucje' },
  { id: 'cat-7', name: 'Miejsca publiczne', slug: 'miejsca-publiczne' },
];

export const mockPlaces: PlaceItem[] = [
  {
    id: 'place-1',
    name: 'Pałac Potockich',
    slug: 'palac-potockich',
    description: 'Barokowy pałac z XVIII wieku, jedna z głównych atrakcji miasta. Obecnie siedziba muzeum ziemi radzyńskiej z bogatymi zbiorami historycznymi i artystycznymi.',
    category: mockPlaceCategories[0],
    address: 'ul. Jana Pawła II 2, 21-300 Radzyń Podlaski',
    coordinates: { lat: 51.9547, lng: 22.6176 },
    images: ['/images/palac-1.jpg', '/images/palac-2.jpg', '/images/palac-3.jpg'],
    openingHours: {
      monday: '10:00 - 16:00',
      tuesday: '10:00 - 16:00',
      wednesday: '10:00 - 16:00',
      thursday: '10:00 - 16:00',
      friday: '10:00 - 16:00',
      saturday: '10:00 - 18:00',
      sunday: '12:00 - 16:00',
    },
    contact: {
      phone: '+48 83 352 00 18',
      email: 'muzeum@radzyn.pl',
      website: 'https://muzeum.radzyn.pl',
    },
    features: ['Parking', 'Winda', 'Toalety', 'Kawiarnia', 'Dostęp dla niepełnosprawnych', 'Przewodnik'],
    rating: 4.8,
    reviews: 128,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 'place-2',
    name: 'Kościół Farny pw. Św. Trójcy',
    slug: 'kosciol-farny-pw-sw-trojcy',
    description: 'Gotycki kościół z XV wieku, najstarszy zabytek sakralny w mieście. Wnętrze zdobione jest pięknymi polichromiami i posiada unikalne organy.',
    category: mockPlaceCategories[0],
    address: 'ul. Farna 1, 21-300 Radzyń Podlaski',
    coordinates: { lat: 51.9530, lng: 22.6180 },
    images: ['/images/kosciol-1.jpg', '/images/kosciol-2.jpg'],
    openingHours: {
      monday: '07:00 - 18:00',
      tuesday: '07:00 - 18:00',
      wednesday: '07:00 - 18:00',
      thursday: '07:00 - 18:00',
      friday: '07:00 - 18:00',
      saturday: '08:00 - 19:00',
      sunday: '08:00 - 19:00',
    },
    contact: {
      phone: '+48 83 351 00 00',
      email: 'parafia@radzyn.pl',
    },
    features: ['Parking', 'Toalety', 'Dostęp dla niepełnosprawnych'],
    rating: 4.9,
    reviews: 95,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 'place-3',
    name: 'Miejski Ośrodek Kultury',
    slug: 'miejski-osrodek-kultury',
    description: 'Nowoczesny ośrodek kultury z salą koncertową, galerią sztuki, kinem i przestrzeniami do warsztatów artystycznych.',
    category: mockPlaceCategories[1],
    address: 'ul. Kultury 5, 21-300 Radzyń Podlaski',
    coordinates: { lat: 51.9520, lng: 22.6150 },
    images: ['/images/mok-1.jpg', '/images/mok-2.jpg'],
    openingHours: {
      monday: '08:00 - 20:00',
      tuesday: '08:00 - 20:00',
      wednesday: '08:00 - 20:00',
      thursday: '08:00 - 20:00',
      friday: '08:00 - 20:00',
      saturday: '10:00 - 22:00',
      sunday: '10:00 - 22:00',
    },
    contact: {
      phone: '+48 83 353 00 00',
      email: 'mok@radzyn.pl',
      website: 'https://mok.radzyn.pl',
    },
    features: ['Parking', 'Kawiarnia', 'Toalety', 'Dostęp dla niepełnosprawnych', 'WiFi'],
    rating: 4.5,
    reviews: 67,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 'place-4',
    name: 'Stadion Miejski',
    slug: 'stadion-miejski',
    description: 'Nowoczesny stadion sportowy z boiskiem piłkarskim, bieżnią i trybunami dla 2000 widzów. Miejsce rozgrywek lokalnych drużyn.',
    category: mockPlaceCategories[2],
    address: 'ul. Sportowa 10, 21-300 Radzyń Podlaski',
    coordinates: { lat: 51.9500, lng: 22.6200 },
    images: ['/images/stadion-1.jpg', '/images/stadion-2.jpg'],
    openingHours: {
      monday: '06:00 - 22:00',
      tuesday: '06:00 - 22:00',
      wednesday: '06:00 - 22:00',
      thursday: '06:00 - 22:00',
      friday: '06:00 - 22:00',
      saturday: '08:00 - 22:00',
      sunday: '08:00 - 22:00',
    },
    contact: {
      phone: '+48 83 351 00 00',
    },
    features: ['Parking', 'Toalety', 'Szatnie', 'Dostęp dla niepełnosprawnych', 'Oświetlenie'],
    rating: 4.2,
    reviews: 43,
    isFeatured: false,
    isVerified: true,
  },
  {
    id: 'place-5',
    name: 'Restauracja "Pod Złotym Jeleniem"',
    slug: 'restauracja-pod-zlotym-jeleniem',
    description: 'Tradycyjna polska restauracja z autentycznymi daniami kuchni regionalnej. Specjalizuje się w potrawach z dziczy i lokalnych produktach.',
    category: mockPlaceCategories[3],
    address: 'ul. 3 Maja 15, 21-300 Radzyń Podlaski',
    coordinates: { lat: 51.9510, lng: 22.6190 },
    images: ['/images/restauracja-1.jpg', '/images/restauracja-2.jpg'],
    openingHours: {
      monday: '11:00 - 22:00',
      tuesday: '11:00 - 22:00',
      wednesday: '11:00 - 22:00',
      thursday: '11:00 - 22:00',
      friday: '11:00 - 23:00',
      saturday: '12:00 - 23:00',
      sunday: '12:00 - 21:00',
    },
    contact: {
      phone: '+48 83 350 00 00',
      email: 'kontakt@zloty-jelen.pl',
    },
    features: ['Parking', 'Toalety', 'Dostęp dla niepełnosprawnych', 'Klimatyzacja', 'WiFi'],
    rating: 4.6,
    reviews: 89,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 'place-6',
    name: 'Park Miejski im. Jana Pawła II',
    slug: 'park-miejski-im-jana-pawla-ii',
    description: 'Największy park w mieście z alejkami spacerowymi, placem zabaw dla dzieci, stawem i licznymi drzewami. Idealne miejsce na relaks i rekreację.',
    category: mockPlaceCategories[4],
    address: 'ul. Parkowa 1, 21-300 Radzyń Podlaski',
    coordinates: { lat: 51.9480, lng: 22.6160 },
    images: ['/images/park-1.jpg', '/images/park-2.jpg'],
    openingHours: {
      monday: '06:00 - 22:00',
      tuesday: '06:00 - 22:00',
      wednesday: '06:00 - 22:00',
      thursday: '06:00 - 22:00',
      friday: '06:00 - 22:00',
      saturday: '06:00 - 22:00',
      sunday: '06:00 - 22:00',
    },
    features: ['Parking', 'Toalety', 'Plac zabaw', 'Staw', 'Alejki spacerowe', 'Dostęp dla niepełnosprawnych'],
    rating: 4.7,
    reviews: 156,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 'place-7',
    name: 'Urząd Miasta Radzyń Podlaski',
    slug: 'urzad-miasta-radzyn-podlaski',
    description: 'Siedziba władz miejskich. Budynek z początku XX wieku, odnowiony i przystosowany do potrzeb mieszkańców.',
    category: mockPlaceCategories[5],
    address: 'ul. Wolności 1, 21-300 Radzyń Podlaski',
    coordinates: { lat: 51.9540, lng: 22.6180 },
    images: ['/images/urzad-1.jpg'],
    openingHours: {
      monday: '08:00 - 16:00',
      tuesday: '08:00 - 16:00',
      wednesday: '08:00 - 16:00',
      thursday: '08:00 - 16:00',
      friday: '08:00 - 16:00',
      saturday: 'Zamknięte',
      sunday: 'Zamknięte',
    },
    contact: {
      phone: '+48 83 355 20 00',
      email: 'urzad@radzyn.pl',
      website: 'https://radzyn.pl',
    },
    features: ['Parking', 'Toalety', 'Dostęp dla niepełnosprawnych', 'WiFi'],
    rating: 3.8,
    reviews: 34,
    isFeatured: false,
    isVerified: true,
  },
];

export default mockPlaces;
