"use client";

import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import { months } from '@/utils/dates';

// Metadata is moved to a separate layout.tsx file

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export default function EventsPage() {
  // Sample event data
  const events = [
    {
      title: 'Dni Radzynia Podlaskiego',
      date: '24-26 czerwca 2025',
      location: 'Park Miejski, Radzyń Podlaski',
      description: 'Coroczne święto miasta z koncertami, pokazami artystycznymi i atrakcjami dla całych rodzin.',
      category: 'kulturalne',
    },
    {
      title: 'Festiwal Kultury Ludowej',
      date: '15 maja 2025',
      location: 'Oranżeria, Radzyń Podlaski',
      description: 'Prezentacja lokalnego folkloru, muzyki ludowej i tradycyjnego rękodzieła z regionu radzyńskiego.',
      category: 'kulturalne',
    },
    {
      title: 'Radzyński Bieg Uliczny',
      date: '3 kwietnia 2025',
      location: 'Centrum miasta, Radzyń Podlaski',
      description: 'Zawody biegowe na dystansie 5 i 10 km, biegi dla dzieci i zawody dla niepełnosprawnych.',
      category: 'sportowe',
    },
    {
      title: 'Targi Pracy i Edukacji',
      date: '12 kwietnia 2025',
      location: 'Zespół Szkół Ponadpodstawowych, Radzyń Podlaski',
      description: 'Spotkanie pracodawców, instytucji edukacyjnych i osób poszukujących pracy z powiatu radzyńskiego.',
      category: 'edukacyjne',
    },
    {
      title: 'Koncert Symfoniczny „Muzyka Mistrzów"',
      date: '28 marca 2025',
      location: 'Sala koncertowa Pałacu Potockich, Radzyń Podlaski',
      description: 'Wykonanie dzieł klasyków muzyki poważnej przez Lubelską Orkiestrę Kameralną.',
      category: 'kulturalne',
    },
    {
      title: 'Zawody Wędkarskie o Puchar Starosty',
      date: '10 maja 2025',
      location: 'Zalew w Radzyniu Podlaskim',
      description: 'Coroczne zawody wędkarskie otwarte dla wszystkich mieszkańców powiatu.',
      category: 'sportowe',
    },
    {
      title: 'Piknik Historyczny',
      date: '7 czerwca 2025',
      location: 'Dziedziniec Pałacu Potockich, Radzyń Podlaski',
      description: 'Rekonstrukcje historyczne, prezentacja dawnego rzemiosła i zwyczajów z regionu radzyńskiego.',
      category: 'kulturalne',
    },
    {
      title: 'Forum Gospodarcze Powiatu Radzyńskiego',
      date: '21 kwietnia 2025',
      location: 'Starostwo Powiatowe, Radzyń Podlaski',
      description: 'Spotkanie przedsiębiorców, samorządowców i instytucji wspierających rozwój gospodarczy regionu.',
      category: 'biznesowe',
    },
  ];

  // Get unique categories
  const allCategories = [...new Set(events.map(event => event.category))];
  const allMonths = [...new Set(events.map(event => {
    // Extract month from date
    const monthStr = event.date.split(' ')[1].toLowerCase();
    return monthStr;
  }))];

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Apply filters
  useEffect(() => {
    let filtered = [...events];
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter(event => {
        const monthStr = event.date.split(' ')[1].toLowerCase();
        return monthStr === selectedMonth;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [selectedCategory, selectedMonth, searchQuery, events]);
  
  // Format category for display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Format month for display
  const formatMonth = (month: string) => {
    const monthNames: Record<string, string> = {
      'stycznia': 'Styczeń',
      'lutego': 'Luty',
      'marca': 'Marzec',
      'kwietnia': 'Kwiecień',
      'maja': 'Maj',
      'czerwca': 'Czerwiec',
      'lipca': 'Lipiec',
      'sierpnia': 'Sierpień',
      'września': 'Wrzesień',
      'października': 'Październik',
      'listopada': 'Listopad',
      'grudnia': 'Grudzień'
    };
    
    return monthNames[month] || month;
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-bold mb-8">Wydarzenia w Radzyniu Podlaskim i Powiecie</h1>
      
      <section className="mb-12">
        <p className="text-lg mb-6">
          Poniżej znajduje się kalendarz nadchodzących wydarzeń w Radzyniu Podlaskim i powiecie radzyńskim. 
          Zapraszamy do aktywnego uczestnictwa w życiu kulturalnym, sportowym i społecznym naszego regionu.
        </p>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtruj wydarzenia</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Szukaj
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Szukaj wydarzenia..."
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category select */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Kategoria
              </label>
              <select
                id="category"
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Wszystkie kategorie</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>
                    {formatCategory(category)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Month select */}
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                Miesiąc
              </label>
              <select
                id="month"
                className="w-full p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                value={selectedMonth || ''}
                onChange={(e) => setSelectedMonth(e.target.value || null)}
              >
                <option value="">Wszystkie miesiące</option>
                {allMonths.map(month => (
                  <option key={month} value={month}>
                    {formatMonth(month)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Active filters display and clear button */}
          {(selectedCategory || selectedMonth || searchQuery) && (
            <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Aktywne filtry:</span> {' '}
                  {selectedCategory && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mr-2">
                      {formatCategory(selectedCategory)}
                    </span>
                  )}
                  {selectedMonth && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      {formatMonth(selectedMonth)}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Wyszukiwanie: "{searchQuery}"
                    </span>
                  )}
                </p>
              </div>
              <button
                className="text-sm text-gray-500 hover:text-primary transition"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedMonth(null);
                  setSearchQuery('');
                }}
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>

        {/* Results section */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
                category={event.category}
                imageUrl={event.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Nie znaleziono wydarzeń</h3>
            <p className="mt-1 text-gray-500">Zmień kryteria filtrowania, aby zobaczyć więcej wydarzeń.</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Organizujesz wydarzenie?</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">
            Jeśli organizujesz wydarzenie w Radzyniu Podlaskim lub powiecie radzyńskim i chcesz, aby pojawiło się w naszym kalendarzu,
            skontaktuj się z nami. Pomożemy Ci promować Twoje wydarzenie wśród mieszkańców regionu.
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Zgłoś wydarzenie
          </button>
        </div>
      </section>
    </div>
  );
}