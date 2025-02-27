import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/styles/main.css';

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', margin: '20px', border: '1px solid red' }}>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Simple debug info to verify render
  console.log("App component rendering");
  
  try {
    return (
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <div className="app">
              <Navigation />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                  <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                  <Route path="/resume" element={<ErrorBoundary><Resume /></ErrorBoundary>} />
                  <Route path="/blog" element={<ErrorBoundary><Blog /></ErrorBoundary>} />
                  <Route path="/blog/:id" element={<ErrorBoundary><BlogDetail /></ErrorBoundary>} />
                  <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
                  <Route 
                    path="/dashboard/*" 
                    element={
                      <ErrorBoundary>
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      </ErrorBoundary>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Error rendering App:", error);
    return (
      <div style={{ padding: '20px' }}>
        <h1>Failed to load application</h1>
        <p>There was an error initializing the app. Please check the console for details.</p>
        <pre>{error.toString()}</pre>
      </div>
    );
  }
}

export default App;