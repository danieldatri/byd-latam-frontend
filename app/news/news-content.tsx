"use client";
import React, {useState} from "react";
import {ArticleCard} from "@/components/article-card";
import {Button} from "@/components/ui/button";
import {Grid} from "lucide-react";
import {Category, Country, Post} from "@/lib/sanity";
import { NoArticles } from "@/components/no-articles";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, SortAsc } from "lucide-react";

interface NewsContentProps {
  allPosts: Post[];
  categories: Category[];
  countries: Country[];
}

export const NewsContent: React.FC<NewsContentProps> = ({ allPosts, categories, countries }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);

  // Helper to get date range for shortcuts
  const getShortcutRange = (shortcut: string): { from: Date; to: Date } => {
    const now = new Date();
    let from: Date;
    if (shortcut === "week") {
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    } else if (shortcut === "month") {
      from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    } else if (shortcut === "year") {
      from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    } else {
      from = now;
    }
    return { from, to: now };
  };

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
  // Date filter logic
  if ((selectedDateRange.from && selectedDateRange.to) || selectedShortcut) {
    let from: Date | null = selectedDateRange.from;
    let to: Date | null = selectedDateRange.to;
    if (selectedShortcut) {
      const range = getShortcutRange(selectedShortcut);
      from = range.from;
      to = range.to;
    }
    filteredPosts = filteredPosts.filter(post => {
      const published = new Date(post.publishedAt);
      return from && to && published >= from && published <= to;
    });
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
        {/* Category Filter (no label) */}
        <div className="flex flex-col">
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
        {/* Region Filter (no label) */}
        <div className="flex flex-col">
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
        {/* Fecha Filter (icon only) */}
        <div className="flex flex-col">
          <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[160px] flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                {selectedShortcut
                  ? (selectedShortcut === "week" ? "Última semana" : selectedShortcut === "month" ? "Último mes" : "Último año")
                  : selectedDateRange.from && selectedDateRange.to
                  ? `${selectedDateRange.from.toLocaleDateString()} - ${selectedDateRange.to.toLocaleDateString()}`
                  : "Elegir fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex gap-6 w-fit">
              <div className="flex flex-col gap-2 min-w-[140px]">
                <span className="font-semibold mb-2">Atajos</span>
                <Button
                  variant={selectedShortcut === "week" ? "default" : "ghost"}
                  onClick={() => {
                    setSelectedShortcut("week");
                    setSelectedDateRange({ from: null, to: null });
                    setDatePopoverOpen(false);
                  }}
                >
                  Última semana
                </Button>
                <Button
                  variant={selectedShortcut === "month" ? "default" : "ghost"}
                  onClick={() => {
                    setSelectedShortcut("month");
                    setSelectedDateRange({ from: null, to: null });
                    setDatePopoverOpen(false);
                  }}
                >
                  Último mes
                </Button>
                <Button
                  variant={selectedShortcut === "year" ? "default" : "ghost"}
                  onClick={() => {
                    setSelectedShortcut("year");
                    setSelectedDateRange({ from: null, to: null });
                    setDatePopoverOpen(false);
                  }}
                >
                  Último año
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedShortcut(null);
                    setSelectedDateRange({ from: null, to: null });
                  }}
                  className="mt-2"
                >
                  Limpiar filtro
                </Button>
              </div>
              <div className="border-l pl-6">
                <Calendar
                  mode="range"
                  selected={selectedDateRange}
                  onSelect={range => {
                    setSelectedDateRange(range ?? { from: null, to: null });
                    setSelectedShortcut(null);
                  }}
                  numberOfMonths={2}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* Order By Filter (icon only, no label) */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-muted-foreground" />
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
