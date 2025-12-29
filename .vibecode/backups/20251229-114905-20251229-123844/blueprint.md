# Blueprint: Code Audit VTN v3

**Session:** 20251229-114905
**Date:** 2025-12-29

---

## 🔍 Phân Tích Kỹ Thuật

### 1. Console Statements Analysis

| File | Line | Type | Content |
|------|------|------|---------|
| `view-toggle.js` | 41 | warn | `View "${config.id}" already registered` |
| `view-toggle.js` | 105 | warn | `View "${viewId}" not registered` |
| `view-toggle.js` | 115 | error | `Error deactivating ${currentView}:` |
| `view-toggle.js` | 124 | error | `Error activating ${viewId}:` |
| `flying3d.js` | 113 | error | `PROJECTS_DATA not found` |

**Đánh giá:** 
- `console.error` trong catch blocks → **GIỮ LẠI** (cần cho debugging production bugs)
- `console.warn` cho dev warnings → **CÂN NHẮC** xóa hoặc wrap với condition

### 2. Code Structure Analysis

| Module | Lines | Complexity | Notes |
|--------|-------|------------|-------|
| `gallery.js` | 295 | Medium | List view, category filter |
| `flying3d.js` | 675 | High | 3D animation, nhiều state |
| `grid.js` | 289 | Medium | Grid layout |
| `view-toggle.js` | ~180 | Medium | View management |
| `i18n.js` | 362 | Medium | i18n với 2 ngôn ngữ |
| `loader.js` | ~300 | Medium | Loading screen |
| `about.js` | 223 | Low | About page logic |
| `project-detail.js` | 185 | Low | Project page |
| `transitions.js` | ~100 | Low | Page transitions |

### 3. Potential Issues Found

#### ⚠️ Code Duplication
- `getLang()`, `projectTitle()`, `projectLocation()` được **duplicate** trong:
  - `gallery.js` (lines 48-59)
  - `grid.js` (lines 267-278)
  - `flying3d.js` (lines ~632-653)

#### ⚠️ Inline Script trong HTML
- `project.html` có ~170 lines inline script (lines 96-259)
- Khuyến nghị: Tách ra file riêng

#### ⚠️ Hardcoded Project Order
- `gallery.js` có ORDER array (lines 37-46)
- `grid.js` có ORDER array (lines 15-41)
- Có thể không sync với `projects-data.js`

### 4. Performance Concerns

| Issue | File | Impact |
|-------|------|--------|
| Large animation loop | `flying3d.js` | requestAnimationFrame luôn chạy khi active |
| No lazy loading cho images | All views | Tất cả ảnh load cùng lúc |
| Multiple event listeners | Mỗi view | Có thể có listeners không cleanup |

### 5. Accessibility Issues (Potential)

- [ ] Kiểm tra tất cả images có alt text
- [ ] Kiểm tra keyboard navigation
- [ ] Kiểm tra color contrast
- [ ] Kiểm tra focus states

---

## 📦 Files Cần Kiểm Tra

| Priority | File | Task |
|----------|------|------|
| High | `view-toggle.js` | Review console statements |
| High | `flying3d.js` | Memory/performance review |
| Medium | `gallery.js`, `grid.js` | Code duplication |
| Medium | `project.html` | Extract inline script |
| Low | All CSS | Unused styles check |

---

## 🎯 Proposed Actions

1. **Extract utility functions** vào file `utils.js`
2. **Wrap console logs** với development mode check
3. **Extract inline script** từ `project.html`
4. **Add lazy loading** cho images
5. **Audit CSS** cho unused rules
