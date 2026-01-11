
import React, { useState, useEffect } from 'react';
import { GameLevel, UserProfile, GameQuestion } from '../types';
import { generateQuiz, playTTS } from '../services/gemini';

interface Props {
  level: any;
  profile: UserProfile;
  onBack: () => void;
  onComplete: () => void;
}

export const GameScreen: React.FC<Props> = ({ level, profile, onBack, onComplete }) => {
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    generateQuiz(level.categoryId, profile.age).then(data => {
      setQuestions(data);
      setLoading(false);
      if (data.length > 0) playTTS(data[0].question);
    });
  }, [level]);

  const handleAnswer = (choice: string) => {
    const isCorrect = choice === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setFeedback("YES! 🌟");
      playTTS("Amazing! You got it right!");
      setTimeout(() => {
        setFeedback(null);
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(prev => prev + 1);
          playTTS(questions[currentIdx + 1].question);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setFeedback("Try again! 🌈");
      playTTS("Not quite, try another one!");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center text-white">
      <div className="w-24 h-24 border-8 border-white border-t-orange-500 rounded-full animate-spin mb-6"></div>
      <p className="text-2xl font-black animate-pulse">GENERATING ADVENTURE...</p>
    </div>
  );

  if (!questions.length) return (
    <div className="flex-1 flex flex-col items-center justify-center text-white">
      <p>Sparky is thinking... try again!</p>
      <button onClick={onBack} className="mt-4 bg-white text-orange-500 px-6 py-2 rounded-full font-bold">Go Back</button>
    </div>
  );

  const q = questions[currentIdx];

  return (
    <div className="flex-1 flex flex-col p-6 bg-white rounded-t-[3.5rem] mt-12 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-3xl">✖️</button>
        <div className="flex-1 flex justify-center">
          <div className="bg-orange-100 px-4 py-1 rounded-full flex space-x-2">
            {questions.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i <= currentIdx ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            ))}
          </div>
        </div>
        <button onClick={() => playTTS(q.question)} className="text-3xl">🔊</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-sky-50 p-8 rounded-[2rem] border-4 border-sky-200 mb-12 text-center w-full">
           <h2 className="text-2xl md:text-3xl font-black text-sky-900 leading-tight">
             {q.question}
           </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
           {q.options.map((opt, i) => (
             <button
               key={i}
               onClick={() => handleAnswer(opt)}
               className="bg-white hover:bg-orange-50 border-4 border-gray-100 hover:border-orange-400 p-6 rounded-[1.5rem] text-xl font-bold transition shadow-lg text-left flex items-center space-x-4"
             >
                <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-black">{i+1}</span>
                <span>{opt}</span>
             </button>
           ))}
        </div>
      </div>

      {feedback && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
          <div className="text-center animate-bounce">
            <span className="text-7xl block mb-4">{feedback.includes('YES') ? '🎉' : '💫'}</span>
            <span className="text-4xl font-black text-orange-600 uppercase tracking-tighter">{feedback}</span>
          </div>
        </div>
      )}
    </div>
  );
};
