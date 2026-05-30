import type { Dirent, PathLike } from "fs";
import readTree from "@tests/specs/common/utils/__mocks__/fs/util/read-tree.util";
import { MockDirectoryTree } from "@tests/specs/common/utils/__mocks__/fs/types/mock-directory-tree.type";

let mockDirectoryTree: MockDirectoryTree = {};

export function setMockDirectoryTree(tree: MockDirectoryTree): void {
  mockDirectoryTree = tree;
}

export const readdir = jest
  .fn<Promise<Dirent[]>, [PathLike, { withFileTypes: true }]>()
  .mockImplementation(async (currentDirectory) => readTree(mockDirectoryTree, currentDirectory.toString()));

export default {
  readdir,
  setMockDirectoryTree
};
