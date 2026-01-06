# Blueprint: VTN Project Web Presentation

## 🏗 Analysis
Presenting a web project is best done **on the web**. A static PowerPoint slides deck often fails to capture the interactivity (parallax, hover effects) of the site. Therefore, we will build a **Self-Contained Presentation Page (`presentation.html`)** using **Reveal.js**. This demonstrates technical capability and allows seamless switching to the live demo.

## 📐 Technical Architecture

### 1. Core Technology
- **Framework**: [Reveal.js](https://revealjs.com/) (loaded via CDN for simplicity).
- **File**: `presentation.html` (root directory).
- **Styling**: Custom CSS overrides to match VTN branding (Inter/IBM Plex Mono fonts, Minimalist aesthetics).

### 2. Presentation Structure (Slides)
1.  **Intro**: Logo, Title ("VTN Architects: Digital Experience V3").
2.  **Philosophy**: "Nature & Code" - mirroring the physical "Green & Bamboo" architecture.
3.  **UI/UX Highlights**:
    - Parallax scrolling (Depth).
    - Micro-interactions (Hover effects).
    - **New Vision**: Hướng tới cảm xúc, hình ảnh là trung tâm (Visual-first), kể chuyện dẫn dắt (Storytelling).
5.  **Cấu Trúc Dự Án (Project Structure)**:
    - Display the clean folder tree (Source of Truth).
    - Explain the "Component-Based" approach even in Vanilla JS/CSS.
    - Role of `.vibecode` (AI Memory).
6.  **Kỹ Thuật (Technical Excellence)**:
    - Hiệu suất (Lenis Smooth Scroll).
    - Tối ưu hóa SEO.
    - Mã nguồn sạch (Clean Code).
7.  **Live Demo**: Button to launch `index.html`.
8.  **Hỏi & Đáp (Q&A)**: Contact info.

### 3. Assets
- Reuse visuals from `projects/` folder for slide backgrounds.
- **Tree Diagram**: Generate a visual representation of the `f:\Tín\1. Project web\VTN v3` structure to embed in the slide.
- Use `assets/css/base.css` variables for consistent typography.

## 🔄 Implementation Steps
1.  **Setup**: Create `presentation.html` with Reveal.js boilerplate.
2.  **Content**: Implement the 6 defined slides.
3.  **Styling**: Apply VTN theme (Fonts, Colors).
4.  **Link**: Add a hidden or admin link to access the presentation (or just keep it as a standalone file).

## 🚀 Deliverables
- `presentation.html`: The ready-to-present file.
- `presentation.md`: A speaker script/notes file explaining what to say for each slide.
