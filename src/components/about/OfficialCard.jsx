import { Phone } from "lucide-react";
import Avatar from "../common/Avatar";

// Displays an official's name, parish role, portrait and tap-to-call number.
function OfficialCard({ official }) {
  return (
    <article className="official-card">
      <Avatar name={official.name} photo={official.photo} />
      <h3>{official.name}</h3>
      <p>{official.role}</p>
      {official.phone && <a
        href={`tel:${official.phone.replaceAll(" ", "")}`}
        aria-label={`Call ${official.name}`}
      >
        <Phone size={14} />
        {official.phone}
      </a>}
    </article>
  );
}
export default OfficialCard;
