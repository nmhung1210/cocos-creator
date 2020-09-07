let base = require('./base');
class log extends base {
    constructor() {
        super();
        this.DEBUG = "debug";
        this.LOG = 'log';
        this.WARN = 'warn';
        this.ERROR = 'error';
    }

    debug(...str) {
        this.emit('log', this.DEBUG, ...str);
    }

    warn(...str) {
        this.emit('log', this.WARN, ...str);
    }

    log(...str) {
        this.emit('log', this.LOG, ...str);
    }

    error(...str) {
        this.emit('log', this.ERROR, ...str);
    }
}

module.exports = new log();

