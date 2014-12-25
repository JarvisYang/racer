class GameScene extends egret.DisplayObjectContainer{
    private bg:egret.Bitmap;
    private bottom:egret.Bitmap;
    private startbarHeight;
    public blocks:any;
    public movingFirstNum:any;
    public movingLastNum:any;
    public stopFirstNum:any;
    public stopLastNum:any;
    public stopMoveSpeed:any;
    public blocksnum:any;
    public trueRoad:any;

    public constructor(){
        super();

        this.width = 500;
        this.height = 800;
        this.startbarHeight = 72;

        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("gameBg");

        this.bottom = new egret.Bitmap();
        this.bottom.texture = RES.getRes("gameStartBar");
        this.bottom.y =  800;
        this.bottom.anchorY = 1;
        this.blocks = [];
        this.trueRoad = 2;
        //this.movingTopNum = ;
        this.addChild(this.bg);
        this.addChild(this.bottom);
        this.init();
    }

    private init(){
        var block = [];
        var x = [];
        var trueBlock = 0;
        //init the first block
        block.push(new floatBlock(true,250,800 - this.startbarHeight,2,2,true));
        block.push(new floatBlock(false,250,800 - this.startbarHeight,2,2,true));
        this.blocks.push(block);
        this.addChild(block[0]);

        block = [];
        x[0] = 125 + Math.random()*40;
        x[1] = 375 + Math.random()*40;
        trueBlock = Math.random() < 0.5?0:1;
        var anotherRoad = this.getAnotherRoad();
        var trueRoad = parseInt(Math.random()*4 + "");
        if(trueBlock){
            block.push(new floatBlock(false,x[0],480,anotherRoad,parseInt(Math.random()*4 + ""),false));
            block.push(new floatBlock(true,x[1],480,this.trueRoad,trueRoad,false));
        }
        else{
            block.push(new floatBlock(true,x[0],480,this.trueRoad,trueRoad,false));
            block.push(new floatBlock(false,x[1],480,anotherRoad,parseInt(Math.random()*4 + ""),false));
        }
        this.trueRoad = trueRoad;
        this.blocks.push(block);
        this.addChild(block[0]);
        this.addChild(block[1]);

        block = [];
        x[0] = 125 + Math.random()*40;
        x[1] = 375 + Math.random()*40;
        trueBlock = Math.random() < 0.5?0:1;
        var anotherRoad = this.getAnotherRoad();
        var trueRoad =parseInt(Math.random()*4 + "");
        if(trueBlock){
            block.push(new floatBlock(false,x[0],130,anotherRoad,parseInt(Math.random()*4 + ""),false));
            block.push(new floatBlock(true,x[1],130,this.trueRoad,trueRoad,false));
        }
        else{
            block.push(new floatBlock(true,x[0],130,this.trueRoad,trueRoad,false));
            block.push(new floatBlock(false,x[1],130,anotherRoad,parseInt(Math.random()*4 + ""),false));
        }
        this.trueRoad = trueRoad;
        this.blocks.push(block);
        this.addChild(block[0]);
        this.addChild(block[1]);
    }

    private getAnotherRoad(){
        var road = parseInt(Math.random()*4 + "");
        return road == this.trueRoad?this.getAnotherRoad():road;
    }
}

class floatBlock extends egret.Sprite{
    private bg:egret.Bitmap;
    public hasRightblock:boolean;
    private roadWidth:number;
    private disBetweenBorder:number;
    private endPoint:number[];
    private topNum:number;
    private bottomNum:number;
    private roadShape:egret.Shape;
    private absX:number;

    public constructor(hasRightBlock,x,y,num1 = 2,num2 = 2,hasStop = false){
        super();

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
        this.roadWidth = (this.width - this.disBetweenBorder*2)/5;
        this.endPoint = [];
        this.touchEnabled = true;
        for(var i = 0;i < 5;i++){
            this.endPoint.push(this.disBetweenBorder + i*this.roadWidth);
        }

        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("blockBg");

        if(!hasStop){
            var moveDis = 5 + parseInt(Math.random()*5 + "");
            moveDis = Math.random() < 0.5? moveDis : 0 - moveDis;
            var moveTime = 800 + parseInt(Math.random() * 200 + "");
            egret.Tween.get(this,{loop:true}).to({x:this.absX + moveDis},moveTime).to({x:this.absX},moveTime);
        }

        this.addChild(this.bg);
        this.setRoad();
    }

    private setRoad(){
        this.roadShape = new egret.Shape();
        this.roadShape.graphics.beginFill(0x41413f);
        this.roadShape.graphics.moveTo(this.endPoint[this.bottomNum],this.height);
        this.roadShape.graphics.lineTo(this.endPoint[this.bottomNum] + this.roadWidth,this.height);
        this.roadShape.graphics.lineTo(this.endPoint[this.topNum] + this.roadWidth,0);
        this.roadShape.graphics.lineTo(this.endPoint[this.topNum],0);
        this.roadShape.graphics.endFill();
        this.addChild(this.roadShape);
    }
}