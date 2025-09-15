"use client";
import * as React from "react";
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ArticleCard } from "@/components/article-card";

interface RelatedArticlesCarouselProps {
  posts: any[];
}

export const RelatedArticlesCarousel: React.FC<RelatedArticlesCarouselProps> = ({ posts }) => {
  const [index, setIndex] = React.useState(0);
  const maxIndex = Math.max(0, posts.length - 2);

  if (!posts || posts.length === 0) {
    return (
      <div className="mt-12">
        <SectionHeader name="Podría Interesarte" icon={TrendingUp} />
        <div className="text-center py-8 text-muted-foreground">
          No hay artículos relacionados disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <SectionHeader name="Podría Interesarte" icon={TrendingUp} />
      <div className="relative flex items-center">
        {/* Left arrow */}
        {posts.length > 2 && (
          <button
            className="absolute left-0 z-10 bg-background rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-40"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            aria-label="Previous"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        {/* Cards */}
        <div className="w-full flex justify-center gap-6">
          {posts.slice(index, index + 2).map((article: any) => (
            <ArticleCard article={article} key={article._id} />
          ))}
        </div>
        {/* Right arrow */}
        {posts.length > 2 && (
          <button
            className="absolute right-0 z-10 bg-background rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-40"
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
            disabled={index >= maxIndex}
            aria-label="Next"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

