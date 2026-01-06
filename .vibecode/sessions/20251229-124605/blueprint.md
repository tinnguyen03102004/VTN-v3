# Blueprint: Tổ Chức Lại Cấu Trúc Thư Mục

**Session:** 20251229-124605
**Date:** 2025-12-29

---

## 🔍 Phân Tích Dependencies

### Image Path References

| Location | Count | Pattern |
|----------|-------|---------|
| `projects-data.js` | 134+ | `"projects/..."` |
| `about.html` | 3 | `src="projects/..."` |
| `index.html` | 1 | `src="projects/logo_VTN.png"` |
| `project.html` | 1 | `src="projects/logo_VTN.png"` |

### CSS url() References
- Tất cả đều dùng **inline data URLs** → ✅ Không cần update

### People Folder References

| File | Pattern |
|------|---------|
| `about.html` | `data-photo="people/..."` (nhiều dòng) |

---

## 📦 Kế Hoạch Di Chuyển

### Phase 1: Tạo thư mục mới
```
mkdir css js assets assets/images assets/people assets/people-highres
```

### Phase 2: Di chuyển CSS (8 files)
```
move *.css css/
```

### Phase 3: Di chuyển JS (10 files)
```
move *.js js/
```

### Phase 4: Di chuyển Assets
```
move projects/* assets/images/
move people/* assets/people/
move people-highres/* assets/people-highres/
```

### Phase 5: Update HTML imports (3 files)

**index.html:**
- `<link href="*.css">` → `<link href="css/*.css">`
- `<script src="*.js">` → `<script src="js/*.js">`
- `src="projects/logo_VTN.png"` → `src="assets/images/logo_VTN.png"`

**about.html:**
- Same CSS/JS updates
- `src="projects/*"` → `src="assets/images/*"`
- `data-photo="people/*"` → `data-photo="assets/people/*"`

**project.html:**
- Same CSS/JS updates
- Logo path update

### Phase 6: Update JS data paths

**projects-data.js:**
- `"projects/..."` → `"assets/images/..."` (134+ occurrences)

---

## ⚠️ Rủi Ro & Mitigation

| Rủi ro | Impact | Mitigation |
|--------|--------|------------|
| Broken image paths | High | Test ngay sau mỗi phase |
| Broken JS imports | High | Test browser console |
| Missing files after move | Medium | Use `git status` to verify |
| Relative path issues | Medium | Test từ root URL |

---

## 📊 Ước Tính

| Metric | Value |
|--------|-------|
| Files to move | 18 (CSS + JS) + 3 dirs |
| Files to update | 4 (3 HTML + 1 JS) |
| Lines to change | ~150+ |
| Estimated complexity | Medium-High |
| Risk level | Medium |

---

## 💡 Đề Xuất Approach

**Phân chia thành 2 sub-sessions để giảm rủi ro:**

### Sub-session A: JS/CSS refactor
1. Tạo `css/` và `js/`
2. Di chuyển files
3. Update HTML imports
4. Test

### Sub-session B: Assets refactor
1. Tạo `assets/` structure
2. Di chuyển images
3. Update `projects-data.js`
4. Update HTML image paths
5. Test

**Hoặc làm một lần nhưng test incremental.**
