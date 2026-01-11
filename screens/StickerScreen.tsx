
import React from 'react';
import { UserProfile } from '../types';

interface Props {
  profile: UserProfile;
  onBack: () => void;
}

export const StickerScreen: React.FC<Props> = ({ profile, onBack }) => {
  return (
    <div className="flex-1 flex flex-col p-6 text-white overflow-y-auto no-scrollbar">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">🏠</button>
        <div className="flex-1 text-center">
          <h2 className="text-4xl font-black uppercase tracking-wider">MY STICKERS</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
        {profile.stickers.length === 0 ? (
          <div className="col-span-full py-20 text-center opacity-60">
            <span className="text-8xl block mb-4">😿</span>
            <p className="text-xl font-bold uppercase">No stickers yet. Play games to win some!</p>
          </div>
        ) : (
          profile.stickers.map((s, i) => (
            <div 
              key={i} 
              className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-2xl animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {s}
            </div>
          ))
        )}
      </div>

      <div className="mt-auto bg-yellow-400 p-8 rounded-[3rem] text-yellow-900 border-b-8 border-yellow-600 shadow-2xl">
         <h3 className="text-3xl font-black mb-2">STICKER MASTER!</h3>
         <p className="font-bold">You have earned {profile.stickers.length} stickers so far. Can you get to 50?</p>
      </div>
    </div>
  );
};
