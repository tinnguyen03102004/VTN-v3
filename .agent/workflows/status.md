---
description: Xem trạng thái dự án (vibecode status)
---

# /status - Xem Trạng Thái Dự Án

## Mục đích
Hiển thị trạng thái hiện tại của dự án VibeCoding.

## Thông tin hiển thị

### 1. State Machine
```
STATES:
  INIT → INTAKE_CAPTURED → BLUEPRINT_DRAFTED → CONTRACT_DRAFTED
  → CONTRACT_LOCKED → PLAN_CREATED → BUILD_IN_PROGRESS → BUILD_DONE
  → REVIEW_PASSED → SHIPPED
```

### 2. Current State
Đọc từ `.vibecode/state.json`:
- Current state
- Current session ID
- Spec hash (nếu có)
- Last updated

### 3. Session Info
Nếu có session active:
- Liệt kê các artifacts đã tạo (intake, blueprint, contract, plan...)
- Số iterations đã thực hiện
- Kết quả review gần nhất

### 4. Quick Actions
Gợi ý lệnh tiếp theo dựa trên state:
- INIT → `/start`
- CONTRACT_DRAFTED → `/lock`
- CONTRACT_LOCKED → `/plan`
- PLAN_CREATED → `/build`
- BUILD_DONE → `/review`
- REVIEW_PASSED → `/snapshot`

## Bước thực hiện

// turbo
```bash
if (Test-Path ".vibecode/state.json") { Get-Content ".vibecode/state.json" | ConvertFrom-Json } else { Write-Host "VibeCoding chưa được khởi tạo. Chạy /init trước." }
```
