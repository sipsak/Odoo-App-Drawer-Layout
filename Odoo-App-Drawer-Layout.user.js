// ==UserScript==
// @name            Odoo App Drawer Layout
// @name:tr         Odoo Uygulama Çekmecesi Yerleşim Düzeni
// @namespace       https://github.com/sipsak
// @version         1.1
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

    const DEFAULT_ICON_COUNT = 9;
    const MIN_ICON_COUNT = 4;
    const MAX_ICON_COUNT = 15;
    const styleElementId = 'odoo-app-drawer-style';
    const sliderModalId = 'odoo-app-drawer-modal';

    function getIconCount() {
        let count = parseInt(GM_getValue('iconCount', DEFAULT_ICON_COUNT));
        if (isNaN(count) || count < MIN_ICON_COUNT || count > MAX_ICON_COUNT) {
            count = DEFAULT_ICON_COUNT;
        }
        return count;
    }

    function applyPreviewStyles(iconCount) {
        let style = document.getElementById(styleElementId);
        const widthPercent = (100 / iconCount).toFixed(8) + '%';
        const spacingCount = iconCount - 1;
        const maxWidthPx = iconCount * 75 + spacingCount * 80;

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
                    -webkit-box-flex: 0 !important;
                    -webkit-flex: 0 0 auto !important;
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
        applyPreviewStyles(getIconCount());
    }

    function createSliderModal() {
        const oldModal = document.getElementById(sliderModalId);
        if (oldModal) oldModal.remove();

        const currentValue = getIconCount();

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
            <div class="modal-dialog modal-dialog-centered" style="max-width: 350px;">
                <div class="modal-content">
                    <header class="modal-header">
                        <h4 class="modal-title text-break">Sıra Sayısını Ayarla</h4>
                        <button type="button" class="btn-close" aria-label="Close"></button>
                    </header>
                    <main class="modal-body">
                        <label for="iconCountSlider" class="form-label">
                            Yan yana gösterilecek simge sayısı: <strong id="sliderValue">${currentValue}</strong>
                        </label>
                        <input type="range"
                               class="form-range"
                               id="iconCountSlider"
                               min="${MIN_ICON_COUNT}"
                               max="${MAX_ICON_COUNT}"
                               value="${currentValue}">
                        <div class="d-flex justify-content-between text-muted small mt-1">
                            <span>${MIN_ICON_COUNT}</span>
                            <span>${MAX_ICON_COUNT}</span>
                        </div>
                    </main>
                    <footer class="modal-footer justify-content-start">
                        <button id="sliderOkBtn" class="btn btn-primary me-2">Tamam</button>
                        <button id="sliderCancelBtn" class="btn btn-secondary">İptal</button>
                    </footer>
                </div>
            </div>
        `;

        document.body.appendChild(modalWrapper);

        const modal = document.getElementById(sliderModalId);
        const slider = document.getElementById('iconCountSlider');
        const valueDisplay = document.getElementById('sliderValue');
        const okBtn = document.getElementById('sliderOkBtn');
        const cancelBtn = document.getElementById('sliderCancelBtn');
        const closeBtn = modal.querySelector('.btn-close');

        slider.addEventListener('input', function () {
            valueDisplay.textContent = this.value;
            applyPreviewStyles(parseInt(this.value));
        });

        function closeModal() {
            applyCustomStyles();
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }

        okBtn.addEventListener('click', function () {
            const newValue = parseInt(slider.value);
            GM_setValue('iconCount', newValue);
            applyCustomStyles();
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        });

        cancelBtn.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', escHandler);
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
