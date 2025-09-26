import AboutUsSection from '@/components/homepage/AboutUsSection';
import HeroSection from '@/components/homepage/HeroSection';
import JoinPivotaSection from '@/components/homepage/JoinPivotaSection';
import OpportunitiesSection from '@/components/homepage/OpportunitiesSection';


export default function HomePage() {
  return (
    
      <main className="min-h-screen bg-white text-gray-900">
        {/* Full width hero section */}
        <HeroSection />

        {/* Responsive container */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-[1600px] mx-auto">
          <OpportunitiesSection />
          <AboutUsSection />
          <JoinPivotaSection />
        </div>
      </main>
 
  );
}
