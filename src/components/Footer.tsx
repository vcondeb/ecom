"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

const footerSections: FooterSection[] = [
  {
    title: "Featured",
    links: [
      { label: "Air Force 1", href: "/featured/air-force-1" },
      { label: "Huarache", href: "/featured/huarache" },
      { label: "Air Max 90", href: "/featured/air-max-90" },
      { label: "Air Max 95", href: "/featured/air-max-95" },
    ],
  },
  {
    title: "Shoes",
    links: [
      { label: "All Shoes", href: "/shoes" },
      { label: "Custom Shoes", href: "/shoes/custom" },
      { label: "Jordan Shoes", href: "/shoes/jordan" },
      { label: "Running Shoes", href: "/shoes/running" },
    ],
  },
  {
    title: "Clothing",
    links: [
      { label: "All Clothing", href: "/clothing" },
      { label: "Modest Wear", href: "/clothing/modest-wear" },
      { label: "Hoodies & Pullovers", href: "/clothing/hoodies-pullovers" },
      { label: "Shirts & Tops", href: "/clothing/shirts-tops" },
    ],
  },
  {
    title: "Kids'",
    links: [
      { label: "Infant & Toddler Shoes", href: "/kids/infant-toddler" },
      { label: "Kids' Shoes", href: "/kids/shoes" },
      { label: "Kids' Jordan Shoes", href: "/kids/jordan" },
      { label: "Kids' Basketball Shoes", href: "/kids/basketball" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { label: "X (Twitter)", href: "https://twitter.com/nike", icon: "/x.svg" },
  { label: "Facebook", href: "https://facebook.com/nike", icon: "/facebook.svg" },
  { label: "Instagram", href: "https://instagram.com/nike", icon: "/instagram.svg" },
];

const legalLinks: FooterLink[] = [
  { label: "Guides", href: "/guides" },
  { label: "Terms of Sale", href: "/terms-of-sale" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Nike Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-light-100">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Logo */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Home">
              <Image
                src="/logo.svg"
                alt="Nike"
                width={80}
                height={29}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="text-body font-body-medium text-light-100 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-caption text-dark-700 hover:text-light-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Social links */}
          <div className="lg:col-span-1">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-700 hover:border-light-100 transition-colors"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="invert"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-700">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Location and copyright */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-footnote text-dark-700">
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Croatia
              </span>
              <span>&copy; {currentYear} Nike, Inc. All Rights Reserved</span>
            </div>

            {/* Legal links */}
            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-footnote text-dark-700 hover:text-light-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
