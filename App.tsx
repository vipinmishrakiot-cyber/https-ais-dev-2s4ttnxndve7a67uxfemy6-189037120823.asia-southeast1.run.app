
import React, { useState } from 'react';
import Layout from './components/Layout';
import Schedule from './components/Schedule';
import Store from './components/Store';
import { Tab } from './types';
import { Droplet, Award, ShieldCheck, MapPin, ChevronRight, Phone, Sparkles } from 'lucide-react';

const HomeScreen: React.FC = () => (
  <div className="animate-in fade-in duration-700">
    {/* Hero Section */}
    <div className="relative bg-[#E1261C] px-6 pt-10 pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-20 -mb-20 blur-2xl"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="text-white">
          <h2 className="text-4xl font-black leading-[1.1] tracking-tighter">
            PURE WATER,<br />
            <span className="text-red-200">HEALTHY LIFE.</span>
          </h2>
          <p className="mt-4 text-white/80 font-medium max-w-[90%] italic text-sm">
            "shuddh pani, swasth jeevan"
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-[#E1261C] font-black rounded-xl shadow-2xl active:scale-95 transition-all uppercase tracking-wider text-xs">
            Shop Products
          </button>
        </div>
        
        {/* Visual representation of the branded bottle - enhanced for realism */}
        <div className="relative -mr-4 mt-2">
           <div className="w-24 h-52 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-t-[2.5rem] rounded-b-2xl relative border border-white/40 shadow-2xl overflow-hidden flex flex-col">
              {/* Bottle Cap */}
              <div className="h-10 w-full bg-blue-500/80 border-b border-white/20 flex flex-col items-center justify-center">
                 <div className="w-full h-[2px] bg-white/20 my-0.5"></div>
                 <div className="w-full h-[2px] bg-white/20"></div>
              </div>
              
              {/* Bottle Body / Label */}
              <div className="flex-1 flex flex-col items-center justify-center p-0">
                 {/* The Actual Label */}
                 <div className="w-full bg-[#E1261C] py-4 shadow-2xl relative border-y border-white/30 transform -rotate-1">
                    <div className="flex flex-col items-center text-center">
                       {/* Drop Logo */}
                       <div className="w-4 h-6 bg-blue-500 rounded-t-full rounded-b-xl mb-1 flex items-center justify-center shadow-lg border border-white/20">
                          <span className="text-white text-[5px] font-black border border-white/40 rounded-full w-3 h-3 flex items-center justify-center">R</span>
                       </div>
                       {/* Brand Name */}
                       <span className="text-[11px] text-white font-black tracking-tighter leading-none">TRILOKNEER</span>
                       {/* Slogan */}
                       <span className="text-[5px] text-white/90 italic leading-none mt-1" style={{ fontFamily: 'serif' }}>shuddh pani, swasth jeevan</span>
                    </div>
                    {/* Gloss Effect on Label */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                 </div>
              </div>

              {/* Water Content Effect */}
              <div className="h-12 w-full bg-blue-400/10 flex items-center justify-center">
                 <Droplet size={14} className="text-blue-200 opacity-30" />
              </div>
           </div>
           
           <div className="absolute -bottom-4 -left-4 bg-white p-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-1">
              <Sparkles size={12} className="text-[#E1261C]" />
              <span className="text-[8px] font-black text-gray-900 tracking-tighter uppercase">Authentic</span>
           </div>
        </div>
      </div>

      {/* Stats overlap */}
      <div className="absolute -bottom-10 left-6 right-6 bg-white rounded-2xl shadow-xl p-5 flex justify-around border border-gray-100 z-20">
        <div className="flex flex-col items-center">
          <span className="text-[#E1261C] font-black text-xl">5+</span>
          <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Filter Stages</span>
        </div>
        <div className="w-px h-10 bg-gray-100 self-center"></div>
        <div className="flex flex-col items-center">
          <span className="text-[#E1261C] font-black text-xl">100%</span>
          <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Pure Shuddh</span>
        </div>
        <div className="w-px h-10 bg-gray-100 self-center"></div>
        <div className="flex flex-col items-center">
          <span className="text-[#E1261C] font-black text-xl">FSSAI</span>
          <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Certified</span>
        </div>
      </div>
    </div>

    {/* Features */}
    <div className="mt-20 px-6 grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-black text-gray-900 tracking-tight">The Trilokneer Standard</h3>
        <span className="text-[10px] font-bold text-[#E1261C] bg-red-50 px-2 py-1 rounded-full">EST. 2024</span>
      </div>
      
      <FeatureCard 
        icon={<Droplet className="text-blue-500" />} 
        title="Mineral-Rich Hydration" 
        desc="Infused with essential minerals after 7-stage RO purification."
      />
      <FeatureCard 
        icon={<Award className="text-orange-400" />} 
        title="Vibrant Red Label" 
        desc="Our signature authentic packaging ensures safety and quality."
      />
      <FeatureCard 
        icon={<ShieldCheck className="text-green-500" />} 
        title="Quality Assurance" 
        desc="Stringent testing for every single drop we deliver."
      />
    </div>

    {/* Location & Contact */}
    <div className="mt-8 px-6 mb-12">
      <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
          <MapPin size={200} />
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#E1261C] p-2 rounded-xl">
             <MapPin size={20} className="text-white" />
          </div>
          <h4 className="font-black text-xl tracking-tight">Manufacturing Unit</h4>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-medium">
          Badaunwa, Sheetalganj, Mariahu,<br />
          <span className="text-white">Jaunpur, Uttar Pradesh</span>
        </p>
        <div className="mt-8 flex gap-4">
          <a href="tel:9161667766" className="flex-1 bg-[#E1261C] py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-900/20">
            <Phone size={20} />
            DIRECT LINE
          </a>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center gap-5 hover:shadow-xl hover:border-red-100 transition-all duration-300 group">
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#E1261C] group-hover:text-white transition-all duration-300">
      <div className="group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
    <div className="flex-1">
      <h4 className="font-black text-gray-900 text-sm tracking-tight">{title}</h4>
      <p className="text-[11px] text-gray-400 mt-1 leading-snug font-medium">{desc}</p>
    </div>
    <ChevronRight size={18} className="text-gray-300 group-hover:text-[#E1261C] transition-colors" />
  </div>
);

const ProfileScreen: React.FC = () => (
  <div className="p-6 text-center animate-in fade-in slide-in-from-top-4 duration-500">
    <div className="relative inline-block">
       <div className="w-28 h-28 bg-gray-200 rounded-[2rem] mx-auto mb-6 border-4 border-white shadow-2xl overflow-hidden transform rotate-3">
         <img src="https://picsum.photos/seed/user/200/200" alt="Profile" className="w-full h-full object-cover" />
       </div>
       <div className="absolute -bottom-2 -right-2 bg-[#E1261C] p-2 rounded-xl shadow-lg border-2 border-white">
          <ShieldCheck size={20} className="text-white" />
       </div>
    </div>
    <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Mr. Bipin Mishra</h2>
    <p className="text-[#E1261C] text-xs font-black uppercase tracking-widest mt-1">Founder & Proprietor</p>
    
    <div className="mt-10 space-y-4">
      <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex justify-between items-center text-left hover:border-red-100 transition-colors">
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Quality Verified</p>
          <p className="text-2xl font-black text-gray-900 tracking-tight">24 Batches</p>
        </div>
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
           <ShieldCheck className="text-green-500" size={28} />
        </div>
      </div>
      <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex justify-between items-center text-left hover:border-red-100 transition-colors">
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Customer Trust</p>
          <p className="text-2xl font-black text-gray-900 tracking-tight">4.9 Rating</p>
        </div>
        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
           <Award className="text-orange-400" size={28} />
        </div>
      </div>
    </div>

    <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
       <p className="text-xs text-gray-400 italic font-medium leading-relaxed">
         "Our mission is to provide every household with the purest hydration possible through advanced filtration and transparent labeling."
       </p>
    </div>

    <button className="w-full mt-8 py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-sm tracking-widest uppercase shadow-xl active:scale-95 transition-all">
      ADMIN DASHBOARD
    </button>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'schedule': return <Schedule />;
      case 'store': return <Store />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
