import type { Skill, Project, CoinCountry, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: "Ankith Mahindrakar",
  nickname: "Ankit",
  handle: "@whoisanki",
  yearsMobileExp: "5+ Years",
  phone: "+91 8088906764",
  roles: [
    "Senior Mobile Engineer",
    "React Native & FinTech Architect",
    "Creative 3D & Frontend Developer",
    "Numismatics Curator"
  ],
  tagline: "Architecting enterprise FinTech mobile apps in React Native and immersive 3D web systems.",
  introBio: "Senior Mobile Engineer specializing in high-throughput React Native applications across banking, retail e-commerce, and healthcare. Driven by fluid 60/120 FPS Reanimated motion, biometric security, microservices architecture, and vintage global coinage.",
  email: "whoisanki@gmail.com",
  location: "Hyderabad, India",
  yearsCollecting: "Since age 12",
  countriesCollectedCount: "26+",
  stats: [
    { label: "Mobile Experience", value: "5+ Yrs", highlight: "React Native" },
    { label: "Enterprise Apps", value: "15+", highlight: "High Scale" },
    { label: "Coin Archive", value: "26+", highlight: "Countries" },
    { label: "Motion Target", value: "60 FPS", highlight: "Reanimated" }
  ],
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/whoisanki",
      icon: "Github",
      username: "@whoisanki",
      color: "hover:text-white"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ankith-mahindrakar-002330165",
      icon: "Linkedin",
      username: "Ankith Mahindrakar",
      color: "hover:text-white"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/whoisanki/",
      icon: "Instagram",
      username: "@whoisanki",
      color: "hover:text-white"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/ankit.mahindrakar/",
      icon: "Facebook",
      username: "ankit.mahindrakar",
      color: "hover:text-white"
    }
  ]
};

