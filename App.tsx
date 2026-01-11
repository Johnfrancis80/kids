
import React, { useState } from 'react';
import { Screen, UserProfile, Category, GameLevel } from './types';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { Dashboard } from './screens/Dashboard';
import { CategoryDetail } from './screens/CategoryDetail';
import { GameScreen } from './screens/GameScreen';
import { StoryScreen } from './screens/StoryScreen';
import { ColoringScreen } from './screens/ColoringScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { StickerScreen } from './screens/StickerScreen';
import { CATEGORIES, GAME_LEVELS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [profile, setProfile] = useState<UserProfile>({ 
    age: '5', 
    canRead: false, 
    name: 'Little Hero', 
    stickers: [] 
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);

  const navigateTo = (screen: Screen) => setCurrentScreen(screen);

  const handleWinSticker = (stickerEmoji: string) => {
    setProfile(prev => ({
      ...prev,
      stickers: [...new Set([...prev.stickers, stickerEmoji])]
    }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Welcome:
        return <WelcomeScreen onStart={() => navigateTo(Screen.OnboardingAge)} />;
      case Screen.OnboardingAge:
      case Screen.OnboardingRead:
        return (
          <OnboardingScreen
            step={currentScreen === Screen.OnboardingAge ? 'age' : 'read'}
            onComplete={(data) => {
              setProfile(prev => ({ ...prev, ...data }));
              if (currentScreen === Screen.OnboardingAge) navigateTo(Screen.OnboardingRead);
              else navigateTo(Screen.Dashboard);
            }}
          />
        );
      case Screen.Dashboard:
        return (
          <Dashboard
            profile={profile}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              navigateTo(Screen.CategoryDetail);
            }}
            onViewReports={() => navigateTo(Screen.Reports)}
            onViewStickers={() => navigateTo(Screen.Stickers)}
          />
        );
      case Screen.CategoryDetail:
        return (
          <CategoryDetail
            category={selectedCategory!}
            onBack={() => navigateTo(Screen.Dashboard)}
            onSelectLevel={(level) => {
              setSelectedLevel(level);
              if (level.type === 'story') navigateTo(Screen.Story);
              else if (level.type === 'coloring') navigateTo(Screen.Coloring);
              else navigateTo(Screen.Game);
            }}
          />
        );
      case Screen.Game:
        return (
          <GameScreen
            level={selectedLevel!}
            profile={profile}
            onBack={() => navigateTo(Screen.CategoryDetail)}
            onComplete={() => {
              handleWinSticker('⭐');
              navigateTo(Screen.CategoryDetail);
            }}
          />
        );
      case Screen.Story:
        return (
          <StoryScreen
            category={selectedCategory!}
            profile={profile}
            onBack={() => navigateTo(Screen.CategoryDetail)}
          />
        );
      case Screen.Coloring:
        return (
          <ColoringScreen
            onBack={() => navigateTo(Screen.CategoryDetail)}
            onComplete={() => {
              handleWinSticker('🎨');
              navigateTo(Screen.CategoryDetail);
            }}
          />
        );
      case Screen.Reports:
        return <ReportsScreen onBack={() => navigateTo(Screen.Dashboard)} levels={[]} />;
      case Screen.Stickers:
        return <StickerScreen profile={profile} onBack={() => navigateTo(Screen.Dashboard)} />;
      default:
        return <WelcomeScreen onStart={() => navigateTo(Screen.OnboardingAge)} />;
    }
  };

  return (
    <div className="min-h-screen game-bg text-gray-800 selection:bg-yellow-200">
      <div className="max-w-4xl mx-auto min-h-screen relative overflow-hidden flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
