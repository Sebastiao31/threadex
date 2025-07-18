import { statusColors, statusText } from "@/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getStatusColor = (status: string) => {
  return statusColors[status as keyof typeof statusColors];
}

export const getStatusText = (status: string) => {
  return statusText[status as keyof typeof statusText];
}