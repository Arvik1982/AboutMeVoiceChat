import { Request, Response } from "express";

const profileData = {
  hero: {
    name: "Арсений Куликов",
    title: "Frontend-разработчик React/React Native",
    experience:
      "Общий опыт работы в ИТ: 19 лет 11 месяцев из них разработчиком 3 года месяцев",
    description:
      "Специалист по созданию SPA на React, мобильных приложений на React Native. Разрабатывал приложения для iOS и Android с интеграцией платежей, карт и облачных сервисов.",
    avatar: "👨‍💻",
    birthDate: "15 ноября 1982",
    age: 43,
    location: "Санкт-Петербург",
    relocation: "Готов к переезду",
    citizenship: "Россия",
  },
  contacts: {
    phone: "+7 (911) 756-62-63",
    email: "kulikovarseniy@gmail.com",
    telegram: "https://t.me/kulikovarseniy",
    github: "https://github.com/Arvik1982",
    setka: "https://set.k/account/UoxSwzu",
  },
  techStack: [
    "React",
    "React Native",
    "TypeScript",
    "Next.js",
    "Expo",
    "Redux Toolkit",
    "RTK Query",
    "Redux Thunk",
    "TanStack Query",
    "React Hook Form",
    "Zod",
    "Zustand",
    "Tailwind CSS",
    "CSS Modules",
    "Styled Components",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "Supabase",
    "Docker",
    "Git",
    "Webpack",
    "BEM",
    "REST API",
    "GraphQL",
    "Jest",
  ],
  workExperience: [
    {
      company: "ООО СмартТурбоТех",
      period: "Октябрь 2024 — Январь 2026",
      duration: "1 год 4 месяца",
      position: "Разработчик React/React Native",
      achievements: [
        "Внедрил RTK Query в проект",
        "Обнаружил и устранил критические баги с рендерингом маркеров на карте",
        "Провёл анализ и обнаружил несогласованность данных между frontend и backend API",
        "Создал shared пакеты для монорепозитория, вёл UI библиотеку",
        "Оптимизировал вывод больших данных по глубинам",
      ],
      stack:
        "React, Next.js, TypeScript, Redux Toolkit, RTK Query, React Native, Expo, Native Maps, GeoJSON, pnpm, Zod, Zustand, Tailwind CSS, CSS Modules, Styled Components, TanStack Query",
    },
    {
      company: "ООО 'ЭКОСИСТЕМА АЛЬФА'",
      period: "Март 2024 — Октябрь 2024",
      duration: "8 месяцев",
      position: "Разработчик React",
      achievements: [
        "Написание и отладка React, Next.js, TypeScript кода",
        "Вёрстка макетов из Figma",
        "Взаимодействие со смежными командами (UI/UX, бэкенд, тестирование)",
      ],
      stack: "React, Next.js, TypeScript, Redux, REST API",
    },
    {
      company: "Antipoff Group",
      period: "Апрель 2024 — Сентябрь 2024",
      duration: "6 месяцев",
      position: "Младший разработчик React (стажировка)",
      achievements: [
        "Разработка проекта 'Creative Hub' SPA",
        "Адаптивная вёрстка из Figma",
        "Подключение к API, рефакторинг, исправление багов",
      ],
      stack:
        "React, Next.js, Redux, React Router, TypeScript, REST API, MUI Material, SCSS",
    },
    {
      company: "Сбер (rabota.sber.ru)",
      period: "Март 2006 — Февраль 2024",
      duration: "18 лет",
      position: "Старший специалист",
      achievements: [
        "Техническая поддержка пользователей",
        "Настройка программного обеспечения",
        "Администрирование информационной безопасности",
        "Поддержка клиентской части веб-приложения",
      ],
    },
  ],
  education: [
    {
      institution: "Skypro",
      year: "2023",
      degree: "Frontend-разработчик",
      field: "Информационные технологии",
    },
    {
      institution:
        "Санкт-Петербургский государственный электротехнический университет 'ЛЭТИ' им. В.И. Ульянова (Ленина)",
      year: "2006",
      degree: "Инженер",
      field: "Физика и биомедицинская электроника (ФПБЭИ)",
    },
  ],
  courses: [
    {
      name: "JS+React - T1",
      year: "2025",
      specialization: "Frontend разработчик",
    },
    {
      name: "Курс «Web-разработчик»",
      year: "2023",
      institution: "Skyeng/Skypro",
    },
  ],
  languages: [
    { name: "Русский", level: "Родной" },
    { name: "Английский", level: "B1 (Средний)" },
  ],
  projects: [
    {
      id: 1,
      title: "Мобильные приложения (iOS/Android)",
      description:
        "Разработка мобильных приложений на React Native для RuStore/Google Play/App Store. Включая интеграцию платежных шлюзов (YooKassa), облачных сервисов (Firebase, Supabase), карт через react-native-maps (геолокация, маркеры, маршруты). 25k+ скачиваний.",
      tags: [
        "React Native",
        "Expo",
        "Firebase",
        "Supabase",
        "YooKassa",
        "Maps",
      ],
      downloads: "25k+",
    },
    {
      id: 2,
      title: "AI Voice Chat Assistant",
      description:
        "Full-stack приложение с голосовым вводом и интеграцией ChatGPT. Деплой на GitHub Pages + Render.",
      tags: ["React", "TypeScript", "Node.js", "OpenRouter", "Web Speech API"],
      github: "https://github.com/Arvik1982/chat",
      demo: "https://arvik1982.github.io/chat",
    },
    {
      id: 3,
      title: "Creative Hub SPA",
      description:
        "Single Page Application для творческой платформы с адаптивной вёрсткой и интеграцией API.",
      tags: ["React", "Next.js", "Redux", "TypeScript", "MUI"],
    },
    {
      id: 4,
      title: "Monorepo UI Library",
      description:
        "Создание shared пакетов для монорепозитория, ведение UI библиотеки для гибридных проектов веб + мобильные.",
      tags: ["pnpm", "React", "React Native", "npm workspaces"],
    },
  ],
  approach: {
    development: [
      "Чистый код и код-ревью",
      "Тестирование (Jest, React Testing Library)",
      "Адаптивный и доступный дизайн",
      "Оптимизация производительности",
      "Работа в монорепозитории (npm/pnpm)",
      "CI/CD процессы",
    ],
    aiTools: [
      "GitHub Copilot для ускорения разработки",
      "ChatGPT для документации и анализа кода",
      "OpenRouter для интеграции AI в проекты",
      "PHP + AI для генерации PDF альбомов",
    ],
  },
  interests: [
    "Разработка сложных UI/UX с интеграцией API",
    "Интеграция платежных систем",
    "React, Next.js, React Native, TanStack Query, React Hook Form",
    "npm workspaces и TurboRepo",
    "Масштабируемая архитектура приложений",
  ],
  workPreferences: {
    schedule: "5/2 с 9 до 18",
    formats: ["Офис", "Гибрид", "Удалённо"],
    position: "Frontend-разработчик React/React Native",
    employmentType: "Полная занятость",
  },
  social: {
    github: "https://github.com/Arvik1982",
    telegram: "https://t.me/kulikovarseniy",
    email: "kulikovarseniy@gmail.com",
    phone: "+7 (911) 756-62-63",
    setka: "https://set.k/account/UoxSwzu",
  },
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: profileData });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
};
export { profileData };
