do {
    if (typeof qg === 'undefined') {
        console.error("not quick game platform");
        break;
    }
    window.__globalAdapter = qg;
    require('./fs-utils.js');
    require('../../../common/engine/index.js');
    require('../../../common/engine/rt-feature-premut-alpha.js');
    require('../../../common/engine/rt-sys.js');
    require('../../../common/engine/rt_input.js');
    require('../../../common/engine/rt-game.js');
    require('../../../common/engine/rt-jsb.js');
    require('../../../common/engine/jsb-node.js');
    require('./jsb-audio.js');
    require('./AssetManager.js');
    require('../../../common/engine/jsb-editbox.js');
} while (false)
