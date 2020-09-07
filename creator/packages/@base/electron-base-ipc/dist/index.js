"use strict";let Handler;function broadcast(e,...n){if(!Handler.broadcast)throw"Only the main process can broadcast messages";return Handler.broadcast(e,...n)}function emit(e,...n){return Handler.emit(e,...n)}function sendToWin(e,n,...r){if(!Handler.sendToWin)throw"Only the main process can be sent to the window";return Handler.sendToWin(e,n,...r)}function send(e,...n){if(!Handler.send)throw"Only the render process has a send method";return Handler.send(e,...n)}function sendSync(e,...n){if(!Handler.sendSync)throw"Only the render process has a sendSync method";return Handler.sendSync(e,...n)}function on(e,n){return Handler.on(e,n)}function once(e,n){return Handler.once(e,n)}function removeListener(e,n){return Handler.removeListener(e,n)}function removeAllListeners(e){return Handler.removeAllListeners(e)}function registerChannel(e){return Handler.registerChannel(e)}function unregisterChannel(e){return Handler.unregisterChannel(e)}function sendToChannel(e,n,...r){return Handler.sendToChannel(e,n,...r)}function sendToContent(e,n,...r){return Handler.sendToContent(e,n,...r)}Object.defineProperty(exports,"__esModule",{value:!0}),Handler="browser"===process.type?require("./browser"):require("./renderer"),exports._events=Handler._events,exports.broadcast=broadcast,exports.emit=emit,exports.sendToWin=sendToWin,exports.send=send,exports.sendSync=sendSync,exports.on=on,exports.once=once,exports.removeListener=removeListener,exports.removeAllListeners=removeAllListeners,exports.registerChannel=registerChannel,exports.unregisterChannel=unregisterChannel,exports.sendToChannel=sendToChannel,exports.sendToContent=sendToContent;