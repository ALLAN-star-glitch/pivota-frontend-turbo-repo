"use client";

import React from "react";
import Image from "next/image";

export default function AboutUsPage() {
  const services = [
    {
      title: "Employment",
      image: "/employment.jpg",
      description:
        "Connecting job seekers with verified employers and opportunities across Africa.",
    },
    {
      title: "Health",
      image: "/images/health.jpg",
      description:
        "Access licensed healthcare professionals and trusted medical services.",
    },
    {
      title: "Legal Aid",
      image: "/images/legal.jpg",
      description:
        "Get legal guidance, pro bono support, and justice assistance with verified experts.",
    },
    {
      title: "Education",
      image: "/images/education.jpg",
      description:
        "Empowering learning through skill-building, literacy, and job-readiness programs.",
    },
    {
      title: "Civic Engagement",
      image: "/images/civic.jpg",
      description:
        "Promoting transparency, governance, and citizen participation across communities.",
    },
    {
      title: "Emergency Response",
      image: "/images/emergency.jpg",
      description:
        "Delivering geo-tagged alerts, first responder coordination, and disaster safety tools.",
    },
    {
      title: "Vulnerable Support",
      image: "/images/support.jpg",
      description:
        "Supporting people living with disabilities, homeless, and street-connected individuals.",
    },
    {
      title: "Housing Solutions",
      image: "/images/housing.jpg",
      description:
        "Providing safe, verified housing listings and landlord transparency for everyone.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="/rural_africa.jpg"
          alt="Pivota Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#008080]/35"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
            Empowering Africa Through Connection
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            Pivota bridges individuals and organizations to verified life
            services—advancing opportunity, inclusion, and social impact across
            Africa.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Our Mission",
            text: "To connect individuals and organizations with meaningful opportunities that drive social impact, empowerment, and sustainable growth.",
          },
          {
            title: "Our Vision",
            text: "A connected Africa where technology bridges gaps, empowers communities, and ensures inclusive access to verified services for all.",
          },
          {
            title: "Our Values",
            text: "Integrity, Innovation, Collaboration, and Impact guide our journey toward social and economic transformation.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 p-8 text-center transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-2xl font-semibold text-[#008080] mb-4">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Pivota Ecosystem – Image Boxes */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            The Pivota Ecosystem
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our service ecosystem designed to connect individuals and
            organizations to verified, life-changing opportunities across Africa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative group h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#008080]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Pivota Matters */}
      <section className="bg-[#f9fdfd] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Why Pivota Matters
          </h2>
          <p className="text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Across Africa, millions lack access to verified essential services.
            Pivota bridges that gap by providing a trusted, inclusive, and
            socially responsible digital ecosystem that empowers communities and
            drives sustainable growth.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-700">
            <div>
              <h4 className="text-[#008080] font-semibold mb-2">
                Social Impact
              </h4>
              <p>Empowering vulnerable populations and promoting inclusion.</p>
            </div>
            <div>
              <h4 className="text-[#008080] font-semibold mb-2">
                Verified Access
              </h4>
              <p>Ensuring credibility and transparency for all listed services.</p>
            </div>
            <div>
              <h4 className="text-[#008080] font-semibold mb-2">
                Scalable Platform
              </h4>
              <p>Powered by modular microservices for efficiency and growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#008080] text-white py-16 px-6 text-center rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">Partner With Pivota</h2>
        <p className="max-w-2xl mx-auto mb-6 text-white/90">
          Join us in building Africa’s most trusted digital bridge between
          people, organizations, and essential life services.
        </p>
        <button className="bg-[#e07a5f] px-8 py-3 rounded-lg font-semibold hover:bg-[#cf674c] transition">
          Become a Partner
        </button>
      </section>
    </div>
  );
}
