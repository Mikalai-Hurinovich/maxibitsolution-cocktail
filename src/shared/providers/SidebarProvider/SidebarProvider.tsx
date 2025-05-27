import { createContext, useContext, useState } from 'react';

export const SidebarContext = createContext({
  isOpen: false,
  toggleSidebar: () => {},
});
export const useSidebar = () => useContext(SidebarContext);
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
  );
};
