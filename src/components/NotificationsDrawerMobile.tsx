import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { BellIcon } from "lucide-react";
import NotificationTabs from "./NotificationTabs";
import { useState } from "react";
const NotificationsDrawerMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setIsOpen(open);
      }}
    >
      <DrawerTrigger asChild disabled>
        <Button size="icon" className="relative z-50 rounded-full ">
          <BellIcon className="relative w-4 h-4 text-slate-600" />
          <span className="absolute top-0 inline-flex items-center justify-center w-[10px] h-[10px] text-xs bg-blue-400 rounded-full right-[0.5px] overflow-visible" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[calc(80vh-10rem)]">
        <NotificationTabs />
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationsDrawerMobile;
