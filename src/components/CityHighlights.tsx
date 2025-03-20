import PlaceholderImage from './PlaceholderImage';

export default function CityHighlights() {
  const highlights = [
    {
      title: 'Pałac Potockich',
      description: 'Barokowy pałac z XVIII wieku, jeden z najpiękniejszych zabytków regionu.',
      imageUrl: undefined, // Will use placeholder until real image is provided
    },
    {
      title: 'Kościół Świętej Trójcy',
      description: 'Zabytkowy kościół z bogato zdobionym wnętrzem i historią sięgającą XVII wieku.',
      imageUrl: undefined,
    },
    {
      title: 'Park Miejski',
      description: 'Miejsce rekreacji z malowniczymi alejkami, stawem i bogatą roślinnością.',
      imageUrl: undefined,
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Odkryj Radzyń Podlaski</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
            <PlaceholderImage 
              title={item.title}
              src={item.imageUrl}
              className="w-full h-48"
              height={192}
              aspectRatio="landscape"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}