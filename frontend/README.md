# frontend (Next.js static export)

Frontend mẫu dùng Next.js (export ra static site) để demo CI/CD.

## Local dev (Windows)

Tại repo root:

```powershell
npm install
Copy-Item frontend\.env.example frontend\.env.local
npm -w frontend run dev
```

- Frontend dev: `http://localhost:3000`
- Backend dev mặc định: `http://localhost:3001`

> `frontend/.env.local` dùng `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001` để frontend dev gọi API.

## Build static + serve local

```powershell
npm -w frontend run build
npm -w frontend run serve
```

Sau khi build, output nằm ở `frontend/out/`.

## Deploy bằng Docker (khuyến nghị dùng Docker Compose)

Build image:

```powershell
docker build -f frontend\Dockerfile -t devopsintern-frontend:local .
```

Chạy nhanh (chỉ serve static, không có API proxy):

```powershell
docker run --rm -p 8080:80 devopsintern-frontend:local
```

> Container vẫn start được khi không có backend. Khi đó các route `/api/*` sẽ trả lỗi 502/504 cho tới khi backend sẵn sàng.

Deploy đầy đủ (frontend + backend, có proxy `/api/*`):

```powershell
docker compose up -d --build
```

Mở `http://localhost:8080` (hoặc đổi port: `FRONTEND_PORT=8081 docker compose up -d --build`).

## Review API (Swagger)

- Khi chạy bằng Docker Compose: mở `http://localhost:8080/api/docs`
- Khi chạy backend riêng: mở `http://localhost:3001/api/docs`
