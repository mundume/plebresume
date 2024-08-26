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
      <PopoverTrigger asChild disabled>
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
