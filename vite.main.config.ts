import { defineConfig } from "vite";
import { builtinModules } from "module";
import { resolve } from "path";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        ...builtinModules,
        "pg",
        "pg-hstore", // Evitar cargar estas dependencias de PostgreSQL
      ],
    },
  },
  resolve: {
    alias: {
      pg: "false", // Alias para evitar la carga de 'pg'
      "pg-hstore": "", // Alias para evitar la carga de 'pg-hstore'
    },
  },
});
