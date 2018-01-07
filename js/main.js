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
    //console.log(medicineObj[0]);

    initVueObj(medicineObj);
});

/** Vueオブジェクト初期化 */
function initVueObj(medicineObj) {
    var vm = new Vue({
        el: '#main',
        data: {
            searchText: '',
            searchResult: '',
            link: 'https://www.google.com/search?q=',
        },
        methods: {
            //検索処理
            //入力文字列で薬の名称を検索する.
            //(ひらがなとカタカナの両方で検索する.)
            search: function () {
                this.searchResult = '';
                if (!this.searchText) return;
                //console.log(this.searchText);
                var text = this.searchText;
                var katakanaText = hiraganaToKatakana(text);
                this.searchResult = medicineObj.filter(function (item, index) {
                    if ((item.nm).indexOf(text) != -1) return true;
                    if ((item.nm).indexOf(katakanaText) != -1) return true;
                });

                //console.log(this.searchResult);
            }
        }
    });
};

/** ひらがなをカタカナに変換する */
function hiraganaToKatakana(value) {
    return value.replace(/[\u3041-\u3096]/g, function (match) {
        var chara = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chara);
    });
}