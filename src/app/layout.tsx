"use client";
import { Provider } from "@/components/ui/provider";
import { useState, useEffect } from "react";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <ClientOnly>
          <Provider>{children}</Provider>
        </ClientOnly>
      </body>
    </html>
  );
}
