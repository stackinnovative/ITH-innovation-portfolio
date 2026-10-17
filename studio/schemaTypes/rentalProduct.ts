import { defineField, defineType } from "sanity";

// One item of hire equipment. Shown on the website's Equipment Rental page and home rental list.
export const rentalProduct = defineType({
  name: "rentalProduct",
  title: "Rental equipment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Equipment name",
      type: "string",
      description: "e.g. Crawler Crane",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Short group label shown above the name, e.g. Cranes, Lifting, Access",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "spec",
      title: "Capacity / spec (optional)",
      type: "string",
      description: "e.g. up to 100 T, 20 m working height. Leave blank if unsure.",
      validation: (rule) => rule.max(30),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      description: "Clear photo of the equipment, at least 800 px wide. JPG or PNG.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showWhole",
      title: "Product photo on a white background",
      type: "boolean",
      description: "Turn on for cut-out product shots so the whole machine shows. Leave off for site photos (they fill the card).",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first. Use 10, 20, 30… so new items can go in between.",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
  },
});
