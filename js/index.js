/*
    每一頁的進入點
    先載入定義檔
*/
require(['./common'], function (common) {
    /*
        載入本頁需要執行的檔案
        app <-- 通常會在網站中定義一個 app.js 放置通用性的動作，例如 header 的動作
        view/calcView <-- 計算機物件
    */
    require([
        'jquery',
        'app',
        'view/calcView'
    ], function( $, App,CalcView ) {
        // 宣告計算機物件，告訴物件要塞入到哪一個容器中
        var calcView = new CalcView({'target':'.calc'});
    });
});
