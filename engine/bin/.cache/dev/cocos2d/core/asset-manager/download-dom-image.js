
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-dom-image.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var _require = require('./utilities'),
    parseParameters = _require.parseParameters;

function downloadDomImage(url, options, onComplete) {
  var _parseParameters = parseParameters(options, undefined, onComplete),
      options = _parseParameters.options,
      onComplete = _parseParameters.onComplete;

  var img = new Image();

  if (window.location.protocol !== 'file:') {
    img.crossOrigin = 'anonymous';
  }

  function loadCallback() {
    img.removeEventListener('load', loadCallback);
    img.removeEventListener('error', errorCallback);
    onComplete && onComplete(null, img);
  }

  function errorCallback() {
    img.removeEventListener('load', loadCallback);
    img.removeEventListener('error', errorCallback);
    onComplete && onComplete(new Error(cc.debug.getError(4930, url)));
  }

  img.addEventListener('load', loadCallback);
  img.addEventListener('error', errorCallback);
  img.src = url;
  return img;
}

module.exports = downloadDomImage;
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_engine__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZG93bmxvYWQtZG9tLWltYWdlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwYXJzZVBhcmFtZXRlcnMiLCJkb3dubG9hZERvbUltYWdlIiwidXJsIiwib3B0aW9ucyIsIm9uQ29tcGxldGUiLCJ1bmRlZmluZWQiLCJpbWciLCJJbWFnZSIsIndpbmRvdyIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJjcm9zc09yaWdpbiIsImxvYWRDYWxsYmFjayIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlcnJvckNhbGxiYWNrIiwiRXJyb3IiLCJjYyIsImRlYnVnIiwiZ2V0RXJyb3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3JjIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF5QjRCQSxPQUFPLENBQUMsYUFBRDtJQUEzQkMsMkJBQUFBOztBQUVSLFNBQVNDLGdCQUFULENBQTJCQyxHQUEzQixFQUFnQ0MsT0FBaEMsRUFBeUNDLFVBQXpDLEVBQXFEO0FBQUEseUJBQ25CSixlQUFlLENBQUNHLE9BQUQsRUFBVUUsU0FBVixFQUFxQkQsVUFBckIsQ0FESTtBQUFBLE1BQzNDRCxPQUQyQyxvQkFDM0NBLE9BRDJDO0FBQUEsTUFDbENDLFVBRGtDLG9CQUNsQ0EsVUFEa0M7O0FBR2pELE1BQUlFLEdBQUcsR0FBRyxJQUFJQyxLQUFKLEVBQVY7O0FBRUEsTUFBSUMsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxRQUFoQixLQUE2QixPQUFqQyxFQUEwQztBQUN0Q0osSUFBQUEsR0FBRyxDQUFDSyxXQUFKLEdBQWtCLFdBQWxCO0FBQ0g7O0FBRUQsV0FBU0MsWUFBVCxHQUF5QjtBQUNyQk4sSUFBQUEsR0FBRyxDQUFDTyxtQkFBSixDQUF3QixNQUF4QixFQUFnQ0QsWUFBaEM7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxtQkFBSixDQUF3QixPQUF4QixFQUFpQ0MsYUFBakM7QUFDQVYsSUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBRCxFQUFPRSxHQUFQLENBQXhCO0FBQ0g7O0FBRUQsV0FBU1EsYUFBVCxHQUEwQjtBQUN0QlIsSUFBQUEsR0FBRyxDQUFDTyxtQkFBSixDQUF3QixNQUF4QixFQUFnQ0QsWUFBaEM7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxtQkFBSixDQUF3QixPQUF4QixFQUFpQ0MsYUFBakM7QUFDQVYsSUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBSVcsS0FBSixDQUFVQyxFQUFFLENBQUNDLEtBQUgsQ0FBU0MsUUFBVCxDQUFrQixJQUFsQixFQUF3QmhCLEdBQXhCLENBQVYsQ0FBRCxDQUF4QjtBQUNIOztBQUVESSxFQUFBQSxHQUFHLENBQUNhLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCUCxZQUE3QjtBQUNBTixFQUFBQSxHQUFHLENBQUNhLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCTCxhQUE5QjtBQUNBUixFQUFBQSxHQUFHLENBQUNjLEdBQUosR0FBVWxCLEdBQVY7QUFDQSxTQUFPSSxHQUFQO0FBQ0g7O0FBRURlLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJCLGdCQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycyB9ID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcblxuZnVuY3Rpb24gZG93bmxvYWREb21JbWFnZSAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XG5cbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonKSB7XG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRDYWxsYmFjayAoKSB7XG4gICAgICAgIGltZy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShudWxsLCBpbWcpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBlcnJvckNhbGxiYWNrICgpIHtcbiAgICAgICAgaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICBpbWcucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG5ldyBFcnJvcihjYy5kZWJ1Zy5nZXRFcnJvcig0OTMwLCB1cmwpKSk7XG4gICAgfVxuXG4gICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkQ2FsbGJhY2spO1xuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xuICAgIGltZy5zcmMgPSB1cmw7XG4gICAgcmV0dXJuIGltZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb3dubG9hZERvbUltYWdlOyJdLCJzb3VyY2VSb290IjoiLyJ9