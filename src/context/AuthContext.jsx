import React, { createContext, useState, useEffect } from 'react';

// Create Auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Simplified mock login function (for development)
  const login = async (email, password) => {
    try {
      setError('');
      console.log(`Development login with: ${email}`);
      
      // For development, accept any email/password with basic validation
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
      
      // Create mock user for development
      const mockUser = {
        uid: 'dev-user-1',
        email: email,
        displayName: 'Development User'
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('dev-auth-user', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      
      return mockUser;
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please check your credentials.');
    }
  };
  
  // Simplified logout function
  const logout = async () => {
    try {
      localStorage.removeItem('dev-auth-user');
      setCurrentUser(null);
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };
  
  // Check for stored user on initial load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('dev-auth-user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error restoring auth state:', err);
    } finally {
      setLoading(false);
    }
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