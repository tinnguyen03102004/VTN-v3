/**
 * FLIP-based Project Transition
 * Creates smooth image expansion when clicking project
 * VTN Architects - 2024
 */

class ProjectTransition {
    constructor() {
        this.overlay = null;
        this.isTransitioning = false;
        this.createOverlay();
        this.bindEvents();
    }

    createOverlay() {
        // Create transition overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'project-transition-overlay';
        this.overlay.innerHTML = `
            <div class="transition-image-container">
                <img class="transition-image" src="" alt="">
            </div>
            <div class="transition-content">
                <h2 class="transition-title"></h2>
                <span class="transition-meta"></span>
            </div>
            <div class="transition-loader"></div>
        `;
        document.body.appendChild(this.overlay);
    }

    bindEvents() {
        // Bind to all grid items
        document.querySelectorAll('.grid-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleClick(e, item));
        });

        // Also bind to featured cards on index page
        document.querySelectorAll('.featured-card').forEach(item => {
            // Skip if it's a category link (green.html or bamboo.html)
            const href = item.getAttribute('href');
            if (href && href.includes('project.html')) {
                item.addEventListener('click', (e) => this.handleClick(e, item));
            }
        });
    }

    handleClick(e, item) {
        e.preventDefault();

        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const img = item.querySelector('img');
        const projectName = item.querySelector('.project-name, .card-title');
        const title = projectName?.textContent || '';
        const targetUrl = item.getAttribute('href');

        // Store project info for detail page
        sessionStorage.setItem('projectTransition', 'true');
        sessionStorage.setItem('projectImage', img.src);
        sessionStorage.setItem('projectTitle', title);

        // Mark the clicked item
        item.classList.add('transitioning');

        // FIRST: Get initial position
        const rect = img.getBoundingClientRect();

        // Setup overlay elements
        const transitionImg = this.overlay.querySelector('.transition-image');
        const transitionTitle = this.overlay.querySelector('.transition-title');
        const transitionContent = this.overlay.querySelector('.transition-content');

        transitionImg.src = img.src;
        transitionTitle.textContent = title;

        // Set initial position (INVERT)
        transitionImg.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            object-fit: cover;
            transition: none;
            border-radius: 8px;
        `;

        // Activate overlay
        this.overlay.classList.add('active');
        transitionContent.classList.remove('visible');

        // Force reflow
        transitionImg.offsetHeight;

        // PLAY: Animate to fullscreen
        requestAnimationFrame(() => {
            transitionImg.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                object-fit: cover;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 0;
            `;

            // Show title after image starts expanding
            setTimeout(() => {
                transitionContent.classList.add('visible');
            }, 200);
        });

        // Navigate after animation completes
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1000);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only init if there are grid items or featured cards
    if (document.querySelector('.grid-item') || document.querySelector('.featured-card')) {
        window.projectTransition = new ProjectTransition();
    }
});
