---
description: Hướng dẫn sử dụng VibeCoding - Xem tất cả lệnh và cách dùng
---

# /help - Hướng Dẫn VibeCoding

> **"Contract LOCKED = License to Build"**

Bộ workflows này được xây dựng dựa trên [VibeCoding CLI](https://github.com/nclamvn/vibecode-cli) - phương pháp phát triển AI có kỷ luật.

---

## 🚀 Bắt Đầu Nhanh

### Dự án mới từ đầu?

```
/go "Mô tả dự án của bạn"
```

### Dự án phức tạp nhiều module?

```
/agent "Mô tả dự án phức tạp"
```

### Dự án đã có sẵn?

```
/init          # Khởi tạo VibeCoding
/start         # Bắt đầu planning
```

---

## 📋 Danh Sách Lệnh

| Lệnh | Mô Tả | Khi Nào Dùng |
|------|-------|--------------|
| `/go` | 🚀 Magic Mode | Dự án đơn giản, build 1 lần |
| `/agent` | 🤖 Agent Mode | Dự án phức tạp, đa module |
| `/init` | Khởi tạo workspace | Dự án có sẵn, chưa có .vibecode |
| `/start` | Bắt đầu planning | Sau /init |
| `/lock` | Khóa contract | Sau khi contract sẵn sàng |
| `/plan` | Tạo kế hoạch | Sau khi contract locked |
| `/build` | Thực hiện build | Sau khi có plan |
| `/review` | Đánh giá kết quả | Sau khi build xong |
| `/snapshot` | Tạo release | Sau khi review passed |
| `/status` | Xem trạng thái | Bất cứ lúc nào |
| `/debug` | Sửa lỗi 9 bước | Khi có bug |
| `/assist` | AI trợ giúp | Hỏi đáp tự do |
| `/undo` | Hoàn tác | Khi cần rollback |
| `/help` | Xem hướng dẫn này | Khi cần tra cứu |

---

## 🔄 Luồng Làm Việc

### Full Workflow (Có Kỷ Luật)

```
Phase A: Planning
┌─────────────────────────────────────────────────────────────┐
│ /init → /start → INTAKE → BLUEPRINT → CONTRACT → /lock     │
└─────────────────────────────────────────────────────────────┘
                              ↓
Phase B: Execution  
┌─────────────────────────────────────────────────────────────┐
│ /plan → /build → /review → /snapshot                        │
│                     ↓ fail                                  │
│                  /debug → retry                             │
└─────────────────────────────────────────────────────────────┘
```

### Magic Mode (Nhanh)

```
/go "mô tả" → [Tự động 8 bước] → 🎉 Dự án hoàn chỉnh
```

### Agent Mode (Phức Tạp)

```
/agent "mô tả" → [Phân tích modules] → [Build tuần tự] → 🎉
                       ↓ pause
                  /agent --resume
```

---

## 🔧 Tùy Chỉnh

### Thêm Workflow Mới (Workspace)

Tạo file `.agent/workflows/your-workflow.md`:

```markdown
---
description: Mô tả ngắn workflow
---

# /your-command - Tên Workflow

[Nội dung hướng dẫn]
```

### Thêm Quy Tắc (Workspace)

Tạo file trong `.agent/rules/your-rule.md`

---

## ❓ FAQ

### Q: `/go` vs `/agent` khác gì?

**`/go`**: Build 1 lần, dự án đơn giản (landing, demo)
**`/agent`**: Build nhiều module, có thể dừng/tiếp tục

### Q: Khi nào dùng `/debug`?

Khi có lỗi và muốn follow quy trình 9 bước có hệ thống.

### Q: Làm sao rollback?

```
/undo --list     # Xem backups
/undo --last     # Restore gần nhất
```

### Q: Contract là gì?

Contract là "hợp đồng" giữa bạn và AI về những gì sẽ được build. Khi locked, không thể thay đổi - đảm bảo AI build đúng spec.

---

## 📚 Tham Khảo

- [VibeCoding CLI Repository](https://github.com/nclamvn/vibecode-cli)
- Source code: `src/commands/*.js`
- Constants: `src/config/constants.js`

---

**Version**: 1.0.0  
**Based on**: VibeCoding CLI  
**Last updated**: 2025-12-29
