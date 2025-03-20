export const metadata = {
  title: 'Wydarzenia - Radzyń Podlaski i Powiat Radzyński',
  description: 'Kalendarz nadchodzących wydarzeń w Radzyniu Podlaskim i powiecie radzyńskim. Imprezy kulturalne, sportowe i edukacyjne.',
};

export default function EventsPage() {
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

  // Group events by category
  const categories = [...new Set(events.map(event => event.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Wydarzenia w Radzyniu Podlaskim i Powiecie</h1>
      
      <section className="mb-12">
        <p className="text-lg mb-6">
          Poniżej znajduje się kalendarz nadchodzących wydarzeń w Radzyniu Podlaskim i powiecie radzyńskim. 
          Zapraszamy do aktywnego uczestnictwa w życiu kulturalnym, sportowym i społecznym naszego regionu.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <a key={category} href={`#${category}`} className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </a>
          ))}
        </div>

        {categories.map(category => (
          <div key={category} id={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events
                .filter(event => event.category === category)
                .map((event, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-primary font-medium mb-1">{event.date}</p>
                    <p className="text-gray-600 mb-3">
                      <span className="inline-block mr-2">
                        <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {event.location}
                    </p>
                    <p>{event.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Organizujesz wydarzenie?</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-4">
            Jeśli organizujesz wydarzenie w Radzyniu Podlaskim lub powiecie radzyńskim i chcesz, aby pojawiło się w naszym kalendarzu,
            skontaktuj się z nami. Pomożemy Ci promować Twoje wydarzenie wśród mieszkańców regionu.
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition">
            Zgłoś wydarzenie
          </button>
        </div>
      </section>
    </div>
  );
}