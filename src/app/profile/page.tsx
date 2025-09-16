
// src/app/profile/page.tsx
'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera } from 'lucide-react';
import { updateDisplayName, updateUserPassword } from './actions';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isNamePending, startNameTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();

  useEffect(() => {
    if(user?.displayName) {
        setDisplayName(user.displayName);
    }
  }, [user]);

  const handleUpdateName = () => {
    if (!displayName.trim()) {
      toast({ title: 'Error', description: 'Display name cannot be empty.', variant: 'destructive' });
      return;
    }
    startNameTransition(async () => {
      const result = await updateDisplayName(displayName);
      if (result.success) {
        toast({ title: 'Success', description: 'Display name updated!' });
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    });
  };

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
        toast({ title: 'Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
        return;
    }

    startPasswordTransition(async () => {
      const result = await updateUserPassword(password);
      if (result.success) {
        toast({ title: 'Success', description: 'Password updated successfully.' });
        setPassword('');
        setConfirmPassword('');
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-start pt-12">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Loader2 className="animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and account settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Your avatar is displayed across the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                    <AvatarFallback className="text-3xl">
                    {user.displayName?.[0] ?? user.email?.[0]?.toUpperCase() ?? 'U'}
                    </AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full" variant="secondary" disabled>
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change Picture</span>
                </Button>
            </div>
            <div>
                <p className="font-semibold text-lg">{user.displayName ?? 'Anonymous User'}</p>
                <p className="text-muted-foreground">{user.email}</p>
                 <p className="text-xs text-muted-foreground mt-2">Avatar editing coming soon!</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your display name.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid gap-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={isNamePending}
                />
             </div>
        </CardContent>
        <CardContent>
             <Button onClick={handleUpdateName} disabled={isNamePending}>
                {isNamePending && <Loader2 className="animate-spin mr-2" />}
                Save Changes
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password. You will be logged out after a successful change.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={isPasswordPending} />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={isPasswordPending}/>
            </div>
        </CardContent>
        <CardContent>
            <Button onClick={handleUpdatePassword} disabled={isPasswordPending}>
                {isPasswordPending && <Loader2 className="animate-spin mr-2" />}
                Update Password
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
