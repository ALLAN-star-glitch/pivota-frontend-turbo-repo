/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { SegmentedControl, Card, Text, Title, List } from "@mantine/core";

type BillingPeriod = "monthly" | "quarterly" | "halfyearly" | "annually";

interface Plan {
  name: string;
  price: string;
  gradient: string;
  textColor?: string;
  features: string[];
  popular?: boolean;
  discount?: string;
}

const kesToUsd = (kes: number) => (kes / 150).toFixed(2);

const getAdaptivePriceColor = (planName: string) => {
  switch (planName) {
    case "Free":
      return "text-teal-700";
    case "Bronze":
      return "text-amber-300";
    case "Silver":
      return "text-teal-900";
    case "Gold":
      return "text-amber-200";
    default:
      return "text-gray-900";
  }
};

const plans: Record<BillingPeriod, Plan[]> = {
  monthly: [
    {
      name: "Free",
      price: "0",
      gradient: "from-gray-50 via-white to-gray-200",
      textColor: "text-gray-800",
      features: ["Basic access", "Post limited listings", "Community support"],
    },
    {
      name: "Bronze",
      price: "500",
      gradient: "from-[#006666] via-[#008080] to-[#00b3b3]",
      textColor: "text-white",
      features: ["Unlimited listings", "Standard visibility", "Basic analytics"],
    },
    {
      name: "Silver",
      price: "1200",
      gradient: "from-[#ffb300] via-[#ffc107] to-[#ffe066]",
      textColor: "text-gray-900",
      features: ["Featured listings", "Priority placement", "Advanced analytics"],
      popular: true,
    },
    {
      name: "Gold",
      price: "2500",
      gradient: "from-[#d95f4c] via-[#e07a5f] to-[#f39c82]",
      textColor: "text-white",
      features: ["Premium visibility", "Recruitment tools", "Access to courses"],
    },
  ],
  quarterly: [
    {
      name: "Free",
      price: "0",
      gradient: "from-gray-50 via-white to-gray-200",
      textColor: "text-gray-800",
      features: ["Basic access", "Post limited listings", "Community support"],
    },
    {
      name: "Bronze",
      price: "1400",
      gradient: "from-[#006666] via-[#008080] to-[#00b3b3]",
      textColor: "text-white",
      features: ["Unlimited listings", "Standard visibility", "Basic analytics"],
      discount: "Save 7%",
    },
    {
      name: "Silver",
      price: "3400",
      gradient: "from-[#ffb300] via-[#ffc107] to-[#ffe066]",
      textColor: "text-gray-900",
      features: ["Featured listings", "Priority placement", "Advanced analytics"],
      popular: true,
      discount: "Save 6%",
    },
    {
      name: "Gold",
      price: "7000",
      gradient: "from-[#d95f4c] via-[#e07a5f] to-[#f39c82]",
      textColor: "text-white",
      features: ["Premium visibility", "Recruitment tools", "Access to courses"],
      discount: "Save 7%",
    },
  ],
  halfyearly: [
    {
      name: "Free",
      price: "0",
      gradient: "from-gray-50 via-white to-gray-200",
      textColor: "text-gray-800",
      features: ["Basic access", "Post limited listings", "Community support"],
    },
    {
      name: "Bronze",
      price: "2700",
      gradient: "from-[#006666] via-[#008080] to-[#00b3b3]",
      textColor: "text-white",
      features: ["Unlimited listings", "Standard visibility", "Basic analytics"],
      discount: "Save 10%",
    },
    {
      name: "Silver",
      price: "6600",
      gradient: "from-[#ffb300] via-[#ffc107] to-[#ffe066]",
      textColor: "text-gray-900",
      features: ["Featured listings", "Priority placement", "Advanced analytics"],
      popular: true,
      discount: "Save 8%",
    },
    {
      name: "Gold",
      price: "13500",
      gradient: "from-[#d95f4c] via-[#e07a5f] to-[#f39c82]",
      textColor: "text-white",
      features: ["Premium visibility", "Recruitment tools", "Access to courses"],
      discount: "Save 10%",
    },
  ],
  annually: [
    {
      name: "Free",
      price: "0",
      gradient: "from-gray-50 via-white to-gray-200",
      textColor: "text-gray-800",
      features: ["Basic access", "Post limited listings", "Community support"],
    },
    {
      name: "Bronze",
      price: "5200",
      gradient: "from-[#006666] via-[#008080] to-[#00b3b3]",
      textColor: "text-white",
      features: ["Unlimited listings", "Standard visibility", "Basic analytics"],
      discount: "Save 13%",
    },
    {
      name: "Silver",
      price: "12600",
      gradient: "from-[#ffb300] via-[#ffc107] to-[#ffe066]",
      textColor: "text-gray-900",
      features: ["Featured listings", "Priority placement", "Advanced analytics"],
      popular: true,
      discount: "Save 12%",
    },
    {
      name: "Gold",
      price: "25500",
      gradient: "from-[#d95f4c] via-[#e07a5f] to-[#f39c82]",
      textColor: "text-white",
      features: ["Premium visibility", "Recruitment tools", "Access to courses"],
      discount: "Save 15%",
    },
  ],
};

