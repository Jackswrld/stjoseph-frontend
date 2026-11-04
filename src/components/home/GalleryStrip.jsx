import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Displays scrollable gallery cards with accessible desktop controls.
function GalleryStrip({ photos }) {
  const containerRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const updateEdges = () =>
      setEdges({
        start: container.scrollLeft <= 1,
        end:
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 1,
      });
    updateEdges();
    container.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      container.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [photos]);

  // Moves the strip by approximately one visible card.
  const scrollPhotos = (direction) => {
    const card = containerRef.current?.querySelector(".gallery-strip__card");
    if (!card) return;
    containerRef.current.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (!photos.length) return null;

  return (
    <div className="gallery-strip">
      <button
        className="gallery-strip__arrow gallery-strip__arrow--previous"
        type="button"
        aria-label="Previous photos"
        disabled={edges.start}
        onClick={() => scrollPhotos(-1)}
      >
        <ArrowLeft size={20} />
      </button>
      <div
        className="gallery-strip__scroller"
        role="region"
        aria-label="Gallery photos"
        tabIndex={0}
        ref={containerRef}
      >
        {photos.map((photo) => (
          <motion.figure
            className="gallery-strip__card"
            key={photo.id}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={photo.image}
              alt={photo.alt_text || photo.title}
              loading="lazy"
            />
            <figcaption>{photo.title}</figcaption>
          </motion.figure>
        ))}
      </div>
      <button
        className="gallery-strip__arrow gallery-strip__arrow--next"
        type="button"
        aria-label="Next photos"
        disabled={edges.end}
        onClick={() => scrollPhotos(1)}
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

export default GalleryStrip;
