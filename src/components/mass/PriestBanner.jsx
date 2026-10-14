import { ArrowRight, ChevronRight, MessageCircleHeart } from 'lucide-react'
import { Link } from 'react-router-dom'

// Offers a contact path for parishioners who need priestly guidance.
function PriestBanner({ image }) {
  return (
    <section className="priest-banner" aria-label="Speak with a priest">
      <div className="priest-banner__desktop">
        <div className="priest-banner__image">
          <img src={image} alt="Monstrance with candles during adoration" />
        </div>
        <blockquote>
          "Come to me, all you who are weary and burdened, and I will give you rest."
          <cite>MATTHEW 11:28</cite>
        </blockquote>
        <span className="priest-banner__divider" aria-hidden="true" />
        <div className="priest-banner__content">
          <span className="priest-banner__icon">
            <MessageCircleHeart size={24} />
          </span>
          <div>
            <h2>Need to speak with a priest?</h2>
            <p>
              For counselling, spiritual guidance or any other need, please contact the parish office or visit the
              confession room during the times listed above.
            </p>
            <Link className="button button--gold" to="/contact">
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <Link className="priest-banner__mobile" to="/contact">
        <span className="priest-banner__icon">
          <MessageCircleHeart size={22} />
        </span>
        <span>Need to speak with a priest?</span>
        <ChevronRight size={20} />
      </Link>
    </section>
  )
}

export default PriestBanner
