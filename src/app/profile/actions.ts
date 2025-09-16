// src/app/profile/actions.ts
'use server';

import { auth } from '@/lib/firebase/client-app';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

export async function updateDisplayName(displayName: string): Promise<{ success: boolean; error?: string }> {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, error: 'You must be logged in to update your profile.' };
  }

  try {
    await updateProfile(user, { displayName });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUserPassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, error: 'You must be logged in to update your password.' };
  }

  try {
    // Note: For password updates to work securely, Firebase often requires
    // the user to have recently signed in. If this action fails, you might
    // need to implement a re-authentication flow.
    await updatePassword(user, newPassword);
    // You might want to sign the user out here for security
    // await auth.signOut();
    return { success: true };
  } catch (error: any) {
    console.error("Password update error:", error);
    if (error.code === 'auth/requires-recent-login') {
        return { success: false, error: 'This operation is sensitive and requires recent authentication. Please log out and log back in before updating your password.' };
    }
    return { success: false, error: error.message };
  }
}
