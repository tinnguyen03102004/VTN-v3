---
description: Tạo release version (vibecode snapshot)
---

# /snapshot - Tạo Release Version

## Mục đích
Đánh dấu version hoàn thành, tạo backup và commit.

## Điều kiện
- State phải là `REVIEW_PASSED`

## Bước 1: Tạo Backup
// turbo
```bash
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item -Recurse ".vibecode/sessions/$sessionId" ".vibecode/backups/$sessionId-$timestamp"
```

## Bước 2: Tạo Release Notes
Tạo file trong `.vibecode/library/release-{hash}.md`:

```markdown
# Release: {hash}

**Date:** {timestamp}
**Session:** {sessionId}

## Summary
[Tóm tắt từ contract goal]

## Changes
[Liệt kê từ build report]

## Files Changed
- file1.js (created)
- file2.css (modified)

## Verified By
- Acceptance criteria: ✅ All passed
- Tests: ✅ Passed
```

## Bước 3: Git Commit
// turbo
```bash
git add .
git commit -m "feat: [Goal từ contract]

Spec-Hash: {hash}
Session: {sessionId}"
```

## Bước 4: Cập nhật State
```json
{
  "current_state": "SHIPPED",
  "shipped_at": "ISO_TIMESTAMP"
}
```

## Bước 5: Cleanup (Optional)
Hỏi user có muốn:
- Push to remote? → `git push origin main`
- Archive session?

## Kết quả
```
🎉 SHIPPED!
   Version: {hash}
   
   Commit: abc123
   Session archived to: .vibecode/backups/{sessionId}
```
