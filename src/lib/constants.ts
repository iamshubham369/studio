import {
  HeartPulse,
  MessageSquare,
  Sparkles,
  Wind,
  HelpCircle,
  Phone,
  LayoutDashboard,
  Users,
  LogIn,
} from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/mood-tracker', label: 'Mood Tracker', icon: HeartPulse },
  { href: '/chatbot', label: 'AI Chatbot', icon: MessageSquare },
  { href: '/peer-support', label: 'Peer Support', icon: Users },
  { href: '/resources', label: 'Resources', icon: Sparkles },
  { href: '/relax', label: 'Relaxation', icon: Wind },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/emergency', label: 'Emergency', icon: Phone },
  { href: '/login', label: 'Login', icon: LogIn },
];
