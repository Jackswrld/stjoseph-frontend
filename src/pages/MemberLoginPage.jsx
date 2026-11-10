import { Link } from 'react-router-dom'

// Temporary placeholder for the future member login section.
function MemberLoginPage() {
  return (
    <section className="member-login-page">
      <div className="member-login-page__content">
        <h1>Member Login</h1>
        <p>This section is coming soon.</p>
        <Link className="member-login-page__link" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default MemberLoginPage
