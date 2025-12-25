---
description: Kiểm tra UI/UX trên các trang chính của website
---
// turbo-all

# Kiểm tra Các Trang Website

## Chuẩn bị
// turbo
Đảm bảo server đang chạy:
```bash
python -m http.server 8000
```

---

## 1. Kiểm tra Trang Chủ (Index)

**URL**: http://localhost:8000

### Checklist:
- [ ] Loading animation hiển thị đúng
- [ ] Text "Architects Green Bamboo" được viết hoa đúng
- [ ] 3D gallery/flying animation hoạt động mượt
- [ ] Scroll wheel điều khiển được tốc độ
- [ ] Click vào project chuyển trang đúng
- [ ] Filter Green/Bamboo hoạt động
- [ ] Navigation links (About) hoạt động

---

## 2. Kiểm tra Trang About

**URL**: http://localhost:8000/about.html

### Checklist:
- [ ] Layout hiển thị đúng
- [ ] Danh sách People/Partners hiển thị đầy đủ
- [ ] Hover effect trên tên hiển thị ảnh
- [ ] Contact section mở rộng được
- [ ] Navigation links hoạt động
- [ ] Font Jost/Inter render đúng

---

## 3. Kiểm tra Trang Project Detail

**URL**: http://localhost:8000/project.html?id=house-for-trees

### Checklist:
- [ ] Thông tin project load đúng (title, location, year)
- [ ] Gallery ảnh hiển thị đầy đủ
- [ ] Lightbox mở khi click ảnh
- [ ] Back button hoạt động
- [ ] Title được capitalize đúng
- [ ] Awards hiển thị (nếu có)

---

## 4. Kiểm tra Responsive

### Desktop (>1200px)
- [ ] Layout 4 cột cho gallery
- [ ] Navigation đầy đủ

### Tablet (768px - 1200px)
- [ ] Layout 2-3 cột cho gallery
- [ ] Touch scroll hoạt động

### Mobile (<768px)
- [ ] Layout 1-2 cột cho gallery
- [ ] Menu responsive
- [ ] Touch gestures hoạt động
- [ ] Text readable

---

## 5. Kiểm tra Dark/Light Mode

- [ ] Toggle hoạt động
- [ ] Màu sắc chuyển đổi mượt
- [ ] Tất cả text readable trong cả 2 mode
- [ ] Ảnh hiển thị tốt trong cả 2 mode

---

## 6. Kiểm tra Cross-Browser

Test trên các trình duyệt:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (nếu có)
- [ ] Edge

---

## Báo cáo lỗi

Nếu phát hiện lỗi, ghi chú:
1. Trang nào bị lỗi
2. Bước để tái tạo lỗi
3. Kết quả mong đợi vs kết quả thực tế
4. Screenshot (nếu có)
