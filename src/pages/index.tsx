import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push("/admin");
    }
  }, [router]);

  return <div></div>;
}
