---
description: Debug có hệ thống 9 bước (vibecode debug)
---

# /debug - Debug 9 Bước (Vibecode Protocol)

> **NGUYÊN TẮC VÀNG: KHÔNG BAO GIỜ sửa lỗi nếu chưa tái hiện được!**

## Quy trình 9 bước

### Bước 1: EVIDENCE 📸
Thu thập minh chứng:
- Screenshots lỗi
- Error messages
- Console logs
- Network requests

Lưu vào `.vibecode/sessions/{sessionId}/evidence/`

### Bước 2: REPRODUCE 🔄
Tạo test case để tái hiện lỗi:
- Mô tả steps to reproduce
- Expected vs Actual behavior
- Environment (browser, OS...)

### Bước 3: ANALYZE 🔍
Phân tích nguyên nhân gốc rễ (Root Cause Analysis):
- Đọc code liên quan
- Trace execution flow
- Xác định điểm lỗi

### Bước 4: HYPOTHESIZE 💡
Đưa ra giả thuyết về nguyên nhân:
- Giả thuyết 1: ...
- Giả thuyết 2: ...
- Giả thuyết ưu tiên: ...

### Bước 5: TEST 🧪
Thử nghiệm giả thuyết:
- Tạo minimal test case
- Verify giả thuyết đúng/sai

### Bước 6: FIX 🔧
Áp dụng bản sửa lỗi:
- Code changes
- Ghi lại diff

### Bước 7: VERIFY ✅
Chạy lại tests:
- Test tái hiện → phải PASS
- Regression tests → không break

### Bước 8: DOCUMENT 📝
Ghi lại kết quả vào build_report:
- Bug description
- Root cause
- Fix applied
- Lessons learned

### Bước 9: PREVENT 🛡️
Cập nhật rules để tránh lặp lại:
- Thêm vào `.agent/rules/` nếu cần
- Cập nhật coding standards

## Debug Flow
```
EVIDENCE → REPRODUCE → ANALYZE → HYPOTHESIZE → TEST
                                      ↓
           PREVENT ← DOCUMENT ← VERIFY ← FIX
                                ↑ (nếu fail, quay lại HYPOTHESIZE)
```

## Template Evidence
```markdown
# Bug Evidence

**Date:** {timestamp}
**Reporter:** User/System

## Description
[Mô tả lỗi]

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected
[Kết quả mong đợi]

## Actual
[Kết quả thực tế]

## Screenshots
[Đính kèm]

## Console Logs
```
[paste logs]
```
```
