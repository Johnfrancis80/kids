
export enum Screen {
  Welcome = 'WELCOME',
  OnboardingAge = 'ONBOARDING_AGE',
  OnboardingRead = 'ONBOARDING_READ',
  Dashboard = 'DASHBOARD',
  CategoryDetail = 'CATEGORY_DETAIL',
  Game = 'GAME',
  Story = 'STORY',
  Coloring = 'COLORING',
  Reports = 'REPORTS',
  Stickers = 'STICKERS'
}

export interface UserProfile {
  age: string;
  canRead: boolean;
  name: string;
  stickers: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface GameQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface GameLevel {
  id: string;
  categoryId: string;
  title: string;
  // Added 'matching' and 'counting' to the allowed types to match constants.ts
  type: 'quiz' | 'vocabulary' | 'story' | 'coloring' | 'matching' | 'counting';
  completed: boolean;
  locked: boolean;
}
