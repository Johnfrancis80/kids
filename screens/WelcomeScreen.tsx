
import React from 'react';

interface Props {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-12">
        <div className="bg-white/90 px-8 py-4 rounded-3xl shadow-2xl rotate-[-2deg] mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-orange-500 drop-shadow-sm">
            English for kids
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-16 relative">
        <img src="https://picsum.photos/seed/k1/200/200" className="w-32 h-32 rounded-full border-4 border-white shadow-lg bounce-subtle" alt="Mascot" />
        <img src="https://picsum.photos/seed/k2/200/200" className="w-40 h-40 rounded-full border-4 border-white shadow-xl -mt-8" alt="Mascot" />
        <img src="https://picsum.photos/seed/k3/200/200" className="w-32 h-32 rounded-full border-4 border-white shadow-lg bounce-subtle" style={{animationDelay: '0.5s'}} alt="Mascot" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {['🍎 apple', '🏠 house', '🍰 cake', '🔢 numbers'].map((tag, i) => (
          <div key={i} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-lg border border-white/30">
            {tag}
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-12 py-6 font-bold text-white transition-all duration-200 bg-orange-600 rounded-full sm:w-auto hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 active:scale-95 shadow-xl"
      >
        <span className="text-3xl">START ADVENTURE! 🚀</span>
      </button>
      
      <p className="mt-8 text-white/60 font-medium tracking-widest">v 1.58.443</p>
    </div>
  );
};
