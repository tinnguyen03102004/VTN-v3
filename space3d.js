/**
 * VTN Architects - 3D Space View JavaScript
 * Simplified River Flow Effect with List-to-Space Entrance Animation
 */

(function () {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        cardWidth: 280,
        edgePadding: 0.1,
        mobileCardScale: 0.8,
        flowSpeed: 1.2,  // Increased for faster auto-drift
        pauseOnHover: true,
        hoverSlowdownRatio: 0.2,
        scrollEfficiency: 0.08,  // Increased for better touch response
        scrollFriction: 0.96,
        maxScrollVelocity: 120,
        // Doubling the projects handled in createSpaceCards
    };

    // ============================================
    // STATE
    // ============================================
    let spaceContainer = null;
    let spaceScene = null;
    let cards = [];
    let isSpaceViewActive = false;
    let animationId = null;
    let isHoveringCard = false;
    let hoveredCardData = null;
    let isTransitioning = false;
    let scrollVelocity = 0;

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        createSpaceContainer();
        createViewToggle();
        createSpaceCards();
        bindEvents();

        // Note: 3D view will be activated by flying3d.js as default
    }


    // ============================================
    // CREATE SPACE CONTAINER
    // ============================================
    function createSpaceContainer() {
        spaceContainer = document.createElement('div');
        spaceContainer.className = 'space-container';

        spaceScene = document.createElement('div');
        spaceScene.className = 'space-scene';

        const loading = document.createElement('div');
        loading.className = 'space-loading';
        loading.textContent = 'Loading...';

        spaceContainer.appendChild(spaceScene);
        spaceContainer.appendChild(loading);

        document.body.appendChild(spaceContainer);
    }

    // ============================================
    // CREATE VIEW TOGGLE
    // ============================================
    function createViewToggle() {
        const toggle = document.createElement('div');
        toggle.className = 'view-toggle';
        toggle.innerHTML = `
            <button class="view-toggle__btn" data-view="list" data-i18n="view.list">List</button>
            <button class="view-toggle__btn active" data-view="space" data-i18n="view.space">Space</button>
        `;

        document.body.appendChild(toggle);

        if (window.vtnApplyI18n) {
            setTimeout(() => window.vtnApplyI18n(toggle), 50);
        }
    }

    // ============================================
    // CREATE SPACE CARDS
    // Doubling the projects to create a denser flow
    // ============================================
    function createSpaceCards() {
        if (typeof PROJECTS_DATA === 'undefined') {
            console.error('PROJECTS_DATA not found');
            return;
        }

        spaceContainer.classList.add('loading');

        // Double the projects
        const baseProjects = Object.entries(PROJECTS_DATA);
        const doubledProjects = [
            ...baseProjects.map(([id, p]) => ({ id, project: p, original: true })),
            ...baseProjects.map(([id, p]) => ({ id: `${id}_2`, project: p, original: false }))
        ];

        const positions = generateRiverPositions(doubledProjects.length);

        doubledProjects.forEach((item, index) => {
            const card = createCard(item.id, item.project, positions[index], index);
            spaceScene.appendChild(card);
            cards.push({
                element: card,
                ...positions[index],
                projectIdOriginal: item.id.replace('_2', ''),
                currentScale: 1,
                targetScale: 1,
                isOriginal: item.original
            });
        });

        setTimeout(() => {
            spaceContainer.classList.remove('loading');
        }, 500);
    }

    function generateRiverPositions(count) {
        const positions = [];
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 768;

        const cardScale = isMobile ? CONFIG.mobileCardScale : 1;
        const cardWidth = CONFIG.cardWidth * cardScale;
        const cardHeight = cardWidth * 0.65;

        // Wider spread for doubled projects
        const spreadWidth = vw * 5; // Increased spread for 16 cards
        const paddingY = vh * CONFIG.edgePadding;

        for (let i = 0; i < count; i++) {
            let bestPos = null;
            let maxMinDist = -1;

            // Try 15 candidates for each initial position
            for (let c = 0; c < 15; c++) {
                const baseX = (i / count) * spreadWidth - vw;
                const xVariation = (Math.random() - 0.5) * (spreadWidth / count) * 2;

                const testPos = {
                    x: baseX + xVariation,
                    y: paddingY + Math.random() * (vh - cardHeight - paddingY * 2),
                    width: cardWidth,
                    flowSpeed: CONFIG.flowSpeed + (Math.random() - 0.5) * 0.2
                };

                let minDist = Infinity;
                if (positions.length === 0) {
                    minDist = 1000; // First card is always fine
                } else {
                    for (const existing of positions) {
                        const dx = testPos.x - existing.x;
                        const dy = testPos.y - existing.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        if (d < minDist) minDist = d;
                    }
                }

                if (minDist > maxMinDist) {
                    maxMinDist = minDist;
                    bestPos = testPos;
                }
            }

            positions.push(bestPos);
        }

        return positions;
    }

    function createCard(id, project, position, index) {
        const card = document.createElement('a');
        card.className = 'space-card';

        // Clean the ID to get the actual project ID (remove _2 suffix)
        const cleanId = id.replace('_2', '');
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
            <img class="space-card__image" src="${project.image}" alt="${title}" loading="eager">
            <div class="space-card__title">
                ${title}
                <span class="space-card__location">${location}</span>
            </div>
        `;

        const aspectRatio = 0.65;

        card.style.cssText = `
            left: 0;
            top: ${position.y}px;
            width: ${position.width}px;
            height: ${position.width * aspectRatio}px;
            transform: translate3d(${position.x}px, 0, 0);
        `;

        return card;
    }



    function bindEvents() {
        spaceScene.addEventListener('mouseover', handleCardHoverIn);
        spaceScene.addEventListener('mouseout', handleCardHoverOut);

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.view-toggle__btn');
            if (btn) {
                const view = btn.dataset.view;
                if (view === 'space' && !isSpaceViewActive) {
                    activateSpaceView();
                } else if (view === 'list' && isSpaceViewActive) {
                    deactivateSpaceView();
                }

                document.querySelectorAll('.view-toggle__btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
                return;
            }

            // Listen for category link clicks
            const catLink = e.target.closest('.cat-link[data-filter]');
            if (catLink) {
                const category = catLink.dataset.filter || 'all';
                filterCards(category);
            }

            // Listen for logo click to reset filter
            const logo = e.target.closest('.header-logo');
            if (logo) {
                filterCards('all');
            }
        });

        window.addEventListener('resize', debounce(handleResize, 300));
        document.addEventListener('vtn:lang', updateCardTitles);

        // Wheel event for flow control
        window.addEventListener('wheel', handleWheel, { passive: false });

        // ============================================
        // TOUCH/SWIPE EVENTS FOR MOBILE/TABLET
        // Swipe LEFT/RIGHT to control flow (horizontal swipe)
        // ============================================
        let touchStartX = 0;
        let lastTouchX = 0;
        let lastTouchTime = 0;
        let touchVelocity = 0;

        spaceContainer.addEventListener('touchstart', (e) => {
            if (!isSpaceViewActive || isTransitioning) return;
            touchStartX = e.touches[0].clientX;
            lastTouchX = touchStartX;
            lastTouchTime = Date.now();
            touchVelocity = 0;
        }, { passive: true });

        spaceContainer.addEventListener('touchmove', (e) => {
            if (!isSpaceViewActive || isTransitioning) return;
            e.preventDefault();

            const currentX = e.touches[0].clientX;
            const currentTime = Date.now();
            // Swipe right = positive deltaX = speed up flow (forward)
            // Swipe left = negative deltaX = slow down/reverse flow
            const deltaX = lastTouchX - currentX;
            const deltaTime = currentTime - lastTouchTime;

            // Calculate touch velocity
            if (deltaTime > 0) {
                touchVelocity = deltaX / deltaTime * 15;
            }

            // Apply swipe impact directly
            const impact = deltaX * CONFIG.scrollEfficiency * 0.8;
            scrollVelocity += impact;

            // Clamp velocity
            if (Math.abs(scrollVelocity) > CONFIG.maxScrollVelocity) {
                scrollVelocity = CONFIG.maxScrollVelocity * Math.sign(scrollVelocity);
            }

            lastTouchX = currentX;
            lastTouchTime = currentTime;
        }, { passive: false });

        spaceContainer.addEventListener('touchend', (e) => {
            if (!isSpaceViewActive || isTransitioning) return;

            // Add momentum from final touch velocity
            scrollVelocity += touchVelocity * 2;

            // Clamp final velocity
            if (Math.abs(scrollVelocity) > CONFIG.maxScrollVelocity) {
                scrollVelocity = CONFIG.maxScrollVelocity * Math.sign(scrollVelocity);
            }
        }, { passive: true });

        // Initial filter check
        const params = new URLSearchParams(window.location.search);
        const initialFilter = params.get('filter') || 'all';
        setTimeout(() => filterCards(initialFilter), 500);
    }

    function filterCards(category) {
        const isAll = category === 'all';

        if (isAll) {
            spaceScene.classList.remove('is-filtered');
        } else {
            spaceScene.classList.add('is-filtered');
        }

        cards.forEach(cardData => {
            const el = cardData.element;
            const rowCategory = el.dataset.category;
            const shouldHighlight = isAll || rowCategory === category;

            if (shouldHighlight) {
                el.classList.remove('filter-out');
                if (!isAll) {
                    el.classList.add('filter-active');
                    cardData.targetScale = 1; // Direct scale
                } else {
                    el.classList.remove('filter-active');
                    cardData.targetScale = 1;
                }
            } else {
                el.classList.add('filter-out');
                el.classList.remove('filter-active');
                cardData.targetScale = 0.8; // Scale down dimmed cards
            }
        });
    }

    function handleWheel(e) {
        if (!isSpaceViewActive || isTransitioning) return;

        // Prevent standard body scroll in Space view
        e.preventDefault();

        // Use a non-linear scaling for scroll input to make hard scrolls more impactful
        const delta = e.deltaY;
        const direction = Math.sign(delta);
        const magnitude = Math.abs(delta);

        // Power scaling for more 'aggressive' acceleration on fast flicks
        const impact = direction * Math.pow(magnitude, 1.1) * CONFIG.scrollEfficiency;

        // Accumulate velocity
        scrollVelocity += impact;

        // Clamp max velocity to prevent extreme jumping, but with a much higher ceiling
        if (Math.abs(scrollVelocity) > CONFIG.maxScrollVelocity) {
            scrollVelocity = CONFIG.maxScrollVelocity * Math.sign(scrollVelocity);
        }
    }

    function handleCardHoverIn(e) {
        const cardElement = e.target.closest('.space-card');
        if (!cardElement) return;
        const index = cardElement.dataset.index;
        const cardData = cards[index];
        if (cardData) {
            isHoveringCard = true;
            hoveredCardData = cardData;
            cardElement.classList.add('is-hovered');
            cardData.targetScale = 1;
        }
    }

    function handleCardHoverOut(e) {
        const cardElement = e.target.closest('.space-card');
        if (!cardElement) return;
        const index = cardElement.dataset.index;
        const cardData = cards[index];
        if (cardData) {
            isHoveringCard = false;
            hoveredCardData = null;
            cardElement.classList.remove('is-hovered');
            cardData.targetScale = 1;
        }
    }

    // ============================================
    // ANIMATION LOOP
    // ============================================
    function animate() {
        if (!isSpaceViewActive) {
            animationId = null;
            return;
        }

        if (isTransitioning) {
            animationId = requestAnimationFrame(animate);
            return;
        }

        const flowMultiplier = isHoveringCard ? CONFIG.hoverSlowdownRatio : 1;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Scale the velocity for displacement - reduced for precision
        const scrollBoost = scrollVelocity;

        cards.forEach(cardData => {
            // Apply drift + scroll boost (boost is applied to individual card's flow characteristics)
            // This ensures that cards that are naturally faster move even faster during scroll
            const currentDrift = cardData.flowSpeed * flowMultiplier;
            const currentScrollScale = cardData.flowSpeed / CONFIG.flowSpeed; // Relativity factor

            cardData.x += currentDrift + (scrollBoost * currentScrollScale);

            // When card goes off-screen right
            if (cardData.x > vw + 400) {
                let bestX = -cardData.width - 400;
                let bestY = cardData.y;
                let maxDistToNearest = -1;

                for (let i = 0; i < 8; i++) {
                    const testX = -cardData.width - 400 - Math.random() * 1000;
                    const testY = vh * CONFIG.edgePadding +
                        Math.random() * (vh * (1 - CONFIG.edgePadding * 2) - cardData.width * 0.65);

                    let minDist = Infinity;
                    for (const other of cards) {
                        if (other === cardData) continue;
                        const dx = testX - other.x;
                        const dy = testY - other.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        if (d < minDist) minDist = d;
                    }

                    if (minDist > maxDistToNearest) {
                        maxDistToNearest = minDist;
                        bestX = testX;
                        bestY = testY;
                    }
                }

                cardData.x = bestX;
                cardData.y = bestY;
                cardData.flowSpeed = CONFIG.flowSpeed + (Math.random() - 0.5) * 0.15;
            }
            // When card goes off-screen left (Rewind)
            else if (cardData.x < -cardData.width - 1500) {
                let bestX = vw + 400;
                let bestY = cardData.y;
                let maxDistToNearest = -1;

                for (let i = 0; i < 8; i++) {
                    const testX = vw + 400 + Math.random() * 1000;
                    const testY = vh * CONFIG.edgePadding +
                        Math.random() * (vh * (1 - CONFIG.edgePadding * 2) - cardData.width * 0.65);

                    let minDist = Infinity;
                    for (const other of cards) {
                        if (other === cardData) continue;
                        const dx = testX - other.x;
                        const dy = testY - other.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        if (d < minDist) minDist = d;
                    }

                    if (minDist > maxDistToNearest) {
                        maxDistToNearest = minDist;
                        bestX = testX;
                        bestY = testY;
                    }
                }

                cardData.x = bestX;
                cardData.y = bestY;
            }

            cardData.currentScale += (cardData.targetScale - cardData.currentScale) * 0.15;

            cardData.element.style.transform = `translate3d(${cardData.x}px, 0, 0) scale(${cardData.currentScale})`;
            cardData.element.style.top = `${cardData.y}px`;
            cardData.element.style.zIndex = cardData === hoveredCardData ? '200' : '10';
        });

        // Dissipate scroll velocity
        scrollVelocity *= CONFIG.scrollFriction;
        if (Math.abs(scrollVelocity) < 0.01) scrollVelocity = 0;

        animationId = requestAnimationFrame(animate);
    }

    // ============================================
    // ENTRANCE ANIMATION (List to Space)
    // ============================================
    function activateSpaceView() {
        const wasInList = !document.body.classList.contains('space-view-active');
        isSpaceViewActive = true;
        document.body.classList.add('space-view-active');

        if (wasInList) {
            performEntranceAnimation();
        } else {
            if (!animationId) animate();
        }
    }

    function performEntranceAnimation() {
        isTransitioning = true;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Reset all cards for the "Flow-in" effect
        cards.forEach((cardData, i) => {
            const el = cardData.element;
            el.classList.add('transitioning');

            // Set initial state: Off-screen to the left, blurred, and invisible
            el.style.transition = 'none';
            el.style.opacity = '0';
            el.style.filter = 'blur(10px)';

            // Start from a point offset to the left of their target X
            const startX = cardData.x - 300;
            el.style.transform = `translate3d(${startX}px, 0, 0) scale(0.9)`;
            el.style.top = `${cardData.y}px`;

            // Stagger based on their horizontal position (from left to right)
            // This creates a "wave" effect as they enter the screen
            const delay = (cardData.x + vw) * 0.2 + (i * 20); // Delay based on X position

            setTimeout(() => {
                el.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease, filter 1.2s ease';
                el.style.opacity = '1';
                el.style.filter = 'blur(0)';
                el.style.transform = `translate3d(${cardData.x}px, 0, 0) scale(1)`;
            }, delay);
        });

        // End transition after the longest animation completes
        setTimeout(() => {
            cards.forEach(cardData => {
                cardData.element.classList.remove('transitioning');
                cardData.element.style.transition = '';
                cardData.element.style.filter = '';
            });
            isTransitioning = false;
            if (!animationId) animate();
        }, 2500);
    }

    function deactivateSpaceView() {
        isSpaceViewActive = false;
        document.body.classList.remove('space-view-active');
        if (spaceScene) spaceScene.style.transform = '';
    }

    function updateCardTitles() {
        if (typeof PROJECTS_DATA === 'undefined') return;
        const isEnglish = document.documentElement.lang === 'en' ||
            localStorage.getItem('vtn-lang') === 'en';

        cards.forEach(card => {
            const id = card.element.dataset.projectId;
            const originalId = id.replace('_2', '');
            const project = PROJECTS_DATA[originalId];
            if (!project) return;
            const title = isEnglish ? project.title : (project.titleVi || project.title);
            const location = isEnglish ? project.locationEn : project.location;
            const titleEl = card.element.querySelector('.space-card__title');
            if (titleEl) {
                titleEl.innerHTML = `${title}<span class="space-card__location">${location}</span>`;
            }
        });
    }

    function handleResize() {
        const vh = window.innerHeight;
        const paddingY = vh * CONFIG.edgePadding;
        cards.forEach(cardData => {
            if (cardData.y + cardData.width * 0.65 > vh - paddingY) {
                cardData.y = paddingY + Math.random() * (vh - cardData.width * 0.65 - paddingY * 2);
                cardData.element.style.top = `${cardData.y}px`;
            }
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
