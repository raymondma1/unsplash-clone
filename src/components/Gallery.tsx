import Image from "next/image";
import { Basic } from "unsplash-js/dist/methods/photos/types";

interface GalleryProps {
  photos: Basic[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg">
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
  );
};

export default Gallery;
