import {
  ArrowRight,
  HeartPulse,
  HelpCircle,
  MessageSquare,
  Phone,
  Sparkles,
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

const features = [
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

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="w-full overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 font-headline">
              Welcome to CampusZen
            </h1>
            <p className="text-muted-foreground mb-6 text-lg">
              Your personal space for mental wellness and psychological support. We're here to help you navigate the challenges of student life.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/mood-tracker">Track Your Mood <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="https://picsum.photos/seed/4/1200/800"
              alt="Serene campus environment"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              data-ai-hint="serene campus"
            />
          </div>
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
