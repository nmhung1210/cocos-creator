do {
    if (typeof hbs === 'undefined') {
        console.error("not quick game platform");
        break;
    }
    window.__globalAdapter = hbs;
    require('./fs-utils.js');
    require('../../../common/engine/index.js');
    require('../../../common/engine/native-renderer.js');
} while (false)
