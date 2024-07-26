import { Suspense } from "react";
import GalleryContainer from "@/components/GalleryContainer";

export default async function Home() {
  return (
    <main className="container mx-auto py-8">
      <Suspense fallback={<p>Loading...</p>}>
        <GalleryContainer />
      </Suspense>
    </main>
  );
}
