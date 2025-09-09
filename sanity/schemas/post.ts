export default {
  name: "post",
  title: "Artículo",
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Resumen",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: "mainImage",
      title: "Imagen Principal",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
        },
      ],
    },
    {
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "country",
      title: "País",
      type: "string",
      options: {
        list: [
          { title: "México", value: "mexico" },
          { title: "Brasil", value: "brasil" },
          { title: "Argentina", value: "argentina" },
          { title: "Chile", value: "chile" },
          { title: "Colombia", value: "colombia" },
          { title: "Perú", value: "peru" },
          { title: "Uruguay", value: "uruguay" },
          { title: "Ecuador", value: "ecuador" },
          { title: "Costa Rica", value: "costa-rica" },
          { title: "Regional", value: "regional" },
        ],
      },
    },
    {
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "tags",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
    {
      name: "featured",
      title: "Artículo Destacado",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "publishedAt",
      title: "Fecha de Publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
    },
    prepare(selection: any) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `por ${author}`,
      })
    },
  },
  orderings: [
    {
      title: "Fecha de Publicación, Más Reciente",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
}
