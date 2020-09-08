
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
    var out = Object.create(null),
        err = null;

    if (Array.isArray(json)) {
      if (json.length !== pack.length) {
        cc.errorID(4915);
      }

      for (var i = 0; i < pack.length; i++) {
        var key = pack[i] + '@import';
        out[key] = json[i];
      }
    } else if (json.type === js._getClassId(cc.Texture2D)) {
      if (json.data) {
        var datas = json.data.split('|');

        if (datas.length !== pack.length) {
          cc.errorID(4915);
        }

        for (var _i = 0; _i < pack.length; _i++) {
          out[pack[_i] + '@import'] = {
            __type__: json.type,
            content: datas[_i]
          };
        }
      }
    } else {
      err = new Error('unmatched type pack!');
      out = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvcGFjay1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImRvd25sb2FkZXIiLCJyZXF1aXJlIiwiQ2FjaGUiLCJqcyIsImZpbGVzIiwiX2xvYWRpbmciLCJpc0xvYWRpbmciLCJ2YWwiLCJoYXMiLCJ1dWlkIiwicGFja01hbmFnZXIiLCJ1bnBhY2tKc29uIiwicGFjayIsImpzb24iLCJvcHRpb25zIiwib25Db21wbGV0ZSIsIm91dCIsIk9iamVjdCIsImNyZWF0ZSIsImVyciIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImNjIiwiZXJyb3JJRCIsImkiLCJrZXkiLCJ0eXBlIiwiX2dldENsYXNzSWQiLCJUZXh0dXJlMkQiLCJkYXRhIiwiZGF0YXMiLCJzcGxpdCIsIl9fdHlwZV9fIiwiY29udGVudCIsIkVycm9yIiwiaW5pdCIsImNsZWFyIiwicmVnaXN0ZXIiLCJoYW5kbGVyIiwibWl4aW4iLCJ1bnBhY2tlcnMiLCJ1bnBhY2siLCJ1bnBhY2tlciIsImxvYWQiLCJpdGVtIiwiaXNOYXRpdmUiLCJpbmZvIiwicGFja3MiLCJkb3dubG9hZCIsImlkIiwidXJsIiwiZXh0IiwiZ2V0IiwiZmluZCIsInB1c2giLCJhZGQiLCJhc3NldE1hbmFnZXIiLCJfdHJhbnNmb3JtIiwiYnVuZGxlIiwiY29uZmlnIiwibmFtZSIsInJlbW92ZSIsImVycm9yIiwibWVzc2FnZSIsInN0YWNrIiwicmVzdWx0IiwiY2FsbGJhY2tzIiwibCIsImNiIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUExQjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQU1FLEVBQUUsR0FBR0YsT0FBTyxDQUFDLGdCQUFELENBQWxCOztlQUNrQkEsT0FBTyxDQUFDLFVBQUQ7SUFBakJHLGlCQUFBQTs7QUFFUixJQUFJQyxRQUFRLEdBQUcsSUFBSUgsS0FBSixFQUFmOztBQUVBLFNBQVNJLFNBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3JCLFNBQU9GLFFBQVEsQ0FBQ0csR0FBVCxDQUFhRCxHQUFHLENBQUNFLElBQWpCLENBQVA7QUFDSDtBQUdEOzs7O0FBR0E7Ozs7Ozs7Ozs7O0FBU0EsSUFBSUMsV0FBVyxHQUFHO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBQyxFQUFBQSxVQXpCYyxzQkF5QkZDLElBekJFLEVBeUJJQyxJQXpCSixFQXlCVUMsT0F6QlYsRUF5Qm1CQyxVQXpCbkIsRUF5QitCO0FBRXpDLFFBQUlDLEdBQUcsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUFWO0FBQUEsUUFBK0JDLEdBQUcsR0FBRyxJQUFyQzs7QUFFQSxRQUFJQyxLQUFLLENBQUNDLE9BQU4sQ0FBY1IsSUFBZCxDQUFKLEVBQXlCO0FBQ3JCLFVBQUlBLElBQUksQ0FBQ1MsTUFBTCxLQUFnQlYsSUFBSSxDQUFDVSxNQUF6QixFQUFpQztBQUM3QkMsUUFBQUEsRUFBRSxDQUFDQyxPQUFILENBQVcsSUFBWDtBQUNIOztBQUNELFdBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2IsSUFBSSxDQUFDVSxNQUF6QixFQUFpQ0csQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxZQUFJQyxHQUFHLEdBQUdkLElBQUksQ0FBQ2EsQ0FBRCxDQUFKLEdBQVUsU0FBcEI7QUFDQVQsUUFBQUEsR0FBRyxDQUFDVSxHQUFELENBQUgsR0FBV2IsSUFBSSxDQUFDWSxDQUFELENBQWY7QUFDSDtBQUNKLEtBUkQsTUFTSyxJQUFJWixJQUFJLENBQUNjLElBQUwsS0FBY3hCLEVBQUUsQ0FBQ3lCLFdBQUgsQ0FBZUwsRUFBRSxDQUFDTSxTQUFsQixDQUFsQixFQUFnRDtBQUNqRCxVQUFJaEIsSUFBSSxDQUFDaUIsSUFBVCxFQUFlO0FBQ1gsWUFBSUMsS0FBSyxHQUFHbEIsSUFBSSxDQUFDaUIsSUFBTCxDQUFVRSxLQUFWLENBQWdCLEdBQWhCLENBQVo7O0FBQ0EsWUFBSUQsS0FBSyxDQUFDVCxNQUFOLEtBQWlCVixJQUFJLENBQUNVLE1BQTFCLEVBQWtDO0FBQzlCQyxVQUFBQSxFQUFFLENBQUNDLE9BQUgsQ0FBVyxJQUFYO0FBQ0g7O0FBQ0QsYUFBSyxJQUFJQyxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHYixJQUFJLENBQUNVLE1BQXpCLEVBQWlDRyxFQUFDLEVBQWxDLEVBQXNDO0FBQ2xDVCxVQUFBQSxHQUFHLENBQUNKLElBQUksQ0FBQ2EsRUFBRCxDQUFKLEdBQVUsU0FBWCxDQUFILEdBQTJCO0FBQ3ZCUSxZQUFBQSxRQUFRLEVBQUVwQixJQUFJLENBQUNjLElBRFE7QUFFdkJPLFlBQUFBLE9BQU8sRUFBRUgsS0FBSyxDQUFDTixFQUFEO0FBRlMsV0FBM0I7QUFJSDtBQUNKO0FBQ0osS0FiSSxNQWNBO0FBQ0ROLE1BQUFBLEdBQUcsR0FBRyxJQUFJZ0IsS0FBSixDQUFVLHNCQUFWLENBQU47QUFDQW5CLE1BQUFBLEdBQUcsR0FBRyxJQUFOO0FBQ0g7O0FBQ0RELElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDSSxHQUFELEVBQU1ILEdBQU4sQ0FBeEI7QUFDSCxHQXpEYTtBQTJEZG9CLEVBQUFBLElBM0RjLGtCQTJETjtBQUNKL0IsSUFBQUEsUUFBUSxDQUFDZ0MsS0FBVDtBQUNILEdBN0RhOztBQStEZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkFDLEVBQUFBLFFBdEZjLG9CQXNGSlgsSUF0RkksRUFzRkVZLE9BdEZGLEVBc0ZXO0FBQ3JCLFFBQUksT0FBT1osSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQnhCLE1BQUFBLEVBQUUsQ0FBQ3FDLEtBQUgsQ0FBU0MsU0FBVCxFQUFvQmQsSUFBcEI7QUFDSCxLQUZELE1BR0s7QUFDRGMsTUFBQUEsU0FBUyxDQUFDZCxJQUFELENBQVQsR0FBa0JZLE9BQWxCO0FBQ0g7QUFDSixHQTdGYTs7QUErRmQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQUcsRUFBQUEsTUF2SGMsa0JBdUhOOUIsSUF2SE0sRUF1SEFrQixJQXZIQSxFQXVITUgsSUF2SE4sRUF1SFliLE9BdkhaLEVBdUhxQkMsVUF2SHJCLEVBdUhpQztBQUMzQyxRQUFJLENBQUNlLElBQUwsRUFBVztBQUNQZixNQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFJb0IsS0FBSixDQUFVLHdCQUFWLENBQUQsQ0FBeEI7QUFDQTtBQUNIOztBQUNELFFBQUlRLFFBQVEsR0FBR0YsU0FBUyxDQUFDZCxJQUFELENBQXhCO0FBQ0FnQixJQUFBQSxRQUFRLENBQUMvQixJQUFELEVBQU9rQixJQUFQLEVBQWFoQixPQUFiLEVBQXNCQyxVQUF0QixDQUFSO0FBQ0gsR0E5SGE7O0FBZ0lkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBNkIsRUFBQUEsSUF6SmMsZ0JBeUpSQyxJQXpKUSxFQXlKRi9CLE9BekpFLEVBeUpPQyxVQXpKUCxFQXlKbUI7QUFDN0I7QUFDQSxRQUFJOEIsSUFBSSxDQUFDQyxRQUFMLElBQWlCLENBQUNELElBQUksQ0FBQ0UsSUFBdkIsSUFBK0IsQ0FBQ0YsSUFBSSxDQUFDRSxJQUFMLENBQVVDLEtBQTlDLEVBQXFELE9BQU9oRCxVQUFVLENBQUNpRCxRQUFYLENBQW9CSixJQUFJLENBQUNLLEVBQXpCLEVBQTZCTCxJQUFJLENBQUNNLEdBQWxDLEVBQXVDTixJQUFJLENBQUNPLEdBQTVDLEVBQWlEUCxJQUFJLENBQUMvQixPQUF0RCxFQUErREMsVUFBL0QsQ0FBUDtBQUVyRCxRQUFJWCxLQUFLLENBQUNJLEdBQU4sQ0FBVXFDLElBQUksQ0FBQ0ssRUFBZixDQUFKLEVBQXdCLE9BQU9uQyxVQUFVLENBQUMsSUFBRCxFQUFPWCxLQUFLLENBQUNpRCxHQUFOLENBQVVSLElBQUksQ0FBQ0ssRUFBZixDQUFQLENBQWpCO0FBRXhCLFFBQUlGLEtBQUssR0FBR0gsSUFBSSxDQUFDRSxJQUFMLENBQVVDLEtBQXRCLENBTjZCLENBUTdCOztBQUNBLFFBQUlwQyxJQUFJLEdBQUdvQyxLQUFLLENBQUNNLElBQU4sQ0FBV2hELFNBQVgsQ0FBWDtBQUVBLFFBQUlNLElBQUosRUFBVSxPQUFPUCxRQUFRLENBQUNnRCxHQUFULENBQWF6QyxJQUFJLENBQUNILElBQWxCLEVBQXdCOEMsSUFBeEIsQ0FBNkI7QUFBRXhDLE1BQUFBLFVBQVUsRUFBVkEsVUFBRjtBQUFjbUMsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLO0FBQXZCLEtBQTdCLENBQVAsQ0FYbUIsQ0FhN0I7O0FBQ0F0QyxJQUFBQSxJQUFJLEdBQUdvQyxLQUFLLENBQUMsQ0FBRCxDQUFaOztBQUNBM0MsSUFBQUEsUUFBUSxDQUFDbUQsR0FBVCxDQUFhNUMsSUFBSSxDQUFDSCxJQUFsQixFQUF3QixDQUFDO0FBQUVNLE1BQUFBLFVBQVUsRUFBVkEsVUFBRjtBQUFjbUMsTUFBQUEsRUFBRSxFQUFFTCxJQUFJLENBQUNLO0FBQXZCLEtBQUQsQ0FBeEI7O0FBRUEsUUFBSUMsR0FBRyxHQUFHNUIsRUFBRSxDQUFDa0MsWUFBSCxDQUFnQkMsVUFBaEIsQ0FBMkI5QyxJQUFJLENBQUNILElBQWhDLEVBQXNDO0FBQUMyQyxNQUFBQSxHQUFHLEVBQUV4QyxJQUFJLENBQUN3QyxHQUFYO0FBQWdCTyxNQUFBQSxNQUFNLEVBQUVkLElBQUksQ0FBQ2UsTUFBTCxDQUFZQztBQUFwQyxLQUF0QyxDQUFWOztBQUVBN0QsSUFBQUEsVUFBVSxDQUFDaUQsUUFBWCxDQUFvQnJDLElBQUksQ0FBQ0gsSUFBekIsRUFBK0IwQyxHQUEvQixFQUFvQ3ZDLElBQUksQ0FBQ3dDLEdBQXpDLEVBQThDUCxJQUFJLENBQUMvQixPQUFuRCxFQUE0RCxVQUFVSyxHQUFWLEVBQWVXLElBQWYsRUFBcUI7QUFDN0UxQixNQUFBQSxLQUFLLENBQUMwRCxNQUFOLENBQWFsRCxJQUFJLENBQUNILElBQWxCOztBQUNBLFVBQUlVLEdBQUosRUFBUztBQUNMSSxRQUFBQSxFQUFFLENBQUN3QyxLQUFILENBQVM1QyxHQUFHLENBQUM2QyxPQUFiLEVBQXNCN0MsR0FBRyxDQUFDOEMsS0FBMUI7QUFDSCxPQUo0RSxDQUs3RTs7O0FBQ0F2RCxNQUFBQSxXQUFXLENBQUNnQyxNQUFaLENBQW1COUIsSUFBSSxDQUFDb0MsS0FBeEIsRUFBK0JsQixJQUEvQixFQUFxQ2xCLElBQUksQ0FBQ3dDLEdBQTFDLEVBQStDUCxJQUFJLENBQUMvQixPQUFwRCxFQUE2RCxVQUFVSyxHQUFWLEVBQWUrQyxNQUFmLEVBQXVCO0FBQ2hGLFlBQUksQ0FBQy9DLEdBQUwsRUFBVTtBQUNOLGVBQUssSUFBSStCLEVBQVQsSUFBZWdCLE1BQWYsRUFBdUI7QUFDbkI5RCxZQUFBQSxLQUFLLENBQUNvRCxHQUFOLENBQVVOLEVBQVYsRUFBY2dCLE1BQU0sQ0FBQ2hCLEVBQUQsQ0FBcEI7QUFDSDtBQUNKOztBQUNELFlBQUlpQixTQUFTLEdBQUc5RCxRQUFRLENBQUN5RCxNQUFULENBQWdCbEQsSUFBSSxDQUFDSCxJQUFyQixDQUFoQjs7QUFDQSxhQUFLLElBQUlnQixDQUFDLEdBQUcsQ0FBUixFQUFXMkMsQ0FBQyxHQUFHRCxTQUFTLENBQUM3QyxNQUE5QixFQUFzQ0csQ0FBQyxHQUFHMkMsQ0FBMUMsRUFBNkMzQyxDQUFDLEVBQTlDLEVBQWtEO0FBQzlDLGNBQUk0QyxFQUFFLEdBQUdGLFNBQVMsQ0FBQzFDLENBQUQsQ0FBbEI7O0FBQ0EsY0FBSU4sR0FBSixFQUFTO0FBQ0xrRCxZQUFBQSxFQUFFLENBQUN0RCxVQUFILENBQWNJLEdBQWQ7QUFDQTtBQUNIOztBQUVELGNBQUlXLElBQUksR0FBR29DLE1BQU0sQ0FBQ0csRUFBRSxDQUFDbkIsRUFBSixDQUFqQjs7QUFDQSxjQUFJLENBQUNwQixJQUFMLEVBQVc7QUFDUHVDLFlBQUFBLEVBQUUsQ0FBQ3RELFVBQUgsQ0FBYyxJQUFJb0IsS0FBSixDQUFVLG9DQUFWLENBQWQ7QUFDSCxXQUZELE1BR0s7QUFDRGtDLFlBQUFBLEVBQUUsQ0FBQ3RELFVBQUgsQ0FBYyxJQUFkLEVBQW9CZSxJQUFwQjtBQUNIO0FBQ0o7QUFDSixPQXRCRDtBQXVCSCxLQTdCRDtBQThCSDtBQTFNYSxDQUFsQjtBQTZNQSxJQUFJVyxTQUFTLEdBQUc7QUFDWixXQUFTL0IsV0FBVyxDQUFDQztBQURULENBQWhCO0FBSUEyRCxNQUFNLENBQUNDLE9BQVAsR0FBaUI3RCxXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3QgZG93bmxvYWRlciA9IHJlcXVpcmUoJy4vZG93bmxvYWRlcicpO1xuY29uc3QgQ2FjaGUgPSByZXF1aXJlKCcuL2NhY2hlJyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCB7IGZpbGVzIH0gPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xuXG52YXIgX2xvYWRpbmcgPSBuZXcgQ2FjaGUoKTtcblxuZnVuY3Rpb24gaXNMb2FkaW5nICh2YWwpIHtcbiAgICByZXR1cm4gX2xvYWRpbmcuaGFzKHZhbC51dWlkKTtcbn1cblxuXG4vKipcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXG4gKi9cbi8qKlxuICogISNlblxuICogSGFuZGxlIHRoZSBwYWNrZWQgYXNzZXQsIGluY2x1ZGUgdW5wYWNraW5nLCBsb2FkaW5nLCBjYWNoZSBhbmQgc28gb24uIEl0IGlzIGEgc2luZ2xldG9uLiBBbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXIucGFja01hbmFnZXJgXG4gKiBcbiAqICEjemhcbiAqIOWkhOeQhuaJk+WMhei1hOa6kO+8jOWMheaLrOaLhuWMhe+8jOWKoOi9ve+8jOe8k+WtmOetieetie+8jOi/meaYr+S4gOS4quWNleS+iywg5omA5pyJ5oiQ5ZGY6IO96YCa6L+HIGBjYy5hc3NldE1hbmFnZXIucGFja01hbmFnZXJgIOiuv+mXrlxuICogXG4gKiBAY2xhc3MgUGFja01hbmFnZXJcbiAqL1xudmFyIHBhY2tNYW5hZ2VyID0ge1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFVucGFjayB0aGUganNvbiwgcmV2ZXJ0IHRvIHdoYXQgaXQgd2FzIGJlZm9yZSBwYWNraW5nXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOaLhuinoyBqc29uIOWMhe+8jOaBouWkjeS4uuaJk+WMheS5i+WJjeeahOWGheWuuVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgdW5wYWNrSnNvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IHBhY2sgLSBUaGUgcGFja1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIC0gVGhlIGNvbnRlbnQgb2YgcGFja1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIENhbGxiYWNrIHdoZW4gZmluaXNoIHVucGFja2luZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9uQ29tcGxldGUuY29udGVudCAtIFRoZSB1bnBhY2tlZCBhc3NldHNcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCdwYWNrLmpzb24nLCB7cmVzcG9uc2VUeXBlOiAnanNvbid9LCBudWxsLCAoZXJyLCBmaWxlKSA9PiB7XG4gICAgICogICAgICBwYWNrTWFuYWdlci51bnBhY2tKc29uKFsnYScsICdiJ10sIGZpbGUsIG51bGwsIChlcnIsIGRhdGEpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIH0pO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdW5wYWNrSnNvbihwYWNrOiBzdHJpbmdbXSwganNvbjogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGNvbnRlbnQ6IGFueSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKi9cbiAgICB1bnBhY2tKc29uIChwYWNrLCBqc29uLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG5cbiAgICAgICAgdmFyIG91dCA9IE9iamVjdC5jcmVhdGUobnVsbCksIGVyciA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgaWYgKGpzb24ubGVuZ3RoICE9PSBwYWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNDkxNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2subGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcGFja1tpXSArICdAaW1wb3J0JztcbiAgICAgICAgICAgICAgICBvdXRba2V5XSA9IGpzb25baV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoanNvbi50eXBlID09PSBqcy5fZ2V0Q2xhc3NJZChjYy5UZXh0dXJlMkQpKSB7XG4gICAgICAgICAgICBpZiAoanNvbi5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFzID0ganNvbi5kYXRhLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzLmxlbmd0aCAhPT0gcGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg0OTE1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dFtwYWNrW2ldICsgJ0BpbXBvcnQnXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fdHlwZV9fOiBqc29uLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhc1tpXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcigndW5tYXRjaGVkIHR5cGUgcGFjayEnKTtcbiAgICAgICAgICAgIG91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVyciwgb3V0KTtcbiAgICB9LFxuXG4gICAgaW5pdCAoKSB7XG4gICAgICAgIF9sb2FkaW5nLmNsZWFyKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWdpc3RlciBjdXN0b20gaGFuZGxlciBpZiB5b3Ugd2FudCB0byBjaGFuZ2UgZGVmYXVsdCBiZWhhdmlvciBvciBleHRlbmQgcGFja01hbmFnZXIgdG8gdW5wYWNrIG90aGVyIGZvcm1hdCBwYWNrXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOW9k+S9oOaDs+S/ruaUuem7mOiupOihjOS4uuaIluiAheaLk+WxlSBwYWNrTWFuYWdlciDmnaXmi4bliIblhbbku5bmoLzlvI/nmoTljIXml7blj6/ku6Xms6jlhozoh6rlrprkuYnnmoQgaGFuZGxlclxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcmVnaXN0ZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IHR5cGUgLSBFeHRlbnNpb24gbGlrZXMgJy5iaW4nIG9yIG1hcCBsaWtlcyB7Jy5iaW4nOiBiaW5IYW5kbGVyLCAnLmFiJzogYWJIYW5kbGVyfVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXSAtIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGFuZGxlci5wYWNrVXVpZCAtIFRoZSB1dWlkIG9mIHBhY2tcbiAgICAgKiBAcGFyYW0geyp9IGhhbmRsZXIuZGF0YSAtIFRoZSBjb250ZW50IG9mIHBhY2tcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlci5vcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlci5vbkNvbXBsZXRlIC0gQ2FsbGJhY2sgd2hlbiBmaW5pc2hpbmcgdW5wYWNraW5nXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwYWNrTWFuYWdlci5yZWdpc3RlcignLmJpbicsIChwYWNrVXVpZCwgZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4gb25Db21wbGV0ZShudWxsLCBudWxsKSk7XG4gICAgICogcGFja01hbmFnZXIucmVnaXN0ZXIoeycuYmluJzogKHBhY2tVdWlkLCBmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpLCAnLmFiJzogKHBhY2tVdWlkLCBmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWdpc3Rlcih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IChwYWNrVXVpZDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBjb250ZW50OiBhbnkpID0+IHZvaWQpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcmVnaXN0ZXIobWFwOiBSZWNvcmQ8c3RyaW5nLCAocGFja1V1aWQ6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKSA9PiB2b2lkPik6IHZvaWRcbiAgICAgKi9cbiAgICByZWdpc3RlciAodHlwZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBqcy5taXhpbih1bnBhY2tlcnMsIHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdW5wYWNrZXJzW3R5cGVdID0gaGFuZGxlcjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFVzZSBjb3JyZXNwb25kaW5nIGhhbmRsZXIgdG8gdW5wYWNrIHBhY2thZ2VcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog55So5a+55bqU55qEIGhhbmRsZXIg5p2l6L+b6KGM6Kej5YyFIFxuICAgICAqIFxuICAgICAqIEBtZXRob2QgdW5wYWNrXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGFjayAtIFRoZSB1dWlkIG9mIHBhY2tlZCBhc3NldHMgXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIC0gVGhlIHBhY2tlZCBkYXRhXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBpbmRpY2F0ZXMgdGhhdCB3aGljaCBoYW5kbGVyIHNob3VsZCBiZSB1c2VkIHRvIGRvd25sb2FkLCBzdWNoIGFzICcuanBnJ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlIC0gY2FsbGJhY2sgd2hlbiBmaW5pc2hpbmcgdW5wYWNraW5nXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSAgVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHsqfSBvbkNvbXBsZXRlLmRhdGEgLSBPcmlnaW5hbCBhc3NldHNcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCdwYWNrLmpzb24nLCB7cmVzcG9uc2VUeXBlOiAnanNvbid9LCBudWxsLCAoZXJyLCBmaWxlKSA9PiB7XG4gICAgICogICAgICBwYWNrTWFuYWdlci51bnBhY2soWycyZmF3cTEyM2QnLCAnMXpzd2VxMjNmJ10sIGZpbGUsICcuanNvbicsIG51bGwsIChlcnIsIGRhdGEpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIH0pO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdW5wYWNrKHBhY2s6IHN0cmluZ1tdLCBkYXRhOiBhbnksIHR5cGU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXG4gICAgICovXG4gICAgdW5wYWNrIChwYWNrLCBkYXRhLCB0eXBlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG5ldyBFcnJvcigncGFja2FnZSBkYXRhIGlzIHdyb25nIScpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdW5wYWNrZXIgPSB1bnBhY2tlcnNbdHlwZV07XG4gICAgICAgIHVucGFja2VyKHBhY2ssIGRhdGEsIG9wdGlvbnMsIG9uQ29tcGxldGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRG93bmxvYWQgcmVxdWVzdCBpdGVtLCBJZiBpdGVtIGlzIG5vdCBpbiBhbnkgcGFja2FnZSwgZG93bmxvYWQgYXMgdXN1YWwuIE90aGVyd2lzZSwgZG93bmxvYWQgdGhlIGNvcnJlc3BvbmRpbmcgcGFja2FnZSBhbmQgdW5wYWNrIGl0LiBcbiAgICAgKiBBbmQgdGhlbiByZXRyaWV2ZSB0aGUgY29ycmVzcG9uZGluZyBjb250ZW50IGZvcm0gaXQuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS4i+i9veivt+axguWvueixoe+8jOWmguaenOivt+axguWvueixoeS4jeWcqOS7u+S9leWMheWGhe+8jOWImeato+W4uOS4i+i9ve+8jOWQpuWImeS4i+i9veWvueW6lOeahCBwYWNrYWdlIOW5tui/m+ihjOaLhuino++8jOW5tuWPluWbnuWMheWGheWvueW6lOeahOWGheWuuVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgbG9hZFxuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW19IGl0ZW0gLSBTb21lIGl0ZW0geW91IHdhbnQgdG8gZG93bmxvYWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaGVkXG4gICAgICogQHBhcmFtIHtFcnJ9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHsqfSBvbkNvbXBsZXRlLmRhdGEgLSBUaGUgdW5wYWNrZWQgZGF0YSByZXRyaWV2ZWQgZnJvbSBwYWNrYWdlXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcmVxdWVzdEl0ZW0gPSBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0uY3JlYXRlKCk7XG4gICAgICogcmVxdWVzdEl0ZW0udXVpZCA9ICdmY21SM1hBRE5MZ0oxQnlLaHFjQzVaJztcbiAgICAgKiByZXF1ZXN0SXRlbS5pbmZvID0gY29uZmlnLmdldEFzc2V0SW5mbygnZmNtUjNYQUROTGdKMUJ5S2hxY0M1WicpO1xuICAgICAqIHBhY2tNYW5hZ2VyLmxvYWQocmVxdWVzdEl0ZW0sIG51bGwsIChlcnIsIGRhdGEpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZChpdGVtOiBSZXF1ZXN0SXRlbSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBcbiAgICAgKi9cbiAgICBsb2FkIChpdGVtLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIC8vIGlmIG5vdCBpbiBhbnkgcGFja2FnZSwgZG93bmxvYWQgYXMgdWF1c2xcbiAgICAgICAgaWYgKGl0ZW0uaXNOYXRpdmUgfHwgIWl0ZW0uaW5mbyB8fCAhaXRlbS5pbmZvLnBhY2tzKSByZXR1cm4gZG93bmxvYWRlci5kb3dubG9hZChpdGVtLmlkLCBpdGVtLnVybCwgaXRlbS5leHQsIGl0ZW0ub3B0aW9ucywgb25Db21wbGV0ZSk7XG5cbiAgICAgICAgaWYgKGZpbGVzLmhhcyhpdGVtLmlkKSkgcmV0dXJuIG9uQ29tcGxldGUobnVsbCwgZmlsZXMuZ2V0KGl0ZW0uaWQpKTtcblxuICAgICAgICB2YXIgcGFja3MgPSBpdGVtLmluZm8ucGFja3M7XG5cbiAgICAgICAgLy8gZmluZCBhIGxvYWRpbmcgcGFja2FnZVxuICAgICAgICB2YXIgcGFjayA9IHBhY2tzLmZpbmQoaXNMb2FkaW5nKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChwYWNrKSByZXR1cm4gX2xvYWRpbmcuZ2V0KHBhY2sudXVpZCkucHVzaCh7IG9uQ29tcGxldGUsIGlkOiBpdGVtLmlkIH0pO1xuXG4gICAgICAgIC8vIGRvd25sb2FkIGEgbmV3IHBhY2thZ2VcbiAgICAgICAgcGFjayA9IHBhY2tzWzBdO1xuICAgICAgICBfbG9hZGluZy5hZGQocGFjay51dWlkLCBbeyBvbkNvbXBsZXRlLCBpZDogaXRlbS5pZCB9XSk7XG5cbiAgICAgICAgbGV0IHVybCA9IGNjLmFzc2V0TWFuYWdlci5fdHJhbnNmb3JtKHBhY2sudXVpZCwge2V4dDogcGFjay5leHQsIGJ1bmRsZTogaXRlbS5jb25maWcubmFtZX0pO1xuXG4gICAgICAgIGRvd25sb2FkZXIuZG93bmxvYWQocGFjay51dWlkLCB1cmwsIHBhY2suZXh0LCBpdGVtLm9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgIGZpbGVzLnJlbW92ZShwYWNrLnV1aWQpO1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlLCBlcnIuc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdW5wYWNrIHBhY2thZ2VcbiAgICAgICAgICAgIHBhY2tNYW5hZ2VyLnVucGFjayhwYWNrLnBhY2tzLCBkYXRhLCBwYWNrLmV4dCwgaXRlbS5vcHRpb25zLCBmdW5jdGlvbiAoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpZCBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzLmFkZChpZCwgcmVzdWx0W2lkXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IF9sb2FkaW5nLnJlbW92ZShwYWNrLnV1aWQpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2IgPSBjYWxsYmFja3NbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLm9uQ29tcGxldGUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXN1bHRbY2IuaWRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLm9uQ29tcGxldGUobmV3IEVycm9yKCdjYW4gbm90IHJldHJpZXZlIGRhdGEgZnJvbSBwYWNrYWdlJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2Iub25Db21wbGV0ZShudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG52YXIgdW5wYWNrZXJzID0ge1xuICAgICcuanNvbic6IHBhY2tNYW5hZ2VyLnVucGFja0pzb25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGFja01hbmFnZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==