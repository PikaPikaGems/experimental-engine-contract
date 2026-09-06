import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  outDir: "dist",
  format: ["esm"],
  target: "es2022",
  // Declarations come from `tsc -p tsconfig.build.json`, not tsup (same as the
  // engine: tsup's bundled dts step throws against TypeScript 7).
  dts: false,
  sourcemap: true,
  clean: true,
});
