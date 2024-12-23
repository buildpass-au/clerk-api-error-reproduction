import { ClerkProvider } from "@clerk/nextjs";
import { HeaderLayout } from "./HeaderLayout";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <HeaderLayout />
      {children}
    </ClerkProvider>
  );
};
