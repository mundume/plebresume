import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

export default function NotificationIcon() {
  return (
    <Button
      size="icon"
      className="relative rounded-full dark:border dark:border-slate-800 "
      variant={"pleb"}
    >
      <BellIcon className="relative w-4 h-4 text-slate-600 " />
      <span className="absolute top-0 inline-flex items-center justify-center w-[10px] h-[10px] text-xs bg-blue-400 rounded-full right-[0.5px] overflow-visible"></span>
    </Button>
  );
}
