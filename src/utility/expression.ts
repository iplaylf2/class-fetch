export function expression<T>(f: () => T) {
  return f();
}
