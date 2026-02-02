# shared

Package dùng chung trong monorepo (`@repo/shared`) để demo việc chia sẻ code giữa `frontend/` và `backend/`.

## Dùng trong code

```js
import { buildHelloMessage } from "@repo/shared";
```

## Ghi chú

- Đây là package ESM (`"type": "module"`).
- Không có bước build riêng (code chạy trực tiếp từ `shared/src`).

