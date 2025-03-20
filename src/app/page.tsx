import WeatherWidget from '@/components/WeatherWidget';
import CityHighlights from '@/components/CityHighlights';
import PlaceholderImage from '@/components/PlaceholderImage';
import NewsFeed from '@/components/NewsFeed';
import Link from 'next/link';

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
              <h3 className="text-xl font-semibold mb-4">Na skróty</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/city" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <svg className="w-8 h-8 mb-2 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <h4 className="font-medium">O mieście</h4>
                  <p className="text-sm text-gray-600">Historia i atrakcje</p>
                </Link>
                <Link href="/events" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <svg className="w-8 h-8 mb-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-medium">Wydarzenia</h4>
                  <p className="text-sm text-gray-600">Kalendarz imprez</p>
                </Link>
                <Link href="/county" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <svg className="w-8 h-8 mb-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3.5A1.5 1.5 0 017.5 2h1A1.5 1.5 0 010 3.5V5h6V3.5zm7 0A1.5 1.5 0 0112.5 2h1a1.5 1.5 0 010 3h-1A1.5 1.5 0 0113 3.5V5h6V3.5a2.5 2.5 0 00-2.5-2.5h-11A2.5 2.5 0 003 3.5V5h6V3.5zm-5 10a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" />
                    <path fillRule="evenodd" d="M3 6.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-medium">Powiat</h4>
                  <p className="text-sm text-gray-600">Informacje o gminie</p>
                </Link>
                <Link href="/contact" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition">
                  <svg className="w-8 h-8 mb-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <h4 className="font-medium">Kontakt</h4>
                  <p className="text-sm text-gray-600">Dane kontaktowe</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* News Feed */}
        <NewsFeed limit={3} />
        
        {/* City Highlights */}
        <CityHighlights />
        
        {/* Quick links to events */}
        <section className="mt-12 mb-12 bg-primary/5 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Nadchodzące wydarzenia</h2>
            <Link 
              href="/events" 
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
            >
              Zobacz kalendarz
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
              <span className="text-xs font-medium text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded border border-purple-200 self-start mb-2">
                Kulturalne
              </span>
              <h3 className="font-medium mb-1">Dni Radzynia Podlaskiego</h3>
              <p className="text-sm text-gray-600 mb-2">24-26 czerwca 2025</p>
              <p className="text-sm text-gray-500 flex-grow">Coroczne święto miasta z koncertami i atrakcjami.</p>
              <Link href="/events" className="text-primary hover:underline text-sm mt-2 self-end">
                Dowiedz się więcej
              </Link>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
              <span className="text-xs font-medium text-green-800 bg-green-100 px-2.5 py-0.5 rounded border border-green-200 self-start mb-2">
                Sportowe
              </span>
              <h3 className="font-medium mb-1">Radzyński Bieg Uliczny</h3>
              <p className="text-sm text-gray-600 mb-2">3 kwietnia 2025</p>
              <p className="text-sm text-gray-500 flex-grow">Zawody biegowe na dystansie 5 i 10 km.</p>
              <Link href="/events" className="text-primary hover:underline text-sm mt-2 self-end">
                Dowiedz się więcej
              </Link>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
              <span className="text-xs font-medium text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-200 self-start mb-2">
                Biznesowe
              </span>
              <h3 className="font-medium mb-1">Forum Gospodarcze Powiatu</h3>
              <p className="text-sm text-gray-600 mb-2">21 kwietnia 2025</p>
              <p className="text-sm text-gray-500 flex-grow">Spotkanie przedsiębiorców i samorządowców.</p>
              <Link href="/events" className="text-primary hover:underline text-sm mt-2 self-end">
                Dowiedz się więcej
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}