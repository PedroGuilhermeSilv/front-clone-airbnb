"use client";

import { useState } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "../hooks/useLoginModal";
import useSingupModal from "../hooks/useSingupModal";
import LogoutButton from "../LogoutButton";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const loginModel = useLoginModal();
  const singupModel = useSingupModal();
  return (
    <div className="p-2 relative inline-block border rounded-full">
      <button onClick={() => setIsOpen(!isOpen)} className="items-center flex">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute w-[220px] top-[60px right-0 border bg-white rounded-xl shadow-md">
          {userId ? (
            <>
              <MenuLink
                label="Inbox"
                onClick={() => {
                  router.push("/inbox");
                  setIsOpen(false);
                }}
              />
              <MenuLink
                label="My properties"
                onClick={() => {
                  router.push("/myproperties");
                  setIsOpen(false);
                }}
              />
              <MenuLink
                label="My reservation"
                onClick={() => {
                  router.push("/myreservations");
                  setIsOpen(false);
                }}
              />
              <MenuLink
                label="My favorites"
                onClick={() => {
                  router.push("/myfavorites");
                  setIsOpen(false);
                }}
              />
              <LogoutButton />
            </>
          ) : (
            <>
              <MenuLink
                label="Log in"
                onClick={() => {
                  setIsOpen(false);
                  loginModel.open();
                }}
              />
              <MenuLink
                label="Sign up"
                onClick={() => {
                  setIsOpen(false);
                  singupModel.open();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
