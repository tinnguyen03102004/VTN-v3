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
        startZ: -5000,           // Deeper starting point for long tunnel effect
        endZ: 600,               // End depth (past the screen)
        baseSpeed: 1.8,          // Increased for natural faster flow
        speedVariation: 0.5,     // More variation for natural feel
        cardBaseWidth: 600,
        cardAspectRatio: 0.65,
        divergenceFactor: 0.18,  // Straighter path
        scrollMultiplier: 0.12,
        scrollFriction: 0.96,
        maxScrollVelocity: 60,
        maxScrollImpact: 10,     // NEW: Limit scroll impact per frame
        gridSpread: 380,
        pauseOnHover: true,
        hoverSlowdown: 0.1,
        swayAmplitude: 0.4,
        swaySpeed: 0.0008,
        parallaxStrength: 3.5,
        // Golden Zone System - 5 zones
        goldenZoneStart: -1200,  // Where full visibility begins
        goldenZoneEnd: 200,      // Where fade-out starts
        farFogEnd: -2500,        // Where far fade-in completes
        nearFogStart: 350,       // Where near fade-out starts hard
        maxBlur: 5,              // Max blur for distant cards
        // Adaptive Density
        targetDensityDesktop: 22,
        targetDensityTablet: 16,
        targetDensityMobile: 10,
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
        const baseCount = baseProjects.length;

        // Adaptive density - calculate multiplier based on viewport and project count
        const vw = window.innerWidth;
        const isMobile = vw < 768;
        const isTablet = vw >= 768 && vw < 1200;
        const targetDensity = isMobile ? CONFIG.targetDensityMobile :
            isTablet ? CONFIG.targetDensityTablet : CONFIG.targetDensityDesktop;

        const multiplier = Math.max(1, Math.ceil(targetDensity / baseCount));

        // Build project list with adaptive duplication
        let projects = baseProjects.map(([id, p]) => ({ id, project: p, set: 0 }));
        for (let i = 1; i < multiplier; i++) {
            projects = projects.concat(
                baseProjects.map(([id, p]) => ({ id: `${id}_${i + 1}`, project: p, set: i }))
            );
        }

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

        // Responsive card sizing - refined for desktop to avoid crowding
        const cardWidth = isMobile ? Math.min(vw * 0.75, 300) :
            isTablet ? Math.min(vw * 0.45, 480) :
                Math.min(vw * 0.3, 540);
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


        // Staggered Z-queue with controlled randomness (15% noise)
        const zInterval = (CONFIG.endZ - CONFIG.startZ) / count;
        const zNoise = zInterval * 0.15; // 15% randomness

        for (let i = 0; i < count; i++) {
            // Base Z position with small noise for natural feel
            const z = CONFIG.startZ + (i * zInterval) + (Math.random() - 0.5) * zNoise;

            const zRange = CONFIG.endZ - CONFIG.startZ;
            const normalizedZ = (z - CONFIG.startZ) / zRange;

            // Perspective spreading: cards spread more as they get closer
            const spreadFactorX = effectiveSpreadX * (1 + normalizedZ * 1.8);
            const spreadFactorY = effectiveSpreadY * (1 + normalizedZ * 1.8);

            // Radial distribution with tighter center for tunnel feel
            const angle = Math.random() * Math.PI * 2;
            const radiusScale = 0.5 + Math.random() * 1.5;

            const baseX = Math.cos(angle) * spreadFactorX * radiusScale;
            const baseY = Math.sin(angle) * spreadFactorY * radiusScale;

            positions.push({
                baseX: baseX,
                baseY: baseY,
                z: z,
                speed: CONFIG.baseSpeed + (Math.random() - 0.5) * CONFIG.speedVariation * 0.4,
                width: cardWidth,
                height: cardHeight,
                swayOffset: Math.random() * Math.PI * 2
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

                // Recalculate responsive card size - balanced for desktop
                const cardWidth = isMobile ? Math.min(vw * 0.75, 300) :
                    isTablet ? Math.min(vw * 0.45, 480) :
                        Math.min(vw * 0.3, 540);
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
        let impact = direction * Math.pow(magnitude, 1.05) * CONFIG.scrollMultiplier;

        // Speed limiter - cap impact per frame to prevent chaos
        impact = Math.max(-CONFIG.maxScrollImpact, Math.min(CONFIG.maxScrollImpact, impact));

        scrollVelocity += impact;

        // Clamp total velocity
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

        const vw = window.innerWidth;
        const isDesktop = vw >= 1200;

        flyingCards.forEach((cardData, index) => {
            // Move along Z axis
            const effectiveSpeed = cardData.speed * speedMultiplier + scrollVelocity * (cardData.speed / CONFIG.baseSpeed);
            cardData.z += effectiveSpeed;

            // Wrap around when passing the viewer
            if (cardData.z > CONFIG.endZ) {
                cardData.z = CONFIG.startZ + (Math.random() * 400) - 200;

                // Viewport-aware respawn position with radial tunnel spread
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const isMobile = vw < 768;
                const isTablet = vw >= 768 && vw < 1200;

                const spreadX = isMobile ? vw * 0.55 : isTablet ? vw * 0.4 : vw * 0.3;
                const spreadY = isMobile ? vh * 0.4 : isTablet ? vh * 0.35 : vh * 0.28;

                const angle = Math.random() * Math.PI * 2;
                const radiusScale = 0.5 + Math.random() * 1.6;

                cardData.baseX = Math.cos(angle) * spreadX * radiusScale * 1.2;
                cardData.baseY = Math.sin(angle) * spreadY * radiusScale * 1.2;

                cardData.swayOffset = Math.random() * Math.PI * 2; // Random sway phase
                cardData.speed = CONFIG.baseSpeed + (Math.random() - 0.5) * CONFIG.speedVariation * 0.5;

            } else if (cardData.z < CONFIG.startZ - 200) {
                cardData.z = CONFIG.endZ - (Math.random() * 300);
            }

            // Sway effect - elegant floating
            const swayOffset = cardData.swayOffset || index;
            const swayX = Math.sin(animationTime * CONFIG.swaySpeed + swayOffset) * CONFIG.swayAmplitude;
            const swayY = Math.cos(animationTime * CONFIG.swaySpeed * 0.7 + swayOffset) * CONFIG.swayAmplitude * 0.5;

            // Calculate divergence - use a smooth curve to avoid jumps
            // normalizedZ is 0 (far) to 1 (near)
            const normalizedZ = (cardData.z - CONFIG.startZ) / zRange;

            // Base linear divergence
            let divergence = normalizedZ * CONFIG.divergenceFactor;

            // On desktop, add a smooth cubic 'exit' curve to prevent crowding near the viewer
            // This is 0 at distance and grows smoothly without jumps
            if (isDesktop) {
                divergence += Math.pow(normalizedZ, 3) * 0.35;
            }

            const divergeMultiplier = 1 + divergence;

            const finalX = (cardData.baseX + swayX) * divergeMultiplier;
            const finalY = (cardData.baseY + swayY) * divergeMultiplier;

            // Calculate z-index
            const zIndex = Math.floor((cardData.z - CONFIG.startZ) / 10) + 1;

            // Apply transforms for depth feeling
            const el = cardData.element;
            el.style.transform = `translate3d(${finalX}px, ${finalY}px, ${cardData.z}px)`;
            el.style.zIndex = hoveredCard === cardData ? 1000 : zIndex;

            // ========== SIMPLE CLEAN VISIBILITY ==========
            // No blur, just simple fade at spawn/despawn edges
            const z = cardData.z;
            let opacity = 1;

            // Fade in from far (spawn area)
            if (z < CONFIG.farFogEnd) {
                const progress = (z - CONFIG.startZ) / (CONFIG.farFogEnd - CONFIG.startZ);
                opacity = Math.max(0.2, progress);
            }
            // Fade out near (despawn area)
            else if (z > CONFIG.nearFogStart) {
                const range = CONFIG.endZ - CONFIG.nearFogStart;
                const progress = (z - CONFIG.nearFogStart) / range;
                opacity = 1 - progress * 0.8;
            }

            // Dynamic shadow - grows as card approaches
            const shadowSize = 10 + normalizedZ * 25;
            const shadowOpacity = 0.1 + normalizedZ * 0.15;

            if (!el.classList.contains('filter-out')) {
                el.style.opacity = Math.max(0.15, opacity);
                el.style.filter = 'none'; // No blur - keep images sharp
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
