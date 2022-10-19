export function safeAssign<T extends {}>(
  object: T,
  changes: Partial<T> = {}
): void {
  Object.assign(object, changes);
}
