import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RecommendedResource } from "@/ai/flows/personalized-resource-recommendations";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ResourceCardProps {
  resource: RecommendedResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-headline">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{resource.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href={resource.url} target="_blank" rel="noopener noreferrer">
            View Resource <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
