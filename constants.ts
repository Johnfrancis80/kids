
import { Category, GameLevel } from './types';

export const CATEGORIES: Category[] = [
  { id: 'numbers', name: 'Numbers', icon: '🔢', color: 'bg-orange-500', description: 'Learn to count 1-20!' },
  { id: 'colors', name: 'Colours', icon: '🎨', color: 'bg-blue-500', description: 'Paint with rainbows.' },
  { id: 'animals', name: 'Animals', icon: '🦁', color: 'bg-green-500', description: 'Meet farm & wild friends.' },
  { id: 'food', name: 'Food', icon: '🍰', color: 'bg-pink-500', description: 'Yummy fruits and snacks.' },
  { id: 'clothes', name: 'Clothes', icon: '👕', color: 'bg-purple-500', description: 'Dress up for adventure.' },
  { id: 'house', name: 'House', icon: '🏠', color: 'bg-red-500', description: 'Explore your home.' },
];

export const GAME_LEVELS: GameLevel[] = [
  // Numbers
  { id: 'n1', categoryId: 'numbers', title: 'Find 2', type: 'matching', completed: false, locked: false },
  { id: 'n2', categoryId: 'numbers', title: 'Count the donuts', type: 'counting', completed: false, locked: true },
  { id: 'n3', categoryId: 'numbers', title: 'Word match', type: 'vocabulary', completed: false, locked: true },
  // Colors
  { id: 'c1', categoryId: 'colors', title: 'Ice Cream Fun', type: 'coloring', completed: false, locked: false },
  { id: 'c2', categoryId: 'colors', title: 'Red Apple', type: 'vocabulary', completed: false, locked: true },
  // Animals
  { id: 'a1', categoryId: 'animals', title: 'Farm Friends', type: 'matching', completed: false, locked: false },
  { id: 'a2', categoryId: 'animals', title: 'Jungle Beats', type: 'vocabulary', completed: false, locked: true },
];

export const CHARACTERS = [
  { name: 'Sparky', color: 'text-blue-500', img: 'https://picsum.photos/seed/sparky/300/300' },
  { name: 'Glow', color: 'text-pink-500', img: 'https://picsum.photos/seed/glow/300/300' },
  { name: 'Rusty', color: 'text-red-500', img: 'https://picsum.photos/seed/rusty/300/300' },
  { name: 'Verdi', color: 'text-green-500', img: 'https://picsum.photos/seed/verdi/300/300' },
];
