import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dts from "vite-plugin-dts"; // Disabled - using postbuild script
import path, { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import tailwindcss from "@tailwindcss/vite";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    // dts plugin disabled - using postbuild script for better control
    // dts({
    //   include: ["src"],
    //   outDir: "dist",
    //   exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/*.stories.tsx"],
    //   rollupTypes: true,
    //   insertTypesEntry: true,
    // }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "TextEditorStudio",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "tailwindcss",
        "@lexical/react",
        "@lexical/rich-text",
        "@lexical/selection",
        "@lexical/text",
        "@lexical/utils",
        "@lexical/code",
        "@lexical/file",
        "@lexical/hashtag",
        "@lexical/html",
        "@lexical/link",
        "@lexical/list",
        "@lexical/markdown",
        "@lexical/overflow",
        "@lexical/table",
        "lexical",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dialog",
        "@radix-ui/react-icons",
        "@radix-ui/react-label",
        "@radix-ui/react-popover",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-select",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-tabs",
        "@radix-ui/react-toggle",
        "@radix-ui/react-toggle-group",
        "@radix-ui/react-tooltip",
        "lucide-react",
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
        "cmdk",
        "katex",
        "lodash-es",
        "react-colorful",
        "react-error-boundary",
        "sonner",
        "tailwindcss-animate",
        "tw-animate-css",
        "glare-themes",
        "glare-torch-mode",
        "glare-typography",
        "tailwind-scrollbar-hide",
        "@excalidraw/excalidraw",
        "@r2wc/react-to-web-component",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          lexical: "Lexical",
          "@lexical/react": "LexicalReact",
          "@lexical/rich-text": "LexicalRichText",
          "@lexical/selection": "LexicalSelection",
          "@lexical/text": "LexicalText",
          "@lexical/utils": "LexicalUtils",
          "@radix-ui/react-slot": "RadixUISlot",
          "lucide-react": "LucideReact",
          clsx: "clsx",
          "tailwind-merge": "tailwindMerge",
          "class-variance-authority": "classVarianceAuthority",
        },
                 assetFileNames: (assetInfo) => {
           if (assetInfo.name === "style.css") return "index.css";
           return assetInfo.name || "asset";
         },
      },
    },
    sourcemap: true,
    minify: "terser",
    target: "es2020",
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
