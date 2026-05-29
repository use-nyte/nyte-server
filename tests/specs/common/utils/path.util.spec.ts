import path from "path";
import { isPathSafe } from "../../../../src/common/utils/path.util";

describe("PathUtil", () => {
  describe("isPathSafe", () => {
    it("should return true for a safe path", () => {
      const basePath = "/home/user/documents";
      const targetPath = "reports/2023/report.pdf";

      expect(path.resolve(basePath, targetPath)).toBe("/home/user/documents/reports/2023/report.pdf");
      expect(isPathSafe(basePath, targetPath)).toBe(true);
    });

    it("should return false for an unsafe path", () => {
      const basePath = "/home/user/documents";
      const targetPath = "../../etc/passwd";

      expect(path.resolve(basePath, targetPath)).toBe("/home/etc/passwd");
      expect(isPathSafe(basePath, targetPath)).toBe(false);
    });

    it("should return true for a path that is exactly the base path", () => {
      const basePath = "/home/user/documents";
      const targetPath = ".";

      expect(path.resolve(basePath, targetPath)).toBe("/home/user/documents");
      expect(isPathSafe(basePath, targetPath)).toBe(true);
    });

    it("should return false for a path that tries to escape the base path", () => {
      const basePath = "/home/user/documents";
      const targetPath = "../documents/../etc/passwd";

      expect(path.resolve(basePath, targetPath)).toBe("/home/user/etc/passwd");
      expect(isPathSafe(basePath, targetPath)).toBe(false);
    });
  });
});
