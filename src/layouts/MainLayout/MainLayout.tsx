import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/shared/components';
import './MainLayout.scss';
import { SidebarProvider, useSidebar } from '@/shared/providers';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="layout">
        <Sidebar />
        <MainContent />
        <FloatingToggleButton />
      </div>
    </SidebarProvider>
  );
};

const MainContent = () => {
  const { isOpen } = useSidebar();
  return (
    <main className={`main-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Outlet />
    </main>
  );
};

const FloatingToggleButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      className={`floating-toggle-button visible`}
      onClick={toggleSidebar}
      aria-label="Open sidebar"
    >
      ☰
    </button>
  );
};

export default MainLayout;
