
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
    preventPreloadNativeObject: false
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0Fzc2V0LmpzIl0sIm5hbWVzIjpbIkNDT2JqZWN0IiwicmVxdWlyZSIsImNjIiwiQXNzZXQiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIndyaXRhYmxlIiwibG9hZGVkIiwiX25hdGl2ZVVybCIsIl9yZWYiLCJwcm9wZXJ0aWVzIiwibmF0aXZlVXJsIiwiZ2V0IiwiX25hdGl2ZSIsImNoYXJDb2RlQXQiLCJzbGljZSIsImFzc2V0TWFuYWdlciIsInV0aWxzIiwiZ2V0VXJsV2l0aFV1aWQiLCJfdXVpZCIsImV4dCIsImlzTmF0aXZlIiwiX19uYXRpdmVOYW1lX18iLCJwYXRoIiwiZXh0bmFtZSIsInZpc2libGUiLCJyZWZDb3VudCIsIl9uYXRpdmVBc3NldCIsIl8kbmF0aXZlQXNzZXQiLCJzZXQiLCJvYmoiLCJfbmF0aXZlRGVwIiwiX19pc05hdGl2ZV9fIiwidXVpZCIsInN0YXRpY3MiLCJkZXNlcmlhbGl6ZSIsIkNDX0VESVRPUiIsImRhdGEiLCJwcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50cyIsInByZXZlbnRQcmVsb2FkTmF0aXZlT2JqZWN0IiwidG9TdHJpbmciLCJzZXJpYWxpemUiLCJFZGl0b3IiLCJjcmVhdGVOb2RlIiwiX3NldFJhd0Fzc2V0IiwiZmlsZW5hbWUiLCJpbkxpYnJhcnkiLCJ1bmRlZmluZWQiLCJhZGRSZWYiLCJkZWNSZWYiLCJhdXRvUmVsZWFzZSIsIl9yZWxlYXNlTWFuYWdlciIsInRyeVJlbGVhc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsc0JBQUQsQ0FBdEI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkFDLEVBQUUsQ0FBQ0MsS0FBSCxH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QWhDLENBQTJDLElBQTNDLENBQXpCO0FBQ0EsV0FBTyxJQUFQO0FBQ0g7QUF6UWUsQ0FBVCxDQUFYO0FBNFFBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ4RCxFQUFFLENBQUNDLEtBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgQ0NPYmplY3QgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ09iamVjdCcpO1xuXG4vKipcbiAqICEjZW5cbiAqIEJhc2UgY2xhc3MgZm9yIGhhbmRsaW5nIGFzc2V0cyB1c2VkIGluIENyZWF0b3IuPGJyLz5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gb3ZlcnJpZGU6PGJyLz5cbiAqIC0gY3JlYXRlTm9kZTxici8+XG4gKiAtIGdldHNldCBmdW5jdGlvbnMgb2YgX25hdGl2ZUFzc2V0PGJyLz5cbiAqIC0gY2MuT2JqZWN0Ll9zZXJpYWxpemU8YnIvPlxuICogLSBjYy5PYmplY3QuX2Rlc2VyaWFsaXplPGJyLz5cbiAqICEjemhcbiAqIENyZWF0b3Ig5Lit55qE6LWE5rqQ5Z+657G744CCPGJyLz5cbiAqXG4gKiDmgqjlj6/og73pnIDopoHph43lhpnvvJo8YnIvPlxuICogLSBjcmVhdGVOb2RlIDxici8+XG4gKiAtIF9uYXRpdmVBc3NldCDnmoQgZ2V0c2V0IOaWueazlTxici8+XG4gKiAtIGNjLk9iamVjdC5fc2VyaWFsaXplPGJyLz5cbiAqIC0gY2MuT2JqZWN0Ll9kZXNlcmlhbGl6ZTxici8+XG4gKlxuICogQGNsYXNzIEFzc2V0XG4gKiBAZXh0ZW5kcyBPYmplY3RcbiAqL1xuY2MuQXNzZXQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkFzc2V0JywgZXh0ZW5kczogQ0NPYmplY3QsXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBfdXVpZFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgLy8gZW51bWVyYWJsZSBpcyBmYWxzZSBieSBkZWZhdWx0LCB0byBhdm9pZCB1dWlkIGJlaW5nIGFzc2lnbmVkIHRvIGVtcHR5IHN0cmluZyBkdXJpbmcgZGVzdHJveVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ191dWlkJywge1xuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBhc3NldCBpcyBsb2FkZWQgb3Igbm90LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOivpei1hOa6kOaYr+WQpuW3sue7j+aIkOWKn+WKoOi9veOAglxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgbG9hZGVkXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9uYXRpdmVVcmwgPSAnJztcbiAgICAgICAgdGhpcy5fcmVmID0gMDtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB1cmwgb2YgdGhpcyBhc3NldCdzIG5hdGl2ZSBvYmplY3QsIGlmIG5vbmUgaXQgd2lsbCByZXR1cm5zIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDov5Tlm57or6XotYTmupDlr7nlupTnmoTnm67moIflubPlj7DotYTmupDnmoQgVVJM77yM5aaC5p6c5rKh5pyJ5bCG6L+U5Zue5LiA5Liq56m65a2X56ym5Liy44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBuYXRpdmVVcmxcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqL1xuICAgICAgICBuYXRpdmVVcmw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbmF0aXZlVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5fbmF0aXZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gNDcpIHsgICAgLy8gJy8nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpYnJhcnkgdGFnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm90IGltcG9ydGVkIGluIGxpYnJhcnksIGp1c3QgY3JlYXRlZCBvbi10aGUtZmx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSA0NikgeyAgLy8gJy4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydGVkIGluIGRpciB3aGVyZSBqc29uIGV4aXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlVXJsID0gY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLmdldFVybFdpdGhVdWlkKHRoaXMuX3V1aWQsIHtleHQ6IG5hbWUsIGlzTmF0aXZlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0ZWQgaW4gYW4gaW5kZXBlbmRlbnQgZGlyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlVXJsID0gY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLmdldFVybFdpdGhVdWlkKHRoaXMuX3V1aWQsIHtfX25hdGl2ZU5hbWVfXzogbmFtZSwgZXh0OiBjYy5wYXRoLmV4dG5hbWUobmFtZSksIGlzTmF0aXZlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZVVybDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgcmVmZXJlbmNlXG4gICAgICAgICAqIFxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOW8leeUqOeahOaVsOmHj1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHByb3BlcnR5IHJlZkNvdW50XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICByZWZDb3VudDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFNlcmlhbGl6YWJsZSB1cmwgZm9yIG5hdGl2ZSBhc3NldC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDkv53lrZjljp/nlJ/otYTmupDnmoQgVVJM44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBfbmF0aXZlXG4gICAgICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX25hdGl2ZTogXCJcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgdW5kZXJseWluZyBuYXRpdmUgYXNzZXQgb2YgdGhpcyBhc3NldCBpZiBvbmUgaXMgYXZhaWxhYmxlLlxuICAgICAgICAgKiBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIGFjY2VzcyBhZGRpdGlvbmFsIGRldGFpbHMgb3IgZnVuY3Rpb25hbGl0eSByZWxlYXRlZCB0byB0aGUgYXNzZXQuXG4gICAgICAgICAqIFRoaXMgcHJvcGVydHkgd2lsbCBiZSBpbml0aWFsaXplZCBieSB0aGUgbG9hZGVyIGlmIGBfbmF0aXZlYCBpcyBhdmFpbGFibGUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5q2k6LWE5rqQ5L6d6LWW55qE5bqV5bGC5Y6f55Sf6LWE5rqQ77yI5aaC5p6c5pyJ55qE6K+d77yJ44CCXG4gICAgICAgICAqIOatpOWxnuaAp+WPr+eUqOS6juiuv+mXruS4jui1hOa6kOebuOWFs+eahOWFtuS7luivpue7huS/oeaBr+aIluWKn+iDveOAglxuICAgICAgICAgKiDlpoLmnpwgYF9uYXRpdmVgIOWPr+eUqO+8jOWImeatpOWxnuaAp+WwhueUseWKoOi9veWZqOWIneWni+WMluOAglxuICAgICAgICAgKiBAcHJvcGVydHkge09iamVjdH0gX25hdGl2ZUFzc2V0XG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9uYXRpdmVBc3NldDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fJG5hdGl2ZUFzc2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAob2JqKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fJG5hdGl2ZUFzc2V0ID0gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9uYXRpdmVEZXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge19faXNOYXRpdmVfXzogdHJ1ZSwgdXVpZDogdGhpcy5fdXVpZCwgZXh0OiB0aGlzLl9uYXRpdmV9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFByb3ZpZGUgdGhpcyBtZXRob2QgYXQgdGhlIHJlcXVlc3Qgb2YgQXNzZXREQi5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlupQgQXNzZXREQiDopoHmsYLmj5Dkvpvov5nkuKrmlrnms5XjgIJcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkZXNlcmlhbGl6ZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAgICAgKiBAcmV0dXJuIHtBc3NldH1cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZGVzZXJpYWxpemU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLmRlc2VyaWFsaXplKGRhdGEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB3aGV0aGVyIGl0cyBkZXBlbmRlbnQgcmF3IGFzc2V0cyBjYW4gc3VwcG9ydCBkZWZlcnJlZCBsb2FkIGlmIHRoZSBvd25lciBzY2VuZSAob3IgcHJlZmFiKSBpcyBtYXJrZWQgYXMgYGFzeW5jTG9hZEFzc2V0c2AuXG4gICAgICAgICAqICEjemgg5b2T5Zy65pmv5oiWIFByZWZhYiDooqvmoIforrDkuLogYGFzeW5jTG9hZEFzc2V0c2DvvIznpoHmraLlu7bov5/liqDovb3or6XotYTmupDmiYDkvp3otZbnmoTlhbblroPljp/lp4votYTmupDjgIJcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBwcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50c1xuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBwcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50czogZmFsc2UsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSW5kaWNhdGVzIHdoZXRoZXIgaXRzIG5hdGl2ZSBvYmplY3Qgc2hvdWxkIGJlIHByZWxvYWRlZCBmcm9tIG5hdGl2ZSB1cmwuXG4gICAgICAgICAqICEjemgg56aB5q2i6aKE5Yqg6L295Y6f55Sf5a+56LGh44CCXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJldmVudFByZWxvYWROYXRpdmVPYmplY3RcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgcHJldmVudFByZWxvYWROYXRpdmVPYmplY3Q6IGZhbHNlXG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGFzc2V0J3MgdXJsLlxuXG4gICAgICogVGhlIGBBc3NldGAgb2JqZWN0IG92ZXJyaWRlcyB0aGUgYHRvU3RyaW5nKClgIG1ldGhvZCBvZiB0aGUgYE9iamVjdGAgb2JqZWN0LlxuICAgICAqIEZvciBgQXNzZXRgIG9iamVjdHMsIHRoZSBgdG9TdHJpbmcoKWAgbWV0aG9kIHJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdC5cbiAgICAgKiBKYXZhU2NyaXB0IGNhbGxzIHRoZSBgdG9TdHJpbmcoKWAgbWV0aG9kIGF1dG9tYXRpY2FsbHkgd2hlbiBhbiBhc3NldCBpcyB0byBiZSByZXByZXNlbnRlZCBhcyBhIHRleHQgdmFsdWUgb3Igd2hlbiBhIHRleHR1cmUgaXMgcmVmZXJyZWQgdG8gaW4gYSBzdHJpbmcgY29uY2F0ZW5hdGlvbi5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5Zue6LWE5rqQ55qEIFVSTOOAglxuICAgICAqIFxuICAgICAqIEFzc2V0IOWvueixoeWwhuS8mumHjeWGmSBPYmplY3Qg5a+56LGh55qEIGB0b1N0cmluZygpYCDmlrnms5XjgIJcbiAgICAgKiDlr7nkuo4gQXNzZXQg5a+56LGh77yMYHRvU3RyaW5nKClgIOaWueazlei/lOWbnuivpeWvueixoeeahOWtl+espuS4suihqOekuuW9ouW8j+OAglxuICAgICAqIOW9k+i1hOa6kOimgeihqOekuuS4uuaWh+acrOWAvOaXtuaIluWcqOWtl+espuS4sui/nuaOpeaXtuW8leeUqOaXtu+8jEphdmFTY3JpcHQg5Lya6Ieq5Yqo6LCD55SoIGB0b1N0cmluZygpYCDmlrnms5XjgIJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRvU3RyaW5nICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF0aXZlVXJsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUHJvdmlkZSB0aGlzIG1ldGhvZCBhdCB0aGUgcmVxdWVzdCBvZiBBc3NldERCLlxuICAgICAqICEjemhcbiAgICAgKiDlupQgQXNzZXREQiDopoHmsYLmj5Dkvpvov5nkuKrmlrnms5XjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc2VyaWFsaXplXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2VyaWFsaXplOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gRWRpdG9yLnNlcmlhbGl6ZSh0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENyZWF0ZSBhIG5ldyBub2RlIHVzaW5nIHRoaXMgYXNzZXQgaW4gdGhlIHNjZW5lLjxici8+XG4gICAgICogSWYgdGhpcyB0eXBlIG9mIGFzc2V0IGRvbnQgaGF2ZSBpdHMgY29ycmVzcG9uZGluZyBub2RlIHR5cGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBudWxsLlxuICAgICAqICEjemhcbiAgICAgKiDkvb/nlKjor6XotYTmupDlnKjlnLrmma/kuK3liJvlu7rkuIDkuKrmlrDoioLngrnjgII8YnIvPlxuICAgICAqIOWmguaenOi/meexu+i1hOa6kOayoeacieebuOW6lOeahOiKgueCueexu+Wei++8jOivpeaWueazleW6lOivpeaYr+epuueahOOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBjcmVhdGVOb2RlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2FsbGJhY2suZXJyb3IgLSBudWxsIG9yIHRoZSBlcnJvciBpbmZvXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrLm5vZGUgLSB0aGUgY3JlYXRlZCBub2RlIG9yIG51bGxcbiAgICAgKi9cbiAgICBjcmVhdGVOb2RlOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCBuYXRpdmUgZmlsZSBuYW1lIGZvciB0aGlzIGFzc2V0LlxuICAgICAqICEjemhcbiAgICAgKiDkuLrmraTotYTmupDorr7nva7ljp/nlJ/mlofku7blkI3jgIJcbiAgICAgKiBcbiAgICAgKiBAc2VlYWxzbyBuYXRpdmVVcmxcbiAgICAgKlxuICAgICAqIEBtZXRob2QgX3NldFJhd0Fzc2V0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbaW5MaWJyYXJ5PXRydWVdXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0UmF3QXNzZXQ6IGZ1bmN0aW9uIChmaWxlbmFtZSwgaW5MaWJyYXJ5KSB7XG4gICAgICAgIGlmIChpbkxpYnJhcnkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmUgPSBmaWxlbmFtZSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uYXRpdmUgPSAnLycgKyBmaWxlbmFtZTsgIC8vIHNpbXBseSB1c2UgJy8nIHRvIHRhZyBsb2NhdGlvbiB3aGVyZSBpcyBub3QgaW4gdGhlIGxpYnJhcnlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIHJlZmVyZW5jZXMgb2YgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5aKe5Yqg6LWE5rqQ55qE5byV55SoXG4gICAgICogXG4gICAgICogQG1ldGhvZCBhZGRSZWZcbiAgICAgKiBAcmV0dXJuIHtBc3NldH0gaXRzZWxmXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhZGRSZWYoKTogY2MuQXNzZXRcbiAgICAgKi9cbiAgICBhZGRSZWYgKCkge1xuICAgICAgICB0aGlzLl9yZWYrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWR1Y2UgcmVmZXJlbmNlcyBvZiBhc3NldCBhbmQgaXQgd2lsbCBiZSBhdXRvIHJlbGVhc2VkIHdoZW4gcmVmQ291bnQgZXF1YWxzIDAuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWHj+Wwkei1hOa6kOeahOW8leeUqOW5tuWwneivlei/m+ihjOiHquWKqOmHiuaUvuOAglxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZGVjUmVmXG4gICAgICogQHJldHVybiB7QXNzZXR9IGl0c2VsZlxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZGVjUmVmKCk6IGNjLkFzc2V0XG4gICAgICovXG4gICAgZGVjUmVmIChhdXRvUmVsZWFzZSkge1xuICAgICAgICB0aGlzLl9yZWYtLTtcbiAgICAgICAgYXV0b1JlbGVhc2UgIT09IGZhbHNlICYmIGNjLmFzc2V0TWFuYWdlci5fcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2MuQXNzZXQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==