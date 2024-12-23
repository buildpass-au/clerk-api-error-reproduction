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
  // @ts-ignore
  const Layout = Component.getLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
