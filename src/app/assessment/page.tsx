
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  sleepQuality: z.string().min(1, { message: 'Please select an option.' }),
  energyLevels: z.string().min(1, { message: 'Please select an option.' }),
  stressLevel: z.string().min(1, { message: 'Please select an option.' }),
  anxietyFrequency: z.string().min(1, { message: 'Please select an option.' }),
  interestInActivities: z.string().min(1, { message: 'Please select an option.' }),
  socialConnection: z.string().min(1, { message: 'Please select an option.' }),
  overallMood: z.string().min(1, { message: 'Please select an option.' }),
});

const questions = [
  {
    name: 'sleepQuality' as const,
    label: '1. Over the last week, how would you rate your sleep quality?',
    options: [
      { value: 'very_good', label: 'Very Good' },
      { value: 'good', label: 'Good' },
      { value: 'average', label: 'Average' },
      { value: 'poor', label: 'Poor' },
      { value: 'very_poor', label: 'Very Poor' },
    ],
  },
  {
    name: 'energyLevels' as const,
    label: '2. How have your energy levels been recently?',
    options: [
      { value: 'very_high', label: 'Very High' },
      { value: 'high', label: 'High' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'low', label: 'Low' },
      { value: 'very_low', label: 'Very Low' },
    ],
  },
    {
    name: 'stressLevel' as const,
    label: '3. How often have you felt overwhelmed by stress in the past week?',
    options: [
      { value: 'never', label: 'Never' },
      { value: 'rarely', label: 'Rarely' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'often', label: 'Often' },
      { value: 'always', label: 'Always' },
    ],
  },
  {
    name: 'anxietyFrequency' as const,
    label: '4. How often have you been bothered by feeling nervous, anxious, or on edge?',
    options: [
        { value: 'not_at_all', label: 'Not at all' },
        { value: 'several_days', label: 'Several days' },
        { value: 'more_than_half_the_days', label: 'More than half the days' },
        { value: 'nearly_every_day', label: 'Nearly every day' },
    ],
  },
    {
    name: 'interestInActivities' as const,
    label: '5. How much interest or pleasure have you had in doing things you normally enjoy?',
    options: [
      { value: 'very_high_interest', label: 'Very high interest' },
      { value: 'high_interest', label: 'High interest' },
      { value: 'some_interest', label: 'Some interest' },
      { value: 'little_interest', label: 'Little interest' },
      { value: 'no_interest', label: 'No interest at all' },
    ],
  },
    {
    name: 'socialConnection' as const,
    label: '6. How connected have you felt to others (friends, family, etc.)?',
    options: [
      { value: 'very_connected', label: 'Very connected' },
      { value: 'connected', label: 'Connected' },
      { value: 'somewhat_connected', label: 'Somewhat connected' },
      { value: 'disconnected', label: 'Disconnected' },
      { value: 'very_disconnected', label: 'Very disconnected' },
    ],
  },
  {
    name: 'overallMood' as const,
    label: '7. In general, how would you describe your overall mood lately?',
    options: [
      { value: 'excellent', label: 'Excellent' },
      { value: 'good', label: 'Good' },
      { value: 'fair', label: 'Fair' },
      { value: 'poor', label: 'Poor' },
      { value: 'very_poor', label: 'Very Poor' },
    ],
  },
];

export default function AssessmentPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sleepQuality: '',
      energyLevels: '',
      stressLevel: '',
      anxietyFrequency: '',
      interestInActivities: '',
      socialConnection: '',
      overallMood: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // For now, we just log the values. We will process them with AI next.
    console.log(values);
    toast({
      title: 'Assessment Submitted!',
      description: 'Your results will be analyzed shortly.',
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="text-center">
        <CardHeader>
            <CardTitle className="font-headline text-3xl">Mental Wellness Assessment</CardTitle>
            <CardDescription>
            This short, confidential assessment helps you understand your current well-being.
            <br />
            Answer the questions honestly to get the most accurate insights.
            </CardDescription>
        </CardHeader>
      </Card>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {questions.map((q) => (
            <Card key={q.name}>
              <CardHeader>
                <CardTitle className="text-xl">{q.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name={q.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-2"
                        >
                          {q.options.map((opt) => (
                            <FormItem key={opt.value} className="flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-colors hover:bg-accent hover:text-accent-foreground has-[:checked]:bg-accent">
                              <FormControl>
                                <RadioGroupItem value={opt.value} />
                              </FormControl>
                              <FormLabel className="font-normal w-full cursor-pointer">{opt.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
          <Button type="submit" size="lg" className="w-full">Submit for Analysis</Button>
        </form>
      </Form>
    </div>
  );
}
