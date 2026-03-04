export function slugifyCarName(brand, model) {
  return `${brand || ''}-${model || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeBackendUrl(imageUrl, apiBase) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  if (imageUrl.startsWith('/')) return `${apiBase}${imageUrl}`;
  return `${apiBase}/${imageUrl}`;
}

export function getCarImageCandidates(car, apiBase) {
  const slug = slugifyCarName(car?.brand, car?.model);
  const localCandidates = ['png', 'jpg', 'jpeg', 'webp', 'avif'].map(
    (ext) => `/car-images/${slug}.${ext}`
  );

  const backendCandidate = normalizeBackendUrl(car?.imageUrl, apiBase);
  const fallback = 'https://placehold.co/900x540?text=No+Image';

  return [...new Set([...localCandidates, backendCandidate, fallback].filter(Boolean))];
}
