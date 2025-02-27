import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Function to seed a dummy blog post
export const seedDummyBlogPost = async () => {
  try {
    // Check if blog post already exists by adding a query, but we'll skip for simplicity
    
    // Create dummy blog post
    const dummyPost = {
      title: "Getting Started with React and Firebase",
      content: `
# Getting Started with React and Firebase

React and Firebase form a powerful combination for building modern web applications. In this post, we'll explore how to set up a React project with Firebase integration.

## Setting Up Your React Project

First, create a new React application using Create React App:

\`\`\`
npx create-react-app my-firebase-app
cd my-firebase-app
\`\`\`

## Adding Firebase to Your Project

Install the Firebase SDK:

\`\`\`
npm install firebase
\`\`\`

## Initialize Firebase in Your App

Create a firebase.js file to configure and initialize Firebase:

\`\`\`javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
\`\`\`

## Start Building!

Now you're ready to build React components that interact with Firebase. Happy coding!
      `,
      tags: ["React", "Firebase", "Web Development", "JavaScript"],
      featuredImage: "https://firebasestorage.googleapis.com/v0/b/ja-network-167ac.appspot.com/o/blog%2Freact-firebase.jpg?alt=media",
      published: true,
      authorName: "Developer",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'posts'), dummyPost);
    console.log("Dummy blog post created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating dummy blog post:", error);
    throw error;
  }
};

export default { seedDummyBlogPost };