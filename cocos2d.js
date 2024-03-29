var ACE = ACE || {};

(function () {
    var d = document;
    var c = {
        box2d:false,
        //chipmunk:true,
        menuType:'canvas', //whether to use canvas mode menu or dom menu
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        showFPS:true,
        frameRate:60,
        loadExtension:true,
        tag:'gameCanvas', //the dom element to run cocos2d on

        //engineDir:'../cocos2d/',
        SingleEngineFile:'cocos2d-html5.min.js',
        appFiles:[
            'src/config/GameConfig.js',
            'src/config/EnemyType.js',
            'src/HudLayer.js',
            'src/Bullet.js',
            'src/Enemy.js',
            'src/GameLayer.js',
            'src/Hero.js',
            'src/resource.js',
            'src/mains.js'
        ]
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile


    });
})();
