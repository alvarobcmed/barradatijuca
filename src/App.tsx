import React from 'react';
import { AdminPanel } from './pages/AdminPanel';
import { TestPage } from './pages/TestPage';
import { LoginPage } from './pages/LoginPage';
import { PricingPage } from './pages/PricingPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { LandingPage } from './components/LandingPage/LandingPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { RefundPage } from './pages/RefundPage';
import { FiscalPage } from './pages/FiscalPage';
import { AdminSettingsProvider } from './contexts/AdminSettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <LandingPage />
        );
      case '/pricing':
        return (
          <PricingPage />
        );
      case '/login':
        return (
          <LoginPage />
        );
      case '/verify-email':
        return (
          <VerifyEmailPage />
        );
      case '/reset-password':
        return (
          <ResetPasswordPage />
        );
      case '/terms':
        return (
          <TermsPage />
        );
      case '/privacy':
        return (
          <PrivacyPage />
        );
      case '/refund':
        return (
          <RefundPage />
        );
      case '/fiscal':
        return (
          <ProtectedRoute>
            <FiscalPage />
          </ProtectedRoute>
        );
      case '/admin':
        return (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        );
      case '/test':
        return (
          <ProtectedRoute>
            <TestPage />
          </ProtectedRoute>
        );
      default:
        return (
          <LandingPage />
        );
    }
  };

  return (
    <AuthProvider>
      <ErrorBoundary>
        <AdminSettingsProvider>
          {renderPage()}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#fff',
                color: '#374151',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.5rem',
                padding: '1rem',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AdminSettingsProvider>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;