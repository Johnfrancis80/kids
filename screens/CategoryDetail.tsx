
import React from 'react';
import { Category, GameLevel } from '../types';

interface Props {
  category: Category;
  onBack: () => void;
  onSelectLevel: (level: any) => void;
}

export const CategoryDetail: React.FC<Props> = ({ category, onBack, onSelectLevel }) => {
  const modes = [
    { id: 'quiz', title: 'Smart Quiz', icon: '❓', type: 'quiz', color: 'bg-orange-500' },
    { id: 'story', title: 'Story Time', icon: '📖', type: 'story', color: 'bg-blue-500' },
    { id: 'coloring', title: 'AI Coloring', icon: '🎨', type: 'coloring', color: 'bg-pink-500' },
    { id: 'words', title: 'Word Fun', icon: '🅰️', type: 'vocabulary', color: 'bg-green-500' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 text-white overflow-y-auto no-scrollbar">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">🏠</button>
        <div className="flex-1 text-center">
          <h2 className="text-4xl font-black uppercase tracking-wider">{category.name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelectLevel({ ...mode, categoryId: category.id })}
            className={`${mode.color} group h-40 rounded-[2.5rem] p-6 flex items-center space-x-6 shadow-xl transition transform hover:scale-105 active:scale-95 border-b-8 border-black/20`}
          >
            <div className="w-24 h-24 bg-white rounded-[1.5rem] flex items-center justify-center text-5xl shadow-inner group-hover:rotate-12 transition">
              {mode.icon}
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-black">{mode.title}</h3>
              <p className="opacity-80 font-bold uppercase text-xs tracking-widest">Let's Go!</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto bg-white/10 p-6 rounded-[2rem] border-2 border-dashed border-white/20 text-center">
         <p className="text-lg font-bold">Pick a way to learn about {category.name}!</p>
      </div>
    </div>
  );
};
