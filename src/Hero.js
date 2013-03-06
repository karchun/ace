
var hero = cc.Sprite.extend({
    canBeAttack:true, //reviving
    zOrder:3000,
    appearPosition: cc.p(160, 60),//cc.p(160, 50), //160,60 200,50
    //h - this.getContentSize().height 
    lastTimeFired : 0,
    fireInterval : 3,
    attackSpeed:3, //900
    speed:5, //220
    theGame: null,
    ctor:function (game) {

        cc.associateWithNative( this, cc.Sprite );
        this.theGame = game;
        winSize = cc.Director.getInstance().getWinSize();
        this.reviving=false;
        /*spriteWithFile?*/
        //init life
        var heroTexture = cc.TextureCache.getInstance().addImage(s_hero);
        //Create sprite with or without spritesheets, 2nd args rect()
        this.initWithTexture(heroTexture);
        this.setTag(this.zOrder);
        this.setScale(0.5);
        this.appearPosition = cc.p(160, 60);

        this.setPosition(this.appearPosition);

        this.scheduleUpdate();


    },
    update:function () {
        this.lastTimeFired += 0.1;
        var pos = this.getPosition();

        var i;
        for (i = 0; i < this.theGame._enemies.length; ++i) {
            if(cc.pDistance(pos, this.theGame._enemies[i].getPosition()) <30){
                    if(this.checkCollisions(this.theGame.myRect(this.theGame._enemies[i]))){
                        this.theGame._enemies[i].reset();
                        this.destroy();
                    }
            }
            

        }

        var dt = 1;
        if( 'keyboard' in sys.capabilities ) {

            if ((ACE.KEYS[cc.KEY.w] || ACE.KEYS[cc.KEY.up]) && pos.y <= winSize.height) {
                pos.y += dt * this.speed;
            }
            if ((ACE.KEYS[cc.KEY.s] || ACE.KEYS[cc.KEY.down]) && pos.y >= 0) {
                pos.y -= dt * this.speed;
            }
            if ((ACE.KEYS[cc.KEY.a] || ACE.KEYS[cc.KEY.left]) && pos.x >= 0) {
                pos.x -= dt * this.speed;
            }
            if ((ACE.KEYS[cc.KEY.d] || ACE.KEYS[cc.KEY.right]) && pos.x <= winSize.width) {
                pos.x += dt * this.speed;
            }
            this.setPosition( pos );
        }
        //update bullet speed (C++) modifies
/*        var count_bullet = 0;
        var i;
        for (i = 0; i < this.theGame._1PBullets.length; ++i) {
            if(this.fireInterval > 0 && !this.theGame._1PBullets[i].fired && this.lastTimeFired > this.fireInterval )
                {
                this.theGame._1PBullets[i].fire(1, this.getPosition(), this.attackSpeed);
                this.lastTimeFired = 0;
                
            }
            count_bullet++;  
        }*/


    },
    checkCollisions:function (r) {
        var x = false;
        if(cc.rectIntersectsRect(this.theGame.myRect(this), r)){
            x = true;    
        }
        return x;

    },
    shoot:function (dt) {
    },
    destroy:function () {
        console.log("dead");
        if(!this.reviving){
            this.reviving = true;


            var action = cc.MoveTo.create(1, this.appearPosition);
            var delaying = cc.DelayTime.create(0.2);
            var eo = cc.EaseOut.create(action,5);
            var finishing = cc.CallFunc.create(this.finishReviving, this);
            var blinks = cc.Blink.create(1, 9);

            this.runAction(cc.Sequence.create(delaying, blinks, finishing));

            this.finishReviving();
            this.theGame.loseLife();
            if(ACE.SOUND){
                cc.AudioEngine.getInstance().playEffect(s_explodeSFX);
            }
        }
    },
    finishReviving:function () {
        this.reviving = false;
    },
    hurt:function () {

    },
    collideRect:function(){

    }
});
