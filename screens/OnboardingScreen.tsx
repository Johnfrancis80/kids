
import React from 'react';

interface Props {
  step: 'age' | 'read';
  onComplete: (data: any) => void;
}

export const OnboardingScreen: React.FC<Props> = ({ step, onComplete }) => {
  const ages = ['1', '2', '3', '4', '5', '6', '7', '8', '9+'];

  return (
    <div className="flex-1 flex flex-col p-6 text-white">
      <div className="bg-white rounded-3xl p-6 shadow-xl mb-12 text-center border-b-8 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-500 leading-tight">
          {step === 'age' 
            ? "Select your child's age and whether they can read. This will help us prepare the right course for them."
            : "Can your child read words yet?"}
        </h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {step === 'age' ? (
          <div className="flex flex-col items-center space-y-8">
            <div className="bg-pink-600 px-8 py-2 rounded-lg transform skew-x-[-10deg]">
               <span className="text-2xl font-bold block skew-x-[10deg]">Age:</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {ages.map((age) => (
                <button
                  key={age}
                  onClick={() => onComplete({ age })}
                  className="w-20 h-20 bg-orange-500 hover:bg-orange-400 border-b-4 border-orange-700 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg transition-transform active:scale-90"
                >
                  {age}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-12">
            <div className="bg-orange-500 px-8 py-2 rounded-lg transform skew-x-[10deg]">
               <span className="text-2xl font-bold block skew-x-[-10deg]">Can read:</span>
            </div>

            <div className="flex space-x-8">
              <button
                onClick={() => onComplete({ canRead: true })}
                className="w-32 h-32 bg-orange-600 hover:bg-orange-500 border-b-8 border-orange-800 rounded-3xl flex items-center justify-center shadow-2xl transition-all hover:-translate-y-2 active:scale-95"
              >
                <span className="text-6xl">✅</span>
              </button>
              <button
                onClick={() => onComplete({ canRead: false })}
                className="w-32 h-32 bg-pink-600 hover:bg-pink-500 border-b-8 border-pink-800 rounded-3xl flex items-center justify-center shadow-2xl transition-all hover:-translate-y-2 active:scale-95"
              >
                <span className="text-6xl">❌</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex justify-center">
        <img src="https://picsum.photos/seed/mascot/200/200" className="w-48 h-48 drop-shadow-2xl bounce-subtle" alt="Mascot" />
      </div>
    </div>
  );
};
