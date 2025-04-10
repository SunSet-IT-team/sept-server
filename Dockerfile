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

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]