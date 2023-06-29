export function from<T>(
  iterable: Iterable<T> | ArrayLike<T>
): AsyncIterable<T> {
  return (async function* () {
    for (const x of Array.from(iterable)) {
      yield x;
    }
  })();
}

export async function reduce<T, R>(
  iterable: AsyncIterable<T>,
  callbackfn: (
    previousValue: R,
    currentValue: T,
    currentIndex: number
  ) => R | Promise<R>,
  initialValue: R
): Promise<R> {
  let result = initialValue;
  let i = 0;
  for await (const x of iterable) {
    result = await callbackfn(result, x, i++);
  }
  return result;
}
