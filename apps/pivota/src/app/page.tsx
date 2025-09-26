import AboutUsSection from '@/components/homepage/AboutUsSection';
import HeroSection from '@/components/homepage/HeroSection';
import JoinPivotaSection from '@/components/homepage/JoinPivotaSection';
import OpportunitiesSection from '@/components/homepage/OpportunitiesSection';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title key="title">Pivota – Find Jobs, Homes & Services Across Africa</title>
        <meta
          key="description"
          name="description"
          content="Pivota is Africa's trusted digital platform for finding jobs, housing, skilled service providers, and community support — all in one place."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pivotaconnect.com/" />

        {/* Open Graph Meta */}
        <meta
          property="og:title"
          content="Pivota – Empowering Lives Across Africa"
        />
        <meta
          property="og:description"
          content="Explore verified jobs, housing, services, and social support across Africa on Pivota."
        />
        <meta property="og:url" content="https://pivotaconnect.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://pivotaconnect.com/_next/image?url=%2Fpivotalogo.png&w=256&q=75"
        />
        <meta property="og:site_name" content="Pivota" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://pivotaconnect.com/",
              "name": "Pivota",
              "description":
                "Pivota connects Africans with opportunities in jobs, housing, services, and community-driven initiatives.",
              "publisher": {
                "@type": "Organization",
                "name": "Pivota",
                "url": "https://pivotaconnect.com/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://pivotaconnect.com/logo.png",
                  "width": 200,
                  "height": 60,
                },
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://pivotaconnect.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

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
    </>
  );
}
