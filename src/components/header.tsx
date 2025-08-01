"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavLinks = [
  { label: "Admin", href: "/" },
  { label: "Create Test", href: "/tests" },
  { label: "All Tests", href: "/alltest" },
];

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-700">🛠️ Admin Panel</div>
        <nav className="space-x-4">
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
      </div>
    </header>
  );
}
