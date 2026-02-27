import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowRight, Building2, User, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    turnover: "",
    businessType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // TODO: Save to MongoDB via MONGODB_URL
      // const response = await fetch('/api/onboarding', {
      //   method: 'POST',
      //   headers: {
      //   body: JSON.stringify(formData)
      // });
      localStorage.setItem("taxflow_user", JSON.stringify(formData));
      navigate("/dashboard");
    }
  };

  const progress = (step / 2) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 ring-1 ring-[#8B4513]/5 relative overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
            Welcome to TaxFlow!
          </h1>
          <p className="text-gray-700">Let's set up your account in 2 minutes</p>
        </div>

        <Progress value={progress} className="mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2">
                  <Building2 className="size-4 text-[#8B4513]" />
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="e.g., Sharma Electronics"
                  required
                  className="border-[#8B4513]/30 focus:border-[#8B4513]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName" className="flex items-center gap-2">
                  <User className="size-4 text-[#8B4513]" />
                  Owner Name
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                  placeholder="e.g., Rajesh Sharma"
                  required
                  className="border-[#8B4513]/30 focus:border-[#8B4513]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="size-4 text-[#8B4513]" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="rajesh@example.com"
                  required
                  className="border-[#8B4513]/30 focus:border-[#8B4513]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="size-4 text-[#8B4513]" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 98765 43210"
                  required
                  className="border-[#8B4513]/30 focus:border-[#8B4513]"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <select
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({ ...formData, businessType: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-[#8B4513]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                >
                  <option value="">Select type...</option>
                  <option value="freelancer">Freelancer/Solopreneur</option>
                  <option value="shop">Local Shop/Retail</option>
                  <option value="startup">Early Startup</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="turnover">Annual Turnover (₹)</Label>
                <Input
                  id="turnover"
                  value={formData.turnover}
                  onChange={(e) =>
                    setFormData({ ...formData, turnover: e.target.value })
                  }
                  placeholder="e.g., 15,00,000"
                  required
                  className="border-[#8B4513]/30 focus:border-[#8B4513]"
                />
                <p className="text-sm text-gray-600">
                  TaxFlow is optimized for businesses under ₹20 lakhs
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFCCBC]/40 to-[#FFCCBC]/10 backdrop-blur-sm rounded-xl p-5 border border-[#FFCCBC]/50 shadow-sm">
                <h3 className="font-semibold text-[#8B4513] mb-2">
                  What happens next?
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Instant dashboard with filing calendar</li>
                  <li>✓ Upload your first batch of receipts</li>
                  <li>✓ Get auto-generated tax summaries</li>
                  <li>✓ Export filing-ready documents</li>
                </ul>
              </div>
            </>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 border-[#8B4513] text-[#8B4513]"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 bg-[#8B4513] hover:bg-[#723A0F] text-white"
            >
              {step === 2 ? "Complete Setup" : "Continue"}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#8B4513] font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
