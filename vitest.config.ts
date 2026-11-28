import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "#server": fileURLToPath(new URL("./src", import.meta.url)) }
  },
  test: {
    globals: true,
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["**/*.spec.ts"],
      reporter: ["text", "html"],
      reportsDirectory: ".generated/coverage"
    },
    projects: [
      { test: { name: "unit", include: ["test/unit/**/*.spec.ts"] } },
      { test: { name: "e2e", include: ["test/e2e/**/*.e2e-spec.ts"] } }
    ]
  }
});
