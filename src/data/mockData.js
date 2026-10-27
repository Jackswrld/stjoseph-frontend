import harvestImage from '../assets/images/Harvest.png'
import massImage from '../assets/images/mass announcement.png'
import societiesImage from '../assets/images/societies.jpg'

// Provisional shape. Will be replaced by API data. Names may change when the backend contract is finalized.
export const churchInfo = {
  name: 'St. Joseph Catholic Church',
  tagline: 'Faith • Family • Community',
  address: '412 Road, Gowon Estate, Ipaja-Lagos',
  phone: '+234 801 234 5678',
  email: 'info@stjosephcatholic.org',
}

export const aboutHero = {
  eyebrow: 'ABOUT OUR CHURCH', title: 'Our Church Family',
  subtitle: 'St. Joseph Catholic Church is more than a building; we are a family of faith, united in Christ, guided by the Church and committed to spreading His love in our community.',
  quote_text: 'For where two or three are gathered in my name, there am I among them.', quote_source: 'Matthew 18:20',
}
export const clergyIntro = 'Our parish is guided by the leadership of our priests, who shepherd us in faith, hope and love.'
export const clergyList = [
  { id: 1, full_name: 'Rev. Fr. Michael Okafor', role_type: 'parish_priest', badge_label: 'Parish Priest', role_title: 'Parish Priest', photo: null, bio: 'Rev. Fr. Michael Okafor is the current Parish Priest of St. Joseph Catholic Church. He was ordained in 2008 and has served in various parishes in the Archdiocese of Lagos. He is passionate about youth and community development.' },
  { id: 2, full_name: 'Rev. Fr. Anthony Eze', role_type: 'assistant_priest', badge_label: 'Assistant Priest 1', role_title: 'Assistant Parish Priest', photo: null, bio: 'Rev. Fr. Anthony Eze was ordained in 2015 and has been serving as Assistant Parish Priest since 2022. He oversees the youth ministry and helps with pastoral care in the parish.' },
  { id: 3, full_name: 'Rev. Fr. Peter Uche', role_type: 'assistant_priest', badge_label: 'Assistant Priest 2', role_title: 'Assistant Parish Priest', photo: null, bio: 'Rev. Fr. Peter Uche was ordained in 2018 and joined St. Joseph Parish in 2023. He supports the parish priest in spiritual guidance, sacramental preparation and the sick visitation ministry.' },
  { id: 4, full_name: 'Mr. John Odu', role_type: 'catechist', badge_label: 'Catechist', role_title: 'Catechist', photo: null, bio: 'Mr. John Odu has been a catechist for over 15 years. He coordinates catechism classes for children, youth and adults, helping them grow in faith and in understanding of the Catholic Church.' },
]
export const parishGlance = { founded_year: '1965', patron_saint: 'St. Joseph', archdiocese: 'Lagos Archdiocese' }
export const officialsList = [
  { id: 1, full_name: 'Mrs. Becca Akinola', role_title: 'Catechist Coordinator', phone: '+234 803 123 4567', photo: null },
  { id: 2, full_name: 'Mrs. Beatrice Daniels', role_title: 'Church Secretary', phone: '+234 806 987 6543', photo: null },
  { id: 3, full_name: 'Mr. Chinedu Obi', role_title: 'Church Manager', phone: '+234 807 456 7890', photo: null },
  { id: 4, full_name: 'Mr. Samuel Ibe', role_title: 'Treasurer', phone: '+234 804 321 0987', photo: null },
]
// Society leadership will become fields on the Society model in the backend.
export const societyLeaders = [
  { id: 1, short_name: 'CWO', full_name: 'Catholic Women Organisation', leader_name: 'Mrs. Ngozi Dozie', leader_role: 'Leader', photo: null },
  { id: 2, short_name: 'CMO', full_name: 'Catholic Men Organisation', leader_name: 'Mr. Peter Eze', leader_role: 'Leader', photo: null },
  { id: 3, short_name: 'CYON', full_name: 'Catholic Youth Organisation of Nigeria', leader_name: 'Mr. Emeka Okoro', leader_role: 'Leader', photo: null },
]
export const liturgicalBanner = { heading: 'Liturgical Calendar', text: 'The liturgical calendar guides our prayer, celebrates the life of Christ and helps us live the seasons of the Church year.' }
export const scriptureCycleText = 'We follow the three-year cycle (A, B, C) of Sunday readings.'
export const closingQuote = { text: 'One Lord, One Faith, One Baptism.', source: 'Ephesians 4:5' }

export const massSchedule = {
  sunday_masses: [
    { label: 'First Mass', time: '6:30 AM' },
    { label: 'Second Mass', time: '9:00 AM' },
    { label: 'Evening Mass', time: '6:00 PM' },
    { label: "Children's Mass", time: '9:30 AM - 11:00 AM' },
  ],
  weekday_masses: [
    { label: 'Monday - Friday (Morning)', time: '6:30 AM' },
    { label: 'Tuesday - Friday (Evening)', time: '6:00 PM' },
    { label: 'Saturday', time: '7:00 AM' },
  ],
  office_hours: {
    days: 'Monday - Thursday',
    time: '9:00 AM - 1:00 PM',
  },
}

// Will be calculated from the real time later.
export const massToday = {
  date_label: 'Today, Sunday',
  time: massSchedule.sunday_masses[0].time,
  status: 'Live',
  location: 'Main Church',
}

