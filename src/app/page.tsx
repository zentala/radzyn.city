import WeatherWidget from '@/components/WeatherWidget';
import CityHighlights from '@/components/CityHighlights';
import PlaceholderImage from '@/components/PlaceholderImage';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <PlaceholderImage 
            title="Panorama Radzynia Podlaskiego"
            className="w-full h-full"
            height={600}
            aspectRatio="landscape"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end">
          <div className="container mx-auto px-4 py-12 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">Radzyń Podlaski</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">Piękno historii i tradycji w sercu Podlasia</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Witaj w Radzyniu Podlaskim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                Odkryj piękno i historię miasta Radzyń Podlaski i powiatu radzyńskiego. 
                Nasza strona jest Twoim przewodnikiem po lokalnych atrakcjach, 
                wydarzeniach i usługach.
              </p>
              <WeatherWidget />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Aktualności</h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-medium">Nadchodzące wydarzenia kulturalne</h4>
                  <p className="text-gray-600">Sprawdź kalendarz najbliższych wydarzeń w mieście</p>
                </li>
                <li>
                  <h4 className="font-medium">Nowe inwestycje w regionie</h4>
                  <p className="text-gray-600">Dowiedz się o planowanych i realizowanych projektach</p>
                </li>
                <li>
                  <h4 className="font-medium">Informacje dla mieszkańców</h4>
                  <p className="text-gray-600">Ogłoszenia i komunikaty urzędowe</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        <CityHighlights />
      </div>
    </div>
  );
}