let base = require('./base');
class log extends base {
    constructor() {
        super();
        this.DEBUG = "debug";
        this.LOG = 'log';
        this.WARN = 'warn';
        this.ERROR = 'error';
        this.logs = [];
    }

    debug(...str) {
        this.logs.push({type: this.DEBUG, content: str.join(" ")});
    }

    warn(...str) {
        this.logs.push({type: this.WARN, content: str.join(" ")});

    }

    error(...str) {
        this.logs.push({type: this.ERROR, content: str.join(" ")});

    }

    log(...str) {
        this.logs.push({type: this.LOG, content: str.join(" ")});
    }

    clear() {
        this.logs.length = 0;
    }
}

module.exports = new log();

