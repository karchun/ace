//CCSprite * mySprite

var Enemy = cc.Sprite.extend({
    EXP:200,
    theGame: null,
    launched: false,
    lastTimeFired:0, //init Case??
    /*Case*/
    fireInterval:6, //Case?
    attackSpeed:0,  //firingSpped, bulletspeed
    speed:0,
    HP:0,
    maxHP: 1,
    type: 0,
    //init in C++
    ctor:function (game) {
        this.theGame = game; 
        // needed for JS-Bindings compatibility
        cc.associateWithNative( this, cc.Sprite );
        //case
        var enType= Math.floor((Math.random()*3));
        console.log(enType);
        var args = EnemyType[enType];
        //speed, fireInterval, attackSpeed, 
        console.log(args);
        this.speed= args.speed;
        this.fireInterval = args.fireInterval;
        this.HP = args.HP;
        this.maxHP = args.HP;
        this.attackSpeed = -3 - this.speed;
        this.EXP = args.EXP;
        
        //init life
        var Texture = cc.TextureCache.getInstance().addImage(s_aircraft);
        //Create sprite with or without spritesheets, 2nd args rect()
        this.initWithTexture(Texture);

        //this.initWithSpriteFrameName(args.textureName);
        this.theGame.addChild(this);
    },
    _timeTick:0,
    update:function () {

        this.setPosition(this.getPosition().x, this.getPosition().y - this.speed);

        //update bullet speed (C++)
        var count_bullet = 0;
        var i;
        for (i = 0; i < this.theGame._bullets.length; ++i) {
            if(this.fireInterval > 0 && !this.theGame._bullets[i].fired && this.lastTimeFired > this.fireInterval )
                {
                this.theGame._bullets[i].fire(2, this.getPosition(), this.attackSpeed);
                this.lastTimeFired = 0;
                
            }
            count_bullet++;  
        }
        
        this.lastTimeFired += 0.1;

        if(this.getPosition().y <= 20){
            this.reset();
        }


    },
    launch:function () {


        this.launched=true;
        this.setPosition(Math.floor(Math.random()* 260 + 30),460); //520

    },
    reset:function () {
        this.HP = this.maxHP;
        this.launched=false;
        this.setPosition(-500,200);
    },
    damage:function () {
        this.HP--;
        //Damage Effect
        //this.setColor( cc.red());

        var action1 = cc.TintTo.create(0.5, 255, 0, 0);
        var action2 = cc.TintTo.create(0.5, 255, 255, 255);

        this.runAction(cc.Sequence.create(action1,action2));

        if(this.HP <=0){
            this.destroy();
        }
    },
    destroy:function () {
        this.reset();
        //Destroy Animation

        //Increase Rewards (initWithGame....)
        console.log(this.EXP);
        this.theGame.score += this.EXP;
        var h = this.theGame.getParent().getChildByTag("kHUDLayer");
        h.score.setString(this.theGame.score);

/*    sprintf(scoreFile, "Score%i", theGame->score);
    hl->score->setCString((char*)scoreFile);*/


        if(ACE.SOUND){
            cc.AudioEngine.getInstance().playEffect(s_explodeSFX);
        }
        /**/

    },

    /**/

    shoot:function () {
    },
    hurt:function () {
        this._hurtColorLife = 2;
        this.HP--;
        this.setColor( cc.red());
    },
    collideRect:function(){
        var a = this.getContentSize();
        var p = this.getPosition();
        return cc.rect(p.x - a.width/2, p.y - a.height/4,a.width,a.height/2);
    }
});
