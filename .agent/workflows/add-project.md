---
description: Hướng dẫn thêm một project kiến trúc mới vào portfolio
---

# Thêm Project Mới vào Portfolio

## Bước 1: Chuẩn bị hình ảnh

### 1.1 Tạo thư mục ảnh
Tạo folder mới trong `projects/<Category>/<project-name>/`:
- **Green projects**: `projects/Green/<ten-project>/`
- **Bamboo projects**: `projects/Bamboo/<ten-project>/`

### 1.2 Đặt tên ảnh
- Ảnh chính (thumbnail): `1.jpg` hoặc `main.jpg`
- Ảnh gallery: `1.jpg`, `2.jpg`, `3.jpg`, ...
- Định dạng: JPG hoặc WebP (khuyến nghị WebP để tối ưu)
- Kích thước khuyến nghị: 1920x1080 hoặc lớn hơn

## Bước 2: Cập nhật projects-data.js

Mở file `projects-data.js` và thêm object project mới vào mảng `projects`:

```javascript
{
    id: "ten-project-slug",           // URL-friendly ID
    category: "green",                // "green" hoặc "bamboo"
    title: {
        en: "Project Name",
        vi: "Tên Dự Án"
    },
    thumbnail: "projects/Green/ten-project/1.jpg",
    images: [
        "projects/Green/ten-project/1.jpg",
        "projects/Green/ten-project/2.jpg",
        "projects/Green/ten-project/3.jpg"
    ],
    location: {
        en: "City, Country",
        vi: "Thành phố, Quốc gia"
    },
    year: "2024",
    description: {
        en: "English description of the project...",
        vi: "Mô tả tiếng Việt của dự án..."
    },
    awards: [
        {
            en: "Award Name 2024",
            vi: "Tên Giải Thưởng 2024"
        }
    ]
}
```

## Bước 3: Cập nhật projects.json (nếu cần)

Nếu dự án sử dụng JSON data, cập nhật tương tự trong `projects.json`.

## Bước 4: Cập nhật translations (nếu cần)

Mở file `i18n.js` và thêm translations nếu có text mới cần dịch.

## Bước 5: Kiểm tra

1. Chạy `/dev` để khởi động server
2. Mở trang chủ và kiểm tra project mới xuất hiện
3. Click vào project để kiểm tra trang chi tiết
4. Kiểm tra cả 2 ngôn ngữ (EN/VI)

## Lưu ý quan trọng

- **ID phải unique**: Không trùng với project đã có
- **Đường dẫn ảnh**: Sử dụng forward slash `/` thay vì backslash `\`
- **Kích thước ảnh**: Tối ưu ảnh trước khi upload (< 500KB mỗi ảnh)
- **Category**: Chỉ sử dụng `"green"` hoặc `"bamboo"` (lowercase)
