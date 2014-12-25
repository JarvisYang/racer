class StartScene extends egret.DisplayObjectContainer{
    private bg:egret.Bitmap;
    public startBtn:egret.Bitmap;
    private introduce:egret.Bitmap;

    public constructor(){
        super();

        var stage = new egret.Stage();

        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("startBg");

        this.startBtn = new egret.Bitmap();
        this.startBtn.texture = RES.getRes("startBtn");

        this.startBtn.x = stage.stageWidth/2 + 10;
        this.startBtn.y = 490;
        this.startBtn.anchorX = 0.5;
        this.startBtn.anchorY = 0.5;

        this.introduce = new egret.Bitmap();
        this.introduce.texture = RES.getRes("introduce");
        this.introduce.x = 350;
        this.introduce.y = 530;

        this.addChildAt(this.bg,0);
        this.addChildAt(this.startBtn,1);
        this.addChildAt(this.introduce,2);

        egret.Tween.get(this.startBtn,{loop:true}).to({scaleX:1.1,scaleY:1.1},1200).to({scaleX:1,scaleY:1},1200);
        egret.Tween.get(this.introduce,{loop:true}).to({y:525},1000).to({y:530},1000);

    }
}