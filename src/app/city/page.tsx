import PlaceholderImage from '@/components/PlaceholderImage';

export const metadata = {
  title: 'O Mieście - Radzyń Podlaski',
  description: 'Informacje o mieście Radzyń Podlaski, jego historii, atrakcjach i miejscach wartych odwiedzenia.',
};

export default function CityPage() {
  const attractions = [
    {
      title: 'Pałac Potockich',
      description: 'Barokowy pałac z XVIII wieku, zaprojektowany przez Jakuba Fontanę, z bogatymi zdobieniami i otaczającym parkiem.',
    },
    {
      title: 'Kościół Świętej Trójcy',
      description: 'Zabytkowy kościół parafialny z XVII wieku, z bogatym wyposażeniem wnętrza i charakterystyczną architekturą.',
    },
    {
      title: 'Oranżeria',
      description: 'Historyczny budynek oranżerii, część kompleksu pałacowego, obecnie siedziba Radzyńskiego Ośrodka Kultury.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">O Mieście Radzyń Podlaski</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Historia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Radzyń Podlaski to miasto o bogatej historii sięgającej XIV wieku. Pierwsze wzmianki o miejscowości pochodzą z 1468 roku. 
              Przez wieki miasto znajdowało się pod wpływem różnych rodów szlacheckich, w tym Mniszchów i Potockich.
            </p>
            <p>
              Szczególny rozkwit miasta nastąpił w XVIII wieku za czasów Eustachego Potockiego, który zlecił budowę wspaniałego 
              barokowego pałacu, będącego dziś główną atrakcją turystyczną miasta.
            </p>
          </div>
          <div className="h-64">
            <PlaceholderImage 
              title="Historia Radzynia Podlaskiego"
              className="w-full h-full rounded-lg"
              height={256}
              aspectRatio="landscape"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Położenie i geografia</h2>
        <p className="mb-4">
          Radzyń Podlaski położony jest w północnej części województwa lubelskiego, na Równinie Łukowskiej, będącej częścią Niziny 
          Południowopodlaskiej. Przez miasto przepływa rzeka Białka, dopływ Tyśmienicy.
        </p>
        <p>
          Miasto zajmuje powierzchnię około 19 km² i jest otoczone malowniczymi terenami rolniczymi i leśnymi, 
          charakterystycznymi dla Podlasia.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Atrakcje turystyczne</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <PlaceholderImage 
                title={attraction.title}
                className="w-full h-48" 
                height={192}
                aspectRatio="landscape"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{attraction.title}</h3>
                <p className="text-gray-600">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}