export const SKILLS_DATA: Skill[] = [
  // Mobile & FinTech
  {
    name: "React Native & Expo",
    category: "mobile",
    level: 96,
    iconName: "Smartphone",
    description: "Cross-platform iOS/Android, native modules, Hermes engine, Tamagui shared UI, and app store deployment.",
    highlight: true
  },
  {
    name: "FinTech Security & Workflows",
    category: "mobile",
    level: 94,
    iconName: "ShieldCheck",
    description: "Biometric auth (FaceID/Fingerprint), secure storage encryption, token lifecycle & multi-stage approvals.",
    highlight: true
  },
  {
    name: "React Native Reanimated & Gestures",
    category: "mobile",
    level: 92,
    iconName: "Sparkles",
    description: "60/120 FPS native UI thread animations, interactive gesture handlers, and fluid financial charts.",
    highlight: true
  },
  {
    name: "State & Architecture",
    category: "mobile",
    level: 92,
    iconName: "Activity",
    description: "Redux Toolkit, React Query, WebSocket live feeds, and offline-first state synchronization.",
    highlight: false
  },

  // Frontend
  {
    name: "React & Next.js",
    category: "frontend",
    level: 95,
    iconName: "Atom",
    description: "Component architecture, custom hooks, state management & server/client rendering.",
    highlight: true
  },
  {
    name: "JavaScript (ES6+) & TypeScript",
    category: "frontend",
    level: 96,
    iconName: "FileCode2",
    description: "Asynchronous programming, event loop mechanics, strict typing, interfaces, and generics.",
    highlight: true
  },
  {
    name: "HTML5 & Modern CSS3",
    category: "frontend",
    level: 98,
    iconName: "Layout",
    description: "Semantic layouts, responsive flex/grid architectures, and hardware-accelerated animations.",
    highlight: false
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: 94,
    iconName: "Palette",
    description: "Rapid, maintainable utility-first design systems with dark mode and glassmorphism.",
    highlight: false
  },

  // 3D & Creative
  {
    name: "Three.js & React Three Fiber",
    category: "creative3d",
    level: 88,
    iconName: "Box",
    description: "Interactive 3D WebGL scenes, lighting models, PBR metallic materials, and camera dynamics.",
    highlight: true
  },
  {
    name: "Framer Motion",
    category: "creative3d",
    level: 92,
    iconName: "Sparkles",
    description: "Scroll-driven SVG paths, spring physics, layout transitions, and interactive gesture feedback.",
    highlight: false
  },
  {
    name: "UI/UX & Micro-Interactions",
    category: "creative3d",
    level: 90,
    iconName: "Layers",
    description: "Delightful audio-visual feedback, accessible components, and responsive interaction design.",
    highlight: false
  },

  // Tools & Architecture
  {
    name: "NestJS & GraphQL / REST APIs",
    category: "tools",
    level: 90,
    iconName: "Zap",
    description: "Microservices backend architecture, TypeORM, PostgreSQL, and optimized GraphQL schemas.",
    highlight: true
  },
  {
    name: "Git & Mobile CI/CD",
    category: "tools",
    level: 90,
    iconName: "GitBranch",
    description: "Fastlane release automation, GitHub Actions, and production release governance.",
    highlight: false
  },
  {
    name: "Performance & Profiling",
    category: "tools",
    level: 92,
    iconName: "Gauge",
    description: "Hermes memory leak profiling, JS bridge optimization, and bundle size reduction.",
    highlight: false
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "mashreq-bank-suite",
    title: "Mashreq Bank Mobile Banking Platform",
    subtitle: "Internal Transfers & Liquidity (Publicis Sapient - Current Project)",
    description: "Leading development of high-performance Internal Fund Transfer journeys for Mashreq Bank. Building an enterprise Beneficiary Management System with validation pipelines, and developing automated Liquidity Management capabilities for corporate Sweeps and Pools with secure API integrations.",
    tags: ["React Native", "TypeScript", "Liquidity Sweeps & Pools", "Beneficiary System", "Security APIs", "Redux"],
    category: "mobile",
    featured: true,
    accentColor: "from-zinc-100 to-zinc-400",
    highlights: [
      "Leading Internal Fund Transfer journeys with high-performance transaction flows",
      "End-to-end Beneficiary Management System (creation, validation & integration)",
      "Liquidity Management capabilities for automated Sweeps and Pools workflows",
      "Reusable mobile banking modules and shared enterprise business logic"
    ],
    liveUrl: "https://whoisanki.github.io/",
    githubUrl: "https://github.com/whoisanki"
  },
  {
    id: "adcb-banking-suite",
    title: "ADCB Mobile Banking & Payment Suite",
    subtitle: "Enterprise FinTech & Tamagui Architecture (Publicis Sapient)",
    description: "Architected and delivered mission-critical payment journeys for Abu Dhabi Commercial Bank (ADCB), including Domestic Transfers, Wage Protection System (WPS), VAT/Pension transfers, and multi-stage Approval Workflows. Implemented a shared UI & business logic layer for Web and Mobile using React Native + Tamagui, contributing to a 22% increase in Domestic Transfer adoption.",
    tags: ["React Native", "Tamagui", "TypeScript", "Redux Toolkit", "Biometrics", "WPS", "Approval Workflows"],
    category: "mobile",
    featured: true,
    accentColor: "from-zinc-100 to-zinc-400",
    highlights: [
      "22% increase in Domestic Transfer adoption & usage across banking customers",
      "Shared Web & Mobile UI architecture using React Native + Tamagui",
      "Configurable Multi-Stage Approval Workflows for corporate authorization",
      "Automated Standing Instructions & Recurring Payment engine"
    ],
    liveUrl: "https://whoisanki.github.io/",
    githubUrl: "https://github.com/whoisanki"
  },
  {
    id: "dollar-tree-ecommerce",
    title: "Dollar Tree / Family Dollar Mobile App",
    subtitle: "High-Scale Retail E-Commerce (Publicis Sapient)",
    description: "Led end-to-end development of high-traffic Product Details Page (PDP) and Product Listing Page (PLP) in React Native. Built server-driven product filtering, optimized rendering for massive product catalogs, and designed modular UI architectures, achieving a 12% sales increase post-launch.",
    tags: ["React Native", "TypeScript", "Server-Driven UI", "Performance", "Redux", "Jest"],
    category: "mobile",
    featured: true,
    accentColor: "from-zinc-100 to-zinc-400",
    highlights: [
      "12% sales increase following the new UI & PDP/PLP rollout",
      "Server-driven dynamic product filtering and recommendation engine",
      "Sub-100ms interaction latency across vast product catalogs",
      "Cross-platform responsive design system for diverse device sizes"
    ],
    liveUrl: "https://whoisanki.github.io/",
    githubUrl: "https://github.com/whoisanki"
  },
  {
    id: "mobicure-healthcare",
    title: "Mobicure Virtual Healthcare Platform",
    subtitle: "Telemedicine & Doctor Consultations (Accellor)",
    description: "Comprehensive patient-doctor healthcare mobile app featuring real-time encrypted video consultations via Azure Calling Services (1,000+ monthly calls), in-app prescription PDF viewer, instant messaging, and a NestJS + PostgreSQL microservices backend with GraphQL APIs.",
    tags: ["React Native", "Azure Calling", "NestJS", "GraphQL", "PostgreSQL", "Gifted Chat"],
    category: "mobile",
    featured: true,
    accentColor: "from-zinc-100 to-zinc-400",
    highlights: [
      "1,000+ virtual doctor-patient video consultations per month with high call reliability",
      "25% home screen rendering speedup via memoized component optimizations",
      "Zero external dependency in-app prescription PDF viewer for 100% of records",
      "NestJS GraphQL backend reducing API over-fetching by ~30%"
    ],
    liveUrl: "https://whoisanki.github.io/",
    githubUrl: "https://github.com/whoisanki"
  },
  {
    id: "derwent-london-booking",
    title: "Derwent London Smart Workspace Suite",
    subtitle: "Meeting Room & Event Management (Accellor)",
    description: "Corporate workspace and meeting room booking mobile solution across prestigious London office locations. Integrated dynamic deep linking (cutting onboarding by 50%), interactive floor/office previews, and silky 60 FPS Reanimated gesture interactions.",
    tags: ["React Native", "Reanimated 3", "Deep Linking", "TypeScript", "Microservices"],
    category: "mobile",
    featured: false,
    accentColor: "from-zinc-100 to-zinc-400",
    highlights: [
      "50% reduction in user navigation steps with smart dynamic deep linking",
      "Consistent 60 FPS fluid gesture animations using React Native Reanimated",
      "25+ modular reusable UI components reducing codebase duplication by 35%",
      "Multi-release library upgrades with zero production regressions"
    ],
    liveUrl: "https://whoisanki.github.io/",
    githubUrl: "https://github.com/whoisanki"
  },
  {
    id: "numisma-3d",
    title: "3D Numismatics Interactive Vault",
    subtitle: "Interactive 3D Coin Exploration & Country Archive",
    description: "A showcase of coins collected across 26+ countries featuring realistic 3D mesh rendering, specular highlights, dynamic material shaders (Gold, Cyber Silver, Ancient Bronze), and historical trivia.",
    tags: ["React", "Three.js", "R3F", "Framer Motion", "Tailwind CSS"],
    category: "3d",
    featured: true,
    accentColor: "from-zinc-100 to-zinc-400",
    highlights: [
      "Real-time 3D PBR materials and rotational physics",
      "Interactive 26+ country coin collection database",
      "Dynamic lighting and micro-audio sound feedback"
    ],
    liveUrl: "#numismatics",
    githubUrl: "https://github.com/whoisanki"
  }
];

