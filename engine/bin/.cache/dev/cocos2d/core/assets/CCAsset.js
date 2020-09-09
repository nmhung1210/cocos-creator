
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCAsset.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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
var CCObject = require('../platform/CCObject');
/**
 * !#en
 * Base class for handling assets used in Creator.<br/>
 *
 * You may want to override:<br/>
 * - createNode<br/>
 * - getset functions of _nativeAsset<br/>
 * - cc.Object._serialize<br/>
 * - cc.Object._deserialize<br/>
 * !#zh
 * Creator 中的资源基类。<br/>
 *
 * 您可能需要重写：<br/>
 * - createNode <br/>
 * - _nativeAsset 的 getset 方法<br/>
 * - cc.Object._serialize<br/>
 * - cc.Object._deserialize<br/>
 *
 * @class Asset
 * @extends Object
 */


cc.Asset = cc.Class({
  name: 'cc.Asset',
  "extends": CCObject,
  ctor: function ctor() {
    /**
     * @property {String} _uuid
     * @private
     */
    // enumerable is false by default, to avoid uuid being assigned to empty string during destroy
    Object.defineProperty(this, '_uuid', {
      value: '',
      writable: true
    });
    /**
     * !#en
     * Whether the asset is loaded or not.
     * !#zh
     * 该资源是否已经成功加载。
     *
     * @property loaded
     * @type {Boolean}
     */

    this.loaded = true;
    this._nativeUrl = '';
    this._ref = 0;
  },
  properties: {
    /**
     * !#en
     * Returns the url of this asset's native object, if none it will returns an empty string.
     * !#zh
     * 返回该资源对应的目标平台资源的 URL，如果没有将返回一个空字符串。
     * @property nativeUrl
     * @type {String}
     * @readOnly
     */
    nativeUrl: {
      get: function get() {
        if (!this._nativeUrl) {
          if (this._native) {
            var name = this._native;

            if (name.charCodeAt(0) === 47) {
              // '/'
              // remove library tag
              // not imported in library, just created on-the-fly
              return name.slice(1);
            }

            if (name.charCodeAt(0) === 46) {
              // '.'
              // imported in dir where json exist
              this._nativeUrl = cc.assetManager.utils.getUrlWithUuid(this._uuid, {
                ext: name,
                isNative: true
              });
            } else {
              // imported in an independent dir
              this._nativeUrl = cc.assetManager.utils.getUrlWithUuid(this._uuid, {
                __nativeName__: name,
                ext: cc.path.extname(name),
                isNative: true
              });
            }
          }
        }

        return this._nativeUrl;
      },
      visible: false
    },

    /**
     * !#en
     * The number of reference
     * 
     * !#zh
     * 引用的数量
     * 
     * @property refCount
     * @type {Number}
     */
    refCount: {
      get: function get() {
        return this._ref;
      }
    },

    /**
     * !#en
     * Serializable url for native asset.
     * !#zh
     * 保存原生资源的 URL。
     * @property {String} _native
     * @default undefined
     * @private
     */
    _native: "",

    /**
     * !#en
     * The underlying native asset of this asset if one is available.
     * This property can be used to access additional details or functionality releated to the asset.
     * This property will be initialized by the loader if `_native` is available.
     * !#zh
     * 此资源依赖的底层原生资源（如果有的话）。
     * 此属性可用于访问与资源相关的其他详细信息或功能。
     * 如果 `_native` 可用，则此属性将由加载器初始化。
     * @property {Object} _nativeAsset
     * @default null
     * @private
     */
    _nativeAsset: {
      get: function get() {
        return this._$nativeAsset;
      },
      set: function set(obj) {
        this._$nativeAsset = obj;
      }
    },
    _nativeDep: {
      get: function get() {
        if (this._native) {
          return {
            __isNative__: true,
            uuid: this._uuid,
            ext: this._native
          };
        }
      }
    }
  },
  statics: {
    /**
     * !#en
     * Provide this method at the request of AssetDB.
     * !#zh
     * 应 AssetDB 要求提供这个方法。
     *
     * @method deserialize
     * @param {String} data
     * @return {Asset}
     * @static
     * @private
     */
    deserialize: CC_EDITOR && function (data) {
      return cc.deserialize(data);
    },

    /**
     * !#en Indicates whether its dependent raw assets can support deferred load if the owner scene (or prefab) is marked as `asyncLoadAssets`.
     * !#zh 当场景或 Prefab 被标记为 `asyncLoadAssets`，禁止延迟加载该资源所依赖的其它原始资源。
     *
     * @property {Boolean} preventDeferredLoadDependents
     * @default false
     * @static
     */
    preventDeferredLoadDependents: false,

    /**
     * !#en Indicates whether its native object should be preloaded from native url.
     * !#zh 禁止预加载原生对象。
     *
     * @property {Boolean} preventPreloadNativeObject
     * @default false
     * @static
     */
    preventPreloadNativeObject: false,
    _parseDepsFromJson: function _parseDepsFromJson(json) {
      var depends = [];
      parseDependRecursively(json, depends);
      return depends;
    },
    _parseNativeDepFromJson: function _parseNativeDepFromJson(json) {
      if (json._native) return {
        __isNative__: true,
        ext: json._native
      };
      return null;
    }
  },

  /**
   * !#en
   * Returns the asset's url.
    * The `Asset` object overrides the `toString()` method of the `Object` object.
   * For `Asset` objects, the `toString()` method returns a string representation of the object.
   * JavaScript calls the `toString()` method automatically when an asset is to be represented as a text value or when a texture is referred to in a string concatenation.
   * !#zh
   * 返回资源的 URL。
   * 
   * Asset 对象将会重写 Object 对象的 `toString()` 方法。
   * 对于 Asset 对象，`toString()` 方法返回该对象的字符串表示形式。
   * 当资源要表示为文本值时或在字符串连接时引用时，JavaScript 会自动调用 `toString()` 方法。
   * @method toString
   * @return {String}
   */
  toString: function toString() {
    return this.nativeUrl;
  },

  /**
   * !#en
   * Provide this method at the request of AssetDB.
   * !#zh
   * 应 AssetDB 要求提供这个方法。
   *
   * @method serialize
   * @return {String}
   * @private
   */
  serialize: CC_EDITOR && function () {
    return Editor.serialize(this);
  },

  /**
   * !#en
   * Create a new node using this asset in the scene.<br/>
   * If this type of asset dont have its corresponding node type, this method should be null.
   * !#zh
   * 使用该资源在场景中创建一个新节点。<br/>
   * 如果这类资源没有相应的节点类型，该方法应该是空的。
   *
   * @method createNode
   * @param {Function} callback
   * @param {String} callback.error - null or the error info
   * @param {Object} callback.node - the created node or null
   */
  createNode: null,

  /**
   * !#en
   * Set native file name for this asset.
   * !#zh
   * 为此资源设置原生文件名。
   * 
   * @seealso nativeUrl
   *
   * @method _setRawAsset
   * @param {String} filename
   * @param {Boolean} [inLibrary=true]
   * @private
   */
  _setRawAsset: function _setRawAsset(filename, inLibrary) {
    if (inLibrary !== false) {
      this._native = filename || undefined;
    } else {
      this._native = '/' + filename; // simply use '/' to tag location where is not in the library
    }
  },

  /**
   * !#en
   * Add references of asset
   * 
   * !#zh
   * 增加资源的引用
   * 
   * @method addRef
   * @return {Asset} itself
   * 
   * @typescript
   * addRef(): cc.Asset
   */
  addRef: function addRef() {
    this._ref++;
    return this;
  },

  /**
   * !#en
   * Reduce references of asset and it will be auto released when refCount equals 0.
   * 
   * !#zh
   * 减少资源的引用并尝试进行自动释放。
   * 
   * @method decRef
   * @return {Asset} itself
   * 
   * @typescript
   * decRef(): cc.Asset
   */
  decRef: function decRef(autoRelease) {
    this._ref--;
    autoRelease !== false && cc.assetManager._releaseManager.tryRelease(this);
    return this;
  }
});

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

