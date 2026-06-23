import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import AdminPage from '../admin/page';
import CompanyPage from '../company/page';

export default function DashboardWrapper() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user.role === 'ADMIN' ? <AdminPage /> : <CompanyPage />;
}
