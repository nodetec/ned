import { defineConfig, type Options } from "tsup";

import path from "path";

export default defineConfig((options: Options) => ({
  format: ["esm"], // generate cjs and esm files
  clean: true, // clean up the dist folder
  dts: true, // generate dts file for main module
  sourcemap: true, //env === 'production', // source map is only available in prod
  outDir: "dist", // env === 'production' ? 'dist' : 'lib',
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  external: ["react"],
  ...options,
}));
