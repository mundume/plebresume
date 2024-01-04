import { BellIcon } from "@radix-ui/react-icons";

export default function NotificationIcon() {
  return (
    <div className="relative overflow-auto">
      <BellIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <span className="absolute top-0 inline-flex items-center justify-center w-[10px] h-[10px] text-xs bg-blue-400 rounded-full right-[0.5px] overflow-visible"></span>
    </div>
  );
}
