import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import LeaderCard from "./LeaderCard";
import DataState from "../common/DataState";

// Introduces current leaders of the parish societies.
function SocietyLeadersSection({ leaders, loading, error, retry }) {
  return (
    <section className="leaders-panel">
      <div className="leaders-panel__heading">
        <SectionHeader title="Current Leaders of Our Societies" />
        <Link to="/societies">
          View All Societies <ArrowRight size={16} />
        </Link>
      </div>
      <p className="leaders-panel__intro">
        Our societies are the heartbeat of our parish, working together in
        service, fellowship and evangelization.
      </p>
      <DataState loading={loading} error={error} retry={retry} empty={!leaders.length}>
        <div className="leaders-panel__grid">
        {leaders.map((leader) => (
          <LeaderCard key={leader.id} leader={leader} />
        ))}
        {leaders.length > 0 && <LeaderCard more />}
      </div>
      </DataState>
    </section>
  );
}
export default SocietyLeadersSection;
