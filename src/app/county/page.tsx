export const metadata = {
  title: 'Powiat Radzyński - Informacje',
  description: 'Informacje o powiecie radzyńskim, gminach, atrakcjach turystycznych i lokalnych inicjatywach.',
};

export default function CountyPage() {
  const countyDistricts = [
    {
      name: 'Gmina Radzyń Podlaski',
      description: 'Gmina wiejska otaczająca miasto Radzyń Podlaski.',
      population: 'ok. 8 000',
      attractions: 'Kościół pw. św. Anny w Ustrzeszy, rezerwat przyrody "Czapliniec"',
    },
    {
      name: 'Gmina Borki',
      description: 'Gmina położona w południowej części powiatu radzyńskiego.',
      population: 'ok. 6 000',
      attractions: 'Zespół pałacowo-parkowy w Woli Osowińskiej, Muzeum Regionalne w Woli Osowińskiej',
    },
    {
      name: 'Gmina Czemierniki',
      description: 'Gmina o charakterze rolniczym z bogatą historią.',
      population: 'ok. 4 500',
      attractions: 'Zespół pałacowy w Czemiernikach, Kościół pw. św. Stanisława',
    },
    {
      name: 'Gmina Kąkolewnica',
      description: 'Gmina położona w północno-wschodniej części powiatu.',
      population: 'ok. 8 000',
      attractions: 'Rezerwat przyrody "Kania", zabytki architektury drewnianej',
    },
    {
      name: 'Gmina Komarówka Podlaska',
      description: 'Gmina o charakterze rolniczym z bogatymi tradycjami.',
      population: 'ok. 4 500',
      attractions: 'Muzeum Ziemi Komarowskiej, Kościół pw. Najświętszego Serca Jezusowego',
    },
    {
      name: 'Gmina Ulan-Majorat',
      description: 'Gmina położona w zachodniej części powiatu.',
      population: 'ok. 6 000',
      attractions: 'Zespół dworsko-parkowy w Serokomli, rezerwat przyrody "Topór"',
    },
    {
      name: 'Gmina Wohyń',
      description: 'Gmina położona we wschodniej części powiatu.',
      population: 'ok. 7 000',
      attractions: 'Kościół pw. św. Anny w Wohyniu, zespół dworsko-parkowy w Bezwoli',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Powiat Radzyński</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">O Powiecie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Powiat radzyński to jednostka administracyjna położona w północnej części województwa lubelskiego. 
              Zajmuje powierzchnię około 965 km² i zamieszkuje go blisko 60 000 mieszkańców.
            </p>
            <p className="mb-4">
              W skład powiatu wchodzi miasto Radzyń Podlaski, będące siedzibą władz powiatowych, oraz siedem gmin wiejskich. 
              Region ma charakter głównie rolniczy, z licznymi obszarami przyrodniczymi wartymi odwiedzenia.
            </p>
            <p>
              Powiat radzyński łączy bogate dziedzictwo kulturowe z potencjałem gospodarczym i turystycznym, 
              oferując zarówno mieszkańcom jak i turystom wiele możliwości rekreacji i wypoczynku.
            </p>
          </div>
          <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
            [Mapa powiatu radzyńskiego]
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Gminy Powiatu Radzyńskiego</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {countyDistricts.map((district, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2">{district.name}</h3>
              <p className="text-gray-600 mb-2">{district.description}</p>
              <p className="mb-1"><span className="font-medium">Liczba mieszkańców:</span> {district.population}</p>
              <p><span className="font-medium">Atrakcje:</span> {district.attractions}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Turystyka w Powiecie</h2>
        <p className="mb-4">
          Powiat radzyński oferuje wiele atrakcji dla miłośników turystyki aktywnej, kulturowej i przyrodniczej. 
          Region słynie z malowniczych krajobrazów, zabytków architektury oraz gościnności mieszkańców.
        </p>
        <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
          <h3 className="text-xl font-semibold mb-3">Szlaki turystyczne</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Szlak Ziemi Radzyńskiej - prowadzi przez najciekawsze zabytki i atrakcje przyrodnicze powiatu</li>
            <li>Szlak Rezerwatów Przyrody - łączy najcenniejsze obszary chronione regionu</li>
            <li>Rowerowy Szlak Doliny Tyśmienicy - idealna trasa dla miłośników dwóch kółek</li>
            <li>Szlak Dworów i Pałaców - prezentuje bogactwo architektury rezydencjonalnej regionu</li>
          </ul>
        </div>
      </section>
    </div>
  );
}