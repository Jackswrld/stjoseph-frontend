// Shows configured parish social links with accessible platform icons.
function SocialLinks({ links = [] }) {
  const icons = {
    facebook: 'fa-brands fa-facebook-f',
    instagram: 'fa-brands fa-instagram',
    youtube: 'fa-brands fa-youtube',
    tiktok: 'fa-brands fa-tiktok',
  }
  const visibleLinks = links.filter((link) => link.url.trim())

  if (!visibleLinks.length) return null

  return (
    <ul className="social-links" aria-label="Social media">
      {visibleLinks.map((link) => (
        <li key={link.id}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`St. Joseph on ${link.label} (opens in a new tab)`}>
            <i className={icons[link.id]} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
