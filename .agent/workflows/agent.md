---
description: Agent Mode - Build dự án đa module tự động (vibecode agent)
---

# /agent - Agent Mode 🤖

> **Build dự án phức tạp với nhiều module**

## Cách dùng
```
/agent "Mô tả dự án phức tạp của bạn"
```

## Ví dụ
```
/agent "Xây dựng hệ thống quản lý dự án với dashboard, user management, và reporting"
```

## Quy trình

### Phase 1: Phân tích
```
1. Phân tích yêu cầu
2. Chia thành modules độc lập
3. Xác định dependencies giữa modules
4. Tạo execution order
```

### Phase 2: Build tuần tự
```
For each module:
  → Contract module
  → Plan module
  → Build module
  → Verify module
  → Next module (hoặc pause)
```

### Phase 3: Tích hợp
```
1. Integration testing
2. Final review
3. Ship
```

## Tạm dừng & Tiếp tục

### Pause
Trong quá trình build, nói "pause" hoặc "dừng"
→ Agent sẽ lưu progress vào `.vibecode/agent/progress.json`

### Resume
```
/agent --resume
```
→ Agent đọc progress và tiếp tục từ module dang dở

## Progress File
`.vibecode/agent/progress.json`:
```json
{
  "session_id": "...",
  "total_modules": 5,
  "completed_modules": ["auth", "dashboard"],
  "current_module": "user-management",
  "current_step": "BUILD",
  "paused_at": "ISO_TIMESTAMP"
}
```

## Output
- Mỗi module có artifacts riêng trong `.vibecode/agent/modules/{module-name}/`
- Orchestrator log tại `.vibecode/agent/orchestrator.log`
- Final integration report

## Khi nào dùng
✅ Dự án lớn, nhiều features
✅ Cần build theo phases
✅ Có thể cần pause/resume

## So với /go
| Aspect | /go | /agent |
|--------|-----|--------|
| Complexity | Simple | Complex |
| Modules | 1 | Multiple |
| Pause/Resume | No | Yes |
| Time | Fast | Longer |
