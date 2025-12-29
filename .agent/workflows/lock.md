---
description: Khóa contract với spec hash (vibecode lock)
---

# /lock - Khóa Contract

## Mục đích
Khóa contract sau khi user đã review và approve. Tạo spec hash để đảm bảo không thay đổi trong quá trình build.

## Điều kiện
- State phải là `CONTRACT_DRAFTED`
- Contract phải có đủ 5 sections bắt buộc

## Bước 1: Validate Contract
Kiểm tra contract có đủ các sections:
- [ ] ## 🎯 Goal
- [ ] ## ✅ In-Scope
- [ ] ## ❌ Out-of-Scope
- [ ] ## 📦 Deliverables
- [ ] ## ✓ Acceptance Criteria

## Bước 2: Tạo Spec Hash
// turbo
Tạo hash từ nội dung contract:
```powershell
$content = Get-Content ".vibecode/sessions/$sessionId/contract.md" -Raw
$hash = [System.BitConverter]::ToString((New-Object System.Security.Cryptography.SHA256Managed).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($content))).Replace("-","").Substring(0,8).ToLower()
```

## Bước 3: Cập nhật State
```json
{
  "current_state": "CONTRACT_LOCKED",
  "spec_hash": "{hash}",
  "locked_at": "ISO_TIMESTAMP"
}
```

## Bước 4: Ghi log
Ghi vào `.vibecode/audit.log`:
```
[TIMESTAMP] CONTRACT_LOCKED | Session: {sessionId} | Hash: {hash}
```

## Kết quả
```
✅ Contract LOCKED!
   Spec-Hash: {hash}
   
   License to Build granted. 
   Next: /plan
```

## Tiếp theo
Sử dụng `/plan` để tạo execution plan.
