
import React, { useState, useEffect } from 'react';
import { Category, UserProfile } from '../types';
import { generateStory, playTTS } from '../services/gemini';

interface Props {
  category: Category;
  profile: UserProfile;
  onBack: () => void;
}

export const StoryScreen: React.FC<Props> = ({ category, profile, onBack }) => {
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    generateStory(category.name, profile.age).then(text => {
      setStory(text);
      setLoading(false);
      playTTS(text);
    });
  }, [category]);

  return (
    <div className="flex-1 flex flex-col p-6 bg-amber-50 rounded-t-[3.5rem] mt-12 shadow-2xl overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-3xl">✖️</button>
        <h2 className="text-2xl font-black text-amber-900">STORY TIME</h2>
        <button onClick={() => story && playTTS(story)} className="text-3xl">🔊</button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-amber-900">
           <div className="text-6xl animate-bounce mb-4">📖</div>
           <p className="font-bold animate-pulse">Sparky is writing your story...</p>
        </div>
      ) : (
        <div className="space-y-6">
           <div className="w-full h-64 bg-white rounded-[2rem] shadow-inner overflow-hidden border-4 border-amber-200">
              <img src={`https://picsum.photos/seed/${category.id}_story/800/600`} className="w-full h-full object-cover" alt="Story" />
           </div>
           <div className="prose prose-lg text-amber-950 font-medium leading-relaxed whitespace-pre-wrap">
              {story}
           </div>
           <button 
             onClick={onBack} 
             className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black shadow-lg border-b-4 border-amber-800 active:scale-95"
           >
             I FINISHED! 🏁
           </button>
        </div>
      )}
    </div>
  );
};
