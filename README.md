# BYD Latam News Frontend

A modern news website about BYD in Latin America, built with Next.js 15, TypeScript, Tailwind CSS, and Sanity.io.

## 🔄 Route Migration Notice (2025)

The routes have been consolidated:
- `/news`   → permanently redirected to `/articles`
- `/article/:slug` → permanently redirected to `/articles/:slug`

Reasons:
- Unificar nomenclatura (consistencia "articles").
- Mejor SEO (una sola taxonomía principal).
- Evitar contenido duplicado y enlaces dispersos.

Legacy pages now issue server redirects. Update any external references if possible. Internal components & PortableText internal links now point to `/articles/...` exclusively.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first CSS framework
- **Sanity.io** - Headless CMS
- **Radix UI** - Accessible UI components
- **Lucide React** - Modern icons

## 📁 Project Structure (Updated)

```
├── app/
│   ├── articles/           # Listing & article pages
│   │   ├── page.tsx        # /articles (list)
│   │   ├── articles-content.tsx
│   │   └── [slug]/page.tsx # /articles/:slug
│   ├── article/[slug]/     # Legacy redirect (do not use)
│   ├── news/               # Legacy redirect (do not use)
│   └── region/[slug]/      # Regional listing
├── components/
│   ├── article-card.tsx
│   ├── filter-bar.tsx
│   ├── portable-text-renderer.tsx
│   └── ...
```

> Note: `app/news/news-content.tsx` remains only as historical reference and is unused after migration. It can be safely removed in a cleanup step.

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd byd-latam-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file based on `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Fill in the Sanity variables in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Set up Sanity.io

#### Option A: Create a new project on Sanity

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Note the Project ID
4. Set up the dataset (usually "production")

#### Option B: Use Sanity CLI (recommended)

```bash
npm install -g @sanity/cli
sanity init
```

Follow the instructions to create a new project or connect to an existing one.

### 5. Set up schemas in Sanity Studio

Schemas are already defined in `sanity/schemas/`. They include:

- **Post** - News articles
- **Author** - Authors
- **Category** - News categories
- **Country** - Latin American countries
- **Tag** - Tags
- **Block Content** - Rich content

### 6. Run in development

```bash
npm run dev
```

Site: `http://localhost:3000`

## 🧪 Testing

Basic Jest + Testing Library setup.

```bash
npm test
```

Added migration test coverage:
- ArticleCard links use `/articles/`.
- PortableText internal links use `/articles/`.
- next.config.mjs contains required redirects.

## ✅ Feature Checklist (Adjusted)

- [x] Article listing (`/articles`)
- [x] Individual article page (`/articles/:slug`)
- [x] Legacy redirects (`/news`, `/article/:slug`)

(Original feature list retained below.)

## 📄 Previous Sections

# BYD Latam News Frontend

A modern news website about BYD in Latin America, built with Next.js 14, TypeScript, Tailwind CSS, and Sanity.io.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first CSS framework
- **Sanity.io** - Headless CMS
- **Radix UI** - Accessible UI components
- **Lucide React** - Modern icons

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── article/[slug]/    # Individual article pages
│   ├── news/              # News listing page
│   └── country/[slug]/    # News pages by country
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── article-card.tsx  # Article card
│   ├── header.tsx        # Site header
│   └── footer.tsx        # Site footer
├── lib/                  # Utilities and configuration
│   └── sanity.ts        # Sanity client and queries
├── sanity/              # Sanity schemas
│   └── schemas/         # Content type definitions
└── public/              # Static files
```

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd byd-latam-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file based on `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Fill in the Sanity variables in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Set up Sanity.io

#### Option A: Create a new project on Sanity

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project
3. Note the Project ID
4. Set up the dataset (usually "production")

#### Option B: Use Sanity CLI (recommended)

```bash
npm install -g @sanity/cli
sanity init
```

Follow the instructions to create a new project or connect to an existing one.

### 5. Set up schemas in Sanity Studio

Schemas are already defined in `sanity/schemas/`. They include:

- **Post** - News articles
- **Author** - Authors
- **Category** - News categories
- **Country** - Latin American countries
- **Tag** - Tags
- **Block Content** - Rich content

### 6. Run in development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## 📊 Content Schemas

### Post (Article)
- Title, slug, excerpt
- Featured image
- Rich content
- Author, category, tags
- Country, publication date
- Featured status

### Author
- Name, slug, biography
- Profile image
- Social information

### Category
- Title, slug, description
- Identifier color

### Country
- Name in Spanish
- Slug for URLs
- Emoji/flag

## 🎨 Design Customization

The site uses Tailwind CSS with a custom design system:

- **Fonts**: Geist (sans-serif) and Playfair Display (serif)
- **Colors**: Customizable color system
- **Components**: Based on Radix UI
- **Responsive**: Mobile-first design

### Category Colors

Categories include predefined colors:
- Cyan: Launches
- Pink: Analysis
- Green: Sales
- Orange: Events
- Purple: Technology
- Gray: General

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set up environment variables
3. Deploy automatically

### Other providers

The project is compatible with any provider that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📱 Features

### ✅ Implemented

- [x] Main page with featured articles
- [x] All news listing
- [x] Individual article pages
- [x] Country filtering
- [x] Responsive design
- [x] Header with opacity
- [x] Centered footer
- [x] Sanity.io integration
- [x] Rich content rendering
- [x] SEO optimized

### 🔄 Upcoming features

- [ ] Article search
- [ ] Category filters
- [ ] Newsletter
- [ ] Comments
- [ ] Social sharing
- [ ] PWA (Progressive Web App)
- [ ] Analytics
- [ ] Automatic sitemap

## 🧪 Available Scripts

```bash
npm run dev      # Development
npm run build    # Build
npm run start    # Production
npm run lint     # Linting
```

## 📄 License

This project is licensed under the MIT license.

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

If you have questions or need help:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. See the [Sanity.io documentation](https://www.sanity.io/docs)
3. Open an issue in the repository
