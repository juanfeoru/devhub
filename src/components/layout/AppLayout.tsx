import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { MobileHeader } from './Header';
import ResourceFormModal from '../resources/ResourceFormModal';
import type { Resource } from '../../types/resource';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<Resource | undefined>();
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);

  useEffect(() => {
    if (isResourceFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isResourceFormOpen]);

  function handleNewResource() {
    setResourceToEdit(undefined);
    setIsResourceFormOpen(true);
  }

  function handleEditResource(resource: Resource) {
    setResourceToEdit(resource);
    setIsResourceFormOpen(true);
  }

  function handleCloseModal() {
    setResourceToEdit(undefined);
    setIsResourceFormOpen(false);
  }

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
        <Outlet
          context={{
            onOpen: handleNewResource,
            handleUpdateResource: handleEditResource,
          }}
        />
      </main>

      {isResourceFormOpen && (
        <ResourceFormModal
          resource={resourceToEdit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
