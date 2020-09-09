
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/pack-manager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _deserializeCompiled = require("../platform/deserialize-compiled");

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
var downloader = require('./downloader');

var Cache = require('./cache');

var js = require('../platform/js');

var _require = require('./shared'),
    files = _require.files;

var _loading = new Cache();

function isLoading(val) {
  return _loading.has(val.uuid);
}
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * Handle the packed asset, include unpacking, loading, cache and so on. It is a singleton. All member can be accessed with `cc.assetManager.packManager`
 * 
 * !#zh
 * 处理打包资源，包括拆包，加载，缓存等等，这是一个单例, 所有成员能通过 `cc.assetManager.packManager` 访问
 * 
 * @class PackManager
 */


var packManager = {
  /**
   * !#en
   * Unpack the json, revert to what it was before packing
   * 
   * !#zh
   * 拆解 json 包，恢复为打包之前的内容
   * 
   * @method unpackJson
   * @param {String[]} pack - The pack
   * @param {Object} json - The content of pack
   * @param {Object} options - Some optional parameters
   * @param {Function} onComplete - Callback when finish unpacking
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Object} onComplete.content - The unpacked assets
   * 
   * @example
   * downloader.downloadFile('pack.json', {responseType: 'json'}, null, (err, file) => {
   *      packManager.unpackJson(['a', 'b'], file, null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * unpackJson(pack: string[], json: any, options: Record<string, any>, onComplete?: (err: Error, content: any) => void): void
   */
  unpackJson: function unpackJson(pack, json, options, onComplete) {
    var out = js.createMap(true),
        err = null;

    if (Array.isArray(json)) {
      json = (0, _deserializeCompiled.unpackJSONs)(json, cc._MissingScript.safeFindClass);

      if (json.length !== pack.length) {
        cc.errorID(4915);
      }

      for (var i = 0; i < pack.length; i++) {
        var key = pack[i] + '@import';
        out[key] = json[i];
      }
    } else {
      var textureType = js._getClassId(cc.Texture2D);

      if (json.type === textureType) {
        if (json.data) {
          var datas = json.data.split('|');

          if (datas.length !== pack.length) {
            cc.errorID(4915);
          }

          for (var _i = 0; _i < pack.length; _i++) {
            out[pack[_i] + '@import'] = (0, _deserializeCompiled.packCustomObjData)(textureType, datas[_i]);
          }
        }
      } else {
        err = new Error('unmatched type pack!');
        out = null;
      }
    }

    onComplete && onComplete(err, out);
  },
  init: function init() {
    _loading.clear();
  },

  /**
   * !#en
   * Register custom handler if you want to change default behavior or extend packManager to unpack other format pack
   * 
   * !#zh
   * 当你想修改默认行为或者拓展 packManager 来拆分其他格式的包时可以注册自定义的 handler
   * 
   * @method register
   * @param {string|Object} type - Extension likes '.bin' or map likes {'.bin': binHandler, '.ab': abHandler}
   * @param {Function} [handler] - handler
   * @param {string} handler.packUuid - The uuid of pack
   * @param {*} handler.data - The content of pack
   * @param {Object} handler.options - Some optional parameters
   * @param {Function} handler.onComplete - Callback when finishing unpacking
   * 
   * @example
   * packManager.register('.bin', (packUuid, file, options, onComplete) => onComplete(null, null));
   * packManager.register({'.bin': (packUuid, file, options, onComplete) => onComplete(null, null), '.ab': (packUuid, file, options, onComplete) => onComplete(null, null)});
   * 
   * @typescript
   * register(type: string, handler: (packUuid: string, data: any, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void): void
   * register(map: Record<string, (packUuid: string, data: any, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void>): void
   */
  register: function register(type, handler) {
    if (typeof type === 'object') {
      js.mixin(unpackers, type);
    } else {
      unpackers[type] = handler;
    }
  },

  /**
   * !#en
   * Use corresponding handler to unpack package
   * 
   * !#zh
   * 用对应的 handler 来进行解包 
   * 
   * @method unpack
   * @param {String[]} pack - The uuid of packed assets 
   * @param {*} data - The packed data
   * @param {string} type - The type indicates that which handler should be used to download, such as '.jpg'
   * @param {Object} options - Some optional parameter
   * @param {Function} onComplete - callback when finishing unpacking
   * @param {Error} onComplete.err -  The occurred error, null indicetes success
   * @param {*} onComplete.data - Original assets
   * 
   * @example
   * downloader.downloadFile('pack.json', {responseType: 'json'}, null, (err, file) => {
   *      packManager.unpack(['2fawq123d', '1zsweq23f'], file, '.json', null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * unpack(pack: string[], data: any, type: string, options: Record<string, any>, onComplete?: (err: Error, data: any) => void): void
   */
  unpack: function unpack(pack, data, type, options, onComplete) {
    if (!data) {
      onComplete && onComplete(new Error('package data is wrong!'));
      return;
    }

    var unpacker = unpackers[type];
    unpacker(pack, data, options, onComplete);
  },

  /**
   * !#en
   * Download request item, If item is not in any package, download as usual. Otherwise, download the corresponding package and unpack it. 
   * And then retrieve the corresponding content form it.
   * 
   * !#zh
   * 下载请求对象，如果请求对象不在任何包内，则正常下载，否则下载对应的 package 并进行拆解，并取回包内对应的内容
   * 
   * @method load
   * @param {RequestItem} item - Some item you want to download
   * @param {Object} options - Some optional parameters
   * @param {Function} onComplete - Callback when finished
   * @param {Err} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.data - The unpacked data retrieved from package
   * 
   * @example
   * var requestItem = cc.AssetManager.RequestItem.create();
   * requestItem.uuid = 'fcmR3XADNLgJ1ByKhqcC5Z';
   * requestItem.info = config.getAssetInfo('fcmR3XADNLgJ1ByKhqcC5Z');
   * packManager.load(requestItem, null, (err, data) => console.log(err));
   * 
   * @typescript
   * load(item: RequestItem, options: Record<string, any>, onComplete: (err: Error, data: any) => void): void
   * 
   */
  load: function load(item, options, onComplete) {
    // if not in any package, download as uausl
    if (item.isNative || !item.info || !item.info.packs) return downloader.download(item.id, item.url, item.ext, item.options, onComplete);
    if (files.has(item.id)) return onComplete(null, files.get(item.id));
    var packs = item.info.packs; // find a loading package

    var pack = packs.find(isLoading);
    if (pack) return _loading.get(pack.uuid).push({
      onComplete: onComplete,
      id: item.id
    }); // download a new package

    pack = packs[0];

    _loading.add(pack.uuid, [{
      onComplete: onComplete,
      id: item.id
    }]);

    var url = cc.assetManager._transform(pack.uuid, {
      ext: pack.ext,
      bundle: item.config.name
    });

    downloader.download(pack.uuid, url, pack.ext, item.options, function (err, data) {
      files.remove(pack.uuid);

      if (err) {
        cc.error(err.message, err.stack);
      } // unpack package


      packManager.unpack(pack.packs, data, pack.ext, item.options, function (err, result) {
        if (!err) {
          for (var id in result) {
            files.add(id, result[id]);
          }
        }

        var callbacks = _loading.remove(pack.uuid);

        for (var i = 0, l = callbacks.length; i < l; i++) {
          var cb = callbacks[i];

          if (err) {
            cb.onComplete(err);
            continue;
          }

          var data = result[cb.id];

          if (!data) {
            cb.onComplete(new Error('can not retrieve data from package'));
          } else {
            cb.onComplete(null, data);
          }
        }
      });
    });
  }
};
var unpackers = {
  '.json': packManager.unpackJson
};
module.exports = packManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvcGFjay1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImRvd25sb2FkZXIiLCJyZXF1aXJlIiwiQ2FjaGUiLCJqcyIsImZpbGVzIiwiX2xvYWRpbmciLCJpc0xvYWRpbmciLCJ2YWwiLCJoYXMiLCJ1dWlkIiwicGFja01hbmFnZXIiLCJ1bnBhY2tKc29uIiwicGFjayIsImpzb24iLCJvcHRpb25zIiwib25Db21wbGV0ZSIsIm91dCIsImNyZWF0ZU1hcCIsImVyciIsIkFycmF5IiwiaXNBcnJheSIsImNjIiwiX01pc3NpbmdTY3JpcHQiLCJzYWZlRmluZENsYXNzIiwibGVuZ3RoIiwiZXJyb3JJRCIsImkiLCJrZXkiLCJ0ZXh0dXJlVHlwZSIsIl9nZXRDbGFzc0lkIiwiVGV4dHVyZTJEIiwidHlwZSIsImRhdGEiLCJkYXRhcyIsInNwbGl0IiwiRXJyb3IiLCJpbml0IiwiY2xlYXIiLCJyZWdpc3RlciIsImhhbmRsZXIiLCJtaXhpbiIsInVucGFja2VycyIsInVucGFjayIsInVucGFja2VyIiwibG9hZCIsIml0ZW0iLCJpc05hdGl2ZSIsImluZm8iLCJwYWNrcyIsImRvd25sb2FkIiwiaWQiLCJ1cmwiLCJleHQiLCJnZXQiLCJmaW5kIiwicHVzaCIsImFkZCIsImFzc2V0TWFuYWdlciIsIl90cmFuc2Zvcm0iLCJidW5kbGUiLCJjb25maWciLCJuYW1lIiwicmVtb3ZlIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhY2siLCJyZXN1bHQiLCJjYWxsYmFja3MiLCJsIiwiY2IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBeUJBOztBQXpCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLElBQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLGNBQUQsQ0FBMUI7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFNRSxFQUFF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LENBQUN0RCxVQUFILENBQWMsSUFBSW9CLEtBQUosQ0FBVSxvQ0FBVixDQUFkO0FBQ0gsV0FGRCxNQUdLO0FBQ0RrQyxZQUFBQSxFQUFFLENBQUN0RCxVQUFILENBQWMsSUFBZCxFQUFvQmlCLElBQXBCO0FBQ0g7QUFDSjtBQUNKLE9BdEJEO0FBdUJILEtBN0JEO0FBOEJIO0FBN01hLENBQWxCO0FBZ05BLElBQUlTLFNBQVMsR0FBRztBQUNaLFdBQVMvQixXQUFXLENBQUNDO0FBRFQsQ0FBaEI7QUFJQTJELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdELFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7IHVucGFja0pTT05zLCBwYWNrQ3VzdG9tT2JqRGF0YSB9IGZyb20gJy4uL3BsYXRmb3JtL2Rlc2VyaWFsaXplLWNvbXBpbGVkJztcblxuY29uc3QgZG93bmxvYWRlciA9IHJlcXVpcmUoJy4vZG93bmxvYWRlcicpO1xuY29uc3QgQ2FjaGUgPSByZXF1aXJlKCcuL2NhY2hlJyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCB7IGZpbGVzIH0gPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xuXG52YXIgX2xvYWRpbmcgPSBuZXcgQ2FjaGUoKTtcblxuZnVuY3Rpb24gaXNMb2FkaW5nICh2YWwpIHtcbiAgICByZXR1cm4gX2xvYWRpbmcuaGFzKHZhbC51dWlkKTtcbn1cblxuXG4vKipcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXG4gKi9cbi8qKlxuICogISNlblxuICogSGFuZGxlIHRoZSBwYWNrZWQgYXNzZXQsIGluY2x1ZGUgdW5wYWNraW5nLCBsb2FkaW5nLCBjYWNoZSBhbmQgc28gb24uIEl0IGlzIGEgc2luZ2xldG9uLiBBbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXIucGFja01hbmFnZXJgXG4gKiBcbiAqICEjemhcbiAqIOWkhOeQhuaJk+WMhei1hOa6kO+8jOWMheaLrOaLhuWMhe+8jOWKoOi9ve+8jOe8k+WtmOetieetie+8jOi/meaYr+S4gOS4quWNleS+iywg5omA5pyJ5oiQ5ZGY6IO96YCa6L+HIGBjYy5hc3NldE1hbmFnZXIucGFja01hbmFnZXJgIOiuv+mXrlxuICogXG4gKiBAY2xhc3MgUGFja01hbmFnZXJcbiAqL1xudmFyIHBhY2tNYW5hZ2VyID0ge1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFVucGFjayB0aGUganNvbiwgcmV2ZXJ0IHRvIHdoYXQgaXQgd2FzIGJlZm9yZSBwYWNraW5nXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOaLhuinoyBqc29uIOWMhe+8jOaBouWkjeS4uuaJk+WMheS5i+WJjeeahOWGheWuuVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgdW5wYWNrSnNvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2sgLSBUaGUgcGFja1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIC0gVGhlIGNvbnRlbnQgb2YgcGFja1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIENhbGxiYWNrIHdoZW4gZmluaXNoIHVucGFja2luZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9uQ29tcGxldGUuY29udGVudCAtIFRoZSB1bnBhY2tlZCBhc3NldHNcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCdwYWNrLmpzb24nLCB7cmVzcG9uc2VUeXBlOiAnanNvbid9LCBudWxsLCAoZXJyLCBmaWxlKSA9PiB7XG4gICAgICogICAgICBwYWNrTWFuYWdlci51bnBhY2tKc29uKFsnYScsICdiJ10sIGZpbGUsIG51bGwsIChlcnIsIGRhdGEpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIH0pO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdW5wYWNrSnNvbihwYWNrOiBzdHJpbmdbXSwganNvbjogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGNvbnRlbnQ6IGFueSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKi9cbiAgICB1bnBhY2tKc29uIChwYWNrLCBqc29uLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG5cbiAgICAgICAgdmFyIG91dCA9IGpzLmNyZWF0ZU1hcCh0cnVlKSwgZXJyID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG5cbiAgICAgICAgICAgIGpzb24gPSB1bnBhY2tKU09Ocyhqc29uLCBjYy5fTWlzc2luZ1NjcmlwdC5zYWZlRmluZENsYXNzKTtcblxuICAgICAgICAgICAgaWYgKGpzb24ubGVuZ3RoICE9PSBwYWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNDkxNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcGFja1tpXSArICdAaW1wb3J0JztcbiAgICAgICAgICAgICAgICBvdXRba2V5XSA9IGpzb25baV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlVHlwZSA9IGpzLl9nZXRDbGFzc0lkKGNjLlRleHR1cmUyRCk7XG4gICAgICAgICAgICBpZiAoanNvbi50eXBlID09PSB0ZXh0dXJlVHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFzID0ganNvbi5kYXRhLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhcy5sZW5ndGggIT09IHBhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDQ5MTUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFjay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0W3BhY2tbaV0gKyAnQGltcG9ydCddID0gcGFja0N1c3RvbU9iakRhdGEodGV4dHVyZVR5cGUsIGRhdGFzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcigndW5tYXRjaGVkIHR5cGUgcGFjayEnKTtcbiAgICAgICAgICAgICAgICBvdXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIG91dCk7XG4gICAgfSxcblxuICAgIGluaXQgKCkge1xuICAgICAgICBfbG9hZGluZy5jbGVhcigpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVnaXN0ZXIgY3VzdG9tIGhhbmRsZXIgaWYgeW91IHdhbnQgdG8gY2hhbmdlIGRlZmF1bHQgYmVoYXZpb3Igb3IgZXh0ZW5kIHBhY2tNYW5hZ2VyIHRvIHVucGFjayBvdGhlciBmb3JtYXQgcGFja1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlvZPkvaDmg7Pkv67mlLnpu5jorqTooYzkuLrmiJbogIXmi5PlsZUgcGFja01hbmFnZXIg5p2l5ouG5YiG5YW25LuW5qC85byP55qE5YyF5pe25Y+v5Lul5rOo5YaM6Ieq5a6a5LmJ55qEIGhhbmRsZXJcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSB0eXBlIC0gRXh0ZW5zaW9uIGxpa2VzICcuYmluJyBvciBtYXAgbGlrZXMgeycuYmluJzogYmluSGFuZGxlciwgJy5hYic6IGFiSGFuZGxlcn1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaGFuZGxlcl0gLSBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGhhbmRsZXIucGFja1V1aWQgLSBUaGUgdXVpZCBvZiBwYWNrXG4gICAgICogQHBhcmFtIHsqfSBoYW5kbGVyLmRhdGEgLSBUaGUgY29udGVudCBvZiBwYWNrXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXIub3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIub25Db21wbGV0ZSAtIENhbGxiYWNrIHdoZW4gZmluaXNoaW5nIHVucGFja2luZ1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogcGFja01hbmFnZXIucmVnaXN0ZXIoJy5iaW4nLCAocGFja1V1aWQsIGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpID0+IG9uQ29tcGxldGUobnVsbCwgbnVsbCkpO1xuICAgICAqIHBhY2tNYW5hZ2VyLnJlZ2lzdGVyKHsnLmJpbic6IChwYWNrVXVpZCwgZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4gb25Db21wbGV0ZShudWxsLCBudWxsKSwgJy5hYic6IChwYWNrVXVpZCwgZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4gb25Db21wbGV0ZShudWxsLCBudWxsKX0pO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcmVnaXN0ZXIodHlwZTogc3RyaW5nLCBoYW5kbGVyOiAocGFja1V1aWQ6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHJlZ2lzdGVyKG1hcDogUmVjb3JkPHN0cmluZywgKHBhY2tVdWlkOiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGNvbnRlbnQ6IGFueSkgPT4gdm9pZCkgPT4gdm9pZD4pOiB2b2lkXG4gICAgICovXG4gICAgcmVnaXN0ZXIgKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAganMubWl4aW4odW5wYWNrZXJzLCB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHVucGFja2Vyc1t0eXBlXSA9IGhhbmRsZXI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVc2UgY29ycmVzcG9uZGluZyBoYW5kbGVyIHRvIHVucGFjayBwYWNrYWdlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOeUqOWvueW6lOeahCBoYW5kbGVyIOadpei/m+ihjOino+WMhSBcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHVucGFja1xuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2sgLSBUaGUgdXVpZCBvZiBwYWNrZWQgYXNzZXRzIFxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSAtIFRoZSBwYWNrZWQgZGF0YVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgaW5kaWNhdGVzIHRoYXQgd2hpY2ggaGFuZGxlciBzaG91bGQgYmUgdXNlZCB0byBkb3dubG9hZCwgc3VjaCBhcyAnLmpwZydcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIGNhbGxiYWNrIHdoZW4gZmluaXNoaW5nIHVucGFja2luZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xuICAgICAqIEBwYXJhbSB7Kn0gb25Db21wbGV0ZS5kYXRhIC0gT3JpZ2luYWwgYXNzZXRzXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkb3dubG9hZGVyLmRvd25sb2FkRmlsZSgncGFjay5qc29uJywge3Jlc3BvbnNlVHlwZTogJ2pzb24nfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xuICAgICAqICAgICAgcGFja01hbmFnZXIudW5wYWNrKFsnMmZhd3ExMjNkJywgJzF6c3dlcTIzZiddLCBmaWxlLCAnLmpzb24nLCBudWxsLCAoZXJyLCBkYXRhKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiB9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHVucGFjayhwYWNrOiBzdHJpbmdbXSwgZGF0YTogYW55LCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZFxuICAgICAqL1xuICAgIHVucGFjayAocGFjaywgZGF0YSwgdHlwZSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoJ3BhY2thZ2UgZGF0YSBpcyB3cm9uZyEnKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVucGFja2VyID0gdW5wYWNrZXJzW3R5cGVdO1xuICAgICAgICB1bnBhY2tlcihwYWNrLCBkYXRhLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIERvd25sb2FkIHJlcXVlc3QgaXRlbSwgSWYgaXRlbSBpcyBub3QgaW4gYW55IHBhY2thZ2UsIGRvd25sb2FkIGFzIHVzdWFsLiBPdGhlcndpc2UsIGRvd25sb2FkIHRoZSBjb3JyZXNwb25kaW5nIHBhY2thZ2UgYW5kIHVucGFjayBpdC4gXG4gICAgICogQW5kIHRoZW4gcmV0cmlldmUgdGhlIGNvcnJlc3BvbmRpbmcgY29udGVudCBmb3JtIGl0LlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDkuIvovb3or7fmsYLlr7nosaHvvIzlpoLmnpzor7fmsYLlr7nosaHkuI3lnKjku7vkvZXljIXlhoXvvIzliJnmraPluLjkuIvovb3vvIzlkKbliJnkuIvovb3lr7nlupTnmoQgcGFja2FnZSDlubbov5vooYzmi4bop6PvvIzlubblj5blm57ljIXlhoXlr7nlupTnmoTlhoXlrrlcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGxvYWRcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtfSBpdGVtIC0gU29tZSBpdGVtIHlvdSB3YW50IHRvIGRvd25sb2FkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBTb21lIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlIC0gQ2FsbGJhY2sgd2hlbiBmaW5pc2hlZFxuICAgICAqIEBwYXJhbSB7RXJyfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xuICAgICAqIEBwYXJhbSB7Kn0gb25Db21wbGV0ZS5kYXRhIC0gVGhlIHVucGFja2VkIGRhdGEgcmV0cmlldmVkIGZyb20gcGFja2FnZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHJlcXVlc3RJdGVtID0gY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtLmNyZWF0ZSgpO1xuICAgICAqIHJlcXVlc3RJdGVtLnV1aWQgPSAnZmNtUjNYQUROTGdKMUJ5S2hxY0M1Wic7XG4gICAgICogcmVxdWVzdEl0ZW0uaW5mbyA9IGNvbmZpZy5nZXRBc3NldEluZm8oJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcbiAgICAgKiBwYWNrTWFuYWdlci5sb2FkKHJlcXVlc3RJdGVtLCBudWxsLCAoZXJyLCBkYXRhKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxvYWQoaXRlbTogUmVxdWVzdEl0ZW0sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXG4gICAgICogXG4gICAgICovXG4gICAgbG9hZCAoaXRlbSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICAvLyBpZiBub3QgaW4gYW55IHBhY2thZ2UsIGRvd25sb2FkIGFzIHVhdXNsXG4gICAgICAgIGlmIChpdGVtLmlzTmF0aXZlIHx8ICFpdGVtLmluZm8gfHwgIWl0ZW0uaW5mby5wYWNrcykgcmV0dXJuIGRvd25sb2FkZXIuZG93bmxvYWQoaXRlbS5pZCwgaXRlbS51cmwsIGl0ZW0uZXh0LCBpdGVtLm9wdGlvbnMsIG9uQ29tcGxldGUpO1xuXG4gICAgICAgIGlmIChmaWxlcy5oYXMoaXRlbS5pZCkpIHJldHVybiBvbkNvbXBsZXRlKG51bGwsIGZpbGVzLmdldChpdGVtLmlkKSk7XG5cbiAgICAgICAgdmFyIHBhY2tzID0gaXRlbS5pbmZvLnBhY2tzO1xuXG4gICAgICAgIC8vIGZpbmQgYSBsb2FkaW5nIHBhY2thZ2VcbiAgICAgICAgdmFyIHBhY2sgPSBwYWNrcy5maW5kKGlzTG9hZGluZyk7XG4gICAgICAgIFxuICAgICAgICBpZiAocGFjaykgcmV0dXJuIF9sb2FkaW5nLmdldChwYWNrLnV1aWQpLnB1c2goeyBvbkNvbXBsZXRlLCBpZDogaXRlbS5pZCB9KTtcblxuICAgICAgICAvLyBkb3dubG9hZCBhIG5ldyBwYWNrYWdlXG4gICAgICAgIHBhY2sgPSBwYWNrc1swXTtcbiAgICAgICAgX2xvYWRpbmcuYWRkKHBhY2sudXVpZCwgW3sgb25Db21wbGV0ZSwgaWQ6IGl0ZW0uaWQgfV0pO1xuXG4gICAgICAgIGxldCB1cmwgPSBjYy5hc3NldE1hbmFnZXIuX3RyYW5zZm9ybShwYWNrLnV1aWQsIHtleHQ6IHBhY2suZXh0LCBidW5kbGU6IGl0ZW0uY29uZmlnLm5hbWV9KTtcblxuICAgICAgICBkb3dubG9hZGVyLmRvd25sb2FkKHBhY2sudXVpZCwgdXJsLCBwYWNrLmV4dCwgaXRlbS5vcHRpb25zLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICBmaWxlcy5yZW1vdmUocGFjay51dWlkKTtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVucGFjayBwYWNrYWdlXG4gICAgICAgICAgICBwYWNrTWFuYWdlci51bnBhY2socGFjay5wYWNrcywgZGF0YSwgcGFjay5leHQsIGl0ZW0ub3B0aW9ucywgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaWQgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlcy5hZGQoaWQsIHJlc3VsdFtpZF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBfbG9hZGluZy5yZW1vdmUocGFjay51dWlkKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYi5vbkNvbXBsZXRlKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzdWx0W2NiLmlkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYi5vbkNvbXBsZXRlKG5ldyBFcnJvcignY2FuIG5vdCByZXRyaWV2ZSBkYXRhIGZyb20gcGFja2FnZScpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLm9uQ29tcGxldGUobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxudmFyIHVucGFja2VycyA9IHtcbiAgICAnLmpzb24nOiBwYWNrTWFuYWdlci51bnBhY2tKc29uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhY2tNYW5hZ2VyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=