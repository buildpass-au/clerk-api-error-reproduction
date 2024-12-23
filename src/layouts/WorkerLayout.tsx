import { ClerkProvider } from "@clerk/nextjs";
import { HeaderLayout } from "./HeaderLayout";

export const WorkerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_WORKER_PUBLISHABLE_KEY}
    >
      <HeaderLayout />
      {children}
    </ClerkProvider>
  );
};
