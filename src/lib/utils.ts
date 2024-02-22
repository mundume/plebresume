import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(firstName: string, lastName: string) {
  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);
  return [firstInitial, lastInitial];
}
