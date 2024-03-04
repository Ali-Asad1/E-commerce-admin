"use client";

import { ClerkProvider } from "@clerk/nextjs";

import { EdgeStoreProvider } from "@/lib/edgestore";

import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider />
      <ModalProvider />
      <ClerkProvider>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </ClerkProvider>
    </>
  );
}
export default Providers;
