export interface Skill {
  name: string;
  category: 'frontend' | 'mobile' | 'creative3d' | 'tools' | 'core';
  level: number; // 0-100
  iconName: string;
  description: string;
  highlight?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: 'web' | 'mobile' | '3d' | 'creative' | 'uiux';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  accentColor: string;
  highlights: string[];
}

export interface CoinCountry {
  country: string;
  flag: string;
  yearRange: string;
  currency: string;
  material: string;
  story: string;
  rarity: 'Common' | 'Vintage' | 'Rare' | 'Treasured';
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  iconType: 'code' | 'mobile' | 'coin' | 'rocket' | 'sparkle';
}

