"use client";

import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function ClientProvider({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
