"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react if not installed

const adminNavLinks = [
  { label: "Admin", href: "/" },
  { label: "Create Test", href: "/tests" },
  { label: "All Tests", href: "/alltest" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-700">🛠️ Admin Panel</div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex space-x-4">
          {adminNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm px-4 py-2 rounded-md font-medium transition ${
                pathname === link.href
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <nav className="sm:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block text-sm px-4 py-2 rounded-md font-medium transition ${
                  pathname === link.href
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
