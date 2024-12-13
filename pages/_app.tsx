import "@/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * We add the publicApiKey to the ClerkProvider because we use two ClerkProviders in our app (different layouts and pages) - one for main users and one for visitors.
   * This serves as a workaround to prevent the ClerkProvider from automatically loading the main user's publicApiKey from the .env file,
   * allowing us to use the visitor's publicApiKey instead.
   *
   * @Note Please use Clerk Development Environment to test this app.
   */

  return (
    <ClerkProvider
      publicApiKey={process.env.NEXT_PUBLIC_CLERK_VISITOR_PUBLISHABLE_KEY}
      {...pageProps}
    >
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
