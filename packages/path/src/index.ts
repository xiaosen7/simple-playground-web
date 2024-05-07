import { filter as createSingleFilterPattern } from "minimatch";

export function basename(path: string): string {
  const segments = path.split("/");
  return segments[segments.length - 1];
}

export function dirname(path: string): string {
  const segments = path.split("/");
  return segments.slice(0, -1).join("/");
}

export function join(...paths: string[]) {
  const separator = "/";
  const normalizedSegments: string[] = [];

  paths.forEach((segment, index) => {
    if (segment) {
      let trimmedSegment = segment.trim();
      if (trimmedSegment !== "") {
        if (index !== 0) {
          trimmedSegment = trimmedSegment.replace(
            new RegExp(`^.{0,1}${separator}`),
            ""
          );
        }

        normalizedSegments.push(
          trimmedSegment.replace(new RegExp(`${separator}$`), "")
        );
      }
    }
  });

  return normalizedSegments.join(separator);
}

export type ICreateFilterPatternOptions = Parameters<
  typeof createSingleFilterPattern
>[1];
export function createFilterPattern(
  pattern: string | string[],
  options?: ICreateFilterPatternOptions
) {
  if (!Array.isArray(pattern)) {
    return createFilterPattern([pattern], options);
  }

  const filters = pattern.map((p) => createSingleFilterPattern(p, options));

  return (x: string) => filters.every((filter) => filter(x));
}
