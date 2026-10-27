// Returns a local-time Date for Easter Sunday using Meeus/Jones/Butcher.
export function getEaster(year) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451), month = Math.floor((h + l - 7 * m + 114) / 31)
  return new Date(year, month - 1, ((h + l - 7 * m + 114) % 31) + 1)
}
// Returns the first Sunday of Advent in the given calendar year.
export function getFirstSundayOfAdvent(year) {
  const christmas = new Date(year, 11, 25)
  const daysBeforeSunday = christmas.getDay() === 0 ? 7 : christmas.getDay()
  return new Date(year, 11, 25 - daysBeforeSunday - 21)
}
function dateNumber(date) { return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() }
function sameDate(a, b) { return dateNumber(a) === dateNumber(b) }
function addDays(date, amount) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount) }
function weeksBetween(a, b) { return Math.floor((new Date(b.getFullYear(), b.getMonth(), b.getDate()) - new Date(a.getFullYear(), a.getMonth(), a.getDate())) / 604800000) }
function firstSundayAfter(date) { const step = date.getDay() === 0 ? 7 : 7 - date.getDay(); return addDays(date, step) }
function baptism(year) { return firstSundayAfter(new Date(year, 0, 6)) }
function ordinal(number) { const mod100 = number % 100; const suffix = mod100 >= 11 && mod100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] || 'th'); return `${number}${suffix}` }
// Returns A, B, or C for the liturgical year containing the supplied date.
export function getLiturgicalYearLetter(date) {
  const year = date.getFullYear() + (dateNumber(date) >= dateNumber(getFirstSundayOfAdvent(date.getFullYear())) ? 1 : 0)
  return year % 3 === 1 ? 'A' : year % 3 === 2 ? 'B' : 'C'
}
// Returns the Church season and its display colour for the supplied local date.
export function getSeason(date) {
  const year = date.getFullYear(), easter = getEaster(year), ash = addDays(easter, -46), pentecost = addDays(easter, 49)
  const advent = getFirstSundayOfAdvent(year), current = dateNumber(date)
  if (current >= dateNumber(advent) && date.getMonth() === 11 && date.getDate() <= 24) return { key: 'advent', name: 'Advent', color: 'violet' }
  if (date.getMonth() === 11 && date.getDate() >= 25) return { key: 'christmas', name: 'Christmas', color: 'white' }
  const priorBaptism = baptism(year - 1)
  if (date.getMonth() === 0 && current <= dateNumber(baptism(year))) return { key: 'christmas', name: 'Christmas', color: 'white' }
  if (current >= dateNumber(ash) && current < dateNumber(easter)) return { key: 'lent', name: 'Lent', color: 'violet' }
  if (current >= dateNumber(easter) && current <= dateNumber(pentecost)) return { key: 'easter', name: 'Easter', color: 'white' }
  if (current > dateNumber(baptism(year)) && current < dateNumber(ash) || current > dateNumber(pentecost) && current < dateNumber(advent)) return { key: 'ordinary', name: 'Ordinary Time', color: 'green' }
  if (dateNumber(date) <= dateNumber(priorBaptism) && date.getMonth() === 0) return { key: 'christmas', name: 'Christmas', color: 'white' }
  return { key: 'ordinary', name: 'Ordinary Time', color: 'green' }
}
// Returns a named solemnity or Sunday celebration, when one applies.
export function getCelebration(date) {
  const year = date.getFullYear(), easter = getEaster(year), season = getSeason(date)
  const movable = [
    [addDays(easter, -46), 'Ash Wednesday', 'violet'], [addDays(easter, -7), 'Palm Sunday', 'red'],
    [addDays(easter, -3), 'Holy Thursday', 'white'], [addDays(easter, -2), 'Good Friday', 'red'],
    [addDays(easter, -1), 'Holy Saturday', 'violet'], [easter, 'Easter Sunday', 'white'],
    [addDays(easter, 49), 'Pentecost', 'red'], [addDays(easter, 56), 'Trinity Sunday', 'white'],
    [baptism(year), 'Baptism of the Lord', 'white'],
  ]
  const advent = getFirstSundayOfAdvent(year), christKing = addDays(advent, -7)
  movable.push([christKing, 'Our Lord Jesus Christ, King of the Universe', 'white'])
  for (const [day, name, color] of movable) if (sameDate(date, day)) return { name, color }
  const fixed = [
    [[0, 1], 'Mary, Mother of God'], [[2, 19], 'St. Joseph, Husband of Mary'], [[2, 25], 'The Annunciation of the Lord'],
    [[7, 15], 'The Assumption of the Blessed Virgin Mary'], [[10, 1], 'All Saints'], [[11, 8], 'The Immaculate Conception'], [[11, 25], 'The Nativity of the Lord (Christmas)'],
  ]
  for (const [[month, day], name] of fixed) {
    if (date.getMonth() === month && date.getDate() === day) {
      if (date.getDay() === 0 && ['advent', 'lent', 'easter'].includes(season.key)) break
      return { name, color: 'white' }
    }
  }
  if (date.getDay() !== 0) return null
  const previousPentecost = addDays(getEaster(year), 49), nextAdvent = getFirstSundayOfAdvent(year)
  let count, name
  if (season.key === 'christmas') name = 'Sunday of the Christmas Season'
  else if (season.key === 'advent' || season.key === 'lent' || season.key === 'easter') {
    const first = season.key === 'advent' ? advent : season.key === 'lent' ? firstSundayAfter(addDays(getEaster(year), -46)) : easter
    count = weeksBetween(first, date) + 1
    name = `${ordinal(count)} Sunday of ${season.name}`
  } else if (season.key === 'ordinary') {
    if (dateNumber(date) > dateNumber(previousPentecost)) count = 34 - weeksBetween(date, christKing)
    else count = 1 + weeksBetween(baptism(year), date)
    name = `${ordinal(count)} Sunday in Ordinary Time`
  } else name = 'Sunday of the Christmas Season'
  return { name, color: season.color }
}
// Returns month dates grouped into Sunday-first weeks for rendering.
export function getMonthGrid(year, monthIndex) {
  const first = new Date(year, monthIndex, 1), lastDay = new Date(year, monthIndex + 1, 0).getDate()
  const cells = Array(first.getDay()).fill(null)
  for (let day = 1; day <= lastDay; day += 1) cells.push({ date: new Date(year, monthIndex, day), inMonth: true })
  while (cells.length % 7) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7))
}
