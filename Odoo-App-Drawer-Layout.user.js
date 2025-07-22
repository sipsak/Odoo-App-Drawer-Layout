// ==UserScript==
// @name            Odoo App Drawer Layout
// @name:tr         Odoo Uygulama Çekmecesi Yerleşim Düzeni
// @namespace       https://github.com/sipsak
// @version         1.2
// @description     Allows you to change the number of icons that are displayed 6 side by side by default on the Odoo home screen
// @description:tr  Odoo ana ekranında varsayılan olarak yan yana 6 tane gösterilen ikon sayısını değiştirmenize yarar
// @author          Burak Şipşak
// @match           https://portal.bskhvac.com.tr/*
// @match           https://*.odoo.com/*
// @grant           GM_registerMenuCommand
// @grant           GM_getValue
// @grant           GM_setValue
// @icon            https://raw.githubusercontent.com/sipsak/odoo-image-enlarger/refs/heads/main/icon.png
// @updateURL       https://raw.githubusercontent.com/sipsak/Odoo-App-Drawer-Layout/main/Odoo-App-Drawer-Layout.user.js
// @downloadURL     https://raw.githubusercontent.com/sipsak/Odoo-App-Drawer-Layout/main/Odoo-App-Drawer-Layout.user.js
// ==/UserScript==