export const infoBarItems = [
  {
    id: 1,
    title: 'Mass Times',
    text: `Sunday: ${massSchedule.sunday_masses
      .filter((mass) => ['First Mass', 'Second Mass', 'Evening Mass'].includes(mass.label))
      .map((mass) => mass.time)
      .join(', ')}. Weekday: ${massSchedule.weekday_masses[0].time}`,
    link_label: 'View schedule',
    link_url: '/mass-sacraments',
    icon: 'calendar',
  },
  {
    id: 2,
    title: 'Church Location',
    text: churchInfo.address,
    link_label: 'Get directions',
    link_url: '/contact',
    icon: 'map',
  },
  {
    id: 3,
    title: 'Opening Hours',
    text: 'Church opens daily from 6:00 AM to 7:00 PM',
    link_label: 'Plan a visit',
    link_url: '/contact',
    icon: 'clock',
  },
  {
    id: 4,
    title: 'Contact Us',
    text: `${churchInfo.phone} • ${churchInfo.email}`,
    link_label: 'Send message',
    link_url: '/contact',
    icon: 'phone',
  },
]

export const sacramentsList = [
  {
    id: 1,
    slug: 'adoration',
    name: 'Chapel of Adoration',
    schedule: [
      { label: 'Exposition', text: 'Monday - Friday 7:15 AM - 9:00 PM' },
      { label: 'Benediction', text: 'Thursday 5:30 PM' },
    ],
  },
  {
    id: 2,
    slug: 'communion-sick',
    name: 'Communion for the Sick / Aged',
    schedule: [{ text: 'Every Thursday - Friday 9:00 AM - 1:00 PM' }],
  },
  { id: 3, slug: 'confession', name: 'Confession', schedule: [{ text: 'Saturday 5:00 PM - 7:00 PM' }] },
  { id: 4, slug: 'catechism', name: 'Catechism', schedule: [{ text: 'Saturday & Sunday 4:00 PM - 6:00 PM' }] },
  { id: 5, slug: 'rica', name: 'R.I.C.A', schedule: [{ text: 'Saturday & Sunday 4:00 PM' }] },
  {
    id: 6,
    slug: 'infant-baptism',
    name: 'Infant Baptism & Pre-Baptism Preparation',
    schedule: [{ text: '1st & 2nd Saturday of the month 4:00 PM' }],
  },
  { id: 7, slug: 'baptism', name: 'Baptism', schedule: [{ text: 'Last Saturday of the month 11:00 AM' }] },
  { id: 8, slug: 'bible-study', name: 'Bible Study Class', schedule: [{ text: 'Wednesday 7:15 PM' }] },
  {
    id: 9,
    slug: 'marriage-classes',
    name: 'Marriage Classes',
    schedule: [{ text: 'Every Sunday 4:00 PM - 6:00 PM' }],
  },
  { id: 10, slug: 'library', name: 'Library', schedule: [{ text: 'Monday - Friday 9:00 AM - 2:00 PM' }] },
]

export const newsList = [
  {
    id: 1,
    title: 'Annual Harvest Thanksgiving Celebration',
    excerpt:
      'Join the parish community for a joyful harvest thanksgiving with prayers, offerings and fellowship after Mass.',
    category: 'Parish Life',
    image: harvestImage,
    published_date: 'Oct 20, 2026',
  },
  {
    id: 2,
    title: 'Updated Weekday Mass Announcement',
    excerpt:
      'Please note the latest weekday Mass schedule and parish office hours for the coming pastoral season.',
    category: 'Announcement',
    image: massImage,
    published_date: 'Oct 18, 2026',
  },
  {
    id: 3,
    title: 'Societies Welcome New Members',
    excerpt:
      'Our parish societies invite parishioners to share their gifts through prayer, service, formation and community.',
    category: 'Community',
    image: societiesImage,
    published_date: 'Oct 12, 2026',
  },
]

export const eventsList = [
  {
    id: 1,
    title: 'Parish Harvest Bazaar',
    event_date: '2026-11-01',
    month: 'Nov',
    day: '01',
    start_time: '10:00 AM',
    end_time: '2:00 PM',
    location: 'Parish Hall',
  },
  {
    id: 2,
    title: 'Youth Fellowship Evening',
    event_date: '2026-11-08',
    month: 'Nov',
    day: '08',
    start_time: '5:00 PM',
    end_time: '7:00 PM',
    location: 'Community Centre',
  },
  {
    id: 3,
    title: 'Advent Choir Rehearsal',
    event_date: '2026-11-15',
    month: 'Nov',
    day: '15',
    start_time: '4:30 PM',
    end_time: '6:30 PM',
    location: 'Main Church',
  },
]

export const societiesList = [
  {
    id: 1,
    name: 'Catholic Women Organisation',
    tags: ['Prayer', 'Service', 'Family'],
    meeting_day_time: 'Sundays after 8:30 AM Mass',
    icon: 'heart',
  },
  {
    id: 2,
    name: 'Catholic Men Organisation',
    tags: ['Faith', 'Leadership', 'Charity'],
    meeting_day_time: '2nd Saturday, 5:00 PM',
    icon: 'shield',
  },
  {
    id: 3,
    name: 'Legion of Mary',
    tags: ['Rosary', 'Visitations', 'Mission'],
    meeting_day_time: 'Wednesdays, 6:00 PM',
    icon: 'star',
  },
  {
    id: 4,
    name: 'Parish Youth Society',
    tags: ['Worship', 'Growth', 'Friendship'],
    meeting_day_time: 'Fridays, 5:30 PM',
    icon: 'users',
  },
]
