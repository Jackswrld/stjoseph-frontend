const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// Formats event dates and values without parsing date-only strings through the browser timezone.
export function getDateBadge(date) {
  const [year, month, day] = date.split("-");
  return { month: MONTHS[Number(month) - 1], day: Number(day).toString() };
}
// Example: getDateBadge('2027-08-31') -> { month: 'AUG', day: '31' }.

// Converts a 24-hour API time into a readable local clock label.
export function formatTime(time) {
  if (!time) return "";
  const [hourText, minute] = time.split(":");
  const hour = Number(hourText);
  return `${hour % 12 || 12}:${minute} ${hour >= 12 ? "PM" : "AM"}`;
}
// Examples: '09:00:00' -> '9:00 AM'; '13:05:00' -> '1:05 PM'; '12:00:00' -> '12:00 PM'; '00:00:00' -> '12:00 AM'.

// Formats an all-day event or the available start and end times.
export function formatTimeRange(start, end, isAllDay) {
  if (isAllDay) return "All Day Event";
  if (start && end) return `${formatTime(start)} – ${formatTime(end)}`;
  return formatTime(start || end);
}
// Examples: formatTimeRange('09:00:00', '16:00:00', false) -> '9:00 AM – 4:00 PM'; with only start -> '9:00 AM'.

// Formats an API date as a weekday and long month name without local timezone shifts.
export function formatLongDate(date) {
  const [year, month, day] = date.split('-').map(Number)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const weekday = weekdayNames[new Date(Date.UTC(year, month - 1, day)).getUTCDay()]
  return `${weekday}, ${day} ${monthNames[month - 1]} ${year}`
}

// Shortens large reaction totals for compact buttons.
export function formatCount(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(count);
}
// Examples: formatCount(1200) -> '1.2K'; formatCount(842) -> '842'; formatCount(0) -> '0'.
