'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function InsightsPage() {
  const router = useRouter();

  function handleLogout() {
    // Expire the cookie
    document.cookie = 'admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    
    // Redirect to login page
    router.push('/admin/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Insights</h1>
      <p>Welcome to the admin insights dashboard!</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
