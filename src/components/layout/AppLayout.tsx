import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { MobileHeader } from './Header';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='h-dvh w-full md:flex'>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onCollapsed={() => setCollapsed((prev) => !prev)}
      />

      <MobileHeader
        mobileOpen={mobileOpen}
        onOpen={() => setMobileOpen(true)}
      />

      <main className='py-5 px-6 min-w-0 min-h-0 flex-1 md:p-8 md:overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
}
