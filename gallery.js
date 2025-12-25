/**
 * VTN Architects - Gallery JavaScript
 * Category filtering and navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.cat-link[data-filter]');
    const projectStack = document.getElementById('projectStack');



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
    window.vtnLenis = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ============================================
    // PROJECT LIST (from projects-data.js)
    // ============================================
    const ORDER = [
        'house-for-trees',
        'stacking-green',
        'ha-long-villa',
        'vtn-office',
        'bamboo-wing',
        'kontum-indochine',
        'son-la-restaurant',
        'vedana-resort',
    ];

    function getLang() {
        return window.vtnGetLang ? window.vtnGetLang() : 'vi';
    }

    function projectTitle(project, lang) {
        return lang === 'vi' ? (project.titleVi || project.title) : project.title;
    }

    function projectLocation(project, lang) {
        if (lang === 'vi') return project.locationFull || project.location || '';
        return project.locationFullEn || project.locationEn || project.locationFull || project.location || '';
    }

    function displayYear(project) {
        const year = (project.year || '').trim();
        if (!year) return '';
        const parts = year.split('/');
        return parts[parts.length - 1] || year;
    }

    function getProjectsData() {
        if (typeof PROJECTS_DATA !== 'undefined') return PROJECTS_DATA;
        if (window.PROJECTS_DATA) return window.PROJECTS_DATA;
        return null;
    }

    function renderProjectStack() {
        const data = getProjectsData();
        if (!projectStack || !data) return;

        projectStack.innerHTML = ORDER.map((id) => {
            const project = data[id];
            if (!project) return '';

            return `
                <article class="project-row" data-category="${project.category}" data-id="${id}">
                    <div class="project-info">
                        <h2 class="project-name"></h2>
                        <p class="project-location"></p>
                        <span class="project-year"></span>
                    </div>
                    <div class="project-image">
                        <img src="${project.image}" alt="" loading="lazy" decoding="async">
                    </div>
                </article>
            `;
        }).join('');

        updateProjectTexts(getLang());
        setTimeout(() => lenis.update(), 50);
    }

    function updateProjectTexts(lang) {
        const data = getProjectsData();
        if (!data) return;

        document.querySelectorAll('.project-row').forEach((row) => {
            const id = row.dataset.id;
            const project = data[id];
            if (!project) return;

            const title = projectTitle(project, lang);
            const loc = projectLocation(project, lang);
            const yr = displayYear(project);

            const titleEl = row.querySelector('.project-name');
            const locEl = row.querySelector('.project-location');
            const yearEl = row.querySelector('.project-year');
            const imgEl = row.querySelector('img');

            if (titleEl) titleEl.textContent = title;
            if (locEl) locEl.textContent = loc;
            if (yearEl) yearEl.textContent = yr;
            if (imgEl) imgEl.alt = title;
        });
    }

    renderProjectStack();

    // ============================================
    // CATEGORY FILTERING
    // ============================================
    let activeCategory = 'all';
    const headerLogo = document.querySelector('.header-logo');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter || 'all';
            setActiveFilter(filter);
        });
    });

    if (headerLogo) {
        headerLogo.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveFilter('all');
            if (window.history && window.history.replaceState) {
                const url = new URL(window.location.href);
                url.searchParams.delete('filter');
                window.history.replaceState({}, '', url.toString());
            }
        });
    }

    function setActiveFilter(category) {
        activeCategory = category;
        categoryLinks.forEach(l => l.classList.toggle('active', l.dataset.filter === category));
        filterProjects(category);
    }

    function filterProjects(category) {
        const rows = document.querySelectorAll('.project-row');

        rows.forEach((row, index) => {
            const rowCategory = row.dataset.category;
            const shouldShow = category === 'all' || rowCategory === category;

            if (shouldShow) {
                row.classList.remove('filter-out', 'hidden');

                setTimeout(() => {
                    row.classList.add('filter-in');
                }, index * 50);

                setTimeout(() => {
                    row.classList.remove('filter-in');
                }, 500 + index * 50);
            } else {
                row.classList.add('filter-out');
                setTimeout(() => {
                    row.classList.add('hidden');
                    row.classList.remove('filter-out');
                }, 400);
            }
        });

        setTimeout(() => lenis.update(), 500);
    }

    // Apply initial filter from URL (?filter=green|bamboo) or default to green
    const params = new URLSearchParams(window.location.search);
    const initialFilter = params.get('filter');
    if (initialFilter) {
        const initialLink = Array.from(categoryLinks).find(l => l.dataset.filter === initialFilter);
        if (initialLink) setActiveFilter(initialFilter);
    } else {
        setActiveFilter('all');
    }

    // ============================================
    // MENU OVERLAY LOGIC (Toggle & Click Outside)
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOverlay.classList.toggle('is-active');
        });
    }

    document.addEventListener('click', (e) => {
        if (menuOverlay && menuOverlay.classList.contains('is-active')) {
            if (!menuOverlay.contains(e.target) && !menuToggle.contains(e.target)) {
                menuOverlay.classList.remove('is-active');
            }
        }
    });

    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('is-active');
        });
    });

    // ============================================
    // CLICK-TO-NAVIGATE (Project Rows only)
    // Space-cards and flying-cards use default <a> href
    // ============================================
    let isNavigating = false;

    document.body.addEventListener('click', (e) => {
        // Only handle project-row clicks (list view)
        const row = e.target.closest('.project-row');
        if (!row || isNavigating) return;

        const projectId = row.dataset.id;
        if (!projectId) return;

        // Prevent default and navigate with correct params
        e.preventDefault();
        isNavigating = true;

        const currentLang = getLang();
        // Use clean URL format (without .html) to preserve query params during server redirects
        window.location.href = `project?id=${encodeURIComponent(projectId)}&lang=${currentLang}`;
    });





    // ============================================
    // LANGUAGE CHANGES
    // ============================================
    document.addEventListener('vtn:lang', (e) => {
        updateProjectTexts(e.detail.lang);
        filterProjects(activeCategory);
    });

    // ============================================
    // REGISTER WITH VIEW TOGGLE
    // ============================================
    function activateListView() {
        document.body.classList.remove('view-3d-active', 'view-grid-active', 'space-view-active');
        projectStack.style.opacity = '1';
        projectStack.style.visibility = 'visible';
        projectStack.style.pointerEvents = 'auto';
        setTimeout(() => lenis.update(), 100);
    }

    function deactivateListView() {
        // List is deactivated when other views take over
        projectStack.style.opacity = '0';
        projectStack.style.visibility = 'hidden';
        projectStack.style.pointerEvents = 'none';
    }

    // Register with toggle
    const waitForToggle = setInterval(() => {
        if (window.VTNViewToggle) {
            clearInterval(waitForToggle);
            VTNViewToggle.registerView({
                id: 'list',
                label: 'List',
                i18nKey: 'view.list',
                activate: activateListView,
                deactivate: deactivateListView,
                order: 0  // First in toggle
            });
        }
    }, 50);
    setTimeout(() => clearInterval(waitForToggle), 5000);
});
