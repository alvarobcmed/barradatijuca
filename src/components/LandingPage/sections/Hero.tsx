import React, { useState } from 'react';
import { Link } from '../../Link';
import { StoryView } from '../../StoryViewer/StoryView';
import { useStoriesManager } from '../../../hooks/useStoriesManager';

export function Hero() {
  const { stories } = useStoriesManager();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const activeStories = React.useMemo(() => 
    stories.filter(story => story.status === 'active'),
    [stories]
  );

  const handleNext = () => {
    if (currentIndex < activeStories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        backgroundColor: '#6B0F6C',
        backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=2000&auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B0F6C]/90 to-[#FF0A7B]/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="text-white space-y-8 lg:col-span-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Revolucione o engajamento do seu site com o <span className="text-[#00FFFF]">Stry Live</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              Transforme visitantes em clientes fiéis com histórias envolventes que geram resultados reais.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/login?mode=register" 
                className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full bg-white text-[#6B0F6C] hover:bg-white/90 transition-colors duration-200"
              >
                Começar Agora
              </Link>

              {process.env.NODE_ENV === 'development' && (
                <Link 
                  href="/admin"
                  className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full bg-[#00FFFF]/20 text-white border-2 border-[#00FFFF] hover:bg-[#00FFFF]/30 transition-colors duration-200"
                >
                  Acessar Admin
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4 text-white/80">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces" alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=faces" alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=faces" alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=faces" alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
              </div>
              <div className="text-sm">
                <strong>+1000</strong> empresas já utilizam
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-2">
            <div className="relative w-full max-w-[300px] mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden">
              {activeStories.length > 0 && (
                <div className="absolute inset-0">
                  <StoryView
                    stories={activeStories}
                    currentIndex={currentIndex}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onClose={() => {}}
                    embedded
                    defaultMuted
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}