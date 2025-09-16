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
} from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/assessment', label: 'Assessment', icon: ClipboardCheck },
  { href: '/mood-tracker', label: 'Mood Tracker', icon: HeartPulse },
  { href: '/chatbot', label: 'AI Chatbot', icon: MessageSquare },
  { href: '/peer-support', label: 'Peer Support', icon: Users },
  { href: '/resources', label: 'Resources', icon: Sparkles },
  { href: '/relax', label: 'Relaxation', icon: Wind },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/emergency', label: 'Emergency', icon: Phone },
];
