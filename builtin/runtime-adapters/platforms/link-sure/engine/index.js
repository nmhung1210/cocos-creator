do {
    if (typeof wuji === 'undefined') {
        console.error("not quick game platform");
        break;
    }
    window.__globalAdapter = wuji;
    require('./fs-utils.js');
    require('../../../common/engine/index.js');
} while (false)