export default function PricingPage() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [showFilter, setShowFilter] = useState(true);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!pricingRef.current) return;

      const rect = pricingRef.current.getBoundingClientRect();

      // Check if pricing section bottom is above viewport bottom
      if (rect.bottom <= window.innerHeight) {
        setShowFilter(false);
      } else {
        setShowFilter(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main ref={pricingRef} className="max-w-screen-xl mx-auto px-4 pb-32 pt-16">
      {/* Header */}
      <div className="text-center mb-12">
        <Title order={1} className="text-4xl font-bold mb-4 text-[#008080]">
          Pivota Pricing Plans
        </Title>
        <Text size="lg" className="text-gray-600">
          Choose the right plan for individuals, organizations, or enterprises.
        </Text>
      </div>

      {/* Mobile Floating Filter (visible only within pricing page) */}
      {showFilter && (
        <div className="block md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] transition-all duration-500">
          <Card
            shadow="lg"
            radius="xl"
            padding="sm"
            className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg"
          >
            <div className="flex overflow-x-auto no-scrollbar space-x-2">
              <SegmentedControl
                value={period}
                onChange={(value) => setPeriod(value as BillingPeriod)}
                data={[
                  { label: "Monthly", value: "monthly" },
                  { label: "Quarterly", value: "quarterly" },
                  { label: "Half-Yearly", value: "halfyearly" },
                  { label: "Annually", value: "annually" },
                ]}
                size="sm"
                radius="xl"
                transitionDuration={200}
                className="min-w-max"
                styles={{
                  label: {
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                  },
                  indicator: {
                    backgroundColor: "#f59e0b",
                    borderRadius: "9999px",
                  },
                }}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden md:flex justify-center mb-10">
        <SegmentedControl
          value={period}
          onChange={(value) => setPeriod(value as BillingPeriod)}
          data={[
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Half-Yearly", value: "halfyearly" },
            { label: "Annually", value: "annually" },
          ]}
          size="md"
          radius="xl"
          transitionDuration={200}
          className="bg-gray-50 p-2 rounded-full shadow-inner"
          styles={{
            label: { fontWeight: 600, fontSize: "0.9rem" },
            indicator: { backgroundColor: "#f59e0b", borderRadius: "9999px" },
          }}
        />
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {plans[period].map((plan) => {
          const kes = parseInt(plan.price, 10);
          const usd = kesToUsd(kes);

          return (
            <Card
              key={plan.name}
              shadow="xl"
              padding="xl"
              radius="lg"
              className={`relative bg-gradient-to-br ${plan.gradient} hover:scale-105 hover:shadow-2xl transform transition ${
                plan.name === "Free"
                  ? "border-2 border-teal-500 shadow-md"
                  : "border border-transparent"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-2 left-1/2 transform -translate-x-1/2 shadow-md rounded-full px-4 py-1 text-sm font-semibold bg-amber-500 text-white whitespace-nowrap">
                  ⭐ Most Popular
                </span>
              )}

              {plan.discount && (
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                  {plan.discount}
                </div>
              )}

              <div className={`${plan.textColor}`}>
                <Title
                  order={3}
                  className={`text-xl font-semibold mb-2 ${
                    plan.name === "Free" ? "italic" : ""
                  }`}
                >
                  {plan.name}
                </Title>

                <div className="flex flex-col items-center mb-6">
                  <span
                    className={`text-3xl font-extrabold drop-shadow-md ${getAdaptivePriceColor(
                      plan.name
                    )}`}
                  >
                    ${usd} USD
                  </span>
                  <span
                    className={`text-sm font-medium mt-1 ${getAdaptivePriceColor(
                      plan.name
                    )} opacity-70`}
                  >
                    ≈ KSh {kes.toLocaleString()}
                  </span>
                </div>

                <List spacing="sm" size="sm" className="mb-6">
                  {plan.features.map((feature, i) => (
                    <List.Item key={i}>{feature}</List.Item>
                  ))}
                </List>

                <button
                  className={`w-full rounded-full cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-5 text-lg shadow-md transition mt-3 ${
                    plan.name === "Free"
                      ? "border border-teal-600 hover:shadow-lg"
                      : ""
                  }`}
                >
                  {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* IntaSend Secure Payment */}
      <div className="mt-16 text-center">
        <a
          href="https://intasend.com/security"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-with-mpesa-hr-light.png"
            width="375px"
            alt="IntaSend Secure Payments"
            className="mx-auto"
          />
        </a>
        <strong>
          <a
            href="https://intasend.com/security"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[#454545] text-sm mt-2"
          >
            Secured by IntaSend Payments
          </a>
        </strong>
      </div>
    </main>
  );
}
