/**
 * News Mock Data
 * Used for development and testing
 */

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface NewsTag {
  id: string;
  name: string;
  slug: string;
}

export interface NewsAuthor {
  name: string;
  avatar?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  tags: NewsTag[];
  author: NewsAuthor;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  views?: number;
  status: 'published' | 'draft';
  featured?: boolean;
  aiAnalysis?: {
    sentiment: 'positive' | 'neutral' | 'negative';
    keywords: string[];
    readingTimeMinutes: number;
    relevanceScore: number;
  };
}

export const mockCategories: NewsCategory[] = [
  { id: 'cat-1', name: 'Miasto', slug: 'miasto', color: 'primary' },
  { id: 'cat-2', name: 'Gospodarka', slug: 'gospodarka', color: 'success' },
  { id: 'cat-3', name: 'Kultura', slug: 'kultura', color: 'info' },
  { id: 'cat-4', name: 'Sport', slug: 'sport', color: 'warning' },
  { id: 'cat-5', name: 'Edukacja', slug: 'edukacja', color: 'secondary' },
];

export const mockTags: NewsTag[] = [
  { id: 'tag-1', name: 'inwestycje', slug: 'inwestycje' },
  { id: 'tag-2', name: 'kultura', slug: 'kultura' },
  { id: 'tag-3', name: 'sport', slug: 'sport' },
  { id: 'tag-4', name: 'edukacja', slug: 'edukacja' },
  { id: 'tag-5', name: 'transport', slug: 'transport' },
  { id: 'tag-6', name: 'zdrowie', slug: 'zdrowie' },
  { id: 'tag-7', name: 'turystyka', slug: 'turystyka' },
  { id: 'tag-8', name: 'przedsiebiorstwo', slug: 'przedsiebiorstwo' },
];

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Nowa inwestycja w centrum miasta',
    slug: 'nowa-inwestycja-w-centrum-miasta',
    excerpt: 'Rozpoczęła się budowa nowego centrum kulturalnego, które stanie się sercem życia społecznego Radzynia Podlaskiego.',
    content: 'Pełna treść artykułu o nowej inwestycji w centrum miasta. Projekt obejmuje budowę nowego centrum kulturalnego z salą koncertową, galerią sztuki i przestrzeniami do spotkań społecznych. Inwestycja ma zostać ukończona w 2026 roku.',
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1]],
    author: { name: 'Jan Kowalski', avatar: '/avatars/jan.jpg' },
    publishedAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
    featuredImage: '/images/news-1.jpg',
    views: 1234,
    status: 'published',
    featured: true,
    aiAnalysis: {
      sentiment: 'positive',
      keywords: ['inwestycja', 'kultura', 'centrum', 'rozwój'],
      readingTimeMinutes: 5,
      relevanceScore: 0.95,
    },
  },
  {
    id: 'news-2',
    title: 'Modernizacja ulic w dzielnicy północnej',
    slug: 'modernizacja-ulic-w-dzielnicy-polnocnej',
    excerpt: 'Miasto ogłasza plan modernizacji ulic w dzielnicy północnej. Prace rozpoczną się w przyszłym miesiącu.',
    content: 'Pełna treść artykułu o modernizacji ulic. Projekt obejmuje wymianę nawierzchni, budowę nowych chodników oraz oświetlenia LED.',
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[4]],
    author: { name: 'Anna Nowak' },
    publishedAt: '2026-01-09T14:30:00Z',
    updatedAt: '2026-01-09T14:30:00Z',
    featuredImage: '/images/news-2.jpg',
    views: 856,
    status: 'published',
    aiAnalysis: {
      sentiment: 'neutral',
      keywords: ['modernizacja', 'ulice', 'infrastruktura'],
      readingTimeMinutes: 4,
      relevanceScore: 0.88,
    },
  },
  {
    id: 'news-3',
    title: 'Festiwal Kultury Radzyń 2026',
    slug: 'festiwal-kultury-radzyn-2026',
    excerpt: 'Zapraszamy na coroczny Festiwal Kultury Radzyń. W programie koncerty, wystawy i warsztaty.',
    content: 'Pełna treść artykułu o Festiwalu Kultury. Wydarzenie odbędzie się w dniach 15-17 lipca 2026 roku.',
    category: mockCategories[2],
    tags: [mockTags[1], mockTags[6]],
    author: { name: 'Marek Zieliński' },
    publishedAt: '2026-01-08T09:00:00Z',
    updatedAt: '2026-01-08T09:00:00Z',
    featuredImage: '/images/news-3.jpg',
    views: 2341,
    status: 'published',
    featured: true,
    aiAnalysis: {
      sentiment: 'positive',
      keywords: ['festiwal', 'kultura', 'wydarzenia'],
      readingTimeMinutes: 3,
      relevanceScore: 0.92,
    },
  },
  {
    id: 'news-4',
    title: 'Nowe boisko sportowe przy szkole podstawowej',
    slug: 'nowe-boisko-sportowe-przy-szkole-podstawowej',
    excerpt: 'Uroczystość otwarcia nowego boiska sportowego przy Szkole Podstawowej nr 1.',
    content: 'Pełna treść artykułu o nowym boisku sportowym.',
    category: mockCategories[3],
    tags: [mockTags[2], mockTags[5]],
    author: { name: 'Katarzyna Wiśniewska' },
    publishedAt: '2026-01-07T16:00:00Z',
    updatedAt: '2026-01-07T16:00:00Z',
    featuredImage: '/images/news-4.jpg',
    views: 567,
    status: 'published',
    aiAnalysis: {
      sentiment: 'positive',
      keywords: ['sport', 'edukacja', 'inwestycja'],
      readingTimeMinutes: 3,
      relevanceScore: 0.85,
    },
  },
  {
    id: 'news-5',
    title: 'Rozbudowa szpitala powiatowego',
    slug: 'rozbudowa-szpitala-powiatowego',
    excerpt: 'Rozpoczęła się rozbudowa szpitala powiatowego. Nowe skrzydło będzie gotowe w 2027 roku.',
    content: 'Pełna treść artykułu o rozbudowie szpitala.',
    category: mockCategories[4],
    tags: [mockTags[4], mockTags[5]],
    author: { name: 'Tomasz Lewandowski' },
    publishedAt: '2026-01-06T11:00:00Z',
    updatedAt: '2026-01-06T11:00:00Z',
    featuredImage: '/images/news-5.jpg',
    views: 1890,
    status: 'published',
    featured: true,
    aiAnalysis: {
      sentiment: 'neutral',
      keywords: ['zdrowie', 'szpital', 'inwestycja'],
      readingTimeMinutes: 6,
      relevanceScore: 0.90,
    },
  },
];

export default mockNewsArticles;
