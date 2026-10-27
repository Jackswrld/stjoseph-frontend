// Shows a person's photo, or an accessible-safe initials circle when no photo is available.
function Avatar({ name, photo, className = '' }) {
  const initials = name.split(' ').filter(Boolean).slice(-2).map((part) => part[0]).join('').toUpperCase()
  return photo ? <img className={`avatar ${className}`} src={photo} alt={name} /> : <span className={`avatar avatar--initials ${className}`} aria-hidden="true">{initials}</span>
}
export default Avatar
