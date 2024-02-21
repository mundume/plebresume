import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import UserAccountNav from "./UserDropdown";
import MobileNav from "./MobileNav";
import NotificationsPopover from "./NotificationsPopover";
import { ModeToggle } from "./theme-toggle";

export const NavBar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 h-14 backdrop-blur-lg ">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between border-b h-14 border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            <span>plebresume.</span>
          </Link>
          <MobileNav user={user!} />
          <ModeToggle />
          <div className="items-center hidden space-x-4 sm:flex">
            {!user ? (
              <>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  login
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  register
                  <ArrowRightIcon className="ml-1.5 h-4 w-4 text-purple-500" />
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <NotificationsPopover />
                  <UserAccountNav />
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
