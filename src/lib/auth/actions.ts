"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { guest } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const GUEST_SESSION_COOKIE = "guest_session";
const GUEST_SESSION_EXPIRY_DAYS = 7;

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
  name: z.string().min(1, "Name is required").max(255, "Name is too long").optional(),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export type AuthActionResult = {
  success: boolean;
  error?: string;
  redirectTo?: string;
};

export async function signUp(input: SignUpInput): Promise<AuthActionResult> {
  const validation = signUpSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input",
    };
  }

  const { email, password, name } = validation.data;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: name || "",
      },
      headers: await getRequestHeaders(),
    });

    await mergeGuestCartWithUserCart();

    return {
      success: true,
      redirectTo: "/",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function signIn(input: SignInInput): Promise<AuthActionResult> {
  const validation = signInSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid input",
    };
  }

  const { email, password } = validation.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await getRequestHeaders(),
    });

    await mergeGuestCartWithUserCart();

    return {
      success: true,
      redirectTo: "/",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Invalid email or password";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function signOut(): Promise<AuthActionResult> {
  try {
    const headers = await getRequestHeaders();
    await auth.api.signOut({
      headers
    });

    return {
      success: true,
      redirectTo: "/",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to sign out";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getGuestSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get(GUEST_SESSION_COOKIE);
  return guestCookie?.value || null;
}

export async function createGuestSession(): Promise<string> {
  const cookieStore = await cookies();
  const existingSession = cookieStore.get(GUEST_SESSION_COOKIE);

  if (existingSession?.value) {
    const existingGuest = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, existingSession.value))
      .limit(1);

    if (existingGuest.length > 0 && new Date(existingGuest[0].expiresAt) > new Date()) {
      return existingSession.value;
    }
  }

  const sessionToken = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + GUEST_SESSION_EXPIRY_DAYS);

  await db.insert(guest).values({
    sessionToken,
    expiresAt,
  });

  cookieStore.set(GUEST_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });

  return sessionToken;
}

export async function mergeGuestCartWithUserCart(): Promise<void> {
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get(GUEST_SESSION_COOKIE);

  if (!guestCookie?.value) {
    return;
  }

  const guestSession = await db
    .select()
    .from(guest)
    .where(eq(guest.sessionToken, guestCookie.value))
    .limit(1);

  if (guestSession.length === 0) {
    cookieStore.delete(GUEST_SESSION_COOKIE);
    return;
  }

  // TODO: Implement cart migration logic when cart tables are added
  // This will involve:
  // 1. Getting the current authenticated user's ID
  // 2. Finding all cart items associated with the guest session
  // 3. Transferring those items to the user's cart
  // 4. Handling any conflicts (e.g., same product in both carts)

  await db.delete(guest).where(eq(guest.sessionToken, guestCookie.value));

  cookieStore.delete(GUEST_SESSION_COOKIE);
}

export async function requireAuth(redirectTo: string = "/sign-in"): Promise<void> {
  const session = await auth.api.getSession({
    headers: await getRequestHeaders(),
  });

  if (!session) {
    redirect(redirectTo);
  }
}

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await getRequestHeaders(),
    });
    return session;
  } catch {
    return null;
  }
}

async function getRequestHeaders(): Promise<Headers> {
  const cookieStore = await cookies();
  const headers = new Headers();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  headers.set("cookie", cookieString);
  return headers;
}

export async function checkoutGuard(): Promise<{ authenticated: boolean; redirectTo?: string }> {
  const session = await getSession();

  if (session) {
    return { authenticated: true };
  }

  return {
    authenticated: false,
    redirectTo: "/sign-in?callbackUrl=/checkout",
  };
}
