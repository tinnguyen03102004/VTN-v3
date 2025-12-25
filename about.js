/**
 * About Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // SMOOTH SCROLL (Lenis)
    // ============================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync scroll progress
    const scrollProgress = document.querySelector('.scroll-progress');
    const parallaxImages = document.querySelectorAll('.parallax-image');
    let scrollY = 0;

    lenis.on('scroll', (e) => {
        scrollY = e.animatedScroll;

        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / scrollHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }
    });

    // Dedicated animation loop for smoother parallax inertia
    function updateParallax() {
        parallaxImages.forEach(img => {
            const container = img.parentElement;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate position progress through viewport
                // We use getBoundingClientRect which is already influenced by Lenis smooth scroll
                const distance = (windowHeight - rect.top) / (windowHeight + container.offsetHeight);
                const yPos = (distance - 0.5) * 15; // Range of movement

                img.style.transform = `translate3d(0, ${yPos}%, 0) scale(1.1)`;
            }
        });
        requestAnimationFrame(updateParallax);
    }
    updateParallax();

    // ============================================
    // MENU OVERLAY LOGIC & SMOOTH SCROLL
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');

    const handleScrollTo = (targetId) => {
        const target = document.querySelector(targetId);
        if (target) {
            lenis.scrollTo(target, {
                offset: -100, // Adjust for header height if needed
                duration: 1.5
            });
        }
    };

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOverlay.classList.toggle('is-active');
            menuToggle.classList.toggle('active');
        });

        // Close when clicking links and handle local anchors
        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // If local anchor on about page
                if (href.startsWith('#')) {
                    e.preventDefault();
                    handleScrollTo(href);
                }

                menuOverlay.classList.remove('is-active');
                menuToggle.classList.remove('active');
            });
        });

        // Close clicking outside
        document.addEventListener('click', (e) => {
            if (menuOverlay.classList.contains('is-active')) {
                if (!menuOverlay.contains(e.target) && !menuToggle.contains(e.target)) {
                    menuOverlay.classList.remove('is-active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    }

    // Handle initial hash on page load
    if (window.location.hash) {
        // Small delay to ensure Lenis is ready and layout is stable
        setTimeout(() => {
            handleScrollTo(window.location.hash);
        }, 500);
    }

    // ============================================
    // PEOPLE SECTION - Photo Hover with Dynamic Position
    // ============================================
    const personItems = document.querySelectorAll('.person-item');
    const personPhoto = document.getElementById('personPhoto');
    const photoContainer = document.querySelector('.people-photo-container');
    const peopleLayout = document.querySelector('.people-layout');
    let currentPhotoUrl = null;

    // Hover photo reveal with dynamic positioning and crossfade
    if (personItems.length && personPhoto && photoContainer && peopleLayout) {
        personItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const photoUrl = item.dataset.photo;
                if (photoUrl) {
                    // Calculate position relative to people-layout
                    const layoutRect = peopleLayout.getBoundingClientRect();
                    const itemRect = item.getBoundingClientRect();
                    const topOffset = itemRect.top - layoutRect.top;

                    // Update photo container position to align with hovered item
                    photoContainer.style.top = `${topOffset}px`;

                    // Show the container
                    photoContainer.classList.add('is-active');

                    // If switching to a different photo, do crossfade
                    if (currentPhotoUrl !== photoUrl) {
                        // Fade out current photo first (if any)
                        if (currentPhotoUrl) {
                            personPhoto.classList.remove('is-visible');
                        }

                        // Preload and show new image
                        const img = new Image();
                        img.onload = () => {
                            // Small delay for crossfade effect when switching
                            setTimeout(() => {
                                personPhoto.src = photoUrl;
                                personPhoto.alt = item.querySelector('.person-name')?.textContent || '';
                                personPhoto.classList.add('is-visible');
                                currentPhotoUrl = photoUrl;
                            }, currentPhotoUrl ? 100 : 0);
                        };
                        img.src = photoUrl;
                    }
                }
            });
        });

        // Hide photo when leaving the people list
        const peopleList = document.querySelector('.people-list');
        if (peopleList) {
            peopleList.addEventListener('mouseleave', () => {
                personPhoto.classList.remove('is-visible');
                photoContainer.classList.remove('is-active');
                currentPhotoUrl = null;
            });
        }
    }

    // ============================================
    // PARTNER PHOTO HOVER (Legacy - kept for compatibility)
    // ============================================
    const partnerItems = document.querySelectorAll('.partner-item');
    const partnerPhoto = document.getElementById('partnerPhoto');

    if (partnerItems.length && partnerPhoto) {
        partnerItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const photoSrc = item.dataset.photo;
                if (photoSrc) {
                    partnerPhoto.src = photoSrc;
                    partnerPhoto.classList.add('is-visible');
                }
            });
        });

        const partnerList = document.querySelector('.partners-list');
        if (partnerList) {
            partnerList.addEventListener('mouseleave', () => {
                partnerPhoto.classList.remove('is-visible');
            });
        }
    }


    // ============================================
    // CONTACT ACCORDION
    // ============================================
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close others (optional - exclusive accordion)
            // accordions.forEach(other => {
            //     if (other !== acc) other.classList.remove('active');
            // });

            // Toggle current
            acc.classList.toggle('active');
        });
    });
});
