// Builds and downloads an iCalendar file for an event.
// Escapes text values according to iCalendar text rules.
function escapeIcs(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

// Removes separators from an API date for calendar properties.
function datePart(date) {
  return date.replaceAll('-', '')
}

// Combines date and time as a floating local iCalendar date-time.
function localDateTime(date, time) {
  return `${datePart(date)}T${time.replaceAll(':', '').slice(0, 6)}`
}

// Returns an RFC 5545 calendar document with CRLF line endings.
export function buildIcs(event) {
  const now = new Date()
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}T${String(now.getUTCHours()).padStart(2, '0')}${String(now.getUTCMinutes()).padStart(2, '0')}${String(now.getUTCSeconds()).padStart(2, '0')}Z`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//St Joseph Catholic Church//Events//EN',
    'BEGIN:VEVENT',
    `UID:${event.slug}-${datePart(event.date)}@stjoseph-events`,
    `DTSTAMP:${stamp}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `LOCATION:${escapeIcs(event.location || '')}`,
    `DESCRIPTION:${escapeIcs(event.tagline || event.summary || '')}`,
  ]
  if (event.is_all_day) {
    const [year, month, day] = event.date.split('-').map(Number)
    const nextDate = new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10)
    lines.push(`DTSTART;VALUE=DATE:${datePart(event.date)}`, `DTEND;VALUE=DATE:${datePart(nextDate)}`)
  } else if (event.start_time) {
    lines.push(`DTSTART:${localDateTime(event.date, event.start_time)}`)
    if (event.end_time) lines.push(`DTEND:${localDateTime(event.date, event.end_time)}`)
  }
  lines.push('END:VEVENT', 'END:VCALENDAR')
  return `${lines.join('\r\n')}\r\n`
}

// Triggers a browser download of the event's calendar file.
export function downloadIcs(event) {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.slug}.ics`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
