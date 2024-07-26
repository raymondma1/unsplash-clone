import { createApi } from 'unsplash-js';

if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
  throw new Error('Missing Unsplash access key');
}

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});


export default unsplashApi;
