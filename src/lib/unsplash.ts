interface UnsplashPhoto {
  url: string;          // regular size URL
  alt: string;
  photographer: string;
  photographerUrl: string;
  unsplashUrl: string;  // photo page URL (for attribution link)
}

export async function fetchHeroImage(query: string): Promise<UnsplashPhoto | null> {
  // import.meta.env is statically replaced by Vite at build time;
  // fall back to process.env for reliability in SSR/build contexts
  const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY ?? process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const photo = data.results?.[0];
    if (!photo) return null;

    return {
      url: photo.urls.regular,
      alt: photo.alt_description ?? query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html + '?utm_source=openclawalts&utm_medium=referral',
      unsplashUrl: photo.links.html + '?utm_source=openclawalts&utm_medium=referral',
    };
  } catch {
    return null;
  }
}
