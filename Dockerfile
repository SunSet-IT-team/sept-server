FROM node:18-alpine

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
COPY prisma ./prisma

# Установка Prisma CLI и зависимостей
RUN npm install -g prisma
RUN npm install

# Генерация Prisma клиента
RUN npx prisma generate

# Копирование остальных файлов
COPY . .

# Сборка приложения
RUN npm run build

# Можно добавить выполнение миграций при старте
# RUN npx prisma migrate deploy

EXPOSE 3000
CMD ["npm", "start"]