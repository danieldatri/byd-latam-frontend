# BYD Latam News Frontend

Un sitio web de noticias moderno sobre BYD en Latinoamérica, construido con Next.js 14, TypeScript, Tailwind CSS y Sanity.io.

## 🚀 Tecnologías Utilizadas

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Sanity.io** - CMS headless
- **Radix UI** - Componentes de UI accesibles
- **Lucide React** - Iconos modernos

## 📁 Estructura del Proyecto

\`\`\`
├── app/                    # App Router de Next.js
│   ├── article/[slug]/    # Individual article pages
│   ├── news/              # News listing page
│   └── country/[slug]/    # News pages by country
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI base
│   ├── article-card.tsx  # Tarjeta de artículo
│   ├── header.tsx        # Cabecera del sitio
│   └── footer.tsx        # Pie de página
├── lib/                  # Utilidades y configuración
│   └── sanity.ts        # Cliente y consultas de Sanity
├── sanity/              # Esquemas de Sanity
│   └── schemas/         # Definiciones de tipos de contenido
└── public/              # Archivos estáticos
\`\`\`

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

\`\`\`bash
git clone <url-del-repositorio>
cd byd-latam-frontend
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno

Crea un archivo `.env.local` basado en `.env.local.example`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Completa las variables de Sanity en `.env.local`:

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
\`\`\`

### 4. Configurar Sanity.io

#### Opción A: Crear un nuevo proyecto en Sanity

1. Ve a [sanity.io](https://sanity.io) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota el Project ID
4. Configura el dataset (generalmente "production")

#### Opción B: Usar Sanity CLI (recomendado)

\`\`\`bash
npm install -g @sanity/cli
sanity init
\`\`\`

Sigue las instrucciones para crear un nuevo proyecto o conectarte a uno existente.

### 5. Configurar esquemas en Sanity Studio

Los esquemas ya están definidos en `sanity/schemas/`. Incluyen:

- **Post** - Artículos de noticias
- **Author** - Autores
- **Category** - Categorías de noticias  
- **Country** - Países de Latinoamérica
- **Tag** - Etiquetas
- **Block Content** - Contenido enriquecido

### 6. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

El sitio estará disponible en `http://localhost:3000`

## 📊 Esquemas de Contenido

### Post (Artículo)
- Título, slug, extracto
- Imagen destacada
- Contenido enriquecido
- Autor, categoría, etiquetas
- País, fecha de publicación
- Estado destacado

### Author (Autor)
- Nombre, slug, biografía
- Imagen de perfil
- Información social

### Category (Categoría)
- Título, slug, descripción
- Color identificativo

### Country (País)
- Nombre en español
- Slug para URLs
- Emoji/bandera

## 🎨 Personalización de Diseño

El sitio utiliza Tailwind CSS con un sistema de diseño personalizado:

- **Fuentes**: Geist (sans-serif) y Playfair Display (serif)
- **Colores**: Sistema de colores personalizable
- **Componentes**: Basados en Radix UI
- **Responsive**: Mobile-first design

### Colores de Categorías

Las categorías incluyen colores predefinidos:
- Cyan: Lanzamientos
- Pink: Análisis  
- Verde: Ventas
- Naranja: Eventos
- Púrpura: Tecnología
- Gris: General

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros proveedores

El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📱 Funcionalidades

### ✅ Implementadas

- [x] Página principal con artículos destacados
- [x] Listado de todas las noticias
- [x] Páginas individuales de artículos
- [x] Filtrado por país
- [x] Diseño responsive
- [x] Header con opacidad
- [x] Footer centrado
- [x] Integración con Sanity.io
- [x] Renderizado de contenido enriquecido
- [x] SEO optimizado

### 🔄 Próximas funcionalidades

- [ ] Búsqueda de artículos
- [ ] Filtros por categoría
- [ ] Newsletter
- [ ] Comentarios
- [ ] Compartir en redes sociales
- [ ] PWA (Progressive Web App)
- [ ] Analytics
- [ ] Sitemap automático

## 🧪 Scripts Disponibles

\`\`\`bash
npm run dev      # Desarrollo
npm run build    # Compilación
npm run start    # Producción
npm run lint     # Linting
\`\`\`

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Sanity.io](https://www.sanity.io/docs)
3. Abre un issue en el repositorio
