# backend (Node.js API + Docker)

API mẫu (Express) để demo CI/CD + deploy local container.

## Chạy local (không Docker)

Tại repo root:

```powershell
npm install
Copy-Item backend\.env.example backend\.env
npm -w backend run dev
```

Test:

- `http://localhost:3001/health`
- `http://localhost:3001/api/hello?name=DevOps`
- `http://localhost:3001/api/info`
- `http://localhost:3001/api/add?a=1&b=2`

Swagger UI:

- `http://localhost:3001/api/docs`
- Spec JSON: `http://localhost:3001/api/openapi.json`

POST JSON (ví dụ):

```powershell
Invoke-RestMethod -Method Post -ContentType application/json -Body '{\"name\":\"DevOps\"}' http://localhost:3001/api/hello
```

## Build Docker image

> Build context phải là repo root (để copy được `shared/`).

```powershell
docker build -f backend\Dockerfile -t devopsintern-backend:local .
```

## Run container local

```powershell
docker run --rm -p 3001:3001 --env-file backend\.env devopsintern-backend:local
```

## Deploy nhanh bằng Docker Compose

```powershell
docker compose up -d --build
```
