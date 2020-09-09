
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/deprecated.js';
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
var js = require('../platform/js');

require('../CCDirector');

var utilities = require('./utilities');

var dependUtil = require('./depend-util');

var releaseManager = require('./releaseManager');

var downloader = require('./downloader');

var ImageFmts = ['.png', '.jpg', '.bmp', '.jpeg', '.gif', '.ico', '.tiff', '.webp', '.image', '.pvr', '.pkm'];
var AudioFmts = ['.mp3', '.ogg', '.wav', '.m4a'];

function GetTrue() {
  return true;
}

var md5Pipe = {
  transformURL: function transformURL(url) {
    url = url.replace(/.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-]{8,})/, function (match, uuid) {
      var bundle = cc.assetManager.bundles.find(function (bundle) {
        return bundle.getAssetInfo(uuid);
      });
      var hashValue = '';

      if (bundle) {
        var info = bundle.getAssetInfo(uuid);

        if (url.startsWith(bundle.base + bundle._config.nativeBase)) {
          hashValue = info.nativeVer;
        } else {
          hashValue = info.ver;
        }
      }

      return hashValue ? match + '.' + hashValue : match;
    });
    return url;
  }
};
/**
 * `cc.loader` is deprecated, please backup your project and upgrade to {{#crossLink "AssetManager"}}{{/crossLink}}
 *
 * @class loader
 * @static
 * @deprecated cc.loader is deprecated, please backup your project and upgrade to cc.assetManager
 */

