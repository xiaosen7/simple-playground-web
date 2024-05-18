import util from "util";

// resolves . and .. elements in a path array with directory names there
// must be no slashes or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts: string[], allowAboveRoot: boolean) {
  var res = [];
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];

    // ignore empty parts
    if (!p || p === ".") continue;

    if (p === "..") {
      if (res.length && res[res.length - 1] !== "..") {
        res.pop();
      } else if (allowAboveRoot) {
        res.push("..");
      }
    } else {
      res.push(p);
    }
  }

  return res;
}

// returns an array with empty elements removed from either end of the input
// array or the original array if no elements need to be removed
function trimArray(arr: string[]) {
  var lastIndex = arr.length - 1;
  var start = 0;
  for (; start <= lastIndex; start++) {
    if (arr[start]) break;
  }

  var end = lastIndex;
  for (; end >= 0; end--) {
    if (arr[end]) break;
  }

  if (start === 0 && end === lastIndex) return arr;
  if (start > end) return [];
  return arr.slice(start, end + 1);
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
  /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};

function posixSplitPath(filename: string) {
  return splitPathRe.exec(filename)?.slice(1) ?? [];
}

// path.normalize(path)
// posix version
export const normalize = function (path: string) {
  var isAbs = isAbsolute(path),
    trailingSlash = path && path[path.length - 1] === "/";

  // Normalize the path
  path = normalizeArray(path.split("/"), !isAbs).join("/");

  if (!path && !isAbs) {
    path = ".";
  }
  if (path && trailingSlash) {
    path += "/";
  }

  return (isAbs ? "/" : "") + path;
};

// posix version
export const isAbsolute = function (path: string) {
  return path.charAt(0) === "/";
};

// posix version
export const join = function (...paths: string[]) {
  var path = "";
  for (var i = 0; i < paths.length; i++) {
    var segment = paths[i];
    if (!util.isString(segment)) {
      throw new TypeError("Arguments to path.join must be strings");
    }
    if (segment) {
      if (!path) {
        path += segment;
      } else {
        path += "/" + segment;
      }
    }
  }
  return normalize(path);
};

// path.relative(from, to)
// posix version
export const relative = function (from: string, to: string) {
  from = join(from).substr(1);
  to = join(to).substr(1);

  var fromParts = trimArray(from.split("/"));
  var toParts = trimArray(to.split("/"));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push("..");
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join("/");
};

const _makeLong = function (path: string) {
  return path;
};

export const dirname = function (path: string) {
  var result = posixSplitPath(path),
    root = result[0],
    dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return ".";
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

export const basename = function (path: string, ext?: string) {
  var f = posixSplitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

export const extname = function (path: string) {
  return posixSplitPath(path)[3];
};

export const format = function (pathObject: any) {
  if (!util.isObject(pathObject)) {
    throw new TypeError(
      "Parameter 'pathObject' must be an object, not " + typeof pathObject
    );
  }

  var root = pathObject.root || "";

  if (!util.isString(root)) {
    throw new TypeError(
      "'pathObject.root' must be a string or undefined, not " +
        typeof pathObject.root
    );
  }

  var dir = pathObject.dir ? pathObject.dir + sep : "";
  var base = pathObject.base || "";
  return dir + base;
};

export const parse = function (pathString: string) {
  if (!util.isString(pathString)) {
    throw new TypeError(
      "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  allParts[1] = allParts[1] || "";
  allParts[2] = allParts[2] || "";
  allParts[3] = allParts[3] || "";

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length),
  };
};

export const sep = "/";
export const delimiter = ":";
