
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/downloader.js';
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

/**
 * @module cc.AssetManager
 */
var js = require('../platform/js');

var debug = require('../CCDebug');

var _require = require('./font-loader'),
    loadFont = _require.loadFont;

var callInNextTick = require('../platform/utils').callInNextTick;

var downloadDomImage = require('./download-dom-image');

var downloadDomAudio = require('./download-dom-audio');

var downloadFile = require('./download-file');

var downloadScript = require('./download-script.js');

var Cache = require('./cache');

var _require2 = require('./shared'),
    files = _require2.files;

var _require3 = require('../platform/CCSys'),
    __audioSupport = _require3.__audioSupport,
    capabilities = _require3.capabilities;

var _require4 = require('./utilities'),
    urlAppendTimestamp = _require4.urlAppendTimestamp,
    retry = _require4.retry;

var REGEX = /^\w+:\/\/.*/;
var formatSupport = __audioSupport.format || [];

var unsupported = function unsupported(url, options, onComplete) {
  onComplete(new Error(debug.getError(4927)));
};

var downloadAudio = function downloadAudio(url, options, onComplete) {
  // web audio need to download file as arrayBuffer
  if (options.audioLoadMode !== cc.AudioClip.LoadMode.DOM_AUDIO) {
    downloadArrayBuffer(url, options, onComplete);
  } else {
    downloadDomAudio(url, options, onComplete);
  }
};

var downloadAudio = !CC_EDITOR || !Editor.isMainProcess ? formatSupport.length === 0 ? unsupported : __audioSupport.WEB_AUDIO ? downloadAudio : downloadDomAudio : null;

var downloadImage = function downloadImage(url, options, onComplete) {
  // if createImageBitmap is valid, we can transform blob to ImageBitmap. Otherwise, just use HTMLImageElement to load
  var func = capabilities.imageBitmap && cc.macro.ALLOW_IMAGE_BITMAP ? downloadBlob : downloadDomImage;
  func.apply(this, arguments);
};

var downloadBlob = function downloadBlob(url, options, onComplete) {
  options.responseType = "blob";
  downloadFile(url, options, options.onFileProgress, onComplete);
};

var downloadJson = function downloadJson(url, options, onComplete) {
  options.responseType = "json";
  downloadFile(url, options, options.onFileProgress, function (err, data) {
    if (!err && typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        err = e;
      }
    }

    onComplete && onComplete(err, data);
  });
};

var downloadArrayBuffer = function downloadArrayBuffer(url, options, onComplete) {
  options.responseType = "arraybuffer";
  downloadFile(url, options, options.onFileProgress, onComplete);
};

var downloadText = function downloadText(url, options, onComplete) {
  options.responseType = "text";
  downloadFile(url, options, options.onFileProgress, onComplete);
};

var downloadVideo = function downloadVideo(url, options, onComplete) {
  onComplete(null, url);
};

var downloadBundle = function downloadBundle(nameOrUrl, options, onComplete) {
  var bundleName = cc.path.basename(nameOrUrl);
  var url = nameOrUrl;
  if (!REGEX.test(url)) url = 'assets/' + bundleName;
  var version = options.version || downloader.bundleVers[bundleName];
  var count = 0;
  var config = url + "/config." + (version ? version + '.' : '') + "json";
  var out = null,
      error = null;
  downloadJson(config, options, function (err, response) {
    if (err) {
      error = err;
    }

    out = response;
    out && (out.base = url + '/');
    count++;

    if (count === 2) {
      onComplete(error, out);
    }
  });
  var js = url + "/index." + (version ? version + '.' : '') + "js";
  downloadScript(js, options, function (err) {
    if (err) {
      error = err;
    }

    count++;

    if (count === 2) {
      onComplete(error, out);
    }
  });
};

var _downloading = new Cache();

var _queue = [];
var _queueDirty = false; // the number of loading thread

var _totalNum = 0; // the number of request that launched in this period

var _totalNumThisPeriod = 0; // last time, if now - lastTime > period, refresh _totalNumThisPeriod.

var _lastDate = -1; // if _totalNumThisPeriod equals max, move request to next period using setTimeOut.


var _checkNextPeriod = false;

var updateTime = function updateTime() {
  var now = Date.now(); // use deltaTime as period

  if (now - _lastDate > cc.director._deltaTime * 1000) {
    _totalNumThisPeriod = 0;
    _lastDate = now;
  }
}; // handle the rest request in next period


var handleQueue = function handleQueue(maxConcurrency, maxRequestsPerFrame) {
  _checkNextPeriod = false;
  updateTime();

  while (_queue.length > 0 && _totalNum < maxConcurrency && _totalNumThisPeriod < maxRequestsPerFrame) {
    if (_queueDirty) {
      _queue.sort(function (a, b) {
        return a.priority - b.priority;
      });

      _queueDirty = false;
    }

    var nextOne = _queue.pop();

    if (!nextOne) {
      break;
    }

    _totalNum++;
    _totalNumThisPeriod++;
    nextOne.invoke();
  }

  if (_queue.length > 0 && _totalNum < maxConcurrency) {
    callInNextTick(handleQueue, maxConcurrency, maxRequestsPerFrame);
    _checkNextPeriod = true;
  }
};
/**
 * !#en
 * Control all download process, it is a singleton. All member can be accessed with `cc.assetManager.downloader` , it can download several types of files:
 * 1. Text
 * 2. Image
 * 3. Audio
 * 4. Assets
 * 5. Scripts
 * 
 * !#zh
 * 管理所有下载过程，downloader 是个单例，所有成员能通过 `cc.assetManager.downloader` 访问，它能下载以下几种类型的文件：
 * 1. 文本
 * 2. 图片
 * 3. 音频
 * 4. 资源
 * 5. 脚本
 * 
 * @class Downloader
 */


