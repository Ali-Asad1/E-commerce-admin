import { UserButton } from "@clerk/nextjs";

const Navbar = async () => {

  return (
    <div className="border-b">
      <div className="h-16 flex items-center px-4">
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
