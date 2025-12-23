---
description: Khởi động local development server để preview website
---

# Chạy Development Server

## Bước 1: Khởi động server
// turbo
Chạy lệnh sau tại thư mục gốc của project:
```bash
npx -y serve -l 8000
```

> **Lưu ý**: Nếu có Python, có thể dùng: `python -m http.server 8000`

## Bước 2: Mở trình duyệt
Truy cập các URL sau để xem website:
- **Trang chủ**: http://localhost:8000
- **Trang About**: http://localhost:8000/about.html
- **Trang Project**: http://localhost:8000/project.html?id=house-for-trees

## Bước 3: Dừng server
Nhấn `Ctrl + C` trong terminal để dừng server.

## Lưu ý
- Server sẽ tự động refresh khi bạn reload trang trong trình duyệt
- Nếu port 8000 đã được sử dụng, thay đổi thành port khác: `python -m http.server 8080`
