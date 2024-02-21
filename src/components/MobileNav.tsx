"use client";
import { ArrowRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import NotificationIcon from "./Bellicon";
import { Menu, Minus, Twitter, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import NotificationsDrawerMobile from "./NotificationsDrawerMobile";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./theme-toggle";
import MobileThemeToggle from "./mobile-theme-toggle";
import { cn } from "@/lib/utils";

const MobileNav = ({ user }: { user: KindeUser }) => {
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
    <div className="relative sm:hidden text-slate-900">
      {user && <NotificationsDrawerMobile />}
      <Button
        size={"icon"}
        variant={"pleb"}
        onClick={toggleOpen}
        className="relative z-50 ml-1 rounded-full"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-slate-600 dark:text-slate-50" />
        ) : (
          <Menu className="w-5 h-5 text-slate-600 " />
        )}
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full duration-200 h-100vh animate-in slide-in-from-left-40 fade-in-100">
          <ul className="absolute grid w-full gap-3 px-10    bg-white  shadow-xl dark:bg-background  min-h-[calc(100vh-1rem)]  text-popover-foreground ">
            {!user ? (
              <div className="pt-32">
                <li className="">
                  <Link
                    onClick={() => closeOnCurrent("/sign-up")}
                    href={"/sign-up"}
                    className="flex items-center w-full font-semibold "
                  >
                    register{" "}
                    <ArrowRightIcon className="w-5 h-5 ml-2 text-purple-400" />
                  </Link>
                </li>
                <li className="h-px my-3 bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-in")}
                    href={"/sign-in"}
                    className="flex items-center w-full font-semibold"
                  >
                    login
                  </Link>
                </li>
              </div>
            ) : (
              <div className="pt-16">
                <div className="min-w-full">
                  <Link
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: "outline",
                      }),
                      "w-full"
                    )}
                    href="https://twitter.com/nzai__"
                  >
                    <Twitter className="w-5 h-5 mr-2 text-slate-600" />
                    say hi
                  </Link>
                </div>
                <div className="flex items-center justify-between pt-8 ">
                  <p className="text-sm text-slate-500 ">{user.email}</p>
                  <Avatar className="flex items-center justify-center dark:text-slate-600 dark:bg-accent">
                    {getInitials(user?.given_name!, user?.family_name!)}
                  </Avatar>
                </div>
                <li className="h-px my-3 bg-gray-300" />
                <li className="">
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    href={"/dashboard"}
                    className="flex items-center w-full"
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
                <li className="flex items-center justify-between w-full">
                  Theme
                  <MobileThemeToggle />
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
