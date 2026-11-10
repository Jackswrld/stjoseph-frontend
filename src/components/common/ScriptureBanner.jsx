 import parishImage from '../../assets/images/scripture banner.jpg'

// Displays a short mobile-only scripture banner below the gallery controls.
function ScriptureBanner({ verse, reference }) {
  return (
    <aside className="scripture-banner">
      <img className="scripture-banner__image" src={parishImage} alt="" aria-hidden="true" />
      <div className="scripture-banner__content">
        <p>“{verse}”</p>
        <cite>- {reference}</cite>
      </div>
    </aside>
  )
}

export default ScriptureBanner
