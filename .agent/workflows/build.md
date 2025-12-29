---
description: Thực hiện build (vibecode build)
---

# /build - Thực Hiện Build

## Mục đích
Thực hiện các tasks trong execution plan.

## Điều kiện
- State phải là `PLAN_CREATED` hoặc `BUILD_IN_PROGRESS`

## Quy tắc Build

### Max Iterations
```
MAX_ITERATIONS = 3

ĐIỀU KIỆN DỪNG:
1. Tất cả tasks hoàn thành → SUCCESS
2. Đạt max iterations → FAILED
3. Lỗi không thể sửa → STOP
4. Bị kẹt vòng lặp (cùng lỗi 3 lần) → STOP
```

## Bước 1: Đọc Plan
Đọc plan từ `.vibecode/sessions/{sessionId}/plan.md`

## Bước 2: Thực hiện từng Task
Với mỗi task:
1. Log bắt đầu
2. Thực hiện code changes
3. Verify changes (nếu có test)
4. Log kết quả

## Bước 3: Tạo Build Report
Sau mỗi iteration, tạo/cập nhật `.vibecode/sessions/{sessionId}/build_report.md`:

```markdown
# Build Report

**Iteration:** 1/3
**Spec-Hash:** {hash}

## Tasks Status
| Task | Status | Notes |
|------|--------|-------|
| Task 1 | ✅ Done | |
| Task 2 | 🔄 In Progress | |
| Task 3 | ⏳ Pending | |

## Changes Made
- [file1.js] Created
- [file2.css] Modified lines 10-25

## Issues
- None

## Next Steps
- Continue with Task 2
```

## Bước 4: Cập nhật State
```json
{
  "current_state": "BUILD_IN_PROGRESS",
  "iteration": 1
}
```

Khi hoàn thành tất cả tasks:
```json
{
  "current_state": "BUILD_DONE"
}
```

## Tiếp theo
Sử dụng `/review` để đánh giá kết quả.
