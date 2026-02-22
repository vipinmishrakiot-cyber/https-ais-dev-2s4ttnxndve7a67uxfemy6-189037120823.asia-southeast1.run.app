
import React, { useState } from 'react';
import { Calendar, Clock, Bell, ChevronRight, CheckCircle2, RotateCcw, Plus } from 'lucide-react';

const Schedule: React.FC = () => {
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'alternate'>('daily');
  const [activeSlot, setActiveSlot] = useState<string>('morning');

  const upcomingDeliveries = [
    { id: '1', date: 'Tomorrow, Oct 24', time: '07:00 AM', status: 'confirmed' },
    { id: '2', date: 'Saturday, Oct 25', time: '07:00 AM', status: 'pending' },
    { id: '3', date: 'Sunday, Oct 26', time: '07:00 AM', status: 'pending' },
  ];

  return (
    <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Delivery Schedule</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your hydration routine</p>
      </div>

      {/* Subscription Type */}
      <div className="mb-8">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Subscription Frequency</label>
        <div className="grid grid-cols-3 gap-3">
          {(['daily', 'alternate', 'weekly'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFrequency(type)}
              className={`py-3 px-2 rounded-2xl border-2 transition-all font-bold text-xs capitalize ${
                frequency === type 
                  ? 'bg-[#E1261C] border-[#E1261C] text-white shadow-lg shadow-red-200' 
                  : 'bg-white border-gray-100 text-gray-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="mb-8">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Preferred Time Slot</label>
        <div className="space-y-3">
          <TimeSlotCard 
            id="morning" 
            title="Early Morning" 
            time="6:00 AM - 9:00 AM" 
            active={activeSlot === 'morning'} 
            onClick={() => setActiveSlot('morning')}
          />
          <TimeSlotCard 
            id="afternoon" 
            title="Afternoon" 
            time="12:00 PM - 3:00 PM" 
            active={activeSlot === 'afternoon'} 
            onClick={() => setActiveSlot('afternoon')}
          />
          <TimeSlotCard 
            id="evening" 
            title="Evening" 
            time="5:00 PM - 8:00 PM" 
            active={activeSlot === 'evening'} 
            onClick={() => setActiveSlot('evening')}
          />
        </div>
      </div>

      {/* Upcoming Deliveries List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upcoming Deliveries</label>
          <button className="text-[#E1261C] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <Plus size={12} /> Add Manual
          </button>
        </div>
        <div className="space-y-3">
          {upcomingDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-red-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${delivery.status === 'confirmed' ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-300'}`}>
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{delivery.date}</h4>
                  <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    <Clock size={10} /> {delivery.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${delivery.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {delivery.status}
                </span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-gray-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <RotateCcw size={80} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Bell size={16} className="text-[#E1261C]" />
            <h4 className="text-sm font-bold">Subscription Summary</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            You are scheduled for <span className="text-white font-bold">{frequency}</span> delivery during the <span className="text-white font-bold">{activeSlot}</span> slot. Your next delivery is tomorrow.
          </p>
          <button className="mt-6 w-full bg-[#E1261C] py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-900/40 active:scale-95 transition-all">
            Update Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

const TimeSlotCard: React.FC<{ 
  id: string; 
  title: string; 
  time: string; 
  active: boolean; 
  onClick: () => void 
}> = ({ title, time, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
      active ? 'bg-white border-[#E1261C] shadow-md' : 'bg-gray-50 border-transparent opacity-60'
    }`}
  >
    <div>
      <h4 className={`font-black text-sm ${active ? 'text-gray-900' : 'text-gray-500'}`}>{title}</h4>
      <p className="text-[10px] font-bold text-gray-400 mt-0.5">{time}</p>
    </div>
    {active && <CheckCircle2 size={20} className="text-[#E1261C]" />}
  </button>
);

export default Schedule;
