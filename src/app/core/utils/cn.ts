import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx for conditional logic,
 * then deduplicates Tailwind classes using tailwind-merge.
 *
 * @example
 * cn('px-4 py-2', condition && 'bg-primary', 'text-sm text-lg')
 * // → 'px-4 py-2 bg-primary text-lg'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
