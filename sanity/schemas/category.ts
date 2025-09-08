export default {
  name: "category",
  title: "Categoría",
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
      rows: 3,
    },
    {
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Cyan (Lanzamientos)", value: "#0891b2" },
          { title: "Pink (Análisis)", value: "#ec4899" },
          { title: "Verde (Ventas)", value: "#059669" },
          { title: "Naranja (Eventos)", value: "#ea580c" },
          { title: "Púrpura (Tecnología)", value: "#9333ea" },
          { title: "Gris (General)", value: "#6b7280" },
        ],
      },
      initialValue: "#0891b2",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
}
