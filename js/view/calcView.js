/*
   載入需要的物件, jquery underscore backbone
   載入計算機面板
*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/calcPage.html',
], function( $, _, Backbone, CalcPageTemplates) {

    var CalcView = Backbone.View.extend({
        // 父元件
        el: "body",
        // 事件
        events: {
            // 點擊事件, 目標物 : 執行的 function
            'click .calcDashboard .button': 'clickButton',
        },
        // 使用 計算機面板 定義 template
        template: _.template( CalcPageTemplates ),
        // 初始化
        initialize: function( data ) {
            // 設定按鈕位置,多為陣列，行數與內容
            var calcButton = [];
            calcButton.push(["","","C","AC"]);
            calcButton.push(["7","8","9","/"]);
            calcButton.push(["4","5","6","*"]);
            calcButton.push(["1","2","3","-"]);
            calcButton.push(["0",".","=","+"]);

            // 定義容器對象
            this.target = $(data.target);
            // 將按鈕變數當成值賽入面板中產生html
            this.target.html(this.template({"calcButton":calcButton}));
            // 定義顯示區塊，方便未來使用
            this.showView = this.target.find(".screen .number");
            this.showOperand = this.target.find(".screen .operand");

            // 初始化儲存值
            this.saveNumber = 0;
            this.saveOperand = "+";
            this.saveDone = false;
        },
        clickButton: function(e){
            // 取得點擊按鈕的值
            this.showView.text(this.showView.text().trim());
            var value = $(e.currentTarget).data("value");

            // 如果運算元顯示位值為 ＝，清空運算元顯示位值的內容（代表剛剛點了= 現在要重新開始計算）
            if (this.showOperand.text() == "=") {
                this.showOperand.text("");
            }

            if (!isNaN(value)) {
                //  如果是數字

                // 如果剛剛儲存是完成，代表剛剛點運算元，要重新處理顯示內容
                if (this.saveDone ) {
                    this.showView.text(0);
                    this.saveDone = false;
                }
                // 如果顯示內容是 0 先清空
                if (this.showView.text().slice(-1)!="." && this.showView.text() == 0) {
                    this.showView.text("");
                }
                // 字串相加方式塞入數字
                this.showView.text( this.showView.text()+""+value);
            } else {
                // 如果是文字

                switch (value) {
                    case "AC":
                        // 如果是 AC，把儲存與顯示內容全部初始化
                        this.saveDone = true;
                        this.saveNumber = 0;
                        this.saveOperand = "+";
                        this.showOperand.text("");
                        this.showView.text(0);
                        break;
                    case "C":
                        // 如果是 C，初始化顯示內容
                        this.showView.text(0);
                        break;
                    case "=":
                        // 如果是等於，計算
                        console.log("this.saveNumber = "+this.saveNumber+" "+this.saveOperand+" "+this.showView.text());
                        eval("this.saveNumber = "+this.saveNumber+" "+this.saveOperand+" "+this.showView.text());
                        this.saveOperand = value;
                        this.showOperand.text(this.saveOperand);
                        this.showView.text(this.saveNumber);

                        // 初始化儲存內容
                        // 運算完成
                        this.saveDone = true;
                        this.saveNumber = 0;
                        this.saveOperand = "+";
                        break;
                    case ".":
                        // 如果是 . 跟數字一樣塞入顯示值
                        if (this.saveDone) {
                            this.showView.text(0);
                        }
                        this.saveDone = false;
                        this.showView.text( this.showView.text()+""+value);
                        break;
                    default:
                        // 如果是 ＋ - * / 進行運算
                        // 修改儲存值
                        // 運算完成
                        console.log("this.saveNumber = "+this.saveNumber+" "+this.saveOperand+" "+this.showView.text());
                        eval("this.saveNumber = "+this.saveNumber+" "+this.saveOperand+" "+this.showView.text());
                        this.showView.text(this.saveNumber);
                        this.saveOperand = value;
                        this.showOperand.text(this.saveOperand);
                        this.saveDone = true;
                        break;
                }
            }
        }
    });
    return CalcView;
});
