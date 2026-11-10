import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import ScriptureBanner from '../components/common/ScriptureBanner'
import GalleryFilterBar from '../components/gallery/GalleryFilterBar'
import GalleryGrid from '../components/gallery/GalleryGrid'
import GalleryMessage from '../components/gallery/GalleryMessage'
import GalleryResultCount from '../components/gallery/GalleryResultCount'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import galleryHeroImage from '../assets/images/gallery banner.jpg'
import galleryContent from '../data/galleryContent'
import { getGalleryCategories, getGalleryImages } from '../services/api'

// Builds the routed Gallery page from the live gallery API.
function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''
  const [categories, setCategories] = useState([])
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
  const [photos, setPhotos] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState(false)
  const [moreError, setMoreError] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [retryVersion, setRetryVersion] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const moreControllerRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    getGalleryCategories({ signal: controller.signal })
      .then((result) => setCategories(Array.isArray(result) ? result : []))
      .catch((error) => {
        if (error.name !== 'AbortError') setCategories([])
      })
      .finally(() => {
        if (!controller.signal.aborted) setCategoriesLoaded(true)
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!categoriesLoaded || !selectedCategory) return
    if (!categories.some((category) => category.slug === selectedCategory)) {
      const next = new URLSearchParams(searchParams)
      next.delete('category')
      setSearchParams(next, { replace: true })
    }
  }, [categories, categoriesLoaded, searchParams, selectedCategory, setSearchParams])

  useEffect(() => {
    const controller = new AbortController()
    moreControllerRef.current?.abort()
    // This reset displays skeletons and drops stale data for the new request key.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setPageError(false)
    setMoreError(false)
    setLoadingMore(false)
    setPhotos([])
    setCount(0)
    setPage(1)
    setHasMore(false)

    getGalleryImages({ category: selectedCategory, page: 1, signal: controller.signal })
      .then((result) => {
        if (controller.signal.aborted) return
        setPhotos(result.results || [])
        setCount(result.count || 0)
        setHasMore(result.next !== null)
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && !controller.signal.aborted) setPageError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [selectedCategory, retryVersion])

  useEffect(() => {
    if (selectedIndex !== null && (selectedIndex < 0 || selectedIndex >= photos.length)) {
      // Close a viewer if replacing the first page invalidates its selected index.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIndex(null)
    }
  }, [photos.length, selectedIndex])

  const setCategory = useCallback((category) => {
    setSelectedIndex(null)
    const next = new URLSearchParams(searchParams)
    if (category) next.set('category', category)
    else next.delete('category')
    setSearchParams(next)
  }, [searchParams, setSearchParams])

  const closeLightbox = useCallback(() => setSelectedIndex(null), [])

  const fetchMore = useCallback(async () => {
    if (loadingMore || !hasMore) return
    const nextPage = page + 1
    const controller = new AbortController()
    moreControllerRef.current = controller
    setLoadingMore(true)
    setMoreError(false)
    try {
      const result = await getGalleryImages({ category: selectedCategory, page: nextPage, signal: controller.signal })
      if (controller.signal.aborted) return
      setPhotos((current) => {
        const ids = new Set(current.map((photo) => photo.id))
        return [...current, ...result.results.filter((photo) => !ids.has(photo.id))]
      })
      setCount(result.count || 0)
      setHasMore(result.next !== null)
      setPage(nextPage)
    } catch (error) {
      if (error.name !== 'AbortError' && !controller.signal.aborted) setMoreError(true)
    } finally {
      if (!controller.signal.aborted) setLoadingMore(false)
    }
  }, [hasMore, loadingMore, page, selectedCategory])

  return (
    <>
      <PageHero
        image={galleryHeroImage}
        eyebrow={galleryContent.eyebrow}
        title={galleryContent.heading}
        subtitle={galleryContent.subtitle}
        variant="gallery"
      />
      <section className="gallery-page" aria-label="Parish photo gallery">
        <div className="gallery-page__inner">
          <GalleryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setCategory}
          />
          {pageError ? (
            <GalleryMessage
              message="Gallery photos could not be loaded."
              actionLabel="Try again"
              onAction={() => setRetryVersion((version) => version + 1)}
            />
          ) : !loading && photos.length === 0 ? (
            <GalleryMessage message="No photos in this category yet." />
          ) : (
            <GalleryGrid photos={photos} loading={loading} onOpen={setSelectedIndex} />
          )}
          {moreError && (
            <GalleryMessage
              message="More photos could not be loaded."
              actionLabel="Try again"
              onAction={fetchMore}
            />
          )}
          {!loading && !pageError && count > 0 && (
            <GalleryResultCount shown={photos.length} count={count} />
          )}
          {hasMore && !pageError && (
            <button
              className="gallery-page__load-more"
              type="button"
              onClick={fetchMore}
              disabled={loadingMore}
              aria-busy={loadingMore}
            >
              {loadingMore ? 'Loading...' : 'Load More Photos'}
              {!loadingMore && <ArrowDown size={16} aria-hidden="true" />}
            </button>
          )}
          <ScriptureBanner verse={galleryContent.verse} reference={galleryContent.reference} />
        </div>
      </section>
      {selectedIndex !== null && (
        <GalleryLightbox
          images={photos}
          index={selectedIndex}
          onClose={closeLightbox}
          onIndexChange={setSelectedIndex}
        />
      )}
    </>
  )
}

export default GalleryPage

