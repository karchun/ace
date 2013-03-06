/* 
Game Layer handles the Game Logic at a whole layer
*/

STATE_PLAYING = 0;
STATE_GAMEOVER = 1;

var GameLayer = cc.Layer.extend({
    
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
    },
    _state:STATE_PLAYING,
    /*
    _isTouch:false,
    */
    STARTING_LIVES:3,
    _hero:null,
    _enemies: null,
    _1PBullets: null,
    _bullets:null,
    screenRect:null,
    /**/
    canLaunchBomb:true,
    score: 0, 
    bombs: 3,
    lives: 3,
    level: 0,
    playerFiring: true, //init
    lastTimeEnemyLaunched: 0, // init
    enemyInterval:20, // init
    init:function () {
        var bRet = false; //boolean convention
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();
            // accept touch now!
            //sys.capabilties > cc.config.deviceType
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


            //my Rect functions
            this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);
            this.setUp;

            // reset global values
            ACE.SCORE = 0; // score, tmpScore


            // hero
            this._hero = new hero(this);
            this.addChild(this._hero, this._hero.zOrder, ACE.UNIT_TAG.PLAYER);


            // enemy, bullet?

            this._enemies = new Array();
            for (var i = 0; i < 10; i++) {
                var enemies = new Enemy(this);
                this._enemies.push(enemies);
                //delete enemies;
            }

            this._bullets = new Array();
            for (var i = 0; i < 50; i++) {
                var bullets = new Bullet(this);
                this._bullets.push(bullets);
                //delete bullets;
            }

            this._1PBullets = new Array();
            for (var i = 0; i < 50; i++) {
                var bulletz = new Bullet(this);
                this._1PBullets.push(bulletz);
                //delete bullets;
            }

            // schedule
            this.scheduleUpdate();

            if (ACE.SOUND) {
                cc.AudioEngine.getInstance().playMusic(s_bgMusic, true);
            }

            bRet = true;
        }
        return bRet;
    },

    update:function (dt) {

        //Loop Enemy and update?
        var i;
        for (i = 0; i < this._enemies.length; ++i) {

            if(this._enemies[i].launched){
                this._enemies[i].update();
            }
        }
        //loop Bullet and update?
        var j;
        for (j = 0; j < this._bullets.length; ++j) {
            if(this._bullets[j].fired){
                this._bullets[j].update();
            }else{
                if((!this._bullets[j].fired) && this._hero.lastTimeFired > this._hero.fireInterval )
                    {
                    this._bullets[j].fire(1, this._hero.getPosition(), this._hero.attackSpeed);
                    this._hero.lastTimeFired = 0;
                    
                 }
            }
        }


        if(this.lastTimeEnemyLaunched > this.enemyInterval){
            var rand = Math.floor((Math.random()*this._enemies.length));
   
            if(!this._enemies[rand].launched){

                this._enemies[rand].launch()
                this.lastTimeEnemyLaunched = 0;
            }
        }


        this.lastTimeEnemyLaunched += 0.1;
        
    },
    step:function (dt) {
        hero.update();
        //Loop Enemy and update?
        var i;
        for (i = 0; i < this._enemies.length; ++i) {
 
            if(this.enemies[i].launched){
                this.enemies[i].update();
            }
        }
        //loop Bullet and update?

        if(this.lastTimeEnemyLaunched > this.enemyInterval){
            var rand = Math.floor((Math.random()*this._enemies.length));
            if(this._enemies[rand]){
                this._enemies[rand].launch()
                this.lastTimeEnemyLaunched = 0;
            }
        }

        lastTimeEnemyLaunched += 0.1;
    },
    loseLife:function(){
        this.lives--;
        var h = this.getParent().getChildByTag("kHUDLayer");
        if(this.lives > 0){
        var live = h.lives[this.lives];
        live.setVisible(false);
        }
        if(this.lives == 0){
            this.resetGame()
            console.log("renew");
        }
    },
    resetGame:function(){

        var h = this.getParent().getChildByTag("kHUDLayer");
        for (var i = h.lives.length - 1; i >= 0; i--) {
            h.lives[i].setVisible(true);
        };
        this.score = 0;
        h.score.setString(this.score);
        this.lives = this.STARTING_LIVES;
    },
    onKeyDown:function (e) {

        ACE.KEYS[e] = true;
        if (ACE.KEYS[cc.KEY.space] || ACE.KEYS[cc.KEY.f]) {
            //Fix it to touch
            if(this.canLaunchBomb && this.bombs > 0){
                this.explodeBomb();
                console.log("Take Bomb");
            }

        }

    },
    onKeyUp:function (e) {
        ACE.KEYS[e] = false;
        this.playerFiring = false;
    },
    explodeBomb:function () {
        this.canLaunchBomb = false;
        this.bombs--;

        //HUD

/*        var bomb = cc.ParticleExplosion.create();
        bomb._super();
        console.log(bomb);
        bomb.setTexture(cc.TextureCache.getInstance().addImage(s_explosion));


        bomb.setAutoRemoveOnFinish(true);
        bomb.setPosition(160,240);
        bomb.setSpeed(200);

        this.getParent().addChild(this.bomb, 4);
        var Things = this._enemies;
        for (var i = 0; i < Things.length; i++) {
            if(Things[i].launched)
                Things[i].destroy();

        };

*/


        this.schedule(this.allowBombs, 2);


    },
    allowBombs:function () {
        this.unschedule(this.allowBombs);
        this.canLaunchBomb = true;
    },
    updateUI:function () {
        if (this._tmpScore < ACE.SCORE) {
            this._tmpScore += 5;
        }
        this._lbLife.setString(ACE.LIFE);
        this.lbScore.setString("Score: " + this._tmpScore);
    },
    collide:function (a, b) {
    },
    initBackground:function () {

    },
    movingBackground:function () {

    },
    onGameOver:function () {
    },
    myRect: function(sp){

        var rect = cc.RectMake(sp.getPosition().x - sp.getTextureRect().size.width/2,
            sp.getPosition().y - sp.getTextureRect().size.height/2,
            sp.getTextureRect().size.width,
            sp.getTextureRect().size.height
            );

        return rect;
}

});


function myRect(sp)
{
    var rect = cc.RectMake(sp.getPosition().x - sp.getTextureRect().size.width/2,
        sp.getPosition().y - sp.getTextureRect().size.height/2,
        sp.getTextureRect().size.width,
        sp.getTextureRect().size.height
        );

    return rect;
}

GameLayer.create = function () {

    // 's'
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    // 'scene' is an autorelease object
    var scene = cc.Scene.create();
    // 'layer' is an autorelease object
    var gameLayer = GameLayer.create();
    var hudLayer = HUDLayer.create();

    scene.addChild(gameLayer, 0, "kGameLayer");
    scene.addChild(hudLayer, 1, "kHUDLayer");

    return scene;
};




