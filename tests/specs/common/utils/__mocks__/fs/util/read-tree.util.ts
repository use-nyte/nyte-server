import path from "path";
import type { Dirent } from "fs";
import { MockDirectoryTree } from "@tests/specs/common/utils/__mocks__/fs/types/mock-directory-tree.type";
import createDirent from "@tests/specs/common/utils/__mocks__/fs/util/create-dirent.util";

export default function readTree(tree: MockDirectoryTree, currentDirectory: string): Dirent[] {
  const segments = path.relative(path.resolve("./test-directory"), currentDirectory).split(path.sep).filter(Boolean);

  let currentNode: MockDirectoryTree | null = tree;

  for (const segment of segments) {
    const nextNode = currentNode?.[segment];

    if (nextNode && typeof nextNode === "object") {
      currentNode = nextNode;
      continue;
    }

    return [];
  }

  return Object.entries(currentNode ?? {}).map(([name, value]) => createDirent(name, value !== null));
}