var downloader = {
  /**
   * !#en 
   * The maximum number of concurrent when downloading
   * 
   * !#zh
   * 下载时的最大并发数
   * 
   * @property maxConcurrency
   * @type {number}
   * @default 6
   */
  maxConcurrency: 6,

  /**
   * !#en 
   * The maximum number of request can be launched per frame when downloading
   * 
   * !#zh
   * 下载时每帧可以启动的最大请求数
   * 
   * @property maxRequestsPerFrame
   * @type {number}
   * @default 6
   */
  maxRequestsPerFrame: 6,

  /**
   * !#en
   * The max number of retries when fail
   *  
   * !#zh
   * 失败重试次数
   * 
   * @property maxRetryCount
   * @type {Number}
   */
  maxRetryCount: 3,
  appendTimeStamp: false,
  limited: true,

  /**
   * !#en
   * Wait for while before another retry, unit: ms
   * 
   * !#zh
   * 重试的间隔时间
   * 
   * @property retryInterval
   * @type {Number}
   */
  retryInterval: 2000,
  bundleVers: null,

  /**
   * !#en
   * Use Image element to download image
   *  
   * !#zh
   * 使用 Image 元素来下载图片
   * 
   * @method downloadDomImage
   * @param {string} url - Url of the image
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [onComplete] - Callback when image loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {HTMLImageElement} onComplete.img - The loaded Image element, null if error occurred
   * @returns {HTMLImageElement} The image element
   * 
   * @example
   * downloadDomImage('http://example.com/test.jpg', null, (err, img) => console.log(err));
   * 
   * @typescript
   * downloadDomImage(url: string, options?: Record<string, any> , onComplete?: (err: Error, img: HTMLImageElement) => void): HTMLImageElement
   * downloadDomImage(url: string, onComplete?: (err: Error, img: HTMLImageElement) => void): HTMLImageElement
   */
  downloadDomImage: downloadDomImage,

  /**
   * !#en
   * Use audio element to download audio
   * 
   * !#zh
   * 使用 Audio 元素来下载音频 
   * 
   * @method downloadDomAudio
   * @param {string} url - Url of the audio
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [onComplete] - Callback invoked when audio loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {HTMLAudioElement} onComplete.audio - The loaded audio element, null if error occurred
   * @returns {HTMLAudioElement} The audio element
   * 
   * @example
   * downloadDomAudio('http://example.com/test.mp3', null, (err, audio) => console.log(err));
   * 
   * @typescript
   * downloadDomAudio(url: string, options?: Record<string, any>, onComplete?: (err: Error, audio: HTMLAudioElement) => void): HTMLAudioElement
   * downloadDomAudio(url: string, onComplete?: (err: Error, audio: HTMLAudioElement) => void): HTMLAudioElement
   */
  downloadDomAudio: downloadDomAudio,

  /**
   * !#en
   * Use XMLHttpRequest to download file
   * 
   * !#zh
   * 使用 XMLHttpRequest 来下载文件
   * 
   * @method downloadFile
   * @param {string} url - Url of the file
   * @param {Object} [options] - Some optional paramters
   * @param {string} [options.responseType] - Indicate which type of content should be returned
   * @param {boolean} [options.withCredentials] - Indicate whether or not cross-site Access-Contorl requests should be made using credentials
   * @param {string} [options.mimeType] - Indicate which type of content should be returned. In some browsers, responseType does't work, you can use mimeType instead
   * @param {Number} [options.timeout] - Represent the number of ms a request can take before being terminated.
   * @param {Object} [options.header] - The header should be tranferred to server
   * @param {Function} [onFileProgress] - Callback continuously during download is processing
   * @param {Number} onFileProgress.loaded - Size of downloaded content.
   * @param {Number} onFileProgress.total - Total size of content.
   * @param {Function} [onComplete] - Callback when file loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.response - The loaded content, null if error occurred, type of content can be indicated by options.responseType
   * @returns {XMLHttpRequest} The xhr to be send
   * 
   * @example
   * downloadFile('http://example.com/test.bin', {responseType: 'arraybuffer'}, null, (err, arrayBuffer) => console.log(err));
   * 
   * @typescript
   * downloadFile(url: string, options?: Record<string, any>, onFileProgress?: (loaded: Number, total: Number) => void, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   * downloadFile(url: string, onFileProgress?: (loaded: Number, total: Number) => void, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   * downloadFile(url: string, options?: Record<string, any>, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   * downloadFile(url: string, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   */
  downloadFile: downloadFile,

  /**
   * !#en
   * Load script 
   * 
   * !#zh
   * 加载脚本
   * 
   * @method downloadScript
   * @param {string} url - Url of the script
   * @param {Object} [options] - Some optional paramters
   * @param {boolean} [options.isAsync] - Indicate whether or not loading process should be async
   * @param {Function} [onComplete] - Callback when script loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * 
   * @example
   * downloadScript('http://localhost:8080/index.js', null, (err) => console.log(err));
   * 
   * @typescript
   * downloadScript(url: string, options?: Record<string, any>, onComplete?: (err: Error) => void): void;
   * downloadScript(url: string, onComplete?: (err: Error) => void): void;
   */
  downloadScript: downloadScript,
  init: function init(bundleVers) {
    _downloading.clear();

    _queue.length = 0;
    this.bundleVers = bundleVers || Object.create(null);
  },

  /**
   * !#en
   * Register custom handler if you want to change default behavior or extend downloader to download other format file
   * 
   * !#zh
   * 当你想修改默认行为或者拓展 downloader 来下载其他格式文件时可以注册自定义的 handler 
   * 
   * @method register
   * @param {string|Object} type - Extension likes '.jpg' or map likes {'.jpg': jpgHandler, '.png': pngHandler}
   * @param {Function} [handler] - handler
   * @param {string} handler.url - url
   * @param {Object} handler.options - some optional paramters will be transferred to handler.
   * @param {Function} handler.onComplete - callback when finishing downloading
   * 
   * @example
   * downloader.register('.tga', (url, options, onComplete) => onComplete(null, null));
   * downloader.register({'.tga': (url, options, onComplete) => onComplete(null, null), '.ext': (url, options, onComplete) => onComplete(null, null)});
   * 
   * @typescript
   * register(type: string, handler: (url: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void): void
   * register(map: Record<string, (url: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void>): void
   */
  register: function register(type, handler) {
    if (typeof type === 'object') {
      js.mixin(downloaders, type);
    } else {
      downloaders[type] = handler;
    }
  },

  /**
   * !#en
   * Use corresponding handler to download file under limitation 
   * 
   * !#zh
   * 在限制下使用对应的 handler 来下载文件
   * 
   * @method download
   * @param {string} url - The url should be downloaded
   * @param {string} type - The type indicates that which handler should be used to download, such as '.jpg'
   * @param {Object} options - some optional paramters will be transferred to the corresponding handler.
   * @param {Function} [options.onFileProgress] - progressive callback will be transferred to handler.
   * @param {Number} [options.maxRetryCount] - How many times should retry when download failed
   * @param {Number} [options.maxConcurrency] - The maximum number of concurrent when downloading
   * @param {Number} [options.maxRequestsPerFrame] - The maximum number of request can be launched per frame when downloading
   * @param {Number} [options.priority] - The priority of this url, default is 0, the greater number is higher priority.
   * @param {Function} onComplete - callback when finishing downloading
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.contetnt - The downloaded file
   * 
   * @example
   * download('http://example.com/test.tga', '.tga', {onFileProgress: (loaded, total) => console.lgo(loaded/total)}, onComplete: (err) => console.log(err));
   * 
   * @typescript
   * download(id: string, url: string, type: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void): void
   */
  download: function download(id, url, type, options, onComplete) {
    var func = downloaders[type] || downloaders['default'];
    var self = this; // if it is downloaded, don't download again

    var file, downloadCallbacks;

    if (file = files.get(id)) {
      onComplete(null, file);
    } else if (downloadCallbacks = _downloading.get(id)) {
      downloadCallbacks.push(onComplete);

      for (var i = 0, l = _queue.length; i < l; i++) {
        var item = _queue[i];

        if (item.id === id) {
          var priority = options.priority || 0;

          if (item.priority < priority) {
            item.priority = priority;
            _queueDirty = true;
          }

          return;
        }
      }
    } else {
      var process = function process(index, callback) {
        if (index === 0) {
          _downloading.add(id, [onComplete]);
        }

        if (!self.limited) return func(urlAppendTimestamp(url), options, callback); // refresh

        updateTime();

        function invoke() {
          func(urlAppendTimestamp(url), options, function () {
            // when finish downloading, update _totalNum
            _totalNum--;

            if (!_checkNextPeriod && _queue.length > 0) {
              callInNextTick(handleQueue, maxConcurrency, maxRequestsPerFrame);
              _checkNextPeriod = true;
            }

            callback.apply(this, arguments);
          });
        }

        if (_totalNum < maxConcurrency && _totalNumThisPeriod < maxRequestsPerFrame) {
          invoke();
          _totalNum++;
          _totalNumThisPeriod++;
        } else {
          // when number of request up to limitation, cache the rest
          _queue.push({
            id: id,
            priority: options.priority || 0,
            invoke: invoke
          });

          _queueDirty = true;

          if (!_checkNextPeriod && _totalNum < maxConcurrency) {
            callInNextTick(handleQueue, maxConcurrency, maxRequestsPerFrame);
            _checkNextPeriod = true;
          }
        }
      }; // when retry finished, invoke callbacks


      var finale = function finale(err, result) {
        if (!err) files.add(id, result);

        var callbacks = _downloading.remove(id);

        for (var _i = 0, _l = callbacks.length; _i < _l; _i++) {
          callbacks[_i](err, result);
        }
      };

      // if download fail, should retry
      var maxRetryCount = options.maxRetryCount || this.maxRetryCount;
      var maxConcurrency = options.maxConcurrency || this.maxConcurrency;
      var maxRequestsPerFrame = options.maxRequestsPerFrame || this.maxRequestsPerFrame;
      retry(process, maxRetryCount, this.retryInterval, finale);
    }
  }
}; // dafault handler map

