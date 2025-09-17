
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResourcesClient } from '@/components/resources/resources-client';

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Personalized Resources</CardTitle>
          <CardDescription>
            Get articles, videos, and support groups based on your recent mood entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResourcesClient />
        </CardContent>
      </Card>
    </div>
  );
}
