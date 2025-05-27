import { NavLink } from 'react-router-dom';
import { COCKTAIL_CODES } from '@/shared/types/cocktail.ts';
import './Sidebar.scss';
import { useSidebar } from '@/shared/providers/SidebarProvider/SidebarProvider.tsx';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  const handleLinkClick = () => {
    toggleSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button
        className={`toggle-button ${isOpen ? 'rotate-right' : 'rotate-left'}`}
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        &#10140;
      </button>

      <div className="sidebar-content">
        <h1 className="sidebar-title">Cocktails</h1>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {COCKTAIL_CODES.map((code) => (
              <li key={code} className="nav-item">
                <NavLink
                  to={`/${code}`}
                  onClick={handleLinkClick}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {code.charAt(0).toUpperCase() + code.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
