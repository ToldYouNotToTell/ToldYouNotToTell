# ToldYouNotToTell

Платформа для анонимного сторителлинга с интеграцией Phantom Wallet, токеном TYNTT и системой ежедневных наград.

## Структура проекта

C:\toldyounottotell ├── .gitignore ├── firebase.json ├── .firebaserc ├── README.md ├── package.json ├── tsconfig.json ├── src
│ └── app
│ ├── layout.tsx │ ├── page.tsx │ └── api\verify-captcha\route.ts └── functions
├── package.json ├── tsconfig.json └── src\index.ts

shell
Копировать код

## Переменные окружения

### Фронтенд

В корне проекта создайте файл `.env.local` и заполните:
NEXT_PUBLIC_FIREBASE_API_KEY=ваш_apiKey NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ваш_authDomain NEXT_PUBLIC_FIREBASE_PROJECT_ID=ваш_projectId NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ваш_storageBucket NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=ваш_messagingSenderId NEXT_PUBLIC_FIREBASE_APP_ID=ваш_appId

bash
Копировать код

### Cloud Functions

В папке `functions/` создайте файл `.env` и заполните:
RECAPTCHA_SECRET_KEY=ваш_secretKey

markdown
Копировать код

## Установка

1. Клонируйте репозиторий и перейдите в папку проекта:
git clone https://github.com/ToldYouNotToTell/ToldYouNotToTell.git cd ToldYouNotToTell

markdown
Копировать код
2. Установите зависимости фронтенда:
npm install

markdown
Копировать код
3. Установите зависимости функций:
cd functions npm install cd ..

markdown
Копировать код

## Локальный запуск

- Фронтенд:
npm run dev

diff
Копировать код
- Эмулятор Cloud Functions:
npm run serve:functions

markdown
Копировать код

## Деплой

- Фронтенд:
npm run build npm run start

diff
Копировать код
- Cloud Functions:
npm run deploy:functions