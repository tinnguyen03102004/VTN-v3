# Contract: Tổ Chức Lại Cấu Trúc Thư Mục (Option A)

**Session:** 20251229-124605
**Date:** 2025-12-29
**Status:** DRAFTED

---

## 🎯 Goal

Tổ chức lại cấu trúc thư mục dự án VTN v3 theo pattern "Gom theo Type" (css/, js/, assets/) mà **KHÔNG ảnh hưởng giao diện người dùng hiện tại**.

---

## ✅ In-Scope

### 1. Di chuyển CSS files
- Tạo thư mục `css/`
- Di chuyển 8 CSS files vào `css/`
- Update tất cả `<link>` tags trong HTML

### 2. Di chuyển JS files
- Tạo thư mục `js/`
- Di chuyển 10 JS files vào `js/`
- Update tất cả `<script>` tags trong HTML

### 3. Tổ chức Assets
- Tạo thư mục `assets/` với subfolders:
  - `assets/images/` (từ `projects/`)
  - `assets/people/` (từ `people/`)
  - `assets/people-highres/` (từ `people-highres/`)
- Update image paths trong HTML
- Update image paths trong `projects-data.js`
- Update `data-photo` attributes trong `about.html`

### 4. Cleanup
- Xóa thư mục gốc rỗng sau di chuyển

---

## ❌ Out-of-Scope

- Thay đổi UI/UX
- Thay đổi logic code
- Rename files
- Merge/split files
- Thêm bundler/build tool
- Thay đổi CSS/JS structure nội bộ

---

## 📦 Deliverables

1. **Thư mục `css/`** - Chứa 8 CSS files
2. **Thư mục `js/`** - Chứa 10 JS files
3. **Thư mục `assets/`** - Chứa images và people photos
4. **Updated HTML files** - index.html, about.html, project.html
5. **Updated projects-data.js** - Image paths đã sửa
6. **Verification** - Website hoạt động bình thường

---

## ✓ Acceptance Criteria

| # | Criteria | Verification |
|---|----------|--------------|
| 1 | Tất cả CSS files nằm trong `css/` | `ls css/` |
| 2 | Tất cả JS files nằm trong `js/` | `ls js/` |
| 3 | Tất cả images nằm trong `assets/images/` | `ls assets/images/` |
| 4 | People photos nằm trong `assets/people/` | `ls assets/people/` |
| 5 | Không còn JS/CSS ở root (trừ thư mục) | `ls *.js *.css` = empty |
| 6 | Website load bình thường | Browser test |
| 7 | Tất cả views hoạt động (List, 3D, Grid) | Browser test |
| 8 | Tất cả images hiển thị | Browser test |
| 9 | i18n hoạt động | Browser test |
| 10 | Project navigation hoạt động | Browser test |
| 11 | About page hiển thị đúng | Browser test |
| 12 | No console errors | DevTools check |

---

## ⚠️ Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Broken paths | High | Test sau mỗi phase |
| Missing files | Medium | Git status check |
| Case sensitivity | Low | Windows không phân biệt |

---

**Version:** 1.0
**Hash:** _pending lock_
