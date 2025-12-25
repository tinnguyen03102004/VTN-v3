---
description: Quy trình sửa lỗi và debug cho website VTN Architects
---
// turbo-all

# Quy trình sửa lỗi (Bug Fixing Workflow)

## 1. Xác định lỗi
- Mô tả rõ ràng lỗi đang gặp phải
- Xác định trang/file bị ảnh hưởng
- Ghi nhận các bước tái tạo lỗi (reproduce steps)

## 2. Kiểm tra Console và Network
// turbo
```bash
npx -y serve -l 8000
```
- Mở browser tại http://localhost:8000
- Mở DevTools (F12) → Tab Console để xem lỗi JavaScript
- Kiểm tra Tab Network để xem các request thất bại (status 404, 500, etc.)

## 3. Phân tích lỗi
Dựa vào loại lỗi:

### Lỗi JavaScript
- Kiểm tra file `.js` liên quan
- Tìm dòng code gây lỗi từ thông báo Console
- Kiểm tra syntax, undefined variables, null references

### Lỗi CSS/Layout
- Kiểm tra file `.css` liên quan
- Sử dụng DevTools → Elements → Styles để inspect
- Kiểm tra responsive breakpoints

### Lỗi hình ảnh/assets không load
- Kiểm tra đường dẫn trong thư mục `projects/`
- Xác nhận file tồn tại và đúng tên (case-sensitive)
- Kiểm tra `projects.json` có đúng path không

### Lỗi dữ liệu
- Kiểm tra file `projects.json` có đúng format JSON không
- Validate JSON syntax tại https://jsonlint.com/

## 4. Sửa lỗi
- Thực hiện thay đổi code cần thiết
- Lưu file và refresh browser để kiểm tra

## 5. Kiểm tra lại
- Xác nhận lỗi đã được sửa
- Kiểm tra không gây ra lỗi mới (regression)
- Test trên các trình duyệt khác nếu cần

## 6. Deploy kiểm tra (tùy chọn)
Nếu lỗi chỉ xảy ra trên production:
// turbo
```bash
git add .
git commit -m "fix: [mô tả ngắn về lỗi đã sửa]"
git push origin main
```

## Các file thường gặp lỗi

| Loại lỗi | File cần kiểm tra |
|----------|-------------------|
| Index page | `index.html`, `style.css`, `script.js`, `flying3d.js` |
| Project page | `project.html`, `project.css`, `project.js` |
| About page | `about.html`, `about.css`, `about.js` |
| Dữ liệu project | `projects.json` |
| Hình ảnh | Thư mục `projects/Green/` và `projects/Bamboo/` |

## Tips Debug

1. **Console.log()**: Thêm `console.log(variable)` để kiểm tra giá trị
2. **Breakpoints**: Sử dụng DevTools → Sources → đặt breakpoint
3. **Network throttling**: Giả lập mạng chậm để phát hiện lỗi async
4. **Mobile view**: Sử dụng Device Toolbar (Ctrl+Shift+M) để test responsive
