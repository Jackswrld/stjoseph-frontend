import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import { societyDirectory } from "../../data/mockData";

const warnedSocietyCodes = new Set()

// Warns once when the API returns a society code absent from the local directory.
function warnAboutUnknownSociety(code) {
  if (!warnedSocietyCodes.has(code)) {
    console.warn(`Unknown society code: ${code}`)
    warnedSocietyCodes.add(code)
  }
}

// Shows one society leader or a link to browse every society.
function LeaderCard({ leader, more = false }) {
  if (more)
    return (
      <Link className="leader-card leader-card--more" to="/societies">
        <span className="leader-card__more-icon">＋</span>
        <strong>More Societies</strong>
        <span>
          View All <ArrowRight size={14} />
        </span>
      </Link>
    );
  const society = societyDirectory[leader.society_code]
  if (!society) {
    warnAboutUnknownSociety(leader.society_code)
    return null
  }
  return (
    <article className="leader-card">
      <Avatar
        name={leader.name}
        photo={leader.photo}
        className="leader-card__avatar"
      />
      {!leader.photo && (
        <span className="leader-card__short">{society.short_name}</span>
      )}
      <p>{society.full_name}</p>
      <strong>{leader.name}</strong>
      <span>{leader.role}</span>
    </article>
  );
}
export default LeaderCard;
