---
description: Magic Mode - Một lệnh build toàn bộ dự án (vibecode go)
---

# /go - Magic Mode 🚀

> **Một lệnh để build tất cả!**

## Cách dùng
```
/go "Mô tả ngắn gọn yêu cầu của bạn"
```

## Ví dụ
```
/go "Thêm dark mode cho website"
/go "Tạo trang contact với form gửi email"
/go "Optimize images và lazy loading"
```

## Quy trình tự động (8 bước)

```
Step 1: INIT        → Khởi tạo session
Step 2: INTAKE      → Phân tích yêu cầu
Step 3: BLUEPRINT   → Xác định scope
Step 4: CONTRACT    → Tạo & tự động lock
Step 5: PLAN        → Tạo execution plan
Step 6: BUILD       → Thực hiện code
Step 7: REVIEW      → Tự kiểm tra
Step 8: SHIP        → Hoàn thành
```

## Output
Sau khi hoàn thành:
- Code đã được implement
- Build report đầy đủ
- Ready to commit

## Khi nào dùng
✅ Dự án đơn giản, feature nhỏ
✅ Prototype nhanh
✅ Demo/POC

## Khi nào KHÔNG dùng
❌ Dự án phức tạp nhiều module → dùng `/agent`
❌ Cần review kỹ contract → dùng full workflow
❌ Có nhiều dependencies phức tạp

## Rollback
Nếu kết quả không như ý:
```
/undo --last
```
