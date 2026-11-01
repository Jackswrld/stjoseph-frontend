import SectionHeader from "../common/SectionHeader";
import OfficialCard from "./OfficialCard";
import DataState from "../common/DataState";

// Introduces the people who support parish operations.
function OfficialsSection({ officials, loading, error, retry }) {
  return (
    <section className="officials-panel">
      <SectionHeader title="Key Church Officials" />
      <p className="officials-panel__intro">
        Meet the dedicated members who help keep our parish running smoothly.
      </p>
      <DataState loading={loading} error={error} retry={retry} empty={!officials.length}>
        <div className="officials-panel__grid">
        {officials.map((official) => (
          <OfficialCard key={official.id} official={official} />
        ))}
        </div>
      </DataState>
    </section>
  );
}
export default OfficialsSection;
