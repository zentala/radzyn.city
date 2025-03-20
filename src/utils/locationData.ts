import { LocationPoint } from '../components/Map';

// Coordinates for Radzyń Podlaski, Poland
const CITY_CENTER: [number, number] = [51.7833, 22.6167];

// Category to color mapping for markers
export const CATEGORY_COLORS = {
  'Zabytki': '#9C27B0', // Purple
  'Miejsca publiczne': '#2196F3', // Blue
  'Instytucje': '#F44336', // Red
  'Rekreacja': '#4CAF50', // Green
  'Kultura': '#FF9800', // Orange
  'Sport': '#3F51B5', // Indigo
  'Gastronomia': '#795548', // Brown
  'default': '#757575' // Grey
};

// Sample data for locations in Radzyń Podlaski
export const locations: LocationPoint[] = [
  {
    id: 'palac-potockich',
    name: 'Pałac Potockich',
    description: 'Barokowy pałac z XVIII wieku, jedna z głównych atrakcji miasta',
    position: [51.7830, 22.6190],
    category: 'Zabytki',
    imageUrl: '/images/palac-potockich.svg',
    address: 'ul. Jana Pawła II 2, 21-300 Radzyń Podlaski',
    phone: '+48 83 352 0018',
    email: 'palac@radzyn.pl',
    website: 'https://palacpotockich.pl',
    openingHours: {
      monday: '10:00 - 18:00',
      tuesday: '10:00 - 18:00',
      wednesday: '10:00 - 18:00',
      thursday: '10:00 - 18:00',
      friday: '10:00 - 18:00',
      saturday: '10:00 - 18:00',
      sunday: '12:00 - 16:00'
    },
    amenities: ['Parking', 'Toalety', 'Dostęp dla niepełnosprawnych', 'Przewodnik'],
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        author: 'Anna Kowalska',
        date: '2023-07-15',
        rating: 5,
        comment: 'Piękny zabytek, warto odwiedzić!'
      },
      {
        id: 'r2',
        author: 'Jan Nowak',
        date: '2023-06-22',
        rating: 4.5,
        comment: 'Świetne miejsce, ciekawa historia. Trochę drogi bilet wstępu.'
      }
    ]
  },
  {
    id: 'kosciol-trojcy',
    name: 'Kościół Świętej Trójcy',
    description: 'Zabytkowy kościół parafialny z XVII wieku',
    position: [51.7845, 22.6210],
    category: 'Zabytki',
    imageUrl: '/images/kosciol.svg',
    address: 'ul. Św. Trójcy 5, 21-300 Radzyń Podlaski',
    phone: '+48 83 352 1124',
    email: 'parafia@swtrojca.pl',
    website: 'https://parafiaswtrojcy.pl',
    openingHours: {
      monday: '7:00 - 18:00',
      tuesday: '7:00 - 18:00',
      wednesday: '7:00 - 18:00',
      thursday: '7:00 - 18:00',
      friday: '7:00 - 18:00',
      saturday: '7:00 - 18:00',
      sunday: '6:00 - 20:00'
    },
    amenities: ['Parking', 'Dostęp dla niepełnosprawnych'],
    rating: 4.9
  },
  {
    id: 'rynek',
    name: 'Rynek',
    description: 'Główny plac miejski z zabytkową zabudową',
    position: [51.7840, 22.6180],
    category: 'Miejsca publiczne',
    address: 'Rynek, 21-300 Radzyń Podlaski',
    amenities: ['Ławki', 'Kosze na śmieci', 'Oświetlenie']
  },
  {
    id: 'urzad-miasta',
    name: 'Urząd Miasta',
    description: 'Siedziba władz miejskich Radzynia Podlaskiego',
    position: [51.7835, 22.6175],
    category: 'Instytucje',
    address: 'ul. Warszawska 32, 21-300 Radzyń Podlaski',
    phone: '+48 83 351 2484',
    email: 'sekretariat@radzyn-podl.pl',
    website: 'https://radzynpodlaski.pl',
    openingHours: {
      monday: '7:30 - 15:30',
      tuesday: '7:30 - 15:30',
      wednesday: '7:30 - 15:30',
      thursday: '7:30 - 15:30',
      friday: '7:30 - 15:30'
    },
    amenities: ['Parking', 'Toalety', 'Dostęp dla niepełnosprawnych', 'E-usługi']
  },
  {
    id: 'park-miejski',
    name: 'Park Miejski',
    description: 'Park z alejkami spacerowymi i stawem',
    position: [51.7820, 22.6160],
    category: 'Rekreacja',
    address: 'ul. Parkowa, 21-300 Radzyń Podlaski',
    amenities: ['Ławki', 'Plac zabaw', 'Ścieżki rowerowe', 'Staw', 'Oświetlenie']
  },
  {
    id: 'biblioteka',
    name: 'Miejska Biblioteka Publiczna',
    description: 'Biblioteka oferująca bogaty księgozbiór i czytelnie',
    position: [51.7850, 22.6190],
    category: 'Kultura',
    address: 'ul. Armii Krajowej 2, 21-300 Radzyń Podlaski',
    phone: '+48 83 352 7223',
    email: 'biblioteka@mbp.radzyn.pl',
    website: 'https://mbp-radzyn.pl',
    openingHours: {
      monday: '8:00 - 18:00',
      tuesday: '8:00 - 18:00',
      wednesday: '8:00 - 18:00',
      thursday: '8:00 - 18:00',
      friday: '8:00 - 18:00',
      saturday: '9:00 - 15:00'
    },
    amenities: ['Czytelnia', 'Komputer z dostępem do internetu', 'Wi-Fi', 'Kserowanie']
  },
  {
    id: 'muzeum',
    name: 'Muzeum Regionalne',
    description: 'Muzeum prezentujące historię i kulturę regionu',
    position: [51.7828, 22.6195],
    category: 'Kultura',
    address: 'ul. Warszawska 5B, 21-300 Radzyń Podlaski',
    phone: '+48 83 352 0645',
    email: 'info@muzeum-radzyn.pl',
    website: 'https://muzeum-radzyn.pl',
    openingHours: {
      tuesday: '10:00 - 16:00',
      wednesday: '10:00 - 16:00',
      thursday: '10:00 - 16:00',
      friday: '10:00 - 16:00',
      saturday: '10:00 - 16:00',
      sunday: '10:00 - 16:00'
    },
    amenities: ['Parking', 'Toalety', 'Sklep z pamiątkami'],
    rating: 4.5
  },
  {
    id: 'stadion',
    name: 'Stadion Miejski',
    description: 'Obiekt sportowy z boiskiem do piłki nożnej',
    position: [51.7800, 22.6150],
    category: 'Sport',
    address: 'ul. Sportowa 5, 21-300 Radzyń Podlaski',
    phone: '+48 83 352 8837',
    email: 'stadion@mosir.radzyn.pl',
    website: 'https://mosir.radzyn.pl',
    openingHours: {
      monday: '8:00 - 20:00',
      tuesday: '8:00 - 20:00',
      wednesday: '8:00 - 20:00',
      thursday: '8:00 - 20:00',
      friday: '8:00 - 20:00',
      saturday: '9:00 - 18:00',
      sunday: '9:00 - 18:00'
    },
    amenities: ['Parking', 'Toalety', 'Szatnie', 'Trybuny']
  },
  {
    id: 'restauracja-dworek',
    name: 'Restauracja Dworek',
    description: 'Restauracja serwująca dania kuchni polskiej',
    position: [51.7818, 22.6172],
    category: 'Gastronomia',
    address: 'ul. Warszawska 15, 21-300 Radzyń Podlaski',
    phone: '+48 83 352 3342',
    email: 'kontakt@restauracja-dworek.pl',
    website: 'https://restauracja-dworek.pl',
    openingHours: {
      monday: '12:00 - 22:00',
      tuesday: '12:00 - 22:00',
      wednesday: '12:00 - 22:00',
      thursday: '12:00 - 22:00',
      friday: '12:00 - 23:00',
      saturday: '12:00 - 23:00',
      sunday: '12:00 - 22:00'
    },
    amenities: ['Parking', 'Toalety', 'Ogródek letni', 'Dostęp dla niepełnosprawnych', 'Kącik dla dzieci'],
    rating: 4.7,
    reviews: [
      {
        id: 'r3',
        author: 'Piotr Wiśniewski',
        date: '2023-08-10',
        rating: 5,
        comment: 'Pyszne jedzenie, świetna obsługa, polecam!'
      },
      {
        id: 'r4',
        author: 'Magdalena Kaczmarek',
        date: '2023-07-28',
        rating: 4,
        comment: 'Smaczne dania, ale trochę trzeba poczekać na obsługę.'
      }
    ]
  },
  {
    id: 'kawiarnia-ratuszowa',
    name: 'Kawiarnia Ratuszowa',
    description: 'Przytulna kawiarnia w centrum miasta',
    position: [51.7838, 22.6178],
    category: 'Gastronomia',
    address: 'Rynek 12, 21-300 Radzyń Podlaski',
    phone: '+48 83 352 1233',
    email: 'kontakt@kawiarnia-ratuszowa.pl',
    website: 'https://kawiarnia-ratuszowa.pl',
    openingHours: {
      monday: '9:00 - 20:00',
      tuesday: '9:00 - 20:00',
      wednesday: '9:00 - 20:00',
      thursday: '9:00 - 20:00',
      friday: '9:00 - 21:00',
      saturday: '9:00 - 21:00',
      sunday: '10:00 - 19:00'
    },
    amenities: ['Wi-Fi', 'Toalety', 'Ogródek letni'],
    rating: 4.6,
    reviews: [
      {
        id: 'r5',
        author: 'Aleksandra Nowicka',
        date: '2023-09-05',
        rating: 5,
        comment: 'Najlepsza kawa w mieście!'
      }
    ]
  }
];

export const CITY_MAP_DEFAULT_CENTER = CITY_CENTER;
export const CITY_MAP_DEFAULT_ZOOM = 15;