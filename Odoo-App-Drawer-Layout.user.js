// ==UserScript==
// @name            Odoo App Drawer Layout
// @name:tr         Odoo Uygulama Çekmecesi Yerleşim Düzeni
// @namespace       https://github.com/sipsak
// @version         1.5
// @description     Allows you to customize the layout of icons on the Odoo home screen
// @description:tr  Odoo ana ekrandaki simgelerin düzenini değiştirmenizi sağlar
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
    const DEFAULT_ICON_RADIUS = (6 / 35) * 100;
    const DEFAULT_TOP_MARGIN = 48;
    const DEFAULT_ICON_SPACING = 10;
    const DEFAULT_ICON_MARGIN = 16;
    const DEFAULT_FIT_TO_SCREEN_WIDTH = false;

    const MIN_ICON_COUNT = 4;
    const MAX_ICON_COUNT = 15;
    const MIN_ICON_SIZE = 60;
    const MAX_ICON_SIZE = 128;
    const MIN_ICON_RADIUS = 0;
    const MAX_ICON_RADIUS = 100;
    const MIN_TOP_MARGIN = 0;
    const MAX_TOP_MARGIN = 96;
    const MIN_ICON_SPACING = 5;
    const MAX_ICON_SPACING = 20;
    const MIN_ICON_MARGIN = 0;
    const MAX_ICON_MARGIN = 64;

    const styleElementId = 'odoo-app-drawer-style';
    const sliderModalId = 'odoo-app-drawer-modal';

    function getSetting(key, fallback) {
        let value = GM_getValue(key, fallback);
        if (typeof fallback === 'number' && !isNaN(parseFloat(value))) {
            value = parseFloat(value);
        } else if (typeof fallback === 'boolean') {
            value = (value === 'true' || value === true);
        }
        return isNaN(value) && typeof fallback === 'number' ? fallback : value;
    }

    function applyPreviewStyles(iconCount, iconSize, iconRadius, topMargin, iconSpacing, fitToScreenWidth, iconMargin) {
        let style = document.getElementById(styleElementId);
        const widthPercent = (100 / iconCount).toFixed(8) + '%';
        const borderRadiusInPx = (iconSize / 2) * (iconRadius / 100);

        let maxWidthCss = '';
        if (fitToScreenWidth) {
            maxWidthCss = `max-width: ${window.innerWidth - 40}px !important;`;
        } else {
            const spacingCount = iconCount - 1;
            const baseMaxWidthPx = iconCount * 75 + spacingCount * 80;
            const sizeAdjustment = (iconSize - DEFAULT_ICON_SIZE) * 8;
            const maxWidthPx = baseMaxWidthPx + sizeAdjustment;
            maxWidthCss = `max-width: ${maxWidthPx}px !important;`;
        }

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
                    ${maxWidthCss}
                }

                .o_home_menu .o_app .o_app_icon {
                    width: ${iconSize}px !important;
                    height: ${iconSize}px !important;
                    border-radius: ${borderRadiusInPx}px !important;
                    padding: ${iconSpacing}px !important;
                }
                .o_home_menu .mb-3 {
                    margin-bottom: ${iconMargin}px !important;
                }
            }

            .mt-5 {
                margin-top: ${topMargin}px !important;
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
            getSetting('iconRadius', DEFAULT_ICON_RADIUS),
            getSetting('topMargin', DEFAULT_TOP_MARGIN),
            getSetting('iconSpacing', DEFAULT_ICON_SPACING),
            getSetting('fitToScreenWidth', DEFAULT_FIT_TO_SCREEN_WIDTH),
            getSetting('iconMargin', DEFAULT_ICON_MARGIN)
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
                    <button type="button" class="btn btn-sm btn-light px-2 py-0" data-reset="${id}" data-default="${defaultValue}" title="Varsayılana sıfırla">
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
        const currentTopMargin = getSetting('topMargin', DEFAULT_TOP_MARGIN);
        const currentIconSpacing = getSetting('iconSpacing', DEFAULT_ICON_SPACING);
        const currentIconMargin = getSetting('iconMargin', DEFAULT_ICON_MARGIN);
        const currentFitToScreenWidth = getSetting('fitToScreenWidth', DEFAULT_FIT_TO_SCREEN_WIDTH);

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
                        ${createSlider('iconCountSlider', 'Sütun sayısı', MIN_ICON_COUNT, MAX_ICON_COUNT, currentIconCount, 1, '', 0, DEFAULT_ICON_COUNT)}
                        ${createSlider('iconSizeSlider', 'Simge boyutu', MIN_ICON_SIZE, MAX_ICON_SIZE, currentIconSize, 1, 'px', 0, DEFAULT_ICON_SIZE)}
                        ${createSlider('iconSpacingSlider', 'Simge içi boşluk', MIN_ICON_SPACING, MAX_ICON_SPACING, currentIconSpacing, 1, 'px', 0, DEFAULT_ICON_SPACING)}
                        ${createSlider('iconMarginSlider', 'Simgeler arası boşluk', MIN_ICON_MARGIN, MAX_ICON_MARGIN, currentIconMargin, 1, 'px', 0, DEFAULT_ICON_MARGIN)}
                        ${createSlider('iconRadiusSlider', 'Köşe yuvarlatma', MIN_ICON_RADIUS, MAX_ICON_RADIUS, currentIconRadius, 1, '%', 0, DEFAULT_ICON_RADIUS)}
                        ${createSlider('topMarginSlider', 'Üst boşluk', MIN_TOP_MARGIN, MAX_TOP_MARGIN, currentTopMargin, 1, 'px', 0, DEFAULT_TOP_MARGIN)}

                        <div class="form-check mt-3">
                            <input class="form-check-input" type="checkbox" id="fitToScreenWidthCheckbox" ${currentFitToScreenWidth ? 'checked' : ''}>
                            <label class="form-check-label" for="fitToScreenWidthCheckbox">
                                Ekran genişliğine sığdır
                            </label>
                        </div>
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
            iconSpacing: document.getElementById('iconSpacingSlider'),
            iconMargin: document.getElementById('iconMarginSlider'),
            iconRadius: document.getElementById('iconRadiusSlider'),
            topMargin: document.getElementById('topMarginSlider')
        };
        const labels = {
            iconCount: document.getElementById('iconCountSliderValue'),
            iconSize: document.getElementById('iconSizeSliderValue'),
            iconSpacing: document.getElementById('iconSpacingSliderValue'),
            iconMargin: document.getElementById('iconMarginSliderValue'),
            iconRadius: document.getElementById('iconRadiusSliderValue'),
            topMargin: document.getElementById('topMarginSliderValue')
        };
        const fitToScreenWidthCheckbox = document.getElementById('fitToScreenWidthCheckbox');

        function updatePreview() {
            labels.iconCount.textContent = sliders.iconCount.value;
            labels.iconSize.textContent = sliders.iconSize.value + 'px';
            labels.iconSpacing.textContent = sliders.iconSpacing.value + 'px';
            labels.iconMargin.textContent = sliders.iconMargin.value + 'px';
            labels.iconRadius.textContent = sliders.iconRadius.value + '%';
            labels.topMargin.textContent = sliders.topMargin.value + 'px';

            applyPreviewStyles(
                parseInt(sliders.iconCount.value),
                parseInt(sliders.iconSize.value),
                parseFloat(sliders.iconRadius.value),
                parseInt(sliders.topMargin.value),
                parseInt(sliders.iconSpacing.value),
                fitToScreenWidthCheckbox.checked,
                parseInt(sliders.iconMargin.value)
            );
        }

        Object.values(sliders).forEach(slider => {
            slider.addEventListener('input', updatePreview);
        });

        fitToScreenWidthCheckbox.addEventListener('change', updatePreview);

        modal.querySelectorAll('[data-reset]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-reset');
                const defaultValue = btn.getAttribute('data-default');
                const slider = document.getElementById(id);
                slider.value = defaultValue;
                updatePreview();
            });
        });

        function resetAllSliders() {
            sliders.iconCount.value = DEFAULT_ICON_COUNT;
            sliders.iconSize.value = DEFAULT_ICON_SIZE;
            sliders.iconSpacing.value = DEFAULT_ICON_SPACING;
            sliders.iconMargin.value = DEFAULT_ICON_MARGIN;
            sliders.iconRadius.value = DEFAULT_ICON_RADIUS;
            sliders.topMargin.value = DEFAULT_TOP_MARGIN;
            fitToScreenWidthCheckbox.checked = DEFAULT_FIT_TO_SCREEN_WIDTH;
            updatePreview();
        }

        document.getElementById('sliderResetAllBtn').addEventListener('click', resetAllSliders);

        document.getElementById('sliderOkBtn').addEventListener('click', () => {
            GM_setValue('iconCount', parseInt(sliders.iconCount.value));
            GM_setValue('iconSize', parseInt(sliders.iconSize.value));
            GM_setValue('iconSpacing', parseInt(sliders.iconSpacing.value));
            GM_setValue('iconMargin', parseInt(sliders.iconMargin.value));
            GM_setValue('iconRadius', parseFloat(sliders.iconRadius.value));
            GM_setValue('topMargin', parseInt(sliders.topMargin.value));
            GM_setValue('fitToScreenWidth', fitToScreenWidthCheckbox.checked);

            applyCustomStyles();
            modal.remove();
            document.removeEventListener('keydown', escHandler);
            window.removeEventListener('resize', applyCustomStyles);
        });

        document.getElementById('sliderCancelBtn').addEventListener('click', closeModal);
        modal.querySelector('.btn-close').addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

        function closeModal() {
            applyCustomStyles();
            modal.remove();
            document.removeEventListener('keydown', escHandler);
            window.removeEventListener('resize', applyCustomStyles);
        }

        function escHandler(e) {
            if (e.key === 'Escape') closeModal();
        }

        document.addEventListener('keydown', escHandler);
        window.addEventListener('resize', updatePreview);
        updatePreview();
    }

    function showSliderModal() {
        createSliderModal();
    }

    GM_registerMenuCommand("Görünüm Ayarları", showSliderModal);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applyCustomStyles();
            window.addEventListener('resize', applyCustomStyles);
        });
    } else {
        applyCustomStyles();
        window.addEventListener('resize', applyCustomStyles);
    }
})();