var downloaders = {
  // Images
  '.png': downloadImage,
  '.jpg': downloadImage,
  '.bmp': downloadImage,
  '.jpeg': downloadImage,
  '.gif': downloadImage,
  '.ico': downloadImage,
  '.tiff': downloadImage,
  '.webp': downloadImage,
  '.image': downloadImage,
  '.pvr': downloadArrayBuffer,
  '.pkm': downloadArrayBuffer,
  // Audio
  '.mp3': downloadAudio,
  '.ogg': downloadAudio,
  '.wav': downloadAudio,
  '.m4a': downloadAudio,
  // Txt
  '.txt': downloadText,
  '.xml': downloadText,
  '.vsh': downloadText,
  '.fsh': downloadText,
  '.atlas': downloadText,
  '.tmx': downloadText,
  '.tsx': downloadText,
  '.json': downloadJson,
  '.ExportJson': downloadJson,
  '.plist': downloadText,
  '.fnt': downloadText,
  // font
  '.font': loadFont,
  '.eot': loadFont,
  '.ttf': loadFont,
  '.woff': loadFont,
  '.svg': loadFont,
  '.ttc': loadFont,
  // Video
  '.mp4': downloadVideo,
  '.avi': downloadVideo,
  '.mov': downloadVideo,
  '.mpg': downloadVideo,
  '.mpeg': downloadVideo,
  '.rm': downloadVideo,
  '.rmvb': downloadVideo,
  // Binary
  '.binary': downloadArrayBuffer,
  '.bin': downloadArrayBuffer,
  '.dbbin': downloadArrayBuffer,
  '.skel': downloadArrayBuffer,
  '.js': downloadScript,
  'bundle': downloadBundle,
  'default': downloadText
};
module.exports = downloader;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZG93bmxvYWRlci5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJkZWJ1ZyIsImxvYWRGb250IiwiY2FsbEluTmV4dFRpY2siLCJkb3dubG9hZERvbUltYWdlIiwiZG93bmxvYWREb21BdWRpbyIsImRvd25sb2FkRmlsZSIsImRvd25sb2FkU2NyaXB0IiwiQ2FjaGUiLCJmaWxlcyIsIl9fYXVkaW9TdXBwb3J0IiwiY2FwYWJpbGl0aWVzIiwidXJsQXBwZW5kVGltZXN0YW1wIiwicmV0cnkiLCJSRUdFWCIsImZvcm1hdFN1cHBvcnQiLCJmb3JtYXQiLCJ1bnN1cHBvcnRlZCIsInVybCIsIm9wdGlvbnMiLCJvbkNvbXBsZXRlIiwiRXJyb3IiLCJnZXRFcnJvciIsImRvd25sb2FkQXVkaW8iLCJhdWRpb0xvYWRNb2RlIiwiY2MiLCJBdWRpb0NsaXAiLCJMb2FkTW9kZSIsIkRPTV9BVURJTyIsImRvd25sb2FkQXJyYXlCdWZmZXIiLCJDQ19FRElUT1IiLCJFZGl0b3IiLCJpc01haW5Qcm9jZXNzIiwibGVuZ3RoIiwiV0VCX0FVRElPIiwiZG93bmxvYWRJbWFnZSIsImZ1bmMiLCJpbWFnZUJpdG1hcCIsIm1hY3JvIiwiQUxMT1dfSU1BR0VfQklUTUFQIiwiZG93bmxvYWRCbG9iIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJyZXNwb25zZVR5cGUiLCJvbkZpbGVQcm9ncmVzcyIsImRvd25sb2FkSnNvbiIsImVyciIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJlIiwiZG93bmxvYWRUZXh0IiwiZG93bmxvYWRWaWRlbyIsImRvd25sb2FkQnVuZGxlIiwibmFtZU9yVXJsIiwiYnVuZGxlTmFtZSIsInBhdGgiLCJiYXNlbmFtZSIsInRlc3QiLCJ2ZXJzaW9uIiwiZG93bmxvYWRlciIsImJ1bmRsZVZlcnMiLCJjb3VudCIsImNvbmZpZyIsIm91dCIsImVycm9yIiwicmVzcG9uc2UiLCJiYXNlIiwiX2Rvd25sb2FkaW5nIiwiX3F1ZXVlIiwiX3F1ZXVlRGlydHkiLCJfdG90YWxOdW0iLCJfdG90YWxOdW1UaGlzUGVyaW9kIiwiX2xhc3REYXRlIiwiX2NoZWNrTmV4dFBlcmlvZCIsInVwZGF0ZVRpbWUiLCJub3ciLCJEYXRlIiwiZGlyZWN0b3IiLCJfZGVsdGFUaW1lIiwiaGFuZGxlUXVldWUiLCJtYXhDb25jdXJyZW5jeSIsIm1heFJlcXVlc3RzUGVyRnJhbWUiLCJzb3J0IiwiYSIsImIiLCJwcmlvcml0eSIsIm5leHRPbmUiLCJwb3AiLCJpbnZva2UiLCJtYXhSZXRyeUNvdW50IiwiYXBwZW5kVGltZVN0YW1wIiwibGltaXRlZCIsInJldHJ5SW50ZXJ2YWwiLCJpbml0IiwiY2xlYXIiLCJPYmplY3QiLCJjcmVhdGUiLCJyZWdpc3RlciIsInR5cGUiLCJoYW5kbGVyIiwibWl4aW4iLCJkb3dubG9hZGVycyIsImRvd25sb2FkIiwiaWQiLCJzZWxmIiwiZmlsZSIsImRvd25sb2FkQ2FsbGJhY2tzIiwiZ2V0IiwicHVzaCIsImkiLCJsIiwiaXRlbSIsInByb2Nlc3MiLCJpbmRleCIsImNhbGxiYWNrIiwiYWRkIiwiZmluYWxlIiwicmVzdWx0IiwiY2FsbGJhY2tzIiwicmVtb3ZlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOzs7QUFHQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQXJCOztlQUNxQkEsT0FBTyxDQUFDLGVBQUQ7SUFBcEJFLG9CQUFBQTs7QUFDUixJQUFNQyxjQUFjLEdBQUdILE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRyxjQUFwRDs7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBR0osT0FBTyxDQUFDLHNCQUFELENBQWhDOztBQUNBLElBQU1LLGdCQUFnQixHQUFHTCxPQUFPLENBQUMsc0JBQUQs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c0JkLFVBQVNBLFlBdEJLO0FBdUJkLFVBQVNBLFlBdkJLO0FBd0JkLFVBQVNBLFlBeEJLO0FBeUJkLFlBQVdBLFlBekJHO0FBMkJkLFVBQVNBLFlBM0JLO0FBNEJkLFVBQVNBLFlBNUJLO0FBOEJkLFdBQVVOLFlBOUJJO0FBK0JkLGlCQUFnQkEsWUEvQkY7QUFnQ2QsWUFBV00sWUFoQ0c7QUFrQ2QsVUFBU0EsWUFsQ0s7QUFvQ2Q7QUFDQSxXQUFVakQsUUFyQ0k7QUFzQ2QsVUFBU0EsUUF0Q0s7QUF1Q2QsVUFBU0EsUUF2Q0s7QUF3Q2QsV0FBVUEsUUF4Q0k7QUF5Q2QsVUFBU0EsUUF6Q0s7QUEwQ2QsVUFBU0EsUUExQ0s7QUE0Q2Q7QUFDQSxVQUFRa0QsYUE3Q007QUE4Q2QsVUFBUUEsYUE5Q007QUErQ2QsVUFBUUEsYUEvQ007QUFnRGQsVUFBUUEsYUFoRE07QUFpRGQsV0FBU0EsYUFqREs7QUFrRGQsU0FBT0EsYUFsRE87QUFtRGQsV0FBU0EsYUFuREs7QUFxRGQ7QUFDQSxhQUFZdkIsbUJBdERFO0FBdURkLFVBQVFBLG1CQXZETTtBQXdEZCxZQUFVQSxtQkF4REk7QUF5RGQsV0FBU0EsbUJBekRLO0FBMkRkLFNBQU90QixjQTNETztBQTZEZCxZQUFVOEMsY0E3REk7QUErRGQsYUFBV0Y7QUEvREcsQ0FBbEI7QUFtRUFzRSxNQUFNLENBQUNDLE9BQVAsR0FBaUI5RCxVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcbiAqL1xuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuLi9DQ0RlYnVnJyk7XG5jb25zdCB7IGxvYWRGb250IH0gPSByZXF1aXJlKCcuL2ZvbnQtbG9hZGVyJyk7XG5jb25zdCBjYWxsSW5OZXh0VGljayA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL3V0aWxzJykuY2FsbEluTmV4dFRpY2s7XG5jb25zdCBkb3dubG9hZERvbUltYWdlID0gcmVxdWlyZSgnLi9kb3dubG9hZC1kb20taW1hZ2UnKTtcbmNvbnN0IGRvd25sb2FkRG9tQXVkaW8gPSByZXF1aXJlKCcuL2Rvd25sb2FkLWRvbS1hdWRpbycpO1xuY29uc3QgZG93bmxvYWRGaWxlID0gcmVxdWlyZSgnLi9kb3dubG9hZC1maWxlJyk7XG5jb25zdCBkb3dubG9hZFNjcmlwdCA9IHJlcXVpcmUoJy4vZG93bmxvYWQtc2NyaXB0LmpzJyk7XG5jb25zdCBDYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUnKTtcbmNvbnN0IHsgZmlsZXMgfSA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XG5jb25zdCB7IF9fYXVkaW9TdXBwb3J0LCBjYXBhYmlsaXRpZXMgfSA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDU3lzJyk7XG5jb25zdCB7IHVybEFwcGVuZFRpbWVzdGFtcCwgcmV0cnkgfSA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzJyk7XG5cbmNvbnN0IFJFR0VYID0gL15cXHcrOlxcL1xcLy4qLztcblxuXG52YXIgZm9ybWF0U3VwcG9ydCA9IF9fYXVkaW9TdXBwb3J0LmZvcm1hdCB8fCBbXTtcblxudmFyIHVuc3VwcG9ydGVkID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgIG9uQ29tcGxldGUobmV3IEVycm9yKGRlYnVnLmdldEVycm9yKDQ5MjcpKSk7XG59XG5cbnZhciBkb3dubG9hZEF1ZGlvID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgIC8vIHdlYiBhdWRpbyBuZWVkIHRvIGRvd25sb2FkIGZpbGUgYXMgYXJyYXlCdWZmZXJcbiAgICBpZiAob3B0aW9ucy5hdWRpb0xvYWRNb2RlICE9PSBjYy5BdWRpb0NsaXAuTG9hZE1vZGUuRE9NX0FVRElPKSB7XG4gICAgICAgIGRvd25sb2FkQXJyYXlCdWZmZXIodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvd25sb2FkRG9tQXVkaW8odXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcbiAgICB9XG59O1xuXG52YXIgZG93bmxvYWRBdWRpbyA9ICghQ0NfRURJVE9SIHx8ICFFZGl0b3IuaXNNYWluUHJvY2VzcykgPyAoZm9ybWF0U3VwcG9ydC5sZW5ndGggPT09IDAgPyB1bnN1cHBvcnRlZCA6IChfX2F1ZGlvU3VwcG9ydC5XRUJfQVVESU8gPyBkb3dubG9hZEF1ZGlvIDogZG93bmxvYWREb21BdWRpbykpIDogbnVsbDtcblxudmFyIGRvd25sb2FkSW1hZ2UgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgLy8gaWYgY3JlYXRlSW1hZ2VCaXRtYXAgaXMgdmFsaWQsIHdlIGNhbiB0cmFuc2Zvcm0gYmxvYiB0byBJbWFnZUJpdG1hcC4gT3RoZXJ3aXNlLCBqdXN0IHVzZSBIVE1MSW1hZ2VFbGVtZW50IHRvIGxvYWRcbiAgICB2YXIgZnVuYyA9IGNhcGFiaWxpdGllcy5pbWFnZUJpdG1hcCAmJiBjYy5tYWNyby5BTExPV19JTUFHRV9CSVRNQVAgPyBkb3dubG9hZEJsb2IgOiBkb3dubG9hZERvbUltYWdlO1xuICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbnZhciBkb3dubG9hZEJsb2IgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPSBcImJsb2JcIjtcbiAgICBkb3dubG9hZEZpbGUodXJsLCBvcHRpb25zLCBvcHRpb25zLm9uRmlsZVByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbn07XG5cbnZhciBkb3dubG9hZEpzb24gPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPSBcImpzb25cIjtcbiAgICBkb3dubG9hZEZpbGUodXJsLCBvcHRpb25zLCBvcHRpb25zLm9uRmlsZVByb2dyZXNzLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmICghZXJyICYmIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyLCBkYXRhKTtcbiAgICB9KTtcbn07XG5cbnZhciBkb3dubG9hZEFycmF5QnVmZmVyID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgIG9wdGlvbnMucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICAgIGRvd25sb2FkRmlsZSh1cmwsIG9wdGlvbnMsIG9wdGlvbnMub25GaWxlUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xufTtcblxudmFyIGRvd25sb2FkVGV4dCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9IFwidGV4dFwiO1xuICAgIGRvd25sb2FkRmlsZSh1cmwsIG9wdGlvbnMsIG9wdGlvbnMub25GaWxlUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xufTtcblxudmFyIGRvd25sb2FkVmlkZW8gPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgb25Db21wbGV0ZShudWxsLCB1cmwpO1xufTtcblxudmFyIGRvd25sb2FkQnVuZGxlID0gZnVuY3Rpb24gKG5hbWVPclVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgIGxldCBidW5kbGVOYW1lID0gY2MucGF0aC5iYXNlbmFtZShuYW1lT3JVcmwpO1xuICAgIGxldCB1cmwgPSBuYW1lT3JVcmw7XG4gICAgaWYgKCFSRUdFWC50ZXN0KHVybCkpIHVybCA9ICdhc3NldHMvJyArIGJ1bmRsZU5hbWU7XG4gICAgdmFyIHZlcnNpb24gPSBvcHRpb25zLnZlcnNpb24gfHwgZG93bmxvYWRlci5idW5kbGVWZXJzW2J1bmRsZU5hbWVdO1xuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIGNvbmZpZyA9IGAke3VybH0vY29uZmlnLiR7dmVyc2lvbiA/IHZlcnNpb24gKyAnLicgOiAnJ31qc29uYDtcbiAgICBsZXQgb3V0ID0gbnVsbCwgZXJyb3IgPSBudWxsO1xuICAgIGRvd25sb2FkSnNvbihjb25maWcsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGVycm9yID0gZXJyO1xuICAgICAgICB9XG4gICAgICAgIG91dCA9IHJlc3BvbnNlO1xuICAgICAgICBvdXQgJiYgKG91dC5iYXNlID0gdXJsICsgJy8nKTtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgaWYgKGNvdW50ID09PSAyKSB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yLCBvdXQpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIganMgPSBgJHt1cmx9L2luZGV4LiR7dmVyc2lvbiA/IHZlcnNpb24gKyAnLicgOiAnJ31qc2A7XG4gICAgZG93bmxvYWRTY3JpcHQoanMsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgZXJyb3IgPSBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKztcbiAgICAgICAgaWYgKGNvdW50ID09PSAyKSB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yLCBvdXQpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG52YXIgX2Rvd25sb2FkaW5nID0gbmV3IENhY2hlKCk7XG52YXIgX3F1ZXVlID0gW107XG52YXIgX3F1ZXVlRGlydHkgPSBmYWxzZTtcblxuLy8gdGhlIG51bWJlciBvZiBsb2FkaW5nIHRocmVhZFxudmFyIF90b3RhbE51bSA9IDA7XG5cbi8vIHRoZSBudW1iZXIgb2YgcmVxdWVzdCB0aGF0IGxhdW5jaGVkIGluIHRoaXMgcGVyaW9kXG52YXIgX3RvdGFsTnVtVGhpc1BlcmlvZCA9IDA7XG5cbi8vIGxhc3QgdGltZSwgaWYgbm93IC0gbGFzdFRpbWUgPiBwZXJpb2QsIHJlZnJlc2ggX3RvdGFsTnVtVGhpc1BlcmlvZC5cbnZhciBfbGFzdERhdGUgPSAtMTtcblxuLy8gaWYgX3RvdGFsTnVtVGhpc1BlcmlvZCBlcXVhbHMgbWF4LCBtb3ZlIHJlcXVlc3QgdG8gbmV4dCBwZXJpb2QgdXNpbmcgc2V0VGltZU91dC5cbnZhciBfY2hlY2tOZXh0UGVyaW9kID0gZmFsc2U7XG5cbnZhciB1cGRhdGVUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgIC8vIHVzZSBkZWx0YVRpbWUgYXMgcGVyaW9kXG4gICAgaWYgKG5vdyAtIF9sYXN0RGF0ZSA+IGNjLmRpcmVjdG9yLl9kZWx0YVRpbWUgKiAxMDAwKSB7XG4gICAgICAgIF90b3RhbE51bVRoaXNQZXJpb2QgPSAwO1xuICAgICAgICBfbGFzdERhdGUgPSBub3c7XG4gICAgfVxufTtcblxuLy8gaGFuZGxlIHRoZSByZXN0IHJlcXVlc3QgaW4gbmV4dCBwZXJpb2RcbnZhciBoYW5kbGVRdWV1ZSA9IGZ1bmN0aW9uIChtYXhDb25jdXJyZW5jeSwgbWF4UmVxdWVzdHNQZXJGcmFtZSkge1xuICAgIF9jaGVja05leHRQZXJpb2QgPSBmYWxzZTtcbiAgICB1cGRhdGVUaW1lKCk7XG4gICAgd2hpbGUgKF9xdWV1ZS5sZW5ndGggPiAwICYmIF90b3RhbE51bSA8IG1heENvbmN1cnJlbmN5ICYmIF90b3RhbE51bVRoaXNQZXJpb2QgPCBtYXhSZXF1ZXN0c1BlckZyYW1lKSB7XG4gICAgICAgIGlmIChfcXVldWVEaXJ0eSkge1xuICAgICAgICAgICAgX3F1ZXVlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF9xdWV1ZURpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5leHRPbmUgPSBfcXVldWUucG9wKCk7XG4gICAgICAgIGlmICghbmV4dE9uZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgX3RvdGFsTnVtKys7XG4gICAgICAgIF90b3RhbE51bVRoaXNQZXJpb2QrKztcbiAgICAgICAgbmV4dE9uZS5pbnZva2UoKTtcbiAgICB9XG5cbiAgICBpZiAoX3F1ZXVlLmxlbmd0aCA+IDAgJiYgX3RvdGFsTnVtIDwgbWF4Q29uY3VycmVuY3kpIHtcbiAgICAgICAgY2FsbEluTmV4dFRpY2soaGFuZGxlUXVldWUsIG1heENvbmN1cnJlbmN5LCBtYXhSZXF1ZXN0c1BlckZyYW1lKTtcbiAgICAgICAgX2NoZWNrTmV4dFBlcmlvZCA9IHRydWU7XG4gICAgfVxufVxuXG5cbi8qKlxuICogISNlblxuICogQ29udHJvbCBhbGwgZG93bmxvYWQgcHJvY2VzcywgaXQgaXMgYSBzaW5nbGV0b24uIEFsbCBtZW1iZXIgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyYCAsIGl0IGNhbiBkb3dubG9hZCBzZXZlcmFsIHR5cGVzIG9mIGZpbGVzOlxuICogMS4gVGV4dFxuICogMi4gSW1hZ2VcbiAqIDMuIEF1ZGlvXG4gKiA0LiBBc3NldHNcbiAqIDUuIFNjcmlwdHNcbiAqIFxuICogISN6aFxuICog566h55CG5omA5pyJ5LiL6L296L+H56iL77yMZG93bmxvYWRlciDmmK/kuKrljZXkvovvvIzmiYDmnInmiJDlkZjog73pgJrov4cgYGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyYCDorr/pl67vvIzlroPog73kuIvovb3ku6XkuIvlh6Dnp43nsbvlnovnmoTmlofku7bvvJpcbiAqIDEuIOaWh+acrFxuICogMi4g5Zu+54mHXG4gKiAzLiDpn7PpopFcbiAqIDQuIOi1hOa6kFxuICogNS4g6ISa5pysXG4gKiBcbiAqIEBjbGFzcyBEb3dubG9hZGVyXG4gKi9cbnZhciBkb3dubG9hZGVyID0ge1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgY29uY3VycmVudCB3aGVuIGRvd25sb2FkaW5nXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS4i+i9veaXtueahOacgOWkp+W5tuWPkeaVsFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBtYXhDb25jdXJyZW5jeVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlZmF1bHQgNlxuICAgICAqL1xuICAgIG1heENvbmN1cnJlbmN5OiA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVxdWVzdCBjYW4gYmUgbGF1bmNoZWQgcGVyIGZyYW1lIHdoZW4gZG93bmxvYWRpbmdcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5LiL6L295pe25q+P5bin5Y+v5Lul5ZCv5Yqo55qE5pyA5aSn6K+35rGC5pWwXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IG1heFJlcXVlc3RzUGVyRnJhbWVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDZcbiAgICAgKi9cbiAgICBtYXhSZXF1ZXN0c1BlckZyYW1lOiA2LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBtYXggbnVtYmVyIG9mIHJldHJpZXMgd2hlbiBmYWlsXG4gICAgICogIFxuICAgICAqICEjemhcbiAgICAgKiDlpLHotKXph43or5XmrKHmlbBcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgbWF4UmV0cnlDb3VudFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbWF4UmV0cnlDb3VudDogMyxcblxuICAgIGFwcGVuZFRpbWVTdGFtcDogZmFsc2UsXG5cbiAgICBsaW1pdGVkOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFdhaXQgZm9yIHdoaWxlIGJlZm9yZSBhbm90aGVyIHJldHJ5LCB1bml0OiBtc1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDph43or5XnmoTpl7TpmpTml7bpl7RcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgcmV0cnlJbnRlcnZhbFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgcmV0cnlJbnRlcnZhbDogMjAwMCxcblxuICAgIGJ1bmRsZVZlcnM6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVXNlIEltYWdlIGVsZW1lbnQgdG8gZG93bmxvYWQgaW1hZ2VcbiAgICAgKiAgXG4gICAgICogISN6aFxuICAgICAqIOS9v+eUqCBJbWFnZSDlhYPntKDmnaXkuIvovb3lm77niYdcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGRvd25sb2FkRG9tSW1hZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVXJsIG9mIHRoZSBpbWFnZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtdGVyc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gaW1hZ2UgbG9hZGVkIG9yIGZhaWxlZFxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBvbkNvbXBsZXRlLmltZyAtIFRoZSBsb2FkZWQgSW1hZ2UgZWxlbWVudCwgbnVsbCBpZiBlcnJvciBvY2N1cnJlZFxuICAgICAqIEByZXR1cm5zIHtIVE1MSW1hZ2VFbGVtZW50fSBUaGUgaW1hZ2UgZWxlbWVudFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWREb21JbWFnZSgnaHR0cDovL2V4YW1wbGUuY29tL3Rlc3QuanBnJywgbnVsbCwgKGVyciwgaW1nKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGRvd25sb2FkRG9tSW1hZ2UodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+ICwgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQpID0+IHZvaWQpOiBIVE1MSW1hZ2VFbGVtZW50XG4gICAgICogZG93bmxvYWREb21JbWFnZSh1cmw6IHN0cmluZywgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQpID0+IHZvaWQpOiBIVE1MSW1hZ2VFbGVtZW50XG4gICAgICovXG4gICAgZG93bmxvYWREb21JbWFnZTogZG93bmxvYWREb21JbWFnZSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVc2UgYXVkaW8gZWxlbWVudCB0byBkb3dubG9hZCBhdWRpb1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDkvb/nlKggQXVkaW8g5YWD57Sg5p2l5LiL6L296Z+z6aKRIFxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZG93bmxvYWREb21BdWRpb1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBVcmwgb2YgdGhlIGF1ZGlvXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGF1ZGlvIGxvYWRlZCBvciBmYWlsZWRcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xuICAgICAqIEBwYXJhbSB7SFRNTEF1ZGlvRWxlbWVudH0gb25Db21wbGV0ZS5hdWRpbyAtIFRoZSBsb2FkZWQgYXVkaW8gZWxlbWVudCwgbnVsbCBpZiBlcnJvciBvY2N1cnJlZFxuICAgICAqIEByZXR1cm5zIHtIVE1MQXVkaW9FbGVtZW50fSBUaGUgYXVkaW8gZWxlbWVudFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWREb21BdWRpbygnaHR0cDovL2V4YW1wbGUuY29tL3Rlc3QubXAzJywgbnVsbCwgKGVyciwgYXVkaW8pID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZG93bmxvYWREb21BdWRpbyh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQpID0+IHZvaWQpOiBIVE1MQXVkaW9FbGVtZW50XG4gICAgICogZG93bmxvYWREb21BdWRpbyh1cmw6IHN0cmluZywgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCkgPT4gdm9pZCk6IEhUTUxBdWRpb0VsZW1lbnRcbiAgICAgKi9cbiAgICBkb3dubG9hZERvbUF1ZGlvOiBkb3dubG9hZERvbUF1ZGlvLFxuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVc2UgWE1MSHR0cFJlcXVlc3QgdG8gZG93bmxvYWQgZmlsZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDkvb/nlKggWE1MSHR0cFJlcXVlc3Qg5p2l5LiL6L295paH5Lu2XG4gICAgICogXG4gICAgICogQG1ldGhvZCBkb3dubG9hZEZpbGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVXJsIG9mIHRoZSBmaWxlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJlc3BvbnNlVHlwZV0gLSBJbmRpY2F0ZSB3aGljaCB0eXBlIG9mIGNvbnRlbnQgc2hvdWxkIGJlIHJldHVybmVkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy53aXRoQ3JlZGVudGlhbHNdIC0gSW5kaWNhdGUgd2hldGhlciBvciBub3QgY3Jvc3Mtc2l0ZSBBY2Nlc3MtQ29udG9ybCByZXF1ZXN0cyBzaG91bGQgYmUgbWFkZSB1c2luZyBjcmVkZW50aWFsc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5taW1lVHlwZV0gLSBJbmRpY2F0ZSB3aGljaCB0eXBlIG9mIGNvbnRlbnQgc2hvdWxkIGJlIHJldHVybmVkLiBJbiBzb21lIGJyb3dzZXJzLCByZXNwb25zZVR5cGUgZG9lcyd0IHdvcmssIHlvdSBjYW4gdXNlIG1pbWVUeXBlIGluc3RlYWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGltZW91dF0gLSBSZXByZXNlbnQgdGhlIG51bWJlciBvZiBtcyBhIHJlcXVlc3QgY2FuIHRha2UgYmVmb3JlIGJlaW5nIHRlcm1pbmF0ZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmhlYWRlcl0gLSBUaGUgaGVhZGVyIHNob3VsZCBiZSB0cmFuZmVycmVkIHRvIHNlcnZlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkZpbGVQcm9ncmVzc10gLSBDYWxsYmFjayBjb250aW51b3VzbHkgZHVyaW5nIGRvd25sb2FkIGlzIHByb2Nlc3NpbmdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25GaWxlUHJvZ3Jlc3MubG9hZGVkIC0gU2l6ZSBvZiBkb3dubG9hZGVkIGNvbnRlbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uRmlsZVByb2dyZXNzLnRvdGFsIC0gVG90YWwgc2l6ZSBvZiBjb250ZW50LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gZmlsZSBsb2FkZWQgb3IgZmFpbGVkXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBAcGFyYW0geyp9IG9uQ29tcGxldGUucmVzcG9uc2UgLSBUaGUgbG9hZGVkIGNvbnRlbnQsIG51bGwgaWYgZXJyb3Igb2NjdXJyZWQsIHR5cGUgb2YgY29udGVudCBjYW4gYmUgaW5kaWNhdGVkIGJ5IG9wdGlvbnMucmVzcG9uc2VUeXBlXG4gICAgICogQHJldHVybnMge1hNTEh0dHBSZXF1ZXN0fSBUaGUgeGhyIHRvIGJlIHNlbmRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGRvd25sb2FkRmlsZSgnaHR0cDovL2V4YW1wbGUuY29tL3Rlc3QuYmluJywge3Jlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJ30sIG51bGwsIChlcnIsIGFycmF5QnVmZmVyKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uRmlsZVByb2dyZXNzPzogKGxvYWRlZDogTnVtYmVyLCB0b3RhbDogTnVtYmVyKSA9PiB2b2lkLCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpOiBYTUxIdHRwUmVxdWVzdFxuICAgICAqIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgb25GaWxlUHJvZ3Jlc3M/OiAobG9hZGVkOiBOdW1iZXIsIHRvdGFsOiBOdW1iZXIpID0+IHZvaWQsIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCk6IFhNTEh0dHBSZXF1ZXN0XG4gICAgICogZG93bmxvYWRGaWxlKHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCByZXNwb25zZTogYW55KSA9PiB2b2lkKTogWE1MSHR0cFJlcXVlc3RcbiAgICAgKiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCk6IFhNTEh0dHBSZXF1ZXN0XG4gICAgICovXG4gICAgZG93bmxvYWRGaWxlOiBkb3dubG9hZEZpbGUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTG9hZCBzY3JpcHQgXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWKoOi9veiEmuacrFxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZG93bmxvYWRTY3JpcHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVXJsIG9mIHRoZSBzY3JpcHRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmlzQXN5bmNdIC0gSW5kaWNhdGUgd2hldGhlciBvciBub3QgbG9hZGluZyBwcm9jZXNzIHNob3VsZCBiZSBhc3luY1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gc2NyaXB0IGxvYWRlZCBvciBmYWlsZWRcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWRTY3JpcHQoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbmRleC5qcycsIG51bGwsIChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZG93bmxvYWRTY3JpcHQodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkO1xuICAgICAqIGRvd25sb2FkU2NyaXB0KHVybDogc3RyaW5nLCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkO1xuICAgICAqL1xuICAgIGRvd25sb2FkU2NyaXB0OiBkb3dubG9hZFNjcmlwdCxcblxuICAgIGluaXQgKGJ1bmRsZVZlcnMpIHtcbiAgICAgICAgX2Rvd25sb2FkaW5nLmNsZWFyKCk7XG4gICAgICAgIF9xdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmJ1bmRsZVZlcnMgPSBidW5kbGVWZXJzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWdpc3RlciBjdXN0b20gaGFuZGxlciBpZiB5b3Ugd2FudCB0byBjaGFuZ2UgZGVmYXVsdCBiZWhhdmlvciBvciBleHRlbmQgZG93bmxvYWRlciB0byBkb3dubG9hZCBvdGhlciBmb3JtYXQgZmlsZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlvZPkvaDmg7Pkv67mlLnpu5jorqTooYzkuLrmiJbogIXmi5PlsZUgZG93bmxvYWRlciDmnaXkuIvovb3lhbbku5bmoLzlvI/mlofku7bml7blj6/ku6Xms6jlhozoh6rlrprkuYnnmoQgaGFuZGxlciBcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSB0eXBlIC0gRXh0ZW5zaW9uIGxpa2VzICcuanBnJyBvciBtYXAgbGlrZXMgeycuanBnJzoganBnSGFuZGxlciwgJy5wbmcnOiBwbmdIYW5kbGVyfVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXSAtIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGFuZGxlci51cmwgLSB1cmxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlci5vcHRpb25zIC0gc29tZSBvcHRpb25hbCBwYXJhbXRlcnMgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIub25Db21wbGV0ZSAtIGNhbGxiYWNrIHdoZW4gZmluaXNoaW5nIGRvd25sb2FkaW5nXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkb3dubG9hZGVyLnJlZ2lzdGVyKCcudGdhJywgKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4gb25Db21wbGV0ZShudWxsLCBudWxsKSk7XG4gICAgICogZG93bmxvYWRlci5yZWdpc3Rlcih7Jy50Z2EnOiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpLCAnLmV4dCc6ICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpID0+IG9uQ29tcGxldGUobnVsbCwgbnVsbCl9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJlZ2lzdGVyKHR5cGU6IHN0cmluZywgaGFuZGxlcjogKHVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHJlZ2lzdGVyKG1hcDogUmVjb3JkPHN0cmluZywgKHVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKSA9PiB2b2lkPik6IHZvaWRcbiAgICAgKi9cbiAgICByZWdpc3RlciAodHlwZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBqcy5taXhpbihkb3dubG9hZGVycywgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb3dubG9hZGVyc1t0eXBlXSA9IGhhbmRsZXI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFVzZSBjb3JyZXNwb25kaW5nIGhhbmRsZXIgdG8gZG93bmxvYWQgZmlsZSB1bmRlciBsaW1pdGF0aW9uIFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlnKjpmZDliLbkuIvkvb/nlKjlr7nlupTnmoQgaGFuZGxlciDmnaXkuIvovb3mlofku7ZcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGRvd25sb2FkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSB1cmwgc2hvdWxkIGJlIGRvd25sb2FkZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIGluZGljYXRlcyB0aGF0IHdoaWNoIGhhbmRsZXIgc2hvdWxkIGJlIHVzZWQgdG8gZG93bmxvYWQsIHN1Y2ggYXMgJy5qcGcnXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBzb21lIG9wdGlvbmFsIHBhcmFtdGVycyB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIHRoZSBjb3JyZXNwb25kaW5nIGhhbmRsZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25GaWxlUHJvZ3Jlc3NdIC0gcHJvZ3Jlc3NpdmUgY2FsbGJhY2sgd2lsbCBiZSB0cmFuc2ZlcnJlZCB0byBoYW5kbGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhSZXRyeUNvdW50XSAtIEhvdyBtYW55IHRpbWVzIHNob3VsZCByZXRyeSB3aGVuIGRvd25sb2FkIGZhaWxlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhDb25jdXJyZW5jeV0gLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY29uY3VycmVudCB3aGVuIGRvd25sb2FkaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFJlcXVlc3RzUGVyRnJhbWVdIC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHJlcXVlc3QgY2FuIGJlIGxhdW5jaGVkIHBlciBmcmFtZSB3aGVuIGRvd25sb2FkaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnByaW9yaXR5XSAtIFRoZSBwcmlvcml0eSBvZiB0aGlzIHVybCwgZGVmYXVsdCBpcyAwLCB0aGUgZ3JlYXRlciBudW1iZXIgaXMgaGlnaGVyIHByaW9yaXR5LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBjYWxsYmFjayB3aGVuIGZpbmlzaGluZyBkb3dubG9hZGluZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHsqfSBvbkNvbXBsZXRlLmNvbnRldG50IC0gVGhlIGRvd25sb2FkZWQgZmlsZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWQoJ2h0dHA6Ly9leGFtcGxlLmNvbS90ZXN0LnRnYScsICcudGdhJywge29uRmlsZVByb2dyZXNzOiAobG9hZGVkLCB0b3RhbCkgPT4gY29uc29sZS5sZ28obG9hZGVkL3RvdGFsKX0sIG9uQ29tcGxldGU6IChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZG93bmxvYWQoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGNvbnRlbnQ6IGFueSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKi9cbiAgICBkb3dubG9hZCAoaWQsIHVybCwgdHlwZSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICBsZXQgZnVuYyA9IGRvd25sb2FkZXJzW3R5cGVdIHx8IGRvd25sb2FkZXJzWydkZWZhdWx0J107XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gaWYgaXQgaXMgZG93bmxvYWRlZCwgZG9uJ3QgZG93bmxvYWQgYWdhaW5cbiAgICAgICAgbGV0IGZpbGUsIGRvd25sb2FkQ2FsbGJhY2tzO1xuICAgICAgICBpZiAoZmlsZSA9IGZpbGVzLmdldChpZCkpIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGUobnVsbCwgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZG93bmxvYWRDYWxsYmFja3MgPSBfZG93bmxvYWRpbmcuZ2V0KGlkKSkge1xuICAgICAgICAgICAgZG93bmxvYWRDYWxsYmFja3MucHVzaChvbkNvbXBsZXRlKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gX3F1ZXVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gX3F1ZXVlW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpb3JpdHkgPSBvcHRpb25zLnByaW9yaXR5IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnByaW9yaXR5IDwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9xdWV1ZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBkb3dubG9hZCBmYWlsLCBzaG91bGQgcmV0cnlcbiAgICAgICAgICAgIHZhciBtYXhSZXRyeUNvdW50ID0gb3B0aW9ucy5tYXhSZXRyeUNvdW50IHx8IHRoaXMubWF4UmV0cnlDb3VudDtcbiAgICAgICAgICAgIHZhciBtYXhDb25jdXJyZW5jeSA9IG9wdGlvbnMubWF4Q29uY3VycmVuY3kgfHwgdGhpcy5tYXhDb25jdXJyZW5jeTtcbiAgICAgICAgICAgIHZhciBtYXhSZXF1ZXN0c1BlckZyYW1lID0gb3B0aW9ucy5tYXhSZXF1ZXN0c1BlckZyYW1lIHx8IHRoaXMubWF4UmVxdWVzdHNQZXJGcmFtZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gcHJvY2VzcyAoaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kb3dubG9hZGluZy5hZGQoaWQsIFtvbkNvbXBsZXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghc2VsZi5saW1pdGVkKSByZXR1cm4gZnVuYyh1cmxBcHBlbmRUaW1lc3RhbXAodXJsKSwgb3B0aW9ucywgY2FsbGJhY2spO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaFxuICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWUoKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGludm9rZSAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmModXJsQXBwZW5kVGltZXN0YW1wKHVybCksIG9wdGlvbnMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gZmluaXNoIGRvd25sb2FkaW5nLCB1cGRhdGUgX3RvdGFsTnVtXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG90YWxOdW0tLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2NoZWNrTmV4dFBlcmlvZCAmJiBfcXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxJbk5leHRUaWNrKGhhbmRsZVF1ZXVlLCBtYXhDb25jdXJyZW5jeSwgbWF4UmVxdWVzdHNQZXJGcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NoZWNrTmV4dFBlcmlvZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoX3RvdGFsTnVtIDwgbWF4Q29uY3VycmVuY3kgJiYgX3RvdGFsTnVtVGhpc1BlcmlvZCA8IG1heFJlcXVlc3RzUGVyRnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIF90b3RhbE51bSsrO1xuICAgICAgICAgICAgICAgICAgICBfdG90YWxOdW1UaGlzUGVyaW9kKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIG51bWJlciBvZiByZXF1ZXN0IHVwIHRvIGxpbWl0YXRpb24sIGNhY2hlIHRoZSByZXN0XG4gICAgICAgICAgICAgICAgICAgIF9xdWV1ZS5wdXNoKHsgaWQsIHByaW9yaXR5OiBvcHRpb25zLnByaW9yaXR5IHx8IDAsIGludm9rZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgX3F1ZXVlRGlydHkgPSB0cnVlO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoIV9jaGVja05leHRQZXJpb2QgJiYgX3RvdGFsTnVtIDwgbWF4Q29uY3VycmVuY3kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxJbk5leHRUaWNrKGhhbmRsZVF1ZXVlLCBtYXhDb25jdXJyZW5jeSwgbWF4UmVxdWVzdHNQZXJGcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2hlY2tOZXh0UGVyaW9kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gd2hlbiByZXRyeSBmaW5pc2hlZCwgaW52b2tlIGNhbGxiYWNrc1xuICAgICAgICAgICAgZnVuY3Rpb24gZmluYWxlIChlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmICghZXJyKSBmaWxlcy5hZGQoaWQsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IF9kb3dubG9hZGluZy5yZW1vdmUoaWQpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0oZXJyLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHJldHJ5KHByb2Nlc3MsIG1heFJldHJ5Q291bnQsIHRoaXMucmV0cnlJbnRlcnZhbCwgZmluYWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIGRhZmF1bHQgaGFuZGxlciBtYXBcbnZhciBkb3dubG9hZGVycyA9IHtcbiAgICAvLyBJbWFnZXNcbiAgICAnLnBuZycgOiBkb3dubG9hZEltYWdlLFxuICAgICcuanBnJyA6IGRvd25sb2FkSW1hZ2UsXG4gICAgJy5ibXAnIDogZG93bmxvYWRJbWFnZSxcbiAgICAnLmpwZWcnIDogZG93bmxvYWRJbWFnZSxcbiAgICAnLmdpZicgOiBkb3dubG9hZEltYWdlLFxuICAgICcuaWNvJyA6IGRvd25sb2FkSW1hZ2UsXG4gICAgJy50aWZmJyA6IGRvd25sb2FkSW1hZ2UsXG4gICAgJy53ZWJwJyA6IGRvd25sb2FkSW1hZ2UsXG4gICAgJy5pbWFnZScgOiBkb3dubG9hZEltYWdlLFxuICAgICcucHZyJzogZG93bmxvYWRBcnJheUJ1ZmZlcixcbiAgICAnLnBrbSc6IGRvd25sb2FkQXJyYXlCdWZmZXIsXG5cbiAgICAvLyBBdWRpb1xuICAgICcubXAzJyA6IGRvd25sb2FkQXVkaW8sXG4gICAgJy5vZ2cnIDogZG93bmxvYWRBdWRpbyxcbiAgICAnLndhdicgOiBkb3dubG9hZEF1ZGlvLFxuICAgICcubTRhJyA6IGRvd25sb2FkQXVkaW8sXG5cbiAgICAvLyBUeHRcbiAgICAnLnR4dCcgOiBkb3dubG9hZFRleHQsXG4gICAgJy54bWwnIDogZG93bmxvYWRUZXh0LFxuICAgICcudnNoJyA6IGRvd25sb2FkVGV4dCxcbiAgICAnLmZzaCcgOiBkb3dubG9hZFRleHQsXG4gICAgJy5hdGxhcycgOiBkb3dubG9hZFRleHQsXG5cbiAgICAnLnRteCcgOiBkb3dubG9hZFRleHQsXG4gICAgJy50c3gnIDogZG93bmxvYWRUZXh0LFxuXG4gICAgJy5qc29uJyA6IGRvd25sb2FkSnNvbixcbiAgICAnLkV4cG9ydEpzb24nIDogZG93bmxvYWRKc29uLFxuICAgICcucGxpc3QnIDogZG93bmxvYWRUZXh0LFxuXG4gICAgJy5mbnQnIDogZG93bmxvYWRUZXh0LFxuXG4gICAgLy8gZm9udFxuICAgICcuZm9udCcgOiBsb2FkRm9udCxcbiAgICAnLmVvdCcgOiBsb2FkRm9udCxcbiAgICAnLnR0ZicgOiBsb2FkRm9udCxcbiAgICAnLndvZmYnIDogbG9hZEZvbnQsXG4gICAgJy5zdmcnIDogbG9hZEZvbnQsXG4gICAgJy50dGMnIDogbG9hZEZvbnQsXG5cbiAgICAvLyBWaWRlb1xuICAgICcubXA0JzogZG93bmxvYWRWaWRlbyxcbiAgICAnLmF2aSc6IGRvd25sb2FkVmlkZW8sXG4gICAgJy5tb3YnOiBkb3dubG9hZFZpZGVvLFxuICAgICcubXBnJzogZG93bmxvYWRWaWRlbyxcbiAgICAnLm1wZWcnOiBkb3dubG9hZFZpZGVvLFxuICAgICcucm0nOiBkb3dubG9hZFZpZGVvLFxuICAgICcucm12Yic6IGRvd25sb2FkVmlkZW8sXG5cbiAgICAvLyBCaW5hcnlcbiAgICAnLmJpbmFyeScgOiBkb3dubG9hZEFycmF5QnVmZmVyLFxuICAgICcuYmluJzogZG93bmxvYWRBcnJheUJ1ZmZlcixcbiAgICAnLmRiYmluJzogZG93bmxvYWRBcnJheUJ1ZmZlcixcbiAgICAnLnNrZWwnOiBkb3dubG9hZEFycmF5QnVmZmVyLFxuXG4gICAgJy5qcyc6IGRvd25sb2FkU2NyaXB0LFxuXG4gICAgJ2J1bmRsZSc6IGRvd25sb2FkQnVuZGxlLFxuXG4gICAgJ2RlZmF1bHQnOiBkb3dubG9hZFRleHRcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb3dubG9hZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=