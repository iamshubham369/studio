
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BreathingExercise } from '@/components/relax/breathing-exercise';

const exercises = [
  {
    title: 'Guided Meditation',
    description: 'Follow a soothing voice to calm your mind and find inner peace. Ideal for reducing stress and improving focus.',
    image: PlaceHolderImages.find((img) => img.id === 'guided-meditation'),
    component: null,
  },
  {
    title: 'Box Breathing',
    description: 'A simple yet powerful technique to regulate your breath, calm your nervous system, and relieve stress.',
    image: PlaceHolderImages.find((img) => img.id === 'breathing-exercise'),
    component: <BreathingExercise />,
  },
  {
    title: 'Mindfulness',
    description: 'Practice being present in the moment with this short mindfulness activity. Helps in reducing anxiety.',
    image: PlaceHolderImages.find((img) => img.id === 'mindfulness-activity'),
    component: null,
  },
];

export default function RelaxPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Relaxation Exercises</h1>
        <p className="text-muted-foreground mt-2">
          Take a moment to unwind with these guided activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <Card key={exercise.title} className="overflow-hidden flex flex-col">
            {exercise.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={exercise.image.imageUrl}
                  alt={exercise.image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={exercise.image.imageHint}
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline">{exercise.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{exercise.description}</CardDescription>
            </CardContent>
            <CardFooter>
                {exercise.component ? (
                    exercise.component
                ) : (
                    <Button variant="secondary" className="w-full" disabled>Coming Soon</Button>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