var loader = {
  /**
   * `cc.loader.onProgress` is deprecated, please transfer onProgress to API as a parameter
   * @property onProgress
   * @deprecated cc.loader.onProgress is deprecated, please transfer onProgress to API as a parameter
   */
  onProgress: null,
  _autoReleaseSetting: Object.create(null),

  get _cache() {
    return cc.assetManager.assets._map;
  },

  /**
   * `cc.loader.load` is deprecated, please use {{#crossLink "AssetManager/loadAny:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.load is deprecated, please use cc.assetManager.loadAny instead
   *
   * @method load
   * @param {String|String[]|Object} resources - Url list in an array
   * @param {Function} [progressCallback] - Callback invoked when progression change
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed
   * @param {Number} progressCallback.totalCount - The total number of the items
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline
   * @param {Function} [completeCallback] - Callback invoked when all resources loaded
   * @typescript
   * load(resources: string|string[]|{uuid?: string, url?: string, type?: string}, completeCallback?: Function): void
   * load(resources: string|string[]|{uuid?: string, url?: string, type?: string}, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: Function|null): void
   */
  load: function load(resources, progressCallback, completeCallback) {
    if (completeCallback === undefined) {
      if (progressCallback !== undefined) {
        completeCallback = progressCallback;
        progressCallback = null;
      }
    }

    resources = Array.isArray(resources) ? resources : [resources];

    for (var i = 0; i < resources.length; i++) {
      var item = resources[i];

      if (typeof item === 'string') {
        resources[i] = {
          url: item,
          __isNative__: true
        };
      } else {
        if (item.type) {
          item.ext = '.' + item.type;
          item.type = undefined;
        }

        if (item.url) {
          item.__isNative__ = true;
        }
      }
    }

    var images = [];
    var audios = [];
    cc.assetManager.loadAny(resources, null, function (finish, total, item) {
      if (item.content) {
        if (ImageFmts.includes(item.ext)) {
          images.push(item.content);
        } else if (AudioFmts.includes(item.ext)) {
          audios.push(item.content);
        }
      }

      progressCallback && progressCallback(finish, total, item);
    }, function (err, _native) {
      var res = null;

      if (!err) {
        _native = Array.isArray(_native) ? _native : [_native];

        for (var i = 0; i < _native.length; i++) {
          var item = _native[i];

          if (!(item instanceof cc.Asset)) {
            var asset = item;
            var url = resources[i].url;

            if (images.includes(asset)) {
              asset = new cc.Texture2D();
              asset._nativeUrl = url;
              asset._nativeAsset = item;
              _native[i] = asset;
              asset._uuid = url;
            } else if (audios.includes(asset)) {
              asset = new cc.AudioClip();
              asset._nativeUrl = url;
              asset._nativeAsset = item;
              _native[i] = asset;
              asset._uuid = url;
            }

            cc.assetManager.assets.add(url, asset);
          }
        }

        if (_native.length > 1) {
          var map = Object.create(null);

          _native.forEach(function (asset) {
            map[asset._uuid] = asset;
          });

          res = {
            isCompleted: GetTrue,
            _map: map
          };
        } else {
          res = _native[0];
        }
      }

      completeCallback && completeCallback(err, res);
    });
  },

  /**
   * `cc.loader.getXMLHttpRequest` is deprecated, please use `XMLHttpRequest` directly
   *
   * @method getXMLHttpRequest
   * @deprecated cc.loader.getXMLHttpRequest is deprecated, please use XMLHttpRequest directly
   * @returns {XMLHttpRequest}
   */
  getXMLHttpRequest: function getXMLHttpRequest() {
    return new XMLHttpRequest();
  },
  _parseLoadResArgs: utilities.parseLoadResArgs,

  /**
   * `cc.loader.getItem` is deprecated, please use `cc.assetManager.asset.get` instead
   *
   * @method getItem
   * @param {Object} id The id of the item
   * @return {Object}
   * @deprecated cc.loader.getItem is deprecated, please use cc.assetManager.asset.get instead
   */
  getItem: function getItem(key) {
    return cc.assetManager.assets.has(key) ? {
      content: cc.assetManager.assets.get(key)
    } : null;
  },

  /**
   * `cc.loader.loadRes` is deprecated, please use {{#crossLink "Bundle/load:method"}}{{/crossLink}}  instead
   *
   * @deprecated cc.loader.loadRes is deprecated, please use cc.resources.load  instead
   * @method loadRes
   * @param {String} url - Url of the target resource.
   *                       The url is relative to the "resources" folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [progressCallback] - Callback invoked when progression change.
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
   * @param {Number} progressCallback.totalCount - The total number of the items.
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
   * @param {Function} [completeCallback] - Callback invoked when the resource loaded.
   * @param {Error} completeCallback.error - The error info or null if loaded successfully.
   * @param {Object} completeCallback.resource - The loaded resource if it can be found otherwise returns null.
   *
   * @typescript
   * loadRes(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void)|null): void
   * loadRes(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any) => void): void
   * loadRes(url: string, type: typeof cc.Asset): void
   * loadRes(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void)|null): void
   * loadRes(url: string, completeCallback: (error: Error, resource: any) => void): void
   * loadRes(url: string): void
   */
  loadRes: function loadRes(url, type, progressCallback, completeCallback) {
    var _this$_parseLoadResAr = this._parseLoadResArgs(type, progressCallback, completeCallback),
        type = _this$_parseLoadResAr.type,
        onProgress = _this$_parseLoadResAr.onProgress,
        onComplete = _this$_parseLoadResAr.onComplete;

    var extname = cc.path.extname(url);

    if (extname) {
      // strip extname
      url = url.slice(0, -extname.length);
    }

    cc.resources.load(url, type, onProgress, onComplete);
  },

  /**
   * `cc.loader.loadResArray` is deprecated, please use {{#crossLink "Bundle/load:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.loadResArray is deprecated, please use cc.resources.load instead
   * @method loadResArray
   * @param {String[]} urls - Array of URLs of the target resource.
   *                          The url is relative to the "resources" folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [progressCallback] - Callback invoked when progression change.
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
   * @param {Number} progressCallback.totalCount - The total number of the items.
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
   * @param {Function} [completeCallback] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} completeCallback.error - If one of the asset failed, the complete callback is immediately called
   *                                         with the error. If all assets are loaded successfully, error will be null.
   * @param {Asset[]|Array} completeCallback.assets - An array of all loaded assets.
   *                                                     If nothing to load, assets will be an empty array.
   * @typescript
   * loadResArray(url: string[], type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[]) => void)|null): void
   * loadResArray(url: string[], type: typeof cc.Asset, completeCallback: (error: Error, resource: any[]) => void): void
   * loadResArray(url: string[], type: typeof cc.Asset): void
   * loadResArray(url: string[], progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[]) => void)|null): void
   * loadResArray(url: string[], completeCallback: (error: Error, resource: any[]) => void): void
   * loadResArray(url: string[]): void
   * loadResArray(url: string[], type: typeof cc.Asset[]): void
   */
  loadResArray: function loadResArray(urls, type, progressCallback, completeCallback) {
    var _this$_parseLoadResAr2 = this._parseLoadResArgs(type, progressCallback, completeCallback),
        type = _this$_parseLoadResAr2.type,
        onProgress = _this$_parseLoadResAr2.onProgress,
        onComplete = _this$_parseLoadResAr2.onComplete;

    urls.forEach(function (url, i) {
      var extname = cc.path.extname(url);

      if (extname) {
        // strip extname
        urls[i] = url.slice(0, -extname.length);
      }
    });
    cc.resources.load(urls, type, onProgress, onComplete);
  },

  /**
   * `cc.loader.loadResDir` is deprecated, please use {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.loadResDir is deprecated, please use cc.resources.loadDir instead
   * @method loadResDir
   * @param {String} url - Url of the target folder.
   *                       The url is relative to the "resources" folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [progressCallback] - Callback invoked when progression change.
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
   * @param {Number} progressCallback.totalCount - The total number of the items.
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
   * @param {Function} [completeCallback] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} completeCallback.error - If one of the asset failed, the complete callback is immediately called
   *                                         with the error. If all assets are loaded successfully, error will be null.
   * @param {Asset[]|Array} completeCallback.assets - An array of all loaded assets.
   *                                             If nothing to load, assets will be an empty array.
   * @param {String[]} completeCallback.urls - An array that lists all the URLs of loaded assets.
   *
   * @typescript
   * loadResDir(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void)|null): void
   * loadResDir(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any[], urls: string[]) => void): void
   * loadResDir(url: string, type: typeof cc.Asset): void
   * loadResDir(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void)|null): void
   * loadResDir(url: string, completeCallback: (error: Error, resource: any[], urls: string[]) => void): void
   * loadResDir(url: string): void
   */
  loadResDir: function loadResDir(url, type, progressCallback, completeCallback) {
    var _this$_parseLoadResAr3 = this._parseLoadResArgs(type, progressCallback, completeCallback),
        type = _this$_parseLoadResAr3.type,
        onProgress = _this$_parseLoadResAr3.onProgress,
        onComplete = _this$_parseLoadResAr3.onComplete;

    cc.resources.loadDir(url, type, onProgress, function (err, assets) {
      var urls = [];

      if (!err) {
        var infos = cc.resources.getDirWithPath(url, type);
        urls = infos.map(function (info) {
          return info.path;
        });
      }

      onComplete && onComplete(err, assets, urls);
    });
  },

  /**
   * `cc.loader.getRes` is deprecated, please use {{#crossLink "Bundle/get:method"}}{{/crossLink}} instead
   *
   * @method getRes
   * @param {String} url
   * @param {Function} [type] - Only asset of type will be returned if this argument is supplied.
   * @returns {*}
   * @deprecated cc.loader.getRes is deprecated, please use cc.resources.get instead
   */
  getRes: function getRes(url, type) {
    return cc.assetManager.assets.has(url) ? cc.assetManager.assets.get(url) : cc.resources.get(url, type);
  },
  getResCount: function getResCount() {
    return cc.assetManager.assets.count;
  },

  /**
   * `cc.loader.getDependsRecursively` is deprecated, please use use {{#crossLink "DependUtil/getDepsRecursively:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.getDependsRecursively is deprecated, please use use cc.assetManager.dependUtil.getDepsRecursively instead
   * @method getDependsRecursively
   * @param {Asset|String} owner - The owner asset or the resource url or the asset's uuid
   * @returns {Array}
   */
  getDependsRecursively: function getDependsRecursively(owner) {
    if (!owner) return [];
    return dependUtil.getDepsRecursively(typeof owner === 'string' ? owner : owner._uuid).concat([owner._uuid]);
  },

  /**
   * `cc.loader.assetLoader` was removed, assetLoader and md5Pipe were merged into {{#crossLink "AssetManager/transformPipeline:property"}}{{/crossLink}}
   *
   * @property assetLoader
   * @deprecated cc.loader.assetLoader was removed, assetLoader and md5Pipe were merged into cc.assetManager.transformPipeline
   * @type {Object}
   */
  get assetLoader() {
    if (CC_DEBUG) {
      cc.error('cc.loader.assetLoader was removed, assetLoader and md5Pipe were merged into cc.assetManager.transformPipeline');
    }
  },

  /**
   * `cc.loader.md5Pipe` is deprecated, assetLoader and md5Pipe were merged into {{#crossLink "AssetManager/transformPipeline:property"}}{{/crossLink}}
   *
   * @property md5Pipe
   * @deprecated cc.loader.md5Pipe is deprecated, assetLoader and md5Pipe were merged into cc.assetManager.transformPipeline
   * @type {Object}
   */
  get md5Pipe() {
    return md5Pipe;
  },

  /**
   * `cc.loader.downloader` is deprecated, please use {{#crossLink "AssetManager/downloader:property"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.downloader is deprecated, please use cc.assetManager.downloader instead
   * @property downloader
   * @type {Object}
   */
  get downloader() {
    return cc.assetManager.downloader;
  },

  /**
   * `cc.loader.loader` is deprecated, please use {{#crossLink "AssetManager/parser:property"}}{{/crossLink}} instead
   *
   * @property loader
   * @type {Object}
   * @deprecated cc.loader.loader is deprecated, please use cc.assetManager.parser instead
   */
  get loader() {
    return cc.assetManager.parser;
  },

  /**
   * `cc.loader.addDownloadHandlers` is deprecated, please use `cc.assetManager.downloader.register` instead
   *
   * @method addDownloadHandlers
   * @param {Object} extMap Custom supported types with corresponded handler
   * @deprecated cc.loader.addDownloadHandlers is deprecated, please use cc.assetManager.downloader.register instead
  */
  addDownloadHandlers: function addDownloadHandlers(extMap) {
    if (CC_DEBUG) {
      cc.warn('`cc.loader.addDownloadHandlers` is deprecated, please use `cc.assetManager.downloader.register` instead');
    }

    var handler = Object.create(null);

    for (var type in extMap) {
      var func = extMap[type];

      handler['.' + type] = function (url, options, onComplete) {
        func({
          url: url
        }, onComplete);
      };
    }

    cc.assetManager.downloader.register(handler);
  },

  /**
   * `cc.loader.addLoadHandlers` is deprecated, please use `cc.assetManager.parser.register` instead
   *
   * @method addLoadHandlers
   * @param {Object} extMap Custom supported types with corresponded handler
   * @deprecated cc.loader.addLoadHandlers is deprecated, please use cc.assetManager.parser.register instead
   */
  addLoadHandlers: function addLoadHandlers(extMap) {
    if (CC_DEBUG) {
      cc.warn('`cc.loader.addLoadHandlers` is deprecated, please use `cc.assetManager.parser.register` instead');
    }

    var handler = Object.create(null);

    for (var type in extMap) {
      var func = extMap[type];

      handler['.' + type] = function (file, options, onComplete) {
        func({
          content: file
        }, onComplete);
      };
    }

    cc.assetManager.parser.register(handler);
  },
  flowInDeps: function flowInDeps() {
    if (CC_DEBUG) {
      cc.error('cc.loader.flowInDeps was removed');
    }
  },

  /**
   * `cc.loader.release` is deprecated, please use {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} instead
   *
   * @method release
   * @param {Asset|String|Array} asset
   * @deprecated cc.loader.release is deprecated, please use cc.assetManager.releaseAsset instead
   */
  release: function release(asset) {
    if (Array.isArray(asset)) {
      for (var i = 0; i < asset.length; i++) {
        var key = asset[i];
        if (typeof key === 'string') key = cc.assetManager.assets.get(key);

        var isBuiltin = cc.assetManager.builtins._assets.find(function (assets) {
          return assets.find(function (builtinAsset) {
            return builtinAsset === key;
          });
        });

        if (isBuiltin) continue;
        cc.assetManager.releaseAsset(key);
      }
    } else if (asset) {
      if (typeof asset === 'string') asset = cc.assetManager.assets.get(asset);

      var _isBuiltin = cc.assetManager.builtins._assets.find(function (assets) {
        return assets.find(function (builtinAsset) {
          return builtinAsset === asset;
        });
      });

      if (_isBuiltin) return;
      cc.assetManager.releaseAsset(asset);
    }
  },

  /**
   * `cc.loader.releaseAsset` is deprecated, please use {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseAsset is deprecated, please use cc.assetManager.releaseAsset instead
   * @method releaseAsset
   * @param {Asset} asset
   */
  releaseAsset: function releaseAsset(asset) {
    cc.assetManager.releaseAsset(asset);
  },

  /**
   * `cc.loader.releaseRes` is deprecated, please use {{#crossLink "AssetManager/releaseRes:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseRes is deprecated, please use cc.assetManager.releaseRes instead
   * @method releaseRes
   * @param {String} url
   * @param {Function} [type] - Only asset of type will be released if this argument is supplied.
   */
  releaseRes: function releaseRes(url, type) {
    cc.resources.release(url, type);
  },

  /**
   * `cc.loader.releaseResDir` was removed, please use {{#crossLink "AssetManager/releaseRes:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseResDir was removed, please use cc.assetManager.releaseRes instead
   * @method releaseResDir
   */
  releaseResDir: function releaseResDir() {
    if (CC_DEBUG) {
      cc.error('cc.loader.releaseResDir was removed, please use cc.assetManager.releaseAsset instead');
    }
  },

  /**
   * `cc.loader.releaseAll` is deprecated, please use {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseAll is deprecated, please use cc.assetManager.releaseAll instead
   * @method releaseAll
   */
  releaseAll: function releaseAll() {
    cc.assetManager.releaseAll();
    cc.assetManager.assets.clear();
  },

  /**
   * `cc.loader.removeItem` is deprecated, please use `cc.assetManager.assets.remove` instead
   *
   * @deprecated cc.loader.removeItem is deprecated, please use cc.assetManager.assets.remove instead
   * @method removeItem
   * @param {Object} id The id of the item
   * @return {Boolean} succeed or not
   */
  removeItem: function removeItem(key) {
    cc.assetManager.assets.remove(key);
  },

  /**
   * `cc.loader.setAutoRelease` is deprecated, if you want to prevent some asset from auto releasing, please use {{#crossLink "Asset/addRef:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.setAutoRelease is deprecated, if you want to prevent some asset from auto releasing, please use cc.Asset.addRef instead
   * @method setAutoRelease
   * @param {Asset|String} assetOrUrlOrUuid - asset object or the raw asset's url or uuid
   * @param {Boolean} autoRelease - indicates whether should release automatically
   */
  setAutoRelease: function setAutoRelease(asset, autoRelease) {
    if (typeof asset === 'object') asset = asset._uuid;
    this._autoReleaseSetting[asset] = !!autoRelease;
  },

  /**
   * `cc.loader.setAutoReleaseRecursively` is deprecated, if you want to prevent some asset from auto releasing, please use {{#crossLink "Asset/addRef:method"}}{{/crossLink}} instead
   *
   * @method setAutoReleaseRecursively
   * @param {Asset|String} assetOrUrlOrUuid - asset object or the raw asset's url or uuid
   * @param {Boolean} autoRelease - indicates whether should release automatically
   * @deprecated cc.loader.setAutoReleaseRecursively is deprecated, if you want to prevent some asset from auto releasing, please use cc.Asset.addRef instead
   */
  setAutoReleaseRecursively: function setAutoReleaseRecursively(asset, autoRelease) {
    if (typeof asset === 'object') asset = asset._uuid;
    autoRelease = !!autoRelease;
    this._autoReleaseSetting[asset] = autoRelease;
    var depends = dependUtil.getDepsRecursively(asset);

    for (var i = 0; i < depends.length; i++) {
      var depend = depends[i];
      this._autoReleaseSetting[depend] = autoRelease;
    }
  },

  /**
   * `cc.loader.isAutoRelease` is deprecated
   *
   * @method isAutoRelease
   * @param {Asset|String} assetOrUrl - asset object or the raw asset's url
   * @returns {Boolean}
   * @deprecated cc.loader.isAutoRelease is deprecated
   */
  isAutoRelease: function isAutoRelease(asset) {
    if (typeof asset === 'object') asset = asset._uuid;
    return !!this._autoReleaseSetting[asset];
  }
};
/**
 * @class Downloader
 */

/**
 * `cc.loader.downloader.loadSubpackage` is deprecated, please use {{#crossLink "AssetManager/loadBundle:method"}}{{/crossLink}} instead
 *
 * @deprecated cc.loader.downloader.loadSubpackage is deprecated, please use AssetManager.loadBundle instead
 * @method loadSubpackage
 * @param {String} name - Subpackage name
 * @param {Function} [completeCallback] -  Callback invoked when subpackage loaded
 * @param {Error} completeCallback.error - error information
 */

downloader.loadSubpackage = function (name, completeCallback) {
  cc.assetManager.loadBundle(name, null, completeCallback);
};
/**
 * @deprecated cc.AssetLibrary is deprecated, please backup your project and upgrade to cc.assetManager
 */


