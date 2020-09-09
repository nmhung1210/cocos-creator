
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

var _deserializeCompiled = _interopRequireWildcard(require("../platform/deserialize-compiled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var deserialize = require('./deserialize');

var _require = require('./shared'),
    files = _require.files,
    parsed = _require.parsed;

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
    var out = null;

    if (Array.isArray(json) || json.__type__) {
      if (out = this._depends.get(uuid)) return out;

      if (Array.isArray(json) && (!(CC_BUILD || _deserializeCompiled["default"].isCompiledJson(json)) || !(0, _deserializeCompiled.hasNativeDep)(json))) {
        out = {
          deps: this._parseDepsFromJson(json)
        };
      } else {
        try {
          var asset = deserialize(json);
          out = this._parseDepsFromAsset(asset);
          out.nativeDep && (out.nativeDep.uuid = uuid);
          parsed.add(uuid + '@import', asset);
        } catch (e) {
          files.remove(uuid + '@import');
          out = {
            deps: []
          };
        }
      }
    } // get deps from an existing asset 
    else {
        if (!CC_EDITOR && (out = this._depends.get(uuid)) && out.parsedFromExistAsset) return out;
        out = this._parseDepsFromAsset(json);
      } // cache dependency list


    this._depends.add(uuid, out);

    return out;
  },
  _parseDepsFromAsset: function _parseDepsFromAsset(asset) {
    var out = {
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

    return out;
  },
  _parseDepsFromJson: CC_EDITOR || CC_PREVIEW ? function (json) {
    if (_deserializeCompiled["default"].isCompiledJson(json)) {
      var _depends = (0, _deserializeCompiled.getDependUuidList)(json);

      _depends.forEach(function (uuid, index) {
        return _depends[index] = cc.assetManager.utils.decodeUuid(uuid);
      });

      return _depends;
    }

    var depends = [];

    function parseDependRecursively(data, out) {
      if (!data || typeof data !== 'object' || data.__id__) return;
      var uuid = data.__uuid__;

      if (Array.isArray(data)) {
        for (var i = 0, l = data.length; i < l; i++) {
          parseDependRecursively(data[i], out);
        }
      } else if (uuid) {
        out.push(cc.assetManager.utils.decodeUuid(uuid));
      } else {
        for (var prop in data) {
          parseDependRecursively(data[prop], out);
        }
      }
    }

    parseDependRecursively(json, depends);
    return depends;
  } : function (json) {
    var depends = (0, _deserializeCompiled.getDependUuidList)(json);
    depends.forEach(function (uuid, index) {
      return depends[index] = cc.assetManager.utils.decodeUuid(uuid);
    });
    return depends;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZGVwZW5kLXV0aWwuanMiXSwibmFtZXMiOlsiQ2FjaGUiLCJyZXF1aXJlIiwiZGVzZXJpYWxpemUiLCJmaWxlcyIsInBhcnNlZCIsImRlcGVuZFV0aWwiLCJfZGVwZW5kcyIsImluaXQiLCJjbGVhciIsImdldE5hdGl2ZURlcCIsInV1aWQiLCJkZXBlbmQiLCJnZXQiLCJuYXRpdmVEZXAiLCJPYmplY3QiLCJhc3NpZ24iLCJnZXREZXBzIiwiaGFzIiwiZGVwcyIsImdldERlcHNSZWN1cnNpdmVseSIsImV4Y2x1ZGUiLCJjcmVhdGUiLCJkZXBlbmRzIiwiX2Rlc2NlbmQiLCJpIiwibGVuZ3RoIiwicHVzaCIsInJlbW92ZSIsInBhcnNlIiwianNvbiIsIm91dCIsIkFycmF5IiwiaXNBcnJheSIsIl9fdHlwZV9fIiwiQ0NfQlVJTEQiLCJkZXNlcmlhbGl6ZUZvckNvbXBpbGVkIiwiaXNDb21waWxlZEpzb24iLCJfcGFyc2VEZXBzRnJvbUpzb24iLCJhc3NldCIsIl9wYXJzZURlcHNGcm9tQXNzZXQiLCJhZGQiLCJlIiwiQ0NfRURJVE9SIiwicGFyc2VkRnJvbUV4aXN0QXNzZXQiLCJwcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdCIsImNvbnN0cnVjdG9yIiwicHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHMiLCJfX2RlcGVuZHNfXyIsImwiLCJkZXAiLCJfX25hdGl2ZURlcGVuZF9fIiwiX25hdGl2ZURlcCIsIkNDX1BSRVZJRVciLCJmb3JFYWNoIiwiaW5kZXgiLCJjYyIsImFzc2V0TWFuYWdlciIsInV0aWxzIiwiZGVjb2RlVXVpZCIsInBhcnNlRGVwZW5kUmVjdXJzaXZlbHkiLCJkYXRhIiwiX19pZF9fIiwiX191dWlkX18iLCJwcm9wIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQTJCQTs7Ozs7O0FBM0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QTRCaEIsVUFBVU8sSUFBVixFQUFnQjtBQUNoQixRQUFJUCxPQUFPLEdBQUcsNENBQWtCTyxJQUFsQixDQUFkO0FBQ0FQLElBQUFBLE9BQU8sQ0FBQytCLE9BQVIsQ0FBZ0IsVUFBQzNDLElBQUQsRUFBTzRDLEtBQVA7QUFBQSxhQUFpQmhDLE9BQU8sQ0FBQ2dDLEtBQUQsQ0FBUCxHQUFpQkMsRUFBRSxDQUFDQyxZQUFILENBQWdCQyxLQUFoQixDQUFzQkMsVUFBdEIsQ0FBaUNoRCxJQUFqQyxDQUFsQztBQUFBLEtBQWhCO0FBQ0EsV0FBT1ksT0FBUDtBQUNIO0FBeE1ZLENBQWpCO0FBMk1BMEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCNUQsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBDYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUnKTtcbmNvbnN0IGRlc2VyaWFsaXplID0gcmVxdWlyZSgnLi9kZXNlcmlhbGl6ZScpO1xuY29uc3QgeyBmaWxlcywgcGFyc2VkIH0gPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xuaW1wb3J0IHsgaGFzTmF0aXZlRGVwICwgZ2V0RGVwZW5kVXVpZExpc3QgfSBmcm9tICcuLi9wbGF0Zm9ybS9kZXNlcmlhbGl6ZS1jb21waWxlZCc7XG5pbXBvcnQgZGVzZXJpYWxpemVGb3JDb21waWxlZCBmcm9tICcuLi9wbGF0Zm9ybS9kZXNlcmlhbGl6ZS1jb21waWxlZCc7XG5cbi8qKlxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBDb250cm9sIGFzc2V0J3MgZGVwZW5kZW5jeSBsaXN0LCBpdCBpcyBhIHNpbmdsZXRvbi4gQWxsIG1lbWJlciBjYW4gYmUgYWNjZXNzZWQgd2l0aCBgY2MuYXNzZXRNYW5hZ2VyLmRlcGVuZFV0aWxgXG4gKiBcbiAqICEjemhcbiAqIOaOp+WItui1hOa6kOeahOS+nei1luWIl+ihqO+8jOi/meaYr+S4gOS4quWNleS+iywg5omA5pyJ5oiQ5ZGY6IO96YCa6L+HIGBjYy5hc3NldE1hbmFnZXIuZGVwZW5kVXRpbGAg6K6/6ZeuXG4gKiBcbiAqIEBjbGFzcyBEZXBlbmRVdGlsXG4gKi9cbnZhciBkZXBlbmRVdGlsID0ge1xuICAgIF9kZXBlbmRzOiBuZXcgQ2FjaGUoKSxcblxuICAgIGluaXQgKCkge1xuICAgICAgICB0aGlzLl9kZXBlbmRzLmNsZWFyKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgYXNzZXQncyBuYXRpdmUgZGVwZW5kZW5jeS4gRm9yIGV4YW1wbGUsIFRleHR1cmUncyBuYXRpdmUgZGVwZW5kZW5jeSBpcyBpbWFnZS5cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W6LWE5rqQ55qE5Y6f55Sf5L6d6LWW77yM5L6L5aaCIFRleHR1cmUg55qE5Y6f55Sf5L6d6LWW5piv5Zu+54mHXG4gICAgICogXG4gICAgICogQG1ldGhvZCBnZXROYXRpdmVEZXBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIGFzc2V0J3MgdXVpZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG5hdGl2ZSBkZXBlbmRlbmN5XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZGVwID0gZGVwZW5kVXRpbC5nZXROYXRpdmVEZXAoJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldE5hdGl2ZURlcCh1dWlkOiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gICAgICovXG4gICAgZ2V0TmF0aXZlRGVwICh1dWlkKSB7XG4gICAgICAgIGxldCBkZXBlbmQgPSB0aGlzLl9kZXBlbmRzLmdldCh1dWlkKTtcbiAgICAgICAgaWYgKGRlcGVuZCkgcmV0dXJuIGRlcGVuZC5uYXRpdmVEZXAgJiYgT2JqZWN0LmFzc2lnbih7fSwgZGVwZW5kLm5hdGl2ZURlcCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IGFzc2V0J3MgZGlyZWN0IHJlZmVyZW5jaW5nIG5vbi1uYXRpdmUgZGVwZW5kZW5jeSBsaXN0LiBGb3IgZXhhbXBsZSwgTWF0ZXJpYWwncyBub24tbmF0aXZlIGRlcGVuZGVuY2llcyBhcmUgVGV4dHVyZS5cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W6LWE5rqQ55u05o6l5byV55So55qE6Z2e5Y6f55Sf5L6d6LWW5YiX6KGo77yM5L6L5aaC77yM5p2Q6LSo55qE6Z2e5Y6f55Sf5L6d6LWW5pivIFRleHR1cmVcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldERlcHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIGFzc2V0J3MgdXVpZFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gZGlyZWN0IHJlZmVyZW5jaW5nIG5vbi1uYXRpdmUgZGVwZW5kZW5jeSBsaXN0XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgZGVwcyA9IGRlcGVuZFV0aWwuZ2V0RGVwcygnZmNtUjNYQUROTGdKMUJ5S2hxY0M1WicpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0RGVwcyh1dWlkOiBzdHJpbmcpOiBzdHJpbmdbXVxuICAgICAqL1xuICAgIGdldERlcHMgKHV1aWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RlcGVuZHMuaGFzKHV1aWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVwZW5kcy5nZXQodXVpZCkuZGVwcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IG5vbi1uYXRpdmUgZGVwZW5kZW5jeSBsaXN0IG9mIHRoZSBsb2FkZWQgYXNzZXQsIGluY2x1ZGUgaW5kaXJlY3QgcmVmZXJlbmNlLlxuICAgICAqIFRoZSByZXR1cm5lZCBhcnJheSBzdG9yZXMgdGhlIGRlcGVuZGVuY2llcyB3aXRoIHRoZWlyIHV1aWQsIGFmdGVyIHJldHJpZXZlIGRlcGVuZGVuY2llcyxcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5p+Q5Liq5bey57uP5Yqg6L295aW955qE6LWE5rqQ55qE5omA5pyJ6Z2e5Y6f55Sf5L6d6LWW6LWE5rqQ5YiX6KGo77yM5YyF5ous6Ze05o6l5byV55So55qE6LWE5rqQ77yM5bm25L+d5a2Y5Zyo5pWw57uE5Lit6L+U5Zue44CCXG4gICAgICog6L+U5Zue55qE5pWw57uE5bCG5LuF5L+d5a2Y5L6d6LWW6LWE5rqQ55qEIHV1aWTjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0RGVwZW5kc1JlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHV1aWQgLSBUaGUgYXNzZXQncyB1dWlkXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBub24tbmF0aXZlIGRlcGVuZGVuY3kgbGlzdFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGRlcHMgPSBkZXBlbmRVdGlsLmdldERlcHNSZWN1cnNpdmVseSgnZmNtUjNYQUROTGdKMUJ5S2hxY0M1WicpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0RGVwc1JlY3Vyc2l2ZWx5KHV1aWQ6IHN0cmluZyk6IHN0cmluZ1tdXG4gICAgICovXG4gICAgZ2V0RGVwc1JlY3Vyc2l2ZWx5ICh1dWlkKSB7XG4gICAgICAgIHZhciBleGNsdWRlID0gT2JqZWN0LmNyZWF0ZShudWxsKSwgZGVwZW5kcyA9IFtdO1xuICAgICAgICB0aGlzLl9kZXNjZW5kKHV1aWQsIGV4Y2x1ZGUsIGRlcGVuZHMpO1xuICAgICAgICByZXR1cm4gZGVwZW5kcztcbiAgICB9LFxuXG4gICAgX2Rlc2NlbmQgKHV1aWQsIGV4Y2x1ZGUsIGRlcGVuZHMpIHtcbiAgICAgICAgdmFyIGRlcHMgPSB0aGlzLmdldERlcHModXVpZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGRlcGVuZCA9IGRlcHNbaV07XG4gICAgICAgICAgICBpZiAoICFleGNsdWRlW2RlcGVuZF0gKSB7XG4gICAgICAgICAgICAgICAgZXhjbHVkZVtkZXBlbmRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZXBlbmRzLnB1c2goZGVwZW5kKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNjZW5kKGRlcGVuZCwgZXhjbHVkZSwgZGVwZW5kcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlICh1dWlkKSB7XG4gICAgICAgIHRoaXMuX2RlcGVuZHMucmVtb3ZlKHV1aWQpO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEV4dHJhY3QgZGVwZW5kZW5jeSBsaXN0IGZyb20gc2VyaWFsaXplZCBkYXRhIG9yIGFzc2V0IGFuZCB0aGVuIHN0b3JlIGluIGNhY2hlLlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDku47luo/liJfljJbmlbDmja7miJbotYTmupDkuK3mj5Dlj5blh7rkvp3otZbliJfooajvvIzlubbkuJTlrZjlgqjlnKjnvJPlrZjkuK3jgIJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFRoZSB1dWlkIG9mIHNlcmlhbGl6ZWQgZGF0YSBvciBhc3NldFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIC0gU2VyaWFsaXplZCBkYXRhIG9yIGFzc2V0XG4gICAgICogQHJldHVybnMge09iamVjdH0gZGVwZW5kZW5jeSBsaXN0LCBpbmNsdWRlIG5vbi1uYXRpdmUgYW5kIG5hdGl2ZSBkZXBlbmRlbmN5XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkb3dubG9hZGVyLmRvd25sb2FkRmlsZSgndGVzdC5qc29uJywge3Jlc3BvbnNlVHlwZTogJ2pzb24nfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xuICAgICAqICAgICB2YXIgZGVwZW5kZW5jaWVzID0gcGFyc2UoJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonLCBmaWxlKTtcbiAgICAgKiB9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHBhcnNlKHV1aWQ6IHN0cmluZywganNvbjogYW55KTogeyBkZXBzPzogc3RyaW5nW10sIG5hdGl2ZURlcD86IGFueSB9XG4gICAgICovXG4gICAgcGFyc2UgKHV1aWQsIGpzb24pIHtcbiAgICAgICAgdmFyIG91dCA9IG51bGw7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pIHx8IGpzb24uX190eXBlX18pIHtcblxuICAgICAgICAgICAgaWYgKG91dCA9IHRoaXMuX2RlcGVuZHMuZ2V0KHV1aWQpKSByZXR1cm4gb3V0O1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSAmJiAoIShDQ19CVUlMRCB8fCBkZXNlcmlhbGl6ZUZvckNvbXBpbGVkLmlzQ29tcGlsZWRKc29uKGpzb24pKSB8fCAhaGFzTmF0aXZlRGVwKGpzb24pKSkge1xuICAgICAgICAgICAgICAgIG91dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGVwczogdGhpcy5fcGFyc2VEZXBzRnJvbUpzb24oanNvbiksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhc3NldCA9IGRlc2VyaWFsaXplKGpzb24pO1xuICAgICAgICAgICAgICAgICAgICBvdXQgPSB0aGlzLl9wYXJzZURlcHNGcm9tQXNzZXQoYXNzZXQpXG4gICAgICAgICAgICAgICAgICAgIG91dC5uYXRpdmVEZXAgJiYgKG91dC5uYXRpdmVEZXAudXVpZCA9IHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQuYWRkKHV1aWQgKyAnQGltcG9ydCcsIGFzc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZXMucmVtb3ZlKHV1aWQgKyAnQGltcG9ydCcpO1xuICAgICAgICAgICAgICAgICAgICBvdXQgPSB7IGRlcHM6IFtdIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGdldCBkZXBzIGZyb20gYW4gZXhpc3RpbmcgYXNzZXQgXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgKG91dCA9IHRoaXMuX2RlcGVuZHMuZ2V0KHV1aWQpKSAmJiBvdXQucGFyc2VkRnJvbUV4aXN0QXNzZXQpIHJldHVybiBvdXQ7XG4gICAgICAgICAgICBvdXQgPSB0aGlzLl9wYXJzZURlcHNGcm9tQXNzZXQoanNvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FjaGUgZGVwZW5kZW5jeSBsaXN0XG4gICAgICAgIHRoaXMuX2RlcGVuZHMuYWRkKHV1aWQsIG91dCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIF9wYXJzZURlcHNGcm9tQXNzZXQ6IGZ1bmN0aW9uIChhc3NldCkge1xuICAgICAgICB2YXIgb3V0ID0ge1xuICAgICAgICAgICAgZGVwczogW10sXG4gICAgICAgICAgICBwYXJzZWRGcm9tRXhpc3RBc3NldDogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZlbnRQcmVsb2FkTmF0aXZlT2JqZWN0OiBhc3NldC5jb25zdHJ1Y3Rvci5wcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdCxcbiAgICAgICAgICAgIHByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzOiBhc3NldC5jb25zdHJ1Y3Rvci5wcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50c1xuICAgICAgICB9O1xuICAgICAgICBsZXQgZGVwcyA9IGFzc2V0Ll9fZGVwZW5kc19fO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGRlcHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGVwID0gZGVwc1tpXS51dWlkO1xuICAgICAgICAgICAgb3V0LmRlcHMucHVzaChkZXApO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChhc3NldC5fX25hdGl2ZURlcGVuZF9fKSB7XG4gICAgICAgICAgICBvdXQubmF0aXZlRGVwID0gYXNzZXQuX25hdGl2ZURlcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIF9wYXJzZURlcHNGcm9tSnNvbjogQ0NfRURJVE9SIHx8IENDX1BSRVZJRVcgPyBmdW5jdGlvbiAoanNvbikge1xuXG4gICAgICAgIGlmIChkZXNlcmlhbGl6ZUZvckNvbXBpbGVkLmlzQ29tcGlsZWRKc29uKGpzb24pKSB7XG4gICAgICAgICAgICBsZXQgZGVwZW5kcyA9IGdldERlcGVuZFV1aWRMaXN0KGpzb24pO1xuICAgICAgICAgICAgZGVwZW5kcy5mb3JFYWNoKCh1dWlkLCBpbmRleCkgPT4gZGVwZW5kc1tpbmRleF0gPSBjYy5hc3NldE1hbmFnZXIudXRpbHMuZGVjb2RlVXVpZCh1dWlkKSk7XG4gICAgICAgICAgICByZXR1cm4gZGVwZW5kcztcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIHZhciBkZXBlbmRzID0gW107XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlRGVwZW5kUmVjdXJzaXZlbHkgKGRhdGEsIG91dCkge1xuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JyB8fCBkYXRhLl9faWRfXykgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHV1aWQgPSBkYXRhLl9fdXVpZF9fO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlRGVwZW5kUmVjdXJzaXZlbHkoZGF0YVtpXSwgb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1dWlkKSB7IFxuICAgICAgICAgICAgICAgIG91dC5wdXNoKGNjLmFzc2V0TWFuYWdlci51dGlscy5kZWNvZGVVdWlkKHV1aWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZURlcGVuZFJlY3Vyc2l2ZWx5KGRhdGFbcHJvcF0sIG91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhcnNlRGVwZW5kUmVjdXJzaXZlbHkoanNvbiwgZGVwZW5kcyk7XG4gICAgICAgIHJldHVybiBkZXBlbmRzO1xuICAgIH0gOiBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICBsZXQgZGVwZW5kcyA9IGdldERlcGVuZFV1aWRMaXN0KGpzb24pO1xuICAgICAgICBkZXBlbmRzLmZvckVhY2goKHV1aWQsIGluZGV4KSA9PiBkZXBlbmRzW2luZGV4XSA9IGNjLmFzc2V0TWFuYWdlci51dGlscy5kZWNvZGVVdWlkKHV1aWQpKTtcbiAgICAgICAgcmV0dXJuIGRlcGVuZHM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZXBlbmRVdGlsOyJdLCJzb3VyY2VSb290IjoiLyJ9