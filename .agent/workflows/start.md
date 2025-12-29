---
description: Bắt đầu/tiếp tục planning workflow (vibecode start)
---

# /start - Bắt Đầu Planning

## Mục đích
Bắt đầu hoặc tiếp tục quy trình planning cho một tính năng/task mới.

## Bước 1: Kiểm tra state hiện tại
Đọc file `.vibecode/state.json` để xem trạng thái.

## Bước 2: Tạo session mới
// turbo
Tạo session ID theo format: `YYYYMMDD-HHMMSS`
```bash
$sessionId = Get-Date -Format "yyyyMMdd-HHmmss"
mkdir ".vibecode/sessions/$sessionId"
```

## Bước 3: Thu thập yêu cầu (INTAKE)
Hỏi user về:
- **Goal**: Mục tiêu cần đạt được
- **Context**: Bối cảnh, ràng buộc
- **Acceptance Criteria**: Tiêu chí nghiệm thu

Lưu vào `.vibecode/sessions/{sessionId}/intake.md`

## Bước 4: Phân tích & Lập Blueprint
Dựa trên intake, tạo blueprint kỹ thuật:
- Phân tích files cần thay đổi
- Xác định dependencies
- Đề xuất approach

Lưu vào `.vibecode/sessions/{sessionId}/blueprint.md`

## Bước 5: Soạn Contract
Tạo contract với các section:
- ## 🎯 Goal
- ## ✅ In-Scope
- ## ❌ Out-of-Scope
- ## 📦 Deliverables
- ## ✓ Acceptance Criteria

Lưu vào `.vibecode/sessions/{sessionId}/contract.md`

## Bước 6: Cập nhật state
```json
{
  "current_state": "CONTRACT_DRAFTED",
  "current_session": "{sessionId}"
}
```

## Tiếp theo
Sau khi user review contract, sử dụng `/lock` để khóa contract.
