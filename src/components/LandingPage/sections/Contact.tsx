import React from 'react';
import { Link } from '../../Link';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#6B0F6C] to-[#FF0A7B] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Comece sua jornada <span className="text-[#00FFFF]">hoje mesmo</span>
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Transforme seu site em uma experiência interativa e envolvente
          </p>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <p className="text-lg text-white/80">Empresas Confiam em Nós</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <p className="text-lg text-white/80">Avaliação Média dos Clientes</p>
              </div>
            </div>

            <div className="mt-8">
              <Link 
                href="/login?mode=register" 
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full bg-white text-[#6B0F6C] hover:bg-white/90 transition-colors duration-200 shadow-lg"
              >
                Começar Agora
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col items-center">
              <img 
                src="https://raw.githubusercontent.com/bcmed/brand/main/logo.png" 
                alt="BCMED" 
                className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg mb-4"
              />
              <blockquote className="text-lg text-white/90 italic max-w-2xl mb-4">
                "O Stry Live revolucionou a maneira como interagimos com nossos visitantes. As taxas de engajamento aumentaram em mais de 300% desde a implementação!"
              </blockquote>
              <cite className="text-white font-semibold">BCMED</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}