/**
 * VTN Architects - Premium Loader
 * Features: Cycling taglines, particles, progress bar
 * Inspired by BIG.dk
 */

class VTNLoader {
    constructor(options = {}) {
        this.overlay = null;
        this.taglineElement = null;
        this.progressBar = null;
        this.progressText = null;

        // Configuration
        this.config = {
            minDisplayTime: options.minDisplayTime || 3500,
            taglines: options.taglines || ['loader.tagline.architects', 'loader.tagline.green', 'loader.tagline.bamboo'],
            taglineDuration: options.taglineDuration || 1000,
            particleCount: options.particleCount || 20,
            showOnce: options.showOnce !== false // Only show on first visit by default
        };

        this.currentTaglineIndex = 0;
        this.progress = 0;
        this.isComplete = false;
        this.taglineInterval = null;

        // Check if should show loader
        if (this.shouldShowLoader()) {
            this.init();
        } else {
            // Immediately reveal page when skipping loader
            document.body.classList.add('page-loaded');
            document.body.style.overflow = '';
            // Clear skip flag so future loads can decide normally
            if (sessionStorage.getItem('vtn-skip-loader') === 'true') {
                sessionStorage.removeItem('vtn-skip-loader');
            }
        }
    }

    shouldShowLoader() {
        // Skip loader when explicitly requested (e.g., returning from project page)
        if (sessionStorage.getItem('vtn-skip-loader') === 'true') {
            return false;
        }

        // Skip loader on back/forward navigation to avoid reloading overlay
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry && navEntry.type === 'back_forward') {
            return false;
        }

        // Always show if showOnce is false
        if (!this.config.showOnce) return true;

        // Check session storage for first visit
        const hasVisited = sessionStorage.getItem('vtn-loader-shown');
        if (hasVisited) return false;

