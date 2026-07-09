import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  outDir: "dist",
  bundle: false,
  sourcemap: true,
  clean: true,
  target: "node24",
  tsconfig: "tsconfig.json",
});
