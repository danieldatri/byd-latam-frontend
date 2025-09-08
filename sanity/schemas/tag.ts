export default {
  name: "tag",
  title: "Etiqueta",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 2,
    },
    {
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Cyan", value: "#0891b2" },
          { title: "Pink", value: "#ec4899" },
          { title: "Verde", value: "#059669" },
          { title: "Naranja", value: "#ea580c" },
          { title: "Púrpura", value: "#9333ea" },
          { title: "Gris", value: "#6b7280" },
        ],
      },
      initialValue: "#6b7280",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
}
