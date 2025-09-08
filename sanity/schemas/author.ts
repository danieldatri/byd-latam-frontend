export default {
  name: "author",
  title: "Autor",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Foto",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Biografía",
      type: "text",
      rows: 4,
    },
    {
      name: "social",
      title: "Redes Sociales",
      type: "object",
      fields: [
        {
          name: "twitter",
          title: "Twitter/X",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
}
