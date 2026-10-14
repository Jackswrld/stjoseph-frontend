import PageHero from '../components/common/PageHero'
import PriestBanner from '../components/mass/PriestBanner'
import SacramentsSection from '../components/mass/SacramentsSection'
import ScheduleOverview from '../components/mass/ScheduleOverview'
import adorationImage from '../assets/images/Adoration.jpeg'
import heroImage from '../assets/images/mass-hero.png'
import { massSchedule, sacramentsList } from '../data/mockData'

// Builds the Mass and Sacraments page from shared parish schedule data.
function MassSacraments() {
  return (
    <>
      <PageHero
        image={heroImage}
        eyebrow="FAITH • WORSHIP • TOGETHER"
        title="Mass & Sacraments"
        subtitle="The Church is a family, and we are all invited to encounter Christ through the sacraments, prayer and community."
        buttons={[
          { label: 'View Mass Schedule', href: '#mass-schedule', variant: 'gold', icon: 'calendar' },
          { label: 'Learn About Our Sacraments', href: '#sacraments', variant: 'outline-light' },
        ]}
        quote={{
          text: "The sacraments are the signs of God's love, given to us for our salvation.",
          source: 'CATECHISM OF THE CATHOLIC CHURCH',
        }}
      />
      <ScheduleOverview schedule={massSchedule} />
      <SacramentsSection sacraments={sacramentsList} />
      <PriestBanner image={adorationImage} />
    </>
  )
}

export default MassSacraments
