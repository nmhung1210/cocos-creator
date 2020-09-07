
const {EventEmitter} = require('events');

class base {
    constructor() {
        this.eventMitter = new EventEmitter();
    }

    on(event, cb) {
        this.eventMitter.on(event, cb);
    }

    emit(event, ...args) {
        this.eventMitter.emit(event, ...args);
    }

}

module.exports = base;