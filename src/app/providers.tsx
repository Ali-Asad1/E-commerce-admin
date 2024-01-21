import { ClerkProvider } from "@clerk/nextjs";

function Providers({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
export default Providers;
