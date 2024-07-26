"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import unsplashApi from "@/lib/unsplash";
import { Suspense } from "react";

export default function Home() {
  const { data, error } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const result = await unsplashApi.photos.list({ perPage: 20 });
      return result.response?.results;
    },
  });

  if (error) {
    throw error;
  }

  return (
    <main className="container mx-auto py-8">
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
