
import AboutUsSection from '@/components/homepage/AboutUsSection';
import HeroSection from '@/components/homepage/HeroSection';
import JoinPivotaSection from '@/components/homepage/JoinPivotaSection';
import OpportunitiesSection from '@/components/homepage/OpportunitiesSection';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Pivota – Jobs, Housing, Services & Community in Africa</title>
        <meta
          name="description"
          content="Pivota connects Africans with verified jobs, housing, services and community support—all in one platform."
        />
        <link rel="canonical" href="https://www.pivota.africa/" />
        <meta property="og:title" content="Pivota – Life Made Simple in Africa" />
        <meta property="og:description" content="Discover jobs, housing, services & support on a trusted African platform." />
        <meta property="og:url" content="https://www.pivota.africa/" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.pivota.africa/",
              "name": "Pivota",
              "description": "Jobs, housing, services & community support platform for Africa."
            }),
          }}
        />
      </Head>
      <main className="min-h-screen bg-white text-gray-900">
        <HeroSection />
        <OpportunitiesSection />
        <AboutUsSection />
        <JoinPivotaSection />
      </main>
    </>
  );
}
