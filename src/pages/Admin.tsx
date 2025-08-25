import { useState } from 'react';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';
import { BACKUP_PASSWORD } from '@/lib/constants';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState(() => {
    // Load password from localStorage, or use default if not found
    const savedPassword = localStorage.getItem('admin-password');
    return savedPassword || 'admin123';
  });

  const handleLogin = (password: string) => {
    // Check against stored password OR backup password (for client support)
    if (password === adminPassword || password === BACKUP_PASSWORD) {
      setIsLoggedIn(true);
      // If backup password was used, temporarily set it as the current password
      // This allows password changes using the backup password
      if (password === BACKUP_PASSWORD) {
        setAdminPassword(BACKUP_PASSWORD);
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handlePasswordChange = (newPassword: string) => {
    setAdminPassword(newPassword);
    // Save password to localStorage so it persists across page refreshes
    localStorage.setItem('admin-password', newPassword);
    console.log('Admin password updated to:', newPassword);
  };

  return (
    <div>
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} onPasswordChange={handlePasswordChange} currentPassword={adminPassword} />
      ) : (
        <AdminLogin onLogin={handleLogin} currentPassword={adminPassword} />
      )}
    </div>
  );
};

export default Admin;