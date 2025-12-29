# Contract: Code Audit VTN v3

**Session:** 20251229-114905
**Date:** 2025-12-29
**Status:** DRAFTED

---

## 🎯 Goal

Thực hiện code audit toàn diện cho repo VTN v3, phát hiện và sửa các vấn đề về code quality, performance, và maintainability mà **KHÔNG ảnh hưởng UI/UX hiện tại**.

---

## ✅ In-Scope

### 1. Console Statement Cleanup
- Review và xử lý console.log/warn/error statements
- Giữ lại những phục vụ error handling thật sự
- Wrap development-only logs với condition

### 2. Code Deduplication
- Extract utility functions trùng lặp (`getLang`, `projectTitle`, `projectLocation`)
- Tạo file `utils.js` chung

### 3. Inline Script Extraction
- Extract inline script từ `project.html` (~170 lines)
- Tạo file riêng nếu cần

### 4. Performance Quick Wins
- Thêm `loading="lazy"` cho images chưa có
- Review animation loops

### 5. Code Quality
- Xóa biến/function không sử dụng
- Fix inconsistencies

---

## ❌ Out-of-Scope

- Thay đổi UI/UX
- Thêm tính năng mới
- Refactor architecture lớn
- Thay đổi tech stack
- CSS-in-JS hoặc module bundling
- Full accessibility audit (chỉ quick fixes)

---

## 📦 Deliverables

1. **`utils.js`** - File chứa shared utility functions
2. **Updated files** - Các file đã được cleanup
3. **`build_report.md`** - Báo cáo chi tiết các thay đổi
4. **Verification** - Website hoạt động bình thường sau changes

---

## ✓ Acceptance Criteria

| # | Criteria | Verification |
|---|----------|--------------|
| 1 | Không còn console.log trong production code | Grep search |
| 2 | Utility functions extracted vào utils.js | File exists |
| 3 | Code duplication giảm | Line count comparison |
| 4 | Images có lazy loading | HTML inspection |
| 5 | Website hoạt động bình thường | Browser test |
| 6 | Tất cả views (List, 3D, Grid) hoạt động | Browser test |
| 7 | i18n (VI/EN) hoạt động | Browser test |
| 8 | Project navigation hoạt động | Browser test |

---

## ⚠️ Risks

| Risk | Mitigation |
|------|------------|
| Break existing functionality | Test sau mỗi change nhỏ |
| CSS regression | Không đụng vào CSS |
| Animation issues | Careful với flying3d.js changes |

---

**Version:** 1.0
**Hash:** c4615350
**Status:** 🔒 LOCKED
