# Intake: Tổ Chức Lại Cấu Trúc Thư Mục

**Session:** 20251229-124605
**Date:** 2025-12-29T12:46:05+07:00

---

## 🎯 Goal

Tổ chức lại cấu trúc thư mục dự án VTN v3 theo **Option A** (Gom theo Type) mà KHÔNG ảnh hưởng đến giao diện người dùng hiện tại.

---

## 📋 Context

### Cấu trúc hiện tại (Flat)
- 10 JS files nằm cùng cấp root
- 8 CSS files nằm cùng cấp root
- 3 HTML files
- 3 thư mục assets: projects/, people/, people-highres/

### Cấu trúc mục tiêu (Option A)
```
VTN v3/
├── index.html, about.html, project.html
├── css/           ← gom tất cả CSS
├── js/            ← gom tất cả JS
├── assets/
│   ├── images/    ← từ projects/
│   ├── people/
│   └── people-highres/
└── .agent/, .vibecode/
```

### Ràng buộc
- KHÔNG thay đổi UI/UX
- KHÔNG thay đổi logic code
- Chỉ di chuyển files và update paths

---

## ✓ Acceptance Criteria

1. Tất cả CSS files nằm trong `css/`
2. Tất cả JS files nằm trong `js/`
3. Assets nằm trong `assets/` với subfolders
4. Tất cả import paths trong HTML được update
5. Tất cả image paths trong JS được update
6. Website hoạt động bình thường sau refactor
7. Tất cả views (List, 3D, Grid) hoạt động
8. i18n hoạt động
9. Project navigation hoạt động

---

## 📝 Files cần di chuyển

### CSS (8 files → css/)
- base.css
- loader.css
- gallery.css
- flying3d.css
- grid.css
- view-toggle.css
- about.css
- project-detail.css

### JS (10 files → js/)
- i18n.js
- projects-data.js
- loader.js
- view-toggle.js
- gallery.js
- flying3d.js
- grid.js
- transitions.js
- about.js
- project-detail.js

### Assets
- projects/ → assets/images/
- people/ → assets/people/
- people-highres/ → assets/people-highres/
