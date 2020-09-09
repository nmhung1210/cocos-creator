
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/depend-util.js';
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
var Cache = require('./cache');

var js = require('../platform/js');
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * Control asset's dependency list, it is a singleton. All member can be accessed with `cc.assetManager.dependUtil`
 * 
 * !#zh
 * 控制资源的依赖列表，这是一个单例, 所有成员能通过 `cc.assetManager.dependUtil` 访问
 * 
 * @class DependUtil
 */


var dependUtil = {
  _depends: new Cache(),
  init: function init() {
    this._depends.clear();
  },

  /**
   * !#en
   * Get asset's native dependency. For example, Texture's native dependency is image.
   * 
   * !#zh
   * 获取资源的原生依赖，例如 Texture 的原生依赖是图片
   * 
   * @method getNativeDep
   * @param {string} uuid - asset's uuid
   * @returns {Object} native dependency
   * 
   * @example
   * var dep = dependUtil.getNativeDep('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getNativeDep(uuid: string): Record<string, any>
   */
  getNativeDep: function getNativeDep(uuid) {
    var depend = this._depends.get(uuid);

    if (depend) return depend.nativeDep && Object.assign({}, depend.nativeDep);
    return null;
  },

  /**
   * !#en
   * Get asset's direct referencing non-native dependency list. For example, Material's non-native dependencies are Texture.
   * 
   * !#zh
   * 获取资源直接引用的非原生依赖列表，例如，材质的非原生依赖是 Texture
   * 
   * @method getDeps
   * @param {string} uuid - asset's uuid
   * @returns {string[]} direct referencing non-native dependency list
   * 
   * @example
   * var deps = dependUtil.getDeps('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getDeps(uuid: string): string[]
   */
  getDeps: function getDeps(uuid) {
    if (this._depends.has(uuid)) {
      return this._depends.get(uuid).deps;
    }

    return [];
  },

  /**
   * !#en
   * Get non-native dependency list of the loaded asset, include indirect reference.
   * The returned array stores the dependencies with their uuid, after retrieve dependencies,
   * 
   * !#zh
   * 获取某个已经加载好的资源的所有非原生依赖资源列表，包括间接引用的资源，并保存在数组中返回。
   * 返回的数组将仅保存依赖资源的 uuid。
   *
   * @method getDependsRecursively
   * @param {String} uuid - The asset's uuid
   * @returns {string[]} non-native dependency list
   * 
   * @example
   * var deps = dependUtil.getDepsRecursively('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getDepsRecursively(uuid: string): string[]
   */
  getDepsRecursively: function getDepsRecursively(uuid) {
    var exclude = Object.create(null),
        depends = [];

    this._descend(uuid, exclude, depends);

    return depends;
  },
  _descend: function _descend(uuid, exclude, depends) {
    var deps = this.getDeps(uuid);

    for (var i = 0; i < deps.length; i++) {
      var depend = deps[i];

      if (!exclude[depend]) {
        exclude[depend] = true;
        depends.push(depend);

        this._descend(depend, exclude, depends);
      }
    }
  },
  remove: function remove(uuid) {
    this._depends.remove(uuid);
  },

  /**
   * !#en
   * Extract dependency list from serialized data or asset and then store in cache.
   * 
   * !#zh
   * 从序列化数据或资源中提取出依赖列表，并且存储在缓存中。
   * 
   * @param {string} uuid - The uuid of serialized data or asset
   * @param {Object} json - Serialized data or asset
   * @returns {Object} dependency list, include non-native and native dependency
   * 
   * @example
   * downloader.downloadFile('test.json', {responseType: 'json'}, null, (err, file) => {
   *     var dependencies = parse('fcmR3XADNLgJ1ByKhqcC5Z', file);
   * });
   * 
   * @typescript
   * parse(uuid: string, json: any): { deps?: string[], nativeDep?: any }
   */
  parse: function parse(uuid, json) {
    var out = null; // scene or prefab

    if (Array.isArray(json)) {
      if (this._depends.has(uuid)) return this._depends.get(uuid);
      out = {
        deps: cc.Asset._parseDepsFromJson(json),
        asyncLoadAssets: json[0].asyncLoadAssets
      };
    } // get deps from json
    else if (json.__type__) {
        if (this._depends.has(uuid)) return this._depends.get(uuid);

        var ctor = js._getClassById(json.__type__);

        out = {
          preventPreloadNativeObject: ctor.preventPreloadNativeObject,
          preventDeferredLoadDependents: ctor.preventDeferredLoadDependents,
          deps: ctor._parseDepsFromJson(json),
          nativeDep: ctor._parseNativeDepFromJson(json)
        };
        out.nativeDep && (out.nativeDep.uuid = uuid);
      } // get deps from an existing asset 
      else {
          if (!CC_EDITOR && (out = this._depends.get(uuid)) && out.parsedFromExistAsset) return out;
          var asset = json;
          out = {
            deps: [],
            parsedFromExistAsset: true,
            preventPreloadNativeObject: asset.constructor.preventPreloadNativeObject,
            preventDeferredLoadDependents: asset.constructor.preventDeferredLoadDependents
          };
          var deps = asset.__depends__;

          for (var i = 0, l = deps.length; i < l; i++) {
            var dep = deps[i].uuid;
            out.deps.push(dep);
          }

          if (asset.__nativeDepend__) {
            out.nativeDep = asset._nativeDep;
          }
        } // cache dependency list


    this._depends.add(uuid, out);

    return out;
  }
};
module.exports = dependUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZGVwZW5kLXV0aWwuanMiXSwibmFtZXMiOlsiQ2FjaGUiLCJyZXF1aXJlIiwianMiLCJkZXBlbmRVdGlsIiwiX2RlcGVuZHMiLCJpbml0IiwiY2xlYXIiLCJnZXROYXRpdmVEZXAiLCJ1dWlkIiwiZGVwZW5kIiwiZ2V0IiwibmF0aXZlRGVwIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0RGVwcyIsImhhcyIsImRlcHMiLCJnZXREZXBzUmVjdXJzaXZlbHkiLCJleGNsdWRlIiwiY3JlYXRlIiwiZGVwZW5kcyIsIl9kZXNjZW5kIiwiaSIsImxlbmd0aCIsInB1c2giLCJyZW1vdmUiLCJwYXJzZSIsImpzb24iLCJvdXQiLCJBcnJheSIsImlzQXJyYXkiLCJjYyIsIkFzc2V0IiwiX3BhcnNlRGVwc0Zyb21Kc29uIiwiYXN5bmNMb2FkQXNzZXRzIiwiX190eXBlX18iLCJjdG9yIiwiX2dldENsYXNzQnlJZCIsInByZXZlbnRQcmVsb2FkTmF0aXZlT2JqZWN0IiwicHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHMiLCJfcGFyc2VOYXRpdmVEZXBGcm9tSnNvbiIsIkNDX0VESVRPUiIsInBhcnNlZEZyb21FeGlzdEFzc2V0IiwiYXNzZXQiLCJjb25zdHJ1Y3RvciIsIl9fZGVwZW5kc19fIiwibCIsImRlcCIsIl9fbmF0aXZlRGVwZW5kX18iLCJfbmF0aXZlRGVwIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjtBQUVBOzs7O0FBR0E7Ozs7Ozs7Ozs7O0FBU0EsSUFBSUUsVUFBVSxHQUFHO0FBQ2JDLEVBQUFBLFFBQVEsRUFBRSxJQUFJSixLQUFK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Q0FBQyxHQUFHLENBQVIsRUFBV3dCLENBQUMsR0FBRzlCLElBQUksQ0FBQ08sTUFBekIsRUFBaUNELENBQUMsR0FBR3dCLENBQXJDLEVBQXdDeEIsQ0FBQyxFQUF6QyxFQUE2QztBQUN6QyxnQkFBSXlCLEdBQUcsR0FBRy9CLElBQUksQ0FBQ00sQ0FBRCxDQUFKLENBQVFkLElBQWxCO0FBQ0FvQixZQUFBQSxHQUFHLENBQUNaLElBQUosQ0FBU1EsSUFBVCxDQUFjdUIsR0FBZDtBQUNIOztBQUVELGNBQUlKLEtBQUssQ0FBQ0ssZ0JBQVYsRUFBNEI7QUFDeEJwQixZQUFBQSxHQUFHLENBQUNqQixTQUFKLEdBQWdCZ0MsS0FBSyxDQUFDTSxVQUF0QjtBQUNIO0FBQ0osU0EzQ2MsQ0E0Q2Y7OztBQUNBLFNBQUs3QyxRQUFMLENBQWM4QyxHQUFkLENBQWtCMUMsSUFBbEIsRUFBd0JvQixHQUF4Qjs7QUFDQSxXQUFPQSxHQUFQO0FBQ0g7QUFqS1ksQ0FBakI7QUFvS0F1QixNQUFNLENBQUNDLE9BQVAsR0FBaUJqRCxVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IENhY2hlID0gcmVxdWlyZSgnLi9jYWNoZScpO1xuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xuXG4vKipcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXG4gKi9cbi8qKlxuICogISNlblxuICogQ29udHJvbCBhc3NldCdzIGRlcGVuZGVuY3kgbGlzdCwgaXQgaXMgYSBzaW5nbGV0b24uIEFsbCBtZW1iZXIgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmFzc2V0TWFuYWdlci5kZXBlbmRVdGlsYFxuICogXG4gKiAhI3poXG4gKiDmjqfliLbotYTmupDnmoTkvp3otZbliJfooajvvIzov5nmmK/kuIDkuKrljZXkvossIOaJgOacieaIkOWRmOiDvemAmui/hyBgY2MuYXNzZXRNYW5hZ2VyLmRlcGVuZFV0aWxgIOiuv+mXrlxuICogXG4gKiBAY2xhc3MgRGVwZW5kVXRpbFxuICovXG52YXIgZGVwZW5kVXRpbCA9IHtcbiAgICBfZGVwZW5kczogbmV3IENhY2hlKCksXG5cbiAgICBpbml0ICgpIHtcbiAgICAgICAgdGhpcy5fZGVwZW5kcy5jbGVhcigpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IGFzc2V0J3MgbmF0aXZlIGRlcGVuZGVuY3kuIEZvciBleGFtcGxlLCBUZXh0dXJlJ3MgbmF0aXZlIGRlcGVuZGVuY3kgaXMgaW1hZ2UuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPlui1hOa6kOeahOWOn+eUn+S+nei1lu+8jOS+i+WmgiBUZXh0dXJlIOeahOWOn+eUn+S+nei1luaYr+WbvueJh1xuICAgICAqIFxuICAgICAqIEBtZXRob2QgZ2V0TmF0aXZlRGVwXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBhc3NldCdzIHV1aWRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBuYXRpdmUgZGVwZW5kZW5jeVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGRlcCA9IGRlcGVuZFV0aWwuZ2V0TmF0aXZlRGVwKCdmY21SM1hBRE5MZ0oxQnlLaHFjQzVaJyk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXROYXRpdmVEZXAodXVpZDogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgYW55PlxuICAgICAqL1xuICAgIGdldE5hdGl2ZURlcCAodXVpZCkge1xuICAgICAgICBsZXQgZGVwZW5kID0gdGhpcy5fZGVwZW5kcy5nZXQodXVpZCk7XG4gICAgICAgIGlmIChkZXBlbmQpIHJldHVybiBkZXBlbmQubmF0aXZlRGVwICYmIE9iamVjdC5hc3NpZ24oe30sIGRlcGVuZC5uYXRpdmVEZXApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCBhc3NldCdzIGRpcmVjdCByZWZlcmVuY2luZyBub24tbmF0aXZlIGRlcGVuZGVuY3kgbGlzdC4gRm9yIGV4YW1wbGUsIE1hdGVyaWFsJ3Mgbm9uLW5hdGl2ZSBkZXBlbmRlbmNpZXMgYXJlIFRleHR1cmUuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPlui1hOa6kOebtOaOpeW8leeUqOeahOmdnuWOn+eUn+S+nei1luWIl+ihqO+8jOS+i+Wmgu+8jOadkOi0qOeahOmdnuWOn+eUn+S+nei1luaYryBUZXh0dXJlXG4gICAgICogXG4gICAgICogQG1ldGhvZCBnZXREZXBzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBhc3NldCdzIHV1aWRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IGRpcmVjdCByZWZlcmVuY2luZyBub24tbmF0aXZlIGRlcGVuZGVuY3kgbGlzdFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGRlcHMgPSBkZXBlbmRVdGlsLmdldERlcHMoJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldERlcHModXVpZDogc3RyaW5nKTogc3RyaW5nW11cbiAgICAgKi9cbiAgICBnZXREZXBzICh1dWlkKSB7XG4gICAgICAgIGlmICh0aGlzLl9kZXBlbmRzLmhhcyh1dWlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlcGVuZHMuZ2V0KHV1aWQpLmRlcHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCBub24tbmF0aXZlIGRlcGVuZGVuY3kgbGlzdCBvZiB0aGUgbG9hZGVkIGFzc2V0LCBpbmNsdWRlIGluZGlyZWN0IHJlZmVyZW5jZS5cbiAgICAgKiBUaGUgcmV0dXJuZWQgYXJyYXkgc3RvcmVzIHRoZSBkZXBlbmRlbmNpZXMgd2l0aCB0aGVpciB1dWlkLCBhZnRlciByZXRyaWV2ZSBkZXBlbmRlbmNpZXMsXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluafkOS4quW3sue7j+WKoOi9veWlveeahOi1hOa6kOeahOaJgOaciemdnuWOn+eUn+S+nei1lui1hOa6kOWIl+ihqO+8jOWMheaLrOmXtOaOpeW8leeUqOeahOi1hOa6kO+8jOW5tuS/neWtmOWcqOaVsOe7hOS4rei/lOWbnuOAglxuICAgICAqIOi/lOWbnueahOaVsOe7hOWwhuS7heS/neWtmOS+nei1lui1hOa6kOeahCB1dWlk44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldERlcGVuZHNSZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1dWlkIC0gVGhlIGFzc2V0J3MgdXVpZFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gbm9uLW5hdGl2ZSBkZXBlbmRlbmN5IGxpc3RcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBkZXBzID0gZGVwZW5kVXRpbC5nZXREZXBzUmVjdXJzaXZlbHkoJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldERlcHNSZWN1cnNpdmVseSh1dWlkOiBzdHJpbmcpOiBzdHJpbmdbXVxuICAgICAqL1xuICAgIGdldERlcHNSZWN1cnNpdmVseSAodXVpZCkge1xuICAgICAgICB2YXIgZXhjbHVkZSA9IE9iamVjdC5jcmVhdGUobnVsbCksIGRlcGVuZHMgPSBbXTtcbiAgICAgICAgdGhpcy5fZGVzY2VuZCh1dWlkLCBleGNsdWRlLCBkZXBlbmRzKTtcbiAgICAgICAgcmV0dXJuIGRlcGVuZHM7XG4gICAgfSxcblxuICAgIF9kZXNjZW5kICh1dWlkLCBleGNsdWRlLCBkZXBlbmRzKSB7XG4gICAgICAgIHZhciBkZXBzID0gdGhpcy5nZXREZXBzKHV1aWQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkZXBlbmQgPSBkZXBzW2ldO1xuICAgICAgICAgICAgaWYgKCAhZXhjbHVkZVtkZXBlbmRdICkge1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVbZGVwZW5kXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGVwZW5kcy5wdXNoKGRlcGVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzY2VuZChkZXBlbmQsIGV4Y2x1ZGUsIGRlcGVuZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZSAodXVpZCkge1xuICAgICAgICB0aGlzLl9kZXBlbmRzLnJlbW92ZSh1dWlkKTtcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBFeHRyYWN0IGRlcGVuZGVuY3kgbGlzdCBmcm9tIHNlcmlhbGl6ZWQgZGF0YSBvciBhc3NldCBhbmQgdGhlbiBzdG9yZSBpbiBjYWNoZS5cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5LuO5bqP5YiX5YyW5pWw5o2u5oiW6LWE5rqQ5Lit5o+Q5Y+W5Ye65L6d6LWW5YiX6KGo77yM5bm25LiU5a2Y5YKo5Zyo57yT5a2Y5Lit44CCXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBUaGUgdXVpZCBvZiBzZXJpYWxpemVkIGRhdGEgb3IgYXNzZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbiAtIFNlcmlhbGl6ZWQgZGF0YSBvciBhc3NldFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGRlcGVuZGVuY3kgbGlzdCwgaW5jbHVkZSBub24tbmF0aXZlIGFuZCBuYXRpdmUgZGVwZW5kZW5jeVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QuanNvbicsIHtyZXNwb25zZVR5cGU6ICdqc29uJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcbiAgICAgKiAgICAgdmFyIGRlcGVuZGVuY2llcyA9IHBhcnNlKCdmY21SM1hBRE5MZ0oxQnlLaHFjQzVaJywgZmlsZSk7XG4gICAgICogfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwYXJzZSh1dWlkOiBzdHJpbmcsIGpzb246IGFueSk6IHsgZGVwcz86IHN0cmluZ1tdLCBuYXRpdmVEZXA/OiBhbnkgfVxuICAgICAqL1xuICAgIHBhcnNlICh1dWlkLCBqc29uKSB7XG4gICAgICAgIHZhciBvdXQgPSBudWxsO1xuICAgICAgICAvLyBzY2VuZSBvciBwcmVmYWJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2RlcGVuZHMuaGFzKHV1aWQpKSByZXR1cm4gdGhpcy5fZGVwZW5kcy5nZXQodXVpZClcbiAgICAgICAgICAgIG91dCA9IHtcbiAgICAgICAgICAgICAgICBkZXBzOiBjYy5Bc3NldC5fcGFyc2VEZXBzRnJvbUpzb24oanNvbiksXG4gICAgICAgICAgICAgICAgYXN5bmNMb2FkQXNzZXRzOiBqc29uWzBdLmFzeW5jTG9hZEFzc2V0c1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZXQgZGVwcyBmcm9tIGpzb25cbiAgICAgICAgZWxzZSBpZiAoanNvbi5fX3R5cGVfXykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fZGVwZW5kcy5oYXModXVpZCkpIHJldHVybiB0aGlzLl9kZXBlbmRzLmdldCh1dWlkKTtcbiAgICAgICAgICAgIHZhciBjdG9yID0ganMuX2dldENsYXNzQnlJZChqc29uLl9fdHlwZV9fKTtcbiAgICAgICAgICAgIG91dCA9IHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdDogY3Rvci5wcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdCxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50czogY3Rvci5wcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50cyxcbiAgICAgICAgICAgICAgICBkZXBzOiBjdG9yLl9wYXJzZURlcHNGcm9tSnNvbihqc29uKSxcbiAgICAgICAgICAgICAgICBuYXRpdmVEZXA6IGN0b3IuX3BhcnNlTmF0aXZlRGVwRnJvbUpzb24oanNvbilcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvdXQubmF0aXZlRGVwICYmIChvdXQubmF0aXZlRGVwLnV1aWQgPSB1dWlkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZXQgZGVwcyBmcm9tIGFuIGV4aXN0aW5nIGFzc2V0IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghQ0NfRURJVE9SICYmIChvdXQgPSB0aGlzLl9kZXBlbmRzLmdldCh1dWlkKSkgJiYgb3V0LnBhcnNlZEZyb21FeGlzdEFzc2V0KSByZXR1cm4gb3V0O1xuICAgICAgICAgICAgdmFyIGFzc2V0ID0ganNvbjtcbiAgICAgICAgICAgIG91dCA9IHtcbiAgICAgICAgICAgICAgICBkZXBzOiBbXSxcbiAgICAgICAgICAgICAgICBwYXJzZWRGcm9tRXhpc3RBc3NldDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdDogYXNzZXQuY29uc3RydWN0b3IucHJldmVudFByZWxvYWROYXRpdmVPYmplY3QsXG4gICAgICAgICAgICAgICAgcHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHM6IGFzc2V0LmNvbnN0cnVjdG9yLnByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IGRlcHMgPSBhc3NldC5fX2RlcGVuZHNfXztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZGVwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwID0gZGVwc1tpXS51dWlkO1xuICAgICAgICAgICAgICAgIG91dC5kZXBzLnB1c2goZGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoYXNzZXQuX19uYXRpdmVEZXBlbmRfXykge1xuICAgICAgICAgICAgICAgIG91dC5uYXRpdmVEZXAgPSBhc3NldC5fbmF0aXZlRGVwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNhY2hlIGRlcGVuZGVuY3kgbGlzdFxuICAgICAgICB0aGlzLl9kZXBlbmRzLmFkZCh1dWlkLCBvdXQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGVwZW5kVXRpbDsiXSwic291cmNlUm9vdCI6Ii8ifQ==