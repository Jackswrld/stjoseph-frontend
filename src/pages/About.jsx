import PageHero from "../components/common/PageHero";
import QuoteLine from "../components/common/QuoteLine";
import ClergySection from "../components/about/ClergySection";
import OfficialsSection from "../components/about/OfficialsSection";
import SocietyLeadersSection from "../components/about/SocietyLeadersSection";
import LiturgicalSection from "../components/about/LiturgicalSection";
import usePeople from "../hooks/usePeople";
import heroImage from "../assets/images/about page.png";
import {
  aboutHero,
  churchInfo,
  clergyIntro,
  closingQuote,
  liturgicalBanner,
  parishGlance,
  scriptureCycleText,
} from "../data/mockData";

// Builds the About page from parish data and focused section components.
function About() {
  const people = usePeople();
  return (
    <>
      <PageHero
        image={heroImage}
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        subtitle={aboutHero.subtitle}
        quote={{ text: aboutHero.quote_text, source: aboutHero.quote_source }}
        showQuoteOnMobile
      />
      <main className="about-page">
        <ClergySection
          clergy={people.clergy}
          loading={people.loading}
          error={people.error}
          retry={people.retry}
          intro={clergyIntro}
          glance={parishGlance}
          address={churchInfo.address}
        />
        <div className="about-page__people">
          <OfficialsSection
            officials={people.officials}
            loading={people.loading}
            error={people.error}
            retry={people.retry}
          />
          <SocietyLeadersSection
            leaders={people.societyLeaders}
            loading={people.loading}
            error={people.error}
            retry={people.retry}
          />
        </div>
        <LiturgicalSection
          banner={liturgicalBanner}
          scriptureText={scriptureCycleText}
        />
        <QuoteLine text={closingQuote.text} source={closingQuote.source} />
      </main>
    </>
  );
}
export default About;
