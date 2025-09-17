'use client';

import {
  ArrowRight,
  HeartPulse,
  HelpCircle,
  MessageSquare,
  Phone,
  Sparkles,
  User,
  Wind,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Logo } from '@/components/icons/logo';
import { useAuth } from '@/hooks/use-auth';

const baseFeatures = [
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'Mood Tracker',
    description: 'Log your daily mood and track your emotional well-being over time.',
    href: '/mood-tracker',
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'AI Chatbot',
    description: 'Get instant, supportive guidance from our friendly AI assistant.',
    href: '/chatbot',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Resources',
    description: 'Discover articles and videos personalized to your needs.',
    href: '/resources',
  },
  {
    icon: <Wind className="h-8 w-8 text-primary" />,
    title: 'Relaxation',
    description: 'Access guided meditations and breathing exercises to de-stress.',
    href: '/relax',
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    title: 'FAQ',
    description: 'Find answers to common mental health questions anonymously.',
    href: '/faq',
  },
  {
    icon: <Phone className="h-8 w-8 text-primary" />,
    title: 'Emergency',
    description: 'Quickly find contact information for urgent support.',
    href: '/emergency',
  },
];

const profileFeature = {
  icon: <User className="h-8 w-8 text-primary" />,
  title: 'My Profile',
  description: 'View and manage your personal information and settings.',
  href: '/profile',
};


export default function Home() {
  const { user } = useAuth();
  
  const features = user ? [profileFeature, ...baseFeatures] : baseFeatures;


  return (
    <div className="flex flex-col gap-8">
      <Card className="w-full overflow-hidden relative text-white">
         <Image
              src="https://picsum.photos/seed/hero/1200/500"
              alt="Serene abstract background"
              fill
              priority
              className="object-cover"
              data-ai-hint="serene abstract"
            />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative p-8 md:p-12 h-[400px] flex flex-col justify-center items-center text-center">
            <Logo className="h-20 w-20 mb-4 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline drop-shadow-md">
              Your Mental Wellness Journey Starts Here
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 drop-shadow-sm">
                Gain insight into your mental health with our free and confidential assessment. Understand your stress, anxiety, and mood patterns.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/assessment">Take Free Assessment <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
              <div className="bg-secondary p-3 rounded-full">
                {feature.icon}
              </div>
              <CardTitle className="font-headline">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild variant="outline">
                <Link href={feature.href}>
                  Open <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
