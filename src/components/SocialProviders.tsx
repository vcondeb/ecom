"use client";

import Image from "next/image";

interface SocialProvidersProps {
  mode: "sign-in" | "sign-up";
}

export function SocialProviders({ }: SocialProvidersProps) {
  const handleGoogleClick = () => {
  };

  const handleAppleClick = () => {
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleGoogleClick}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-light-300 rounded-full text-body font-medium text-dark-900 hover:bg-light-200 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2"
      >
        <Image
          src="/google.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
        Continue with Google
      </button>

      <button
        type="button"
        onClick={handleAppleClick}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-light-300 rounded-full text-body font-medium text-dark-900 hover:bg-light-200 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2"
      >
        <Image
          src="/apple.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden="true"
        />
        Continue with Apple
      </button>
    </div>
  );
}
