"use client";
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NotificationIcon from "./Bellicon";
import { Menu, Minus, X } from "lucide-react";
import { Button } from "./ui/button";

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
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
  return (
    <div className=" sm:hidden">
      <Button
        size={"icon"}
        onClick={toggleOpen}
        className="relative z-50 rounded-full"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-zinc-700" />
        ) : (
          <Menu className="w-5 h-5 text-zinc-700" />
        )}
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in slide-in-from-top-1 fade-in-20">
          <ul className="absolute grid w-full gap-3 px-10 pt-20 pb-8 mt-10 bg-white border-b shadow-xl dark:bg-background ">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-up")}
                    href={"/sign-up"}
                    className="flex items-center w-full font-semibold text-green-600"
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
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/pricing")}
                    href={"/pricing"}
                    className="flex items-center w-full font-semibold"
                  >
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <div className="border border-red-600">
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    href={"/dashboard"}
                    className="flex items-center w-full font-semibold text-purple-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="h-px my-3 bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-out")}
                    href={"/sign-out"}
                    className="flex items-center w-full font-semibold"
                  >
                    Sign Out
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
