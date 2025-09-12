// ==UserScript==
// @name            Odoo App Drawer Layout
// @name:tr         Odoo Uygulama Çekmecesi Yerleşim Düzeni
// @namespace       https://github.com/sipsak
// @version         1.6
// @description     Allows you to customize the layout of icons on the Odoo home screen
// @description:tr  Odoo ana ekrandaki simgelerin düzenini değiştirmenizi sağlar
// @author          Burak Şipşak
// @match           https://portal.bskhvac.com.tr/*
// @match           https://*.odoo.com/*
// @grant           GM_registerMenuCommand
// @grant           GM_getValue
// @grant           GM_setValue
// @icon            data:image/png;base64,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
// @updateURL       https://raw.githubusercontent.com/sipsak/Odoo-App-Drawer-Layout/main/Odoo-App-Drawer-Layout.user.js
// @downloadURL     https://raw.githubusercontent.com/sipsak/Odoo-App-Drawer-Layout/main/Odoo-App-Drawer-Layout.user.js
// ==/UserScript==

(function () {
    'use strict';

    const DEFAULT_ICON_COUNT = 6;
    const DEFAULT_ICON_SIZE = 70;
    const DEFAULT_ICON_RADIUS = 17.1428571;
    const DEFAULT_TOP_MARGIN = 48;
    const DEFAULT_ICON_SPACING = 10;
    const DEFAULT_ICON_MARGIN = 16;
    const DEFAULT_FONT_SIZE_MULTIPLIER = 100;
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
    const MIN_FONT_SIZE_MULTIPLIER = 75;
    const MAX_FONT_SIZE_MULTIPLIER = 250;

    const UNDO_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>`;

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

    function applyPreviewStyles(iconCount, iconSize, iconRadius, topMargin, iconSpacing, fitToScreenWidth, iconMargin, fontSizeMultiplier) {
        let style = document.getElementById(styleElementId);
        const widthPercent = (100 / iconCount).toFixed(8) + '%';
        const borderRadiusInPx = (iconSize / 2) * (iconRadius / 100);
        const baseFontSize = (iconSize * (0.875 / 70));
        const finalFontSize = baseFontSize * (fontSizeMultiplier / 100);

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
                .o_home_menu { font-size: ${finalFontSize}rem !important; }
                .o_home_menu .row-cols-6 > *, .o_home_menu .row-cols-sm-6 > *, .o_home_menu .row-cols-md-6 > *, .o_home_menu .row-cols-lg-6 > *, .o_home_menu .row-cols-xl-6 > *, .o_home_menu .row-cols-xxl-6 > *, .o_home_menu .col-2, .o_home_menu .col-sm-2, .o_home_menu .col-md-2, .o_home_menu .col-lg-2, .o_home_menu .col-xl-2, .o_home_menu .col-xxl-2 { width: ${widthPercent} !important; flex: 0 0 auto !important; }
                .o_home_menu .offset-2, .o_home_menu .offset-sm-2, .o_home_menu .offset-md-2, .o_home_menu .offset-lg-2, .o_home_menu .offset-xl-2, .o_home_menu .offset-xxl-2 { margin-left: ${widthPercent} !important; }
                .o_home_menu .container, .o_home_menu .o_container_small { ${maxWidthCss} }
                .o_home_menu .o_app .o_app_icon { width: ${iconSize}px !important; height: ${iconSize}px !important; border-radius: ${borderRadiusInPx}px !important; padding: ${iconSpacing}px !important; }
                .o_home_menu .mb-3 { margin-bottom: ${iconMargin}px !important; }
            }
            .mt-5 { margin-top: ${topMargin}px !important; }
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
            getSetting('iconCount', DEFAULT_ICON_COUNT), getSetting('iconSize', DEFAULT_ICON_SIZE), getSetting('iconRadius', DEFAULT_ICON_RADIUS), getSetting('topMargin', DEFAULT_TOP_MARGIN), getSetting('iconSpacing', DEFAULT_ICON_SPACING), getSetting('fitToScreenWidth', DEFAULT_FIT_TO_SCREEN_WIDTH), getSetting('iconMargin', DEFAULT_ICON_MARGIN), getSetting('fontSizeMultiplier', DEFAULT_FONT_SIZE_MULTIPLIER)
        );
    }

    function createSlider(id, label, min, max, current, step = 1, unit = '', decimalPlaces = 0, defaultValue) {
        const valueFormatted = decimalPlaces === 0 ? Math.round(current) : parseFloat(current).toFixed(decimalPlaces);
        return `
            <div class="mb-3">
                <label for="${id}" class="form-label d-flex justify-content-between align-items-center">
                    <span>${label}: <strong id="${id}Value">${valueFormatted}${unit}</strong></span>
                    <span id="${id}Actions">
                        <button type="button" class="btn btn-sm btn-light px-2 py-0" data-undo-single="${id}" title="Değişikliği geri al" style="display: none;">${UNDO_ICON_SVG}</button>
                        <button type="button" class="btn btn-sm btn-light px-2 py-0" data-reset-single="${id}" data-default-value="${defaultValue}" title="Varsayılana sıfırla" style="display: none;">Sıfırla</button>
                    </span>
                </label>
                <input type="range" class="form-range" id="${id}" min="${min}" max="${max}" step="${step}" value="${current}">
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

        const initialSettings = {
            iconCount: getSetting('iconCount', DEFAULT_ICON_COUNT), iconSize: getSetting('iconSize', DEFAULT_ICON_SIZE), fontSizeMultiplier: getSetting('fontSizeMultiplier', DEFAULT_FONT_SIZE_MULTIPLIER), iconSpacing: getSetting('iconSpacing', DEFAULT_ICON_SPACING), iconMargin: getSetting('iconMargin', DEFAULT_ICON_MARGIN), iconRadius: getSetting('iconRadius', DEFAULT_ICON_RADIUS), topMargin: getSetting('topMargin', DEFAULT_TOP_MARGIN), fitToScreenWidth: getSetting('fitToScreenWidth', DEFAULT_FIT_TO_SCREEN_WIDTH)
        };
        const defaultSettings = {
            iconCount: DEFAULT_ICON_COUNT, iconSize: DEFAULT_ICON_SIZE, fontSizeMultiplier: DEFAULT_FONT_SIZE_MULTIPLIER, iconSpacing: DEFAULT_ICON_SPACING, iconMargin: DEFAULT_ICON_MARGIN, iconRadius: DEFAULT_ICON_RADIUS, topMargin: DEFAULT_TOP_MARGIN, fitToScreenWidth: DEFAULT_FIT_TO_SCREEN_WIDTH
        };

        const modalWrapper = document.createElement('div');
        modalWrapper.id = sliderModalId;
        modalWrapper.className = 'modal fade show';
        modalWrapper.setAttribute('tabindex', '-1');
        modalWrapper.style.cssText = `display: block; background-color: rgba(0, 0, 0, 0.5); position: fixed; inset: 0; z-index: 1050;`;

        modalWrapper.innerHTML = `
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content">
                    <header class="modal-header">
                        <h4 class="modal-title text-break">Görünüm Ayarları</h4>
                        <button type="button" class="btn-close" aria-label="Close"></button>
                    </header>
                    <main class="modal-body">
                        ${createSlider('iconCountSlider', 'Sütun sayısı', MIN_ICON_COUNT, MAX_ICON_COUNT, initialSettings.iconCount, 1, '', 0, DEFAULT_ICON_COUNT)}
                        ${createSlider('iconSizeSlider', 'Simge boyutu', MIN_ICON_SIZE, MAX_ICON_SIZE, initialSettings.iconSize, 1, 'px', 0, DEFAULT_ICON_SIZE)}
                        ${createSlider('fontSizeSlider', 'Metin boyutu', MIN_FONT_SIZE_MULTIPLIER, MAX_FONT_SIZE_MULTIPLIER, initialSettings.fontSizeMultiplier, 1, '%', 0, DEFAULT_FONT_SIZE_MULTIPLIER)}
                        ${createSlider('iconSpacingSlider', 'Simge içi boşluk', MIN_ICON_SPACING, MAX_ICON_SPACING, initialSettings.iconSpacing, 1, 'px', 0, DEFAULT_ICON_SPACING)}
                        ${createSlider('iconMarginSlider', 'Simgeler arası boşluk', MIN_ICON_MARGIN, MAX_ICON_MARGIN, initialSettings.iconMargin, 1, 'px', 0, DEFAULT_ICON_MARGIN)}
                        ${createSlider('iconRadiusSlider', 'Köşe yuvarlatma', MIN_ICON_RADIUS, MAX_ICON_RADIUS, initialSettings.iconRadius, 'any', '%', 0, DEFAULT_ICON_RADIUS)}
                        ${createSlider('topMarginSlider', 'Üst boşluk', MIN_TOP_MARGIN, MAX_TOP_MARGIN, initialSettings.topMargin, 1, 'px', 0, DEFAULT_TOP_MARGIN)}
                        <div class="form-check mt-3">
                            <input class="form-check-input" type="checkbox" id="fitToScreenWidthCheckbox" ${initialSettings.fitToScreenWidth ? 'checked' : ''}>
                            <label class="form-check-label" for="fitToScreenWidthCheckbox">Ekran genişliğine sığdır</label>
                        </div>
                    </main>
                    <footer class="modal-footer justify-content-between">
                        <div>
                            <button id="sliderOkBtn" class="btn btn-primary me-2">Tamam</button>
                            <button id="sliderCancelBtn" class="btn btn-secondary">İptal</button>
                        </div>
                        <div>
                           <button id="sliderUndoAllBtn" class="btn btn-warning me-2" title="Tüm değişiklikleri geri al" style="display: none;">${UNDO_ICON_SVG}</button>
                           <button id="sliderResetAllBtn" class="btn btn-info" title="Tümünü varsayılana sıfırla" style="display: none;">Tümünü sıfırla</button>
                        </div>
                    </footer>
                </div>
            </div>
        `;
        document.body.appendChild(modalWrapper);

        const modal = document.getElementById(sliderModalId);
        const sliders = { iconCount: modal.querySelector('#iconCountSlider'), iconSize: modal.querySelector('#iconSizeSlider'), fontSize: modal.querySelector('#fontSizeSlider'), iconSpacing: modal.querySelector('#iconSpacingSlider'), iconMargin: modal.querySelector('#iconMarginSlider'), iconRadius: modal.querySelector('#iconRadiusSlider'), topMargin: modal.querySelector('#topMarginSlider') };
        const labels = { iconCount: modal.querySelector('#iconCountSliderValue'), iconSize: modal.querySelector('#iconSizeSliderValue'), fontSize: modal.querySelector('#fontSizeSliderValue'), iconSpacing: modal.querySelector('#iconSpacingSliderValue'), iconMargin: modal.querySelector('#iconMarginSliderValue'), iconRadius: modal.querySelector('#iconRadiusSliderValue'), topMargin: modal.querySelector('#topMarginSliderValue') };
        const fitToScreenWidthCheckbox = modal.querySelector('#fitToScreenWidthCheckbox');

        const sliderKeyMap = { iconCountSlider: 'iconCount', iconSizeSlider: 'iconSize', fontSizeSlider: 'fontSizeMultiplier', iconSpacingSlider: 'iconSpacing', iconMarginSlider: 'iconMargin', iconRadiusSlider: 'iconRadius', topMarginSlider: 'topMargin' };

        function updateButtonVisibility() {
            let isAnyChangedFromInitial = false;
            let isAnyDifferentFromDefault = false;

            for (const slider of Object.values(sliders)) {
                const key = sliderKeyMap[slider.id];
                const currentValue = parseFloat(slider.value);
                const initialValue = initialSettings[key];
                const defaultValue = defaultSettings[key];
                const undoBtn = modal.querySelector(`[data-undo-single="${slider.id}"]`);
                const resetBtn = modal.querySelector(`[data-reset-single="${slider.id}"]`);

                let isSameAsInitial, isSameAsDefault;

                if (key === 'iconRadius') {
                    // Floating point comparison for icon radius
                    isSameAsInitial = Math.abs(currentValue - initialValue) < 0.00001;
                    isSameAsDefault = Math.abs(currentValue - defaultValue) < 0.00001;
                } else {
                    isSameAsInitial = currentValue === initialValue;
                    isSameAsDefault = currentValue === defaultValue;
                }

                undoBtn.style.display = isSameAsInitial ? 'none' : 'inline-block';
                resetBtn.style.display = isSameAsDefault ? 'none' : 'inline-block';

                if (!isSameAsInitial) isAnyChangedFromInitial = true;
                if (!isSameAsDefault) isAnyDifferentFromDefault = true;
            }

            const isCheckboxChanged = fitToScreenWidthCheckbox.checked !== initialSettings.fitToScreenWidth;
            if (isCheckboxChanged) isAnyChangedFromInitial = true;

            const isCheckboxDifferentFromDefault = fitToScreenWidthCheckbox.checked !== defaultSettings.fitToScreenWidth;
            if (isCheckboxDifferentFromDefault) isAnyDifferentFromDefault = true;

            modal.querySelector('#sliderUndoAllBtn').style.display = isAnyChangedFromInitial ? 'inline-block' : 'none';
            modal.querySelector('#sliderResetAllBtn').style.display = isAnyDifferentFromDefault ? 'inline-block' : 'none';
        }

        function updatePreview() {
            labels.iconCount.textContent = sliders.iconCount.value;
            labels.iconSize.textContent = sliders.iconSize.value + 'px';
            labels.fontSize.textContent = sliders.fontSize.value + '%';
            labels.iconSpacing.textContent = sliders.iconSpacing.value + 'px';
            labels.iconMargin.textContent = sliders.iconMargin.value + 'px';
            labels.iconRadius.textContent = Math.round(sliders.iconRadius.value) + '%';
            labels.topMargin.textContent = sliders.topMargin.value + 'px';

            applyPreviewStyles(parseInt(sliders.iconCount.value), parseInt(sliders.iconSize.value), parseFloat(sliders.iconRadius.value), parseInt(sliders.topMargin.value), parseInt(sliders.iconSpacing.value), fitToScreenWidthCheckbox.checked, parseInt(sliders.iconMargin.value), parseInt(sliders.fontSize.value));
            updateButtonVisibility();
        }

        Object.values(sliders).forEach(s => s.addEventListener('input', updatePreview));
        fitToScreenWidthCheckbox.addEventListener('change', updatePreview);

        modal.querySelectorAll('[data-reset-single]').forEach(btn => {
            btn.addEventListener('click', () => {
                const sliderId = btn.getAttribute('data-reset-single');
                document.getElementById(sliderId).value = btn.getAttribute('data-default-value');
                updatePreview();
            });
        });

        modal.querySelectorAll('[data-undo-single]').forEach(btn => {
            btn.addEventListener('click', () => {
                const sliderId = btn.getAttribute('data-undo-single');
                const key = sliderKeyMap[sliderId];
                document.getElementById(sliderId).value = initialSettings[key];
                updatePreview();
            });
        });

        function undoAllChanges() {
            for (const slider of Object.values(sliders)) {
                const key = sliderKeyMap[slider.id];
                slider.value = initialSettings[key];
            }
            fitToScreenWidthCheckbox.checked = initialSettings.fitToScreenWidth;
            updatePreview();
        }

        function resetAllSliders() {
            for (const slider of Object.values(sliders)) {
                const key = sliderKeyMap[slider.id];
                slider.value = defaultSettings[key];
            }
            fitToScreenWidthCheckbox.checked = defaultSettings.fitToScreenWidth;
            updatePreview();
        }

        modal.querySelector('#sliderUndoAllBtn').addEventListener('click', undoAllChanges);
        modal.querySelector('#sliderResetAllBtn').addEventListener('click', resetAllSliders);

        modal.querySelector('#sliderOkBtn').addEventListener('click', () => {
            GM_setValue('iconCount', parseInt(sliders.iconCount.value));
            GM_setValue('iconSize', parseInt(sliders.iconSize.value));
            GM_setValue('fontSizeMultiplier', parseInt(sliders.fontSize.value));
            GM_setValue('iconSpacing', parseInt(sliders.iconSpacing.value));
            GM_setValue('iconMargin', parseInt(sliders.iconMargin.value));
            GM_setValue('iconRadius', parseFloat(sliders.iconRadius.value));
            GM_setValue('topMargin', parseInt(sliders.topMargin.value));
            GM_setValue('fitToScreenWidth', fitToScreenWidthCheckbox.checked);
            closeModal(true);
        });

        const closeModal = (isSaved = false) => {
            if (!isSaved) applyCustomStyles();
            modal.remove();
            document.removeEventListener('keydown', escHandler);
            window.removeEventListener('resize', applyCustomStyles);
        };

        const escHandler = e => { if (e.key === 'Escape') closeModal(); };
        modal.querySelector('#sliderCancelBtn').addEventListener('click', () => closeModal());
        modal.querySelector('.btn-close').addEventListener('click', () => closeModal());
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

        document.addEventListener('keydown', escHandler);
        window.addEventListener('resize', updatePreview);
        updateButtonVisibility(); // Initial check
    }

    GM_registerMenuCommand("Görünüm Ayarları", createSliderModal);

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
