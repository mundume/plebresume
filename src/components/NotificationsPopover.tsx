import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationIcon from "./Bellicon";
import NotificationTabs from "./NotificationTabs";

const NotificationsPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <NotificationIcon />
      </PopoverTrigger>
      <PopoverContent className="w-full px-1">
        <NotificationTabs />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
