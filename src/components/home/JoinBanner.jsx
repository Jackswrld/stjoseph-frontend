import footerBand from '../../assets/images/home banner.png'

// Invites visitors to join the parish community.
function JoinBanner() {
  return (
    <section className="join-banner" style={{ backgroundImage: `url("${footerBand}")` }}>
      <div className="join-banner__overlay" />
      <div className="join-banner__content">
        <p>Join Our Parish Community</p>
        <h2>A Church Family, United in Christ</h2>
        <span>Be part of a family that prays, serves and grows together.</span>
      </div>
    </section>
  )
}

export default JoinBanner