export const COIN_COUNTRIES_DATA: CoinCountry[] = [
  {
    country: "India",
    flag: "🇮🇳",
    yearRange: "1950 - Present",
    currency: "Rupee (₹)",
    material: "Cupro-Nickel & Stainless Steel",
    story: "The foundation of the collection. Started with classic commemorative Indian rupees honoring national heritage and scientific achievements.",
    rarity: "Treasured"
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    yearRange: "1971 - Present",
    currency: "Pound Sterling (£)",
    material: "Nickel-Brass & Bimetallic",
    story: "Intricately minted decimal coinage with royal heraldry and stunning edge inscriptions.",
    rarity: "Vintage"
  },
  {
    country: "United States",
    flag: "🇺🇸",
    yearRange: "1965 - Present",
    currency: "Dollar ($)",
    material: "Clad & Copper-Nickel",
    story: "State quarters series and commemorative half dollars featuring historic landmarks.",
    rarity: "Common"
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    yearRange: "Showa to Reiwa",
    currency: "Yen (¥)",
    material: "Aluminum & Brass",
    story: "The iconic 5 Yen lucky coin with the center hole and rice ear motif symbolizing prosperity.",
    rarity: "Rare"
  },
  {
    country: "Eurozone",
    flag: "🇪🇺",
    yearRange: "2002 - Present",
    currency: "Euro (€)",
    material: "Bimetallic Brass/Cupronickel",
    story: "Coins from Germany, France, Italy, and Spain each featuring unique national reverse motifs.",
    rarity: "Common"
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    yearRange: "1973 - Present",
    currency: "Dirham (د.إ)",
    material: "Cupro-Nickel",
    story: "Distinctive Dallah (traditional coffee pot) emblem celebrating Arabian hospitality.",
    rarity: "Vintage"
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    yearRange: "1985 - Present",
    currency: "Singapore Dollar (S$)",
    material: "Multi-layered Plated Steel",
    story: "Flora and fauna series showcasing the Lion City's modern botanical beauty.",
    rarity: "Vintage"
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    yearRange: "1966 - Present",
    currency: "Australian Dollar (A$)",
    material: "Aluminium-Bronze",
    story: "Iconic Australian wildlife: Kangaroos, Platypus, and Echidnas in high relief.",
    rarity: "Rare"
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "June 2024 - Present",
    title: "Publicis Sapient",
    subtitle: "Senior Developer Mobile Solutions",
    description: "Leading React Native mobile architecture across top-tier enterprise clients including Mashreq Bank (Fund Transfers, Liquidity Sweeps & Pools), Abu Dhabi Commercial Bank (ADCB Payments & Tamagui UI layer), and Dollar Tree/Family Dollar (E-Commerce PDP/PLP).",
    tag: "Senior Mobile Engineer",
    iconType: "mobile"
  },
  {
    year: "April 2021 - June 2024",
    title: "Accellor",
    subtitle: "Software Engineer 2",
    description: "Developed and scaled consumer-focused applications including Mobicure (telemedicine video calling, in-app prescription PDF viewer, NestJS microservices) and Derwent London (smart workplace booking with 60 FPS Reanimated motion).",
    tag: "Full Stack Mobile",
    iconType: "code"
  },
  {
    year: "June 2016 - May 2019",
    title: "Dayananda Sagar College of Engineering",
    subtitle: "Bachelor of Engineering (Electrical & Electronics) • 8.5 CGPA",
    description: "Graduated with 8.5 CGPA in Bengaluru, building strong analytical, systems engineering, and software foundations.",
    tag: "Education",
    iconType: "rocket"
  },
  {
    year: "Since Age 12",
    title: "Numismatics & World Coin Archive",
    subtitle: "26+ Countries Currency Collection",
    description: "Lifelong passion collecting authentic proof and circulation coinage across 26+ countries, discovering the art, metallurgy, and history behind world currencies.",
    tag: "Numismatics",
    iconType: "coin"
  }
];
