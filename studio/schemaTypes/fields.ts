import { defineField, type FieldDefinition } from "sanity";

// Field helpers. Field names must match the keys of `defaults` in content/site.ts.
// Nothing is required: an empty field falls back to the site's built-in default text.

type Extra = { description?: string; group?: string };

export const str = (name: string, title: string, extra: Extra = {}) =>
  defineField({ name, title, type: "string", ...extra });

export const text = (name: string, title: string, extra: Extra = {}) =>
  defineField({ name, title, type: "text", rows: 3, ...extra });

export const photo = (name: string, title: string, extra: Extra = {}) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    description: extra.description ?? "Use the crop / hotspot tool to choose which part stays visible.",
    group: extra.group,
    fields: [
      defineField({
        name: "alt",
        title: "Photo description",
        type: "string",
        description: "What the photo shows, in a few words. Read out to blind visitors and used by Google.",
        validation: (rule) => rule.required(),
      }),
    ],
  });

export const strList = (name: string, title: string, extra: Extra = {}) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }], ...extra });

/** List of small objects, e.g. stats { value, label }. `preview` = [title field, subtitle field]. */
export const objList = (
  name: string,
  title: string,
  fields: FieldDefinition[],
  preview: [string, string?],
  extra: Extra = {},
) =>
  defineField({
    name,
    title,
    type: "array",
    ...extra,
    of: [
      {
        type: "object",
        fields,
        preview: { select: { title: preview[0], subtitle: preview[1] ?? preview[0], media: "photo" } },
      },
    ],
  });

export const placeholders = (...names: string[]) =>
  `You can use ${names.map((n) => `{${n}}`).join(", ")} — filled in automatically.`;