        // Mark as visited
        sessionStorage.setItem('vtn-loader-shown', 'true');
        return true;
    }

    init() {
        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';

        this.createLoader();
        this.startSequence();

        // Keep dynamic strings in sync when language toggles while loader is visible
        document.addEventListener('vtn:lang', () => {
            if (this.taglineElement) {
                const key = this.taglineElement.getAttribute('data-tagline') || this.config.taglines[this.currentTaglineIndex];
                this.taglineElement.textContent = this.resolveText(key);
            }
            this.updateProgress(this.progress);
        });
    }

    resolveText(keyOrText) {
        if (window.vtnT) return window.vtnT(keyOrText);
        return keyOrText;
    }

    createLoader() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'loader-overlay';
        this.overlay.innerHTML = `
            <!-- Particles Background -->
            <div class="loader-particles">
                ${this.createParticles()}
            </div>
            
            <!-- Glow Effect -->
            <div class="loader-glow"></div>
            
            <!-- Main Content -->
            <div class="loader-content">
                <div class="loader-text">
                    <span class="loader-brand">VTN</span>
                    <span class="loader-tagline" data-i18n="loader.tagline.architects" data-tagline="loader.tagline.architects">Architects</span>
                </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="loader-progress-container">
                <div class="loader-progress-track">
                    <div class="loader-progress-bar"></div>
                </div>
                <span class="loader-progress-text" data-i18n="loader.progressText">Loading experience</span>
            </div>
            
            <!-- Hint -->
            <span class="loader-hint" data-i18n="loader.hint">Sustainable Architecture</span>
        `;

        document.body.insertBefore(this.overlay, document.body.firstChild);

        // Get references
        this.taglineElement = this.overlay.querySelector('.loader-tagline');
        this.progressBar = this.overlay.querySelector('.loader-progress-bar');
        this.progressText = this.overlay.querySelector('.loader-progress-text');
    }

    createParticles() {
        let particles = '';
        for (let i = 0; i < this.config.particleCount; i++) {
            particles += '<div class="particle"></div>';
        }
        return particles;
    }

    startSequence() {
        const startTime = Date.now();

        // Start tagline cycling after initial animation (VTN fade in)
        setTimeout(() => {
            this.startTaglineCycle();
        }, 800);  // Reduced from 1200ms

        // Simulate progress
        this.simulateProgress();

        // Wait for page load + minimum display time
        window.addEventListener('load', () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, this.config.minDisplayTime - elapsed);

            // Complete progress
            setTimeout(() => {
                this.completeProgress();
            }, remaining - 500);

            // Hide loader
            setTimeout(() => {
                this.hideLoader();
            }, remaining);
        });

        // Safety fallback: never leave the page locked if `load` doesn't fire (e.g. blocked assets).
        setTimeout(() => {
            if (this.isComplete) return;
            this.completeProgress();
            this.hideLoader();
        }, this.config.minDisplayTime + 8000);
    }

    startTaglineCycle() {
        // Activate first tagline
        this.taglineElement.classList.add('active');

        // Cycle through taglines
        this.taglineInterval = setInterval(() => {
            if (this.isComplete) {
                clearInterval(this.taglineInterval);
                return;
            }

            this.cycleTagline();
        }, this.config.taglineDuration);
    }

    cycleTagline() {
        // Exit current
        this.taglineElement.classList.remove('active');
        this.taglineElement.classList.add('exit');

        setTimeout(() => {
            // Move to next tagline
            this.currentTaglineIndex = (this.currentTaglineIndex + 1) % this.config.taglines.length;
            const newTagline = this.config.taglines[this.currentTaglineIndex];

            // Update content
            this.taglineElement.textContent = this.resolveText(newTagline);
            this.taglineElement.setAttribute('data-tagline', newTagline);

            // Animate in
            this.taglineElement.classList.remove('exit');
            this.taglineElement.classList.add('active');
        }, 400);
    }

    simulateProgress() {
        const interval = setInterval(() => {
            if (this.progress >= 90 || this.isComplete) {
                clearInterval(interval);
                return;
            }

            // Random increment for natural feel
            const increment = Math.random() * 15 + 5;
            this.progress = Math.min(90, this.progress + increment);
            this.updateProgress(this.progress);
        }, 300);
    }

    completeProgress() {
        this.isComplete = true;

        // Animate to 100%
        const animate = () => {
            if (this.progress >= 100) {
                this.updateProgress(100);
                return;
            }

            this.progress += 5;
            this.updateProgress(this.progress);
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateProgress(value) {
        if (this.progressBar) {
            this.progressBar.style.width = `${value}%`;
        }

        // Update text at certain thresholds
        if (this.progressText) {
            if (value >= 100) {
                this.progressText.textContent = this.resolveText('loader.ready');
            } else if (value >= 70) {
                this.progressText.textContent = this.resolveText('loader.almostThere');
            } else if (value >= 40) {
                this.progressText.textContent = this.resolveText('loader.loadingAssets');
            }
        }
    }

    hideLoader() {
        this.isComplete = true;
        clearInterval(this.taglineInterval);

        // Re-enable scroll
        document.body.style.overflow = '';

        // IMPORTANT: Trigger page entrance animations BEFORE loader fades
        // This ensures the content starts appearing while loader is still visible
        document.body.classList.add('page-loaded');

        // Small delay then fade out loader - allows page content to start rendering
        setTimeout(() => {
            this.overlay.classList.add('fade-out');
        }, 100);

        // Remove from DOM after animation
        setTimeout(() => {
            if (this.overlay && this.overlay.parentNode) {
                this.overlay.remove();
            }
        }, 1200);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.vtnLoader = new VTNLoader({
        minDisplayTime: 3500,      // Reduced from 5000 for faster access
        taglines: ['loader.tagline.architects', 'loader.tagline.green', 'loader.tagline.bamboo'],
        taglineDuration: 1000,     // Slightly faster cycle
        showOnce: true             // Change to false to show every page load
    });
});
