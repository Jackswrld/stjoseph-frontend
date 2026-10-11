import harvestImage from '../assets/images/Harvest.png'
import massImage from '../assets/images/mass announcement.png'
import societiesImage from '../assets/images/societies.jpg'

// Provisional shape. Will be replaced by API data. Names may change when the backend contract is finalized.
export const massToday = {
  date_label: 'Today, Sunday',
  time: '8:30 AM',
  status: 'Live',
  location: 'Main Church',
}

export const infoBarItems = [
  {
    id: 1,
    title: 'Mass Times',
    text: 'Sunday: 6:30 AM, 8:30 AM and 10:30 AM',
    link_label: 'View schedule',
    link_url: '/mass-sacraments',
    icon: 'calendar',
  },
  {
    id: 2,
    title: 'Church Location',
    text: 'St. Joseph Catholic Church, Parish Road',
    link_label: 'Get directions',
    link_url: '/contact',
    icon: 'map',
  },
  {
    id: 3,
    title: 'Opening Hours',
    text: 'Church opens daily from 6:00 AM to 7:00 PM',
    link_label: 'Plan a visit',
    link_url: '/about',
    icon: 'clock',
  },
  {
    id: 4,
    title: 'Contact Us',
    text: 'Reach the parish office for enquiries and support',
    link_label: 'Send message',
    link_url: '/contact',
    icon: 'phone',
  },
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
