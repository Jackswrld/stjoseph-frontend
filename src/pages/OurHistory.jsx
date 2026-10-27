import { Link } from 'react-router-dom'

// Provides a short placeholder until the parish publishes its full history.
function OurHistory() {
  return <main className="history-page"><h1>Our History</h1><p>The full history of our parish will be published here soon.</p><Link to="/about">Back to About</Link></main>
}
export default OurHistory
