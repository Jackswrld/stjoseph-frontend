import PageHero from '../components/common/PageHero'
import QuoteLine from '../components/common/QuoteLine'
import ClergySection from '../components/about/ClergySection'
import OfficialsSection from '../components/about/OfficialsSection'
import SocietyLeadersSection from '../components/about/SocietyLeadersSection'
import LiturgicalSection from '../components/about/LiturgicalSection'
import heroImage from '../assets/images/about page.png'
import { aboutHero, churchInfo, clergyIntro, clergyList, closingQuote, officialsList, liturgicalBanner, parishGlance, scriptureCycleText, societyLeaders } from '../data/mockData'

// Builds the About page from parish data and focused section components.
function About() {
  return <>
    <PageHero image={heroImage} eyebrow={aboutHero.eyebrow} title={aboutHero.title} subtitle={aboutHero.subtitle} quote={{ text: aboutHero.quote_text, source: aboutHero.quote_source }} showQuoteOnMobile />
    <main className="about-page">
      <ClergySection clergy={clergyList} intro={clergyIntro} glance={parishGlance} address={churchInfo.address} />
      <div className="about-page__people"><OfficialsSection officials={officialsList} /><SocietyLeadersSection leaders={societyLeaders} /></div>
      <LiturgicalSection banner={liturgicalBanner} scriptureText={scriptureCycleText} />
      <QuoteLine text={closingQuote.text} source={closingQuote.source} />
    </main>
  </>
}
export default About
