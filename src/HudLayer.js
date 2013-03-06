
var HUDLayer = cc.Layer.extend({
    level:0,
    score:0,
    bombs:0,
    lives:[],
    ctor:function () {
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },
    init:function () {
        var bRet = false; //boolean convention
        if (this) {
            if('accelerometer' in sys.capabilities ) {
                this.setAccelerometerEnabled(true);
            }
            if( 'touches' in sys.capabilities ) {
                this.setTouchEnabled(true);
            }
            if( 'mouse' in sys.capabilities ) {
                this.setMouseEnabled(true);
            }
            if( 'keyboard' in sys.capabilities ) {
                this.setKeyboardEnabled(true);
            }
            var img;
            console.log(s_bg);
            var background = new cc.Sprite();

            var bgTexture = cc.TextureCache.getInstance().addImage(s_bg);
            //Create sprite with or without spritesheets, 2nd args rect()
            background.initWithTexture(bgTexture);
            background.setPosition(160,455);
            this.addChild(background);

            //get an image
            img = cc.TextureCache.getInstance().addImage(s_hud_life);

            for(var i = 0; i < 3; i++){
                var life = cc.Sprite.createWithTexture(img);
                life.setPosition(18+28*i, 465);
                this.addChild(life);
                this.lives.push(life);
            }
/*
            img = cc.TextureCache.getInstance().addImage(s_hud_bomb);
            var bomb = cc.Sprite.createWithTexture(img);
            bomb.setPosition(18,445);
            this.addChild(bomb);*/
            //GameLayer * gl = (GameLayer *) this->getChildByTag(kGameLayer);

            console.log(s_hudfont);
            this.level = cc.LabelBMFont.create("Level1", "res/hudfont.fnt");
            //level.setAnchorPoint(1,0.5);
            this.level.setPosition(290,465);
            //this.level.setColor(cc.Black);
            this.addChild(this.level);

            this.score = cc.LabelBMFont.create("Score 0", s_hudfont);
            //level.setAnchorPoint(1,0.5);
            this.score.setPosition(290,445);
            //this.score.setColor(cc.Black);
            this.addChild(this.score);


        bRet = true;
        }

     return bRet;    
    },
    update:function () {

    }
});

HUDLayer.create = function () {
    var sg = new HUDLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

HUDLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = HUDLayer.create();
    scene.addChild(layer);
    return scene;
};