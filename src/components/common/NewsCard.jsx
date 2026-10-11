import { motion, useReducedMotion } from 'framer-motion'

// Shows one news item with image, category, title, excerpt, and date.
function NewsCard({ news }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="news-card"
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <img src={news.image} alt={news.title} />
      <div className="news-card__body">
        <span className="news-card__badge">{news.category}</span>
        <h3>{news.title}</h3>
        <p>{news.excerpt}</p>
        <time>{news.published_date}</time>
      </div>
    </motion.article>
  )
}

export default NewsCard
