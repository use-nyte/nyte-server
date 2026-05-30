import fs from "fs/promises";
import path from "path";
import { ScanDirectoryGeneratorOptions } from "@/common/utils/types/scan-directory-generator-options.type";
import { PathLike } from "fs";

export async function* scanDirectoryGenerator(
  directory: PathLike,
  options?: ScanDirectoryGeneratorOptions
): AsyncGenerator<string> {
  const { includeHidden = false, filter, maxDepth = 0 } = options || {};

  async function* scanDir(dir: string, currentDepth: number): AsyncGenerator<string> {
    if (maxDepth > 0 && currentDepth > maxDepth) {
      return;
    }

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (!includeHidden && entry.name.startsWith(".")) {
        continue;
      }

      if (filter && !filter(fullPath)) {
        continue;
      }

      yield fullPath;

      if (entry.isDirectory()) {
        yield* scanDir(fullPath, currentDepth + 1);
      }
    }
  }

  yield* scanDir(path.resolve(directory.toString()), 1);
}
