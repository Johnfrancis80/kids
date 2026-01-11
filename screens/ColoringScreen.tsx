
import React, { useState, useEffect } from 'react';
import { generateColoringPage, playTTS } from '../services/gemini';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

export const ColoringScreen: React.FC<Props> = ({ onBack, onComplete }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");

  const handleGenerate = async () => {
    if (!subject) return;
    setLoading(true);
    playTTS(`Generating a coloring page of ${subject}`);
    const img = await generateColoringPage(subject);
    setImage(img);
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-pink-50 rounded-t-[3.5rem] mt-12 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-3xl">✖️</button>
        <h2 className="text-2xl font-black text-pink-900">COLORING MAGIC</h2>
        <div className="w-8"></div>
      </div>

      {!image ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
           <div className="bg-white p-6 rounded-[2rem] shadow-xl w-full text-center">
              <p className="font-bold mb-4">What do you want to color today?</p>
              <input 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: A friendly dragon"
                className="w-full p-4 rounded-xl border-2 border-pink-200 text-center text-lg"
              />
           </div>
           <button 
             onClick={handleGenerate}
             disabled={loading || !subject}
             className="bg-pink-600 text-white px-12 py-4 rounded-full font-black shadow-xl disabled:opacity-50"
           >
             {loading ? "WAVING MAGIC WAND..." : "CREATE ART! ✨"}
           </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
           <div className="flex-1 bg-white rounded-[2.5rem] p-4 shadow-inner border-4 border-pink-200 relative overflow-hidden flex items-center justify-center">
             <img src={image} className="max-w-full max-h-full" alt="Coloring Page" />
             <div className="absolute inset-0 bg-transparent cursor-crosshair"></div>
           </div>
           
           <div className="mt-6 flex space-x-4 items-center overflow-x-auto pb-4">
              {['🔴','🟠','🟡','🟢','🔵','🟣','🎨'].map(c => (
                <button key={c} className="w-12 h-12 bg-white rounded-full shadow-md text-2xl flex-shrink-0">{c}</button>
              ))}
              <button onClick={onComplete} className="ml-auto bg-green-500 text-white px-6 py-3 rounded-full font-black">DONE!</button>
           </div>
        </div>
      )}
    </div>
  );
};
