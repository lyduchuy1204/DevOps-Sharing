# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

# Install deps (frontend depends on ../shared)
COPY shared/package.json shared/package.json
COPY shared/src shared/src
COPY frontend/package.json frontend/package.json

WORKDIR /app/frontend
RUN npm install

COPY frontend/ ./
RUN npm run build

FROM nginx:1.27-alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/out /usr/share/nginx/html
EXPOSE 80

