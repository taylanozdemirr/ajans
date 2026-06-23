import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/authStore';

// Lazy loading pages
const PublicPage = lazy(() => import('./features/public/page'));
const LoginPage = lazy(() => import('./features/auth/page'));
const AdminPage = lazy(() => import('./features/admin/page'));
const CompanyPage = lazy(() => import('./features/company/page'));

// Global Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const { user } = useAuthStore();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Toaster position="top-right" theme="dark" />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<PublicPage />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  !user ? <Navigate to="/login" /> :
                  user.role === 'ADMIN' ? <AdminPage /> : <CompanyPage />
                } 
              />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
