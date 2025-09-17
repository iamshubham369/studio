
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import Link from 'next/link';

const emergencyContacts = [
  {
    title: 'University Counseling Center',
    type: 'On-Campus',
    description: 'Confidential counseling services for students. Available during business hours.',
    phone: '555-123-4567',
    phoneHref: 'tel:5551234567',
  },
  {
    title: '24/7 Student Helpline',
    type: 'On-Campus',
    description: 'Immediate, confidential support available anytime, day or night.',
    phone: '555-765-4321',
    phoneHref: 'tel:5557654321',
  },
  {
    title: 'National Suicide Prevention Lifeline',
    type: 'Off-Campus',
    description: 'Free and confidential support for people in distress, 24/7.',
    phone: '988',
    phoneHref: 'tel:988',
  },
  {
    title: 'Crisis Text Line',
    type: 'Off-Campus',
    description: 'Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis.',
    phone: 'Text HOME to 741741',
    phoneHref: 'sms:741741;?&body=HOME',
  },
  {
    title: 'Local Emergency Services',
    type: 'Off-Campus',
    description: 'For immediate life-threatening emergencies, please dial 911.',
    phone: '911',
    phoneHref: 'tel:911',
  },
];

export default function EmergencyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline text-destructive">Emergency Contacts</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          If you are in a crisis or any other person may be in danger, please use these resources immediately. Your well-being is the top priority.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {emergencyContacts.map((contact) => (
          <Card key={contact.title} className="flex flex-col border-destructive/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline">{contact.title}</CardTitle>
                <span className="text-xs font-semibold uppercase text-destructive rounded-full bg-destructive/10 px-2 py-1">{contact.type}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{contact.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                <Link href={contact.phoneHref}>
                    <Phone className="mr-2 h-4 w-4" /> {contact.phone}
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