var AssetLibrary = {
  /**
   * @deprecated cc.AssetLibrary.init is deprecated, please use cc.assetManager.init instead
   */
  init: function init(options) {
    options.importBase = options.libraryPath;
    options.nativeBase = CC_BUILD ? options.rawAssetsBase : options.libraryPath;
    cc.assetManager.init(options);

    if (options.rawAssets) {
      var resources = new cc.AssetManager.Bundle();
      resources.init({
        name: cc.AssetManager.BuiltinBundleName.RESOURCES,
        importBase: options.importBase,
        nativeBase: options.nativeBase,
        paths: options.rawAssets.assets,
        uuids: Object.keys(options.rawAssets.assets)
      });
    }
  },

  /**
   * @deprecated cc.AssetLibrary is deprecated, please use cc.assetManager.loadAny instead
   */
  loadAsset: function loadAsset(uuid, onComplete) {
    cc.assetManager.loadAny(uuid, onComplete);
  },
  getLibUrlNoExt: function getLibUrlNoExt() {
    if (CC_DEBUG) {
      cc.error('cc.AssetLibrary.getLibUrlNoExt was removed, if you want to transform url, please use cc.assetManager.helper.getUrlWithUuid instead');
    }
  },
  queryAssetInfo: function queryAssetInfo() {
    if (CC_DEBUG) {
      cc.error('cc.AssetLibrary.queryAssetInfo was removed, only available in the editor by using cc.assetManager.editorExtend.queryAssetInfo');
    }
  }
};
/**
 * `cc.url` is deprecated
 *
 * @deprecated cc.url is deprecated
 * @class url
 * @static
 */

cc.url = {
  normalize: function normalize(url) {
    cc.warnID(1400, 'cc.url.normalize', 'cc.assetManager.utils.normalize');
    return cc.assetManager.utils.normalize(url);
  },

  /**
   * `cc.url.raw` is deprecated, please use `cc.resources.load` directly, or use `Asset.nativeUrl` instead.
   *
   * @deprecated cc.url.raw is deprecated, please use cc.resources.load directly, or use Asset.nativeUrl instead.
   * @method raw
   * @param {String} url
   * @return {String}
   */
  raw: function raw(url) {
    cc.warnID(1400, 'cc.url.raw', 'cc.resources.load');

    if (url.startsWith('resources/')) {
      return cc.assetManager._transform({
        'path': cc.path.changeExtname(url.substr(10)),
        bundle: cc.AssetManager.BuiltinBundleName.RESOURCES,
        __isNative__: true,
        ext: cc.path.extname(url)
      });
    }

    return '';
  }
};
var onceWarns = {
  loader: true,
  assetLibrary: true
};
Object.defineProperties(cc, {
  loader: {
    get: function get() {
      if (CC_DEBUG) {
        if (onceWarns.loader) {
          onceWarns.loader = false;
          cc.log('cc.loader is deprecated, use cc.assetManager instead please. See https://docs.cocos.com/creator/manual/zh/release-notes/asset-manager-upgrade-guide.html');
        }
      }

      return loader;
    }
  },
  AssetLibrary: {
    get: function get() {
      if (CC_DEBUG) {
        if (onceWarns.assetLibrary) {
          onceWarns.assetLibrary = false;
          cc.log('cc.AssetLibrary is deprecated, use cc.assetManager instead please. See https://docs.cocos.com/creator/manual/zh/release-notes/asset-manager-upgrade-guide.html');
        }
      }

      return AssetLibrary;
    }
  },

  /**
   * `cc.LoadingItems` was removed, please use {{#crossLink "Task"}}{{/crossLink}} instead
   *
   * @deprecated cc.LoadingItems was removed, please use cc.AssetManager.Task instead
   * @class LoadingItems
   */
  LoadingItems: {
    get: function get() {
      cc.warnID(1400, 'cc.LoadingItems', 'cc.AssetManager.Task');
      return cc.AssetManager.Task;
    }
  },
  Pipeline: {
    get: function get() {
      cc.warnID(1400, 'cc.Pipeline', 'cc.AssetManager.Pipeline');
      return cc.AssetManager.Pipeline;
    }
  }
});
js.obsolete(cc, 'cc.RawAsset', 'cc.Asset');
/**
 * @class Asset
 */

/**
 * `cc.Asset.url` is deprecated, please use {{#crossLink "Asset/nativeUrl:property"}}{{/crossLink}} instead
 * @property url
 * @type {String}
 * @deprecated cc.Asset.url is deprecated, please use cc.Asset.nativeUrl instead
 */

js.obsolete(cc.Asset.prototype, 'cc.Asset.url', 'nativeUrl');
/**
 * @class macro
 * @static
 */

Object.defineProperties(cc.macro, {
  /**
   * `cc.macro.DOWNLOAD_MAX_CONCURRENT` is deprecated now, please use {{#crossLink "Downloader/maxConcurrency:property"}}{{/crossLink}} instead
   * 
   * @property DOWNLOAD_MAX_CONCURRENT
   * @type {Number}
   * @deprecated cc.macro.DOWNLOAD_MAX_CONCURRENT is deprecated now, please use cc.assetManager.downloader.maxConcurrency instead
   */
  DOWNLOAD_MAX_CONCURRENT: {
    get: function get() {
      return cc.assetManager.downloader.maxConcurrency;
    },
    set: function set(val) {
      cc.assetManager.downloader.maxConcurrency = val;
    }
  }
});
Object.assign(cc.director, {
  _getSceneUuid: function _getSceneUuid(sceneName) {
    cc.assetManager.main.getSceneInfo(sceneName);
  }
});
Object.defineProperties(cc.game, {
  _sceneInfos: {
    get: function get() {
      var scenes = [];

      cc.assetManager.main._config.scenes.forEach(function (val) {
        scenes.push(val);
      });

      return scenes;
    }
  }
});
var parseParameters = utilities.parseParameters;

utilities.parseParameters = function (options, onProgress, onComplete) {
  var result = parseParameters(options, onProgress, onComplete);
  result.onProgress = result.onProgress || loader.onProgress;
  return result;
};

var autoRelease = releaseManager._autoRelease;

