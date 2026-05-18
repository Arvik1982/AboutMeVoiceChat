# AI Voice Chat Assistant

Full-stack приложение с голосовым вводом и интеграцией ChatGPT.

## Демо

[https://arvik1982.github.io/chat](https://arvik1982.github.io/chat)

## Технологии

- React 18, TypeScript, Vite, CSS Modules
- Node.js, Express, TypeScript
- OpenRouter API (бесплатные AI модели)
- Web Speech API (голосовой ввод)

## Возможности

- Отправка текстовых сообщений
- Голосовой ввод через микрофон
- Автоматическое распознавание речи
- Адаптивный дизайн

## Локальный запуск

Клонируйте репозиторий:

```bash
git clone https://github.com/arvik1982/chat.git
cd chat
npm run install:all
```

Создайте файл server/.env с вашим OpenRouter ключом:

```bash
OPENROUTER_API_KEY=sk-or-v1-ваш_ключ
OPENROUTER_MODEL=gopenrouter/auto
PORT=3001
```
запуск приложения

```bash
npm run dev

```
Демо:
https://arvik1982.github.io/chat/