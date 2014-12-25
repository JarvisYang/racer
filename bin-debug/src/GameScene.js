var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.width = 500;
        this.height = 800;
        this.startbarHeight = 72;
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("gameBg");
        this.bottom = new egret.Bitmap();
        this.bottom.texture = RES.getRes("gameStartBar");
        this.bottom.y = 800;
        this.bottom.anchorY = 1;
        this.blocks = [];
        this.trueRoad = 2;
        //this.movingTopNum = ;
        this.addChild(this.bg);
        this.addChild(this.bottom);
        this.init();
    }
    GameScene.prototype.init = function () {
        var block = [];
        var x = [];
        var trueBlock = 0;
        //init the first block
        block.push(new floatBlock(true, 250, 800 - this.startbarHeight, 2, 2, true));
        block.push(new floatBlock(false, 250, 800 - this.startbarHeight, 2, 2, true));
        this.blocks.push(block);
        this.addChild(block[0]);
        block = [];
        x[0] = 125 + Math.random() * 40;
        x[1] = 375 + Math.random() * 40;
        trueBlock = Math.random() < 0.5 ? 0 : 1;
        var anotherRoad = this.getAnotherRoad();
        var trueRoad = parseInt(Math.random() * 4 + "");
        if (trueBlock) {
            block.push(new floatBlock(false, x[0], 480, anotherRoad, parseInt(Math.random() * 4 + ""), false));
            block.push(new floatBlock(true, x[1], 480, this.trueRoad, trueRoad, false));
        }
        else {
            block.push(new floatBlock(true, x[0], 480, this.trueRoad, trueRoad, false));
            block.push(new floatBlock(false, x[1], 480, anotherRoad, parseInt(Math.random() * 4 + ""), false));
        }
        this.trueRoad = trueRoad;
        this.blocks.push(block);
        this.addChild(block[0]);
        this.addChild(block[1]);
        block = [];
        x[0] = 125 + Math.random() * 40;
        x[1] = 375 + Math.random() * 40;
        trueBlock = Math.random() < 0.5 ? 0 : 1;
        var anotherRoad = this.getAnotherRoad();
        var trueRoad = parseInt(Math.random() * 4 + "");
        if (trueBlock) {
            block.push(new floatBlock(false, x[0], 130, anotherRoad, parseInt(Math.random() * 4 + ""), false));
            block.push(new floatBlock(true, x[1], 130, this.trueRoad, trueRoad, false));
        }
        else {
            block.push(new floatBlock(true, x[0], 130, this.trueRoad, trueRoad, false));
            block.push(new floatBlock(false, x[1], 130, anotherRoad, parseInt(Math.random() * 4 + ""), false));
        }
        this.trueRoad = trueRoad;
        this.blocks.push(block);
        this.addChild(block[0]);
        this.addChild(block[1]);
    };
    GameScene.prototype.getAnotherRoad = function () {
        var road = parseInt(Math.random() * 4 + "");
        return road == this.trueRoad ? this.getAnotherRoad() : road;
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
var floatBlock = (function (_super) {
    __extends(floatBlock, _super);
    function floatBlock(hasRightBlock, x, y, num1, num2, hasStop) {
        if (num1 === void 0) { num1 = 2; }
        if (num2 === void 0) { num2 = 2; }
        if (hasStop === void 0) { hasStop = false; }
        _super.call(this);
        this.hasRightblock = hasRightBlock;
        this.width = 150;
        this.height = 150;
        this.anchorY = 1;
        this.anchorX = 0.5;
        this.x = x;
        this.y = y;
        this.absX = x;
        this.topNum = num2;
        this.bottomNum = num1;
        this.disBetweenBorder = 5;
        this.roadWidth = (this.width - this.disBetweenBorder * 2) / 5;
        this.endPoint = [];
        for (var i = 0; i < 5; i++) {
            this.endPoint.push(this.disBetweenBorder + i * this.roadWidth);
        }
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("blockBg");
        if (!hasStop) {
            var moveDis = 5 + parseInt(Math.random() * 5 + "");
            moveDis = Math.random() < 0.5 ? moveDis : 0 - moveDis;
            var moveTime = 800 + parseInt(Math.random() * 200 + "");
            egret.Tween.get(this, { loop: true }).to({ x: this.absX + moveDis }, moveTime).to({ x: this.absX }, moveTime);
        }
        this.addChild(this.bg);
        this.setRoad();
    }
    floatBlock.prototype.setRoad = function () {
        this.roadShape = new egret.Shape();
        this.roadShape.graphics.beginFill(0x41413f);
        this.roadShape.graphics.moveTo(this.endPoint[this.bottomNum], this.height);
        this.roadShape.graphics.lineTo(this.endPoint[this.bottomNum] + this.roadWidth, this.height);
        this.roadShape.graphics.lineTo(this.endPoint[this.topNum] + this.roadWidth, 0);
        this.roadShape.graphics.lineTo(this.endPoint[this.topNum], 0);
        this.roadShape.graphics.endFill();
        this.addChild(this.roadShape);
    };
    return floatBlock;
})(egret.Sprite);
floatBlock.prototype.__class__ = "floatBlock";
