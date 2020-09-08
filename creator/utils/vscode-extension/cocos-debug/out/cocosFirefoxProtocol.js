"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EE = require('events');
var CocosFXEvent = (function () {
    function CocosFXEvent(event, body) {
        this.event = event;
        if (body) {
            this.body = body;
        }
    }
    return CocosFXEvent;
}());
exports.CocosFXEvent = CocosFXEvent;
/**
 * Set of protocol messages that affect thread state, and the
 * state the actor is in after each message.
 */
exports.ThreadStateTypes = {
    'paused': 'paused',
    'resumed': 'attached',
    'detached': 'detached'
};
/**
 * Set of protocol messages that are sent by the server without a prior request
 * by the client.
 */
exports.UnsolicitedNotifications = {
    'consoleAPICall': 'consoleAPICall',
    'eventNotification': 'eventNotification',
    'fileActivity': 'fileActivity',
    'lastPrivateContextExited': 'lastPrivateContextExited',
    'logMessage': 'logMessage',
    'networkEvent': 'networkEvent',
    'networkEventUpdate': 'networkEventUpdate',
    'newGlobal': 'newGlobal',
    'newScript': 'newScript',
    'tabDetached': 'tabDetached',
    'tabListChanged': 'tabListChanged',
    'reflowActivity': 'reflowActivity',
    'addonListChanged': 'addonListChanged',
    'tabNavigated': 'tabNavigated',
    'frameUpdate': 'frameUpdate',
    'pageError': 'pageError',
    'documentLoad': 'documentLoad',
    'enteredFrame': 'enteredFrame',
    'exitedFrame': 'exitedFrame',
    'appOpen': 'appOpen',
    'appClose': 'appClose',
    'appInstall': 'appInstall',
    'appUninstall': 'appUninstall',
    'evaluationResult': 'evaluationResult'
};
/**
 * Set of pause types that are sent by the server and not as an immediate
 * response to a client request.
 */
exports.UnsolicitedPauses = {
    'resumeLimit': 'resumeLimit',
    'debuggerStatement': 'debuggerStatement',
    'breakpoint': 'breakpoint',
    'DOMEvent': 'DOMEvent',
    'watchpoint': 'watchpoint',
    'exception': 'exception'
};
var CocosFXProtocol = (function (_super) {
    __extends(CocosFXProtocol, _super);
    function CocosFXProtocol() {
        _super.apply(this, arguments);
        // first call back is null for response of root
        this._pendingRequests = [null];
        this._rawData = '';
        this._bodyStartIndex = 0;
        this._bodyLength = 0;
    }
    CocosFXProtocol.prototype.startDispatch = function (inStream, outStream) {
        var _this = this;
        this._writableStream = outStream;
        inStream.on('data', function (data) { return _this.execute(data); });
        inStream.on('close', function () {
            _this.emitEvent(new CocosFXEvent('close'));
        });
        inStream.on('error', function (error) {
            _this.emitEvent(new CocosFXEvent('error', 'input stream error'));
        });
        outStream.on('error', function (error) {
            _this.emitEvent(new CocosFXEvent('error', 'error happend in send request'));
        });
        inStream.resume();
    };
    CocosFXProtocol.prototype.command = function (request, cb) {
        this._command(request, cb);
    };
    CocosFXProtocol.prototype.command2 = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._command(request, function (result) {
                resolve(result);
            });
        });
    };
    /**
     * This command doesn't send any request, it just to skip one packet received.
     */
    CocosFXProtocol.prototype.dummyCommand = function () {
        this._pendingRequests.push(null);
    };
    CocosFXProtocol.prototype._command = function (request, cb) {
        if (cb) {
            this._pendingRequests.push(cb);
        }
        else {
            this._pendingRequests.push(null);
        }
        this.send(request);
    };
    CocosFXProtocol.prototype.emitEvent = function (event) {
        this.emit(event.event, event);
    };
    CocosFXProtocol.prototype.send = function (request) {
        var content = JSON.stringify(request);
        var length = content.length;
        var packet = length.toString() + ':' + content;
        if (this._writableStream) {
            this._writableStream.write(packet);
        }
    };
    CocosFXProtocol.prototype.execute = function (data) {
        this._rawData += data.toString();
        var packet;
        while (packet = this.extractPacket()) {
            try {
                var body = JSON.parse(packet);
                var cb = void 0;
                if (!(body.type in exports.UnsolicitedNotifications) &&
                    !(body.type === exports.ThreadStateTypes.paused &&
                        body.why.type in exports.UnsolicitedPauses)) {
                    cb = this._pendingRequests.shift();
                }
                if (body.type in exports.ThreadStateTypes) {
                    this.emitEvent(new CocosFXEvent('threadState', body));
                }
                if (cb) {
                    cb(body);
                }
            }
            catch (e) {
                // Can not parse the message from remote.
                this.emitEvent(new CocosFXEvent('error', 'received error packet: invalid content: ' + packet));
            }
        }
    };
    CocosFXProtocol.prototype.extractPacket = function () {
        if (this._rawData === '') {
            return;
        }
        if (this._bodyStartIndex === 0) {
            var sep = this._rawData.indexOf(':');
            if (sep < 0) {
                // not enough data received
                return;
            }
            this._bodyStartIndex = sep + 1;
        }
        if (this._bodyLength === 0) {
            var countString = this._rawData.substring(0, this._bodyStartIndex - 1);
            if (!/^[0-9]+$/.test(countString)) {
                this.emitEvent(new CocosFXEvent('error', 'received error packet: invalid length: ' + countString));
                return;
            }
            this._bodyLength = parseInt(countString);
        }
        // The body length is byte length
        var resRawByteLength = Buffer.byteLength(this._rawData, 'utf8');
        if (resRawByteLength - this._bodyStartIndex >= this._bodyLength) {
            var buf = new Buffer(resRawByteLength);
            buf.write(this._rawData);
            var packet = buf.slice(this._bodyStartIndex, this._bodyStartIndex + this._bodyLength).toString('utf8');
            this._rawData = buf.slice(this._bodyStartIndex + this._bodyLength).toString();
            // console.log('_bodyStartIndex: ' + this._bodyStartIndex);
            // console.log('_bodyLength: ' + this._bodyLength);
            // console.log('resRawByteLength: ' + resRawByteLength);
            this._bodyStartIndex = 0;
            this._bodyLength = 0;
            return packet;
        }
    };
    return CocosFXProtocol;
}(EE.EventEmitter));
exports.CocosFXProtocol = CocosFXProtocol;
//# sourceMappingURL=cocosFirefoxProtocol.js.map