"use strict"

/** ページ初期化時にjsonファイル読み込み */
window.onload = function (handleload) {
    var xhr = new XMLHttpRequest;

    xhr.addEventListener('load', handleload, false);
    xhr.open('GET', 'medicine.json', true);
    xhr.send(null);
}(function handleLoad(event) {
    var xhr = event.target,
        medicineObj = JSON.parse(xhr.responseText);
    console.log(medicineObj[0]);

    initVueObj(medicineObj);
});

/** Vueオブジェクト初期化 */
function initVueObj(medicineObj) {
    var vm = new Vue({
        el: '#main',
        data: {
            searchText: '',
        },
        methods: {
            search: function () {
                console.log(this.searchText);
                var newLines = medicineObj.filter(function (item, index) {
                    if ((item.nm).indexOf(this.searchText) >= 0) return true;
                });

                console.log(newLines);
            }
        }
    });
};