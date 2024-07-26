"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import unsplashApi from "@/lib/unsplash";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error } = useQuery({
    queryKey: ["photos", searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        const result = await unsplashApi.search.getPhotos({
          query: searchQuery,
          perPage: 20,
        });
        return result.response?.results;
      } else {
        const result = await unsplashApi.photos.list({ perPage: 20 });
        return result.response?.results;
      }
    },
  });

  if (error) {
    throw error;
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((photo) => (
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
          ))}
        </div>
      </Suspense>
    </main>
  );
}
