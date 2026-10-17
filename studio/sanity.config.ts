import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { schemaTypes, singletonNames } from "./schemaTypes";

// Singletons: one fixed document each (_id = type name), opened straight from the menu.
const single = (S: StructureBuilder, type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

export default defineConfig({
  name: "default",
  title: "ITH Innovation",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Website content")
          .items([
            single(S, "home", "Home page"),
            S.listItem()
              .title("Services")
              .child(
                S.list()
                  .title("Services")
                  .items([
                    single(S, "serviceFabrication", "01 Fabrication"),
                    single(S, "serviceErection", "02 Erection"),
                    single(S, "serviceHandling", "03 Heavy Equipment Handling"),
                    single(S, "serviceOm", "04 Operation & Maintenance"),
                    single(S, "serviceRental", "05 Equipment Rental"),
                  ]),
              ),
            S.documentTypeListItem("rentalProduct").title("Rental equipment"),
            single(S, "projects", "Projects page"),
            single(S, "contact", "Contact page"),
            single(S, "enquiryForm", "Enquiry form"),
            S.divider(),
            single(S, "company", "Company details"),
            single(S, "chrome", "Header & footer"),
            single(S, "seo", "Google & sharing"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "+" menu — they already exist.
    templates: (templates) => templates.filter((t) => !singletonNames.has(t.schemaType)),
  },
  document: {
    // No duplicate/delete for singletons.
    actions: (actions, { schemaType }) =>
      singletonNames.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
