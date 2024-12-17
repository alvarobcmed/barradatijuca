import React, { useState, useEffect } from 'react';
import { Link } from '../../Link';
import { Logo } from '../../Logo/Logo';

export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      } py-2`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex-shrink-0">
            <Logo variant={isScrolled ? 'dark' : 'light'} size="lg" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { id: 'services', label: 'Como Funciona' },
              { id: 'about', label: 'Recursos' },
              { id: 'features', label: 'Vantagens' },
              { id: 'pricing', label: 'Preços' },
              { id: 'faq', label: 'FAQ' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-base font-medium transition-colors duration-300 ${
                  isSticky 
                    ? 'text-gray-700 hover:text-[#6B0F6C]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={`hidden md:inline-flex px-6 py-3 text-base font-medium rounded-full transition-colors duration-300 ${
                isSticky
                  ? 'text-gray-700 hover:text-[#6B0F6C]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Login
            </Link>
            <Link
              href="/login?mode=register"
              className={`px-6 py-3 text-base font-medium rounded-full transition-all duration-300 ${
                isSticky
                  ? 'bg-gradient-to-r from-[#6B0F6C] to-[#FF0A7B] text-white hover:opacity-90'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Teste Grátis
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}