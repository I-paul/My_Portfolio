/**
 * Utility function to conditionally join classNames together.
 * Similar to clsx or classnames library.
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(" ")
    .trim()
}
