import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'country',
  title: 'País',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre en Español',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Argentina', value: 'Argentina' },
          { title: 'Bolivia', value: 'Bolivia' },
          { title: 'Brasil', value: 'Brasil' },
          { title: 'Chile', value: 'Chile' },
          { title: 'Colombia', value: 'Colombia' },
          { title: 'Costa Rica', value: 'Costa Rica' },
          { title: 'Cuba', value: 'Cuba' },
          { title: 'Ecuador', value: 'Ecuador' },
          { title: 'El Salvador', value: 'El Salvador' },
          { title: 'Guatemala', value: 'Guatemala' },
          { title: 'Honduras', value: 'Honduras' },
          { title: 'México', value: 'México' },
          { title: 'Nicaragua', value: 'Nicaragua' },
          { title: 'Panamá', value: 'Panamá' },
          { title: 'Paraguay', value: 'Paraguay' },
          { title: 'Perú', value: 'Perú' },
          { title: 'Puerto Rico', value: 'Puerto Rico' },
          { title: 'República Dominicana', value: 'República Dominicana' },
          { title: 'Uruguay', value: 'Uruguay' },
          { title: 'Venezuela', value: 'Venezuela' },
          { title: 'LATAM', value: 'LATAM' },
          { title: 'GLOBAL', value: 'GLOBAL' }
        ]
      }
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 30,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji/Bandera',
      type: 'string',
      description: 'Emoji unicode o icono de bandera para el país',
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'emoji',
    },
  },
})
