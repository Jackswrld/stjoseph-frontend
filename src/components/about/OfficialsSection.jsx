import SectionHeader from '../common/SectionHeader'
import OfficialCard from './OfficialCard'

// Introduces the people who support parish operations.
function OfficialsSection({ officials }) {
  return <section className="officials-panel"><SectionHeader title="Key Church Officials" /><p className="officials-panel__intro">Meet the dedicated members who help keep our parish running smoothly.</p><div className="officials-panel__grid">{officials.map((official) => <OfficialCard key={official.id} official={official} />)}</div></section>
}
export default OfficialsSection
