import type { Dirent } from "fs";

export default function createDirent(name: string, directory = false): Dirent {
  return {
    name,
    isDirectory: () => directory,
    isFile: () => !directory,
    isSymbolicLink: () => false
  } as Dirent;
}
