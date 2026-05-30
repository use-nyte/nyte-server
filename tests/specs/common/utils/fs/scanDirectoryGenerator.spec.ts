import path from "path";
import { readdir, setMockDirectoryTree } from "../__mocks__/fs/promises";
import { scanDirectoryGenerator } from "@/common/utils/fs.util";

jest.mock("fs/promises", () => ({
  readdir: readdir
}));

describe("scanDirectoryGenerator", () => {
  const directory = "./test-directory";
  const rootDirectory = path.resolve(directory);

  beforeEach(() => {
    setMockDirectoryTree({
      "file1.txt": null,
      "file2.txt": null,
      ".hiddenfile": null,
      subdir: {
        "file3.txt": null
      }
    });
  });

  it("should yield file paths in a directory", async () => {
    const expectedFiles = [
      path.join(rootDirectory, "file1.txt"),
      path.join(rootDirectory, "file2.txt"),
      path.join(rootDirectory, "subdir"),
      path.join(rootDirectory, "subdir", "file3.txt")
    ];

    const generator = scanDirectoryGenerator(directory);
    const results: string[] = [];
    for await (const filePath of generator) {
      results.push(filePath);
    }

    expect(results.sort()).toEqual(expectedFiles.sort());
  });

  it("should respect the includeHidden option", async () => {
    const expectedFiles = [
      path.join(rootDirectory, ".hiddenfile"),
      path.join(rootDirectory, "file1.txt"),
      path.join(rootDirectory, "file2.txt"),
      path.join(rootDirectory, "subdir"),
      path.join(rootDirectory, "subdir", "file3.txt")
    ];

    const generator = scanDirectoryGenerator(directory, { includeHidden: true });
    const results: string[] = [];
    for await (const filePath of generator) {
      results.push(filePath);
    }

    expect(results.sort()).toEqual(expectedFiles.sort());
  });

  it("should respect the filter option", async () => {
    const expectedFiles = [path.join(rootDirectory, "file1.txt"), path.join(rootDirectory, "file2.txt")];

    const generator = scanDirectoryGenerator(directory, { filter: (filePath) => filePath.endsWith(".txt") });
    const results: string[] = [];
    for await (const filePath of generator) {
      results.push(filePath);
    }

    expect(results.sort()).toEqual(expectedFiles.sort());
  });

  it("should respect the maxDepth option", async () => {
    const expectedFiles = [
      path.join(rootDirectory, "file1.txt"),
      path.join(rootDirectory, "file2.txt"),
      path.join(rootDirectory, "subdir")
    ];

    const generator = scanDirectoryGenerator(directory, { maxDepth: 1 });
    const results: string[] = [];
    for await (const filePath of generator) {
      results.push(filePath);
    }

    expect(results.sort()).toEqual(expectedFiles.sort());
  });
});
