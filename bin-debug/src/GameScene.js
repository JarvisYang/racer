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
        this.stopMoveSpeed = 2;
        this.moveBlockSpeed = 200;
        this.combineBlockNum = -1;
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("gameBg");
        this.blockHeight = 150;
        this.blockRmPos = this.height + this.blockHeight;
        this.blockLeavePos = [this.width + this.blockHeight / 2, 0 - this.blockHeight / 2];
        this.gameTimer = new egret.Timer(10, 0);
        this.carMoveTimer = new egret.Timer(10, 0);
        this.car = new egret.Bitmap();
        this.car.texture = RES.getRes("car");
        this.car.anchorX = 0.5;
        this.car.anchorY = 1;
        this.car.y = this.height + this.car.height;
        this.car.x = this.width / 2;
        this.carStopPos = this.height - this.startbarHeight;
        this.hasCarmoving = true;
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
        this.addChild(this.car);
    }
    GameScene.prototype.init = function () {
        var block = [];
        var x = [];
        var trueBlock = 0;
        this.trueBlocks = [];
        this.stopBlocksNum = [0, 0, 0, 0];
        //init the first block
        block.push(new floatBlock(true, 250, 800 - this.startbarHeight, 0, 0, 2, 2, true));
        block.push(new floatBlock(false, 250, 800 - this.startbarHeight, 0, 1, 2, 2, true));
        this.blocks.push(block);
        this.trueBlocks.push(0);
        block[1].visible = false;
        this.addChild(block[0]);
        this.addChild(block[1]);
        block = [];
        x[0] = 125 + Math.random() * 40;
        x[1] = 375 + Math.random() * 40;
        trueBlock = Math.random() < 0.5 ? 0 : 1;
        this.trueBlocks.push(trueBlock);
        var anotherRoad = this.getAnotherRoad();
        var trueRoad = parseInt(Math.random() * 4 + "");
        if (trueBlock) {
            block.push(new floatBlock(false, x[0], 480, 1, 0, anotherRoad, parseInt(Math.random() * 4 + ""), false));
            block.push(new floatBlock(true, x[1], 480, 1, 1, this.trueRoad, trueRoad, false));
        }
        else {
            block.push(new floatBlock(true, x[0], 480, 1, 0, this.trueRoad, trueRoad, false));
            block.push(new floatBlock(false, x[1], 480, 1, 1, anotherRoad, parseInt(Math.random() * 4 + ""), false));
        }
        this.trueRoad = trueRoad;
        this.blocks.push(block);
        this.addChild(block[0]);
        this.addChild(block[1]);
        block = [];
        x[0] = 125 + Math.random() * 40;
        x[1] = 375 + Math.random() * 40;
        trueBlock = Math.random() < 0.5 ? 0 : 1;
        this.trueBlocks.push(trueBlock);
        var anotherRoad = this.getAnotherRoad();
        var trueRoad = parseInt(Math.random() * 4 + "");
        if (trueBlock) {
            block.push(new floatBlock(false, x[0], 130, 2, 0, anotherRoad, parseInt(Math.random() * 4 + ""), false));
            block.push(new floatBlock(true, x[1], 130, 2, 1, this.trueRoad, trueRoad, false));
        }
        else {
            block.push(new floatBlock(true, x[0], 130, 2, 0, this.trueRoad, trueRoad, false));
            block.push(new floatBlock(false, x[1], 130, 2, 1, anotherRoad, parseInt(Math.random() * 4 + ""), false));
        }
        this.trueRoad = trueRoad;
        this.blocks.push(block);
        this.addChild(block[0]);
        this.addChild(block[1]);
        block = [];
        x[0] = 125 + Math.random() * 40;
        x[1] = 375 + Math.random() * 40;
        trueBlock = Math.random() < 0.5 ? 0 : 1;
        this.trueBlocks.push(trueBlock);
        var anotherRoad = this.getAnotherRoad();
        var trueRoad = parseInt(Math.random() * 4 + "");
        if (trueBlock) {
            block.push(new floatBlock(false, x[0], 0, 3, 0, anotherRoad, parseInt(Math.random() * 4 + ""), false));
            block.push(new floatBlock(true, x[1], 0, 3, 1, this.trueRoad, trueRoad, false));
        }
        else {
            block.push(new floatBlock(true, x[0], 0, 3, 0, this.trueRoad, trueRoad, false));
            block.push(new floatBlock(false, x[1], 0, 3, 1, anotherRoad, parseInt(Math.random() * 4 + ""), false));
        }
        this.trueRoad = trueRoad;
        this.blocks.push(block);
        block[0].visible = false;
        block[1].visible = false;
        this.addChild(block[0]);
        this.addChild(block[1]);
        this.movingFirstNum = 1;
        this.movingLastNum = 2;
        this.stopFirstNum = 0;
        this.stopLastNum = 0;
        this.blocksNum = 3;
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i][0].addEventListener(BlockTouchEvent.EVENT, this.blockCombine, this);
            this.blocks[i][1].addEventListener(BlockTouchEvent.EVENT, this.blockCombine, this);
        }
    };
    GameScene.prototype.blockCombine = function (event) {
        var id = event.target.id;
        if (id == this.movingFirstNum) {
            this.stopLastNum = this.movingFirstNum;
            this.movingFirstNum = this.movingFirstNum != this.movingLastNum ? this.getNextBlockNum(this.movingFirstNum) : -1;
            var dir = event.target.dir;
            var block = this.blocks[id][dir];
            var anotherBlock = this.blocks[id][dir ? 0 : 1];
            anotherBlock.touchEnabled = false;
            egret.Tween.removeTweens(anotherBlock);
            egret.Tween.get(anotherBlock).to({ x: this.blockLeavePos[dir], y: anotherBlock.y + 100 }, 400, egret.Ease.sineIn);
            egret.Tween.removeTweens(block);
            this.stopBlocksNum[id] = dir;
            egret.Tween.get(block).to({ x: 250 }, 200, egret.Ease.sineInOut);
            block.touchEnabled = false;
        }
    };
    GameScene.prototype.getAnotherRoad = function () {
        var road = parseInt(Math.random() * 4 + "");
        return road == this.trueRoad ? this.getAnotherRoad() : road;
    };
    GameScene.prototype.gameStart = function () {
        this.carMoveTimer.addEventListener(egret.TimerEvent.TIMER, this.carMove, this);
        this.carMoveTimer.start();
        egret.Tween.get(this.car).to({ y: this.carStopPos }, 1000);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.run, this);
    };
    GameScene.prototype.carMove = function () {
        if (this.hasCarmoving) {
            if (this.car.y == this.carStopPos) {
                this.gameTimer.start();
                this.hasCarmoving = false;
            }
        }
        else {
            if (this.bottom.y <= this.height + this.startbarHeight) {
                this.bottom.y += this.stopMoveSpeed;
            }
            else {
                this.carMoveTimer.stop();
            }
        }
    };
    GameScene.prototype.run = function () {
        /**
         *stop blocks move
         */
        var num = this.stopFirstNum;
        this.blocks[num][this.stopBlocksNum[num]].y += this.stopMoveSpeed;
        num = this.getNextBlockNum(num);
        var stopNum = this.getNextBlockNum(this.stopLastNum);
        while (num != stopNum) {
            var block = this.blocks[num][this.stopBlocksNum[num]];
            var forwardBlockNum = this.getForwardBlockNum(num);
            var forwardBlock = this.blocks[forwardBlockNum][this.stopBlocksNum[forwardBlockNum]];
            var moveDis = (forwardBlock.y + this.blockHeight - block.y) / 40;
            console.log(moveDis);
            if (block.y + moveDis + this.blockHeight > forwardBlock.y) {
                block.y = forwardBlock.y - this.blockHeight;
            }
            else {
                block.y += moveDis;
            }
            num = this.getNextBlockNum(num);
        }
        var lastStopBlock = this.blocks[this.stopLastNum][this.stopBlocksNum[this.stopLastNum]];
        if (this.car.y < (lastStopBlock.y - this.blockHeight)) {
            this.gameOver();
            return false;
        }
        var firstStopBlock = this.blocks[this.stopFirstNum][this.stopBlocksNum[this.stopFirstNum]];
        if (firstStopBlock.y > this.blockRmPos) {
            firstStopBlock.visible = false;
            if (this.stopLastNum == this.stopFirstNum) {
                this.stopFirstNum = -1;
                this.stopFirstNum = -1;
            }
            else {
                this.stopFirstNum = this.getNextBlockNum(num);
            }
        }
        /**
         *moving block move
         */
        var num = this.movingFirstNum;
        var lastStopBlockPos = this.blocks[this.stopLastNum][this.trueBlocks[this.stopLastNum]].y - this.blockHeight;
        var stopNum = this.getNextBlockNum(this.movingLastNum);
        while (num != -1 && num != stopNum) {
            var block = this.blocks[num];
            var moveSpeed = (lastStopBlockPos - block[0].y) / this.moveBlockSpeed;
            block[0].y += moveSpeed;
            block[1].y += moveSpeed;
            num = this.getNextBlockNum(num);
        }
    };
    GameScene.prototype.gameOver = function () {
        this.gameTimer.stop();
    };
    GameScene.prototype.getNextBlockNum = function (num) {
        return num == this.blocksNum ? 0 : num + 1;
    };
    GameScene.prototype.getForwardBlockNum = function (num) {
        return num == 0 ? this.blocksNum : num - 1;
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
var floatBlock = (function (_super) {
    __extends(floatBlock, _super);
    function floatBlock(hasRightBlock, x, y, id, dir, num1, num2, hasStop) {
        if (num1 === void 0) { num1 = 2; }
        if (num2 === void 0) { num2 = 2; }
        if (hasStop === void 0) { hasStop = false; }
        _super.call(this);
        this.hasRightblock = hasRightBlock;
        this.width = 150;
        this.height = 150;
        this.anchorY = 1;
        this.anchorX = 0.5;
        this.id = id;
        this.dir = dir;
        this.x = x;
        this.y = y;
        this.absX = x;
        this.topNum = num2;
        this.bottomNum = num1;
        this.disBetweenBorder = 5;
        this.roadWidth = (this.width - this.disBetweenBorder * 2) / 5;
        this.endPoint = [];
        this.touchEnabled = true;
        for (var i = 0; i < 5; i++) {
            this.endPoint.push(this.disBetweenBorder + i * this.roadWidth);
        }
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("blockBg");
        if (!hasStop) {
            var moveDis = 5 + parseInt(Math.random() * 5 + "");
            moveDis = Math.random() < 0.5 ? moveDis : 0 - moveDis;
            var moveTime = 800 + parseInt(Math.random() * 200 + "");
            egret.Tween.get(this, { loop: true }).to({ x: this.absX + moveDis }, moveTime, egret.Ease.sineOut).to({ x: this.absX }, moveTime, egret.Ease.sineOut);
        }
        this.addChild(this.bg);
        this.setRoad();
        var event = new BlockTouchEvent(BlockTouchEvent.EVENT);
        event.id = id;
        event.dir = dir;
        this.dispatchEvent(event);
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
var BlockTouchEvent = (function (_super) {
    __extends(BlockTouchEvent, _super);
    function BlockTouchEvent(type, bubbles, cancelable) {
        if (type === void 0) { type = egret.TouchEvent.TOUCH_END; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    BlockTouchEvent.EVENT = egret.TouchEvent.TOUCH_END;
    return BlockTouchEvent;
})(egret.TouchEvent);
BlockTouchEvent.prototype.__class__ = "BlockTouchEvent";
