/** モーダルウィンドウ表示用 */

"use strict"

/** register modal component */
Vue.component('modal', {
    template: '#modal-template'
})

new Vue({
    el: '#about-app',
    data: {
        showModal: false
    }
})