# DevOpsIntern Monorepo (Frontend + Backend)

Monorepo mẫu để bạn triển khai CI/CD với GitHub Actions:

- `frontend/`: Next.js (static export) + Nginx serve
- `backend/`: Node.js API (Express) + Dockerfile chạy container local
- `shared/`: module dùng chung giữa frontend/backend
- `.github/workflows/`: pipeline CI và deploy local qua self-hosted runner (Windows)

## Yêu cầu

- Node.js >= 20
- Docker Desktop (Linux containers) + Docker Compose
- Git

## Chạy local (không Docker)

```powershell
cd C:\Users\lyduc\Documents\fec\DevOpsIntern
npm install

# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

- Backend: `http://localhost:3001/health`
- Frontend dev: `http://localhost:3000`

> Lưu ý: Frontend dev gọi API qua biến môi trường `NEXT_PUBLIC_API_BASE_URL` (xem `frontend/.env.example`).

## Chạy local bằng Docker (deploy kiểu “local”)

```powershell
docker compose up -d --build
docker compose ps
```

- Frontend (Nginx): `http://localhost:8080` (có thể đổi bằng `FRONTEND_PORT`)
- Backend (API): `http://localhost:3001`

Nếu bị lỗi port đã bị chiếm (vd `Bind for 0.0.0.0:8080 failed`), chạy:

```powershell
$env:FRONTEND_PORT=8081
docker compose up -d --build
```

## CI/CD (GitHub Actions)

- `CI` chạy trên `push`/`pull_request`: build frontend + build & health-check backend image.
- `Deploy (Self-Hosted Windows)` chạy trên `main` hoặc `workflow_dispatch`: dùng `docker compose up -d --build` để deploy lên máy local (yêu cầu self-hosted runner Windows có Docker).

Chi tiết xem trong:
- `frontend/README.md`
- `backend/README.md`
