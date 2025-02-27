import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Login function
  const login = async (email, password) => {
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };
  
  // Set up an observer for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    // Clean up subscription
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    login,
    logout,
    error
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};