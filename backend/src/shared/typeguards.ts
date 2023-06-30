/**
 * A type guard that filters out null items from arrays
 * @param it Any type
 */
export function isNotNull<T>(it: T): it is NonNullable<T> {
  return it != null;
}
