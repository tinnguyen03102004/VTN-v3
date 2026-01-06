# Execution Plan

**Spec-Hash:** b52a4824
**Created:** 2026-01-06

## Tasks

### Task 1: Generate Visual Assets,
- **Files:** `assets/img/structure-tree.png` (via tool generation or text representation if image gen not available), `presentation.html` assets.
- **Action:** CREATE
- **Complexity:** 2
- **Description:** 
    - Generate a "Project Structure" visualization. Since we cannot screenshot the explorer, we will create a high-quality HTML/CSS representation of the folder tree within the slide itself or generate an SVG/Image if possible. *Decision: We will build a CSS-styled Tree Component inside the slide for maximum quality.*

### Task 2: Create Presentation.html Structure
- **Files:** `presentation.html`
- **Action:** CREATE
- **Complexity:** 3
- **Description:** 
    - Set up the HTML5 boilerplate.
    - Import Reveal.js (CDN).
    - Create the slide hierarchy (Intro, Philosophy, Old vs New, Structure, Tech, Demo).
    - Ensure responsive viewport settings.

### Task 3: Develop Content & Illustrations (Vietnamese)
- **Files:** `presentation.html`
- **Action:** MODIFY
- **Complexity:** 4
- **Description:** 
    - Fill in the actual content for each slide in Vietnamese.
    - Slide 1: Welcome & Branding.
    - Slide 2: Philosophy (Green/Bamboo).
    - Slide 3: Transformation (Table/Grid comparison of Old Text vs New Visual).
    - Slide 4: Project Structure (The CSS Tree from Task 1).
    - Slide 5: Tech Stack (Lenis, Clean Code).
    - Slide 6: Demo CTA.

### Task 4: Stylize Presentation (VTN Branding)
- **Files:** `presentation.html` (embedded CSS) or `assets/css/presentation.css`
- **Action:** MODIFY
- **Complexity:** 3
- **Description:** 
    - Override Reveal.js defaults.
    - Apply Inter/IBM Plex Mono fonts.
    - Use VTN color palette (White, Dark Grey, Green accents).
    - Add subtle background animations or textures using existing project assets.

### Task 5: Create Speaker Script
- **Files:** `PRESENTATION_SCRIPT.md`
- **Action:** CREATE
- **Complexity:** 2
- **Description:** 
    - Write a detailed script in Vietnamese corresponding to each slide.
    - Include cues for when to click/advance.

## Execution Order
1. Task 2 (Setup Base)
2. Task 3 (Content Implementation)
3. Task 4 (Styling & Polish)
4. Task 5 (Scripting)

*(Task 1 is merged into Task 3 as a code-based visualization)*

## Estimated Time
- Total tasks: 4
- Estimated: 2 iterations
