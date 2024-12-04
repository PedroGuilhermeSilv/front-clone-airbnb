"use client";

import { useRouter } from "next/navigation";
import { resetAuthCookies } from "../lib/actions";

import MenuLink from "./navbar/MenuLink";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const submitLogout = async () => {
    resetAuthCookies();
    router.push("/");
    router.refresh();
  };

  return <MenuLink label="Log Out" onClick={submitLogout} />;
};

export default LogoutButton;
