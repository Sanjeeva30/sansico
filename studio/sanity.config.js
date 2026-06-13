import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "sansico",
  title: "Sansico Group",
  projectId: "rvghw4zu",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes }
});
