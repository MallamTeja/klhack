import { Outlet, Link, useLocation } from "react-router";
import { FileText, Home, Upload, History, Menu, X, User } from "lucide-react";
import { useState } from "react";

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide nav on registration and login pages
  const hideNav = location.pathname === "/" || location.pathname === "/login";

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/upload", icon: Upload, label: "Upload" },
    { path: "/history", icon: History, label: "History" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-peach-50">
      {!hideNav && (
        <nav className="bg-[#8B4513] text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/dashboard" className="flex items-center gap-2">
                <FileText className="size-8" />
                <span className="text-xl font-semibold">TaxFlow</span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${location.pathname === item.path
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                      }`}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-white/20">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                      }`}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
}
