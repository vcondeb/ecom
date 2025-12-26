import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { SocialProviders } from "@/components/SocialProviders";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <div className="text-center lg:hidden">
        <span className="text-caption text-dark-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-dark-900 font-medium underline hover:no-underline"
          >
            Sign In
          </Link>
        </span>
      </div>

      <div className="hidden lg:block text-center">
        <span className="text-caption text-dark-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-dark-900 font-medium underline hover:no-underline"
          >
            Sign In
          </Link>
        </span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-heading-3 font-bold text-dark-900">Join Nike Today!</h1>
        <p className="text-body text-dark-500">
          Create your account to start your fitness journey
        </p>
      </div>

      <SocialProviders mode="sign-up" />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300" />
        </div>
        <div className="relative flex justify-center text-caption">
          <span className="bg-light-100 px-4 text-dark-500">Or sign up with</span>
        </div>
      </div>

      <AuthForm mode="sign-up" />
    </div>
  );
}
