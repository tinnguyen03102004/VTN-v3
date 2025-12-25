---
description: Sửa lỗi click project nào cũng về House for Trees (server redirect strip query params)
---

# Fix Navigation Redirect Bug

## Triệu chứng
- Click vào bất kỳ project nào (Grid, List, 3D, Space view) đều navigate về "House for Trees"
- URL hiển thị đúng project ID nhưng page hiển thị sai project
- Hoặc tất cả URLs đều hiển thị `?id=house-for-trees`

## Nguyên nhân gốc
Server (`npx serve`) redirect từ `project.html?id=xxx` sang clean URL `/project` và **strip toàn bộ query parameters**. Khi URL mất `?id=xxx`, `project.html` fallback về default project `house-for-trees`.

## Giải pháp
Thay đổi tất cả navigation URLs từ `project.html?id=xxx` sang `project?id=xxx` (clean URL format - không có `.html`).

## Các file cần kiểm tra và sửa

### 1. grid.js
Tìm và sửa trong function `bindEvents()`:
```javascript
// SAI:
window.location.href = `project.html?id=${encodeURIComponent(projectId)}&lang=${currentLang}`;

// ĐÚNG:
window.location.href = `project?id=${encodeURIComponent(projectId)}&lang=${currentLang}`;
```

### 2. gallery.js
Tìm click handler cho `.project-row`:
```javascript
// SAI:
window.location.href = `project.html?id=${encodeURIComponent(projectId)}&lang=${currentLang}`;

// ĐÚNG:
window.location.href = `project?id=${encodeURIComponent(projectId)}&lang=${currentLang}`;
```

### 3. flying3d.js
Tìm trong function `createFlyingCard()`:
```javascript
// SAI:
card.href = `project.html?id=${encodeURIComponent(cleanId)}&lang=${lang}`;

// ĐÚNG:
card.href = `project?id=${encodeURIComponent(cleanId)}&lang=${lang}`;
```

### 4. space3d.js
Tìm trong function `createSpaceCard()`:
```javascript
// SAI:
card.href = `project.html?id=${encodeURIComponent(cleanId)}&lang=${lang}`;

// ĐÚNG:
card.href = `project?id=${encodeURIComponent(cleanId)}&lang=${lang}`;
```

## Cách verify fix

// turbo
1. Chạy server: `npx -y serve -l 8000`

2. Mở browser và navigate đến http://localhost:8000

3. Chuyển sang Grid view và click vào một project KHÔNG PHẢI "House for Trees"

4. Kiểm tra:
   - URL có đúng project ID không? (vd: `project?id=stacking-green`)
   - Page hiển thị đúng project name không?

## Lưu ý
- Lỗi này xảy ra do `npx serve` có tính năng clean URL redirect
- Nếu deploy lên GitHub Pages hoặc server khác, có thể không gặp lỗi này
- Luôn dùng clean URL format (`project?id=xxx`) thay vì `project.html?id=xxx`
