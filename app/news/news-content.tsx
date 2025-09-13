"use client";
import React, {useState} from "react";
import {ArticleCard} from "@/components/article-card";
import {Button} from "@/components/ui/button";
import {Grid} from "lucide-react";
import {Category, Country, Post} from "@/lib/sanity";
import { NoArticles } from "@/components/no-articles";

interface NewsContentProps {
  allPosts: Post[];
  categories: Category[];
  countries: Country[];
}

export const NewsContent: React.FC<NewsContentProps> = ({ allPosts, categories, countries }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("newest");

  // Filtering logic
  let filteredPosts = allPosts;
  if (selectedCategory) {
    filteredPosts = filteredPosts.filter(post =>
      post.categories?.some(cat => cat._id === selectedCategory)
    );
  }
  if (selectedCountry) {
    filteredPosts = filteredPosts.filter(post => post.country?._id === selectedCountry);
  }

  // Sorting logic
  if (sortOrder === "newest") {
    filteredPosts = filteredPosts.slice().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else if (sortOrder === "oldest") {
    filteredPosts = filteredPosts.slice().sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
  } else if (sortOrder === "title") {
    filteredPosts = filteredPosts.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="min-h-screen">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-card p-4 rounded-lg border">
        {/* Category Filter */}
        <div className="flex flex-col">
          <label htmlFor="category-select" className="text-sm font-semibold mb-1">Categoría</label>
          <select
            id="category-select"
            className="px-3 py-2 border rounded-md text-sm min-w-[160px]"
            value={selectedCategory ?? ""}
            onChange={e => setSelectedCategory(e.target.value || null)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category: Category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        {/* Region Filter (was Country) */}
        <div className="flex flex-col">
          <label htmlFor="country-select" className="text-sm font-semibold mb-1">Región</label>
          <select
            id="country-select"
            className="px-3 py-2 border rounded-md text-sm min-w-[160px]"
            value={selectedCountry ?? ""}
            onChange={e => setSelectedCountry(e.target.value || null)}
          >
            <option value="">Todas las regiones</option>
            {countries.map((country: Country) => (
              <option key={country._id} value={country._id}>
                {country.emoji ? `${country.emoji} ` : ""}{country.name}
              </option>
            ))}
          </select>
        </div>
        {/* Order By Filter */}
        <div className="flex flex-col">
          <label htmlFor="order-select" className="text-sm font-semibold mb-1">Ordenar por</label>
          <select
            id="order-select"
            className="px-3 py-2 border rounded-md text-sm min-w-[160px]"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antiguo</option>
            <option value="title">Título A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center gap-2 mb-6">
        <Grid className="h-5 w-5" />
        <span className="text-sm text-gray-600">
          {filteredPosts.length} artículos encontrados
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(article => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      {/* No Articles Message */}
      {filteredPosts && filteredPosts.length === 0 && (
        <NoArticles />
      )}

      {/* Load More Button */}
      {filteredPosts && filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Cargar más artículos
          </Button>
        </div>
      )}
    </div>
  );
};
