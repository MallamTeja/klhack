import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowRight, Building2, User, Mail, Phone, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

export function Onboarding() {
  const navigate = useNavigate();
  // only one step now
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // single page onboarding, save and redirect
    localStorage.setItem("taxflow_user", JSON.stringify(formData));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 ring-1 ring-[#8B4513]/5 relative overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
            Welcome to TaxFlow!
          </h1>
          <p className="text-gray-700">Let's set up your account in 2 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="size-4 text-[#8B4513]" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                required
                className="border-[#8B4513]/30 focus:border-[#8B4513]"
              />
            </div>
          </>


          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-[#8B4513] hover:bg-[#723A0F] text-white"
            >
              Submit
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