import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        localStorage.setItem("taxflow_user", JSON.stringify({ email: formData.email, businessName: "User" }));
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/10 ring-1 ring-[#8B4513]/5 relative overflow-hidden">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-700">Login to your TaxFlow account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <Button
                        type="submit"
                        className="w-full bg-[#8B4513] hover:bg-[#723A0F] text-white py-6"
                    >
                        Login
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/" className="text-[#8B4513] font-semibold hover:underline">
                        Sign up for free
                    </Link>
                </p>
            </Card>
        </div>
    );
}
