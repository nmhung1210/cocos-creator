do {
    if (typeof qg === 'undefined') {
        console.error("not quick game platform");
        break;
    }
    window.__globalAdapter = qg;
    require('./fs-utils.js');
    require('../../../common/engine/index.js');
    require('./rt-videoplayer.js');
} while (false)
