// Formats gallery image dates and builds responsive Cloudinary image URLs.
export function formatGalleryDate(dateTaken) {
  if (!dateTaken) return ''
  const [year, month, day] = dateTaken.split('-').map(Number)
  if (!year || !month || !day) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

export function buildImageProps(url) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return { src: url }
  }

  const makeUrl = (width) =>
    url.replace('/upload/', `/upload/c_limit,w_${width}/f_auto/q_auto/`)
  const widths = [400, 600, 800, 1200]

  return {
    src: makeUrl(800),
    srcSet: widths.map((width) => `${makeUrl(width)} ${width}w`).join(', '),
    sizes: '(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw',
  }
}

// Builds the largest responsive image sources for the gallery lightbox.
export function buildLightboxImageProps(url) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return { src: url }
  }

  const makeUrl = (width) =>
    url.replace('/upload/', `/upload/c_limit,w_${width}/f_auto/q_auto/`)
  const widths = [800, 1200, 1600]

  return {
    src: makeUrl(1600),
    srcSet: widths.map((width) => `${makeUrl(width)} ${width}w`).join(', '),
    sizes: '100vw',
  }
}
