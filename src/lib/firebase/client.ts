import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOxH9inB4i4l0ryQ81o_FCrE4IOtz9ZRg",
  authDomain: "brokenmandarin-a5e3e.firebaseapp.com",
  projectId: "brokenmandarin-a5e3e",
  storageBucket: "brokenmandarin-a5e3e.firebasestorage.app",
  messagingSenderId: "407019520298",
  appId: "1:407019520298:web:d9e77b7db3918c6458de53",
  measurementId: "G-C0BYQYRDKM",
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
