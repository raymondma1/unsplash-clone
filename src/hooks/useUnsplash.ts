import { useInfiniteQuery } from '@tanstack/react-query';
import unsplashApi from "@/lib/unsplash";
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import { ColorId, OrderBy } from 'unsplash-js';

export function useUnsplashPhotos(query: string, sortBy: 'relevant' | 'latest', colorFilter: ColorId | null, perPage: number = 20) {
  return useInfiniteQuery<Photos, Error>({
    queryKey: ['unsplashPhotos', query, sortBy, colorFilter],
    queryFn: async ({ pageParam = 1 }) => {
      if (query) {
        const result = await unsplashApi.search.getPhotos({
          query,
          page: pageParam as number,
          perPage,
          orderBy: sortBy === 'latest' ? OrderBy.LATEST : 'relevant',
          color: colorFilter || undefined,
        });

        if (!result.response) {
          throw new Error('Failed');
        }

        return result.response;
      } else {
        const result = await unsplashApi.photos.list({
          page: pageParam as number,
          perPage,
          orderBy: sortBy === 'latest' ? OrderBy.LATEST : OrderBy.POPULAR,
        });

        if (!result.response) {
          throw new Error('Failed');
        }

        return {
          ...result.response,
          total_pages: Math.ceil(result.response.total / perPage),
        };
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.total_pages > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    retry: false,
  });
}