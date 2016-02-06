/*
    對於 requirejs 的定義檔
    baseUrl: 搜尋js檔案的目錄
    path: 關鍵字 轉 檔案名稱
    shim: 檔案相依性，例如，backbone 需要先載入 jquery 與 underscore
*/
requirejs.config({
    baseUrl: 'js/',
    paths: {
        jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min",
        underscore: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        backbone: "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min",
        async: "https://cdnjs.cloudflare.com/ajax/libs/requirejs-async/0.1.1/async",
        text: "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
});
