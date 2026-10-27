import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { getCelebration, getMonthGrid } from '../../utils/liturgicalCalendar'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Renders a navigable month grid with liturgical celebrations and today's date.
function LiturgicalCalendar() {
  const [month, setMonth] = useState(() => { const now = new Date(); return new Date(now.getFullYear(), now.getMonth(), 1) })
  const monthIndex = month.getMonth(), year = month.getFullYear(), weeks = getMonthGrid(year, monthIndex)
  const today = new Date(), monthName = month.toLocaleDateString('en', { month: 'long', year: 'numeric' })
  function moveMonth(amount) { setMonth(new Date(year, monthIndex + amount, 1)) }
  return <div className="liturgical-calendar"><header><button type="button" aria-label="Previous month" onClick={() => moveMonth(-1)}><ChevronLeft size={19} /></button><h3>{monthName}</h3><button type="button" aria-label="Next month" onClick={() => moveMonth(1)}><ChevronRight size={19} /></button></header><div className="liturgical-calendar__grid">{weekdays.map((day) => <span className="liturgical-calendar__weekday" key={day}>{day}</span>)}{weeks.flatMap((week, weekIndex) => week.map((cell, dayIndex) => {
    if (!cell) return <span className="liturgical-calendar__empty" key={`empty-${weekIndex}-${dayIndex}`} />
    const celebration = getCelebration(cell.date), label = `${cell.date.toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}${celebration ? `: ${celebration.name}` : ''}`
    const isToday = cell.date.getFullYear() === today.getFullYear() && cell.date.getMonth() === today.getMonth() && cell.date.getDate() === today.getDate()
    return <span className={`liturgical-calendar__day${isToday ? ' liturgical-calendar__day--today' : ''}`} key={cell.date.getDate()} aria-label={label} title={label}><span>{cell.date.getDate()}</span>{celebration && <i className={`liturgical-calendar__dot liturgical-calendar__dot--${celebration.color}`} />}</span>
  }))}</div></div>
}
export default LiturgicalCalendar
