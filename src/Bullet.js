//bullet
var Bullet = cc.Sprite.extend({
    active:true,
    power:1,
    HP:1,
    moveType:null,
    zOrder:3000,

    fired: false,
    whoFired:0,
    attackSpeed:2,
    theGame: null,
    //initWithGame
    ctor:function (game) {
        // needed for JS-Bindings compatibility
        cc.associateWithNative( this, cc.Sprite );
        //self = this (for C++ Semantics?)
        this.theGame = game;

/*        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_bullet_plist);
        weaponType="W2.png";
        this.initWithSpriteFrameName(weaponType);


        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
*/
        //init life
        var bTexture = cc.TextureCache.getInstance().addImage(s_bullets);
        //Create sprite with or without spritesheets, 2nd args rect()
        this.initWithTexture(bTexture);


        this.theGame.addChild(this);
        //this.setVisible(true);
    },
    update:function () {
        switch(this.whoFired)
        {
        case 1:
            this.setPosition(this.getPosition().x , this.getPosition().y + this.attackSpeed);
            
            var i;
            for (i = 0; i < this.theGame._enemies.length; ++i) {

                if(cc.pDistance(this.getPosition(),this.theGame._enemies[i].getPosition()) < 30)
                {
                    if(this.checkCollisions(this.theGame.myRect(this.theGame._enemies[i]))){
                        this.theGame._enemies[i].damage();
                    }
                    
                }
                
            }

          break;
        case 2:

            this.setPosition(this.getPosition().x, this.getPosition().y + this.attackSpeed);
          
            if(cc.pDistance(this.getPosition(),this.theGame._hero.getPosition()) < 30)
            {
                if(this.checkCollisions(this.theGame.myRect(this.theGame._hero))){
                    this.theGame._hero.destroy();
                }
                
            }

          break;
        default:
          console.log("bullet send from ghost");
        }

        if(this.getPosition().y > 500 || this.getPosition().y < -20 ){
            this.reset();
        }


    },
    reset:function () {
        this.fired = false;
        this.setPosition(-500,-500);
    },
    fire:function (who, pos, fspeed) {
        this.attackSpeed = fspeed;
        this.whoFired = who;
        this.fired = true;

        pos.y += who == 1? 45: -45;
            
        this.setPosition(pos);

        
    },
    checkCollisions:function (r) {
        var x = false;
        if(cc.rectIntersectsRect(this.theGame.myRect(this), r)){
            x = true;
            this.reset();
        }
        return x;
    },
    /**/
    destroy:function () {
    },
    hurt:function () {
        this.HP--;
    },
    collideRect:function(){

    }
});
