"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  cartCount?: number;
}

const navLinks: NavLink[] = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ cartCount = 0 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-light-100 border-b border-light-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="Nike"
              width={80}
              height={29}
              className="h-7 w-auto invert"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-900"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-body font-body-medium text-dark-900 hover:text-dark-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6 lg:items-center">
          <Link
            href="/search"
            className="text-body font-body-medium text-dark-900 hover:text-dark-700 transition-colors"
          >
            Search
          </Link>
          <Link
            href="/cart"
            className="text-body font-body-medium text-dark-900 hover:text-dark-700 transition-colors"
          >
            My Cart ({cartCount})
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="space-y-1 px-4 pb-4 pt-2 border-t border-light-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-body font-body-medium text-dark-900 hover:text-dark-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-light-300 pt-4 mt-4 space-y-2">
            <Link
              href="/search"
              className="block py-2 text-body font-body-medium text-dark-900 hover:text-dark-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/cart"
              className="block py-2 text-body font-body-medium text-dark-900 hover:text-dark-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Cart ({cartCount})
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
