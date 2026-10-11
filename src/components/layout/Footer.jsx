import { Link } from 'react-router-dom'

// Provides simple parish details and quick links.
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <h2>St. Joseph Catholic Church</h2>
          <p>Parish Road, Catholic Diocese. A family of faith, prayer and service.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link to="/mass-sacraments">Mass & Sacraments</Link>
          <Link to="/parish-news">Parish News</Link>
          <Link to="/societies">Societies</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <p>Office: Mon-Fri, 9:00 AM - 4:00 PM</p>
          <p>Email: parish@stjosephchurch.org</p>
          <p>Phone: +234 800 000 0000</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
