// ==UserScript==
// @name            Odoo App Drawer Layout
// @name:tr         Odoo Uygulama Çekmecesi Yerleşim Düzeni
// @namespace       https://github.com/sipsak
// @version         1.0
// @description     Allows you to change the number of icons that are displayed 6 side by side by default on the Odoo home screen
// @description:tr  Odoo ana ekranında varsayılan olarak yan yana 6 tane gösterilen ikon sayısını değiştirmenize yarar
// @author          Burak Şipşak
// @match           https://portal.bskhvac.com.tr/*
// @match           https://*.odoo.com/*
// @grant           none
// @icon            https://raw.githubusercontent.com/sipsak/odoo-image-enlarger/refs/heads/main/icon.png
// @updateURL       https://raw.githubusercontent.com/sipsak/Odoo-App-Drawer-Layout/main/Odoo-App-Drawer-Layout.user.js
// @downloadURL     https://raw.githubusercontent.com/sipsak/Odoo-App-Drawer-Layout/main/Odoo-App-Drawer-Layout.user.js
// ==/UserScript==

(function () {
    'use strict';

    /*** AYARLANACAK ALAN ***/
    const ICON_COUNT = 9; // Yan yana gösterilmesini istediğiniz ikon sayısı
    /*************************/

    const widthPercent = (100 / ICON_COUNT).toFixed(8) + '%';
    const spacingCount = ICON_COUNT - 1;
    const maxWidthPx = ICON_COUNT * 75 + spacingCount * 80;

    function applyCustomStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
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
        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyCustomStyles);
    } else {
        applyCustomStyles();
    }
})();
