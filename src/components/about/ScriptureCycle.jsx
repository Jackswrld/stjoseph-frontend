import { getLiturgicalYearLetter } from '../../utils/liturgicalCalendar'

const cycles = [['A', 'Matthew'], ['B', 'Mark'], ['C', 'Luke']]

// Explains the Sunday reading cycle and highlights the current year.
function ScriptureCycle({ text }) {
  const current = getLiturgicalYearLetter(new Date())
  return <div className="scripture-cycle"><h3>Sunday Scripture Cycle</h3><span className="scripture-cycle__line" /><p>{text}</p><div>{cycles.map(([year, gospel]) => <p className={current === year ? 'scripture-cycle__row scripture-cycle__row--current' : 'scripture-cycle__row'} key={year}><strong>Year {year}</strong><span>Gospel of {gospel}</span>{current === year && <em>Current</em>}</p>)}</div></div>
}
export default ScriptureCycle
