import { LocationPoint } from '../components/Map';

// Coordinates for Radzyń Podlaski, Poland
const CITY_CENTER: [number, number] = [51.7833, 22.6167];

// Sample data for locations in Radzyń Podlaski
export const locations: LocationPoint[] = [
  {
    id: 'palac-potockich',
    name: 'Pałac Potockich',
    description: 'Barokowy pałac z XVIII wieku, jedna z głównych atrakcji miasta',
    position: [51.7830, 22.6190],
    category: 'Zabytki',
    imageUrl: '/images/palac-potockich.svg',
  },
  {
    id: 'kosciol-trojcy',
    name: 'Kościół Świętej Trójcy',
    description: 'Zabytkowy kościół parafialny z XVII wieku',
    position: [51.7845, 22.6210],
    category: 'Zabytki',
    imageUrl: '/images/kosciol.svg',
  },
  {
    id: 'rynek',
    name: 'Rynek',
    description: 'Główny plac miejski z zabytkową zabudową',
    position: [51.7840, 22.6180],
    category: 'Miejsca publiczne',
  },
  {
    id: 'urzad-miasta',
    name: 'Urząd Miasta',
    description: 'Siedziba władz miejskich Radzynia Podlaskiego',
    position: [51.7835, 22.6175],
    category: 'Instytucje',
  },
  {
    id: 'park-miejski',
    name: 'Park Miejski',
    description: 'Park z alejkami spacerowymi i stawem',
    position: [51.7820, 22.6160],
    category: 'Rekreacja',
  },
  {
    id: 'biblioteka',
    name: 'Miejska Biblioteka Publiczna',
    description: 'Biblioteka oferująca bogaty księgozbiór i czytelnie',
    position: [51.7850, 22.6190],
    category: 'Kultura',
  },
  {
    id: 'muzeum',
    name: 'Muzeum Regionalne',
    description: 'Muzeum prezentujące historię i kulturę regionu',
    position: [51.7828, 22.6195],
    category: 'Kultura',
  },
  {
    id: 'stadion',
    name: 'Stadion Miejski',
    description: 'Obiekt sportowy z boiskiem do piłki nożnej',
    position: [51.7800, 22.6150],
    category: 'Sport',
  },
  {
    id: 'restauracja-dworek',
    name: 'Restauracja Dworek',
    description: 'Restauracja serwująca dania kuchni polskiej',
    position: [51.7818, 22.6172],
    category: 'Gastronomia',
  },
  {
    id: 'kawiarnia-ratuszowa',
    name: 'Kawiarnia Ratuszowa',
    description: 'Przytulna kawiarnia w centrum miasta',
    position: [51.7838, 22.6178],
    category: 'Gastronomia',
  }
];

export const CITY_MAP_DEFAULT_CENTER = CITY_CENTER;
export const CITY_MAP_DEFAULT_ZOOM = 15;