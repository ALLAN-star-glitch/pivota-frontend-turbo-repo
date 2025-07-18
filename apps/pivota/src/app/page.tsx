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
        <link
          rel="canonical"
          href="https://pivota-frontend-turbo-repo-pivota.vercel.app/"
        />

        {/* Open Graph Meta */}
        <meta
          property="og:title"
          content="Pivota – Empowering Lives Across Africa"
        />
        <meta
          property="og:description"
          content="Explore verified jobs, housing, services, and social support across Africa on Pivota."
        />
        <meta
          property="og:url"
          content="https://pivota-frontend-turbo-repo-pivota.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://pivota-frontend-turbo-repo-pivota.vercel.app/_next/image?url=%2Fpivotalogo.png&w=256&q=75"
        />
        <meta property="og:site_name" content="Pivota" />

        {/* Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pivota – Life Made Simple in Africa"
        />
        <meta
          name="twitter:description"
          content="One African platform for jobs, homes, services, and community. Join Pivota today."
        />
        <meta
          name="twitter:image"
          content="https://pivota-frontend-turbo-repo-pivota.vercel.app/og-image.jpg"
        />
        <meta name="twitter:site" content="@pivota_africa" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://pivota-frontend-turbo-repo-pivota.vercel.app/",
              "name": "Pivota",
              "description":
                "Pivota connects Africans with opportunities in jobs, housing, services, and community-driven initiatives.",
              "publisher": {
                "@type": "Organization",
                "name": "Pivota",
                "url": "https://pivota-frontend-turbo-repo-pivota.vercel.app/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://pivota-frontend-turbo-repo-pivota.vercel.app/logo.png",
                  "width": 200,
                  "height": 60,
                },
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target":
                  "https://pivota-frontend-turbo-repo-pivota.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
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
