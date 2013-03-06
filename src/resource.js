var dir = "res/";
var dirImg = "res/";
var dirMusic = "res/Music/";
var musicSuffix = ".mp3"; //
if( cc.config.deviceType == 'browser') {
    //dirImg = "res/";
    //dirMusic = "res/Music/";
    //musicSuffix = "";
}

//Naming Convention, s = sprite?

var s_hero = dir + "MiG-51S-top.png"; //Hero.png
var s_aircraft = dir + "F22-B_03.png";

var s_bg = dir + "hud_background.png"; //
var s_hud_bomb = dir + "hud_bomb.png";
var s_hud_life = dir + "hud_hp.png";
var s_hudfont = dir + "hudfont.fnt";
var s_bullets = dir + "laserGreen.png";

var s_explodeSFX = dirMusic + "bomb" + musicSuffix;
var s_shotSFX = dirMusic + "shot" + musicSuffix;

var s_Enemy = dirImg + "Enemy.png";

var s_bullet = dirImg + "bullet.png";

//music
var s_bgMusic = dirMusic + "Chaoz-Fantasy-8-Bit" + musicSuffix;


//plist

var g_ressources = [
    //image
    {type:"image", src:s_hero},
    {type:"image", src:s_bg},
    {type:"image", src:s_hud_bomb},
    {type:"image", src:s_hud_life},
    {type:"image", src:s_aircraft},
    {type:"image", src:s_bullets},


    {type:"sound", src:s_explodeSFX},
    {type:"sound", src:s_shotSFX},
    //music
    {type:"sound", src:s_bgMusic},

    //effect
    // FNT
    {type:"fnt", src:s_hudfont}

];
