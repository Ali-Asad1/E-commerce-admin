import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="space-y-4 p-8 pt-6">{children}</div>
    </>
  );
};
export default Layout;
