# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app

# Install deps (backend depends on ../shared)
COPY shared/package.json shared/package.json
COPY shared/src shared/src
COPY backend/package.json backend/package.json

WORKDIR /app/backend
RUN npm install --omit=dev

COPY backend/src ./src

EXPOSE 3001
CMD ["node", "src/index.js"]

