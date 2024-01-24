import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function absoluteURL(path) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
