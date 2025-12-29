# Intake: Code Audit VTN v3

**Session:** 20251229-114905
**Date:** 2025-12-29T11:49:05+07:00

---

## 🎯 Goal
Kiểm tra toàn bộ repo VTN v3, phát hiện lỗi tiềm ẩn và cơ hội cải thiện code.

## 📋 Context

### Repo Overview
- **Total files:** 23 files (sau cleanup gần đây)
- **HTML pages:** 3 (index.html, about.html, project.html)
- **JavaScript:** 9 files
- **CSS:** 8 files
- **Data:** 1 file (projects-data.js)

### Recent Changes
- Đã xóa 5 files không sử dụng (script.js, projects.json, styles.css, utility scripts)
- Đã cập nhật giải thưởng Võ Trọng Nghĩa

### Tech Stack
- Vanilla HTML/CSS/JavaScript
- Lenis (smooth scroll)
- Google Fonts (Montserrat, Inter, IBM Plex Mono)

## ✓ Acceptance Criteria
1. Phát hiện tất cả console.log/console.error còn lại trong production code
2. Xác định unused CSS rules
3. Kiểm tra broken links/images
4. Kiểm tra accessibility issues
5. Kiểm tra performance bottlenecks
6. Xác định code duplication
7. Đề xuất improvements có thể thực hiện

## 🚫 Out of Scope
- Refactor toàn bộ architecture
- Thay đổi UI/UX
- Thêm tính năng mới
