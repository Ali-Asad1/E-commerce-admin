"use client";

import { ClerkProvider } from "@clerk/nextjs";

import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider />
      <ModalProvider />
      <ClerkProvider>{children}</ClerkProvider>
    </>
  );
}
export default Providers;
