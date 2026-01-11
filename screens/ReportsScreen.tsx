
import React from 'react';
import { GameLevel } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  onBack: () => void;
  levels: GameLevel[];
}

export const ReportsScreen: React.FC<Props> = ({ onBack, levels }) => {
  const categoryStats = [
    { name: 'Numbers', value: 45 },
    { name: 'Colours', value: 75 },
    { name: 'Animals', value: 30 },
    { name: 'Food', value: 10 },
  ];

  const COLORS = ['#f97316', '#3b82f6', '#22c55e', '#ec4899'];

  return (
    <div className="flex-1 flex flex-col p-6 text-white overflow-y-auto no-scrollbar">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🏠</button>
        <h2 className="flex-1 text-center text-3xl font-black uppercase">Learning Report</h2>
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-2xl mb-8">
        <h3 className="text-gray-800 text-xl font-bold mb-6 text-center uppercase tracking-widest">Progress by Subject</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryStats}>
              <XAxis dataKey="name" tick={{fill: '#4b5563', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-pink-600 p-6 rounded-[2rem] shadow-xl border-b-8 border-pink-800 flex items-center space-x-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
             <span className="text-4xl font-black text-pink-600">75%</span>
          </div>
          <div>
            <h4 className="text-2xl font-black italic">CHAMPION!</h4>
            <p className="opacity-80">You're doing great with colors!</p>
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl border-b-8 border-blue-800">
           <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-black">Words Learned</span>
              <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">128/400</span>
           </div>
           <div className="w-full bg-black/20 rounded-full h-4">
              <div className="bg-white h-full w-[32%] rounded-full shadow-lg"></div>
           </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <img src="https://picsum.photos/seed/report_mascot/300/300" className="w-48 h-48 drop-shadow-2xl bounce-subtle" alt="Reporter" />
      </div>
    </div>
  );
};
