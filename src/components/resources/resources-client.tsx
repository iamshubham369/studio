
'use client';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMoodData } from '@/lib/hooks/use-mood-data';
import { getPersonalizedResources } from '@/app/resources/actions';
import type { RecommendedResource } from '@/ai/flows/personalized-resource-recommendations';
import { ResourceCard } from '@/components/resources/resource-card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ResourcesClient() {
  const { entries } = useMoodData();
  const [recommendations, setRecommendations] = useState<RecommendedResource[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetRecommendations = () => {
    if (entries.length === 0) {
      toast({
        title: 'No mood data found',
        description: 'Please log your mood first to get personalized recommendations.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await getPersonalizedResources(entries);
      if (result.success) {
        setRecommendations(result.recommendations!);
        toast({
          title: 'Recommendations Loaded!',
          description: 'Here are some resources tailored just for you.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <>
      <div>
        <Button onClick={handleGetRecommendations} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get My Recommendations
            </>
          )}
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          {entries.length > 0
            ? `Based on your ${entries.length} mood entries.`
            : 'Log your mood to enable recommendations.'}
        </p>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4 font-headline">Your Recommendations</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {isPending && (
         <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-4 animate-pulse">
                    <div className="h-6 w-3/4 bg-muted rounded"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-5/6 bg-muted rounded"></div>
                    </div>
                     <div className="h-10 w-24 bg-muted rounded-md"></div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </>
  );
}
