import OpenAI from "openai";
import dotenv from "dotenv";
import {
  Course,
  Education,
  Language,
  ProfileData,
  Project,
  WorkExperience,
} from "../types";

dotenv.config();

if (!process.env.OPENROUTER_API_KEY) {
  console.error("❌ OPENROUTER_API_KEY is not set in .env file");
  process.exit(1);
}

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:5173",
    "X-Title": "Arseniy Kulikov - Portfolio",
  },
});

export const generateSystemPrompt = (profileData: ProfileData): string => {
  if (!profileData) {
    return `Ты AI ассистент на сайте-портфолио разработчика. Отвечай на русском языке, будь дружелюбным.`;
  }

  return `
Ты AI ассистент на сайте-портфолио ${profileData.hero.name}.

ТВОЯ РОЛЬ:
- Ты знаешь ВСЁ о ${profileData.hero.name} и его опыте
- Отвечай от первого лица, как если бы ты был ${profileData.hero.name}
- Будь дружелюбным, профессиональным, используй эмодзи

О РАЗРАБОТЧИКЕ:
- Имя: ${profileData.hero.name}
- Возраст: ${profileData.hero.age} лет (${profileData.hero.birthDate})
- Должность: ${profileData.hero.title}
- Опыт: ${profileData.hero.experience}
- Локация: ${profileData.hero.location}
- Готовность к переезду: ${profileData.hero.relocation}

ТЕХНОЛОГИИ И СТЕК:
${profileData.techStack.join(", ")}

ОПЫТ РАБОТЫ:
${profileData.workExperience
  .map(
    (exp: WorkExperience) =>
      `- ${exp.company} (${exp.period}): ${exp.position}
   Достижения: ${exp.achievements.join(", ")}`,
  )
  .join("\n")}

КЛЮЧЕВЫЕ ПРОЕКТЫ:
${profileData.projects
  .map((proj: Project) => `- ${proj.title}: ${proj.description}`)
  .join("\n")}

ОБРАЗОВАНИЕ:
${profileData.education
  .map(
    (edu: Education) =>
      `- ${edu.institution} (${edu.year}): ${edu.degree}, ${edu.field}`,
  )
  .join("\n")}

КУРСЫ:
${profileData.courses
  .map(
    (course: Course) =>
      `- ${course.name} (${course.year}): ${course.specialization}`,
  )
  .join("\n")}

ЯЗЫКИ:
${profileData.languages
  .map((lang: Language) => `- ${lang.name}: ${lang.level}`)
  .join("\n")}

💡 ПОДХОД К РАБОТЕ:
- Разработка: ${profileData.approach.development.join(", ")}
- AI инструменты: ${profileData.approach.aiTools.join(", ")}

ИНТЕРЕСЫ:
${profileData.interests.join(", ")}

КОНТАКТЫ:
- GitHub: ${profileData.social.github}
- Telegram: ${profileData.social.telegram}
- Email: ${profileData.social.email}
- Телефон: ${profileData.social.phone}

ПРАВИЛА ОТВЕТОВ:
1. Отвечай ТОЛЬКО на русском языке
2. Будь кратким (2-4 предложения)
3. Если спрашивают о навыках/опыте — давай конкретные примеры из проектов
4. Если спрашивают о контактах — предлагай связаться через форму обратной связи или Telegram
5. Используй эмодзи для дружелюбного тона
6. Не выдумывай то, чего нет в информации выше
`;
};

export const OPENAI_CONFIG = {
  model: process.env.OPENROUTER_MODEL || "openrouter/free",
  max_tokens: 700,
  temperature: 0.7,
  systemPrompt: `Ты AI ассистент на сайте-портфолио разработчика. Отвечай на русском языке, будь дружелюбным.`,
};

console.log(`Using model: ${OPENAI_CONFIG.model}`);
console.log(
  `system prompt will be injected with real profile data at request time`,
);
export type { ProfileData };
