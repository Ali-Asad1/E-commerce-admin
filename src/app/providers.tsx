import ModalProvider from "@/providers/ModalProvider";
import { ClerkProvider } from "@clerk/nextjs";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModalProvider />
      <ClerkProvider>{children}</ClerkProvider>
    </>
  );
}
export default Providers;
