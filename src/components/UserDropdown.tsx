import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

import Link from "next/link";
import {
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import {
  CaretDownIcon,
  FaceIcon,
  MixerVerticalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

import { ChevronRightSquare, Power, Settings } from "lucide-react";

const UserAccountNav = async ({}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
          <Button className="flex items-center gap-2 rounded-full w-14 ">
            <Avatar className="flex items-center ">
              {user?.picture ? (
                <Image src={user?.picture} alt="profile" />
              ) : (
                <PersonIcon className="w-4 h-4" />
              )}
              <CaretDownIcon className="w-4 h-4" />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              {user?.family_name && (
                <p className="text-sm font-medium text-slate-900">
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
              <ChevronRightSquare className="w-4 h-4 font-normal text-slate-500" />{" "}
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 font-normal text-slate-500" />{" "}
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <LogoutLink
              aria-label="Logout button"
              className="flex items-center gap-2 "
            >
              <Power className="w-4 h-4 text-slate-500" />
              Log out
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAccountNav;
