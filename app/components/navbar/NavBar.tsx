import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import { getUserId } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

const NavBar = async () => {
  const userId = await getUserId();
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10 px-2">
      <div className="max-w-[1500px] mx-auto ">
        <div className="flex justify-between items-center">
          <Link href="https://clone-airbnb-git-main-pedroguilhermesilvs-projects.vercel.app/">
            <Image width={180} height={38} alt="Logo bnb" src="/logo.png" />
          </Link>
          <div className="flex space-x-6">
            <SearchFilters />
          </div>
          <div className="flex items-center space-x-6">
            <AddPropertyButton userId={userId} />
            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
