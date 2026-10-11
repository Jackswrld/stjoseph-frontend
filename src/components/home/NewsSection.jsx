import { motion, useReducedMotion } from 'framer-motion'
import NewsCard from '../common/NewsCard'
import SectionHeader from '../common/SectionHeader'

// Lists the latest parish news and announcements.
function NewsSection({ news }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="news-section"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <SectionHeader
        eyebrow="Parish Updates"
        title="Latest News & Announcements"
        actionLabel="View All News"
        actionUrl="/parish-news"
      />
      <div className="news-section__grid">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
      <div className="news-section__dots" aria-hidden="true">
        {news.map((item) => (
          <span key={item.id} />
        ))}
      </div>
    </motion.section>
  )
}

export default NewsSection
