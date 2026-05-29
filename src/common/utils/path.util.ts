import path from "path";

/**
 * Checks if a target path is safe to access relative to a base path.
 */
export function isPathSafe(basePath: string, targetPath: string): boolean {
  const resolvedBasePath = path.resolve(basePath);
  const resolvedTargetPath = path.resolve(basePath, targetPath);

  return resolvedTargetPath.startsWith(resolvedBasePath);
}
