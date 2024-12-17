import React from 'react';

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              A melhor maneira de <span className="text-[#FF0A7B]">engajar seus clientes</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              O Stry Live oferece uma solução completa para aumentar o engajamento do seu site através de stories interativos. Nossa plataforma combina o melhor das redes sociais com análises avançadas para impulsionar seus resultados.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Stories interativos com enquetes',
                'Análises detalhadas de desempenho',
                'Personalização completa',
                'Integração com WhatsApp Business'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop"
              alt="Team collaboration"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#00FFFF]/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-8 -top-8 w-48 h-48 bg-[#FF0A7B]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}