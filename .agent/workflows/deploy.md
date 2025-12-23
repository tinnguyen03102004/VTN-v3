---
description: Đẩy code lên GitHub và deploy website
---

# Deploy Website lên GitHub

## Bước 1: Kiểm tra trạng thái
Xem các file đã thay đổi:
```bash
git status
```

## Bước 2: Stage các thay đổi
// turbo
Thêm tất cả file đã thay đổi:
```bash
git add .
```

## Bước 3: Commit
Tạo commit với message mô tả thay đổi:
```bash
git commit -m "Mô tả thay đổi của bạn"
```

**Quy tắc đặt tên commit:**
- `feat: <mô tả>` - Thêm tính năng mới
- `fix: <mô tả>` - Sửa lỗi
- `style: <mô tả>` - Thay đổi giao diện
- `refactor: <mô tả>` - Tái cấu trúc code
- `docs: <mô tả>` - Cập nhật tài liệu

## Bước 4: Push lên GitHub
// turbo
Đẩy code lên remote repository:
```bash
git push origin main
```

## Bước 5: Kiểm tra deployment (nếu dùng GitHub Pages)
- Vào **Settings > Pages** trong GitHub repo
- Chọn branch `main` và thư mục `/ (root)`
- Website sẽ live tại: `https://<username>.github.io/<repo-name>/`

## Xử lý lỗi thường gặp

### Lỗi: "Updates were rejected"
```bash
git pull origin main --rebase
git push origin main
```

### Lỗi: "Permission denied"
Kiểm tra SSH key hoặc Personal Access Token đã được cấu hình.
