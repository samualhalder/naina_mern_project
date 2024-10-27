import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTokenValid(token: string): boolean {
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return false;

    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return exp > currentTime; // Token is valid if expiration time is in the future
  } catch (error) {
    return false; // Invalid token format
  }
}
