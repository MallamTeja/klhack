import { Link } from "react-router";
import { ArrowRight, FileText, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/10 via-[#FFCCBC]/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCCBC] rounded-full mb-8">
            <Zap className="size-4 text-[#8B4513]" />
            <span className="text-sm text-[#8B4513] font-medium">For Small Indian Businesses</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-[#8B4513] mb-6">
            Tax Filing That Feels
            <br />
            <span className="text-[#D2691E]">Effortless & Fun</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Automate monthly tax compliance for freelancers, shops & startups. 
            Save 90% time, ensure zero errors, stay audit-proof.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#8B4513] hover:bg-[#723A0F] text-white px-8 py-6 text-lg">
              <Link to="/onboarding">
                Get Started Free
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10 px-8 py-6 text-lg">
              <Link to="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-gray-600">
            ✓ No credit card required  ✓ Free tier available  ✓ Government-compliant
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#8B4513] mb-4">
            Turn Tax Dread Into "Done in Minutes"
          </h2>
          <p className="text-center text-gray-700 mb-16 max-w-2xl mx-auto">
            Built specifically for businesses with under ₹20 lakhs annual turnover
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 border-[#FFCCBC] hover:shadow-xl transition-shadow">
              <div className="bg-[#FFCCBC] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FileText className="size-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Magic Receipt Upload</h3>
              <p className="text-gray-700">
                Snap photos of receipts/PDFs. Instantly extract amounts, taxes, parties with AI precision.
              </p>
            </Card>

            <Card className="p-8 border-2 border-[#FFCCBC] hover:shadow-xl transition-shadow">
              <div className="bg-[#FFCCBC] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Zap className="size-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Auto-Generated Summaries</h3>
              <p className="text-gray-700">
                One-click filing-ready reports with input credit calculations. No manual work needed.
              </p>
            </Card>

            <Card className="p-8 border-2 border-[#FFCCBC] hover:shadow-xl transition-shadow">
              <div className="bg-[#FFCCBC] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="size-8 text-[#8B4513]" />
              </div>
              <h3 className="text-xl font-semibold text-[#8B4513] mb-3">Audit-Proof Records</h3>
              <p className="text-gray-700">
                Complete history tracking, deadline reminders, zero-error compliance guaranteed.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#8B4513] mb-16">
            Your Tax Journey in 4 Simple Steps
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Enter basic business details in 2 minutes" },
              { step: "2", title: "Upload", desc: "Batch upload receipt photos/PDFs" },
              { step: "3", title: "Review", desc: "Check auto-extracted summaries, edit if needed" },
              { step: "4", title: "Export", desc: "Download filing docs, submit with confidence" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-[#8B4513] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-[#8B4513] mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-[#8B4513] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Small Business Heroes</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <TrendingUp className="size-12 mx-auto mb-4 text-[#FFCCBC]" />
              <p className="text-4xl font-bold mb-2">90%</p>
              <p className="text-[#FFCCBC]">Time Saved</p>
            </div>
            <div>
              <Shield className="size-12 mx-auto mb-4 text-[#FFCCBC]" />
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-[#FFCCBC]">Accuracy Rate</p>
            </div>
            <div>
              <FileText className="size-12 mx-auto mb-4 text-[#FFCCBC]" />
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p className="text-[#FFCCBC]">Businesses Using</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-6">
            Ready to Make Tax Filing Delightful?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of small business owners who've eliminated tax stress
          </p>
          <Button asChild size="lg" className="bg-[#8B4513] hover:bg-[#723A0F] text-white px-12 py-6 text-lg">
            <Link to="/onboarding">
              Start Your Free Trial
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
