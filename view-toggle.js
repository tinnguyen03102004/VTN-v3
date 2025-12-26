/**
 * VTN Architects - View Toggle Module
 * Central hub for view switching - extensible architecture
 * 
 * Usage: VTNViewToggle.registerView({ id, label, i18nKey, activate, deactivate, isDefault })
 */
window.VTNViewToggle = (function () {
    'use strict';

    const registeredViews = [];
    let currentView = null;
    let toggleEl = null;
    let initialized = false;

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        if (initialized) return;
        createToggle();
        bindEvents();
        initialized = true;
    }

    // ============================================
    // CREATE TOGGLE ELEMENT
    // ============================================
    function createToggle() {
        toggleEl = document.createElement('div');
        toggleEl.className = 'view-toggle';
        document.body.appendChild(toggleEl);
    }

    // ============================================
    // REGISTER VIEW
    // Views call this to add themselves to toggle
    // ============================================
    function registerView(config) {
        // config = { id, label, i18nKey, activate, deactivate, isDefault, order }
        if (registeredViews.find(v => v.id === config.id)) {
            console.warn(`View "${config.id}" already registered`);
            return;
        }

        // Set default order based on registration order
        config.order = config.order ?? registeredViews.length;
        registeredViews.push(config);

        // Re-sort and rebuild buttons
        registeredViews.sort((a, b) => a.order - b.order);
        rebuildButtons();

        // Activate default view
        if (config.isDefault && !currentView) {
            setTimeout(() => switchTo(config.id), 100);
        }
    }

    // ============================================
    // REBUILD BUTTONS (after sorting)
    // ============================================
    function rebuildButtons() {
        if (!toggleEl) return;
        toggleEl.innerHTML = '';

        // Add sliding indicator
        const indicator = document.createElement('div');
        indicator.className = 'view-toggle__indicator';
        toggleEl.appendChild(indicator);

        registeredViews.forEach(config => {
            const btn = document.createElement('button');
            btn.className = 'view-toggle__btn';
            btn.dataset.view = config.id;
            if (config.i18nKey) btn.dataset.i18n = config.i18nKey;
            btn.textContent = config.label;

            if (config.id === currentView) {
                btn.classList.add('active');
            }

            toggleEl.appendChild(btn);
        });

        // Apply i18n if available
        if (window.vtnApplyI18n) {
            setTimeout(() => {
                window.vtnApplyI18n(toggleEl);
                // Position indicator after i18n might have changed text size
                setTimeout(updateButtons, 100);
            }, 50);
        } else {
            setTimeout(updateButtons, 50);
        }
    }

    // ============================================
    // SWITCH VIEW
    // ============================================
    function switchTo(viewId) {
        if (viewId === currentView) return;

        const next = registeredViews.find(v => v.id === viewId);
        if (!next) {
            console.warn(`View "${viewId}" not registered`);
            return;
        }

        // Deactivate current view
        const current = registeredViews.find(v => v.id === currentView);
        if (current?.deactivate) {
            try {
                current.deactivate();
            } catch (e) {
                console.error(`Error deactivating ${currentView}:`, e);
            }
        }

        // Activate new view
        if (next.activate) {
            try {
                next.activate();
            } catch (e) {
                console.error(`Error activating ${viewId}:`, e);
            }
        }

        currentView = viewId;
        updateButtons();

        // Dispatch custom event for external listeners
        document.dispatchEvent(new CustomEvent('vtn:view-change', {
            detail: { view: viewId, previousView: current?.id }
        }));
    }

    // ============================================
    // UPDATE BUTTON STATES & INDICATOR
    // ============================================
    function updateButtons() {
        if (!toggleEl) return;

        const buttons = toggleEl.querySelectorAll('.view-toggle__btn');
        const indicator = toggleEl.querySelector('.view-toggle__indicator');
        let activeBtn = null;

        buttons.forEach(btn => {
            const isActive = btn.dataset.view === currentView;
            btn.classList.toggle('active', isActive);
            if (isActive) activeBtn = btn;
        });

        if (activeBtn && indicator) {
            // Calculate position relative to container
            const containerRect = toggleEl.getBoundingClientRect();
            const btnRect = activeBtn.getBoundingClientRect();

            const left = btnRect.left - containerRect.left;
            const width = btnRect.width;

            indicator.style.transform = `translateX(${left}px)`;
            indicator.style.width = `${width}px`;
        }
    }

    // ============================================
    // BIND EVENTS
    // ============================================
    function bindEvents() {
        document.addEventListener('click', e => {
            const btn = e.target.closest('.view-toggle__btn');
            if (btn && btn.dataset.view) {
                switchTo(btn.dataset.view);
            }
        });

        window.addEventListener('resize', () => {
            updateButtons();
        });
    }

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        init,
        registerView,
        switchTo,
        getCurrentView: () => currentView,
        getRegisteredViews: () => [...registeredViews]
    };
})();

// Auto-init on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VTNViewToggle.init());
} else {
    VTNViewToggle.init();
}
