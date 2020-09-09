
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/helper.js';
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
var _require = require('./shared'),
    bundles = _require.bundles;
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * Provide some helpful function, it is a singleton. All member can be accessed with `cc.assetManager.utils`
 * 
 * !#zh
 * 提供一些辅助方法，helper 是一个单例, 所有成员能通过 `cc.assetManager.utils` 访问
 * 
 * @class Helper
 */


var helper = {
  /**
   * !#en
   * Decode uuid, returns the original uuid
   * 
   * !#zh
   * 解码 uuid，返回原始 uuid
   * 
   * @method decodeUuid
   * @param {String} base64 - the encoded uuid
   * @returns {String} the original uuid 
   * 
   * @example
   * var uuid = 'fcmR3XADNLgJ1ByKhqcC5Z';
   * var originalUuid = decodeUuid(uuid); // fc991dd7-0033-4b80-9d41-c8a86a702e59
   * 
   * @typescript
   * decodeUuid(base64: string): string
   */
  decodeUuid: require('../utils/decode-uuid'),

  /**
   * !#en
   * Extract uuid from url
   * 
   * !#zh
   * 从 url 中提取 uuid
   * 
   * @method getUuidFromURL
   * @param {String} url - url
   * @returns {String} the uuid parsed from url
   * 
   * @example
   * var url = 'res/import/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.json';
   * var uuid = getUuidFromURL(url); // fc991dd7-0033-4b80-9d41-c8a86a702e59
   * 
   * @typescript
   * getUuidFromURL(url: string): string
   */
  getUuidFromURL: function () {
    var _uuidRegex = /.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-]{8,})/;
    return function (url) {
      var matches = url.match(_uuidRegex);

      if (matches) {
        return matches[1];
      }

      return '';
    };
  }(),

  /**
   * !#en
   * Transform uuid to url
   * 
   * !#zh
   * 转换 uuid 为 url
   * 
   * @method getUrlWithUuid
   * @param {string} uuid - The uuid of asset
   * @param {Object} [options] - Some optional parameters
   * @returns {string} url
   * 
   * @example
   * var url = getUrlWithUuid('fcmR3XADNLgJ1ByKhqcC5Z', {isNative: false});
   * 
   * @typescript
   * getUrlWithUuid(uuid: string, options?: Record<string, any>): string
   */
  getUrlWithUuid: function getUrlWithUuid(uuid, options) {
    options = options || Object.create(null);
    options.__isNative__ = options.isNative;
    var bundle = bundles.find(function (bundle) {
      return bundle.getAssetInfo(uuid);
    });

    if (bundle) {
      options.bundle = bundle.name;
    }

    return cc.assetManager._transform(uuid, options);
  },

  /**
   * !#en
   * Check if the type of data is cc.Scene or cc.Prefab
   * 
   * !#zh
   * 检测数据的类型是否是 Scene 或者 Prefab
   * 
   * @method isSceneObj
   * @param {Object} json - serialized data
   * @returns {boolean} - whether or not the type is cc.Scene or cc.Prefab
   * 
   * @typescript
   * isSceneObj(json: any): boolean
   */
  isSceneObj: function isSceneObj(json) {
    var SCENE_ID = 'cc.Scene',
        PREFAB_ID = 'cc.Prefab';
    return json && (json[0] && json[0].__type__ === SCENE_ID || json[1] && json[1].__type__ === SCENE_ID || json[0] && json[0].__type__ === PREFAB_ID);
  },

  /**
   * !#en
   * Check if the type of asset is scene
   * 
   * !#zh
   * 检查资源类型是否是场景
   * 
   * @method isScene
   * @param {*} asset - asset
   * @returns {boolean} - whether or not type is cc.SceneAsset
   * 
   * @typescript
   * isScene(asset: any): boolean
   */
  isScene: function isScene(asset) {
    return asset && (asset.constructor === cc.SceneAsset || asset instanceof cc.Scene);
  },

  /**
   * !#en
   * Normalize url, strip './' and '/'
   * 
   * !#zh
   * 标准化 url ，去除 './' 和 '/' 
   * 
   * @method normalize
   * @param {string} url - url
   * @returns {string} - The normalized url
   * 
   * @typescript
   * normalize(url: string): string
   */
  normalize: function normalize(url) {
    if (url) {
      if (url.charCodeAt(0) === 46 && url.charCodeAt(1) === 47) {
        // strip './'
        url = url.slice(2);
      } else if (url.charCodeAt(0) === 47) {
        // strip '/'
        url = url.slice(1);
      }
    }

    return url;
  }
};
module.exports = helper;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvaGVscGVyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJidW5kbGVzIiwiaGVscGVyIiwiZGVjb2RlVXVpZCIsImdldFV1aWRGcm9tVVJMIiwiX3V1aWRSZWdleCIsInVybCIsIm1hdGNoZXMiLCJtYXRjaCIsImdldFVybFdpdGhVdWlkIiwidXVpZCIsIm9wdGlvbnMiLCJPYmplY3QiLCJjcmVhdGUiLCJfX2lzTmF0aXZlX18iLCJpc05hdGl2ZSIsImJ1bmRsZSIsImZpbmQiLCJnZXRBc3NldEluZm8iLCJuYW1lIiwiY2MiLCJhc3NldE1hbmFnZXIiLCJfdHJhbnNmb3JtIiwiaXNTY2VuZU9iaiIsImpzb24iLCJTQ0VORV9JRCIsIlBSRUZBQl9JRCIsIl9fdHlwZV9fIiwiaXNTY2VuZSIsImFzc2V0IiwiY29uc3RydWN0b3IiLCJTY2VuZUFzc2V0IiwiU2NlbmUiLCJub3JtYWxpemUiLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXdCb0JBLE9BQU8sQ0FBQyxVQUFEO0lBQW5CQyxtQkFBQUE7QUFDUjs7OztBQUdBOzs7Ozs7Ozs7OztBQVNBLElBQUlDLE1BQU0sR0FBRztBQUNUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkFDLEVBQUFBLFVBQVUsRUFBRUgsT0FBTyxDQUFDLHNCQUFELENBbkJWOztBQXFCVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBSSxFQUFBQSxjQUFjLEVBQUcsWUFBWTtBQUN6QixRQUFJQyxVQUFVLEdBQUcsOENBQWpCO0FBQ0EsV0FBTyxVQUFVQyxHQUFWLEVBQWU7QUFDbEIsVUFBSUMsT0FBTyxHQUFHRCxHQUFHLENBQUNFLEtBQUosQ0FBVUgsVUFBVixDQUFkOztBQUNBLFVBQUlFLE9BQUosRUFBYTtBQUNULGVBQU9BLE9BQU8sQ0FBQyxDQUFELENBQWQ7QUFDSDs7QUFDRCxhQUFPLEVBQVA7QUFDSCxLQU5EO0FBT0gsR0FUZSxFQXZDUDs7QUFrRFQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQUUsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUNyQ0EsSUFBQUEsT0FBTyxHQUFHQSxPQUFPLElBQUlDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FBckI7QUFDQUYsSUFBQUEsT0FBTyxDQUFDRyxZQUFSLEdBQXVCSCxPQUFPLENBQUNJLFFBQS9CO0FBQ0EsUUFBSUMsTUFBTSxHQUFHZixPQUFPLENBQUNnQixJQUFSLENBQWEsVUFBVUQsTUFBVixFQUFrQjtBQUN4QyxhQUFPQSxNQUFNLENBQUNFLFlBQVAsQ0FBb0JSLElBQXBCLENBQVA7QUFDSCxLQUZZLENBQWI7O0FBSUEsUUFBSU0sTUFBSixFQUFZO0FBQ1JMLE1BQUFBLE9BQU8sQ0FBQ0ssTUFBUixHQUFpQkEsTUFBTSxDQUFDRyxJQUF4QjtBQUNIOztBQUVELFdBQU9DLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQkMsVUFBaEIsQ0FBMkJaLElBQTNCLEVBQWlDQyxPQUFqQyxDQUFQO0FBQ0gsR0FoRlE7O0FBa0ZUOzs7Ozs7Ozs7Ozs7OztBQWNBWSxFQUFBQSxVQUFVLEVBQUUsb0JBQVVDLElBQVYsRUFBZ0I7QUFDeEIsUUFBSUMsUUFBUSxHQUFHLFVBQWY7QUFBQSxRQUEyQkMsU0FBUyxHQUFHLFdBQXZDO0FBQ0EsV0FBT0YsSUFBSSxLQUNDQSxJQUFJLENBQUMsQ0FBRCxDQUFKLElBQVdBLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUcsUUFBUixLQUFxQkYsUUFBakMsSUFDQ0QsSUFBSSxDQUFDLENBQUQsQ0FBSixJQUFXQSxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLFFBQVIsS0FBcUJGLFFBRGpDLElBRUNELElBQUksQ0FBQyxDQUFELENBQUosSUFBV0EsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRRyxRQUFSLEtBQXFCRCxTQUhqQyxDQUFYO0FBS0gsR0F2R1E7O0FBeUdUOzs7Ozs7Ozs7Ozs7OztBQWNBRSxFQUFBQSxPQUFPLEVBQUUsaUJBQVVDLEtBQVYsRUFBaUI7QUFDdEIsV0FBT0EsS0FBSyxLQUFLQSxLQUFLLENBQUNDLFdBQU4sS0FBc0JWLEVBQUUsQ0FBQ1csVUFBekIsSUFBdUNGLEtBQUssWUFBWVQsRUFBRSxDQUFDWSxLQUFoRSxDQUFaO0FBQ0gsR0F6SFE7O0FBMkhUOzs7Ozs7Ozs7Ozs7OztBQWNBQyxFQUFBQSxTQUFTLEVBQUUsbUJBQVUzQixHQUFWLEVBQWU7QUFDdEIsUUFBSUEsR0FBSixFQUFTO0FBQ0wsVUFBSUEsR0FBRyxDQUFDNEIsVUFBSixDQUFlLENBQWYsTUFBc0IsRUFBdEIsSUFBNEI1QixHQUFHLENBQUM0QixVQUFKLENBQWUsQ0FBZixNQUFzQixFQUF0RCxFQUEwRDtBQUN0RDtBQUNBNUIsUUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUM2QixLQUFKLENBQVUsQ0FBVixDQUFOO0FBQ0gsT0FIRCxNQUlLLElBQUk3QixHQUFHLENBQUM0QixVQUFKLENBQWUsQ0FBZixNQUFzQixFQUExQixFQUE4QjtBQUMvQjtBQUNBNUIsUUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUM2QixLQUFKLENBQVUsQ0FBVixDQUFOO0FBQ0g7QUFDSjs7QUFDRCxXQUFPN0IsR0FBUDtBQUNIO0FBckpRLENBQWI7QUF3SkE4QixNQUFNLENBQUNDLE9BQVAsR0FBaUJuQyxNQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHsgYnVuZGxlcyB9ID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcbi8qKlxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBQcm92aWRlIHNvbWUgaGVscGZ1bCBmdW5jdGlvbiwgaXQgaXMgYSBzaW5nbGV0b24uIEFsbCBtZW1iZXIgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmFzc2V0TWFuYWdlci51dGlsc2BcbiAqIFxuICogISN6aFxuICog5o+Q5L6b5LiA5Lqb6L6F5Yqp5pa55rOV77yMaGVscGVyIOaYr+S4gOS4quWNleS+iywg5omA5pyJ5oiQ5ZGY6IO96YCa6L+HIGBjYy5hc3NldE1hbmFnZXIudXRpbHNgIOiuv+mXrlxuICogXG4gKiBAY2xhc3MgSGVscGVyXG4gKi9cbnZhciBoZWxwZXIgPSB7XG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIERlY29kZSB1dWlkLCByZXR1cm5zIHRoZSBvcmlnaW5hbCB1dWlkXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOino+eggSB1dWlk77yM6L+U5Zue5Y6f5aeLIHV1aWRcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGRlY29kZVV1aWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYmFzZTY0IC0gdGhlIGVuY29kZWQgdXVpZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBvcmlnaW5hbCB1dWlkIFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHV1aWQgPSAnZmNtUjNYQUROTGdKMUJ5S2hxY0M1Wic7XG4gICAgICogdmFyIG9yaWdpbmFsVXVpZCA9IGRlY29kZVV1aWQodXVpZCk7IC8vIGZjOTkxZGQ3LTAwMzMtNGI4MC05ZDQxLWM4YTg2YTcwMmU1OVxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZGVjb2RlVXVpZChiYXNlNjQ6IHN0cmluZyk6IHN0cmluZ1xuICAgICAqL1xuICAgIGRlY29kZVV1aWQ6IHJlcXVpcmUoJy4uL3V0aWxzL2RlY29kZS11dWlkJyksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRXh0cmFjdCB1dWlkIGZyb20gdXJsXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS7jiB1cmwg5Lit5o+Q5Y+WIHV1aWRcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldFV1aWRGcm9tVVJMXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIHVybFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSB1dWlkIHBhcnNlZCBmcm9tIHVybFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHVybCA9ICdyZXMvaW1wb3J0L2ZjL2ZjOTkxZGQ3LTAwMzMtNGI4MC05ZDQxLWM4YTg2YTcwMmU1OS5qc29uJztcbiAgICAgKiB2YXIgdXVpZCA9IGdldFV1aWRGcm9tVVJMKHVybCk7IC8vIGZjOTkxZGQ3LTAwMzMtNGI4MC05ZDQxLWM4YTg2YTcwMmU1OVxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0VXVpZEZyb21VUkwodXJsOiBzdHJpbmcpOiBzdHJpbmdcbiAgICAgKi9cbiAgICBnZXRVdWlkRnJvbVVSTDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF91dWlkUmVnZXggPSAvLipbL1xcXFxdWzAtOWEtZkEtRl17Mn1bL1xcXFxdKFswLTlhLWZBLUYtXXs4LH0pLztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaGVzID0gdXJsLm1hdGNoKF91dWlkUmVnZXgpO1xuICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH0pKCksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVHJhbnNmb3JtIHV1aWQgdG8gdXJsXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOi9rOaNoiB1dWlkIOS4uiB1cmxcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldFVybFdpdGhVdWlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBUaGUgdXVpZCBvZiBhc3NldFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB1cmxcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB1cmwgPSBnZXRVcmxXaXRoVXVpZCgnZmNtUjNYQUROTGdKMUJ5S2hxY0M1WicsIHtpc05hdGl2ZTogZmFsc2V9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldFVybFdpdGhVdWlkKHV1aWQ6IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmdcbiAgICAgKi9cbiAgICBnZXRVcmxXaXRoVXVpZDogZnVuY3Rpb24gKHV1aWQsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgb3B0aW9ucy5fX2lzTmF0aXZlX18gPSBvcHRpb25zLmlzTmF0aXZlO1xuICAgICAgICB2YXIgYnVuZGxlID0gYnVuZGxlcy5maW5kKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBidW5kbGUuZ2V0QXNzZXRJbmZvKHV1aWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYnVuZGxlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmJ1bmRsZSA9IGJ1bmRsZS5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5fdHJhbnNmb3JtKHV1aWQsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2hlY2sgaWYgdGhlIHR5cGUgb2YgZGF0YSBpcyBjYy5TY2VuZSBvciBjYy5QcmVmYWJcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5qOA5rWL5pWw5o2u55qE57G75Z6L5piv5ZCm5pivIFNjZW5lIOaIluiAhSBQcmVmYWJcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGlzU2NlbmVPYmpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbiAtIHNlcmlhbGl6ZWQgZGF0YVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSAtIHdoZXRoZXIgb3Igbm90IHRoZSB0eXBlIGlzIGNjLlNjZW5lIG9yIGNjLlByZWZhYlxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogaXNTY2VuZU9iaihqc29uOiBhbnkpOiBib29sZWFuXG4gICAgICovXG4gICAgaXNTY2VuZU9iajogZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgdmFyIFNDRU5FX0lEID0gJ2NjLlNjZW5lJywgUFJFRkFCX0lEID0gJ2NjLlByZWZhYic7XG4gICAgICAgIHJldHVybiBqc29uICYmIChcbiAgICAgICAgICAgICAgICAgICAoanNvblswXSAmJiBqc29uWzBdLl9fdHlwZV9fID09PSBTQ0VORV9JRCkgfHxcbiAgICAgICAgICAgICAgICAgICAoanNvblsxXSAmJiBqc29uWzFdLl9fdHlwZV9fID09PSBTQ0VORV9JRCkgfHxcbiAgICAgICAgICAgICAgICAgICAoanNvblswXSAmJiBqc29uWzBdLl9fdHlwZV9fID09PSBQUkVGQUJfSUQpXG4gICAgICAgICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2hlY2sgaWYgdGhlIHR5cGUgb2YgYXNzZXQgaXMgc2NlbmVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5qOA5p+l6LWE5rqQ57G75Z6L5piv5ZCm5piv5Zy65pmvXG4gICAgICogXG4gICAgICogQG1ldGhvZCBpc1NjZW5lXG4gICAgICogQHBhcmFtIHsqfSBhc3NldCAtIGFzc2V0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IC0gd2hldGhlciBvciBub3QgdHlwZSBpcyBjYy5TY2VuZUFzc2V0XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpc1NjZW5lKGFzc2V0OiBhbnkpOiBib29sZWFuXG4gICAgICovXG4gICAgaXNTY2VuZTogZnVuY3Rpb24gKGFzc2V0KSB7XG4gICAgICAgIHJldHVybiBhc3NldCAmJiAoYXNzZXQuY29uc3RydWN0b3IgPT09IGNjLlNjZW5lQXNzZXQgfHwgYXNzZXQgaW5zdGFuY2VvZiBjYy5TY2VuZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBOb3JtYWxpemUgdXJsLCBzdHJpcCAnLi8nIGFuZCAnLydcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5qCH5YeG5YyWIHVybCDvvIzljrvpmaQgJy4vJyDlkowgJy8nIFxuICAgICAqIFxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHVybFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIG5vcm1hbGl6ZWQgdXJsXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBub3JtYWxpemUodXJsOiBzdHJpbmcpOiBzdHJpbmdcbiAgICAgKi9cbiAgICBub3JtYWxpemU6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgaWYgKHVybC5jaGFyQ29kZUF0KDApID09PSA0NiAmJiB1cmwuY2hhckNvZGVBdCgxKSA9PT0gNDcpIHtcbiAgICAgICAgICAgICAgICAvLyBzdHJpcCAnLi8nXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnNsaWNlKDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodXJsLmNoYXJDb2RlQXQoMCkgPT09IDQ3KSB7XG4gICAgICAgICAgICAgICAgLy8gc3RyaXAgJy8nXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoZWxwZXI7Il0sInNvdXJjZVJvb3QiOiIvIn0=