import EventsSection from '../components/home/EventsSection'
import Hero from '../components/home/Hero'
import InfoBar from '../components/home/InfoBar'
import JoinBanner from '../components/home/JoinBanner'
import NewsSection from '../components/home/NewsSection'
import SocietiesSection from '../components/home/SocietiesSection'
import {
  eventsList,
  infoBarItems,
  massToday,
  newsList,
  societiesList,
} from '../data/mockData'

// Builds the St. Joseph Catholic Church homepage from mock data.
function Home() {
  return (
    <>
      <Hero />
      <InfoBar items={infoBarItems} mass={massToday} />
      <div className="home-content">
        <div className="home-content__news-events">
          <NewsSection news={newsList} />
          <EventsSection events={eventsList} />
        </div>
        <SocietiesSection societies={societiesList} />
        <JoinBanner />
      </div>
    </>
  )
}

export default Home
