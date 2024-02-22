import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import Image from "next/image";

import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import {
  CaretDownIcon,
  FaceIcon,
  MixerVerticalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

import { ChevronRightSquare, Lightbulb, Power, Settings } from "lucide-react";
import { getInitials } from "@/lib/utils";

const UserAccountNav = async ({}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
          <Avatar className="flex items-center justify-center border cursor-pointer dark:text-slate-600 dark:border-slate-800">
            {getInitials(user?.given_name!, user?.family_name!)}
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              {user?.family_name && (
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user.given_name}
                </p>
              )}
              {user?.email && (
                <p className="w-[200px] truncate text-xs text-zinc-500">
                  {user?.email}
                </p>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm">
              <ChevronRightSquare className="w-4 h-4 font-normal text-slate-600" />{" "}
              dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 font-normal text-slate-600" />{" "}
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            {user ? (
              <LogoutLink
                aria-label="Logout button"
                className="flex items-center gap-2 "
              >
                <Power className="w-4 h-4 text-slate-600" />
                Log out
              </LogoutLink>
            ) : (
              <LoginLink className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-slate-600" />
                Log in
              </LoginLink>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAccountNav;
