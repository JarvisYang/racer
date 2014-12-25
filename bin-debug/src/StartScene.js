var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        _super.call(this);
        var stage = new egret.Stage();
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("startBg");
        this.startBtn = new egret.Bitmap();
        this.startBtn.texture = RES.getRes("startBtn");
        this.startBtn.x = stage.stageWidth / 2 + 10;
        this.startBtn.y = 490;
        this.startBtn.anchorX = 0.5;
        this.startBtn.anchorY = 0.5;
        this.startBtn.touchEnabled = true;
        this.introduce = new egret.Bitmap();
        this.introduce.texture = RES.getRes("introduce");
        this.introduce.x = 350;
        this.introduce.y = 530;
        this.addChildAt(this.bg, 0);
        this.addChildAt(this.startBtn, 1);
        this.addChildAt(this.introduce, 2);
        egret.Tween.get(this.startBtn, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 1200).to({ scaleX: 1, scaleY: 1 }, 1200);
        egret.Tween.get(this.introduce, { loop: true }).to({ y: 525 }, 1000).to({ y: 530 }, 1000);
    }
    return StartScene;
})(egret.DisplayObjectContainer);
StartScene.prototype.__class__ = "StartScene";
