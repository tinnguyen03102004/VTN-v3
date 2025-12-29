---
description: Đánh giá kết quả build (vibecode review)
---

# /review - Đánh Giá Kết Quả

## Mục đích
Review kết quả build so với contract và acceptance criteria.

## Điều kiện
- State phải là `BUILD_DONE`

## Bước 1: Đọc Contract & Build Report
- Contract: `.vibecode/sessions/{sessionId}/contract.md`
- Build Report: `.vibecode/sessions/{sessionId}/build_report.md`

## Bước 2: Kiểm tra Acceptance Criteria
Với mỗi tiêu chí trong contract, đánh giá:
- [ ] PASS - Đáp ứng đầy đủ
- [ ] PARTIAL - Đáp ứng một phần
- [ ] FAIL - Không đáp ứng

## Bước 3: Chạy Tests (nếu có)
```bash
npm test
```
hoặc browser testing với workflow `/test-pages`

## Bước 4: Tạo Review Report
Tạo file `.vibecode/sessions/{sessionId}/review_report.md`:

```markdown
# Review Report

**Spec-Hash:** {hash}
**Review Date:** {timestamp}

## Acceptance Criteria Check
| Criteria | Status | Notes |
|----------|--------|-------|
| Criteria 1 | ✅ PASS | |
| Criteria 2 | ⚠️ PARTIAL | Cần cải thiện X |
| Criteria 3 | ❌ FAIL | Lý do |

## Test Results
- Unit tests: PASS/FAIL
- Browser tests: PASS/FAIL

## Overall Result
**PASSED** / **FAILED**

## Recommendations
- [Nếu FAILED] Cần sửa: ...
- [Nếu PASSED] Ready for snapshot
```

## Bước 5: Cập nhật State
Nếu PASSED:
```json
{
  "current_state": "REVIEW_PASSED"
}
```

Nếu FAILED:
```json
{
  "current_state": "REVIEW_FAILED"
}
```

## Tiếp theo
- PASSED → `/snapshot` để tạo release
- FAILED → Quay lại `/build` hoặc `/debug`
