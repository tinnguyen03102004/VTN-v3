/**
 * VTN Architects - Grid View JavaScript
 * Gufram.it inspired tiled grid layout
 */

(function () {
    'use strict';

    // ============================================
    // STATE
    // ============================================
    let gridContainer = null;
    let gridScene = null;
    let gridCards = [];
    let isGridActive = false;

    // Project order (same as gallery.js) - expanded for grid testing
    const ORDER = [
        'house-for-trees',
        'stacking-green',
        'ha-long-villa',
        'vtn-office',
        'bamboo-wing',
        'kontum-indochine',
        'son-la-restaurant',
        'vedana-resort',
        // Demo projects for grid testing
        's-house',
        'binh-house',
        'thao-dien-house',
        'green-renovation',
        'dai-lai-bamboo',
        'binh-duong-school',
        'nocenco-cafe',
        'bamboo-pavilion',
        'wind-and-water-bar',
        'a-house',
        'farming-kindergarten',
        'naman-spa',
    ];


    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        createGridContainer();
        createGridCards();
        registerWithToggle();
        bindEvents();
    }

    // ============================================
    // CREATE GRID CONTAINER
    // ============================================
    function createGridContainer() {
        gridContainer = document.createElement('div');
        gridContainer.className = 'grid-container';

        gridScene = document.createElement('div');
        gridScene.className = 'grid-scene';

        gridContainer.appendChild(gridScene);
        document.body.appendChild(gridContainer);
    }

    // ============================================
    // REGISTER WITH VIEW TOGGLE
    // ============================================
    function registerWithToggle() {
        const waitForToggle = setInterval(() => {
            if (window.VTNViewToggle) {
                clearInterval(waitForToggle);
                VTNViewToggle.registerView({
                    id: 'grid',
                    label: 'Grid',
                    i18nKey: 'view.grid',
                    activate: activateGridView,
                    deactivate: deactivateGridView,
                    order: 3  // After List(0), 3D(2)
                });
            }
        }, 50);
        setTimeout(() => clearInterval(waitForToggle), 5000);
    }

    // ============================================
    // CREATE GRID CARDS
    // ============================================
    function createGridCards() {
        const data = getProjectsData();
        if (!data || !gridScene) return;

        gridScene.innerHTML = '';
        gridCards = [];

        ORDER.forEach((id, index) => {
            const project = data[id];
            if (!project) return;

            const card = createCard(id, project, index);
            gridScene.appendChild(card);
            gridCards.push({ element: card, id, project });
        });
    }

    function createCard(id, project, index) {
        const lang = getLang();
        const title = projectTitle(project, lang);
        const location = projectLocation(project, lang);

        const card = document.createElement('article');
        card.className = 'grid-card';
        card.dataset.category = project.category;
        card.dataset.id = id;
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <img class="grid-card__image" src="${project.image}" alt="${title}" loading="lazy" decoding="async">
            <div class="grid-card__title">
                <span class="grid-card__name">${title}</span>
                <span class="grid-card__location">${location}</span>
            </div>
        `;

        return card;
    }

    // ============================================
    // BIND EVENTS
    // ============================================
    function bindEvents() {
        // Card click - navigate to project
        gridScene.addEventListener('click', (e) => {
            const card = e.target.closest('.grid-card');
            if (!card) return;

            const projectId = card.dataset.id;
            if (!projectId) return;

            const currentLang = getLang();
            window.location.href = `project?id=${encodeURIComponent(projectId)}&lang=${currentLang}`;
        });

        // Category filter
        document.querySelectorAll('.cat-link[data-filter]').forEach(link => {
            link.addEventListener('click', () => {
                if (isGridActive) {
                    const filter = link.dataset.filter || 'all';
                    filterGridCards(filter);
                }
            });
        });

        // Logo click - reset filter
        const headerLogo = document.querySelector('.header-logo');
        if (headerLogo) {
            headerLogo.addEventListener('click', () => {
                if (isGridActive) {
                    filterGridCards('all');
                }
            });
        }

        // Language change
        document.addEventListener('vtn:lang', () => {
            updateGridCardTitles();
        });
    }

    // ============================================
    // FILTER GRID CARDS
    // ============================================
    function filterGridCards(category) {
        const isFiltering = category !== 'all';
        gridScene.classList.toggle('is-filtered', isFiltering);

        gridCards.forEach(({ element, project }) => {
            const matches = category === 'all' || project.category === category;

            if (matches) {
                element.classList.remove('filter-out');
                element.classList.add('filter-active');
            } else {
                element.classList.add('filter-out');
                element.classList.remove('filter-active');
            }
        });
    }

    // ============================================
    // ACTIVATE / DEACTIVATE GRID VIEW
    // ============================================
    function activateGridView() {
        if (isGridActive) return;
        isGridActive = true;

        // Deactivate other views
        document.body.classList.remove('space-view-active', 'view-3d-active', 'list-view-active');
        document.body.classList.add('view-grid-active');

        // Reset filter
        filterGridCards('all');

        // Scroll to top and update Lenis
        window.scrollTo(0, 0);
        if (window.vtnLenis) {
            window.vtnLenis.scrollTo(0, { immediate: true });
            setTimeout(() => window.vtnLenis.update(), 100);
        }

        // Re-trigger entrance animation
        gridCards.forEach(({ element }, index) => {
            element.style.animation = 'none';
            element.offsetHeight; // Force reflow
            element.style.animation = `gridFadeIn 0.5s ease forwards`;
            element.style.animationDelay = `${index * 0.05}s`;
        });
    }

    function deactivateGridView() {
        if (!isGridActive) return;
        isGridActive = false;

        document.body.classList.remove('view-grid-active');

        if (window.vtnLenis) {
            setTimeout(() => window.vtnLenis.update(), 100);
        }
    }

    // ============================================
    // UPDATE CARD TITLES (Language change)
    // ============================================
    function updateGridCardTitles() {
        const data = getProjectsData();
        if (!data) return;

        const lang = getLang();

        gridCards.forEach(({ element, id }) => {
            const project = data[id];
            if (!project) return;

            const title = projectTitle(project, lang);
            const location = projectLocation(project, lang);

            const nameEl = element.querySelector('.grid-card__name');
            const locEl = element.querySelector('.grid-card__location');
            const imgEl = element.querySelector('.grid-card__image');

            if (nameEl) nameEl.textContent = title;
            if (locEl) locEl.textContent = location;
            if (imgEl) imgEl.alt = title;
        });
    }

    // ============================================
    // UTILITIES
    // ============================================
    function getProjectsData() {
        if (typeof PROJECTS_DATA !== 'undefined') return PROJECTS_DATA;
        if (window.PROJECTS_DATA) return window.PROJECTS_DATA;
        return null;
    }

    function getLang() {
        return window.vtnGetLang ? window.vtnGetLang() : 'en';
    }

    function projectTitle(project, lang) {
        return lang === 'vi' ? (project.titleVi || project.title) : project.title;
    }

    function projectLocation(project, lang) {
        if (lang === 'vi') return project.locationFull || project.location || '';
        return project.locationFullEn || project.locationEn || project.locationFull || project.location || '';
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
