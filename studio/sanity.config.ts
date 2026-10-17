import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "ITH Innovation",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [
    structureTool({
      // Only one content type, so open straight onto the equipment list.
      structure: (S) => S.list().title("Content").items([S.documentTypeListItem("rentalProduct").title("Rental equipment")]),
    }),
  ],
  schema: { types: schemaTypes },
});
