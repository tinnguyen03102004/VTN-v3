---
description: Tạo execution plan (vibecode plan)
---

# /plan - Tạo Execution Plan

## Mục đích
Tạo kế hoạch thực hiện chi tiết dựa trên contract đã lock.

## Điều kiện
- State phải là `CONTRACT_LOCKED`

## Bước 1: Đọc Contract
Đọc contract từ `.vibecode/sessions/{sessionId}/contract.md`

## Bước 2: Phân tích codebase
- Xác định files cần tạo/sửa/xóa
- Xác định dependencies
- Ước tính complexity

## Bước 3: Tạo Plan
Tạo file `.vibecode/sessions/{sessionId}/plan.md`:

```markdown
# Execution Plan

**Spec-Hash:** {hash}
**Created:** {timestamp}

## Tasks

### Task 1: [Tên task]
- **Files:** file1.js, file2.css
- **Action:** CREATE / MODIFY / DELETE
- **Complexity:** 1-5
- **Description:** Mô tả chi tiết

### Task 2: [Tên task]
...

## Execution Order
1. Task 1
2. Task 2
...

## Estimated Time
- Total tasks: N
- Estimated: X iterations
```

## Bước 4: Cập nhật State
```json
{
  "current_state": "PLAN_CREATED"
}
```

## Tiếp theo
Sử dụng `/build` để bắt đầu thực hiện.