(function () {
    'use strict';

    const DEFAULT_ICON_COUNT = 6;
    const DEFAULT_ICON_SIZE = 70;
    const DEFAULT_ICON_RADIUS = 0.375;

    const MIN_ICON_COUNT = 4;
    const MAX_ICON_COUNT = 15;
    const MIN_ICON_SIZE = 60;
    const MAX_ICON_SIZE = 110;
    const MIN_ICON_RADIUS = 0.0;
    const MAX_ICON_RADIUS = 2;

    const styleElementId = 'odoo-app-drawer-style';
    const sliderModalId = 'odoo-app-drawer-modal';

    function getSetting(key, fallback) {
        let value = GM_getValue(key, fallback);
        if (typeof fallback === 'number') value = parseFloat(value);
        return isNaN(value) ? fallback : value;
    }

    function applyPreviewStyles(iconCount, iconSize, iconRadius) {
        let style = document.getElementById(styleElementId);
        const widthPercent = (100 / iconCount).toFixed(8) + '%';
        const spacingCount = iconCount - 1;

        // 1. adım: Temel max-width hesabı (icon count'a göre)
        const baseMaxWidthPx = iconCount * 75 + spacingCount * 80;

        // 2. adım: Simge boyutu ayarlaması (70px sıfır noktası)
        const sizeAdjustment = (iconSize - DEFAULT_ICON_SIZE) * 8;

        // Final max-width değeri
        const maxWidthPx = baseMaxWidthPx + sizeAdjustment;

        const css = `
            @media (min-width: 768px) {
                .o_home_menu .row-cols-6 > *,
                .o_home_menu .row-cols-sm-6 > *,
                .o_home_menu .row-cols-md-6 > *,
                .o_home_menu .row-cols-lg-6 > *,
                .o_home_menu .row-cols-xl-6 > *,
                .o_home_menu .row-cols-xxl-6 > *,
                .o_home_menu .col-2,
                .o_home_menu .col-sm-2,
                .o_home_menu .col-md-2,
                .o_home_menu .col-lg-2,
                .o_home_menu .col-xl-2,
                .o_home_menu .col-xxl-2 {
                    width: ${widthPercent} !important;
                    flex: 0 0 auto !important;
                }

                .o_home_menu .offset-2,
                .o_home_menu .offset-sm-2,
                .o_home_menu .offset-md-2,
                .o_home_menu .offset-lg-2,
                .o_home_menu .offset-xl-2,
                .o_home_menu .offset-xxl-2 {
                    margin-left: ${widthPercent} !important;
                }

                .o_home_menu .container,
                .o_home_menu .o_container_small {
                    max-width: ${maxWidthPx}px !important;
                }

                .o_home_menu .o_app .o_app_icon {
                    width: ${iconSize}px !important;
                    border-radius: ${iconRadius}rem !important;
                }
            }
        `;

        if (style) {
            style.textContent = css;
        } else {
            style = document.createElement('style');
            style.id = styleElementId;
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    function applyCustomStyles() {
        applyPreviewStyles(
            getSetting('iconCount', DEFAULT_ICON_COUNT),
            getSetting('iconSize', DEFAULT_ICON_SIZE),
            getSetting('iconRadius', DEFAULT_ICON_RADIUS)
        );
    }

    function createSlider(id, label, min, max, current, step = 1, unit = '', decimalPlaces = 0, defaultValue) {
        const valueFormatted = decimalPlaces === 0
            ? current
            : parseFloat(current).toFixed(decimalPlaces);

        return `
            <div class="mb-3">
                <label for="${id}" class="form-label d-flex justify-content-between align-items-center">
                    <span>${label}: <strong id="${id}Value">${valueFormatted}${unit}</strong></span>
                    <button type="button" class="btn btn-sm btn-light px-2 py-0" data-reset="${id}" title="Varsayılana sıfırla">
                        &#x21bb;
                    </button>
                </label>
                <input type="range"
                       class="form-range"
                       id="${id}"
                       min="${min}"
                       max="${max}"
                       step="${step}"
                       value="${current}">
                <div class="d-flex justify-content-between text-muted small mt-1">
                    <span>${min}${unit}</span>
                    <span>${max}${unit}</span>
                </div>
            </div>
        `;
    }

    function createSliderModal() {
        const oldModal = document.getElementById(sliderModalId);
        if (oldModal) oldModal.remove();

        const currentIconCount = getSetting('iconCount', DEFAULT_ICON_COUNT);
        const currentIconSize = getSetting('iconSize', DEFAULT_ICON_SIZE);
        const currentIconRadius = getSetting('iconRadius', DEFAULT_ICON_RADIUS);

        const modalWrapper = document.createElement('div');
        modalWrapper.id = sliderModalId;
        modalWrapper.className = 'modal fade show';
        modalWrapper.setAttribute('tabindex', '-1');
        modalWrapper.setAttribute('role', 'dialog');
        modalWrapper.style.cssText = `
            display: block;
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
            inset: 0;
            z-index: 1050;
        `;

        modalWrapper.innerHTML = `
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <header class="modal-header">
                        <h4 class="modal-title text-break">Görünüm Ayarları</h4>
                        <button type="button" class="btn-close" aria-label="Close"></button>
                    </header>
                    <main class="modal-body">
                        ${createSlider('iconCountSlider', 'Yan yana simge sayısı', MIN_ICON_COUNT, MAX_ICON_COUNT, currentIconCount, 1, '', 0, DEFAULT_ICON_COUNT)}
                        ${createSlider('iconSizeSlider', 'Simge boyutu', MIN_ICON_SIZE, MAX_ICON_SIZE, currentIconSize, 1, 'px', 0, DEFAULT_ICON_SIZE)}
                        ${createSlider('iconRadiusSlider', 'Köşe yuvarlatma', MIN_ICON_RADIUS, MAX_ICON_RADIUS, currentIconRadius, 0.005, 'rem', 3, DEFAULT_ICON_RADIUS)}
                    </main>
                    <footer class="modal-footer justify-content-start">
                        <button id="sliderOkBtn" class="btn btn-primary me-2">Tamam</button>
                        <button id="sliderResetAllBtn" class="btn btn-info me-2">Tümünü sıfırla</button>
                        <button id="sliderCancelBtn" class="btn btn-secondary">İptal</button>
                    </footer>
                </div>
            </div>
        `;

        document.body.appendChild(modalWrapper);

        const modal = document.getElementById(sliderModalId);
        const sliders = {
            iconCount: document.getElementById('iconCountSlider'),
            iconSize: document.getElementById('iconSizeSlider'),
            iconRadius: document.getElementById('iconRadiusSlider')
        };
        const labels = {
            iconCount: document.getElementById('iconCountSliderValue'),
            iconSize: document.getElementById('iconSizeSliderValue'),
            iconRadius: document.getElementById('iconRadiusSliderValue')
        };

        function updatePreview() {
            labels.iconCount.textContent = sliders.iconCount.value;
            labels.iconSize.textContent = sliders.iconSize.value + 'px';
            labels.iconRadius.textContent = parseFloat(sliders.iconRadius.value).toFixed(3) + 'rem';

            applyPreviewStyles(
                parseInt(sliders.iconCount.value),
                parseInt(sliders.iconSize.value),
                parseFloat(sliders.iconRadius.value)
            );
        }

        Object.values(sliders).forEach(slider => {
            slider.addEventListener('input', updatePreview);
        });

        modal.querySelectorAll('[data-reset]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-reset');
                const slider = document.getElementById(id);
                if (id === 'iconCountSlider') slider.value = DEFAULT_ICON_COUNT;
                if (id === 'iconSizeSlider') slider.value = DEFAULT_ICON_SIZE;
                if (id === 'iconRadiusSlider') slider.value = DEFAULT_ICON_RADIUS;
                updatePreview();
            });
        });

        function resetAllSliders() {
            sliders.iconCount.value = DEFAULT_ICON_COUNT;
            sliders.iconSize.value = DEFAULT_ICON_SIZE;
            sliders.iconRadius.value = DEFAULT_ICON_RADIUS;
            updatePreview();
        }

        document.getElementById('sliderResetAllBtn').addEventListener('click', resetAllSliders);

        document.getElementById('sliderOkBtn').addEventListener('click', () => {
            GM_setValue('iconCount', parseInt(sliders.iconCount.value));
            GM_setValue('iconSize', parseInt(sliders.iconSize.value));
            GM_setValue('iconRadius', parseFloat(sliders.iconRadius.value));
            applyCustomStyles();
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        });

        document.getElementById('sliderCancelBtn').addEventListener('click', closeModal);
        modal.querySelector('.btn-close').addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

        function closeModal() {
            applyCustomStyles();
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }

        function escHandler(e) {
            if (e.key === 'Escape') closeModal();
        }

        document.addEventListener('keydown', escHandler);
        updatePreview();
    }

    function showSliderModal() {
        createSliderModal();
    }

    GM_registerMenuCommand("Sıra sayısını ayarla", showSliderModal);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyCustomStyles);
    } else {
        applyCustomStyles();
    }
})();
