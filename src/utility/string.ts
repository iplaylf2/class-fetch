export type Format<T extends string = string> = (x: {
  [k in T]: string;
}) => string;

export function t<const T extends string[]>(
  template: TemplateStringsArray,
  ...keys: T
): Format<T[number]> {
  const last = template[template.length - 1] ?? "";
  return (x) =>
    Array.from(keys.entries()).reduce(
      (r, [index, key]) => `${r}${template[index]}${x[key as T[number]]}`,
      ""
    ) + last;
}
