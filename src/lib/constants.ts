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
