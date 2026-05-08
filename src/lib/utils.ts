import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_BASE_URL = 'https://morisentreprises.com/api.php';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
