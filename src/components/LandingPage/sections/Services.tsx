import React from 'react';

export function Services() {
  const services = [
    {
      title: 'Crie Stories Interativos',
      description: 'Desenvolva histórias envolventes com fotos, vídeos, enquetes e links clicáveis para aumentar o engajamento dos visitantes.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop'
    },
    {
      title: 'Personalize a Experiência',
      description: 'Adapte a aparência e o comportamento dos stories para combinar perfeitamente com a identidade da sua marca.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'
    },
    {
      title: 'Analise e Otimize',
      description: 'Acompanhe métricas importantes e otimize seu conteúdo para maximizar resultados e conversões.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Como <span className="text-[#FF0A7B]">Funciona</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transforme seu site em uma plataforma interativa com stories envolventes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 text-white z-20">
                  <span className="text-5xl font-bold opacity-50">{index + 1}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}