import { Check, Zap, TrendingUp, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for tiny volumes",
      icon: Zap,
      color: "gray",
      features: [
        "Up to 20 receipts/month",
        "Basic summaries",
        "PDF export",
        "Email support",
        "Government-compliant",
      ],
      limitations: [
        "No email reminders",
        "No custom reports",
        "Single business only",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹99",
      period: "/month",
      description: "For growing businesses",
      icon: TrendingUp,
      color: "primary",
      features: [
        "Unlimited receipts",
        "Full summaries & reports",
        "All export formats",
        "Email reminders",
        "Priority email support",
        "Custom categories",
        "Advanced analytics",
        "Quarterly reports",
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹499",
      period: "/month",
      description: "For multiple businesses",
      icon: Crown,
      color: "accent",
      features: [
        "Everything in Pro",
        "Multi-business support (up to 5)",
        "Custom branded reports",
        "Dedicated account manager",
        "Priority phone support",
        "API access",
        "Advanced integrations",
        "Audit assistance",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const addOns = [
    {
      name: "One-time Onboarding",
      price: "₹499",
      description: "Personal setup call with tax expert + data migration",
    },
    {
      name: "Advanced Calculations",
      price: "₹29/month",
      description: "TDS, depreciation, and complex input credit matching",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#8B4513] mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          Choose the plan that fits your business needs
        </p>
        <p className="text-sm text-gray-600">
          All plans include government-compliant tax filing support
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-8 relative ${
              plan.popular
                ? "border-4 border-[#8B4513] shadow-2xl scale-105"
                : "border-2 border-[#FFCCBC]"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B4513] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}

            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  plan.popular
                    ? "bg-[#8B4513]"
                    : "bg-[#FFCCBC]"
                }`}
              >
                <plan.icon
                  className={`size-8 ${
                    plan.popular ? "text-white" : "text-[#8B4513]"
                  }`}
                />
              </div>
              <h2 className="text-2xl font-bold text-[#8B4513] mb-2">
                {plan.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-bold text-[#8B4513]">
                  {plan.price}
                </span>
                <span className="text-gray-600 mb-2">{plan.period}</span>
              </div>
            </div>

            <Button
              className={`w-full mb-6 ${
                plan.popular
                  ? "bg-[#8B4513] hover:bg-[#723A0F] text-white"
                  : "bg-white border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#FFCCBC]/20"
              }`}
            >
              {plan.cta}
            </Button>

            <div className="space-y-3">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Add-ons */}
      <Card className="p-8 mb-12 bg-gradient-to-r from-[#FFCCBC]/30 to-[#FFCCBC]/10 border-2 border-[#FFCCBC]">
        <h2 className="text-2xl font-bold text-[#8B4513] mb-6 text-center">
          Optional Add-ons
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {addOns.map((addOn, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg border-2 border-[#FFCCBC]">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#8B4513]">{addOn.name}</h3>
                <span className="text-xl font-bold text-[#8B4513]">
                  {addOn.price}
                </span>
              </div>
              <p className="text-sm text-gray-700">{addOn.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue Projections */}
      <Card className="p-8 bg-[#8B4513] text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Our Growth Journey
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[#FFCCBC] mb-2">Year 1 Target</p>
            <p className="text-3xl font-bold mb-1">1,000</p>
            <p className="text-sm text-[#FFCCBC]">Active Users</p>
          </div>
          <div>
            <p className="text-[#FFCCBC] mb-2">Monthly Recurring Revenue</p>
            <p className="text-3xl font-bold mb-1">₹5 Lakhs</p>
            <p className="text-sm text-[#FFCCBC]">Projected by Q4 2026</p>
          </div>
          <div>
            <p className="text-[#FFCCBC] mb-2">Customer Satisfaction</p>
            <p className="text-3xl font-bold mb-1">95%+</p>
            <p className="text-sm text-[#FFCCBC]">Target Rating</p>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-[#8B4513] text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-2 border-[#FFCCBC]">
            <h3 className="font-semibold text-[#8B4513] mb-2">
              Can I switch plans anytime?
            </h3>
            <p className="text-gray-700 text-sm">
              Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </Card>

          <Card className="p-6 border-2 border-[#FFCCBC]">
            <h3 className="font-semibold text-[#8B4513] mb-2">
              Is my data secure?
            </h3>
            <p className="text-gray-700 text-sm">
              Absolutely. We use bank-grade encryption and never share your data with third parties.
            </p>
          </Card>

          <Card className="p-6 border-2 border-[#FFCCBC]">
            <h3 className="font-semibold text-[#8B4513] mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-700 text-sm">
              We accept UPI, credit/debit cards, net banking, and digital wallets.
            </p>
          </Card>

          <Card className="p-6 border-2 border-[#FFCCBC]">
            <h3 className="font-semibold text-[#8B4513] mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-700 text-sm">
              Yes, we offer a 14-day money-back guarantee for all paid plans.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
