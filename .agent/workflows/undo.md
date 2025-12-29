---
description: Hoàn tác thay đổi (vibecode undo)
---

# /undo - Hoàn Tác Thay Đổi

## Mục đích
Rollback về trạng thái trước đó khi có lỗi hoặc cần thay đổi hướng.

## Options

### Xem danh sách backups
```
/undo --list
```

### Restore backup gần nhất
```
/undo --last
```

### Restore backup cụ thể
```
/undo --restore {backup-id}
```

## Bước thực hiện

### 1. Liệt kê backups
// turbo
```bash
Get-ChildItem ".vibecode/backups" -Directory | Sort-Object LastWriteTime -Descending
```

### 2. Git Stash (nếu cần)
```bash
git stash push -m "Before undo"
```

### 3. Restore từ backup
```bash
Copy-Item -Recurse ".vibecode/backups/{backup-id}/*" ".vibecode/sessions/{sessionId}/" -Force
```

### 4. Git Checkout (nếu cần)
```bash
git checkout -- .
```

hoặc restore specific files:
```bash
git checkout HEAD~1 -- path/to/file
```

## Cảnh báo
⚠️ Undo sẽ:
- Ghi đè session hiện tại
- KHÔNG tự động undo git commits

## Khôi phục Git
Nếu cần undo git commit:
```bash
# Undo commit nhưng giữ changes
git reset --soft HEAD~1

# Undo commit và bỏ changes
git reset --hard HEAD~1
```
