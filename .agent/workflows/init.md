---
description: Khởi tạo workspace VibeCoding (vibecode init)
---

# /init - Khởi Tạo VibeCoding Workspace

## Mục đích
Tạo cấu trúc thư mục `.vibecode/` để quản lý dự án theo phương pháp VibeCoding.

## Bước 1: Tạo cấu trúc thư mục
// turbo
```bash
mkdir -p .vibecode/sessions .vibecode/library .vibecode/logs .vibecode/learning .vibecode/backups
```

## Bước 2: Tạo file cấu hình
// turbo
Tạo file `.vibecode/vibecode.yaml`:
```yaml
version: "1.0"
project_name: "VTN v3"
max_iterations: 3
auto_backup: true
```

## Bước 3: Tạo file state
// turbo
Tạo file `.vibecode/state.json`:
```json
{
  "current_state": "INIT",
  "current_session": null,
  "spec_hash": null,
  "last_updated": "ISO_TIMESTAMP"
}
```

## Bước 4: Xác nhận
Kiểm tra cấu trúc đã tạo:
```bash
ls -la .vibecode/
```

## Kết quả
Sau khi hoàn tất, bạn có thể sử dụng `/start` để bắt đầu planning.
