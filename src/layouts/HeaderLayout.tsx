import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const HeaderLayout = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};
