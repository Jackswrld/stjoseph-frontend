import { Users } from 'lucide-react'

// Shows the organising team when a name or team members are provided.
function EventTeam({ team }) {
  if (!team || (!team.name && !team.members?.length)) return null
  return (
    <section className="event-modal__section event-team" aria-labelledby="event-team-title">
      {team.image && <img className="event-team__image" src={team.image} alt="" />}
      <h3 id="event-team-title">{team.name || 'Organising Team'}</h3>
      {!!team.members?.length && <ul className="event-team__members">{team.members.map((member, index) => <li key={`${member.role}-${member.name}-${index}`}><Users size={15} aria-hidden="true" /><span>{member.role} – {member.name}</span></li>)}</ul>}
    </section>
  )
}

export default EventTeam
