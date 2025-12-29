# Execution Plan (Revised)

**Spec-Hash:** c4615350
**Session:** 20251229-114905
**Created:** 2025-12-29T11:58:40+07:00
**Revised:** 2025-12-29T12:20:35+07:00

---

## Scope Revision Note

Sau khi đánh giá lại, plan được thu hẹp để đảm bảo an toàn:
- ~~Task 1-4: Extract utils~~ → **LOẠI BỎ** (rủi ro cao với IIFE pattern)
- Giữ lại các task có rủi ro thấp

---

## Tasks (Revised)

### Task 1: Fix Default Language Inconsistency
- **Files:** `grid.js` (MODIFY)
- **Action:** MODIFY
- **Complexity:** 1/5
- **Description:** 
  - Sửa default lang từ `'en'` thành `'vi'` để consistent với `gallery.js`
  - Line 268: `return window.vtnGetLang ? window.vtnGetLang() : 'vi';`

### Task 2: Add Lazy Loading to Static Images
- **Files:** `about.html` (MODIFY)
- **Action:** MODIFY
- **Complexity:** 1/5
- **Description:**
  - Kiểm tra và thêm `loading="lazy"` cho images chưa có
  - Không đụng vào dynamic images (đã có lazy loading)

### Task 3: Verification
- **Files:** N/A
- **Action:** TEST
- **Complexity:** 2/5
- **Description:**
  - Chạy dev server
  - Test tất cả views (List, 3D, Grid)
  - Test i18n (chuyển ngôn ngữ)
  - Test project navigation
  - Verify không có console errors

---

## Execution Order

```
1. Task 1: Fix default lang    [Quick fix]
2. Task 2: Add lazy loading    [Performance]
3. Task 3: Verification        [QA]
```

---

## Estimated Effort

| Metric | Value |
|--------|-------|
| Total tasks | 3 |
| Files to modify | 2 |
| Estimated iterations | 1 |
| Risk level | **Very Low** ✅ |

---

## Rollback Plan

Nếu có vấn đề:
```bash
git checkout -- grid.js about.html
```

---

## Changes from Original Plan

| Original Task | Status | Reason |
|---------------|--------|--------|
| Create utils.js | ❌ CANCELLED | IIFE pattern không cho phép import |
| Refactor gallery.js | ❌ CANCELLED | Functions trong local scope |
| Refactor grid.js | ❌ CANCELLED | IIFE pattern |
| Refactor flying3d.js | ❌ CANCELLED | IIFE + complex logic |
| Add lazy loading | ✅ KEPT | Safe change |
| Update HTML scripts | ❌ CANCELLED | No utils.js to include |
| Verification | ✅ KEPT | Essential |

---

**Status:** READY TO BUILD (Revised)
