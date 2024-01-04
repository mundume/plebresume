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
import NotificationIcon from "./Bellicon";

const UserAccountNav = async ({}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <NotificationIcon />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
          <Button className="flex items-center gap-2 rounded-full aspect-square w-14 focus:ring-1 focus:ring-blue-500">
            <Avatar className="relative flex items-center ">
              {user?.picture ? (
                <div className="relative w-full h-full aspect-square">
                  <Image
                    fill
                    src={user?.picture!}
                    alt="profile picture"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <AvatarFallback>
                  <span className="sr-only">{user?.given_name}</span>
                  <PersonIcon className="w-4 h-4" />
                </AvatarFallback>
              )}
              <CaretDownIcon className="w-8 h-4" />
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
              <FaceIcon className="w-4 h-4 font-normal text-slate-500" />{" "}
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <LogoutLink
              aria-label="Logout button"
              className="flex items-center gap-2 "
            >
              <MixerVerticalIcon className="w-4 h-4 font-normal text-slate-500" />
              Log out
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAccountNav;
