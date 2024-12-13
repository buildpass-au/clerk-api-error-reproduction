import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";

export default function Page() {
  const { isLoaded, getToken } = useAuth();

  const token = useMemo(async () => {
    return await getToken({ template: "Standard" });
  }, [getToken]);

  /**
   * This is where we handle errors that occur when calling the getToken function, particularly API errors caused by the Clerk "Browser unauthenticated" error.
   * The isLoaded state remains false indefinitely, preventing the page from rendering since we return null when Clerk is not loaded, as shown below.
   */
  if (!isLoaded) {
    return null;
  }

  return <div>Token: {token}</div>;
}
