import React, { Suspense } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { ScrollPercentage } from './components/ScrollPercentage';
import { useScripts } from './hooks/useScripts';
import { StoriesPreview } from '../StoriesPreview/StoriesPreview';
import { StoryView } from '../StoryViewer/StoryView';
import { useStoriesState } from '../../hooks/useStoriesState';
import { useAdminSettingsContext } from '../../contexts/AdminSettingsContext';
import { useStoriesManager } from '../../hooks/useStoriesManager';

// Lazy load sections
const Services = React.lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const About = React.lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Features = React.lazy(() => import('./sections/Features').then(m => ({ default: m.Features })));
const BenefitsSection = React.lazy(() => import('./sections/Benefits/BenefitsSection').then(m => ({ default: m.BenefitsSection })));
const Pricing = React.lazy(() => import('./sections/Pricing').then(m => ({ default: m.Pricing })));
const FAQ = React.lazy(() => import('./sections/FAQ').then(m => ({ default: m.FAQ })));
const Contact = React.lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));
const Footer = React.lazy(() => import('./sections/Footer').then(m => ({ default: m.Footer })));

const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export function LandingPage() {
  // Initialize scripts
  useScripts();

  // Stories state management
  const { settings } = useAdminSettingsContext();
  const { stories } = useStoriesManager();
  const {
    selectedStories,
    currentIndex,
    handleStoryClick,
    handleClose,
    handleNext,
    handlePrevious
  } = useStoriesState();

  const activeStories = React.useMemo(() => 
    stories.filter(story => story.status !== 'archived'),
    [stories]
  );

  const companyStories = React.useMemo(() => ({
    companyId: '1',
    companyName: settings.companyInfo.name || 'Nome da Empresa',
    companyLogo: settings.companyInfo.logo || 'https://via.placeholder.com/150',
    stories: activeStories
  }), [settings.companyInfo, activeStories]);

  // Add body class
  React.useEffect(() => {
    document.body.classList.add('three');
    return () => {
      document.body.classList.remove('three');
    };
  }, []);

  return (
    <>
      {/* Critical path rendering */}
      <Header />
      <Hero />

      {/* Lazy loaded sections */}
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BenefitsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>

      <ScrollPercentage />

      {/* Stories Integration */}
      {activeStories.length > 0 && (
        <>
          <StoriesPreview
            companyStories={companyStories}
            onStoryClick={() => handleStoryClick(activeStories)}
            position={settings.previewPosition}
            size={settings.previewSize}
            autoPlay={settings.autoPlayPreview}
          />

          {selectedStories && (
            <StoryView
              stories={selectedStories}
              currentIndex={currentIndex}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onClose={handleClose}
            />
          )}
        </>
      )}
    </>
  );
}