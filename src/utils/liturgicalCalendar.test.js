import test from 'node:test'
import assert from 'node:assert/strict'
import { getCelebration, getEaster, getFirstSundayOfAdvent, getLiturgicalYearLetter, getSeason } from './liturgicalCalendar.js'

const localDate = (year, month, day) => new Date(year, month - 1, day)

test('Easter dates use the Gregorian computus', () => {
  for (const [year, month, day] of [[2024, 3, 31], [2025, 4, 20], [2026, 4, 5], [2027, 3, 28]]) assert.deepEqual(getEaster(year), localDate(year, month, day))
})
test('key 2026 liturgical dates', () => {
  assert.equal(getCelebration(localDate(2026, 2, 18)).name, 'Ash Wednesday')
  assert.equal(getCelebration(localDate(2026, 5, 24)).name, 'Pentecost')
  assert.deepEqual(getFirstSundayOfAdvent(2026), localDate(2026, 11, 29))
  assert.equal(getCelebration(localDate(2026, 11, 22)).name, 'Our Lord Jesus Christ, King of the Universe')
})
test('liturgical year letters', () => {
  assert.equal(getLiturgicalYearLetter(localDate(2025, 11, 29)), 'C')
  assert.equal(getLiturgicalYearLetter(localDate(2025, 11, 30)), 'A')
  assert.equal(getLiturgicalYearLetter(localDate(2026, 10, 27)), 'A')
  assert.equal(getLiturgicalYearLetter(localDate(2026, 11, 29)), 'B')
})
test('liturgical seasons and colours', () => {
  for (const [date, key, color] of [[localDate(2026, 10, 27), 'ordinary', 'green'], [localDate(2026, 12, 1), 'advent', 'violet'], [localDate(2026, 12, 25), 'christmas', 'white'], [localDate(2026, 3, 1), 'lent', 'violet'], [localDate(2026, 4, 12), 'easter', 'white'], [localDate(2026, 5, 24), 'easter', 'white']]) assert.deepEqual([getSeason(date).key, getSeason(date).color], [key, color])
  assert.deepEqual(getCelebration(localDate(2026, 5, 24)), { name: 'Pentecost', color: 'red' })
})
test('named celebrations and Sunday names', () => {
  assert.equal(getCelebration(localDate(2026, 10, 25)).name, '30th Sunday in Ordinary Time')
  assert.equal(getCelebration(localDate(2026, 12, 25)).name, 'The Nativity of the Lord (Christmas)')
  assert.equal(getCelebration(localDate(2026, 4, 5)).name, 'Easter Sunday')
})
