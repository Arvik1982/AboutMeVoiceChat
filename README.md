# About Me — Портфолио с AI ассистентом

Мое профессиональное портфолио с интеграцией AI-ассистента, который знает все о моем опыте, навыках и проектах.

## Демо

[https://arvik1982.github.io/about-me](https://arvik1982.github.io/about-me)

## О проекте

Это одностраничное портфолио, которое объединяет:

- Презентацию моего профессионального опыта
- Стек технологий и ключевые проекты
- Форму обратной связи с отправкой email
- AI-ассистента, который отвечает на вопросы о моем опыте (на основе реальных данных из резюме)

## Технологии

### Frontend

- React 18, TypeScript, Vite
- CSS Modules (компонентный подход)
- Lucide React (иконки)
- Web Speech API (голосовой ввод)

### Backend

- Node.js, Express, TypeScript
- OpenRouter API (бесплатные AI модели)
- Nodemailer (отправка email через Gmail)

## 🎯 Возможности

- **Информация обо мне** — стек, опыт, проекты, образование
- **Голосовой ввод** — отправка сообщений через микрофон
- **AI ассистент** — отвечает на вопросы о моем опыте (React, React Native, проекты, достижения)
- **Форма обратной связи** — отправка сообщений с копией на email
- **Адаптивный дизайн** — корректно отображается на всех устройствах

## 🚀 Локальный запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/arvik1982/about-me.git
cd about-me
```

### 2. Установка зависимостей сервера и клиента

cd server && npm install
cd ../client && npm install
cd ..

### 3. Настройте переменные окружения

Создайте файл server/.env:

```bash

OPENROUTER_API_KEY=sk-or-v1-ваш_ключ
OPENROUTER_MODEL=openrouter/free
PORT=3001
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
SITE_URL=http://localhost:5173

```

Для отправки писем через Gmail:

Включите двухфакторную аутентификацию в Google
Создайте пароль приложения на странице App Passwords
Используйте 16-значный пароль в EMAIL_PASS

### 4. Запустите приложение

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

### 5. Откройте в браузере

```bash
http://localhost:5173
```
