"use client";
import React, {useCallback, useState} from "react";
import {ArticleCard} from "@/components/article-card";
import {Button} from "@/components/ui/button";
import {Category, Country, Post} from "@/lib/sanity";
import {NoArticles} from "@/components/no-articles";
import {FilterBar} from "@/components/filter-bar";

interface NewsContentProps {
  allPosts: Post[];
  categories: Category[];
  countries: Country[];
}

export const NewsContent: React.FC<NewsContentProps> = ({ allPosts, categories, countries }) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts);

  const handleFilterChange = useCallback((posts: Post[]) => {
    setFilteredPosts(posts);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Filter Bar (reusable component) */}
      <FilterBar
        categories={categories}
        countries={countries}
        allPosts={allPosts}
        onFilterChange={handleFilterChange}
        foundCount={filteredPosts.length}
      />

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
