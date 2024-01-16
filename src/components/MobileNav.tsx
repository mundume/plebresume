"use client";
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NotificationIcon from "./Bellicon";
import { Menu, Minus, X } from "lucide-react";
import { Button } from "./ui/button";
import NotificationsDrawerMobile from "./NotificationsDrawerMobile";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const MobileNav = ({ user }: { user: KindeUser | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  function getInitials(firstName: string, lastName: string) {
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(0);
    return [firstInitial, lastInitial];
  }

  return (
    <div className=" sm:hidden text-slate-900">
      <NotificationsDrawerMobile />
      <Button
        size={"icon"}
        onClick={toggleOpen}
        className="relative z-50 ml-1 rounded-full"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-slate-600" />
        ) : (
          <Menu className="w-5 h-5 text-slate-600" />
        )}
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in slide-in-from-top-20 fade-in-50">
          <ul className="absolute grid w-full gap-3 px-10 pt-20 pb-8 mt-10 bg-white border-b shadow-xl dark:bg-background ">
            {!user ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-up")}
                    href={"/sign-up"}
                    className="flex items-center w-full font-semibold text-purple-400"
                  >
                    Get started <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                </li>
                <li className="h-px my-3 bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-in")}
                    href={"/sign-in"}
                    className="flex items-center w-full font-semibold"
                  >
                    Sign in
                  </Link>
                </li>
                <li className="h-px my-3 bg-gray-300" />
              </>
            ) : (
              <div className="">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <Avatar>
                    <AvatarImage src={user.picture!} />
                    <AvatarFallback className="border text-zinc-800">
                      {getInitials(user.given_name!, user.family_name!)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <li className="h-px my-3 bg-gray-300" />
                <li className="">
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    href={"/dashboard"}
                    className="flex items-center w-full text-purple-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="h-px my-3 bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/settings")}
                    href={"/settings"}
                    className="flex items-center w-full"
                  >
                    Settings
                  </Link>
                </li>
                <li className="h-px my-3 bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-out")}
                    href={"/sign-out"}
                    className="flex items-center w-full"
                  >
                    Sign Out
                  </Link>
                </li>
                <li className="h-px my-3 bg-gray-300" />
              </div>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
