
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/parser.js';
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
var plistParser = require('../platform/CCSAXParser').plistParser;

var js = require('../platform/js');

var deserialize = require('./deserialize');

var Cache = require('./cache');

var _require = require('./helper'),
    isScene = _require.isScene;

var _require2 = require('./shared'),
    parsed = _require2.parsed,
    files = _require2.files;

var _require3 = require('../platform/CCSys'),
    __audioSupport = _require3.__audioSupport,
    capabilities = _require3.capabilities;

var _parsing = new Cache();
/**
 * !#en
 * Parse the downloaded file, it's a singleton, all member can be accessed with `cc.assetManager.parser`
 * 
 * !#zh
 * 解析已下载的文件，parser 是一个单例, 所有成员能通过 `cc.assetManaager.parser` 访问
 * 
 * @class Parser
 */


var parser = {
  /**
   * !#en
   * Parse image file
   * 
   * !#zh
   * 解析图片文件
   * 
   * @method parseImage
   * @param {Blob} file - The downloaded file
   * @param {Object} options - Some optional paramters 
   * @param {Function} [onComplete] - callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {ImageBitmap|HTMLImageElement} onComplete.img - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.jpg', {responseType: 'blob'}, null, (err, file) => {
   *      parser.parseImage(file, null, (err, img) => console.log(err));
   * });
   * 
   * @typescript
   * parseImage(file: Blob, options: Record<string, any>, onComplete?: (err: Error, img: ImageBitmap|HTMLImageElement) => void): void
   */
  parseImage: function parseImage(file, options, onComplete) {
    if (capabilities.imageBitmap && file instanceof Blob) {
      var imageOptions = {};
      imageOptions.imageOrientation = options.__flipY__ ? 'flipY' : 'none';
      imageOptions.premultiplyAlpha = options.__premultiplyAlpha__ ? 'premultiply' : 'none';
      createImageBitmap(file, imageOptions).then(function (result) {
        result.flipY = !!options.__flipY__;
        result.premultiplyAlpha = !!options.__premultiplyAlpha__;
        onComplete && onComplete(null, result);
      }, function (err) {
        onComplete && onComplete(err, null);
      });
    } else {
      onComplete && onComplete(null, file);
    }
  },

  /**
   * !#en
   * Parse audio file
   * 
   * !#zh
   * 解析音频文件
   * 
   * @method parseAudio
   * @param {ArrayBuffer|HTMLAudioElement} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {AudioBuffer|HTMLAudioElement} onComplete.audio - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.mp3', {responseType: 'arraybuffer'}, null, (err, file) => {
   *      parser.parseAudio(file, null, (err, audio) => console.log(err));
   * });
   * 
   * @typescript
   * parseAudio(file: ArrayBuffer|HTMLAudioElement, options: Record<string, any>, onComplete?: (err: Error, audio: AudioBuffer|HTMLAudioElement) => void): void
   */
  parseAudio: function parseAudio(file, options, onComplete) {
    if (file instanceof ArrayBuffer) {
      __audioSupport.context.decodeAudioData(file, function (buffer) {
        onComplete && onComplete(null, buffer);
      }, function (e) {
        onComplete && onComplete(e, null);
      });
    } else {
      onComplete && onComplete(null, file);
    }
  },

  /**
   * !#en
   * Parse pvr file 
   * 
   * !#zh
   * 解析压缩纹理格式 pvr 文件
   * 
   * @method parsePVRTex
   * @param {ArrayBuffer|ArrayBufferView} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Object} onComplete.pvrAsset - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.pvr', {responseType: 'arraybuffer'}, null, (err, file) => {
   *      parser.parsePVRTex(file, null, (err, pvrAsset) => console.log(err));
   * });
   * 
   * @typescript
   * parsePVRTex(file: ArrayBuffer|ArrayBufferView, options: Record<string, any>, onComplete: (err: Error, pvrAsset: {_data: Uint8Array, _compressed: boolean, width: number, height: number}) => void): void
   */
  parsePVRTex: function () {
    //===============//
    // PVR constants //
    //===============//
    // https://github.com/toji/texture-tester/blob/master/js/webgl-texture-util.js#L424
    var PVR_HEADER_LENGTH = 13; // The header length in 32 bit ints.

    var PVR_MAGIC = 0x03525650; //0x50565203;
    // Offsets into the header array.

    var PVR_HEADER_MAGIC = 0;
    var PVR_HEADER_FORMAT = 2;
    var PVR_HEADER_HEIGHT = 6;
    var PVR_HEADER_WIDTH = 7;
    var PVR_HEADER_MIPMAPCOUNT = 11;
    var PVR_HEADER_METADATA = 12;
    return function (file, options, onComplete) {
      var err = null,
          out = null;

      try {
        var buffer = file instanceof ArrayBuffer ? file : file.buffer; // Get a view of the arrayBuffer that represents the DDS header.

        var header = new Int32Array(buffer, 0, PVR_HEADER_LENGTH); // Do some sanity checks to make sure this is a valid DDS file.

        if (header[PVR_HEADER_MAGIC] != PVR_MAGIC) {
          throw new Error("Invalid magic number in PVR header");
        } // Gather other basic metrics and a view of the raw the DXT data.


        var width = header[PVR_HEADER_WIDTH];
        var height = header[PVR_HEADER_HEIGHT];
        var dataOffset = header[PVR_HEADER_METADATA] + 52;
        var pvrtcData = new Uint8Array(buffer, dataOffset);
        out = {
          _data: pvrtcData,
          _compressed: true,
          width: width,
          height: height
        };
      } catch (e) {
        err = e;
      }

      onComplete && onComplete(err, out);
    };
  }(),

  /**
   * !#en
   * Parse pkm file
   * 
   * !#zh
   * 解析压缩纹理格式 pkm 文件
   * 
   * @method parsePKMTex
   * @param {ArrayBuffer|ArrayBufferView} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Object} onComplete.etcAsset - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.pkm', {responseType: 'arraybuffer'}, null, (err, file) => {
   *      parser.parsePKMTex(file, null, (err, etcAsset) => console.log(err));
   * });
   * 
   * @typescript
   * parsePKMTex(file: ArrayBuffer|ArrayBufferView, options: Record<string, any>, onComplete: (err: Error, etcAsset: {_data: Uint8Array, _compressed: boolean, width: number, height: number}) => void): void
   */
  parsePKMTex: function () {
    //===============//
    // ETC constants //
    //===============//
    var ETC_PKM_HEADER_SIZE = 16;
    var ETC_PKM_FORMAT_OFFSET = 6;
    var ETC_PKM_ENCODED_WIDTH_OFFSET = 8;
    var ETC_PKM_ENCODED_HEIGHT_OFFSET = 10;
    var ETC_PKM_WIDTH_OFFSET = 12;
    var ETC_PKM_HEIGHT_OFFSET = 14;
    var ETC1_RGB_NO_MIPMAPS = 0;
    var ETC2_RGB_NO_MIPMAPS = 1;
    var ETC2_RGBA_NO_MIPMAPS = 3;

    function readBEUint16(header, offset) {
      return header[offset] << 8 | header[offset + 1];
    }

    return function (file, options, onComplete) {
      var err = null,
          out = null;

      try {
        var buffer = file instanceof ArrayBuffer ? file : file.buffer;
        var header = new Uint8Array(buffer);
        var format = readBEUint16(header, ETC_PKM_FORMAT_OFFSET);

        if (format !== ETC1_RGB_NO_MIPMAPS && format !== ETC2_RGB_NO_MIPMAPS && format !== ETC2_RGBA_NO_MIPMAPS) {
          return new Error("Invalid magic number in ETC header");
        }

        var width = readBEUint16(header, ETC_PKM_WIDTH_OFFSET);
        var height = readBEUint16(header, ETC_PKM_HEIGHT_OFFSET);
        var encodedWidth = readBEUint16(header, ETC_PKM_ENCODED_WIDTH_OFFSET);
        var encodedHeight = readBEUint16(header, ETC_PKM_ENCODED_HEIGHT_OFFSET);
        var etcData = new Uint8Array(buffer, ETC_PKM_HEADER_SIZE);
        out = {
          _data: etcData,
          _compressed: true,
          width: width,
          height: height
        };
      } catch (e) {
        err = e;
      }

      onComplete && onComplete(err, out);
    };
  }(),

  /**
   * !#en
   * Parse plist file
   * 
   * !#zh
   * 解析 plist 文件
   * 
   * @method parsePlist
   * @param {string} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.data - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.plist', {responseType: 'text'}, null, (err, file) => {
   *      parser.parsePlist(file, null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * parsePlist(file: string, options: Record<string, any>, onComplete?: (err: Error, data: any) => void): void
   */
  parsePlist: function parsePlist(file, options, onComplete) {
    var err = null;
    var result = plistParser.parse(file);
    if (!result) err = new Error('parse failed');
    onComplete && onComplete(err, result);
  },

  /**
   * !#en
   * Deserialize asset file
   * 
   * !#zh
   * 反序列化资源文件
   * 
   * @method parseImport
   * @param {Object} file - The serialized json
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Asset} onComplete.asset - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.json', {responseType: 'json'}, null, (err, file) => {
   *      parser.parseImport(file, null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * parseImport (file: any, options: Record<string, any>, onComplete?: (err: Error, asset: cc.Asset) => void): void
   */
  parseImport: function parseImport(file, options, onComplete) {
    if (!file) return onComplete && onComplete(new Error('Json is empty'));
    var result,
        err = null;

    try {
      result = deserialize(file, options);
    } catch (e) {
      err = e;
    }

    onComplete && onComplete(err, result);
  },
  init: function init() {
    _parsing.clear();
  },

  /**
   * !#en
   * Register custom handler if you want to change default behavior or extend parser to parse other format file
   * 
   * !#zh
   * 当你想修改默认行为或者拓展 parser 来解析其他格式文件时可以注册自定义的handler
   * 
   * @method register
   * @param {string|Object} type - Extension likes '.jpg' or map likes {'.jpg': jpgHandler, '.png': pngHandler}
   * @param {Function} [handler] - The corresponding handler
   * @param {*} handler.file - File
   * @param {Object} handler.options - Some optional paramter
   * @param {Function} handler.onComplete - callback when finishing parsing
   * 
   * @example
   * parser.register('.tga', (file, options, onComplete) => onComplete(null, null));
   * parser.register({'.tga': (file, options, onComplete) => onComplete(null, null), '.ext': (file, options, onComplete) => onComplete(null, null)});
   * 
   * @typescript
   * register(type: string, handler: (file: any, options: Record<string, any>, onComplete: (err: Error, data: any) => void) => void): void
   * register(map: Record<string, (file: any, options: Record<string, any>, onComplete: (err: Error, data: any) => void) => void>): void
   */
  register: function register(type, handler) {
    if (typeof type === 'object') {
      js.mixin(parsers, type);
    } else {
      parsers[type] = handler;
    }
  },

  /**
   * !#en
   * Use corresponding handler to parse file 
   * 
   * !#zh
   * 使用对应的handler来解析文件
   * 
   * @method parse
   * @param {string} id - The id of file
   * @param {*} file - File
   * @param {string} type - The corresponding type of file, likes '.jpg'.
   * @param {Object} options - Some optional paramters will be transferred to the corresponding handler.
   * @param {Function} onComplete - callback when finishing downloading
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.contetnt - The parsed file
   * 
   * @example
   * downloader.downloadFile('test.jpg', {responseType: 'blob'}, null, (err, file) => {
   *      parser.parse('test.jpg', file, '.jpg', null, (err, img) => console.log(err));
   * });
   * 
   * @typescript
   * parse(id: string, file: any, type: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void): void
   */
  parse: function parse(id, file, type, options, onComplete) {
    var parsedAsset, parsing, parseHandler;

    if (parsedAsset = parsed.get(id)) {
      onComplete(null, parsedAsset);
    } else if (parsing = _parsing.get(id)) {
      parsing.push(onComplete);
    } else if (parseHandler = parsers[type]) {
      _parsing.add(id, [onComplete]);

      parseHandler(file, options, function (err, data) {
        if (err) {
          files.remove(id);
        } else if (!isScene(data)) {
          parsed.add(id, data);
        }

        var callbacks = _parsing.remove(id);

        for (var i = 0, l = callbacks.length; i < l; i++) {
          callbacks[i](err, data);
        }
      });
    } else {
      onComplete(null, file);
    }
  }
};
var parsers = {
  '.png': parser.parseImage,
  '.jpg': parser.parseImage,
  '.bmp': parser.parseImage,
  '.jpeg': parser.parseImage,
  '.gif': parser.parseImage,
  '.ico': parser.parseImage,
  '.tiff': parser.parseImage,
  '.webp': parser.parseImage,
  '.image': parser.parseImage,
  '.pvr': parser.parsePVRTex,
  '.pkm': parser.parsePKMTex,
  // Audio
  '.mp3': parser.parseAudio,
  '.ogg': parser.parseAudio,
  '.wav': parser.parseAudio,
  '.m4a': parser.parseAudio,
  // plist
  '.plist': parser.parsePlist,
  'import': parser.parseImport
};
module.exports = parser;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvcGFyc2VyLmpzIl0sIm5hbWVzIjpbInBsaXN0UGFyc2VyIiwicmVxdWlyZSIsImpzIiwiZGVzZXJpYWxpemUiLCJDYWNoZSIsImlzU2NlbmUiLCJwYXJzZWQiLCJmaWxlcyIsIl9fYXVkaW9TdXBwb3J0IiwiY2FwYWJpbGl0aWVzIiwiX3BhcnNpbmciLCJwYXJzZXIiLCJwYXJzZUltYWdlIiwiZmlsZSIsIm9wdGlvbnMiLCJvbkNvbXBsZXRlIiwiaW1hZ2VCaXRtYXAiLCJCbG9iIiwiaW1hZ2VPcHRpb25zIiwiaW1hZ2VPcmllbnRhdGlvbiIsIl9fZmxpcFlfXyIsInByZW11bHRpcGx5QWxwaGEiLCJfX3ByZW11bHRpcGx5QWxwaGFfXyIsImNyZWF0ZUltYWdlQml0bWFwIiwidGhlbiIsInJlc3VsdCIsImZsaXBZIiwiZXJyIiwicGFyc2VBdWRpbyIsIkFycmF5QnVmZmVyIiwiY29udGV4dCIsImRlY29kZUF1ZGlvRGF0YSIsImJ1ZmZlciIsImUiLCJwYXJzZVBWUlRleCIsIlBWUl9IRUFERVJfTEVOR1RIIiwiUFZSX01BR0lDIiwiUFZSX0hFQURFUl9NQUdJQyIsIlBWUl9IRUFERVJfRk9STUFUIiwiUFZSX0hFQURFUl9IRUlHSFQiLCJQVlJfSEVBREVSX1dJRFRIIiwiUFZSX0hFQURFUl9NSVBNQVBDT1VOVCIsIlBWUl9IRUFERVJfTUVUQURBVEEiLCJvdXQiLCJoZWFkZXIiLCJJbnQzMkFycmF5IiwiRXJyb3IiLCJ3aWR0aCIsImhlaWdodCIsImRhdGFPZmZzZXQiLCJwdnJ0Y0RhdGEiLCJVaW50OEFycmF5IiwiX2RhdGEiLCJfY29tcHJlc3NlZCIsInBhcnNlUEtNVGV4IiwiRVRDX1BLTV9IRUFERVJfU0laRSIsIkVUQ19QS01fRk9STUFUX09GRlNFVCIsIkVUQ19QS01fRU5DT0RFRF9XSURUSF9PRkZTRVQiLCJFVENfUEtNX0VOQ09ERURfSEVJR0hUX09GRlNFVCIsIkVUQ19QS01fV0lEVEhfT0ZGU0VUIiwiRVRDX1BLTV9IRUlHSFRfT0ZGU0VUIiwiRVRDMV9SR0JfTk9fTUlQTUFQUyIsIkVUQzJfUkdCX05PX01JUE1BUFMiLCJFVEMyX1JHQkFfTk9fTUlQTUFQUyIsInJlYWRCRVVpbnQxNiIsIm9mZnNldCIsImZvcm1hdCIsImVuY29kZWRXaWR0aCIsImVuY29kZWRIZWlnaHQiLCJldGNEYXRhIiwicGFyc2VQbGlzdCIsInBhcnNlIiwicGFyc2VJbXBvcnQiLCJpbml0IiwiY2xlYXIiLCJyZWdpc3RlciIsInR5cGUiLCJoYW5kbGVyIiwibWl4aW4iLCJwYXJzZXJzIiwiaWQiLCJwYXJzZWRBc3NldCIsInBhcnNpbmciLCJwYXJzZUhhbmRsZXIiLCJnZXQiLCJwdXNoIiwiYWRkIiwiZGF0YSIsInJlbW92ZSIsImNhbGxiYWNrcyIsImkiLCJsIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7QUFJQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyx5QkFBRCxDQUFQLENBQW1DRCxXQUF2RDs7QUFDQSxJQUFNRSxFQUFFLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjs7QUFDQSxJQUFNRSxXQUFXLEdBQUdGLE9BQU8sQ0FBQyxlQUFELENBQTNCOztBQUNBLElBQU1HLEtBQUssR0FBR0gsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O2VBQ29CQSxPQUFPLENBQUMsVUFBRDtJQUFuQkksbUJBQUFBOztnQkFDa0JKLE9BQU8sQ0FBQyxVQUFEO0lBQXpCSyxtQkFBQUE7SUFBUUMsa0JBQUFBOztnQkFDeUJOLE9BQU8sQ0FBQyxtQkFBRDtJQUF4Q08sMkJBQUFBO0lBQWdCQyx5QkFBQUE7O0FBRXhCLElBQUlDLFFBQVEsR0FBRyxJQUFJTixLQUFKLEVBQWY7QUFFQTs7Ozs7Ozs7Ozs7QUFTQSxJQUFJTyxNQUFNLEdBQUc7QUFDVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQUMsRUFBQUEsVUF2QlMsc0JBdUJHQyxJQXZCSCxFQXVCU0MsT0F2QlQsRUF1QmtCQyxVQXZCbEIsRUF1QjhCO0FBQ25DLFFBQUlOLFlBQVksQ0FBQ08sV0FBYixJQUE0QkgsSUFBSSxZQUFZSSxJQUFoRCxFQUFzRDtBQUNsRCxVQUFJQyxZQUFZLEdBQUcsRUFBbkI7QUFDQUEsTUFBQUEsWUFBWSxDQUFDQyxnQkFBYixHQUFnQ0wsT0FBTyxDQUFDTSxTQUFSLEdBQW9CLE9BQXBCLEdBQThCLE1BQTlEO0FBQ0FGLE1BQUFBLFlBQVksQ0FBQ0csZ0JBQWIsR0FBZ0NQLE9BQU8sQ0FBQ1Esb0JBQVIsR0FBK0IsYUFBL0IsR0FBK0MsTUFBL0U7QUFDQUMsTUFBQUEsaUJBQWlCLENBQUNWLElBQUQsRUFBT0ssWUFBUCxDQUFqQixDQUFzQ00sSUFBdEMsQ0FBMkMsVUFBVUMsTUFBVixFQUFrQjtBQUN6REEsUUFBQUEsTUFBTSxDQUFDQyxLQUFQLEdBQWUsQ0FBQyxDQUFDWixPQUFPLENBQUNNLFNBQXpCO0FBQ0FLLFFBQUFBLE1BQU0sQ0FBQ0osZ0JBQVAsR0FBMEIsQ0FBQyxDQUFDUCxPQUFPLENBQUNRLG9CQUFwQztBQUNBUCxRQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFELEVBQU9VLE1BQVAsQ0FBeEI7QUFDSCxPQUpELEVBSUcsVUFBVUUsR0FBVixFQUFlO0FBQ2RaLFFBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDWSxHQUFELEVBQU0sSUFBTixDQUF4QjtBQUNILE9BTkQ7QUFPSCxLQVhELE1BWUs7QUFDRFosTUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBRCxFQUFPRixJQUFQLENBQXhCO0FBQ0g7QUFDSixHQXZDUTs7QUF5Q1Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkFlLEVBQUFBLFVBL0RTLHNCQStER2YsSUEvREgsRUErRFNDLE9BL0RULEVBK0RrQkMsVUEvRGxCLEVBK0Q4QjtBQUNuQyxRQUFJRixJQUFJLFlBQVlnQixXQUFwQixFQUFpQztBQUM3QnJCLE1BQUFBLGNBQWMsQ0FBQ3NCLE9BQWYsQ0FBdUJDLGVBQXZCLENBQXVDbEIsSUFBdkMsRUFBNkMsVUFBVW1CLE1BQVYsRUFBa0I7QUFDM0RqQixRQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFELEVBQU9pQixNQUFQLENBQXhCO0FBQ0gsT0FGRCxFQUVHLFVBQVNDLENBQVQsRUFBVztBQUNWbEIsUUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUNrQixDQUFELEVBQUksSUFBSixDQUF4QjtBQUNILE9BSkQ7QUFLSCxLQU5ELE1BT0s7QUFDRGxCLE1BQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDLElBQUQsRUFBT0YsSUFBUCxDQUF4QjtBQUNIO0FBQ0osR0ExRVE7O0FBNEVUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBcUIsRUFBQUEsV0FBVyxFQUFJLFlBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFNQyxpQkFBaUIsR0FBRyxFQUExQixDQUx1QixDQUtPOztBQUM5QixRQUFNQyxTQUFTLEdBQUcsVUFBbEIsQ0FOdUIsQ0FNTztBQUU5Qjs7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBRyxDQUF6QjtBQUNBLFFBQU1DLGlCQUFpQixHQUFHLENBQTFCO0FBQ0EsUUFBTUMsaUJBQWlCLEdBQUcsQ0FBMUI7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBRyxDQUF6QjtBQUNBLFFBQU1DLHNCQUFzQixHQUFHLEVBQS9CO0FBQ0EsUUFBTUMsbUJBQW1CLEdBQUcsRUFBNUI7QUFFQSxXQUFPLFVBQVU3QixJQUFWLEVBQWdCQyxPQUFoQixFQUF5QkMsVUFBekIsRUFBcUM7QUFDeEMsVUFBSVksR0FBRyxHQUFHLElBQVY7QUFBQSxVQUFnQmdCLEdBQUcsR0FBRyxJQUF0Qjs7QUFDQSxVQUFJO0FBQ0EsWUFBSVgsTUFBTSxHQUFHbkIsSUFBSSxZQUFZZ0IsV0FBaEIsR0FBOEJoQixJQUE5QixHQUFxQ0EsSUFBSSxDQUFDbUIsTUFBdkQsQ0FEQSxDQUVBOztBQUNBLFlBQUlZLE1BQU0sR0FBRyxJQUFJQyxVQUFKLENBQWViLE1BQWYsRUFBdUIsQ0FBdkIsRUFBMEJHLGlCQUExQixDQUFiLENBSEEsQ0FLQTs7QUFDQSxZQUFHUyxNQUFNLENBQUNQLGdCQUFELENBQU4sSUFBNEJELFNBQS9CLEVBQTBDO0FBQ3RDLGdCQUFNLElBQUlVLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0FBQ0gsU0FSRCxDQVVBOzs7QUFDQSxZQUFJQyxLQUFLLEdBQUdILE1BQU0sQ0FBQ0osZ0JBQUQsQ0FBbEI7QUFDQSxZQUFJUSxNQUFNLEdBQUdKLE1BQU0sQ0FBQ0wsaUJBQUQsQ0FBbkI7QUFDQSxZQUFJVSxVQUFVLEdBQUdMLE1BQU0sQ0FBQ0YsbUJBQUQsQ0FBTixHQUE4QixFQUEvQztBQUNBLFlBQUlRLFNBQVMsR0FBRyxJQUFJQyxVQUFKLENBQWVuQixNQUFmLEVBQXVCaUIsVUFBdkIsQ0FBaEI7QUFFQU4sUUFBQUEsR0FBRyxHQUFHO0FBQ0ZTLFVBQUFBLEtBQUssRUFBRUYsU0FETDtBQUVGRyxVQUFBQSxXQUFXLEVBQUUsSUFGWDtBQUdGTixVQUFBQSxLQUFLLEVBQUVBLEtBSEw7QUFJRkMsVUFBQUEsTUFBTSxFQUFFQTtBQUpOLFNBQU47QUFPSCxPQXZCRCxDQXdCQSxPQUFPZixDQUFQLEVBQVU7QUFDTk4sUUFBQUEsR0FBRyxHQUFHTSxDQUFOO0FBQ0g7O0FBQ0RsQixNQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQ1ksR0FBRCxFQUFNZ0IsR0FBTixDQUF4QjtBQUNILEtBOUJEO0FBK0JILEdBL0NhLEVBbEdMOztBQW1KVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQVcsRUFBQUEsV0FBVyxFQUFHLFlBQVk7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsUUFBTUMsbUJBQW1CLEdBQUcsRUFBNUI7QUFFQSxRQUFNQyxxQkFBcUIsR0FBRyxDQUE5QjtBQUNBLFFBQU1DLDRCQUE0QixHQUFHLENBQXJDO0FBQ0EsUUFBTUMsNkJBQTZCLEdBQUcsRUFBdEM7QUFDQSxRQUFNQyxvQkFBb0IsR0FBRyxFQUE3QjtBQUNBLFFBQU1DLHFCQUFxQixHQUFHLEVBQTlCO0FBRUEsUUFBTUMsbUJBQW1CLEdBQUssQ0FBOUI7QUFDQSxRQUFNQyxtQkFBbUIsR0FBSyxDQUE5QjtBQUNBLFFBQU1DLG9CQUFvQixHQUFJLENBQTlCOztBQUVBLGFBQVNDLFlBQVQsQ0FBc0JwQixNQUF0QixFQUE4QnFCLE1BQTlCLEVBQXNDO0FBQ2xDLGFBQVFyQixNQUFNLENBQUNxQixNQUFELENBQU4sSUFBa0IsQ0FBbkIsR0FBd0JyQixNQUFNLENBQUNxQixNQUFNLEdBQUMsQ0FBUixDQUFyQztBQUNIOztBQUNELFdBQU8sVUFBVXBELElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCQyxVQUF6QixFQUFxQztBQUN4QyxVQUFJWSxHQUFHLEdBQUcsSUFBVjtBQUFBLFVBQWdCZ0IsR0FBRyxHQUFHLElBQXRCOztBQUNBLFVBQUk7QUFDQSxZQUFJWCxNQUFNLEdBQUduQixJQUFJLFlBQVlnQixXQUFoQixHQUE4QmhCLElBQTlCLEdBQXFDQSxJQUFJLENBQUNtQixNQUF2RDtBQUNBLFlBQUlZLE1BQU0sR0FBRyxJQUFJTyxVQUFKLENBQWVuQixNQUFmLENBQWI7QUFDQSxZQUFJa0MsTUFBTSxHQUFHRixZQUFZLENBQUNwQixNQUFELEVBQVNZLHFCQUFULENBQXpCOztBQUNBLFlBQUlVLE1BQU0sS0FBS0wsbUJBQVgsSUFBa0NLLE1BQU0sS0FBS0osbUJBQTdDLElBQW9FSSxNQUFNLEtBQUtILG9CQUFuRixFQUF5RztBQUNyRyxpQkFBTyxJQUFJakIsS0FBSixDQUFVLG9DQUFWLENBQVA7QUFDSDs7QUFDRCxZQUFJQyxLQUFLLEdBQUdpQixZQUFZLENBQUNwQixNQUFELEVBQVNlLG9CQUFULENBQXhCO0FBQ0EsWUFBSVgsTUFBTSxHQUFHZ0IsWUFBWSxDQUFDcEIsTUFBRCxFQUFTZ0IscUJBQVQsQ0FBekI7QUFDQSxZQUFJTyxZQUFZLEdBQUdILFlBQVksQ0FBQ3BCLE1BQUQsRUFBU2EsNEJBQVQsQ0FBL0I7QUFDQSxZQUFJVyxhQUFhLEdBQUdKLFlBQVksQ0FBQ3BCLE1BQUQsRUFBU2MsNkJBQVQsQ0FBaEM7QUFDQSxZQUFJVyxPQUFPLEdBQUcsSUFBSWxCLFVBQUosQ0FBZW5CLE1BQWYsRUFBdUJ1QixtQkFBdkIsQ0FBZDtBQUNBWixRQUFBQSxHQUFHLEdBQUc7QUFDRlMsVUFBQUEsS0FBSyxFQUFFaUIsT0FETDtBQUVGaEIsVUFBQUEsV0FBVyxFQUFFLElBRlg7QUFHRk4sVUFBQUEsS0FBSyxFQUFFQSxLQUhMO0FBSUZDLFVBQUFBLE1BQU0sRUFBRUE7QUFKTixTQUFOO0FBT0gsT0FuQkQsQ0FvQkEsT0FBT2YsQ0FBUCxFQUFVO0FBQ05OLFFBQUFBLEdBQUcsR0FBR00sQ0FBTjtBQUNIOztBQUNEbEIsTUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUNZLEdBQUQsRUFBTWdCLEdBQU4sQ0FBeEI7QUFDSCxLQTFCRDtBQTJCSCxHQTlDWSxFQXpLSjs7QUF5TlQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEyQixFQUFBQSxVQS9PUyxzQkErT0d6RCxJQS9PSCxFQStPU0MsT0EvT1QsRUErT2tCQyxVQS9PbEIsRUErTzhCO0FBQ25DLFFBQUlZLEdBQUcsR0FBRyxJQUFWO0FBQ0EsUUFBSUYsTUFBTSxHQUFHekIsV0FBVyxDQUFDdUUsS0FBWixDQUFrQjFELElBQWxCLENBQWI7QUFDQSxRQUFJLENBQUNZLE1BQUwsRUFBYUUsR0FBRyxHQUFHLElBQUltQixLQUFKLENBQVUsY0FBVixDQUFOO0FBQ2IvQixJQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQ1ksR0FBRCxFQUFNRixNQUFOLENBQXhCO0FBQ0gsR0FwUFE7O0FBc1BUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBK0MsRUFBQUEsV0E1UVMsdUJBNFFJM0QsSUE1UUosRUE0UVVDLE9BNVFWLEVBNFFtQkMsVUE1UW5CLEVBNFErQjtBQUNwQyxRQUFJLENBQUNGLElBQUwsRUFBVyxPQUFPRSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFJK0IsS0FBSixDQUFVLGVBQVYsQ0FBRCxDQUEvQjtBQUNYLFFBQUlyQixNQUFKO0FBQUEsUUFBWUUsR0FBRyxHQUFHLElBQWxCOztBQUNBLFFBQUk7QUFDQUYsTUFBQUEsTUFBTSxHQUFHdEIsV0FBVyxDQUFDVSxJQUFELEVBQU9DLE9BQVAsQ0FBcEI7QUFDSCxLQUZELENBR0EsT0FBT21CLENBQVAsRUFBVTtBQUNOTixNQUFBQSxHQUFHLEdBQUdNLENBQU47QUFDSDs7QUFDRGxCLElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDWSxHQUFELEVBQU1GLE1BQU4sQ0FBeEI7QUFDSCxHQXRSUTtBQXdSVGdELEVBQUFBLElBeFJTLGtCQXdSRDtBQUNKL0QsSUFBQUEsUUFBUSxDQUFDZ0UsS0FBVDtBQUNILEdBMVJROztBQTRSVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQUMsRUFBQUEsUUFsVFMsb0JBa1RDQyxJQWxURCxFQWtUT0MsT0FsVFAsRUFrVGdCO0FBQ3JCLFFBQUksT0FBT0QsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQjFFLE1BQUFBLEVBQUUsQ0FBQzRFLEtBQUgsQ0FBU0MsT0FBVCxFQUFrQkgsSUFBbEI7QUFDSCxLQUZELE1BR0s7QUFDREcsTUFBQUEsT0FBTyxDQUFDSCxJQUFELENBQVAsR0FBZ0JDLE9BQWhCO0FBQ0g7QUFDSixHQXpUUTs7QUEyVFQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQU4sRUFBQUEsS0FuVlMsaUJBbVZGUyxFQW5WRSxFQW1WRW5FLElBblZGLEVBbVZRK0QsSUFuVlIsRUFtVmM5RCxPQW5WZCxFQW1WdUJDLFVBblZ2QixFQW1WbUM7QUFDeEMsUUFBSWtFLFdBQUosRUFBaUJDLE9BQWpCLEVBQTBCQyxZQUExQjs7QUFDQSxRQUFJRixXQUFXLEdBQUczRSxNQUFNLENBQUM4RSxHQUFQLENBQVdKLEVBQVgsQ0FBbEIsRUFBa0M7QUFDOUJqRSxNQUFBQSxVQUFVLENBQUMsSUFBRCxFQUFPa0UsV0FBUCxDQUFWO0FBQ0gsS0FGRCxNQUdLLElBQUlDLE9BQU8sR0FBR3hFLFFBQVEsQ0FBQzBFLEdBQVQsQ0FBYUosRUFBYixDQUFkLEVBQStCO0FBQ2hDRSxNQUFBQSxPQUFPLENBQUNHLElBQVIsQ0FBYXRFLFVBQWI7QUFDSCxLQUZJLE1BR0EsSUFBSW9FLFlBQVksR0FBR0osT0FBTyxDQUFDSCxJQUFELENBQTFCLEVBQWlDO0FBQ2xDbEUsTUFBQUEsUUFBUSxDQUFDNEUsR0FBVCxDQUFhTixFQUFiLEVBQWlCLENBQUNqRSxVQUFELENBQWpCOztBQUNBb0UsTUFBQUEsWUFBWSxDQUFDdEUsSUFBRCxFQUFPQyxPQUFQLEVBQWdCLFVBQVVhLEdBQVYsRUFBZTRELElBQWYsRUFBcUI7QUFDN0MsWUFBSTVELEdBQUosRUFBUztBQUNMcEIsVUFBQUEsS0FBSyxDQUFDaUYsTUFBTixDQUFhUixFQUFiO0FBQ0gsU0FGRCxNQUdLLElBQUksQ0FBQzNFLE9BQU8sQ0FBQ2tGLElBQUQsQ0FBWixFQUFtQjtBQUNwQmpGLFVBQUFBLE1BQU0sQ0FBQ2dGLEdBQVAsQ0FBV04sRUFBWCxFQUFlTyxJQUFmO0FBQ0g7O0FBQ0QsWUFBSUUsU0FBUyxHQUFHL0UsUUFBUSxDQUFDOEUsTUFBVCxDQUFnQlIsRUFBaEIsQ0FBaEI7O0FBQ0EsYUFBSyxJQUFJVSxDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdGLFNBQVMsQ0FBQ0csTUFBOUIsRUFBc0NGLENBQUMsR0FBR0MsQ0FBMUMsRUFBNkNELENBQUMsRUFBOUMsRUFBa0Q7QUFDOUNELFVBQUFBLFNBQVMsQ0FBQ0MsQ0FBRCxDQUFULENBQWEvRCxHQUFiLEVBQWtCNEQsSUFBbEI7QUFDSDtBQUNKLE9BWFcsQ0FBWjtBQVlILEtBZEksTUFlQTtBQUNEeEUsTUFBQUEsVUFBVSxDQUFDLElBQUQsRUFBT0YsSUFBUCxDQUFWO0FBQ0g7QUFDSjtBQTdXUSxDQUFiO0FBZ1hBLElBQUlrRSxPQUFPLEdBQUc7QUFDVixVQUFTcEUsTUFBTSxDQUFDQyxVQUROO0FBRVYsVUFBU0QsTUFBTSxDQUFDQyxVQUZOO0FBR1YsVUFBU0QsTUFBTSxDQUFDQyxVQUhOO0FBSVYsV0FBVUQsTUFBTSxDQUFDQyxVQUpQO0FBS1YsVUFBU0QsTUFBTSxDQUFDQyxVQUxOO0FBTVYsVUFBU0QsTUFBTSxDQUFDQyxVQU5OO0FBT1YsV0FBVUQsTUFBTSxDQUFDQyxVQVBQO0FBUVYsV0FBVUQsTUFBTSxDQUFDQyxVQVJQO0FBU1YsWUFBV0QsTUFBTSxDQUFDQyxVQVRSO0FBVVYsVUFBU0QsTUFBTSxDQUFDdUIsV0FWTjtBQVdWLFVBQVN2QixNQUFNLENBQUMyQyxXQVhOO0FBWVY7QUFDQSxVQUFTM0MsTUFBTSxDQUFDaUIsVUFiTjtBQWNWLFVBQVNqQixNQUFNLENBQUNpQixVQWROO0FBZVYsVUFBU2pCLE1BQU0sQ0FBQ2lCLFVBZk47QUFnQlYsVUFBU2pCLE1BQU0sQ0FBQ2lCLFVBaEJOO0FBa0JWO0FBQ0EsWUFBV2pCLE1BQU0sQ0FBQzJELFVBbkJSO0FBb0JWLFlBQVczRCxNQUFNLENBQUM2RDtBQXBCUixDQUFkO0FBdUJBcUIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkYsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcbiAqL1xuXG5jb25zdCBwbGlzdFBhcnNlciA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDU0FYUGFyc2VyJykucGxpc3RQYXJzZXI7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCBkZXNlcmlhbGl6ZSA9IHJlcXVpcmUoJy4vZGVzZXJpYWxpemUnKTtcbmNvbnN0IENhY2hlID0gcmVxdWlyZSgnLi9jYWNoZScpO1xuY29uc3QgeyBpc1NjZW5lIH0gPSByZXF1aXJlKCcuL2hlbHBlcicpO1xuY29uc3QgeyBwYXJzZWQsIGZpbGVzIH0gPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xuY29uc3QgeyBfX2F1ZGlvU3VwcG9ydCwgY2FwYWJpbGl0aWVzIH0gPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ1N5cycpO1xuXG52YXIgX3BhcnNpbmcgPSBuZXcgQ2FjaGUoKTtcblxuLyoqXG4gKiAhI2VuXG4gKiBQYXJzZSB0aGUgZG93bmxvYWRlZCBmaWxlLCBpdCdzIGEgc2luZ2xldG9uLCBhbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXIucGFyc2VyYFxuICogXG4gKiAhI3poXG4gKiDop6PmnpDlt7LkuIvovb3nmoTmlofku7bvvIxwYXJzZXIg5piv5LiA5Liq5Y2V5L6LLCDmiYDmnInmiJDlkZjog73pgJrov4cgYGNjLmFzc2V0TWFuYWFnZXIucGFyc2VyYCDorr/pl65cbiAqIFxuICogQGNsYXNzIFBhcnNlclxuICovXG52YXIgcGFyc2VyID0ge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQYXJzZSBpbWFnZSBmaWxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOino+aekOWbvueJh+aWh+S7tlxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcGFyc2VJbWFnZVxuICAgICAqIEBwYXJhbSB7QmxvYn0gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzIFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIGNhbGxiYWNrIHdoZW4gZmluaXNoIHBhcnNpbmcuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBAcGFyYW0ge0ltYWdlQml0bWFwfEhUTUxJbWFnZUVsZW1lbnR9IG9uQ29tcGxldGUuaW1nIC0gVGhlIHBhcnNlZCBjb250ZW50XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkb3dubG9hZGVyLmRvd25sb2FkRmlsZSgndGVzdC5qcGcnLCB7cmVzcG9uc2VUeXBlOiAnYmxvYid9LCBudWxsLCAoZXJyLCBmaWxlKSA9PiB7XG4gICAgICogICAgICBwYXJzZXIucGFyc2VJbWFnZShmaWxlLCBudWxsLCAoZXJyLCBpbWcpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIH0pO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcGFyc2VJbWFnZShmaWxlOiBCbG9iLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGltZzogSW1hZ2VCaXRtYXB8SFRNTEltYWdlRWxlbWVudCkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKi9cbiAgICBwYXJzZUltYWdlIChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIGlmIChjYXBhYmlsaXRpZXMuaW1hZ2VCaXRtYXAgJiYgZmlsZSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIGxldCBpbWFnZU9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIGltYWdlT3B0aW9ucy5pbWFnZU9yaWVudGF0aW9uID0gb3B0aW9ucy5fX2ZsaXBZX18gPyAnZmxpcFknIDogJ25vbmUnO1xuICAgICAgICAgICAgaW1hZ2VPcHRpb25zLnByZW11bHRpcGx5QWxwaGEgPSBvcHRpb25zLl9fcHJlbXVsdGlwbHlBbHBoYV9fID8gJ3ByZW11bHRpcGx5JyA6ICdub25lJztcbiAgICAgICAgICAgIGNyZWF0ZUltYWdlQml0bWFwKGZpbGUsIGltYWdlT3B0aW9ucykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZsaXBZID0gISFvcHRpb25zLl9fZmxpcFlfXztcbiAgICAgICAgICAgICAgICByZXN1bHQucHJlbXVsdGlwbHlBbHBoYSA9ICEhb3B0aW9ucy5fX3ByZW11bHRpcGx5QWxwaGFfXztcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyLCBudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwsIGZpbGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQYXJzZSBhdWRpbyBmaWxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOino+aekOmfs+mikeaWh+S7tlxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcGFyc2VBdWRpb1xuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ8SFRNTEF1ZGlvRWxlbWVudH0gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIENhbGxiYWNrIHdoZW4gZmluaXNoIHBhcnNpbmcuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQnVmZmVyfEhUTUxBdWRpb0VsZW1lbnR9IG9uQ29tcGxldGUuYXVkaW8gLSBUaGUgcGFyc2VkIGNvbnRlbnRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCd0ZXN0Lm1wMycsIHtyZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcid9LCBudWxsLCAoZXJyLCBmaWxlKSA9PiB7XG4gICAgICogICAgICBwYXJzZXIucGFyc2VBdWRpbyhmaWxlLCBudWxsLCAoZXJyLCBhdWRpbykgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwYXJzZUF1ZGlvKGZpbGU6IEFycmF5QnVmZmVyfEhUTUxBdWRpb0VsZW1lbnQsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgYXVkaW86IEF1ZGlvQnVmZmVyfEhUTUxBdWRpb0VsZW1lbnQpID0+IHZvaWQpOiB2b2lkXG4gICAgICovXG4gICAgcGFyc2VBdWRpbyAoZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7IFxuICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoZmlsZSwgZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShudWxsLCBidWZmZXIpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGUsIG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobnVsbCwgZmlsZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFBhcnNlIHB2ciBmaWxlIFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDop6PmnpDljovnvKnnurnnkIbmoLzlvI8gcHZyIOaWh+S7tlxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcGFyc2VQVlJUZXhcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfEFycmF5QnVmZmVyVmlld30gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIENhbGxiYWNrIHdoZW4gZmluaXNoIHBhcnNpbmcuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Db21wbGV0ZS5wdnJBc3NldCAtIFRoZSBwYXJzZWQgY29udGVudFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QucHZyJywge3Jlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcbiAgICAgKiAgICAgIHBhcnNlci5wYXJzZVBWUlRleChmaWxlLCBudWxsLCAoZXJyLCBwdnJBc3NldCkgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwYXJzZVBWUlRleChmaWxlOiBBcnJheUJ1ZmZlcnxBcnJheUJ1ZmZlclZpZXcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBwdnJBc3NldDoge19kYXRhOiBVaW50OEFycmF5LCBfY29tcHJlc3NlZDogYm9vbGVhbiwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9KSA9PiB2b2lkKTogdm9pZFxuICAgICAqL1xuICAgIHBhcnNlUFZSVGV4IDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy89PT09PT09PT09PT09PT0vL1xuICAgICAgICAvLyBQVlIgY29uc3RhbnRzIC8vXG4gICAgICAgIC8vPT09PT09PT09PT09PT09Ly9cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RvamkvdGV4dHVyZS10ZXN0ZXIvYmxvYi9tYXN0ZXIvanMvd2ViZ2wtdGV4dHVyZS11dGlsLmpzI0w0MjRcbiAgICAgICAgY29uc3QgUFZSX0hFQURFUl9MRU5HVEggPSAxMzsgLy8gVGhlIGhlYWRlciBsZW5ndGggaW4gMzIgYml0IGludHMuXG4gICAgICAgIGNvbnN0IFBWUl9NQUdJQyA9IDB4MDM1MjU2NTA7IC8vMHg1MDU2NTIwMztcbiAgICBcbiAgICAgICAgLy8gT2Zmc2V0cyBpbnRvIHRoZSBoZWFkZXIgYXJyYXkuXG4gICAgICAgIGNvbnN0IFBWUl9IRUFERVJfTUFHSUMgPSAwO1xuICAgICAgICBjb25zdCBQVlJfSEVBREVSX0ZPUk1BVCA9IDI7XG4gICAgICAgIGNvbnN0IFBWUl9IRUFERVJfSEVJR0hUID0gNjtcbiAgICAgICAgY29uc3QgUFZSX0hFQURFUl9XSURUSCA9IDc7XG4gICAgICAgIGNvbnN0IFBWUl9IRUFERVJfTUlQTUFQQ09VTlQgPSAxMTtcbiAgICAgICAgY29uc3QgUFZSX0hFQURFUl9NRVRBREFUQSA9IDEyO1xuICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBudWxsLCBvdXQgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyID0gZmlsZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gZmlsZSA6IGZpbGUuYnVmZmVyO1xuICAgICAgICAgICAgICAgIC8vIEdldCBhIHZpZXcgb2YgdGhlIGFycmF5QnVmZmVyIHRoYXQgcmVwcmVzZW50cyB0aGUgRERTIGhlYWRlci5cbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVyID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLCAwLCBQVlJfSEVBREVSX0xFTkdUSCk7XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gRG8gc29tZSBzYW5pdHkgY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGlzIGlzIGEgdmFsaWQgRERTIGZpbGUuXG4gICAgICAgICAgICAgICAgaWYoaGVhZGVyW1BWUl9IRUFERVJfTUFHSUNdICE9IFBWUl9NQUdJQykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG1hZ2ljIG51bWJlciBpbiBQVlIgaGVhZGVyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAvLyBHYXRoZXIgb3RoZXIgYmFzaWMgbWV0cmljcyBhbmQgYSB2aWV3IG9mIHRoZSByYXcgdGhlIERYVCBkYXRhLlxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IGhlYWRlcltQVlJfSEVBREVSX1dJRFRIXTtcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gaGVhZGVyW1BWUl9IRUFERVJfSEVJR0hUXTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YU9mZnNldCA9IGhlYWRlcltQVlJfSEVBREVSX01FVEFEQVRBXSArIDUyO1xuICAgICAgICAgICAgICAgIGxldCBwdnJ0Y0RhdGEgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGRhdGFPZmZzZXQpO1xuICAgIFxuICAgICAgICAgICAgICAgIG91dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGE6IHB2cnRjRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgX2NvbXByZXNzZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIG91dCk7XG4gICAgICAgIH07XG4gICAgfSkoKSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQYXJzZSBwa20gZmlsZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDop6PmnpDljovnvKnnurnnkIbmoLzlvI8gcGttIOaWh+S7tlxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcGFyc2VQS01UZXhcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfEFycmF5QnVmZmVyVmlld30gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIENhbGxiYWNrIHdoZW4gZmluaXNoIHBhcnNpbmcuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Db21wbGV0ZS5ldGNBc3NldCAtIFRoZSBwYXJzZWQgY29udGVudFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QucGttJywge3Jlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcbiAgICAgKiAgICAgIHBhcnNlci5wYXJzZVBLTVRleChmaWxlLCBudWxsLCAoZXJyLCBldGNBc3NldCkgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwYXJzZVBLTVRleChmaWxlOiBBcnJheUJ1ZmZlcnxBcnJheUJ1ZmZlclZpZXcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBldGNBc3NldDoge19kYXRhOiBVaW50OEFycmF5LCBfY29tcHJlc3NlZDogYm9vbGVhbiwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9KSA9PiB2b2lkKTogdm9pZFxuICAgICAqL1xuICAgIHBhcnNlUEtNVGV4OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLz09PT09PT09PT09PT09PS8vXG4gICAgICAgIC8vIEVUQyBjb25zdGFudHMgLy9cbiAgICAgICAgLy89PT09PT09PT09PT09PT0vL1xuICAgICAgICBjb25zdCBFVENfUEtNX0hFQURFUl9TSVpFID0gMTY7XG5cbiAgICAgICAgY29uc3QgRVRDX1BLTV9GT1JNQVRfT0ZGU0VUID0gNjtcbiAgICAgICAgY29uc3QgRVRDX1BLTV9FTkNPREVEX1dJRFRIX09GRlNFVCA9IDg7XG4gICAgICAgIGNvbnN0IEVUQ19QS01fRU5DT0RFRF9IRUlHSFRfT0ZGU0VUID0gMTA7XG4gICAgICAgIGNvbnN0IEVUQ19QS01fV0lEVEhfT0ZGU0VUID0gMTI7XG4gICAgICAgIGNvbnN0IEVUQ19QS01fSEVJR0hUX09GRlNFVCA9IDE0O1xuXG4gICAgICAgIGNvbnN0IEVUQzFfUkdCX05PX01JUE1BUFMgICA9IDA7XG4gICAgICAgIGNvbnN0IEVUQzJfUkdCX05PX01JUE1BUFMgICA9IDE7XG4gICAgICAgIGNvbnN0IEVUQzJfUkdCQV9OT19NSVBNQVBTICA9IDM7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVhZEJFVWludDE2KGhlYWRlciwgb2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gKGhlYWRlcltvZmZzZXRdIDw8IDgpIHwgaGVhZGVyW29mZnNldCsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGxldCBlcnIgPSBudWxsLCBvdXQgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyID0gZmlsZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gZmlsZSA6IGZpbGUuYnVmZmVyO1xuICAgICAgICAgICAgICAgIGxldCBoZWFkZXIgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgICAgICAgICAgICAgIGxldCBmb3JtYXQgPSByZWFkQkVVaW50MTYoaGVhZGVyLCBFVENfUEtNX0ZPUk1BVF9PRkZTRVQpO1xuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IEVUQzFfUkdCX05PX01JUE1BUFMgJiYgZm9ybWF0ICE9PSBFVEMyX1JHQl9OT19NSVBNQVBTICYmIGZvcm1hdCAhPT0gRVRDMl9SR0JBX05PX01JUE1BUFMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkludmFsaWQgbWFnaWMgbnVtYmVyIGluIEVUQyBoZWFkZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IHJlYWRCRVVpbnQxNihoZWFkZXIsIEVUQ19QS01fV0lEVEhfT0ZGU0VUKTtcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVhZEJFVWludDE2KGhlYWRlciwgRVRDX1BLTV9IRUlHSFRfT0ZGU0VUKTtcbiAgICAgICAgICAgICAgICBsZXQgZW5jb2RlZFdpZHRoID0gcmVhZEJFVWludDE2KGhlYWRlciwgRVRDX1BLTV9FTkNPREVEX1dJRFRIX09GRlNFVCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuY29kZWRIZWlnaHQgPSByZWFkQkVVaW50MTYoaGVhZGVyLCBFVENfUEtNX0VOQ09ERURfSEVJR0hUX09GRlNFVCk7XG4gICAgICAgICAgICAgICAgbGV0IGV0Y0RhdGEgPSBuZXcgVWludDhBcnJheShidWZmZXIsIEVUQ19QS01fSEVBREVSX1NJWkUpO1xuICAgICAgICAgICAgICAgIG91dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGE6IGV0Y0RhdGEsXG4gICAgICAgICAgICAgICAgICAgIF9jb21wcmVzc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIG91dCk7XG4gICAgICAgIH1cbiAgICB9KSgpLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFBhcnNlIHBsaXN0IGZpbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6Kej5p6QIHBsaXN0IOaWh+S7tlxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcGFyc2VQbGlzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlIC0gVGhlIGRvd25sb2FkZWQgZmlsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlIC0gQ2FsbGJhY2sgd2hlbiBmaW5pc2ggcGFyc2luZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHsqfSBvbkNvbXBsZXRlLmRhdGEgLSBUaGUgcGFyc2VkIGNvbnRlbnRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCd0ZXN0LnBsaXN0Jywge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xuICAgICAqICAgICAgcGFyc2VyLnBhcnNlUGxpc3QoZmlsZSwgbnVsbCwgKGVyciwgZGF0YSkgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwYXJzZVBsaXN0KGZpbGU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXG4gICAgICovXG4gICAgcGFyc2VQbGlzdCAoZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICB2YXIgZXJyID0gbnVsbDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBsaXN0UGFyc2VyLnBhcnNlKGZpbGUpO1xuICAgICAgICBpZiAoIXJlc3VsdCkgZXJyID0gbmV3IEVycm9yKCdwYXJzZSBmYWlsZWQnKTtcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVyciwgcmVzdWx0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIERlc2VyaWFsaXplIGFzc2V0IGZpbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5Y+N5bqP5YiX5YyW6LWE5rqQ5paH5Lu2XG4gICAgICogXG4gICAgICogQG1ldGhvZCBwYXJzZUltcG9ydFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBmaWxlIC0gVGhlIHNlcmlhbGl6ZWQganNvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlIC0gQ2FsbGJhY2sgd2hlbiBmaW5pc2ggcGFyc2luZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHtBc3NldH0gb25Db21wbGV0ZS5hc3NldCAtIFRoZSBwYXJzZWQgY29udGVudFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QuanNvbicsIHtyZXNwb25zZVR5cGU6ICdqc29uJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcbiAgICAgKiAgICAgIHBhcnNlci5wYXJzZUltcG9ydChmaWxlLCBudWxsLCAoZXJyLCBkYXRhKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiB9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHBhcnNlSW1wb3J0IChmaWxlOiBhbnksIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgYXNzZXQ6IGNjLkFzc2V0KSA9PiB2b2lkKTogdm9pZFxuICAgICAqL1xuICAgIHBhcnNlSW1wb3J0IChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIGlmICghZmlsZSkgcmV0dXJuIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoJ0pzb24gaXMgZW1wdHknKSk7XG4gICAgICAgIHZhciByZXN1bHQsIGVyciA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBkZXNlcmlhbGl6ZShmaWxlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgfVxuICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyLCByZXN1bHQpO1xuICAgIH0sXG5cbiAgICBpbml0ICgpIHtcbiAgICAgICAgX3BhcnNpbmcuY2xlYXIoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlZ2lzdGVyIGN1c3RvbSBoYW5kbGVyIGlmIHlvdSB3YW50IHRvIGNoYW5nZSBkZWZhdWx0IGJlaGF2aW9yIG9yIGV4dGVuZCBwYXJzZXIgdG8gcGFyc2Ugb3RoZXIgZm9ybWF0IGZpbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5b2T5L2g5oOz5L+u5pS56buY6K6k6KGM5Li65oiW6ICF5ouT5bGVIHBhcnNlciDmnaXop6PmnpDlhbbku5bmoLzlvI/mlofku7bml7blj6/ku6Xms6jlhozoh6rlrprkuYnnmoRoYW5kbGVyXG4gICAgICogXG4gICAgICogQG1ldGhvZCByZWdpc3RlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gdHlwZSAtIEV4dGVuc2lvbiBsaWtlcyAnLmpwZycgb3IgbWFwIGxpa2VzIHsnLmpwZyc6IGpwZ0hhbmRsZXIsICcucG5nJzogcG5nSGFuZGxlcn1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaGFuZGxlcl0gLSBUaGUgY29ycmVzcG9uZGluZyBoYW5kbGVyXG4gICAgICogQHBhcmFtIHsqfSBoYW5kbGVyLmZpbGUgLSBGaWxlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIub3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyLm9uQ29tcGxldGUgLSBjYWxsYmFjayB3aGVuIGZpbmlzaGluZyBwYXJzaW5nXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwYXJzZXIucmVnaXN0ZXIoJy50Z2EnLCAoZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4gb25Db21wbGV0ZShudWxsLCBudWxsKSk7XG4gICAgICogcGFyc2VyLnJlZ2lzdGVyKHsnLnRnYSc6IChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpLCAnLmV4dCc6IChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWdpc3Rlcih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IChmaWxlOiBhbnksIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcmVnaXN0ZXIobWFwOiBSZWNvcmQ8c3RyaW5nLCAoZmlsZTogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB2b2lkKSA9PiB2b2lkPik6IHZvaWRcbiAgICAgKi9cbiAgICByZWdpc3RlciAodHlwZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBqcy5taXhpbihwYXJzZXJzLCB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlcnNbdHlwZV0gPSBoYW5kbGVyO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVc2UgY29ycmVzcG9uZGluZyBoYW5kbGVyIHRvIHBhcnNlIGZpbGUgXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS9v+eUqOWvueW6lOeahGhhbmRsZXLmnaXop6PmnpDmlofku7ZcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHBhcnNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIGlkIG9mIGZpbGVcbiAgICAgKiBAcGFyYW0geyp9IGZpbGUgLSBGaWxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgY29ycmVzcG9uZGluZyB0eXBlIG9mIGZpbGUsIGxpa2VzICcuanBnJy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzIHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gdGhlIGNvcnJlc3BvbmRpbmcgaGFuZGxlci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlIC0gY2FsbGJhY2sgd2hlbiBmaW5pc2hpbmcgZG93bmxvYWRpbmdcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xuICAgICAqIEBwYXJhbSB7Kn0gb25Db21wbGV0ZS5jb250ZXRudCAtIFRoZSBwYXJzZWQgZmlsZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QuanBnJywge3Jlc3BvbnNlVHlwZTogJ2Jsb2InfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xuICAgICAqICAgICAgcGFyc2VyLnBhcnNlKCd0ZXN0LmpwZycsIGZpbGUsICcuanBnJywgbnVsbCwgKGVyciwgaW1nKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiB9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHBhcnNlKGlkOiBzdHJpbmcsIGZpbGU6IGFueSwgdHlwZTogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKTogdm9pZFxuICAgICAqL1xuICAgIHBhcnNlIChpZCwgZmlsZSwgdHlwZSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICBsZXQgcGFyc2VkQXNzZXQsIHBhcnNpbmcsIHBhcnNlSGFuZGxlcjtcbiAgICAgICAgaWYgKHBhcnNlZEFzc2V0ID0gcGFyc2VkLmdldChpZCkpIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGUobnVsbCwgcGFyc2VkQXNzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcnNpbmcgPSBfcGFyc2luZy5nZXQoaWQpKXtcbiAgICAgICAgICAgIHBhcnNpbmcucHVzaChvbkNvbXBsZXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYXJzZUhhbmRsZXIgPSBwYXJzZXJzW3R5cGVdKXtcbiAgICAgICAgICAgIF9wYXJzaW5nLmFkZChpZCwgW29uQ29tcGxldGVdKTtcbiAgICAgICAgICAgIHBhcnNlSGFuZGxlcihmaWxlLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBmaWxlcy5yZW1vdmUoaWQpO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIWlzU2NlbmUoZGF0YSkpe1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQuYWRkKGlkLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IF9wYXJzaW5nLnJlbW92ZShpZCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXShlcnIsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb25Db21wbGV0ZShudWxsLCBmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBwYXJzZXJzID0ge1xuICAgICcucG5nJyA6IHBhcnNlci5wYXJzZUltYWdlLFxuICAgICcuanBnJyA6IHBhcnNlci5wYXJzZUltYWdlLFxuICAgICcuYm1wJyA6IHBhcnNlci5wYXJzZUltYWdlLFxuICAgICcuanBlZycgOiBwYXJzZXIucGFyc2VJbWFnZSxcbiAgICAnLmdpZicgOiBwYXJzZXIucGFyc2VJbWFnZSxcbiAgICAnLmljbycgOiBwYXJzZXIucGFyc2VJbWFnZSxcbiAgICAnLnRpZmYnIDogcGFyc2VyLnBhcnNlSW1hZ2UsXG4gICAgJy53ZWJwJyA6IHBhcnNlci5wYXJzZUltYWdlLFxuICAgICcuaW1hZ2UnIDogcGFyc2VyLnBhcnNlSW1hZ2UsXG4gICAgJy5wdnInIDogcGFyc2VyLnBhcnNlUFZSVGV4LFxuICAgICcucGttJyA6IHBhcnNlci5wYXJzZVBLTVRleCxcbiAgICAvLyBBdWRpb1xuICAgICcubXAzJyA6IHBhcnNlci5wYXJzZUF1ZGlvLFxuICAgICcub2dnJyA6IHBhcnNlci5wYXJzZUF1ZGlvLFxuICAgICcud2F2JyA6IHBhcnNlci5wYXJzZUF1ZGlvLFxuICAgICcubTRhJyA6IHBhcnNlci5wYXJzZUF1ZGlvLFxuXG4gICAgLy8gcGxpc3RcbiAgICAnLnBsaXN0JyA6IHBhcnNlci5wYXJzZVBsaXN0LFxuICAgICdpbXBvcnQnIDogcGFyc2VyLnBhcnNlSW1wb3J0XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlcjsiXSwic291cmNlUm9vdCI6Ii8ifQ==