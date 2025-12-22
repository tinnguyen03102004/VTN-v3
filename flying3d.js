/**
 * VTN Architects - 3D Flying Gallery
 * Gufram-style effect: Elegant floating images with depth and parallax
 */

(function () {
    'use strict';

    // ============================================
    // CONFIGURATION - Gufram-style
    // ============================================
    const CONFIG = {
        perspectiveDepth: 1200,
        startZ: -2500,           // Starting depth (far away)
        endZ: 600,               // End depth (past the screen)
        baseSpeed: 1.1,          // Balanced elegant speed
        speedVariation: 0.4,     // Less variation for smoother flow
        cardBaseWidth: 320,
        cardAspectRatio: 0.65,
        divergenceFactor: 0.3,   // Reduced for straighter flight path
        scrollMultiplier: 0.12,  // Slightly reduced scroll sensitivity
        scrollFriction: 0.96,    // Smoother deceleration
        maxScrollVelocity: 60,
        gridSpread: 380,         // Increased for more breathing room
        pauseOnHover: true,
        hoverSlowdown: 0.1,      // More pause on hover
        // Gufram-style additions
        swayAmplitude: 0.4,      // Lateral float amplitude
        swaySpeed: 0.0008,       // Sway oscillation speed
        depthBlurStart: -1200,   // Z where blur begins
        depthBlurMax: 4,         // Max blur in pixels
        parallaxStrength: 2.5,   // Mouse parallax rotation degrees
    };

    // ============================================
    // STATE
    // ============================================
    let flyingScene = null;
    let flyingCards = [];
    let is3DActive = false;
    let animationId = null;
    let scrollVelocity = 0;
    let isHovering = false;
    let hoveredCard = null;
    let animationTime = 0;      // For sway animation
    let mouseX = 0.5;           // Normalized mouse position (0-1)
    let mouseY = 0.5;


    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        createFlyingScene();
        updateViewToggle();
        bindEvents();

        // Activate 3D view as default after toggle is ready
        setTimeout(() => {
            activate3DView();
            // Update toggle button state
            document.querySelectorAll('.view-toggle__btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === '3d');
            });
        }, 200);
    }


    // ============================================
    // CREATE FLYING SCENE
    // ============================================
    function createFlyingScene() {
        flyingScene = document.createElement('div');
        flyingScene.className = 'flying-3d-scene';
        document.body.appendChild(flyingScene);
    }

    // ============================================
    // UPDATE VIEW TOGGLE (Add 3D option)
    // ============================================
    function updateViewToggle() {
        // Wait for the toggle to be created by space3d.js
        const checkToggle = setInterval(() => {
            const toggle = document.querySelector('.view-toggle');
            if (toggle && !toggle.querySelector('[data-view="3d"]')) {
                // Add 3D button
                const btn3D = document.createElement('button');
                btn3D.className = 'view-toggle__btn';
                btn3D.dataset.view = '3d';
                btn3D.dataset.i18n = 'view.3d';
                btn3D.textContent = '3D';
                toggle.appendChild(btn3D);

                // Apply i18n if available
                if (window.vtnApplyI18n) {
                    setTimeout(() => window.vtnApplyI18n(toggle), 50);
                }

                clearInterval(checkToggle);
            }
        }, 100);

        // Clear after 5 seconds if not found
        setTimeout(() => clearInterval(checkToggle), 5000);
    }

    // ============================================
    // CREATE FLYING CARDS
    // ============================================
    function createFlyingCards() {
        if (typeof PROJECTS_DATA === 'undefined') {
            console.error('PROJECTS_DATA not found');
            return;
        }

        // Clear existing cards
        flyingScene.innerHTML = '';
        flyingCards = [];

        const baseProjects = Object.entries(PROJECTS_DATA);

        // Triple the projects for denser effect
        const projects = [
            ...baseProjects.map(([id, p]) => ({ id, project: p, set: 0 })),
            ...baseProjects.map(([id, p]) => ({ id: `${id}_2`, project: p, set: 1 })),
            ...baseProjects.map(([id, p]) => ({ id: `${id}_3`, project: p, set: 2 })),
        ];

        // Generate grid positions
        const positions = generate3DPositions(projects.length);

        projects.forEach((item, index) => {
            const pos = positions[index];
            const card = createFlyingCard(item.id, item.project, pos, index);
            flyingScene.appendChild(card);

            flyingCards.push({
                element: card,
                baseX: pos.baseX,
                baseY: pos.baseY,
                z: pos.z,
                speed: pos.speed,
                width: pos.width,
                height: pos.height,
                category: item.project.category,
                projectId: item.id.replace(/_[23]$/, ''),
            });
        });
    }

    // ============================================
    // GENERATE 3D POSITIONS
    // Viewport-aware spacing for balanced layout
    // ============================================
    function generate3DPositions(count) {
        const positions = [];
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Responsive breakpoints
        const isMobile = vw < 768;
        const isTablet = vw >= 768 && vw < 1200;

        // Responsive card sizing
        const cardWidth = isMobile ? Math.min(vw * 0.45, 180) :
            isTablet ? Math.min(vw * 0.28, 260) :
                Math.min(vw * 0.2, 320);
        const cardHeight = cardWidth * CONFIG.cardAspectRatio;

        // Responsive grid - fewer columns on smaller screens
        const gridCols = isMobile ? 2 : isTablet ? 3 : 4;
        const gridRows = Math.ceil(count / gridCols);

        // Viewport-relative spacing for balanced "breathing room"
        const minSpacing = cardWidth * 1.2; // Minimum gap = 120% of card width (increased)
        const spreadX = isMobile ? vw * 0.5 : isTablet ? vw * 0.35 : vw * 0.25;  // Increased
        const spreadY = isMobile ? vh * 0.35 : isTablet ? vh * 0.3 : vh * 0.25;   // Increased

        // Ensure minimum spacing
        const effectiveSpreadX = Math.max(spreadX, minSpacing);
        const effectiveSpreadY = Math.max(spreadY, minSpacing * 0.9);


        for (let i = 0; i < count; i++) {
            // Center the grid around origin (0,0)
            const col = (i % gridCols) - (gridCols - 1) / 2;
            const row = Math.floor(i / gridCols) - (gridRows - 1) / 2;

            // Controlled randomness (reduced for more balanced look)
            const randomX = (Math.random() - 0.5) * effectiveSpreadX * 0.4;
            const randomY = (Math.random() - 0.5) * effectiveSpreadY * 0.4;

            // Staggered Z depth
            const zRange = CONFIG.endZ - CONFIG.startZ;
            const baseZ = CONFIG.startZ + (i / count) * zRange * 0.6;
            const randomZ = (Math.random() - 0.5) * zRange * 0.3;

            positions.push({
                baseX: col * effectiveSpreadX + randomX,
                baseY: row * effectiveSpreadY + randomY,
                z: baseZ + randomZ,
                speed: CONFIG.baseSpeed + (Math.random() - 0.5) * CONFIG.speedVariation * 0.6,
                width: cardWidth,
                height: cardHeight,
            });
        }

        return positions;
    }


    // ============================================
    // CREATE SINGLE FLYING CARD
    // ============================================
    function createFlyingCard(id, project, position, index) {
        const card = document.createElement('a');
        card.className = 'flying-card';

        // Clean the ID to get the actual project ID (remove _2 or _3 suffix)
        const cleanId = id.replace(/_[23]$/, '');
        // Set href with language parameter - let default <a> behavior handle navigation
        const lang = localStorage.getItem('vtn-lang') || 'en';
        card.href = `project.html?id=${encodeURIComponent(cleanId)}&lang=${lang}`;
        card.dataset.projectId = cleanId;
        card.dataset.category = project.category;
        card.dataset.index = index;

        const isEnglish = document.documentElement.lang === 'en' ||
            localStorage.getItem('vtn-lang') === 'en';

        const title = isEnglish ? project.title : (project.titleVi || project.title);
        const location = isEnglish ? project.locationEn : project.location;

        card.innerHTML = `
            <img class="flying-card__image" src="${project.image}" alt="${title}" loading="lazy">
            <div class="flying-card__title">
                ${title}
                <span class="flying-card__location">${location}</span>
            </div>
        `;

        card.style.width = `${position.width}px`;
        card.style.height = `${position.height}px`;

        return card;
    }



    // ============================================
    // BIND EVENTS
    // ============================================
    function bindEvents() {
        // View toggle
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.view-toggle__btn');
            if (!btn) return;

            const view = btn.dataset.view;

            if (view === '3d' && !is3DActive) {
                activate3DView();
            } else if (view !== '3d' && is3DActive) {
                deactivate3DView();
            }

            // Update active states
            document.querySelectorAll('.view-toggle__btn').forEach(b =>
                b.classList.toggle('active', b.dataset.view === view)
            );
        });

        // Scroll control
        window.addEventListener('wheel', handleWheel, { passive: false });

        // Category filter
        document.addEventListener('click', (e) => {
            const catLink = e.target.closest('.cat-link[data-filter]');
            if (catLink && is3DActive) {
                const category = catLink.dataset.filter || 'all';
                filterFlyingCards(category);
            }

            const logo = e.target.closest('.header-logo');
            if (logo && is3DActive) {
                filterFlyingCards('all');
            }
        });

        // Hover events
        flyingScene.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.flying-card');
            if (card) {
                isHovering = true;
                hoveredCard = flyingCards[card.dataset.index];
            }
        });

        flyingScene.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.flying-card');
            if (card) {
                isHovering = false;
                hoveredCard = null;
            }
        });

        // Mouse parallax tracking
        document.addEventListener('mousemove', (e) => {
            // Smooth lerp to mouse position
            const targetX = e.clientX / window.innerWidth;
            const targetY = e.clientY / window.innerHeight;
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;
        });

        // Language change
        document.addEventListener('vtn:lang', updateFlyingCardTitles);


        // Resize - update card sizes for responsive layout
        window.addEventListener('resize', debounce(() => {
            if (is3DActive && flyingCards.length > 0) {
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const isMobile = vw < 768;
                const isTablet = vw >= 768 && vw < 1200;

                // Recalculate responsive card size
                const cardWidth = isMobile ? Math.min(vw * 0.45, 180) :
                    isTablet ? Math.min(vw * 0.28, 260) :
                        Math.min(vw * 0.2, 320);
                const cardHeight = cardWidth * CONFIG.cardAspectRatio;

                // Update all card sizes
                flyingCards.forEach(cardData => {
                    cardData.width = cardWidth;
                    cardData.height = cardHeight;
                    cardData.element.style.width = `${cardWidth}px`;
                    cardData.element.style.height = `${cardHeight}px`;
                });
            }
        }, 300));


        // Initial filter check
        const params = new URLSearchParams(window.location.search);
        const initialFilter = params.get('filter') || 'all';
        setTimeout(() => {
            if (is3DActive) filterFlyingCards(initialFilter);
        }, 600);
    }

    // ============================================
    // SCROLL HANDLER
    // ============================================
    function handleWheel(e) {
        if (!is3DActive) return;

        e.preventDefault();

        const delta = e.deltaY;
        const direction = Math.sign(delta);
        const magnitude = Math.abs(delta);

        // Non-linear scaling for more responsive feel
        const impact = direction * Math.pow(magnitude, 1.05) * CONFIG.scrollMultiplier;
        scrollVelocity += impact;

        // Clamp velocity
        if (Math.abs(scrollVelocity) > CONFIG.maxScrollVelocity) {
            scrollVelocity = CONFIG.maxScrollVelocity * Math.sign(scrollVelocity);
        }
    }

    // ============================================
    // ANIMATION LOOP - Gufram-style
    // ============================================
    function animate3D() {
        if (!is3DActive) {
            animationId = null;
            return;
        }

        animationTime += 16; // ~60fps timing
        const speedMultiplier = isHovering && CONFIG.pauseOnHover ? CONFIG.hoverSlowdown : 1;
        const zRange = CONFIG.endZ - CONFIG.startZ;

        // Apply mouse parallax to scene
        const parallaxX = (mouseX - 0.5) * CONFIG.parallaxStrength;
        const parallaxY = (mouseY - 0.5) * -CONFIG.parallaxStrength * 0.6;
        if (flyingScene) {
            flyingScene.style.transform = `rotateY(${parallaxX}deg) rotateX(${parallaxY}deg)`;
        }

        flyingCards.forEach((cardData, index) => {
            // Move along Z axis
            const effectiveSpeed = cardData.speed * speedMultiplier + scrollVelocity * (cardData.speed / CONFIG.baseSpeed);
            cardData.z += effectiveSpeed;

            // Wrap around when passing the viewer
            if (cardData.z > CONFIG.endZ) {
                cardData.z = CONFIG.startZ + (Math.random() * 400) - 200;

                // Viewport-aware respawn position with more spread
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const isMobile = vw < 768;
                const isTablet = vw >= 768 && vw < 1200;

                const spreadX = isMobile ? vw * 0.55 : isTablet ? vw * 0.4 : vw * 0.3;
                const spreadY = isMobile ? vh * 0.4 : isTablet ? vh * 0.35 : vh * 0.28;

                cardData.baseX = (Math.random() - 0.5) * spreadX * 3;
                cardData.baseY = (Math.random() - 0.5) * spreadY * 2.5;

                cardData.swayOffset = Math.random() * Math.PI * 2; // Random sway phase
                cardData.speed = CONFIG.baseSpeed + (Math.random() - 0.5) * CONFIG.speedVariation * 0.5;
            } else if (cardData.z < CONFIG.startZ - 200) {
                cardData.z = CONFIG.endZ - (Math.random() * 300);
            }

            // Sway effect - elegant floating
            const swayOffset = cardData.swayOffset || index;
            const swayX = Math.sin(animationTime * CONFIG.swaySpeed + swayOffset) * CONFIG.swayAmplitude;
            const swayY = Math.cos(animationTime * CONFIG.swaySpeed * 0.7 + swayOffset) * CONFIG.swayAmplitude * 0.5;

            // Calculate divergence
            const normalizedZ = (cardData.z - CONFIG.startZ) / zRange;
            const divergeMultiplier = 1 + normalizedZ * CONFIG.divergenceFactor;

            const finalX = (cardData.baseX + swayX) * divergeMultiplier;
            const finalY = (cardData.baseY + swayY) * divergeMultiplier;

            // Calculate z-index
            const zIndex = Math.floor((cardData.z - CONFIG.startZ) / 10) + 1;

            // Apply transforms
            const el = cardData.element;
            el.style.transform = `translate3d(${finalX}px, ${finalY}px, ${cardData.z}px)`;
            el.style.zIndex = hoveredCard === cardData ? 1000 : zIndex;

            // Depth of Field: blur + fade for distant cards
            const fadeIn = Math.min(1, (cardData.z - CONFIG.startZ) / 500);
            const fadeOut = Math.min(1, (CONFIG.endZ - cardData.z) / 400);
            const baseOpacity = fadeIn * fadeOut;

            // Blur effect for depth
            let blurAmount = 0;
            if (cardData.z < CONFIG.depthBlurStart) {
                const blurProgress = (CONFIG.depthBlurStart - cardData.z) / (CONFIG.depthBlurStart - CONFIG.startZ);
                blurAmount = blurProgress * CONFIG.depthBlurMax;
            }

            // Dynamic shadow - grows as card approaches
            const shadowSize = 10 + normalizedZ * 25;
            const shadowOpacity = 0.1 + normalizedZ * 0.15;

            if (!el.classList.contains('filter-out')) {
                el.style.opacity = Math.max(0.15, baseOpacity);
                el.style.filter = blurAmount > 0.1 ? `blur(${blurAmount.toFixed(1)}px)` : 'none';
                el.style.boxShadow = `0 ${shadowSize}px ${shadowSize * 2}px rgba(0,0,0,${shadowOpacity.toFixed(2)})`;
            }
        });

        // Decay scroll velocity
        scrollVelocity *= CONFIG.scrollFriction;
        if (Math.abs(scrollVelocity) < 0.01) scrollVelocity = 0;

        animationId = requestAnimationFrame(animate3D);
    }


    // ============================================
    // ACTIVATE 3D VIEW
    // ============================================
    function activate3DView() {
        if (flyingCards.length === 0) {
            createFlyingCards();
        }

        is3DActive = true;
        document.body.classList.add('view-3d-active');
        document.body.classList.remove('space-view-active');

        // Start animation
        if (!animationId) {
            animate3D();
        }

        // Apply initial filter
        const params = new URLSearchParams(window.location.search);
        const filter = params.get('filter') || 'all';
        setTimeout(() => filterFlyingCards(filter), 100);
    }

    // ============================================
    // DEACTIVATE 3D VIEW
    // ============================================
    function deactivate3DView() {
        is3DActive = false;
        document.body.classList.remove('view-3d-active');

        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // ============================================
    // FILTER FLYING CARDS
    // ============================================
    function filterFlyingCards(category) {
        const isAll = category === 'all';

        flyingCards.forEach(cardData => {
            const el = cardData.element;
            const shouldShow = isAll || cardData.category === category;

            if (shouldShow) {
                el.classList.remove('filter-out');
                if (!isAll) {
                    el.classList.add('filter-active');
                } else {
                    el.classList.remove('filter-active');
                }
            } else {
                el.classList.add('filter-out');
                el.classList.remove('filter-active');
            }
        });
    }

    // ============================================
    // UPDATE CARD TITLES (Language change)
    // ============================================
    function updateFlyingCardTitles() {
        if (typeof PROJECTS_DATA === 'undefined') return;

        const isEnglish = document.documentElement.lang === 'en' ||
            localStorage.getItem('vtn-lang') === 'en';

        flyingCards.forEach(cardData => {
            const project = PROJECTS_DATA[cardData.projectId];
            if (!project) return;

            const title = isEnglish ? project.title : (project.titleVi || project.title);
            const location = isEnglish ? project.locationEn : project.location;

            const titleEl = cardData.element.querySelector('.flying-card__title');
            if (titleEl) {
                titleEl.innerHTML = `${title}<span class="flying-card__location">${location}</span>`;
            }
        });
    }

    // ============================================
    // UTILITIES
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    // ============================================
    // START
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
