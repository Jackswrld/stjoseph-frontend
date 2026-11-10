import {
  CalendarDays,
  Church,
  Grid2X2,
  Heart,
  Image,
  Shield,
  Star,
  Users,
} from 'lucide-react'

const iconBySlug = {
  all: Grid2X2,
  'mass-sacraments': Church,
  'church-events': CalendarDays,
  'parish-activities': Users,
  societies: Shield,
  'community-service': Heart,
  'special-occasions': Star,
}

// Renders accessible category toggle buttons for the gallery.
function GalleryFilterBar({ categories, selectedCategory, onSelect }) {
  const filters = [{ slug: 'all', name: 'All Photos' }, ...categories]

  return (
    <div className="gallery-filter" role="group" aria-label="Filter photos by category">
      {filters.map((category) => {
        const Icon = iconBySlug[category.slug] || Image
        const selected = (selectedCategory || 'all') === category.slug
        return (
          <button
            className={`gallery-filter__chip${selected ? ' gallery-filter__chip--selected' : ''}`}
            type="button"
            aria-pressed={selected}
            key={category.slug}
            onClick={() => onSelect(category.slug === 'all' ? '' : category.slug)}
          >
            <Icon size={16} aria-hidden="true" />
            {category.name}
          </button>
        )
      })}
    </div>
  )
}

export default GalleryFilterBar
