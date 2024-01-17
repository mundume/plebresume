import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationIcon from "./Bellicon";
import NotificationTabs from "./NotificationTabs";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";

const NotificationsPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <NotificationIcon />
      </PopoverTrigger>
      <PopoverContent className="w-full px-1">
        <div className="flex justify-around">
          <NotificationTabs />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
