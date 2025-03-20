import NewsFeed from '@/components/NewsFeed';

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-bold mb-4">Aktualności</h1>
      <p className="text-lg text-gray-700 mb-8">
        Najnowsze informacje i wiadomości z Radzynia Podlaskiego i powiatu radzyńskiego. Bądź na bieżąco z wydarzeniami w regionie.
      </p>
      
      <NewsFeed showMoreLink={false} title="Wszystkie aktualności" limit={12} />
    </div>
  );
}