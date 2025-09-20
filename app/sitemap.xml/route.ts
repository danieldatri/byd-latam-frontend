import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bydlatamnews.com";

export async function GET() {
  // Fetch article slugs
  const articles = await client.fetch(`*[_type == "post" && defined(slug.current)]{ slug }`);
  // Fetch country slugs
  const countries = await client.fetch(`*[_type == "country" && defined(slug.current)]{ slug }`);

  // Static URLs
  const staticUrls = [
    "",
    "articles",
    "news",
    "privacy-policy",
    "terms-of-use",
    "search"
  ];

  // Generate XML
  let urls = staticUrls.map(
    (path) => `<url><loc>${BASE_URL}/${path}</loc></url>`
  );

  // Articles
  urls = urls.concat(
    articles.map(
      (a) => `<url><loc>${BASE_URL}/article/${a.slug.current}</loc></url>`
    )
  );

  // Countries
  urls = urls.concat(
    countries.map(
      (c) => `<url><loc>${BASE_URL}/region/${c.slug.current}</loc></url>`
    )
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
