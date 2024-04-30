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