module.exports = cc.Asset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0Fzc2V0LmpzIl0sIm5hbWVzIjpbIkNDT2JqZWN0IiwicmVxdWlyZSIsImNjIiwiQXNzZXQiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIndyaXRhYmxlIiwibG9hZGVkIiwiX25hdGl2ZVVybCIsIl9yZWYiLCJwcm9wZXJ0aWVzIiwibmF0aXZlVXJsIiwiZ2V0IiwiX25hdGl2ZSIsImNoYXJDb2RlQXQiLCJzbGljZSIsImFzc2V0TWFuYWdlciIsInV0aWxzIiwiZ2V0VXJsV2l0aFV1aWQiLCJfdXVpZCIsImV4dCIsImlzTmF0aXZlIiwiX19uYXRpdmVOYW1lX18iLCJwYXRoIiwiZXh0bmFtZSIsInZpc2libGUiLCJyZWZDb3VudCIsIl9uYXRpdmVBc3NldCIsIl8kbmF0aXZlQXNzZXQiLCJzZXQiLCJvYmoiLCJfbmF0aXZlRGVwIiwiX19pc05hdGl2ZV9fIiwidXVpZCIsInN0YXRpY3MiLCJkZXNlcmlhbGl6ZSIsIkNDX0VESVRPUiIsImRhdGEiLCJwcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50cyIsInByZXZlbnRQcmVsb2FkTmF0aXZlT2JqZWN0IiwiX3BhcnNlRGVwc0Zyb21Kc29uIiwianNvbiIsImRlcGVuZHMiLCJwYXJzZURlcGVuZFJlY3Vyc2l2ZWx5IiwiX3BhcnNlTmF0aXZlRGVwRnJvbUpzb24iLCJ0b1N0cmluZyIsInNlcmlhbGl6ZSIsIkVkaXRvciIsImNyZWF0ZU5vZGUiLCJfc2V0UmF3QXNzZXQiLCJmaWxlbmFtZSIsImluTGlicmFyeSIsInVuZGVmaW5lZCIsImFkZFJlZiIsImRlY1JlZiIsImF1dG9SZWxlYXNlIiwiX3JlbGVhc2VNYW5hZ2VyIiwidHJ5UmVsZWFzZSIsIm91dCIsIl9faWRfXyIsIl9fdXVpZF9fIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImwiLCJsZW5ndGgiLCJwdXNoIiwiZGVjb2RlVXVpZCIs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ekMsRUFBNkM7QUFDekNwQixNQUFBQSxzQkFBc0IsQ0FBQ04sSUFBSSxDQUFDMEIsQ0FBRCxDQUFMLEVBQVVMLEdBQVYsQ0FBdEI7QUFDSDtBQUNKLEdBSkQsTUFLSyxJQUFJekIsSUFBSixFQUFVO0FBQ1h5QixJQUFBQSxHQUFHLENBQUNRLElBQUosQ0FBU3BFLEVBQUUsQ0FBQ2tCLFlBQUgsQ0FBZ0JDLEtBQWhCLENBQXNCa0QsVUFBdEIsQ0FBaUNsQyxJQUFqQyxDQUFUO0FBQ0gsR0FGSSxNQUdBO0FBQ0QsU0FBSyxJQUFJbUMsSUFBVCxJQUFpQi9CLElBQWpCLEVBQXVCO0FBQ25CTSxNQUFBQSxzQkFBc0IsQ0FBQ04sSUFBSSxDQUFDK0IsSUFBRCxDQUFMLEVBQWFWLEdBQWIsQ0FBdEI7QUFDSDtBQUNKO0FBQ0o7O0FBRURXLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhFLEVBQUUsQ0FBQ0MsS0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBDQ09iamVjdCA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDT2JqZWN0Jyk7XG5cbi8qKlxuICogISNlblxuICogQmFzZSBjbGFzcyBmb3IgaGFuZGxpbmcgYXNzZXRzIHVzZWQgaW4gQ3JlYXRvci48YnIvPlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBvdmVycmlkZTo8YnIvPlxuICogLSBjcmVhdGVOb2RlPGJyLz5cbiAqIC0gZ2V0c2V0IGZ1bmN0aW9ucyBvZiBfbmF0aXZlQXNzZXQ8YnIvPlxuICogLSBjYy5PYmplY3QuX3NlcmlhbGl6ZTxici8+XG4gKiAtIGNjLk9iamVjdC5fZGVzZXJpYWxpemU8YnIvPlxuICogISN6aFxuICogQ3JlYXRvciDkuK3nmoTotYTmupDln7rnsbvjgII8YnIvPlxuICpcbiAqIOaCqOWPr+iDvemcgOimgemHjeWGme+8mjxici8+XG4gKiAtIGNyZWF0ZU5vZGUgPGJyLz5cbiAqIC0gX25hdGl2ZUFzc2V0IOeahCBnZXRzZXQg5pa55rOVPGJyLz5cbiAqIC0gY2MuT2JqZWN0Ll9zZXJpYWxpemU8YnIvPlxuICogLSBjYy5PYmplY3QuX2Rlc2VyaWFsaXplPGJyLz5cbiAqXG4gKiBAY2xhc3MgQXNzZXRcbiAqIEBleHRlbmRzIE9iamVjdFxuICovXG5jYy5Bc3NldCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQXNzZXQnLCBleHRlbmRzOiBDQ09iamVjdCxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IF91dWlkXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICAvLyBlbnVtZXJhYmxlIGlzIGZhbHNlIGJ5IGRlZmF1bHQsIHRvIGF2b2lkIHV1aWQgYmVpbmcgYXNzaWduZWQgdG8gZW1wdHkgc3RyaW5nIGR1cmluZyBkZXN0cm95XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3V1aWQnLCB7XG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIGFzc2V0IGlzIGxvYWRlZCBvciBub3QuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6K+l6LWE5rqQ5piv5ZCm5bey57uP5oiQ5Yqf5Yqg6L2944CCXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBsb2FkZWRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX25hdGl2ZVVybCA9ICcnO1xuICAgICAgICB0aGlzLl9yZWYgPSAwO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFJldHVybnMgdGhlIHVybCBvZiB0aGlzIGFzc2V0J3MgbmF0aXZlIG9iamVjdCwgaWYgbm9uZSBpdCB3aWxsIHJldHVybnMgYW4gZW1wdHkgc3RyaW5nLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOi/lOWbnuivpei1hOa6kOWvueW6lOeahOebruagh+W5s+WPsOi1hOa6kOeahCBVUkzvvIzlpoLmnpzmsqHmnInlsIbov5Tlm57kuIDkuKrnqbrlrZfnrKbkuLLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IG5hdGl2ZVVybFxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICovXG4gICAgICAgIG5hdGl2ZVVybDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9uYXRpdmVVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLl9uYXRpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSA0NykgeyAgICAvLyAnLydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGlicmFyeSB0YWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3QgaW1wb3J0ZWQgaW4gbGlicmFyeSwganVzdCBjcmVhdGVkIG9uLXRoZS1mbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IDQ2KSB7ICAvLyAnLidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0ZWQgaW4gZGlyIHdoZXJlIGpzb24gZXhpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVVcmwgPSBjYy5hc3NldE1hbmFnZXIudXRpbHMuZ2V0VXJsV2l0aFV1aWQodGhpcy5fdXVpZCwge2V4dDogbmFtZSwgaXNOYXRpdmU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbXBvcnRlZCBpbiBhbiBpbmRlcGVuZGVudCBkaXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVVcmwgPSBjYy5hc3NldE1hbmFnZXIudXRpbHMuZ2V0VXJsV2l0aFV1aWQodGhpcy5fdXVpZCwge19fbmF0aXZlTmFtZV9fOiBuYW1lLCBleHQ6IGNjLnBhdGguZXh0bmFtZShuYW1lKSwgaXNOYXRpdmU6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlVXJsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIG51bWJlciBvZiByZWZlcmVuY2VcbiAgICAgICAgICogXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5byV55So55qE5pWw6YePXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcHJvcGVydHkgcmVmQ291bnRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHJlZkNvdW50OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogU2VyaWFsaXphYmxlIHVybCBmb3IgbmF0aXZlIGFzc2V0LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOS/neWtmOWOn+eUn+i1hOa6kOeahCBVUkzjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IF9uYXRpdmVcbiAgICAgICAgICogQGRlZmF1bHQgdW5kZWZpbmVkXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfbmF0aXZlOiBcIlwiLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSB1bmRlcmx5aW5nIG5hdGl2ZSBhc3NldCBvZiB0aGlzIGFzc2V0IGlmIG9uZSBpcyBhdmFpbGFibGUuXG4gICAgICAgICAqIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIGFkZGl0aW9uYWwgZGV0YWlscyBvciBmdW5jdGlvbmFsaXR5IHJlbGVhdGVkIHRvIHRoZSBhc3NldC5cbiAgICAgICAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIGluaXRpYWxpemVkIGJ5IHRoZSBsb2FkZXIgaWYgYF9uYXRpdmVgIGlzIGF2YWlsYWJsZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmraTotYTmupDkvp3otZbnmoTlupXlsYLljp/nlJ/otYTmupDvvIjlpoLmnpzmnInnmoTor53vvInjgIJcbiAgICAgICAgICog5q2k5bGe5oCn5Y+v55So5LqO6K6/6Zeu5LiO6LWE5rqQ55u45YWz55qE5YW25LuW6K+m57uG5L+h5oGv5oiW5Yqf6IO944CCXG4gICAgICAgICAqIOWmguaenCBgX25hdGl2ZWAg5Y+v55So77yM5YiZ5q2k5bGe5oCn5bCG55Sx5Yqg6L295Zmo5Yid5aeL5YyW44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBfbmF0aXZlQXNzZXRcbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl8kbmF0aXZlQXNzZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IChvYmopIHtcbiAgICAgICAgICAgICAgICB0aGlzLl8kbmF0aXZlQXNzZXQgPSBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX25hdGl2ZURlcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7X19pc05hdGl2ZV9fOiB0cnVlLCB1dWlkOiB0aGlzLl91dWlkLCBleHQ6IHRoaXMuX25hdGl2ZX07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogUHJvdmlkZSB0aGlzIG1ldGhvZCBhdCB0aGUgcmVxdWVzdCBvZiBBc3NldERCLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOW6lCBBc3NldERCIOimgeaxguaPkOS+m+i/meS4quaWueazleOAglxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRlc2VyaWFsaXplXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gICAgICAgICAqIEByZXR1cm4ge0Fzc2V0fVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBkZXNlcmlhbGl6ZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MuZGVzZXJpYWxpemUoZGF0YSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSW5kaWNhdGVzIHdoZXRoZXIgaXRzIGRlcGVuZGVudCByYXcgYXNzZXRzIGNhbiBzdXBwb3J0IGRlZmVycmVkIGxvYWQgaWYgdGhlIG93bmVyIHNjZW5lIChvciBwcmVmYWIpIGlzIG1hcmtlZCBhcyBgYXN5bmNMb2FkQXNzZXRzYC5cbiAgICAgICAgICogISN6aCDlvZPlnLrmma/miJYgUHJlZmFiIOiiq+agh+iusOS4uiBgYXN5bmNMb2FkQXNzZXRzYO+8jOemgeatouW7tui/n+WKoOi9veivpei1hOa6kOaJgOS+nei1lueahOWFtuWug+WOn+Wni+i1hOa6kOOAglxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIHByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzOiBmYWxzZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciBpdHMgbmF0aXZlIG9iamVjdCBzaG91bGQgYmUgcHJlbG9hZGVkIGZyb20gbmF0aXZlIHVybC5cbiAgICAgICAgICogISN6aCDnpoHmraLpooTliqDovb3ljp/nlJ/lr7nosaHjgIJcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBwcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdFxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBwcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdDogZmFsc2UsXG5cbiAgICAgICAgX3BhcnNlRGVwc0Zyb21Kc29uIChqc29uKSB7XG4gICAgICAgICAgICB2YXIgZGVwZW5kcyA9IFtdO1xuICAgICAgICAgICAgcGFyc2VEZXBlbmRSZWN1cnNpdmVseShqc29uLCBkZXBlbmRzKTtcbiAgICAgICAgICAgIHJldHVybiBkZXBlbmRzO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9wYXJzZU5hdGl2ZURlcEZyb21Kc29uIChqc29uKSB7XG4gICAgICAgICAgICBpZiAoanNvbi5fbmF0aXZlKSByZXR1cm4geyBfX2lzTmF0aXZlX186IHRydWUsIGV4dDoganNvbi5fbmF0aXZlfTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGFzc2V0J3MgdXJsLlxuXG4gICAgICogVGhlIGBBc3NldGAgb2JqZWN0IG92ZXJyaWRlcyB0aGUgYHRvU3RyaW5nKClgIG1ldGhvZCBvZiB0aGUgYE9iamVjdGAgb2JqZWN0LlxuICAgICAqIEZvciBgQXNzZXRgIG9iamVjdHMsIHRoZSBgdG9TdHJpbmcoKWAgbWV0aG9kIHJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdC5cbiAgICAgKiBKYXZhU2NyaXB0IGNhbGxzIHRoZSBgdG9TdHJpbmcoKWAgbWV0aG9kIGF1dG9tYXRpY2FsbHkgd2hlbiBhbiBhc3NldCBpcyB0byBiZSByZXByZXNlbnRlZCBhcyBhIHRleHQgdmFsdWUgb3Igd2hlbiBhIHRleHR1cmUgaXMgcmVmZXJyZWQgdG8gaW4gYSBzdHJpbmcgY29uY2F0ZW5hdGlvbi5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5Zue6LWE5rqQ55qEIFVSTOOAglxuICAgICAqIFxuICAgICAqIEFzc2V0IOWvueixoeWwhuS8mumHjeWGmSBPYmplY3Qg5a+56LGh55qEIGB0b1N0cmluZygpYCDmlrnms5XjgIJcbiAgICAgKiDlr7nkuo4gQXNzZXQg5a+56LGh77yMYHRvU3RyaW5nKClgIOaWueazlei/lOWbnuivpeWvueixoeeahOWtl+espuS4suihqOekuuW9ouW8j+OAglxuICAgICAqIOW9k+i1hOa6kOimgeihqOekuuS4uuaWh+acrOWAvOaXtuaIluWcqOWtl+espuS4sui/nuaOpeaXtuW8leeUqOaXtu+8jEphdmFTY3JpcHQg5Lya6Ieq5Yqo6LCD55SoIGB0b1N0cmluZygpYCDmlrnms5XjgIJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRvU3RyaW5nICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlVXJsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUHJvdmlkZSB0aGlzIG1ldGhvZCBhdCB0aGUgcmVxdWVzdCBvZiBBc3NldERCLlxuICAgICAqICEjemhcbiAgICAgKiDlupQgQXNzZXREQiDopoHmsYLmj5Dkvpvov5nkuKrmlrnms5XjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc2VyaWFsaXplXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2VyaWFsaXplOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gRWRpdG9yLnNlcmlhbGl6ZSh0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENyZWF0ZSBhIG5ldyBub2RlIHVzaW5nIHRoaXMgYXNzZXQgaW4gdGhlIHNjZW5lLjxici8+XG4gICAgICogSWYgdGhpcyB0eXBlIG9mIGFzc2V0IGRvbnQgaGF2ZSBpdHMgY29ycmVzcG9uZGluZyBub2RlIHR5cGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBudWxsLlxuICAgICAqICEjemhcbiAgICAgKiDkvb/nlKjor6XotYTmupDlnKjlnLrmma/kuK3liJvlu7rkuIDkuKrmlrDoioLngrnjgII8YnIvPlxuICAgICAqIOWmguaenOi/meexu+i1hOa6kOayoeacieebuOW6lOeahOiKgueCueexu+Wei++8jOivpeaWueazleW6lOivpeaYr+epuueahOOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBjcmVhdGVOb2RlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2FsbGJhY2suZXJyb3IgLSBudWxsIG9yIHRoZSBlcnJvciBpbmZvXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrLm5vZGUgLSB0aGUgY3JlYXRlZCBub2RlIG9yIG51bGxcbiAgICAgKi9cbiAgICBjcmVhdGVOb2RlOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCBuYXRpdmUgZmlsZSBuYW1lIGZvciB0aGlzIGFzc2V0LlxuICAgICAqICEjemhcbiAgICAgKiDkuLrmraTotYTmupDorr7nva7ljp/nlJ/mlofku7blkI3jgIJcbiAgICAgKiBcbiAgICAgKiBAc2VlYWxzbyBuYXRpdmVVcmxcbiAgICAgKlxuICAgICAqIEBtZXRob2QgX3NldFJhd0Fzc2V0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbaW5MaWJyYXJ5PXRydWVdXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0UmF3QXNzZXQ6IGZ1bmN0aW9uIChmaWxlbmFtZSwgaW5MaWJyYXJ5KSB7XG4gICAgICAgIGlmIChpbkxpYnJhcnkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmUgPSBmaWxlbmFtZSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmUgPSAnLycgKyBmaWxlbmFtZTsgIC8vIHNpbXBseSB1c2UgJy8nIHRvIHRhZyBsb2NhdGlvbiB3aGVyZSBpcyBub3QgaW4gdGhlIGxpYnJhcnlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIHJlZmVyZW5jZXMgb2YgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5aKe5Yqg6LWE5rqQ55qE5byV55SoXG4gICAgICogXG4gICAgICogQG1ldGhvZCBhZGRSZWZcbiAgICAgKiBAcmV0dXJuIHtBc3NldH0gaXRzZWxmXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhZGRSZWYoKTogY2MuQXNzZXRcbiAgICAgKi9cbiAgICBhZGRSZWYgKCkge1xuICAgICAgICB0aGlzLl9yZWYrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWR1Y2UgcmVmZXJlbmNlcyBvZiBhc3NldCBhbmQgaXQgd2lsbCBiZSBhdXRvIHJlbGVhc2VkIHdoZW4gcmVmQ291bnQgZXF1YWxzIDAuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWHj+Wwkei1hOa6kOeahOW8leeUqOW5tuWwneivlei/m+ihjOiHquWKqOmHiuaUvuOAglxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZGVjUmVmXG4gICAgICogQHJldHVybiB7QXNzZXR9IGl0c2VsZlxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZGVjUmVmKCk6IGNjLkFzc2V0XG4gICAgICovXG4gICAgZGVjUmVmIChhdXRvUmVsZWFzZSkge1xuICAgICAgICB0aGlzLl9yZWYtLTtcbiAgICAgICAgYXV0b1JlbGVhc2UgIT09IGZhbHNlICYmIGNjLmFzc2V0TWFuYWdlci5fcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHBhcnNlRGVwZW5kUmVjdXJzaXZlbHkgKGRhdGEsIG91dCkge1xuICAgIGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcgfHwgZGF0YS5fX2lkX18pIHJldHVybjtcbiAgICB2YXIgdXVpZCA9IGRhdGEuX191dWlkX187XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgcGFyc2VEZXBlbmRSZWN1cnNpdmVseShkYXRhW2ldLCBvdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHV1aWQpIHsgXG4gICAgICAgIG91dC5wdXNoKGNjLmFzc2V0TWFuYWdlci51dGlscy5kZWNvZGVVdWlkKHV1aWQpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gZGF0YSkge1xuICAgICAgICAgICAgcGFyc2VEZXBlbmRSZWN1cnNpdmVseShkYXRhW3Byb3BdLCBvdXQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkFzc2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=