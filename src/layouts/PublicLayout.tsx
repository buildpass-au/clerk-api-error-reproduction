import { ClerkProvider } from "@clerk/nextjs";
import { HeaderLayout } from "./HeaderLayout";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLIC_PUBLISHABLE_KEY}
    >
      <HeaderLayout />
      {children}
    </ClerkProvider>
  );
};
