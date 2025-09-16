import {
  HeartPulse,
  MessageSquare,
  Sparkles,
  Wind,
  HelpCircle,
  Phone,
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Leaf,
  BookText,
  Sprout,
} from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/assessment', label: 'Assessment', icon: ClipboardCheck },
  { href: '/mood-tracker', label: 'Mood Tracker', icon: HeartPulse },
  { href: '/mood-garden', label: 'Mood Garden', icon: Leaf },
  { href: '/diary', label: 'Diary', icon: BookText },
  { href: '/chatbot', label: 'AI Chatbot', icon: MessageSquare },
  { href: '/peer-support', label: 'Peer Support', icon: Users },
  { href: '/resources', label: 'Resources', icon: Sparkles },
  { href: '/relax', label: 'Relaxation', icon: Wind },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/emergency', label: 'Emergency', icon: Phone },
];


export const XP_PER_LOG = 10;
export const XP_PER_LEVEL = 100;

export const CHALLENGES = [
  { id: 'log_3_days_row', title: '3-Day Streak', description: 'Log your mood for 3 days in a row.', xp: 30, goal: 3 },
  { id: 'log_7_days_row', title: '7-Day Streak', description: 'Log your mood for 7 days in a row.', xp: 100, goal: 7 },
  { id: 'log_5_happy', title: 'Spread Joy', description: 'Log "Happy" 5 times.', xp: 20, goal: 5 },
  { id: 'log_all_moods', title: 'Full Spectrum', description: 'Log every type of mood at least once.', xp: 50, goal: 5 },
];
