---
description: AI trợ giúp trực tiếp (vibecode assist)
---

# /assist - AI Trợ Giúp

## Mục đích
Hỏi AI bất kỳ câu hỏi nào về dự án, code, hoặc best practices.

## Cách dùng

### Hỏi về code
```
/assist Giải thích function X trong file Y
```

### Hỏi về architecture
```
/assist Cấu trúc thư mục nên như thế nào?
```

### Hỏi về best practices
```
/assist Cách tối ưu performance cho gallery?
```

### Hỏi về lỗi
```
/assist Lỗi này có nghĩa gì: [error message]
```

## Quy tắc
1. AI sẽ trả lời dựa trên context của dự án hiện tại
2. Không thay đổi code trừ khi user yêu cầu rõ ràng
3. Đưa ra nhiều options nếu có
4. Giải thích trade-offs

## Ví dụ

### Input
```
/assist Làm sao để thêm dark mode?
```

### Output
```
## Các cách thêm Dark Mode

### Option 1: CSS Variables + Toggle
**Ưu điểm:** Đơn giản, không cần JS nhiều
**Nhược điểm:** Manual maintenance

### Option 2: Tailwind Dark Mode
**Ưu điểm:** Built-in support
**Nhược điểm:** Cần migrate sang Tailwind

### Khuyến nghị
Với dự án hiện tại (vanilla CSS), Option 1 phù hợp hơn.
Cần tạo:
- CSS variables cho colors
- Toggle button
- localStorage để lưu preference
```
