import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import GalleryStrip from "./GalleryStrip";

// Introduces the parish photo gallery and handles its data states.
function GallerySection({ photos, loading, error, retry }) {
  const reduceMotion = useReducedMotion();
  if (!loading && !error && !photos.length) return null;

  return (
    <motion.section
      id="gallery-preview"
      className="gallery-section"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
    >
      <div className="gallery-section__inner">
        <div className="gallery-section__content">
          <p className="gallery-section__eyebrow">Our Gallery</p>
          <h2>Moments of Faith</h2>
          <p className="gallery-section__subtitle">
            Photos from our celebrations, events and community life.
          </p>
          {loading && (
            <div className="gallery-section__loading" aria-live="polite">
              <span />
              <span />
              <span />
            </div>
          )}
          {error && (
            <div className="gallery-section__error">
              <p>Gallery photos could not be loaded.</p>
              <button
                className="button button--gold"
                type="button"
                onClick={retry}
              >
                Try again
              </button>
            </div>
          )}
          <Link
            className="button button--gold gallery-section__button"
            to="/gallery"
          >
            View Gallery <ArrowRight size={18} />
          </Link>
        </div>
        {!loading && !error && <GalleryStrip photos={photos} />}
      </div>
    </motion.section>
  );
}

export default GallerySection;
