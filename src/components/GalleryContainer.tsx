"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useUnsplashPhotos } from "@/hooks/useUnsplash";
import { Loader2 as Loader } from "lucide-react";
import { ColorId } from "unsplash-js";
import { Button } from "@/components/ui/button";
import Gallery from "@/components/Gallery";
import { SearchInput } from "@/components/SearchInput";
import { SortSelect } from "@/components/SortSelect";
import { ColorFilter } from "@/components/ColorOptions";

export default function GalleryContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [colorFilter, setColorFilter] = useState<ColorId | null>(null);
  const [sortBy, setSortBy] = useState<"relevant" | "latest">("relevant");

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUnsplashPhotos(debouncedSearchQuery, sortBy, colorFilter, 20);

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className="mb-8 flex gap-4">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>
      {searchQuery && (
        <ColorFilter
          selectedColor={colorFilter}
          onColorSelect={setColorFilter}
        />
      )}
      {data?.pages[0]?.results.length ? (
        <Gallery photos={data.pages.flatMap((page) => page.results)} />
      ) : isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <p className="text-center text-gray-500">No results</p>
      )}
      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? <Loader /> : "Load More"}{" "}
          </Button>
        </div>
      )}
    </>
  );
}
