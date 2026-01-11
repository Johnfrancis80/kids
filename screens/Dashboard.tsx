
import React, { useEffect, useState } from 'react';
import { UserProfile, Category, Screen } from '../types';
import { CATEGORIES } from '../constants';
import { generateSparkyGreeting, playTTS } from '../services/gemini';

interface Props {
  profile: UserProfile;
  onSelectCategory: (cat: Category) => void;
  onViewReports: () => void;
  onViewStickers: () => void;
}

export const Dashboard: React.FC<Props> = ({ profile, onSelectCategory, onViewReports, onViewStickers }) => {
  const [greeting, setGreeting] = useState("Hi there! I'm Sparky! Let's play!");

  useEffect(() => {
    generateSparkyGreeting(profile.name, profile.age).then(g => {
      setGreeting(g);
      playTTS(g);
    });
  }, [profile]);

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 text-white h-screen overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-3">
          <button className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center border-b-4 border-gray-700 shadow-lg">
            <span className="text-2xl">⚙️</span>
          </button>
          <button onClick={onViewReports} className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center border-b-4 border-blue-800 shadow-lg">
            <span className="text-2xl">📊</span>
          </button>
        </div>
        <button 
           onClick={onViewStickers}
           className="flex items-center space-x-3 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full border-b-4 border-yellow-600 shadow-lg font-black"
        >
          <span className="text-xl">✨</span>
          <span>MY STICKERS ({profile.stickers.length})</span>
        </button>
      </div>

      <div className="flex-1 flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 py-4 px-2 items-center">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => onSelectCategory(cat)}
            className="flex-shrink-0 w-72 snap-center flex flex-col items-center justify-center cursor-pointer transform transition hover:scale-105"
          >
             <div className={`${cat.color} w-full h-96 rounded-[3rem] flex flex-col items-center justify-center p-6 border-b-8 border-black/20 shadow-2xl relative overflow-hidden`}>
                <h3 className="text-3xl font-black mb-4 uppercase text-center">{cat.name}</h3>
                <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
                  <span className="text-8xl">{cat.icon}</span>
                </div>
                <div className="bg-white/20 px-6 py-2 rounded-full font-bold uppercase text-sm">
                   Explore →
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="h-40 flex items-center mt-auto">
        <div className="relative flex-1 flex items-end">
          <img src="https://picsum.photos/seed/sparky/400/400" className="w-32 h-32 drop-shadow-2xl z-10" alt="Sparky" />
          <div className="mb-8 ml-[-10px] bg-white text-gray-800 p-4 rounded-3xl rounded-bl-none shadow-xl max-w-xs border-2 border-orange-500 relative">
            <p className="font-bold text-lg leading-snug">{greeting}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
