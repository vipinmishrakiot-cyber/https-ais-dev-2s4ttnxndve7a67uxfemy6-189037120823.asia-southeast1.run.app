
import React from 'react';
import { Home, Calendar, ShoppingBag, User } from 'lucide-react';
import { Tab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="mobile-frame relative flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E1261C] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">TN</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">TRILOKNEER</h1>
        </div>
        <button className="p-2 text-gray-400 hover:text-[#E1261C] transition-colors">
          <User size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 bg-gray-50">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t px-8 py-3 flex justify-between items-center shadow-lg z-20">
        <NavButton 
          icon={<Home size={22} />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavButton 
          icon={<Calendar size={22} />} 
          label="Schedule" 
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')} 
        />
        <NavButton 
          icon={<ShoppingBag size={22} />} 
          label="Store" 
          active={activeTab === 'store'} 
          onClick={() => setActiveTab('store')} 
        />
        <NavButton 
          icon={<User size={22} />} 
          label="Profile" 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-[#E1261C] scale-110' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

export default Layout;
