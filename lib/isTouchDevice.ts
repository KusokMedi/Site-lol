/**
 * Returns true if the device is a touch/coarse-pointer device.
 * Safe to call during SSR — returns false when window is unavailable.
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    window.matchMedia("(pointer: coarse)").matches
  );
}
