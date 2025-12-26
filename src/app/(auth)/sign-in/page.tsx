import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { SocialProviders } from "@/components/SocialProviders";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <div className="text-right lg:hidden">
        <span className="text-caption text-dark-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-dark-900 font-medium underline hover:no-underline"
          >
            Sign Up
          </Link>
        </span>
      </div>

      <div className="hidden lg:block text-right">
        <span className="text-caption text-dark-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-dark-900 font-medium underline hover:no-underline"
          >
            Sign Up
          </Link>
        </span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-heading-3 font-bold text-dark-900">Welcome Back!</h1>
        <p className="text-body text-dark-500">
          Sign in to continue your shopping journey
        </p>
      </div>

      <SocialProviders mode="sign-in" />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300" />
        </div>
        <div className="relative flex justify-center text-caption">
          <span className="bg-light-100 px-4 text-dark-500">Or sign in with</span>
        </div>
      </div>

      <AuthForm mode="sign-in" />
    </div>
  );
}
