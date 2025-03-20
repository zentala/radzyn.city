import ContactForm from '@/components/ContactForm';
import PlaceholderImage from '@/components/PlaceholderImage';

export const metadata = {
  title: 'Kontakt - Radzyń Podlaski',
  description: 'Dane kontaktowe i formularze kontaktowe dla Urzędu Miasta Radzyń Podlaski, Starostwa Powiatowego i innych instytucji.',
};

export default function ContactPage() {
  const contactInfo = [
    {
      name: 'Urząd Miasta Radzyń Podlaski',
      address: 'ul. Warszawska 32, 21-300 Radzyń Podlaski',
      phone: '+48 83 351 24 00',
      email: 'sekretariat@radzyn-podl.pl',
      hours: 'Poniedziałek - Piątek: 7:30 - 15:30',
    },
    {
      name: 'Starostwo Powiatowe w Radzyniu Podlaskim',
      address: 'Pl. I. Potockiego 1, 21-300 Radzyń Podlaski',
      phone: '+48 83 351 85 00',
      email: 'sekretariat@powiatradzynski.pl',
      hours: 'Poniedziałek - Piątek: 7:30 - 15:30',
    },
    {
      name: 'Radzyński Ośrodek Kultury',
      address: 'ul. Jana Pawła II 4, 21-300 Radzyń Podlaski',
      phone: '+48 83 352 73 14',
      email: 'rok@radzyn.pl',
      hours: 'Poniedziałek - Piątek: 8:00 - 20:00, Sobota: 10:00 - 18:00',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Kontakt</h1>
      
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dane kontaktowe</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{info.name}</h3>
                  <div className="space-y-2">
                    <p className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{info.address}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </span>
                      <span>{info.phone}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </span>
                      <span>{info.email}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="inline-block mr-2 mt-1">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{info.hours}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Formularz kontaktowy</h2>
            <ContactForm />

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Mapa</h2>
              <div className="rounded-lg overflow-hidden h-80">
                <PlaceholderImage 
                  title="Mapa Radzynia Podlaskiego"
                  className="w-full h-full" 
                  height={320}
                  aspectRatio="landscape"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}