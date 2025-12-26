"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const taglines = [
  {
    title: "Just Do It",
    description:
      "Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.",
  },
  {
    title: "Run Your World",
    description:
      "Every step you take brings you closer to your goals. Start your journey with Nike today.",
  },
  {
    title: "Unleash Your Potential",
    description:
      "From the track to the streets, Nike gear is designed to help you perform at your best.",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-dark-900 flex-col justify-between p-12">
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Nike"
            width={80}
            height={29}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <div className="space-y-6">
          <h1 className="text-heading-2 font-bold text-light-100">
            {taglines[currentTagline].title}
          </h1>
          <p className="text-lead text-dark-500 max-w-md">
            {taglines[currentTagline].description}
          </p>

          <div className="flex gap-2">
            {taglines.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTagline(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTagline ? "bg-light-100" : "bg-dark-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-footnote text-dark-700">
          &copy; {new Date().getFullYear()} Nike. All rights reserved.
        </p>
      </div>

      <div className="w-full lg:w-1/2 bg-light-100 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
