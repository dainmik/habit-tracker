import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join class names and merge Tailwind CSS classes.
 *
 * Combines multiple class name values using `clsx`, then merges conflicting Tailwind CSS
 * classes using `twMerge` to ensure only the final applied styles remain.
 *
 * @example
 * cn("p-2", condition && "bg-red-500", "p-4");
 * // => "bg-red-500 p-4" (removes duplicate 'p-*' classes)
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
