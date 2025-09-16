// src/lib/firebase/client-app.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-8024809753-caa6f",
  "appId": "1:55778038634:web:93b12daf3deb515ca94b13",
  "storageBucket": "studio-8024809753-caa6f.firebasestorage.app",
  "apiKey": "AIzaSyBQhTqyqivhO-O7d5mTNwCb-sBocNAwyo4",
  "authDomain": "studio-8024809753-caa6f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "55778038634"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
