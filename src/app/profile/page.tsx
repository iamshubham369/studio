// src/app/profile/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserNav } from '@/components/layout/user-nav';

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-start pt-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline">Profile</CardTitle>
          <CardDescription>
            Your personal information is displayed here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
                <UserNav />
                <p className="text-sm text-muted-foreground">
                    This is your profile page. More features coming soon!
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
