"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { useUnsplashPhotos } from "@/hooks/useUnsplash";
import { Loader2 as Loader } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [sortBy, setSortBy] = useState<"relevant" | "latest">("relevant");

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUnsplashPhotos(debouncedSearchQuery, sortBy);

  if (error) {
    throw error;
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8 flex gap-4">
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Select
          value={sortBy}
          onValueChange={(value: "relevant" | "latest") => setSortBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevant">Relevant</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.pages.map((page) =>
            page.results.map((photo) => (
              <div
                key={photo.id}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description || "Unsplash photo"}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))
          )}
        </div>
      </Suspense>
      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? <Loader /> : "Load More"}{" "}
          </Button>
        </div>
      )}
    </main>
  );
}
