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
      <PopoverContent>
        <NotificationTabs />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