releaseManager._autoRelease = function () {
  autoRelease.apply(this, arguments);
  var releaseSettings = loader._autoReleaseSetting;
  var keys = Object.keys(releaseSettings);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (releaseSettings[key] === true) {
      var asset = cc.assetManager.assets.get(key);
      asset && releaseManager.tryRelease(asset);
    }
  }
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZGVwcmVjYXRlZC5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJ1dGlsaXRpZXMiLCJkZXBlbmRVdGlsIiwicmVsZWFzZU1hbmFnZXIiLCJkb3dubG9hZGVyIiwiSW1hZ2VGbXRzIiwiQXVkaW9GbXRzIiwiR2V0VHJ1ZSIsIm1kNVBpcGUiLCJ0cmFuc2Zvcm1VUkwiLCJ1cmwiLCJyZXBsYWNlIiwibWF0Y2giLCJ1dWlkIiwiYnVuZGxlIiwiY2MiLCJhc3NldE1hbmFnZXIiLCJidW5kbGVzIiwiZmluZCIsImdldEFzc2V0SW5mbyIsImhhc2hWYWx1ZSIsImluZm8iLCJzdGFydHNXaXRoIiwiYmFzZSIsIl9jb25maWciLCJuYXRpdmVCYXNlIiwibmF0aXZlVmVyIiwidmVyIiwibG9hZGVyIiwib25Qcm9ncmVzcyIsIl9hdXRvUmVsZWFzZVNldHRpbmciLCJPYmplY3QiLCJjcmVhdGUiLCJfY2FjaGUiLCJhc3NldHMiLCJfbWFwIiwibG9hZCIsInJlc291cmNlcyIsInByb2dyZXNzQ2FsbGJhY2siLCJjb21wbGV0ZUNhbGxiYWNrIiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImxlbmd0aCIsIml0ZW0iLCJfX2lzTmF0aXZlX18iLCJ0eXBlIiwiZXh0IiwiaW1hZ2VzIiwiYXVkaW9zIiwibG9hZEFueSIsImZpbmlzaCIsInRvdGFsIiwiY29udGVudCIsImluY2x1ZGVzIiwicHVzaCIsImVyciIsIm5hdGl2ZSIsInJlcyIsIkFzc2V0IiwiYXNzZXQiLCJUZXh0dXJlMkQiLCJfbmF0aXZlVXJsIiwiX25hdGl2ZUFzc2V0IiwiX3V1aWQiLCJBdWRpb0NsaXAiLCJhZGQiLCJtYXAiLCJmb3JFYWNoIiwiaXNDb21wbGV0ZWQiLCJnZXRYTUxIdHRwUmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0IiwiX3BhcnNlTG9hZFJlc0FyZ3MiLCJwYXJzZUxvYWRSZXNBcmdzIiwiZ2V0SXRlbSIsImtleSIsImhhcyIsImdldCIsImxvYWRSZXMiLCJvbkNvbXBsZXRlIiwiZXh0bmFtZSIsInBhdGgiLCJzbGljZSIsImxvYWRSZXNBcnJheSIsInVybHMiLCJsb2FkUmVzRGlyIiwibG9hZERpciIsImluZm9zIiwiZ2V0RGlyV2l0aFBhdGgiLCJnZXRSZXMiLCJnZXRSZXNDb3VudCIsImNvdW50IiwiZ2V0RGVwZW5kc1JlY3Vyc2l2ZWx5Iiwib3duZXIiLCJnZXREZXBzUmVjdXJzaXZlbHkiLCJjb25jYXQiLCJhc3NldExvYWRlciIsIkNDX0RFQlVHIiwiZXJyb3IiLCJwYXJzZXIiLCJhZGREb3dubG9hZEhhbmRsZXJzIiwiZXh0TWFwIiwid2FybiIsImhhbmRsZXIiLCJmdW5jIiwib3B0aW9ucyIsInJlZ2lzdGVyIiwiYWRkTG9hZEhhbmRsZXJzIiwiZmlsZSIsImZsb3dJbkRlcHMiLCJyZWxlYXNlIiwiaXNCdWlsdGluIiwiYnVpbHRpbnMiLCJfYXNzZXRzIiwiYnVpbHRpbkFzc2V0IiwicmVsZWFzZUFzc2V0IiwicmVsZWFzZVJlcyIsInJlbGVhc2VSZXNEaXIiLCJyZWxlYXNlQWxsIiwiY2xlYXIiLCJyZW1vdmVJdGVtIiwicmVtb3ZlIiwic2V0QXV0b1JlbGVhc2UiLCJhdXRvUmVsZWFzZSIsInNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHkiLCJkZXBlbmRzIiwiZGVwZW5kIiwiaXNBdXRvUmVsZWFzZSIsImxvYWRTdWJwYWNrYWdlIiwibmFtZSIsImxvYWRCdW5kbGUiLCJBc3NldExpYnJhcnkiLCJpbml0IiwiaW1wb3J0QmFzZSIsImxpYnJhcnlQYXRoIiwiQ0NfQlVJTEQiLCJyYXdBc3NldHNCYXNlIiwicmF3QXNzZXRzIiwiQXNzZXRNYW5hZ2VyIiwiQnVuZGxlIiwiQnVpbHRpbkJ1bmRsZU5hbWUiLCJSRVNPVVJDRVMiLCJwYXRocyIsInV1aWRzIiwia2V5cyIsImxvYWRBc3NldCIsImdldExpYlVybE5vRXh0IiwicXVlcnlBc3NldEluZm8iLCJub3JtYWxpemUiLCJ3YXJuSUQiLCJ1dGlscyIsInJhdyIsIl90cmFuc2Zvcm0iLCJjaGFuZ2VFeHRuYW1lIiwic3Vic3RyIiwib25jZVdhcm5zIiwiYXNzZXRMaWJyYXJ5IiwiZGVmaW5lUHJvcGVydGllcyIsImxvZyIsIkxvYWRpbmdJdGVtcyIsIlRhc2siLCJQaXBlbGluZSIsIm9ic29sZXRlIiwicHJvdG90eXBlIiwibWFjcm8iLCJET1dOTE9BRF9NQVhfQ09OQ1VSUkVOVCIsIm1heENvbmN1cnJlbmN5Iiwic2V0IiwidmFsIiwiYXNzaWduIiwiZGlyZWN0b3IiLCJfZ2V0U2NlbmVVdWlkIiwic2NlbmVOYW1lIiwibWFpbiIsImdldFNjZW5lSW5mbyIsImdhbWUiLCJfc2NlbmVJbmZvcyIsInNjZW5lcyIsInBhcnNlUGFyYW1ldGVycyIsInJlc3VsdCIsIl9hdXRvUmVsZWFzZSIsImFwcGx5IiwiYXJndW1lbnRzIiwicmVsZWFzZVNldHRpbmdzIiwidHJ5UmVsZWFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsZ0JBQUQsQ0FBbEI7O0FBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQSxJQUFNRSxVQUFVLEdBQUdGLE9BQU8sQ0FBQyxlQUFELENBQTFCOztBQUNBLElBQU1HLGNBQWMsR0FBR0gsT0FBTyxDQUFDLGtCQUFELENBQTlCOztBQUNBLElBQU1JLFVBQVUsR0FBR0osT0FBTyxDQUFDLGNBQUQsQ0FBMUI7O0FBRUEsSUFBTUssU0FBUyxHQUFHLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsTUFBakIsRUFBeUIsT0FBekIsRUFBa0MsTUFBbEMsRUFBMEMsTUFBMUMsRUFBa0QsT0FBbEQsRUFBMkQsT0FBM0QsRUFBb0UsUUFBcEUsRUFBOEUsTUFBOUUsRUFBc0YsTUFBdEYsQ0FBbEI7QUFDQSxJQUFNQyxTQUFTLEdBQUcsQ0FBQyxN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QUFVN0UsVUFBVixFQUFzQm1ELFVBQXRCLENBQTVCO0FBQ0FvRyxFQUFBQSxNQUFNLENBQUN2SixVQUFQLEdBQW9CdUosTUFBTSxDQUFDdkosVUFBUCxJQUFxQkQsTUFBTSxDQUFDQyxVQUFoRDtBQUNBLFNBQU91SixNQUFQO0FBQ0gsQ0FKRDs7QUFNQSxJQUFJeEQsV0FBVyxHQUFHekgsY0FBYyxDQUFDa0wsWUFBakM7O0FBQ0FsTCxjQUFjLENBQUNrTCxZQUFmLEdBQThCLFlBQVk7QUFDdEN6RCxFQUFBQSxXQUFXLENBQUMwRCxLQUFaLENBQWtCLElBQWxCLEVBQXdCQyxTQUF4QjtBQUNBLE1BQUlDLGVBQWUsR0FBRzVKLE1BQU0sQ0FBQ0UsbUJBQTdCO0FBQ0EsTUFBSW1ILElBQUksR0FBR2xILE1BQU0sQ0FBQ2tILElBQVAsQ0FBWXVDLGVBQVosQ0FBWDs7QUFDQSxPQUFLLElBQUk3SSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHc0csSUFBSSxDQUFDckcsTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsUUFBSWlDLEdBQUcsR0FBR3FFLElBQUksQ0FBQ3RHLENBQUQsQ0FBZDs7QUFDQSxRQUFJNkksZUFBZSxDQUFDNUcsR0FBRCxDQUFmLEtBQXlCLElBQTdCLEVBQW1DO0FBQy9CLFVBQUlmLEtBQUssR0FBRzlDLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQmtCLE1BQWhCLENBQXVCNEMsR0FBdkIsQ0FBMkJGLEdBQTNCLENBQVo7QUFDQWYsTUFBQUEsS0FBSyxJQUFJMUQsY0FBYyxDQUFDc0wsVUFBZixDQUEwQjVILEtBQTFCLENBQVQ7QUFDSDtBQUNKO0FBQ0osQ0FYRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xucmVxdWlyZSgnLi4vQ0NEaXJlY3RvcicpO1xuY29uc3QgdXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcbmNvbnN0IGRlcGVuZFV0aWwgPSByZXF1aXJlKCcuL2RlcGVuZC11dGlsJyk7XG5jb25zdCByZWxlYXNlTWFuYWdlciA9IHJlcXVpcmUoJy4vcmVsZWFzZU1hbmFnZXInKTtcbmNvbnN0IGRvd25sb2FkZXIgPSByZXF1aXJlKCcuL2Rvd25sb2FkZXInKTtcblxuY29uc3QgSW1hZ2VGbXRzID0gWycucG5nJywgJy5qcGcnLCAnLmJtcCcsICcuanBlZycsICcuZ2lmJywgJy5pY28nLCAnLnRpZmYnLCAnLndlYnAnLCAnLmltYWdlJywgJy5wdnInLCAnLnBrbSddO1xuY29uc3QgQXVkaW9GbXRzID0gWycubXAzJywgJy5vZ2cnLCAnLndhdicsICcubTRhJ107XG5cbmZ1bmN0aW9uIEdldFRydWUgKCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG5jb25zdCBtZDVQaXBlID0ge1xuICAgIHRyYW5zZm9ybVVSTCAodXJsKSB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC8uKlsvXFxcXF1bMC05YS1mQS1GXXsyfVsvXFxcXF0oWzAtOWEtZkEtRi1dezgsfSkvLCBmdW5jdGlvbiAobWF0Y2gsIHV1aWQpIHtcbiAgICAgICAgICAgIHZhciBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuYnVuZGxlcy5maW5kKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVuZGxlLmdldEFzc2V0SW5mbyh1dWlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGhhc2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgaWYgKGJ1bmRsZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gYnVuZGxlLmdldEFzc2V0SW5mbyh1dWlkKTtcbiAgICAgICAgICAgICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoYnVuZGxlLmJhc2UgKyBidW5kbGUuX2NvbmZpZy5uYXRpdmVCYXNlKSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNoVmFsdWUgPSBpbmZvLm5hdGl2ZVZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc2hWYWx1ZSA9IGluZm8udmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXNoVmFsdWUgPyBtYXRjaCArICcuJyArIGhhc2hWYWx1ZSA6IG1hdGNoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH0sXG59O1xuXG4vKipcbiAqIGBjYy5sb2FkZXJgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBiYWNrdXAgeW91ciBwcm9qZWN0IGFuZCB1cGdyYWRlIHRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlclwifX17ey9jcm9zc0xpbmt9fVxuICpcbiAqIEBjbGFzcyBsb2FkZXJcbiAqIEBzdGF0aWNcbiAqIEBkZXByZWNhdGVkIGNjLmxvYWRlciBpcyBkZXByZWNhdGVkLCBwbGVhc2UgYmFja3VwIHlvdXIgcHJvamVjdCBhbmQgdXBncmFkZSB0byBjYy5hc3NldE1hbmFnZXJcbiAqL1xuY29uc3QgbG9hZGVyID0ge1xuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIub25Qcm9ncmVzc2AgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHRyYW5zZmVyIG9uUHJvZ3Jlc3MgdG8gQVBJIGFzIGEgcGFyYW1ldGVyXG4gICAgICogQHByb3BlcnR5IG9uUHJvZ3Jlc3NcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIub25Qcm9ncmVzcyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdHJhbnNmZXIgb25Qcm9ncmVzcyB0byBBUEkgYXMgYSBwYXJhbWV0ZXJcbiAgICAgKi9cbiAgICBvblByb2dyZXNzOiBudWxsLFxuICAgIF9hdXRvUmVsZWFzZVNldHRpbmc6IE9iamVjdC5jcmVhdGUobnVsbCksXG5cbiAgICBnZXQgX2NhY2hlICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5hc3NldHMuX21hcDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGNjLmxvYWRlci5sb2FkYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9sb2FkQW55Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIubG9hZCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55IGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFN0cmluZ1tdfE9iamVjdH0gcmVzb3VyY2VzIC0gVXJsIGxpc3QgaW4gYW4gYXJyYXlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvZ3Jlc3NDYWxsYmFja10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb2dyZXNzQ2FsbGJhY2suY29tcGxldGVkQ291bnQgLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9ncmVzc0NhbGxiYWNrLnRvdGFsQ291bnQgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9ncmVzc0NhbGxiYWNrLml0ZW0gLSBUaGUgbGF0ZXN0IGl0ZW0gd2hpY2ggZmxvdyBvdXQgdGhlIHBpcGVsaW5lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBsZXRlQ2FsbGJhY2tdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGFsbCByZXNvdXJjZXMgbG9hZGVkXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsb2FkKHJlc291cmNlczogc3RyaW5nfHN0cmluZ1tdfHt1dWlkPzogc3RyaW5nLCB1cmw/OiBzdHJpbmcsIHR5cGU/OiBzdHJpbmd9LCBjb21wbGV0ZUNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkXG4gICAgICogbG9hZChyZXNvdXJjZXM6IHN0cmluZ3xzdHJpbmdbXXx7dXVpZD86IHN0cmluZywgdXJsPzogc3RyaW5nLCB0eXBlPzogc3RyaW5nfSwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiBGdW5jdGlvbnxudWxsKTogdm9pZFxuICAgICAqL1xuICAgIGxvYWQgKHJlc291cmNlcywgcHJvZ3Jlc3NDYWxsYmFjaywgY29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3NDYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayA9IHByb2dyZXNzQ2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzb3VyY2VzID0gQXJyYXkuaXNBcnJheShyZXNvdXJjZXMpID8gcmVzb3VyY2VzIDogW3Jlc291cmNlc107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlc1tpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZXNbaV0gPSB7IHVybDogaXRlbSwgX19pc05hdGl2ZV9fOiB0cnVlfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5leHQgPSAnLicgKyBpdGVtLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5fX2lzTmF0aXZlX18gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgaW1hZ2VzID0gW107XG4gICAgICAgIHZhciBhdWRpb3MgPSBbXTtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkocmVzb3VyY2VzLCBudWxsLCAoZmluaXNoLCB0b3RhbCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uY29udGVudCkge1xuICAgICAgICAgICAgICAgIGlmIChJbWFnZUZtdHMuaW5jbHVkZXMoaXRlbS5leHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5wdXNoKGl0ZW0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEF1ZGlvRm10cy5pbmNsdWRlcyhpdGVtLmV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9zLnB1c2goaXRlbS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmVzc0NhbGxiYWNrICYmIHByb2dyZXNzQ2FsbGJhY2soZmluaXNoLCB0b3RhbCwgaXRlbSk7XG4gICAgICAgIH0sIChlcnIsIG5hdGl2ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlcyA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgIG5hdGl2ZSA9IEFycmF5LmlzQXJyYXkobmF0aXZlKSA/IG5hdGl2ZSA6IFtuYXRpdmVdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmF0aXZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbmF0aXZlW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShpdGVtIGluc3RhbmNlb2YgY2MuQXNzZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzZXQgPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHJlc291cmNlc1tpXS51cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VzLmluY2x1ZGVzKGFzc2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0Ll9uYXRpdmVVcmwgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQuX25hdGl2ZUFzc2V0ID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVbaV0gPSBhc3NldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5fdXVpZCA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF1ZGlvcy5pbmNsdWRlcyhhc3NldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldCA9IG5ldyBjYy5BdWRpb0NsaXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5fbmF0aXZlVXJsID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0Ll9uYXRpdmVBc3NldCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlW2ldID0gYXNzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQuX3V1aWQgPSB1cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmFkZCh1cmwsIGFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmF0aXZlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZS5mb3JFYWNoKGZ1bmN0aW9uIChhc3NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwW2Fzc2V0Ll91dWlkXSA9IGFzc2V0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0geyBpc0NvbXBsZXRlZDogR2V0VHJ1ZSwgX21hcDogbWFwIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBuYXRpdmVbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayAmJiBjb21wbGV0ZUNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3RgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYFhNTEh0dHBSZXF1ZXN0YCBkaXJlY3RseVxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRYTUxIdHRwUmVxdWVzdFxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIFhNTEh0dHBSZXF1ZXN0IGRpcmVjdGx5XG4gICAgICogQHJldHVybnMge1hNTEh0dHBSZXF1ZXN0fVxuICAgICAqL1xuICAgIGdldFhNTEh0dHBSZXF1ZXN0ICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIH0sXG5cbiAgICBfcGFyc2VMb2FkUmVzQXJnczogdXRpbGl0aWVzLnBhcnNlTG9hZFJlc0FyZ3MsXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLmdldEl0ZW1gIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNjLmFzc2V0TWFuYWdlci5hc3NldC5nZXRgIGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0SXRlbVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmdldEl0ZW0gaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuYXNzZXQuZ2V0IGluc3RlYWRcbiAgICAgKi9cbiAgICBnZXRJdGVtIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5hc3NldHMuaGFzKGtleSkgPyB7IGNvbnRlbnQ6IGNjLmFzc2V0TWFuYWdlci5hc3NldHMuZ2V0KGtleSkgfSA6IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIubG9hZFJlc2AgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gIGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5sb2FkUmVzIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MucmVzb3VyY2VzLmxvYWQgIGluc3RlYWRcbiAgICAgKiBAbWV0aG9kIGxvYWRSZXNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVXJsIG9mIHRoZSB0YXJnZXQgcmVzb3VyY2UuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIFRoZSB1cmwgaXMgcmVsYXRpdmUgdG8gdGhlIFwicmVzb3VyY2VzXCIgZm9sZGVyLCBleHRlbnNpb25zIG11c3QgYmUgb21pdHRlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSBsb2FkZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvZ3Jlc3NDYWxsYmFja10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9ncmVzc0NhbGxiYWNrLmNvbXBsZXRlZENvdW50IC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb2dyZXNzQ2FsbGJhY2sudG90YWxDb3VudCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9ncmVzc0NhbGxiYWNrLml0ZW0gLSBUaGUgbGF0ZXN0IGl0ZW0gd2hpY2ggZmxvdyBvdXQgdGhlIHBpcGVsaW5lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wbGV0ZUNhbGxiYWNrXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiB0aGUgcmVzb3VyY2UgbG9hZGVkLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGNvbXBsZXRlQ2FsbGJhY2suZXJyb3IgLSBUaGUgZXJyb3IgaW5mbyBvciBudWxsIGlmIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBsZXRlQ2FsbGJhY2sucmVzb3VyY2UgLSBUaGUgbG9hZGVkIHJlc291cmNlIGlmIGl0IGNhbiBiZSBmb3VuZCBvdGhlcndpc2UgcmV0dXJucyBudWxsLlxuICAgICAqXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsb2FkUmVzKHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpfG51bGwpOiB2b2lkXG4gICAgICogbG9hZFJlcyh1cmw6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBjb21wbGV0ZUNhbGxiYWNrOiAoZXJyb3I6IEVycm9yLCByZXNvdXJjZTogYW55KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRSZXModXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWRcbiAgICAgKiBsb2FkUmVzKHVybDogc3RyaW5nLCBwcm9ncmVzc0NhbGxiYWNrOiAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlQ2FsbGJhY2s6ICgoZXJyb3I6IEVycm9yLCByZXNvdXJjZTogYW55KSA9PiB2b2lkKXxudWxsKTogdm9pZFxuICAgICAqIGxvYWRSZXModXJsOiBzdHJpbmcsIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZFJlcyh1cmw6IHN0cmluZyk6IHZvaWRcbiAgICAgKi9cbiAgICBsb2FkUmVzICh1cmwsIHR5cGUsIHByb2dyZXNzQ2FsbGJhY2ssIGNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHsgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gdGhpcy5fcGFyc2VMb2FkUmVzQXJncyh0eXBlLCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcbiAgICAgICAgdmFyIGV4dG5hbWUgPSBjYy5wYXRoLmV4dG5hbWUodXJsKTtcbiAgICAgICAgaWYgKGV4dG5hbWUpIHtcbiAgICAgICAgICAgIC8vIHN0cmlwIGV4dG5hbWVcbiAgICAgICAgICAgIHVybCA9IHVybC5zbGljZSgwLCAtIGV4dG5hbWUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLmxvYWRSZXNBcnJheWAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmxvYWRSZXNBcnJheSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLnJlc291cmNlcy5sb2FkIGluc3RlYWRcbiAgICAgKiBAbWV0aG9kIGxvYWRSZXNBcnJheVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IHVybHMgLSBBcnJheSBvZiBVUkxzIG9mIHRoZSB0YXJnZXQgcmVzb3VyY2UuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSB1cmwgaXMgcmVsYXRpdmUgdG8gdGhlIFwicmVzb3VyY2VzXCIgZm9sZGVyLCBleHRlbnNpb25zIG11c3QgYmUgb21pdHRlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSBsb2FkZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvZ3Jlc3NDYWxsYmFja10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9ncmVzc0NhbGxiYWNrLmNvbXBsZXRlZENvdW50IC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb2dyZXNzQ2FsbGJhY2sudG90YWxDb3VudCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9ncmVzc0NhbGxiYWNrLml0ZW0gLSBUaGUgbGF0ZXN0IGl0ZW0gd2hpY2ggZmxvdyBvdXQgdGhlIHBpcGVsaW5lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wbGV0ZUNhbGxiYWNrXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGFzc2V0cyBoYXZlIGJlZW4gbG9hZGVkLCBvciBhbiBlcnJvciBvY2N1cnMuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gY29tcGxldGVDYWxsYmFjay5lcnJvciAtIElmIG9uZSBvZiB0aGUgYXNzZXQgZmFpbGVkLCB0aGUgY29tcGxldGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggdGhlIGVycm9yLiBJZiBhbGwgYXNzZXRzIGFyZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LCBlcnJvciB3aWxsIGJlIG51bGwuXG4gICAgICogQHBhcmFtIHtBc3NldFtdfEFycmF5fSBjb21wbGV0ZUNhbGxiYWNrLmFzc2V0cyAtIEFuIGFycmF5IG9mIGFsbCBsb2FkZWQgYXNzZXRzLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub3RoaW5nIHRvIGxvYWQsIGFzc2V0cyB3aWxsIGJlIGFuIGVtcHR5IGFycmF5LlxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZFJlc0FycmF5KHVybDogc3RyaW5nW10sIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdKSA9PiB2b2lkKXxudWxsKTogdm9pZFxuICAgICAqIGxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkUmVzQXJyYXkodXJsOiBzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZFxuICAgICAqIGxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdLCBwcm9ncmVzc0NhbGxiYWNrOiAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlQ2FsbGJhY2s6ICgoZXJyb3I6IEVycm9yLCByZXNvdXJjZTogYW55W10pID0+IHZvaWQpfG51bGwpOiB2b2lkXG4gICAgICogbG9hZFJlc0FycmF5KHVybDogc3RyaW5nW10sIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkUmVzQXJyYXkodXJsOiBzdHJpbmdbXSk6IHZvaWRcbiAgICAgKiBsb2FkUmVzQXJyYXkodXJsOiBzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0W10pOiB2b2lkXG4gICAgICovXG4gICAgbG9hZFJlc0FycmF5ICh1cmxzLCB0eXBlLCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgICAgIHZhciB7IHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHRoaXMuX3BhcnNlTG9hZFJlc0FyZ3ModHlwZSwgcHJvZ3Jlc3NDYWxsYmFjaywgY29tcGxldGVDYWxsYmFjayk7XG4gICAgICAgIHVybHMuZm9yRWFjaCgodXJsLCBpKSA9PiB7XG4gICAgICAgICAgICB2YXIgZXh0bmFtZSA9IGNjLnBhdGguZXh0bmFtZSh1cmwpO1xuICAgICAgICAgICAgaWYgKGV4dG5hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyBzdHJpcCBleHRuYW1lXG4gICAgICAgICAgICAgICAgdXJsc1tpXSA9IHVybC5zbGljZSgwLCAtIGV4dG5hbWUubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJscywgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIubG9hZFJlc0RpcmAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZERpcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmxvYWRSZXNEaXIgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5yZXNvdXJjZXMubG9hZERpciBpbnN0ZWFkXG4gICAgICogQG1ldGhvZCBsb2FkUmVzRGlyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFVybCBvZiB0aGUgdGFyZ2V0IGZvbGRlci5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIHVybCBpcyByZWxhdGl2ZSB0byB0aGUgXCJyZXNvdXJjZXNcIiBmb2xkZXIsIGV4dGVuc2lvbnMgbXVzdCBiZSBvbWl0dGVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIE9ubHkgYXNzZXQgb2YgdHlwZSB3aWxsIGJlIGxvYWRlZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9ncmVzc0NhbGxiYWNrXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb2dyZXNzQ2FsbGJhY2suY29tcGxldGVkQ291bnQgLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcHJvZ3Jlc3NDYWxsYmFjay50b3RhbENvdW50IC0gVGhlIHRvdGFsIG51bWJlciBvZiB0aGUgaXRlbXMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb2dyZXNzQ2FsbGJhY2suaXRlbSAtIFRoZSBsYXRlc3QgaXRlbSB3aGljaCBmbG93IG91dCB0aGUgcGlwZWxpbmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBsZXRlQ2FsbGJhY2tdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYXNzZXRzIGhhdmUgYmVlbiBsb2FkZWQsIG9yIGFuIGVycm9yIG9jY3Vycy5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBjb21wbGV0ZUNhbGxiYWNrLmVycm9yIC0gSWYgb25lIG9mIHRoZSBhc3NldCBmYWlsZWQsIHRoZSBjb21wbGV0ZSBjYWxsYmFjayBpcyBpbW1lZGlhdGVseSBjYWxsZWRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgZXJyb3IuIElmIGFsbCBhc3NldHMgYXJlIGxvYWRlZCBzdWNjZXNzZnVsbHksIGVycm9yIHdpbGwgYmUgbnVsbC5cbiAgICAgKiBAcGFyYW0ge0Fzc2V0W118QXJyYXl9IGNvbXBsZXRlQ2FsbGJhY2suYXNzZXRzIC0gQW4gYXJyYXkgb2YgYWxsIGxvYWRlZCBhc3NldHMuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub3RoaW5nIHRvIGxvYWQsIGFzc2V0cyB3aWxsIGJlIGFuIGVtcHR5IGFycmF5LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGNvbXBsZXRlQ2FsbGJhY2sudXJscyAtIEFuIGFycmF5IHRoYXQgbGlzdHMgYWxsIHRoZSBVUkxzIG9mIGxvYWRlZCBhc3NldHMuXG4gICAgICpcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxvYWRSZXNEaXIodXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdLCB1cmxzOiBzdHJpbmdbXSkgPT4gdm9pZCl8bnVsbCk6IHZvaWRcbiAgICAgKiBsb2FkUmVzRGlyKHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSwgdXJsczogc3RyaW5nW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZFJlc0Rpcih1cmw6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZFxuICAgICAqIGxvYWRSZXNEaXIodXJsOiBzdHJpbmcsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSwgdXJsczogc3RyaW5nW10pID0+IHZvaWQpfG51bGwpOiB2b2lkXG4gICAgICogbG9hZFJlc0Rpcih1cmw6IHN0cmluZywgY29tcGxldGVDYWxsYmFjazogKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdLCB1cmxzOiBzdHJpbmdbXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkUmVzRGlyKHVybDogc3RyaW5nKTogdm9pZFxuICAgICAqL1xuICAgIGxvYWRSZXNEaXIgKHVybCwgdHlwZSwgcHJvZ3Jlc3NDYWxsYmFjaywgY29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICB2YXIgeyB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlIH0gPSB0aGlzLl9wYXJzZUxvYWRSZXNBcmdzKHR5cGUsIHByb2dyZXNzQ2FsbGJhY2ssIGNvbXBsZXRlQ2FsbGJhY2spO1xuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZERpcih1cmwsIHR5cGUsIG9uUHJvZ3Jlc3MsIGZ1bmN0aW9uIChlcnIsIGFzc2V0cykge1xuICAgICAgICAgICAgdmFyIHVybHMgPSBbXTtcbiAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZm9zID0gY2MucmVzb3VyY2VzLmdldERpcldpdGhQYXRoKHVybCwgdHlwZSk7XG4gICAgICAgICAgICAgICAgdXJscyA9IGluZm9zLm1hcChmdW5jdGlvbiAoaW5mbykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5mby5wYXRoO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVyciwgYXNzZXRzLCB1cmxzKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIuZ2V0UmVzYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9nZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0UmVzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIE9ubHkgYXNzZXQgb2YgdHlwZSB3aWxsIGJlIHJldHVybmVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmdldFJlcyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLnJlc291cmNlcy5nZXQgaW5zdGVhZFxuICAgICAqL1xuICAgIGdldFJlcyAodXJsLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmhhcyh1cmwpID8gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5nZXQodXJsKSA6IGNjLnJlc291cmNlcy5nZXQodXJsLCB0eXBlKTtcbiAgICB9LFxuXG4gICAgZ2V0UmVzQ291bnQgKCkge1xuICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGNjLmxvYWRlci5nZXREZXBlbmRzUmVjdXJzaXZlbHlgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdXNlIHt7I2Nyb3NzTGluayBcIkRlcGVuZFV0aWwvZ2V0RGVwc1JlY3Vyc2l2ZWx5Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIuZ2V0RGVwZW5kc1JlY3Vyc2l2ZWx5IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdXNlIGNjLmFzc2V0TWFuYWdlci5kZXBlbmRVdGlsLmdldERlcHNSZWN1cnNpdmVseSBpbnN0ZWFkXG4gICAgICogQG1ldGhvZCBnZXREZXBlbmRzUmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fFN0cmluZ30gb3duZXIgLSBUaGUgb3duZXIgYXNzZXQgb3IgdGhlIHJlc291cmNlIHVybCBvciB0aGUgYXNzZXQncyB1dWlkXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldERlcGVuZHNSZWN1cnNpdmVseSAob3duZXIpIHtcbiAgICAgICAgaWYgKCFvd25lcikgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gZGVwZW5kVXRpbC5nZXREZXBzUmVjdXJzaXZlbHkodHlwZW9mIG93bmVyID09PSAnc3RyaW5nJyA/IG93bmVyIDogb3duZXIuX3V1aWQpLmNvbmNhdChbIG93bmVyLl91dWlkIF0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLmFzc2V0TG9hZGVyYCB3YXMgcmVtb3ZlZCwgYXNzZXRMb2FkZXIgYW5kIG1kNVBpcGUgd2VyZSBtZXJnZWQgaW50byB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvdHJhbnNmb3JtUGlwZWxpbmU6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX1cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBhc3NldExvYWRlclxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5hc3NldExvYWRlciB3YXMgcmVtb3ZlZCwgYXNzZXRMb2FkZXIgYW5kIG1kNVBpcGUgd2VyZSBtZXJnZWQgaW50byBjYy5hc3NldE1hbmFnZXIudHJhbnNmb3JtUGlwZWxpbmVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCBhc3NldExvYWRlciAoKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgY2MuZXJyb3IoJ2NjLmxvYWRlci5hc3NldExvYWRlciB3YXMgcmVtb3ZlZCwgYXNzZXRMb2FkZXIgYW5kIG1kNVBpcGUgd2VyZSBtZXJnZWQgaW50byBjYy5hc3NldE1hbmFnZXIudHJhbnNmb3JtUGlwZWxpbmUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLm1kNVBpcGVgIGlzIGRlcHJlY2F0ZWQsIGFzc2V0TG9hZGVyIGFuZCBtZDVQaXBlIHdlcmUgbWVyZ2VkIGludG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3RyYW5zZm9ybVBpcGVsaW5lOnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbWQ1UGlwZVxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5tZDVQaXBlIGlzIGRlcHJlY2F0ZWQsIGFzc2V0TG9hZGVyIGFuZCBtZDVQaXBlIHdlcmUgbWVyZ2VkIGludG8gY2MuYXNzZXRNYW5hZ2VyLnRyYW5zZm9ybVBpcGVsaW5lXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgbWQ1UGlwZSAoKSB7XG4gICAgICAgIHJldHVybiBtZDVQaXBlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLmRvd25sb2FkZXJgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL2Rvd25sb2FkZXI6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmRvd25sb2FkZXIgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlciBpbnN0ZWFkXG4gICAgICogQHByb3BlcnR5IGRvd25sb2FkZXJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCBkb3dubG9hZGVyICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLmxvYWRlcmAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcGFyc2VyOnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBsb2FkZXJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5sb2FkZXIgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIucGFyc2VyIGluc3RlYWRcbiAgICAgKi9cbiAgICBnZXQgbG9hZGVyICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5wYXJzZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIuYWRkRG93bmxvYWRIYW5kbGVyc2AgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXIucmVnaXN0ZXJgIGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgYWRkRG93bmxvYWRIYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBleHRNYXAgQ3VzdG9tIHN1cHBvcnRlZCB0eXBlcyB3aXRoIGNvcnJlc3BvbmRlZCBoYW5kbGVyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmFkZERvd25sb2FkSGFuZGxlcnMgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5yZWdpc3RlciBpbnN0ZWFkXG4gICAgKi9cbiAgICBhZGREb3dubG9hZEhhbmRsZXJzIChleHRNYXApIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdgY2MubG9hZGVyLmFkZERvd25sb2FkSGFuZGxlcnNgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyLnJlZ2lzdGVyYCBpbnN0ZWFkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhbmRsZXIgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmb3IgKHZhciB0eXBlIGluIGV4dE1hcCkge1xuICAgICAgICAgICAgdmFyIGZ1bmMgPSBleHRNYXBbdHlwZV07XG4gICAgICAgICAgICBoYW5kbGVyWycuJyArIHR5cGVdID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIGZ1bmMoe3VybH0sIG9uQ29tcGxldGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5yZWdpc3RlcihoYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGNjLmxvYWRlci5hZGRMb2FkSGFuZGxlcnNgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNjLmFzc2V0TWFuYWdlci5wYXJzZXIucmVnaXN0ZXJgIGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgYWRkTG9hZEhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV4dE1hcCBDdXN0b20gc3VwcG9ydGVkIHR5cGVzIHdpdGggY29ycmVzcG9uZGVkIGhhbmRsZXJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIuYWRkTG9hZEhhbmRsZXJzIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLnBhcnNlci5yZWdpc3RlciBpbnN0ZWFkXG4gICAgICovXG4gICAgYWRkTG9hZEhhbmRsZXJzIChleHRNYXApIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdgY2MubG9hZGVyLmFkZExvYWRIYW5kbGVyc2AgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY2MuYXNzZXRNYW5hZ2VyLnBhcnNlci5yZWdpc3RlcmAgaW5zdGVhZCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYW5kbGVyID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZm9yICh2YXIgdHlwZSBpbiBleHRNYXApIHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gZXh0TWFwW3R5cGVdO1xuICAgICAgICAgICAgaGFuZGxlclsnLicgKyB0eXBlXSA9IGZ1bmN0aW9uIChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgZnVuYyh7Y29udGVudDogZmlsZX0sIG9uQ29tcGxldGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYy5hc3NldE1hbmFnZXIucGFyc2VyLnJlZ2lzdGVyKGhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICBmbG93SW5EZXBzICgpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy5lcnJvcignY2MubG9hZGVyLmZsb3dJbkRlcHMgd2FzIHJlbW92ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLnJlbGVhc2VgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQG1ldGhvZCByZWxlYXNlXG4gICAgICogQHBhcmFtIHtBc3NldHxTdHJpbmd8QXJyYXl9IGFzc2V0XG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnJlbGVhc2UgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0IGluc3RlYWRcbiAgICAgKi9cbiAgICByZWxlYXNlIChhc3NldCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhc3NldCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXNzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gYXNzZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSBrZXkgPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGxldCBpc0J1aWx0aW4gPSBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuX2Fzc2V0cy5maW5kKGZ1bmN0aW9uIChhc3NldHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFzc2V0cy5maW5kKGJ1aWx0aW5Bc3NldCA9PiBidWlsdGluQXNzZXQgPT09IGtleSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQnVpbHRpbikgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFzc2V0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFzc2V0ID09PSAnc3RyaW5nJykgYXNzZXQgPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldChhc3NldCk7XG4gICAgICAgICAgICBsZXQgaXNCdWlsdGluID0gY2MuYXNzZXRNYW5hZ2VyLmJ1aWx0aW5zLl9hc3NldHMuZmluZChmdW5jdGlvbiAoYXNzZXRzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFzc2V0cy5maW5kKGJ1aWx0aW5Bc3NldCA9PiBidWlsdGluQXNzZXQgPT09IGFzc2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGlzQnVpbHRpbikgcmV0dXJuO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldChhc3NldCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGNjLmxvYWRlci5yZWxlYXNlQXNzZXRgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnJlbGVhc2VBc3NldCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQgaW5zdGVhZFxuICAgICAqIEBtZXRob2QgcmVsZWFzZUFzc2V0XG4gICAgICogQHBhcmFtIHtBc3NldH0gYXNzZXRcbiAgICAgKi9cbiAgICByZWxlYXNlQXNzZXQgKGFzc2V0KSB7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQoYXNzZXQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLnJlbGVhc2VSZXNgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VSZXM6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5yZWxlYXNlUmVzIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VSZXMgaW5zdGVhZFxuICAgICAqIEBtZXRob2QgcmVsZWFzZVJlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSByZWxlYXNlZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxuICAgICAqL1xuICAgIHJlbGVhc2VSZXMgKHVybCwgdHlwZSkge1xuICAgICAgICBjYy5yZXNvdXJjZXMucmVsZWFzZSh1cmwsIHR5cGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgY2MubG9hZGVyLnJlbGVhc2VSZXNEaXJgIHdhcyByZW1vdmVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlUmVzOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIucmVsZWFzZVJlc0RpciB3YXMgcmVtb3ZlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIucmVsZWFzZVJlcyBpbnN0ZWFkXG4gICAgICogQG1ldGhvZCByZWxlYXNlUmVzRGlyXG4gICAgICovXG4gICAgcmVsZWFzZVJlc0RpciAoKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgY2MuZXJyb3IoJ2NjLmxvYWRlci5yZWxlYXNlUmVzRGlyIHdhcyByZW1vdmVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQgaW5zdGVhZCcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIucmVsZWFzZUFsbGAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFsbDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnJlbGVhc2VBbGwgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFsbCBpbnN0ZWFkXG4gICAgICogQG1ldGhvZCByZWxlYXNlQWxsXG4gICAgICovXG4gICAgcmVsZWFzZUFsbCAoKSB7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQWxsKCk7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5hc3NldHMuY2xlYXIoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGNjLmxvYWRlci5yZW1vdmVJdGVtYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLnJlbW92ZWAgaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnJlbW92ZUl0ZW0gaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLnJlbW92ZSBpbnN0ZWFkXG4gICAgICogQG1ldGhvZCByZW1vdmVJdGVtXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBpZCBvZiB0aGUgaXRlbVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHN1Y2NlZWQgb3Igbm90XG4gICAgICovXG4gICAgcmVtb3ZlSXRlbSAoa2V5KSB7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5hc3NldHMucmVtb3ZlKGtleSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2VgIGlzIGRlcHJlY2F0ZWQsIGlmIHlvdSB3YW50IHRvIHByZXZlbnQgc29tZSBhc3NldCBmcm9tIGF1dG8gcmVsZWFzaW5nLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkFzc2V0L2FkZFJlZjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnNldEF1dG9SZWxlYXNlIGlzIGRlcHJlY2F0ZWQsIGlmIHlvdSB3YW50IHRvIHByZXZlbnQgc29tZSBhc3NldCBmcm9tIGF1dG8gcmVsZWFzaW5nLCBwbGVhc2UgdXNlIGNjLkFzc2V0LmFkZFJlZiBpbnN0ZWFkXG4gICAgICogQG1ldGhvZCBzZXRBdXRvUmVsZWFzZVxuICAgICAqIEBwYXJhbSB7QXNzZXR8U3RyaW5nfSBhc3NldE9yVXJsT3JVdWlkIC0gYXNzZXQgb2JqZWN0IG9yIHRoZSByYXcgYXNzZXQncyB1cmwgb3IgdXVpZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXV0b1JlbGVhc2UgLSBpbmRpY2F0ZXMgd2hldGhlciBzaG91bGQgcmVsZWFzZSBhdXRvbWF0aWNhbGx5XG4gICAgICovXG4gICAgc2V0QXV0b1JlbGVhc2UgKGFzc2V0LCBhdXRvUmVsZWFzZSkge1xuICAgICAgICBpZiAodHlwZW9mIGFzc2V0ID09PSAnb2JqZWN0JykgYXNzZXQgPSBhc3NldC5fdXVpZDtcbiAgICAgICAgdGhpcy5fYXV0b1JlbGVhc2VTZXR0aW5nW2Fzc2V0XSA9ICEhYXV0b1JlbGVhc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseWAgaXMgZGVwcmVjYXRlZCwgaWYgeW91IHdhbnQgdG8gcHJldmVudCBzb21lIGFzc2V0IGZyb20gYXV0byByZWxlYXNpbmcsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXQvYWRkUmVmOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fFN0cmluZ30gYXNzZXRPclVybE9yVXVpZCAtIGFzc2V0IG9iamVjdCBvciB0aGUgcmF3IGFzc2V0J3MgdXJsIG9yIHV1aWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGF1dG9SZWxlYXNlIC0gaW5kaWNhdGVzIHdoZXRoZXIgc2hvdWxkIHJlbGVhc2UgYXV0b21hdGljYWxseVxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5IGlzIGRlcHJlY2F0ZWQsIGlmIHlvdSB3YW50IHRvIHByZXZlbnQgc29tZSBhc3NldCBmcm9tIGF1dG8gcmVsZWFzaW5nLCBwbGVhc2UgdXNlIGNjLkFzc2V0LmFkZFJlZiBpbnN0ZWFkXG4gICAgICovXG4gICAgc2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseSAoYXNzZXQsIGF1dG9SZWxlYXNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXNzZXQgPT09ICdvYmplY3QnKSBhc3NldCA9IGFzc2V0Ll91dWlkO1xuICAgICAgICBhdXRvUmVsZWFzZSA9ICEhYXV0b1JlbGVhc2U7XG4gICAgICAgIHRoaXMuX2F1dG9SZWxlYXNlU2V0dGluZ1thc3NldF0gPSBhdXRvUmVsZWFzZTtcbiAgICAgICAgdmFyIGRlcGVuZHMgPSBkZXBlbmRVdGlsLmdldERlcHNSZWN1cnNpdmVseShhc3NldCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwZW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGRlcGVuZCA9IGRlcGVuZHNbaV07XG4gICAgICAgICAgICB0aGlzLl9hdXRvUmVsZWFzZVNldHRpbmdbZGVwZW5kXSA9IGF1dG9SZWxlYXNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5sb2FkZXIuaXNBdXRvUmVsZWFzZWAgaXMgZGVwcmVjYXRlZFxuICAgICAqXG4gICAgICogQG1ldGhvZCBpc0F1dG9SZWxlYXNlXG4gICAgICogQHBhcmFtIHtBc3NldHxTdHJpbmd9IGFzc2V0T3JVcmwgLSBhc3NldCBvYmplY3Qgb3IgdGhlIHJhdyBhc3NldCdzIHVybFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5pc0F1dG9SZWxlYXNlIGlzIGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBpc0F1dG9SZWxlYXNlIChhc3NldCkge1xuICAgICAgICBpZiAodHlwZW9mIGFzc2V0ID09PSAnb2JqZWN0JykgYXNzZXQgPSBhc3NldC5fdXVpZDtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fYXV0b1JlbGVhc2VTZXR0aW5nW2Fzc2V0XTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEBjbGFzcyBEb3dubG9hZGVyXG4gKi9cbi8qKlxuICogYGNjLmxvYWRlci5kb3dubG9hZGVyLmxvYWRTdWJwYWNrYWdlYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9sb2FkQnVuZGxlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXG4gKlxuICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmRvd25sb2FkZXIubG9hZFN1YnBhY2thZ2UgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBBc3NldE1hbmFnZXIubG9hZEJ1bmRsZSBpbnN0ZWFkXG4gKiBAbWV0aG9kIGxvYWRTdWJwYWNrYWdlXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIFN1YnBhY2thZ2UgbmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBsZXRlQ2FsbGJhY2tdIC0gIENhbGxiYWNrIGludm9rZWQgd2hlbiBzdWJwYWNrYWdlIGxvYWRlZFxuICogQHBhcmFtIHtFcnJvcn0gY29tcGxldGVDYWxsYmFjay5lcnJvciAtIGVycm9yIGluZm9ybWF0aW9uXG4gKi9cbmRvd25sb2FkZXIubG9hZFN1YnBhY2thZ2UgPSBmdW5jdGlvbiAobmFtZSwgY29tcGxldGVDYWxsYmFjaykge1xuICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQnVuZGxlKG5hbWUsIG51bGwsIGNvbXBsZXRlQ2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBjYy5Bc3NldExpYnJhcnkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIGJhY2t1cCB5b3VyIHByb2plY3QgYW5kIHVwZ3JhZGUgdG8gY2MuYXNzZXRNYW5hZ2VyXG4gKi9cbnZhciBBc3NldExpYnJhcnkgPSB7XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5Bc3NldExpYnJhcnkuaW5pdCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5pbml0IGluc3RlYWRcbiAgICAgKi9cbiAgICBpbml0IChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMuaW1wb3J0QmFzZSA9IG9wdGlvbnMubGlicmFyeVBhdGg7XG4gICAgICAgIG9wdGlvbnMubmF0aXZlQmFzZSA9IENDX0JVSUxEID8gb3B0aW9ucy5yYXdBc3NldHNCYXNlIDogb3B0aW9ucy5saWJyYXJ5UGF0aDtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmluaXQob3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zLnJhd0Fzc2V0cykge1xuICAgICAgICAgICAgdmFyIHJlc291cmNlcyA9IG5ldyBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKCk7XG4gICAgICAgICAgICByZXNvdXJjZXMuaW5pdCh7XG4gICAgICAgICAgICAgICAgbmFtZTogY2MuQXNzZXRNYW5hZ2VyLkJ1aWx0aW5CdW5kbGVOYW1lLlJFU09VUkNFUyxcbiAgICAgICAgICAgICAgICBpbXBvcnRCYXNlOiBvcHRpb25zLmltcG9ydEJhc2UsXG4gICAgICAgICAgICAgICAgbmF0aXZlQmFzZTogb3B0aW9ucy5uYXRpdmVCYXNlLFxuICAgICAgICAgICAgICAgIHBhdGhzOiBvcHRpb25zLnJhd0Fzc2V0cy5hc3NldHMsXG4gICAgICAgICAgICAgICAgdXVpZHM6IE9iamVjdC5rZXlzKG9wdGlvbnMucmF3QXNzZXRzLmFzc2V0cyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5Bc3NldExpYnJhcnkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIubG9hZEFueSBpbnN0ZWFkXG4gICAgICovXG4gICAgbG9hZEFzc2V0ICh1dWlkLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHV1aWQsIG9uQ29tcGxldGUpO1xuICAgIH0sXG5cbiAgICBnZXRMaWJVcmxOb0V4dCAoKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgY2MuZXJyb3IoJ2NjLkFzc2V0TGlicmFyeS5nZXRMaWJVcmxOb0V4dCB3YXMgcmVtb3ZlZCwgaWYgeW91IHdhbnQgdG8gdHJhbnNmb3JtIHVybCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuaGVscGVyLmdldFVybFdpdGhVdWlkIGluc3RlYWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBxdWVyeUFzc2V0SW5mbyAoKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgY2MuZXJyb3IoJ2NjLkFzc2V0TGlicmFyeS5xdWVyeUFzc2V0SW5mbyB3YXMgcmVtb3ZlZCwgb25seSBhdmFpbGFibGUgaW4gdGhlIGVkaXRvciBieSB1c2luZyBjYy5hc3NldE1hbmFnZXIuZWRpdG9yRXh0ZW5kLnF1ZXJ5QXNzZXRJbmZvJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGBjYy51cmxgIGlzIGRlcHJlY2F0ZWRcbiAqXG4gKiBAZGVwcmVjYXRlZCBjYy51cmwgaXMgZGVwcmVjYXRlZFxuICogQGNsYXNzIHVybFxuICogQHN0YXRpY1xuICovXG5jYy51cmwgPSB7XG4gICAgbm9ybWFsaXplICh1cmwpIHtcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy51cmwubm9ybWFsaXplJywgJ2NjLmFzc2V0TWFuYWdlci51dGlscy5ub3JtYWxpemUnKTtcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci51dGlscy5ub3JtYWxpemUodXJsKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGNjLnVybC5yYXdgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNjLnJlc291cmNlcy5sb2FkYCBkaXJlY3RseSwgb3IgdXNlIGBBc3NldC5uYXRpdmVVcmxgIGluc3RlYWQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy51cmwucmF3IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MucmVzb3VyY2VzLmxvYWQgZGlyZWN0bHksIG9yIHVzZSBBc3NldC5uYXRpdmVVcmwgaW5zdGVhZC5cbiAgICAgKiBAbWV0aG9kIHJhd1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgcmF3ICh1cmwpIHtcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy51cmwucmF3JywgJ2NjLnJlc291cmNlcy5sb2FkJyk7XG4gICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aCgncmVzb3VyY2VzLycpKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLl90cmFuc2Zvcm0oeydwYXRoJzogY2MucGF0aC5jaGFuZ2VFeHRuYW1lKHVybC5zdWJzdHIoMTApKSwgYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVpbHRpbkJ1bmRsZU5hbWUuUkVTT1VSQ0VTLCBfX2lzTmF0aXZlX186IHRydWUsIGV4dDogY2MucGF0aC5leHRuYW1lKHVybCl9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufTtcblxubGV0IG9uY2VXYXJucyA9IHtcbiAgICBsb2FkZXI6IHRydWUsXG4gICAgYXNzZXRMaWJyYXJ5OiB0cnVlLFxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY2MsIHtcbiAgICBsb2FkZXI6IHtcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgIGlmIChvbmNlV2FybnMubG9hZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uY2VXYXJucy5sb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdjYy5sb2FkZXIgaXMgZGVwcmVjYXRlZCwgdXNlIGNjLmFzc2V0TWFuYWdlciBpbnN0ZWFkIHBsZWFzZS4gU2VlIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvcmVsZWFzZS1ub3Rlcy9hc3NldC1tYW5hZ2VyLXVwZ3JhZGUtZ3VpZGUuaHRtbCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsb2FkZXI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgQXNzZXRMaWJyYXJ5OiB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICBpZiAob25jZVdhcm5zLmFzc2V0TGlicmFyeSkge1xuICAgICAgICAgICAgICAgICAgICBvbmNlV2FybnMuYXNzZXRMaWJyYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnY2MuQXNzZXRMaWJyYXJ5IGlzIGRlcHJlY2F0ZWQsIHVzZSBjYy5hc3NldE1hbmFnZXIgaW5zdGVhZCBwbGVhc2UuIFNlZSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3JlbGVhc2Utbm90ZXMvYXNzZXQtbWFuYWdlci11cGdyYWRlLWd1aWRlLmh0bWwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gQXNzZXRMaWJyYXJ5O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBjYy5Mb2FkaW5nSXRlbXNgIHdhcyByZW1vdmVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIlRhc2tcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgY2MuTG9hZGluZ0l0ZW1zIHdhcyByZW1vdmVkLCBwbGVhc2UgdXNlIGNjLkFzc2V0TWFuYWdlci5UYXNrIGluc3RlYWRcbiAgICAgKiBAY2xhc3MgTG9hZGluZ0l0ZW1zXG4gICAgICovXG4gICAgTG9hZGluZ0l0ZW1zOiB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLkxvYWRpbmdJdGVtcycsICdjYy5Bc3NldE1hbmFnZXIuVGFzaycpO1xuICAgICAgICAgICAgcmV0dXJuIGNjLkFzc2V0TWFuYWdlci5UYXNrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFBpcGVsaW5lOiB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLlBpcGVsaW5lJywgJ2NjLkFzc2V0TWFuYWdlci5QaXBlbGluZScpO1xuICAgICAgICAgICAgcmV0dXJuIGNjLkFzc2V0TWFuYWdlci5QaXBlbGluZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5qcy5vYnNvbGV0ZShjYywgJ2NjLlJhd0Fzc2V0JywgJ2NjLkFzc2V0Jyk7XG5cbi8qKlxuICogQGNsYXNzIEFzc2V0XG4gKi9cbi8qKlxuICogYGNjLkFzc2V0LnVybGAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldC9uYXRpdmVVcmw6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICogQHByb3BlcnR5IHVybFxuICogQHR5cGUge1N0cmluZ31cbiAqIEBkZXByZWNhdGVkIGNjLkFzc2V0LnVybCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLkFzc2V0Lm5hdGl2ZVVybCBpbnN0ZWFkXG4gKi9cbmpzLm9ic29sZXRlKGNjLkFzc2V0LnByb3RvdHlwZSwgJ2NjLkFzc2V0LnVybCcsICduYXRpdmVVcmwnKTtcblxuLyoqXG4gKiBAY2xhc3MgbWFjcm9cbiAqIEBzdGF0aWNcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY2MubWFjcm8sIHtcbiAgICAvKipcbiAgICAgKiBgY2MubWFjcm8uRE9XTkxPQURfTUFYX0NPTkNVUlJFTlRgIGlzIGRlcHJlY2F0ZWQgbm93LCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkRvd25sb2FkZXIvbWF4Q29uY3VycmVuY3k6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBET1dOTE9BRF9NQVhfQ09OQ1VSUkVOVFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQGRlcHJlY2F0ZWQgY2MubWFjcm8uRE9XTkxPQURfTUFYX0NPTkNVUlJFTlQgaXMgZGVwcmVjYXRlZCBub3csIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXIubWF4Q29uY3VycmVuY3kgaW5zdGVhZFxuICAgICAqL1xuICAgIERPV05MT0FEX01BWF9DT05DVVJSRU5UOiB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXIubWF4Q29uY3VycmVuY3k7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyLm1heENvbmN1cnJlbmN5ID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbk9iamVjdC5hc3NpZ24oY2MuZGlyZWN0b3IsIHtcbiAgICBfZ2V0U2NlbmVVdWlkIChzY2VuZU5hbWUpIHtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLm1haW4uZ2V0U2NlbmVJbmZvKHNjZW5lTmFtZSk7XG4gICAgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNjLmdhbWUsIHtcbiAgICBfc2NlbmVJbmZvczoge1xuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgdmFyIHNjZW5lcyA9IFtdO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLm1haW4uX2NvbmZpZy5zY2VuZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgc2NlbmVzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNjZW5lcztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG52YXIgcGFyc2VQYXJhbWV0ZXJzID0gdXRpbGl0aWVzLnBhcnNlUGFyYW1ldGVycztcbnV0aWxpdGllcy5wYXJzZVBhcmFtZXRlcnMgPSBmdW5jdGlvbiAob3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xuICAgIHZhciByZXN1bHQgPSBwYXJzZVBhcmFtZXRlcnMob3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgcmVzdWx0Lm9uUHJvZ3Jlc3MgPSByZXN1bHQub25Qcm9ncmVzcyB8fCBsb2FkZXIub25Qcm9ncmVzcztcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGF1dG9SZWxlYXNlID0gcmVsZWFzZU1hbmFnZXIuX2F1dG9SZWxlYXNlO1xucmVsZWFzZU1hbmFnZXIuX2F1dG9SZWxlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGF1dG9SZWxlYXNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIHJlbGVhc2VTZXR0aW5ncyA9IGxvYWRlci5fYXV0b1JlbGVhc2VTZXR0aW5nO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVsZWFzZVNldHRpbmdzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmIChyZWxlYXNlU2V0dGluZ3Nba2V5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIGFzc2V0ID0gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGFzc2V0ICYmIHJlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UoYXNzZXQpO1xuICAgICAgICB9XG4gICAgfVxufTsiXSwic291cmNlUm9vdCI6Ii8ifQ==