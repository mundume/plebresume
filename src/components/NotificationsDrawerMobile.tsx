import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import NotificationIcon from "./Bellicon";
import { BellIcon } from "lucide-react";
const NotificationsDrawerMobile = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" className="relative rounded-full ">
          <BellIcon className="relative w-4 h-4 text-slate-600" />
          <span className="absolute top-0 inline-flex items-center justify-center w-[10px] h-[10px] text-xs bg-blue-400 rounded-full right-[0.5px] overflow-visible"></span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[calc(80vh-10rem)]">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationsDrawerMobile;
