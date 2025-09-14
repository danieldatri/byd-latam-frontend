import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {Calendar as CalendarIcon, Grid, SortAsc} from "lucide-react";
import { Category, Country, Post } from "@/lib/sanity";
import type { DateRange } from "react-day-picker";

export interface FilterBarProps {
  categories: Category[];
  countries: Country[];
  allPosts: Post[];
  onFilterChange: (filteredPosts: Post[], filterState: any) => void;
  initialCategory?: string | null;
  initialCountry?: string | null;
  initialSortOrder?: string;
  foundCount?: number; // nuevo opcional
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  countries,
  allPosts,
  onFilterChange,
  initialCategory = null,
  initialCountry = null,
  initialSortOrder = "newest",
  foundCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(initialCountry);
  const [sortOrder, setSortOrder] = useState<string>(initialSortOrder);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ from: undefined, to: undefined });
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
  useEffect(() => {
    let filteredPosts = allPosts;
    if (selectedCategory) {
      filteredPosts = filteredPosts.filter(post =>
        Array.isArray(post.categories)
          ? post.categories.some((cat: Category) => cat._id === selectedCategory)
          : false
      );
    }
    if (selectedCountry) {
      filteredPosts = filteredPosts.filter(post => post.country?._id === selectedCountry);
    }
    // Date filter logic
    if ((selectedDateRange.from && selectedDateRange.to) || selectedShortcut) {
      let from: Date | undefined = selectedDateRange.from;
      let to: Date | undefined = selectedDateRange.to;
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
    onFilterChange(filteredPosts, {
      selectedCategory,
      selectedCountry,
      sortOrder,
      selectedDateRange,
      selectedShortcut,
    });
  }, [selectedCategory, selectedCountry, sortOrder, selectedDateRange, selectedShortcut, allPosts, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-card p-4 rounded-lg border">
      {/* Artículos encontrados count with Grid icon restored */}
      <div className="flex items-center gap-2 mb-2 w-full">
        <Grid className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-gray-600">{(foundCount ?? allPosts.length)} artículos encontrados</span>
      </div>
      {/* Category Filter (no label) */}
      <div className="flex flex-col">
        <select
          id="category-select"
          className="filter-select px-3 py-2 border rounded-md text-sm min-w-[160px] text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 hover:bg-gray-100"
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
          className="filter-select px-3 py-2 border rounded-md text-sm min-w-[160px] text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 hover:bg-gray-100"
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
            <button
              type="button"
              className="filter-date-btn px-3 py-2 border rounded-md text-sm min-w-[160px] flex items-center gap-2 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 hover:bg-gray-100"
            >
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              {selectedShortcut
                ? (selectedShortcut === "week" ? "Última semana" : selectedShortcut === "month" ? "Último mes" : "Último año")
                : (selectedDateRange.from && selectedDateRange.to)
                  ? `${selectedDateRange.from.toLocaleDateString()} - ${selectedDateRange.to.toLocaleDateString()}`
                  : "Elegir fecha"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex gap-6 w-fit">
            <div className="flex flex-col gap-2 min-w-[140px]">
              <span className="font-semibold mb-2">Atajos</span>
              <Button
                variant={selectedShortcut === "week" ? "default" : "ghost"}
                onClick={() => {
                  setSelectedShortcut("week");
                  setSelectedDateRange({ from: undefined, to: undefined });
                  setDatePopoverOpen(false);
                }}
              >
                Última semana
              </Button>
              <Button
                variant={selectedShortcut === "month" ? "default" : "ghost"}
                onClick={() => {
                  setSelectedShortcut("month");
                  setSelectedDateRange({ from: undefined, to: undefined });
                  setDatePopoverOpen(false);
                }}
              >
                Último mes
              </Button>
              <Button
                variant={selectedShortcut === "year" ? "default" : "ghost"}
                onClick={() => {
                  setSelectedShortcut("year");
                  setSelectedDateRange({ from: undefined, to: undefined });
                  setDatePopoverOpen(false);
                }}
              >
                Último año
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedShortcut(null);
                  setSelectedDateRange({ from: undefined, to: undefined });
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
                  setSelectedDateRange(range ?? { from: undefined, to: undefined });
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
            className="filter-select px-3 py-2 border rounded-md text-sm min-w-[160px] text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 hover:bg-gray-100"
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
  );
};
