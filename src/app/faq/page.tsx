
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const faqItems = [
  {
    question: "How can I manage exam stress?",
    answer: "Managing exam stress is crucial. Try breaking your study sessions into smaller, manageable chunks (like the Pomodoro Technique), ensure you get enough sleep, eat nutritious meals, and take regular breaks to do something you enjoy. Physical activity, even a short walk, can also significantly reduce stress levels."
  },
  {
    question: "I'm feeling overwhelmed and don't know where to start. What should I do?",
    answer: "Feeling overwhelmed is common. A good first step is to talk to someone you trust, like a friend, family member, or a university counselor. Our AI chatbot is also available 24/7 for initial guidance. If you're struggling to cope, please see the 'Emergency' section for professional help."
  },
  {
    question: "What's the difference between feeling sad and depression?",
    answer: "Sadness is a normal human emotion that usually passes with time. Depression, on the other hand, is a persistent feeling of sadness or a loss of interest in activities you once enjoyed, lasting for at least two weeks. It can interfere with your daily life. If you suspect you might be depressed, it's very important to consult a healthcare professional."
  },
  {
    question: "How can I improve my time management skills?",
    answer: "Effective time management can reduce stress. Try using a planner or a digital calendar to organize your tasks. Prioritize your to-do list using methods like the Eisenhower Matrix (urgent/important). Set realistic goals and remember to schedule time for relaxation and hobbies, not just work and study."
  }
];


export default function FaqPage() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
         <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Frequently Asked Questions</h1>
            <p className="text-muted-foreground mt-2">
                Find answers to common mental health questions from students.
            </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="md:col-span-1">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Have a Question?</CardTitle>
                <CardDescription>Submit your question anonymously. We regularly update our FAQ section with answers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea placeholder="Type your question here..." className="min-h-32" />
                <Button className="w-full" disabled>Submit Anonymously (Coming Soon)</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
