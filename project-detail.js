/**
 * Project Detail Link - Simplified
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // SMOOTH SCROLL (Lenis)
    // ============================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis = lenis;

    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        // Sync scroll progress with Lenis scroll
        lenis.on('scroll', (e) => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (e.animatedScroll / scrollHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }

    // Lightbox Logic
    function initLightbox() {
        const grid = document.querySelector('.gallery-grid');
        if (!grid) return;

        const images = Array.from(grid.querySelectorAll('.gallery-image'));
        const sources = images.map(img => img.src);

        let overlay = document.querySelector('.lightbox-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `
                <div class="lightbox-content">
                    <img class="lightbox-image" src="" data-i18n-alt="lightbox.zoomedImageAlt" alt="Zoomed image">
                    <button type="button" class="lightbox-close" data-i18n-aria-label="lightbox.close" aria-label="Close">&times;</button>
                    <button type="button" class="lightbox-prev" data-i18n-aria-label="lightbox.prev" aria-label="Previous image">&#8249;</button>
                    <button type="button" class="lightbox-next" data-i18n-aria-label="lightbox.next" aria-label="Next image">&#8250;</button>
                </div>
            `;
            document.body.appendChild(overlay);
        }

        const lbImage = overlay.querySelector('.lightbox-image');
        const lbClose = overlay.querySelector('.lightbox-close');
        const lbPrev = overlay.querySelector('.lightbox-prev');
        const lbNext = overlay.querySelector('.lightbox-next');

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            lbImage.src = sources[currentIndex];
            overlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        function showNext(e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % sources.length;
            lbImage.src = sources[currentIndex];
        }

        function showPrev(e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + sources.length) % sources.length;
            lbImage.src = sources[currentIndex];
        }

        images.forEach((img, idx) => {
            img.parentElement.addEventListener('click', () => openLightbox(idx));
        });

        lbClose.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });

        lbNext.addEventListener('click', showNext);
        lbPrev.addEventListener('click', showPrev);

        // Swipe Support for Mobile
        let touchStartX = 0;
        let touchEndX = 0;

        function handleGesture() {
            const swipeThreshold = 50;
            const fakeEvent = { stopPropagation: () => { } };

            if (touchEndX < touchStartX - swipeThreshold) {
                // Swiped Left -> Show Next
                showNext(fakeEvent);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swiped Right -> Show Prev
                showPrev(fakeEvent);
            }
        }

        overlay.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        overlay.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        }, { passive: true });

        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext(e);
            if (e.key === 'ArrowLeft') showPrev(e);
        });
    }

    window.vtnInitLightbox = initLightbox;

    // Simple fade-in for items
    function initScroll() {
        const items = document.querySelectorAll('.gallery-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-inview');
                }
            });
        }, { threshold: 0.1 });

        items.forEach(item => observer.observe(item));
    }

    window.vtnInitScroll = initScroll;

});

