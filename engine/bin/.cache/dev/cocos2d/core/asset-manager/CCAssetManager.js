
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/CCAssetManager.js';
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
var preprocess = require('./preprocess');

var fetch = require('./fetch');

var Cache = require('./cache');

var helper = require('./helper');

var releaseManager = require('./releaseManager');

var dependUtil = require('./depend-util');

var load = require('./load');

var Pipeline = require('./pipeline');

var Task = require('./task');

var RequestItem = require('./request-item');

var downloader = require('./downloader');

var parser = require('./parser');

var packManager = require('./pack-manager');

var Bundle = require('./bundle');

var builtins = require('./builtins');

var factory = require('./factory');

var _require = require('./urlTransformer'),
    parse = _require.parse,
    combine = _require.combine;

var _require2 = require('./utilities'),
    parseParameters = _require2.parseParameters,
    asyncify = _require2.asyncify;

var _require3 = require('./shared'),
    assets = _require3.assets,
    files = _require3.files,
    parsed = _require3.parsed,
    pipeline = _require3.pipeline,
    transformPipeline = _require3.transformPipeline,
    fetchPipeline = _require3.fetchPipeline,
    RequestType = _require3.RequestType,
    bundles = _require3.bundles,
    BuiltinBundleName = _require3.BuiltinBundleName;
/**
 * @module cc
 */

/**
 * !#en
 * This module controls asset's behaviors and information, include loading, releasing etc. it is a singleton
 * All member can be accessed with `cc.assetManager`.
 * 
 * !#zh
 * 此模块管理资源的行为和信息，包括加载，释放等，这是一个单例，所有成员能够通过 `cc.assetManager` 调用
 * 
 * @class AssetManager
 */


function AssetManager() {
  this._preprocessPipe = preprocess;
  this._fetchPipe = fetch;
  this._loadPipe = load;
  /**
   * !#en 
   * Normal loading pipeline
   * 
   * !#zh
   * 正常加载管线
   * 
   * @property pipeline
   * @type {Pipeline}
   */

  this.pipeline = pipeline.append(preprocess).append(load);
  /**
   * !#en 
   * Fetching pipeline
   * 
   * !#zh
   * 下载管线
   * 
   * @property fetchPipeline
   * @type {Pipeline}
   */

  this.fetchPipeline = fetchPipeline.append(preprocess).append(fetch);
  /**
   * !#en 
   * Url transformer
   * 
   * !#zh
   * Url 转换器
   * 
   * @property transformPipeline
   * @type {Pipeline}
   */

  this.transformPipeline = transformPipeline.append(parse).append(combine);
  /**
   * !#en 
   * The collection of bundle which is already loaded, you can remove cache with {{#crossLink "AssetManager/removeBundle:method"}}{{/crossLink}}
   * 
   * !#zh
   * 已加载 bundle 的集合， 你能通过 {{#crossLink "AssetManager/removeBundle:method"}}{{/crossLink}} 来移除缓存
   * 
   * @property bundles
   * @type {Cache}
   * @typescript
   * bundles: AssetManager.Cache<AssetManager.Bundle>
   */

  this.bundles = bundles;
  /**
   * !#en 
   * The collection of asset which is already loaded, you can remove cache with {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   * 
   * !#zh
   * 已加载资源的集合， 你能通过 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} 来移除缓存
   * 
   * @property assets
   * @type {Cache}
   * @typescript
   * assets: AssetManager.Cache<cc.Asset>
   */

  this.assets = assets;
  this._files = files;
  this._parsed = parsed;
  this.generalImportBase = '';
  this.generalNativeBase = '';
  /**
   * !#en 
   * Manage relationship between asset and its dependencies
   * 
   * !#zh
   * 管理资源依赖关系
   * 
   * @property dependUtil
   * @type {DependUtil}
   */

  this.dependUtil = dependUtil;
  this._releaseManager = releaseManager;
  /**
   * !#en 
   * Whether or not cache the loaded asset
   * 
   * !#zh
   * 是否缓存已加载的资源
   * 
   * @property cacheAsset
   * @type {boolean}
   */

  this.cacheAsset = true;
  /**
   * !#en 
   * Whether or not load asset forcely, if it is true, asset will be loaded regardless of error
   * 
   * !#zh
   * 是否强制加载资源, 如果为 true ，加载资源将会忽略报错
   * 
   * @property force
   * @type {boolean}
   */

  this.force = false;
  /**
   * !#en 
   * Some useful function
   * 
   * !#zh
   * 一些有用的方法
   * 
   * @property utils
   * @type {Helper}
   */

  this.utils = helper;
  /**
   * !#en 
   * Manage all downloading task
   * 
   * !#zh
   * 管理所有下载任务
   * 
   * @property downloader
   * @type {Downloader}
   */

  this.downloader = downloader;
  /**
   * !#en 
   * Manage all parsing task
   * 
   * !#zh
   * 管理所有解析任务
   * 
   * @property parser
   * @type {Parser}
   */

  this.parser = parser;
  /**
   * !#en 
   * Manage internal asset
   * 
   * !#zh
   * 管理内置资源
   * 
   * @property builtins
   * @type {Builtins}
   */

  this.builtins = builtins;
  /**
   * !#en 
   * Manage all packed asset
   * 
   * !#zh
   * 管理所有合并后的资源
   * 
   * @property packManager
   * @type {PackManager}
   */

  this.packManager = packManager;
  this.factory = factory;
  /**
   * !#en 
   * Cache manager is a module which controls all caches downloaded from server in non-web platform.
   * 
   * !#zh
   * 缓存管理器是一个模块，在非 WEB 平台上，用于管理所有从服务器上下载下来的缓存
   * 
   * @property cacheManager
   * @type {cc.AssetManager.CacheManager}
   * @typescript
   * cacheManager: cc.AssetManager.CacheManager|null
   */

  this.cacheManager = null;
  /**
   * !#en 
   * The preset of options
   * 
   * !#zh
   * 可选参数的预设集
   * 
   * @property presets
   * @type {Object}
   * @typescript
   * presets: Record<string, Record<string, any>>
   */

  this.presets = {
    'default': {
      priority: 0
    },
    'preload': {
      maxConcurrency: 2,
      maxRequestsPerFrame: 2,
      priority: -1
    },
    'scene': {
      maxConcurrency: 8,
      maxRequestsPerFrame: 8,
      priority: 1
    },
    'bundle': {
      maxConcurrency: 8,
      maxRequestsPerFrame: 8,
      priority: 2
    },
    'remote': {
      maxRetryCount: 4
    },
    'script': {
      priority: 2
    }
  };
}

AssetManager.Pipeline = Pipeline;
AssetManager.Task = Task;
AssetManager.Cache = Cache;
AssetManager.RequestItem = RequestItem;
AssetManager.Bundle = Bundle;
AssetManager.BuiltinBundleName = BuiltinBundleName;
AssetManager.prototype = {
  constructor: AssetManager,

  /**
   * !#en 
   * The builtin 'main' bundle
   * 
   * !#zh
   * 内置 main 包
   * 
   * @property main
   * @readonly
   * @type {Bundle}
   */
  get main() {
    return bundles.get(BuiltinBundleName.MAIN);
  },

  /**
   * !#en 
   * The builtin 'resources' bundle
   * 
   * !#zh
   * 内置 resources 包
   * 
   * @property resources
   * @readonly
   * @type {Bundle}
   */
  get resources() {
    return bundles.get(BuiltinBundleName.RESOURCES);
  },

  /**
   * !#en 
   * The builtin 'internal' bundle
   * 
   * !#zh
   * 内置 internal 包
   * 
   * @property internal
   * @readonly
   * @type {Bundle}
   */
  get internal() {
    return bundles.get(BuiltinBundleName.INTERNAL);
  },

  /**
   * !#en
   * Initialize assetManager with options
   * 
   * !#zh
   * 初始化资源管理器
   * 
   * @method init
   * @param {Object} options 
   * 
   * @typescript
   * init(options: Record<string, any>): void
   */
  init: function init(options) {
    options = options || Object.create(null);

    this._files.clear();

    this._parsed.clear();

    this._releaseManager.init();

    this.assets.clear();
    this.bundles.clear();
    this.packManager.init();
    this.downloader.init(options.bundleVers);
    this.parser.init();
    this.dependUtil.init();
    this.generalImportBase = options.importBase;
    this.generalNativeBase = options.nativeBase;
  },

  /**
   * !#en 
   * Get the bundle which has been loaded
   * 
   * !#zh
   * 获取已加载的分包
   * 
   * @method getBundle
   * @param {String} name - The name of bundle 
   * @return {Bundle} - The loaded bundle
   * 
   * @example
   * // ${project}/assets/test1
   * cc.assetManager.getBundle('test1');
   * 
   * cc.assetManager.getBundle('resources');
   * 
   * @typescript
   * getBundle (name: string): cc.AssetManager.Bundle
   */
  getBundle: function getBundle(name) {
    return bundles.get(name);
  },

  /**
   * !#en 
   * Remove this bundle. NOTE: The asset whthin this bundle will not be released automatically, you can call {{#crossLink "Bundle/releaseAll:method"}}{{/crossLink}} manually before remove it if you need
   * 
   * !#zh 
   * 移除此包, 注意：这个包内的资源不会自动释放, 如果需要的话你可以在摧毁之前手动调用 {{#crossLink "Bundle/releaseAll:method"}}{{/crossLink}} 进行释放
   *
   * @method removeBundle
   * @param {Bundle} bundle - The bundle to be removed 
   * 
   * @typescript
   * removeBundle(bundle: cc.AssetManager.Bundle): void
   */
  removeBundle: function removeBundle(bundle) {
    bundle._destroy();

    bundles.remove(bundle.name);
  },

  /**
   * !#en
   * General interface used to load assets with a progression callback and a complete callback. You can achieve almost all effect you want with combination of `requests` and `options`.
   * It is highly recommended that you use more simple API, such as `load`, `loadDir` etc. Every custom parameter in `options` will be distribute to each of `requests`. 
   * if request already has same one, the parameter in request will be given priority. Besides, if request has dependencies, `options` will distribute to dependencies too.
   * Every custom parameter in `requests` will be tranfered to handler of `downloader` and `parser` as `options`. 
   * You can register you own handler downloader or parser to collect these custom parameters for some effect.
   * 
   * Reserved Keyword: `uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`, `bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`
   * `maxRetryCount`, `version`, `responseType`, `withCredentials`, `mimeType`, `timeout`, `header`, `reload`, `cacheAsset`, `cacheEnabled`,
   * Please DO NOT use these words as custom options!
   * 
   * !#zh
   * 通用加载资源接口，可传入进度回调以及完成回调，通过组合 `request` 和 `options` 参数，几乎可以实现和扩展所有想要的加载效果。非常建议你使用更简单的API，例如 `load`、`loadDir` 等。
   * `options` 中的自定义参数将会分发到 `requests` 的每一项中，如果request中已存在同名的参数则以 `requests` 中为准，同时如果有其他
   * 依赖资源，则 `options` 中的参数会继续向依赖项中分发。request中的自定义参数都会以 `options` 形式传入加载流程中的 `downloader`, `parser` 的方法中, 你可以
   * 扩展 `downloader`, `parser` 收集参数完成想实现的效果。
   * 
   * 保留关键字: `uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`, `bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`
   * `maxRetryCount`, `version`, `responseType`, `withCredentials`, `mimeType`, `timeout`, `header`, `reload`, `cacheAsset`, `cacheEnabled`,
   * 请不要使用这些字段为自定义参数!
   * 
   * @method loadAny
   * @param {string|string[]|Object|Object[]} requests - The request you want to load
   * @param {Object} [options] - Optional parameters
   * @param {Function} [onProgress] - Callback invoked when progression change
   * @param {Number} onProgress.finished - The number of the items that are already completed
   * @param {Number} onProgress.total - The total number of the items
   * @param {RequestItem} onProgress.item - The current request item
   * @param {Function} [onComplete] - Callback invoked when finish loading
   * @param {Error} onComplete.err - The error occured in loading process.
   * @param {Object} onComplete.data - The loaded content
   * 
   * @example
   * cc.assetManager.loadAny({url: 'http://example.com/a.png'}, (err, img) => cc.log(img));
   * cc.assetManager.loadAny(['60sVXiTH1D/6Aft4MRt9VC'], (err, assets) => cc.log(assets));
   * cc.assetManager.loadAny([{ uuid: '0cbZa5Y71CTZAccaIFluuZ'}, {url: 'http://example.com/a.png'}], (err, assets) => cc.log(assets));
   * cc.assetManager.downloader.register('.asset', (url, options, onComplete) => {
   *      url += '?userName=' + options.userName + "&password=" + options.password;
   *      cc.assetManager.downloader.downloadFile(url, null, onComplete);
   * });
   * cc.assetManager.parser.register('.asset', (file, options, onComplete) => {
   *      var json = JSON.parse(file);
   *      var skin = json[options.skin];
   *      var model = json[options.model];
   *      onComplete(null, {skin, model});
   * });
   * cc.assetManager.loadAny({ url: 'http://example.com/my.asset', skin: 'xxx', model: 'xxx', userName: 'xxx', password: 'xxx' });
   * 
   * @typescript
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[]): void
   */
  loadAny: function loadAny(requests, options, onProgress, onComplete) {
    var _parseParameters = parseParameters(options, onProgress, onComplete),
        options = _parseParameters.options,
        onProgress = _parseParameters.onProgress,
        onComplete = _parseParameters.onComplete;

    options.preset = options.preset || 'default';
    var task = new Task({
      input: requests,
      onProgress: onProgress,
      onComplete: asyncify(onComplete),
      options: options
    });
    pipeline.async(task);
  },

  /**
   * !#en
   * General interface used to preload assets with a progression callback and a complete callback.It is highly recommended that you use more simple API, such as `preloadRes`, `preloadResDir` etc.
   * Everything about preload is just likes `cc.assetManager.loadAny`, the difference is `cc.assetManager.preloadAny` will only download asset but not parse asset. You need to invoke `cc.assetManager.loadAny(preloadTask)` 
   * to finish loading asset
   * 
   * !#zh
   * 通用预加载资源接口，可传入进度回调以及完成回调，非常建议你使用更简单的 API ，例如 `preloadRes`, `preloadResDir` 等。`preloadAny` 和 `loadAny` 几乎一样，区别在于 `preloadAny` 只会下载资源，不会去解析资源，你需要调用 `cc.assetManager.loadAny(preloadTask)`
   * 来完成资源加载。
   * 
   * @method preloadAny
   * @param {string|string[]|Object|Object[]} requests - The request you want to preload
   * @param {Object} [options] - Optional parameters
   * @param {Function} [onProgress] - Callback invoked when progression change
   * @param {Number} onProgress.finished - The number of the items that are already completed
   * @param {Number} onProgress.total - The total number of the items
   * @param {RequestItem} onProgress.item - The current request item
   * @param {Function} [onComplete] - Callback invoked when finish preloading
   * @param {Error} onComplete.err - The error occured in preloading process.
   * @param {RequestItem[]} onComplete.items - The preloaded content
   * 
   * @example
   * cc.assetManager.preloadAny('0cbZa5Y71CTZAccaIFluuZ', (err) => cc.assetManager.loadAny('0cbZa5Y71CTZAccaIFluuZ'));
   * 
   * @typescript
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[]): void
   */
  preloadAny: function preloadAny(requests, options, onProgress, onComplete) {
    var _parseParameters2 = parseParameters(options, onProgress, onComplete),
        options = _parseParameters2.options,
        onProgress = _parseParameters2.onProgress,
        onComplete = _parseParameters2.onComplete;

    options.preset = options.preset || 'preload';
    var task = new Task({
      input: requests,
      onProgress: onProgress,
      onComplete: asyncify(onComplete),
      options: options
    });
    fetchPipeline.async(task);
  },

  /**
   * !#en
   * Load native file of asset, if you check the option 'Async Load Assets', you may need to load native file with this before you use the asset
   * 
   * !#zh
   * 加载资源的原生文件，如果你勾选了'延迟加载资源'选项，你可能需要在使用资源之前调用此方法来加载原生文件
   * 
   * @method postLoadNative
   * @param {Asset} asset - The asset
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onComplete] - Callback invoked when finish loading
   * @param {Error} onComplete.err - The error occured in loading process.
   * 
   * @example
   * cc.assetManager.postLoadNative(texture, (err) => console.log(err));
   * 
   * @typescript
   * postLoadNative(asset: cc.Asset, options: Record<string, any>, onComplete: (err: Error) => void): void
   * postLoadNative(asset: cc.Asset, onComplete: (err: Error) => void): void
   * postLoadNative(asset: cc.Asset, options: Record<string, any>): void
   * postLoadNative(asset: cc.Asset): void
   */
  postLoadNative: function postLoadNative(asset, options, onComplete) {
    if (!(asset instanceof cc.Asset)) throw new Error('input is not asset');

    var _parseParameters3 = parseParameters(options, undefined, onComplete),
        options = _parseParameters3.options,
        onComplete = _parseParameters3.onComplete;

    if (!asset._native || asset._nativeAsset) {
      return asyncify(onComplete)(null);
    }

    var depend = dependUtil.getNativeDep(asset._uuid);

    if (depend) {
      if (!bundles.has(depend.bundle)) {
        var bundle = bundles.find(function (bundle) {
          return bundle.getAssetInfo(asset._uuid);
        });

        if (bundle) {
          depend.bundle = bundle.name;
        }
      }

      this.loadAny(depend, options, function (err, _native) {
        if (!err) {
          !asset._nativeAsset && (asset._nativeAsset = _native);
        } else {
          cc.error(err.message, err.stack);
        }

        onComplete && onComplete(err);
      });
    }
  },

  /**
   * !#en
   * Load remote asset with url, such as audio, image, text and so on.
   * 
   * !#zh
   * 使用 url 加载远程资源，例如音频，图片，文本等等。
   * 
   * @method loadRemote
   * @param {string} url - The url of asset
   * @param {Object} [options] - Some optional parameters
   * @param {cc.AudioClip.LoadMode} [options.audioLoadMode] - Indicate which mode audio you want to load
   * @param {Function} [onComplete] - Callback invoked when finish loading
   * @param {Error} onComplete.err - The error occured in loading process.
   * @param {Asset} onComplete.asset - The loaded texture
   * 
   * @example
   * cc.assetManager.loadRemote('http://www.cloud.com/test1.jpg', (err, texture) => console.log(err));
   * cc.assetManager.loadRemote('http://www.cloud.com/test2.mp3', (err, audioClip) => console.log(err));
   * 
   * @typescript
   * loadRemote<T extends cc.Asset>(url: string, options: Record<string, any>, onComplete: (err: Error, asset: T) => void): void
   * loadRemote<T extends cc.Asset>(url: string, onComplete: (err: Error, asset: T) => void): void
   * loadRemote<T extends cc.Asset>(url: string, options: Record<string, any>): void
   * loadRemote<T extends cc.Asset>(url: string): void
   */
  loadRemote: function loadRemote(url, options, onComplete) {
    var _parseParameters4 = parseParameters(options, undefined, onComplete),
        options = _parseParameters4.options,
        onComplete = _parseParameters4.onComplete;

    if (this.assets.has(url)) {
      return asyncify(onComplete)(null, this.assets.get(url));
    }

    options.__isNative__ = true;
    options.preset = options.preset || 'remote';
    this.loadAny({
      url: url
    }, options, null, function (err, data) {
      if (err) {
        cc.error(err.message, err.stack);
        onComplete && onComplete(err, null);
      } else {
        factory.create(url, data, options.ext || cc.path.extname(url), options, onComplete);
      }
    });
  },

  /**
   * !#en
   * Load script 
   * 
   * !#zh
   * 加载脚本
   * 
   * @method loadScript
   * @param {string|string[]} url - Url of the script
   * @param {Object} [options] - Some optional paramters
   * @param {boolean} [options.isAsync] - Indicate whether or not loading process should be async
   * @param {Function} [onComplete] - Callback when script loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * 
   * @example
   * loadScript('http://localhost:8080/index.js', null, (err) => console.log(err));
   * 
   * @typescript
   * loadScript(url: string|string[], options: Record<string, any>, onComplete: (err: Error) => void): void;
   * loadScript(url: string|string[], onComplete: (err: Error) => void): void;
   * loadScript(url: string|string[], options: Record<string, any>): void;
   * loadScript(url: string|string[]): void;
   */
  loadScript: function loadScript(url, options, onComplete) {
    var _parseParameters5 = parseParameters(options, undefined, onComplete),
        options = _parseParameters5.options,
        onComplete = _parseParameters5.onComplete;

    options.__requestType__ = RequestType.URL;
    options.preset = options.preset || 'script';
    this.loadAny(url, options, onComplete);
  },

  /**
   * !#en
   * load bundle
   * 
   * !#zh
   * 加载资源包
   * 
   * @method loadBundle
   * @param {string} nameOrUrl - The name or root path of bundle
   * @param {Object} [options] - Some optional paramter, same like downloader.downloadFile
   * @param {string} [options.version] - The version of this bundle, you can check config.json in this bundle
   * @param {Function} [onComplete] - Callback when bundle loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Bundle} onComplete.bundle - The loaded bundle
   * 
   * @example
   * loadBundle('http://localhost:8080/test', null, (err, bundle) => console.log(err));
   * 
   * @typescript
   * loadBundle(nameOrUrl: string, options: Record<string, any>, onComplete: (err: Error, bundle: cc.AssetManager.Bundle) => void): void
   * loadBundle(nameOrUrl: string, onComplete: (err: Error, bundle: cc.AssetManager.Bundle) => void): void
   * loadBundle(nameOrUrl: string, options: Record<string, any>): void
   * loadBundle(nameOrUrl: string): void
   */
  loadBundle: function loadBundle(nameOrUrl, options, onComplete) {
    var _parseParameters6 = parseParameters(options, undefined, onComplete),
        options = _parseParameters6.options,
        onComplete = _parseParameters6.onComplete;

    var bundleName = cc.path.basename(nameOrUrl);

    if (this.bundles.has(bundleName)) {
      return asyncify(onComplete)(null, this.getBundle(bundleName));
    }

    options.preset = options.preset || 'bundle';
    options.ext = 'bundle';
    this.loadRemote(nameOrUrl, options, onComplete);
  },

  /**
   * !#en
   * Release asset and it's dependencies.
   * This method will not only remove the cache of the asset in assetManager, but also clean up its content.
   * For example, if you release a texture, the texture asset and its gl texture data will be freed up.
   * Notice, this method may cause the texture to be unusable, if there are still other nodes use the same texture, they may turn to black and report gl errors.
   * 
   * !#zh
   * 释放资源以及其依赖资源, 这个方法不仅会从 assetManager 中删除资源的缓存引用，还会清理它的资源内容。
   * 比如说，当你释放一个 texture 资源，这个 texture 和它的 gl 贴图数据都会被释放。
   * 注意，这个函数可能会导致资源贴图或资源所依赖的贴图不可用，如果场景中存在节点仍然依赖同样的贴图，它们可能会变黑并报 GL 错误。
   *
   * @method releaseAsset
   * @param {Asset} asset - The asset to be released
   * 
   * @example
   * // release a texture which is no longer need
   * cc.assetManager.releaseAsset(texture);
   *
   * @typescript
   * releaseAsset(asset: cc.Asset): void
   */
  releaseAsset: function releaseAsset(asset) {
    releaseManager.tryRelease(asset, true);
  },

  /**
   * !#en 
   * Release all unused assets. Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放所有没有用到的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   *
   * @method releaseUnusedAssets
   * @private
   * 
   * @typescript
   * releaseUnusedAssets(): void
   */
  releaseUnusedAssets: function releaseUnusedAssets() {
    assets.forEach(function (asset) {
      releaseManager.tryRelease(asset);
    });
  },

  /**
   * !#en 
   * Release all assets. Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放所有资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   *
   * @method releaseAll
   * 
   * @typescript
   * releaseAll(): void
   */
  releaseAll: function releaseAll() {
    assets.forEach(function (asset) {
      releaseManager.tryRelease(asset, true);
    });
  },
  _transform: function _transform(input, options) {
    var subTask = Task.create({
      input: input,
      options: options
    });
    var urls = [];

    try {
      var result = transformPipeline.sync(subTask);

      for (var i = 0, l = result.length; i < l; i++) {
        var item = result[i];
        var url = item.url;
        item.recycle();
        urls.push(url);
      }
    } catch (e) {
      for (var i = 0, l = subTask.output.length; i < l; i++) {
        subTask.output[i].recycle();
      }

      cc.error(e.message, e.stack);
    }

    subTask.recycle();
    return urls.length > 1 ? urls : urls[0];
  }
};
cc.AssetManager = AssetManager;
/**
 * @module cc
 */

/**
 * @property assetManager
 * @type {AssetManager}
 */

cc.assetManager = new AssetManager();
Object.defineProperty(cc, 'resources', {
  /**
   * !#en
   * cc.resources is a bundle and controls all asset under assets/resources
   * 
   * !#zh
   * cc.resources 是一个 bundle，用于管理所有在 assets/resources 下的资源
   * 
   * @property resources
   * @readonly
   * @type {AssetManager.Bundle}
   */
  get: function get() {
    return bundles.get(BuiltinBundleName.RESOURCES);
  }
});
module.exports = cc.assetManager;
/**
 * !#en
 * This module controls asset's behaviors and information, include loading, releasing etc. 
 * All member can be accessed with `cc.assetManager`. All class or enum can be accessed with `cc.AssetManager`
 * 
 * !#zh
 * 此模块管理资源的行为和信息，包括加载，释放等，所有成员能够通过 `cc.assetManager` 调用. 所有类型或枚举能通过 `cc.AssetManager` 访问
 * 
 * @module cc.AssetManager
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvQ0NBc3NldE1hbmFnZXIuanMiXSwibmFtZXMiOlsicHJlcHJvY2VzcyIsInJlcXVpcmUiLCJmZXRjaCIsIkNhY2hlIiwiaGVscGVyIiwicmVsZWFzZU1hbmFnZXIiLCJkZXBlbmRVdGlsIiwibG9hZCIsIlBpcGVsaW5lIiwiVGFzayIsIlJlcXVlc3RJdGVtIiwiZG93bmxvYWRlciIsInBhcnNlciIsInBhY2tNYW5hZ2VyIiwiQnVuZGxlIiwiYnVpbHRpbnMiLCJmYWN0b3J5IiwicGFyc2UiLCJjb21iaW5lIiwicGFyc2VQYXJhbWV0ZXJzIiwiYXN5bmNpZnkiLCJhc3NldHMiLCJmaWxlcyIsInBhcnNlZCIsInBpcGVsaW5lIiwidHJhbnNmb3JtUGlwZWxpbmUiLCJmZXRjaFBpcGVsaW5lIiwiUmVxdWVzdFR5cGUiLCJidW5kbGVzIiwiQnVpbHRpbkJ1bmRsZU5hbWUiLCJBc3NldE1hbmFnZXIiLCJfcHJlcHJvY2Vzc1BpcGUiLCJfZmV0Y2hQaXBlIiwiX2xvYWRQaXBlIiwiYXBwZW5kIiwiX2ZpbGVzIiwiX3BhcnNlZCIsImdlbmVyYWxJbXBvcnRCYXNlIiwiZ2VuZXJhbE5hdGl2ZUJhc2UiLCJfcmVsZWFzZU1hbmFnZXIiLCJjYWNoZUFzc2V0IiwiZm9yY2UiLCJ1dGlscyIsImNhY2hlTWFuYWdlciIsInByZXNldHMiLCJwcmlvcml0eSIsIm1heENvbmN1cnJlbmN5IiwibWF4UmVxdWVzdHNQZXJGcmFtZSIsIm1heFJldHJ5Q291bnQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm1haW4iLCJnZXQiLCJNQUlOIiwicmVzb3VyY2VzIiwiUkVTT1VSQ0VTIiwiaW50ZXJuYWwiLCJJTlRFUk5BTCIsImluaXQiLCJvcHRpb25zIiwiT2JqZWN0IiwiY3JlYXRlIiwiY2xlYXIiLCJidW5kbGVWZXJzIiwiaW1wb3J0QmFzZSIsIm5hdGl2ZUJhc2UiLCJnZXRCdW5kbGUiLCJuYW1lIiwicmVtb3ZlQnVuZGxlIiwiYnVuZGxlIiwiX2Rlc3Ryb3kiLCJyZW1vdmUiLCJsb2FkQW55IiwicmVxdWVzdHMiLCJvblByb2dyZXNzIiwib25Db21wbGV0ZSIsInByZXNldCIsInRhc2siLCJpbnB1dCIsImFzeW5jIiwicHJlbG9hZEFueSIsInBvc3RMb2FkTmF0aXZlIiwiYXNzZXQiLCJjYyIsIkFzc2V0IiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJfbmF0aXZlIiwiX25hdGl2ZUFzc2V0IiwiZGVwZW5kIiwiZ2V0TmF0aXZlRGVwIiwiX3V1aWQiLCJoYXMiLCJmaW5kIiwiZ2V0QXNzZXRJbmZvIiwiZXJyIiwibmF0aXZlIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhY2siLCJsb2FkUmVtb3RlIiwidXJsIiwiX19pc05hdGl2ZV9fIiwiZGF0YSIsImV4dCIsInBhdGgiLCJleHRuYW1lIiwibG9hZFNjcmlwdCIsIl9fcmVxdWVzdFR5cGVfXyIsIlVSTCIsImxvYWRCdW5kbGUiLCJuYW1lT3JVcmwiLCJidW5kbGVOYW1lIiwiYmFzZW5hbWUiLCJyZWxlYXNlQXNzZXQiLCJ0cnlSZWxlYXNlIiwicmVsZWFzZVVudXNlZEFzc2V0cyIsImZvckVhY2giLCJyZWxlYXNlQWxsIiwiX3RyYW5zZm9ybSIsInN1YlRhc2siLCJ1cmxzIiwicmVzdWx0Iiwic3luYyIsImkiLCJsIiwibGVuZ3RoIiwiaXRlbSIsInJlY3ljbGUiLCJwdXNoIiwiZSIsIm91dHB1dCIsImFzc2V0TWFuYWdlciIsImRlZmluZVByb3BlcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUExQjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQU1FLEtBQUssR0FBR0YsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBTUcsTUFBTSxHQUFHSCxP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QVA7QUFDSDtBQWRrQyxDQUF2QztBQWtCQStFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBELEVBQUUsQ0FBQ2lELFlBQXBCO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IHByZXByb2Nlc3MgPSByZXF1aXJlKCcuL3ByZXByb2Nlc3MnKTtcbmNvbnN0IGZldGNoID0gcmVxdWlyZSgnLi9mZXRjaCcpO1xuY29uc3QgQ2FjaGUgPSByZXF1aXJlKCcuL2NhY2hlJyk7XG5jb25zdCBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xuY29uc3QgcmVsZWFzZU1hbmFnZXIgPSByZXF1aXJlKCcuL3JlbGVhc2VNYW5hZ2VyJyk7XG5jb25zdCBkZXBlbmRVdGlsID0gcmVxdWlyZSgnLi9kZXBlbmQtdXRpbCcpO1xuY29uc3QgbG9hZCA9IHJlcXVpcmUoJy4vbG9hZCcpO1xuY29uc3QgUGlwZWxpbmUgPSByZXF1aXJlKCcuL3BpcGVsaW5lJyk7XG5jb25zdCBUYXNrID0gcmVxdWlyZSgnLi90YXNrJyk7XG5jb25zdCBSZXF1ZXN0SXRlbSA9IHJlcXVpcmUoJy4vcmVxdWVzdC1pdGVtJyk7XG5jb25zdCBkb3dubG9hZGVyID0gcmVxdWlyZSgnLi9kb3dubG9hZGVyJyk7XG5jb25zdCBwYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcicpO1xuY29uc3QgcGFja01hbmFnZXIgPSByZXF1aXJlKCcuL3BhY2stbWFuYWdlcicpO1xuY29uc3QgQnVuZGxlID0gcmVxdWlyZSgnLi9idW5kbGUnKTtcbmNvbnN0IGJ1aWx0aW5zID0gcmVxdWlyZSgnLi9idWlsdGlucycpO1xuY29uc3QgZmFjdG9yeSA9IHJlcXVpcmUoJy4vZmFjdG9yeScpO1xuY29uc3QgeyBwYXJzZSwgY29tYmluZSB9ID0gcmVxdWlyZSgnLi91cmxUcmFuc2Zvcm1lcicpO1xuY29uc3QgeyBwYXJzZVBhcmFtZXRlcnMsIGFzeW5jaWZ5IH0gPSByZXF1aXJlKCcuL3V0aWxpdGllcycpO1xuY29uc3QgeyBhc3NldHMsIGZpbGVzLCBwYXJzZWQsIHBpcGVsaW5lLCB0cmFuc2Zvcm1QaXBlbGluZSwgZmV0Y2hQaXBlbGluZSwgUmVxdWVzdFR5cGUsIGJ1bmRsZXMsIEJ1aWx0aW5CdW5kbGVOYW1lIH0gPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xuXG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG4vKipcbiAqICEjZW5cbiAqIFRoaXMgbW9kdWxlIGNvbnRyb2xzIGFzc2V0J3MgYmVoYXZpb3JzIGFuZCBpbmZvcm1hdGlvbiwgaW5jbHVkZSBsb2FkaW5nLCByZWxlYXNpbmcgZXRjLiBpdCBpcyBhIHNpbmdsZXRvblxuICogQWxsIG1lbWJlciBjYW4gYmUgYWNjZXNzZWQgd2l0aCBgY2MuYXNzZXRNYW5hZ2VyYC5cbiAqIFxuICogISN6aFxuICog5q2k5qih5Z2X566h55CG6LWE5rqQ55qE6KGM5Li65ZKM5L+h5oGv77yM5YyF5ous5Yqg6L2977yM6YeK5pS+562J77yM6L+Z5piv5LiA5Liq5Y2V5L6L77yM5omA5pyJ5oiQ5ZGY6IO95aSf6YCa6L+HIGBjYy5hc3NldE1hbmFnZXJgIOiwg+eUqFxuICogXG4gKiBAY2xhc3MgQXNzZXRNYW5hZ2VyXG4gKi9cbmZ1bmN0aW9uIEFzc2V0TWFuYWdlciAoKSB7XG5cbiAgICB0aGlzLl9wcmVwcm9jZXNzUGlwZSA9IHByZXByb2Nlc3M7XG5cbiAgICB0aGlzLl9mZXRjaFBpcGUgPSBmZXRjaDtcblxuICAgIHRoaXMuX2xvYWRQaXBlID0gbG9hZDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogTm9ybWFsIGxvYWRpbmcgcGlwZWxpbmVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5q2j5bi45Yqg6L29566h57q/XG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHBpcGVsaW5lXG4gICAgICogQHR5cGUge1BpcGVsaW5lfVxuICAgICAqL1xuICAgIHRoaXMucGlwZWxpbmUgPSBwaXBlbGluZS5hcHBlbmQocHJlcHJvY2VzcykuYXBwZW5kKGxvYWQpO1xuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogRmV0Y2hpbmcgcGlwZWxpbmVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5LiL6L29566h57q/XG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGZldGNoUGlwZWxpbmVcbiAgICAgKiBAdHlwZSB7UGlwZWxpbmV9XG4gICAgICovXG4gICAgdGhpcy5mZXRjaFBpcGVsaW5lID0gZmV0Y2hQaXBlbGluZS5hcHBlbmQocHJlcHJvY2VzcykuYXBwZW5kKGZldGNoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogVXJsIHRyYW5zZm9ybWVyXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIFVybCDovazmjaLlmahcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgdHJhbnNmb3JtUGlwZWxpbmVcbiAgICAgKiBAdHlwZSB7UGlwZWxpbmV9XG4gICAgICovXG4gICAgdGhpcy50cmFuc2Zvcm1QaXBlbGluZSA9IHRyYW5zZm9ybVBpcGVsaW5lLmFwcGVuZChwYXJzZSkuYXBwZW5kKGNvbWJpbmUpO1xuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFRoZSBjb2xsZWN0aW9uIG9mIGJ1bmRsZSB3aGljaCBpcyBhbHJlYWR5IGxvYWRlZCwgeW91IGNhbiByZW1vdmUgY2FjaGUgd2l0aCB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVtb3ZlQnVuZGxlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlt7LliqDovb0gYnVuZGxlIOeahOmbhuWQiO+8jCDkvaDog73pgJrov4cge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbW92ZUJ1bmRsZTptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0g5p2l56e76Zmk57yT5a2YXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGJ1bmRsZXNcbiAgICAgKiBAdHlwZSB7Q2FjaGV9XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBidW5kbGVzOiBBc3NldE1hbmFnZXIuQ2FjaGU8QXNzZXRNYW5hZ2VyLkJ1bmRsZT5cbiAgICAgKi9cbiAgICB0aGlzLmJ1bmRsZXMgPSBidW5kbGVzO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgY29sbGVjdGlvbiBvZiBhc3NldCB3aGljaCBpcyBhbHJlYWR5IGxvYWRlZCwgeW91IGNhbiByZW1vdmUgY2FjaGUgd2l0aCB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlt7LliqDovb3otYTmupDnmoTpm4blkIjvvIwg5L2g6IO96YCa6L+HIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOadpeenu+mZpOe8k+WtmFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBhc3NldHNcbiAgICAgKiBAdHlwZSB7Q2FjaGV9XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhc3NldHM6IEFzc2V0TWFuYWdlci5DYWNoZTxjYy5Bc3NldD5cbiAgICAgKi9cbiAgICB0aGlzLmFzc2V0cyA9IGFzc2V0cztcbiAgICBcbiAgICB0aGlzLl9maWxlcyA9IGZpbGVzO1xuICAgIFxuICAgIHRoaXMuX3BhcnNlZCA9IHBhcnNlZDtcblxuICAgIHRoaXMuZ2VuZXJhbEltcG9ydEJhc2UgPSAnJztcblxuICAgIHRoaXMuZ2VuZXJhbE5hdGl2ZUJhc2UgPSAnJztcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogTWFuYWdlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIGFzc2V0IGFuZCBpdHMgZGVwZW5kZW5jaWVzXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOeuoeeQhui1hOa6kOS+nei1luWFs+ezu1xuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBkZXBlbmRVdGlsXG4gICAgICogQHR5cGUge0RlcGVuZFV0aWx9XG4gICAgICovXG4gICAgdGhpcy5kZXBlbmRVdGlsID0gZGVwZW5kVXRpbDtcblxuICAgIHRoaXMuX3JlbGVhc2VNYW5hZ2VyID0gcmVsZWFzZU1hbmFnZXI7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFdoZXRoZXIgb3Igbm90IGNhY2hlIHRoZSBsb2FkZWQgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5piv5ZCm57yT5a2Y5bey5Yqg6L2955qE6LWE5rqQXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGNhY2hlQXNzZXRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmNhY2hlQXNzZXQgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCBsb2FkIGFzc2V0IGZvcmNlbHksIGlmIGl0IGlzIHRydWUsIGFzc2V0IHdpbGwgYmUgbG9hZGVkIHJlZ2FyZGxlc3Mgb2YgZXJyb3JcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5piv5ZCm5by65Yi25Yqg6L296LWE5rqQLCDlpoLmnpzkuLogdHJ1ZSDvvIzliqDovb3otYTmupDlsIbkvJrlv73nlaXmiqXplJlcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgZm9yY2VcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmZvcmNlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFNvbWUgdXNlZnVsIGZ1bmN0aW9uXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS4gOS6m+acieeUqOeahOaWueazlVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSB1dGlsc1xuICAgICAqIEB0eXBlIHtIZWxwZXJ9XG4gICAgICovXG4gICAgdGhpcy51dGlscyA9IGhlbHBlcjtcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogTWFuYWdlIGFsbCBkb3dubG9hZGluZyB0YXNrXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOeuoeeQhuaJgOacieS4i+i9veS7u+WKoVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBkb3dubG9hZGVyXG4gICAgICogQHR5cGUge0Rvd25sb2FkZXJ9XG4gICAgICovXG4gICAgdGhpcy5kb3dubG9hZGVyID0gZG93bmxvYWRlcjsgXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIE1hbmFnZSBhbGwgcGFyc2luZyB0YXNrXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOeuoeeQhuaJgOacieino+aekOS7u+WKoVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBwYXJzZXJcbiAgICAgKiBAdHlwZSB7UGFyc2VyfVxuICAgICAqL1xuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBNYW5hZ2UgaW50ZXJuYWwgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog566h55CG5YaF572u6LWE5rqQXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGJ1aWx0aW5zXG4gICAgICogQHR5cGUge0J1aWx0aW5zfVxuICAgICAqL1xuICAgIHRoaXMuYnVpbHRpbnMgPSBidWlsdGlucztcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogTWFuYWdlIGFsbCBwYWNrZWQgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog566h55CG5omA5pyJ5ZCI5bm25ZCO55qE6LWE5rqQXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHBhY2tNYW5hZ2VyXG4gICAgICogQHR5cGUge1BhY2tNYW5hZ2VyfVxuICAgICAqL1xuICAgIHRoaXMucGFja01hbmFnZXIgPSBwYWNrTWFuYWdlcjtcblxuICAgIHRoaXMuZmFjdG9yeSA9IGZhY3Rvcnk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIENhY2hlIG1hbmFnZXIgaXMgYSBtb2R1bGUgd2hpY2ggY29udHJvbHMgYWxsIGNhY2hlcyBkb3dubG9hZGVkIGZyb20gc2VydmVyIGluIG5vbi13ZWIgcGxhdGZvcm0uXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOe8k+WtmOeuoeeQhuWZqOaYr+S4gOS4quaooeWdl++8jOWcqOmdniBXRUIg5bmz5Y+w5LiK77yM55So5LqO566h55CG5omA5pyJ5LuO5pyN5Yqh5Zmo5LiK5LiL6L295LiL5p2l55qE57yT5a2YXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGNhY2hlTWFuYWdlclxuICAgICAqIEB0eXBlIHtjYy5Bc3NldE1hbmFnZXIuQ2FjaGVNYW5hZ2VyfVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY2FjaGVNYW5hZ2VyOiBjYy5Bc3NldE1hbmFnZXIuQ2FjaGVNYW5hZ2VyfG51bGxcbiAgICAgKi9cbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFRoZSBwcmVzZXQgb2Ygb3B0aW9uc1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlj6/pgInlj4LmlbDnmoTpooTorr7pm4ZcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgcHJlc2V0c1xuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwcmVzZXRzOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PlxuICAgICAqL1xuICAgIHRoaXMucHJlc2V0cyA9IHtcbiAgICAgICAgJ2RlZmF1bHQnOiB7XG4gICAgICAgICAgICBwcmlvcml0eTogMCxcbiAgICAgICAgfSxcblxuICAgICAgICAncHJlbG9hZCc6IHtcbiAgICAgICAgICAgIG1heENvbmN1cnJlbmN5OiAyLCBcbiAgICAgICAgICAgIG1heFJlcXVlc3RzUGVyRnJhbWU6IDIsXG4gICAgICAgICAgICBwcmlvcml0eTogLTEsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ3NjZW5lJzoge1xuICAgICAgICAgICAgbWF4Q29uY3VycmVuY3k6IDgsIFxuICAgICAgICAgICAgbWF4UmVxdWVzdHNQZXJGcmFtZTogOCxcbiAgICAgICAgICAgIHByaW9yaXR5OiAxLFxuICAgICAgICB9LFxuXG4gICAgICAgICdidW5kbGUnOiB7XG4gICAgICAgICAgICBtYXhDb25jdXJyZW5jeTogOCwgXG4gICAgICAgICAgICBtYXhSZXF1ZXN0c1BlckZyYW1lOiA4LFxuICAgICAgICAgICAgcHJpb3JpdHk6IDIsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ3JlbW90ZSc6IHtcbiAgICAgICAgICAgIG1heFJldHJ5Q291bnQ6IDRcbiAgICAgICAgfSxcblxuICAgICAgICAnc2NyaXB0Jzoge1xuICAgICAgICAgICAgcHJpb3JpdHk6IDJcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5Bc3NldE1hbmFnZXIuUGlwZWxpbmUgPSBQaXBlbGluZTtcbkFzc2V0TWFuYWdlci5UYXNrID0gVGFzaztcbkFzc2V0TWFuYWdlci5DYWNoZSA9IENhY2hlO1xuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtID0gUmVxdWVzdEl0ZW07XG5Bc3NldE1hbmFnZXIuQnVuZGxlID0gQnVuZGxlO1xuQXNzZXRNYW5hZ2VyLkJ1aWx0aW5CdW5kbGVOYW1lID0gQnVpbHRpbkJ1bmRsZU5hbWU7XG5cbkFzc2V0TWFuYWdlci5wcm90b3R5cGUgPSB7XG5cbiAgICBjb25zdHJ1Y3RvcjogQXNzZXRNYW5hZ2VyLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgYnVpbHRpbiAnbWFpbicgYnVuZGxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWGhee9riBtYWluIOWMhVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBtYWluXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge0J1bmRsZX1cbiAgICAgKi9cbiAgICBnZXQgbWFpbiAoKSB7XG4gICAgICAgIHJldHVybiBidW5kbGVzLmdldChCdWlsdGluQnVuZGxlTmFtZS5NQUlOKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgYnVpbHRpbiAncmVzb3VyY2VzJyBidW5kbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5YaF572uIHJlc291cmNlcyDljIVcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgcmVzb3VyY2VzXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge0J1bmRsZX1cbiAgICAgKi9cbiAgICBnZXQgcmVzb3VyY2VzICgpIHtcbiAgICAgICAgcmV0dXJuIGJ1bmRsZXMuZ2V0KEJ1aWx0aW5CdW5kbGVOYW1lLlJFU09VUkNFUyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogVGhlIGJ1aWx0aW4gJ2ludGVybmFsJyBidW5kbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5YaF572uIGludGVybmFsIOWMhVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBpbnRlcm5hbFxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtCdW5kbGV9XG4gICAgICovXG4gICAgZ2V0IGludGVybmFsICgpIHtcbiAgICAgICAgcmV0dXJuIGJ1bmRsZXMuZ2V0KEJ1aWx0aW5CdW5kbGVOYW1lLklOVEVSTkFMKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEluaXRpYWxpemUgYXNzZXRNYW5hZ2VyIHdpdGggb3B0aW9uc1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliJ3lp4vljJbotYTmupDnrqHnkIblmahcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGluaXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGluaXQob3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKi9cbiAgICBpbml0IChvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2ZpbGVzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX3BhcnNlZC5jbGVhcigpO1xuICAgICAgICB0aGlzLl9yZWxlYXNlTWFuYWdlci5pbml0KCk7XG4gICAgICAgIHRoaXMuYXNzZXRzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYnVuZGxlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLnBhY2tNYW5hZ2VyLmluaXQoKTtcbiAgICAgICAgdGhpcy5kb3dubG9hZGVyLmluaXQob3B0aW9ucy5idW5kbGVWZXJzKTtcbiAgICAgICAgdGhpcy5wYXJzZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLmRlcGVuZFV0aWwuaW5pdCgpO1xuICAgICAgICB0aGlzLmdlbmVyYWxJbXBvcnRCYXNlID0gb3B0aW9ucy5pbXBvcnRCYXNlO1xuICAgICAgICB0aGlzLmdlbmVyYWxOYXRpdmVCYXNlID0gb3B0aW9ucy5uYXRpdmVCYXNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIEdldCB0aGUgYnVuZGxlIHdoaWNoIGhhcyBiZWVuIGxvYWRlZFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blt7LliqDovb3nmoTliIbljIVcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldEJ1bmRsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgYnVuZGxlIFxuICAgICAqIEByZXR1cm4ge0J1bmRsZX0gLSBUaGUgbG9hZGVkIGJ1bmRsZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gJHtwcm9qZWN0fS9hc3NldHMvdGVzdDFcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKCd0ZXN0MScpO1xuICAgICAqIFxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUoJ3Jlc291cmNlcycpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0QnVuZGxlIChuYW1lOiBzdHJpbmcpOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlXG4gICAgICovXG4gICAgZ2V0QnVuZGxlIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBidW5kbGVzLmdldChuYW1lKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBSZW1vdmUgdGhpcyBidW5kbGUuIE5PVEU6IFRoZSBhc3NldCB3aHRoaW4gdGhpcyBidW5kbGUgd2lsbCBub3QgYmUgcmVsZWFzZWQgYXV0b21hdGljYWxseSwgeW91IGNhbiBjYWxsIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9yZWxlYXNlQWxsOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtYW51YWxseSBiZWZvcmUgcmVtb3ZlIGl0IGlmIHlvdSBuZWVkXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDnp7vpmaTmraTljIUsIOazqOaEj++8mui/meS4quWMheWGheeahOi1hOa6kOS4jeS8muiHquWKqOmHiuaUviwg5aaC5p6c6ZyA6KaB55qE6K+d5L2g5Y+v5Lul5Zyo5pGn5q+B5LmL5YmN5omL5Yqo6LCD55SoIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9yZWxlYXNlQWxsOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSDov5vooYzph4rmlL5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgcmVtb3ZlQnVuZGxlXG4gICAgICogQHBhcmFtIHtCdW5kbGV9IGJ1bmRsZSAtIFRoZSBidW5kbGUgdG8gYmUgcmVtb3ZlZCBcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJlbW92ZUJ1bmRsZShidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpOiB2b2lkXG4gICAgICovXG4gICAgcmVtb3ZlQnVuZGxlIChidW5kbGUpIHtcbiAgICAgICAgYnVuZGxlLl9kZXN0cm95KCk7XG4gICAgICAgIGJ1bmRsZXMucmVtb3ZlKGJ1bmRsZS5uYW1lKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdlbmVyYWwgaW50ZXJmYWNlIHVzZWQgdG8gbG9hZCBhc3NldHMgd2l0aCBhIHByb2dyZXNzaW9uIGNhbGxiYWNrIGFuZCBhIGNvbXBsZXRlIGNhbGxiYWNrLiBZb3UgY2FuIGFjaGlldmUgYWxtb3N0IGFsbCBlZmZlY3QgeW91IHdhbnQgd2l0aCBjb21iaW5hdGlvbiBvZiBgcmVxdWVzdHNgIGFuZCBgb3B0aW9uc2AuXG4gICAgICogSXQgaXMgaGlnaGx5IHJlY29tbWVuZGVkIHRoYXQgeW91IHVzZSBtb3JlIHNpbXBsZSBBUEksIHN1Y2ggYXMgYGxvYWRgLCBgbG9hZERpcmAgZXRjLiBFdmVyeSBjdXN0b20gcGFyYW1ldGVyIGluIGBvcHRpb25zYCB3aWxsIGJlIGRpc3RyaWJ1dGUgdG8gZWFjaCBvZiBgcmVxdWVzdHNgLiBcbiAgICAgKiBpZiByZXF1ZXN0IGFscmVhZHkgaGFzIHNhbWUgb25lLCB0aGUgcGFyYW1ldGVyIGluIHJlcXVlc3Qgd2lsbCBiZSBnaXZlbiBwcmlvcml0eS4gQmVzaWRlcywgaWYgcmVxdWVzdCBoYXMgZGVwZW5kZW5jaWVzLCBgb3B0aW9uc2Agd2lsbCBkaXN0cmlidXRlIHRvIGRlcGVuZGVuY2llcyB0b28uXG4gICAgICogRXZlcnkgY3VzdG9tIHBhcmFtZXRlciBpbiBgcmVxdWVzdHNgIHdpbGwgYmUgdHJhbmZlcmVkIHRvIGhhbmRsZXIgb2YgYGRvd25sb2FkZXJgIGFuZCBgcGFyc2VyYCBhcyBgb3B0aW9uc2AuIFxuICAgICAqIFlvdSBjYW4gcmVnaXN0ZXIgeW91IG93biBoYW5kbGVyIGRvd25sb2FkZXIgb3IgcGFyc2VyIHRvIGNvbGxlY3QgdGhlc2UgY3VzdG9tIHBhcmFtZXRlcnMgZm9yIHNvbWUgZWZmZWN0LlxuICAgICAqIFxuICAgICAqIFJlc2VydmVkIEtleXdvcmQ6IGB1dWlkYCwgYHVybGAsIGBwYXRoYCwgYGRpcmAsIGBzY2VuZWAsIGB0eXBlYCwgYHByaW9yaXR5YCwgYHByZXNldGAsIGBhdWRpb0xvYWRNb2RlYCwgYGV4dGAsIGBidW5kbGVgLCBgb25GaWxlUHJvZ3Jlc3NgLCBgbWF4Q29uY3VycmVuY3lgLCBgbWF4UmVxdWVzdHNQZXJGcmFtZWBcbiAgICAgKiBgbWF4UmV0cnlDb3VudGAsIGB2ZXJzaW9uYCwgYHJlc3BvbnNlVHlwZWAsIGB3aXRoQ3JlZGVudGlhbHNgLCBgbWltZVR5cGVgLCBgdGltZW91dGAsIGBoZWFkZXJgLCBgcmVsb2FkYCwgYGNhY2hlQXNzZXRgLCBgY2FjaGVFbmFibGVkYCxcbiAgICAgKiBQbGVhc2UgRE8gTk9UIHVzZSB0aGVzZSB3b3JkcyBhcyBjdXN0b20gb3B0aW9ucyFcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6YCa55So5Yqg6L296LWE5rqQ5o6l5Y+j77yM5Y+v5Lyg5YWl6L+b5bqm5Zue6LCD5Lul5Y+K5a6M5oiQ5Zue6LCD77yM6YCa6L+H57uE5ZCIIGByZXF1ZXN0YCDlkowgYG9wdGlvbnNgIOWPguaVsO+8jOWHoOS5juWPr+S7peWunueOsOWSjOaJqeWxleaJgOacieaDs+imgeeahOWKoOi9veaViOaenOOAgumdnuW4uOW7uuiuruS9oOS9v+eUqOabtOeugOWNleeahEFQSe+8jOS+i+WmgiBgbG9hZGDjgIFgbG9hZERpcmAg562J44CCXG4gICAgICogYG9wdGlvbnNgIOS4reeahOiHquWumuS5ieWPguaVsOWwhuS8muWIhuWPkeWIsCBgcmVxdWVzdHNgIOeahOavj+S4gOmhueS4re+8jOWmguaenHJlcXVlc3TkuK3lt7LlrZjlnKjlkIzlkI3nmoTlj4LmlbDliJnku6UgYHJlcXVlc3RzYCDkuK3kuLrlh4bvvIzlkIzml7blpoLmnpzmnInlhbbku5ZcbiAgICAgKiDkvp3otZbotYTmupDvvIzliJkgYG9wdGlvbnNgIOS4reeahOWPguaVsOS8mue7p+e7reWQkeS+nei1lumhueS4reWIhuWPkeOAgnJlcXVlc3TkuK3nmoToh6rlrprkuYnlj4LmlbDpg73kvJrku6UgYG9wdGlvbnNgIOW9ouW8j+S8oOWFpeWKoOi9vea1geeoi+S4reeahCBgZG93bmxvYWRlcmAsIGBwYXJzZXJgIOeahOaWueazleS4rSwg5L2g5Y+v5LulXG4gICAgICog5omp5bGVIGBkb3dubG9hZGVyYCwgYHBhcnNlcmAg5pS26ZuG5Y+C5pWw5a6M5oiQ5oOz5a6e546w55qE5pWI5p6c44CCXG4gICAgICogXG4gICAgICog5L+d55WZ5YWz6ZSu5a2XOiBgdXVpZGAsIGB1cmxgLCBgcGF0aGAsIGBkaXJgLCBgc2NlbmVgLCBgdHlwZWAsIGBwcmlvcml0eWAsIGBwcmVzZXRgLCBgYXVkaW9Mb2FkTW9kZWAsIGBleHRgLCBgYnVuZGxlYCwgYG9uRmlsZVByb2dyZXNzYCwgYG1heENvbmN1cnJlbmN5YCwgYG1heFJlcXVlc3RzUGVyRnJhbWVgXG4gICAgICogYG1heFJldHJ5Q291bnRgLCBgdmVyc2lvbmAsIGByZXNwb25zZVR5cGVgLCBgd2l0aENyZWRlbnRpYWxzYCwgYG1pbWVUeXBlYCwgYHRpbWVvdXRgLCBgaGVhZGVyYCwgYHJlbG9hZGAsIGBjYWNoZUFzc2V0YCwgYGNhY2hlRW5hYmxlZGAsXG4gICAgICog6K+35LiN6KaB5L2/55So6L+Z5Lqb5a2X5q615Li66Ieq5a6a5LmJ5Y+C5pWwIVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgbG9hZEFueVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfE9iamVjdHxPYmplY3RbXX0gcmVxdWVzdHMgLSBUaGUgcmVxdWVzdCB5b3Ugd2FudCB0byBsb2FkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoZWQgLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLnRvdGFsIC0gVGhlIHRvdGFsIG51bWJlciBvZiB0aGUgaXRlbXNcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtfSBvblByb2dyZXNzLml0ZW0gLSBUaGUgY3VycmVudCByZXF1ZXN0IGl0ZW1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gZmluaXNoIGxvYWRpbmdcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBlcnJvciBvY2N1cmVkIGluIGxvYWRpbmcgcHJvY2Vzcy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Db21wbGV0ZS5kYXRhIC0gVGhlIGxvYWRlZCBjb250ZW50XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh7dXJsOiAnaHR0cDovL2V4YW1wbGUuY29tL2EucG5nJ30sIChlcnIsIGltZykgPT4gY2MubG9nKGltZykpO1xuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KFsnNjBzVlhpVEgxRC82QWZ0NE1SdDlWQyddLCAoZXJyLCBhc3NldHMpID0+IGNjLmxvZyhhc3NldHMpKTtcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIubG9hZEFueShbeyB1dWlkOiAnMGNiWmE1WTcxQ1RaQWNjYUlGbHV1Wid9LCB7dXJsOiAnaHR0cDovL2V4YW1wbGUuY29tL2EucG5nJ31dLCAoZXJyLCBhc3NldHMpID0+IGNjLmxvZyhhc3NldHMpKTtcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5yZWdpc3RlcignLmFzc2V0JywgKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4ge1xuICAgICAqICAgICAgdXJsICs9ICc/dXNlck5hbWU9JyArIG9wdGlvbnMudXNlck5hbWUgKyBcIiZwYXNzd29yZD1cIiArIG9wdGlvbnMucGFzc3dvcmQ7XG4gICAgICogICAgICBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5kb3dubG9hZEZpbGUodXJsLCBudWxsLCBvbkNvbXBsZXRlKTtcbiAgICAgKiB9KTtcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIucGFyc2VyLnJlZ2lzdGVyKCcuYXNzZXQnLCAoZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4ge1xuICAgICAqICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKGZpbGUpO1xuICAgICAqICAgICAgdmFyIHNraW4gPSBqc29uW29wdGlvbnMuc2tpbl07XG4gICAgICogICAgICB2YXIgbW9kZWwgPSBqc29uW29wdGlvbnMubW9kZWxdO1xuICAgICAqICAgICAgb25Db21wbGV0ZShudWxsLCB7c2tpbiwgbW9kZWx9KTtcbiAgICAgKiB9KTtcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh7IHVybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS9teS5hc3NldCcsIHNraW46ICd4eHgnLCBtb2RlbDogJ3h4eCcsIHVzZXJOYW1lOiAneHh4JywgcGFzc3dvcmQ6ICd4eHgnIH0pO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvblByb2dyZXNzOiAoZmluaXNoZWQ6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgb25Qcm9ncmVzczogKGZpbmlzaGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IGNjLkFzc2V0TWFuYWdlci5SZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdLCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10pOiB2b2lkXG4gICAgICovXG4gICAgbG9hZEFueSAocmVxdWVzdHMsIG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgICAgICBcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAnZGVmYXVsdCc7XG4gICAgICAgIGxldCB0YXNrID0gbmV3IFRhc2soe2lucHV0OiByZXF1ZXN0cywgb25Qcm9ncmVzcywgb25Db21wbGV0ZTogYXN5bmNpZnkob25Db21wbGV0ZSksIG9wdGlvbnN9KTtcbiAgICAgICAgcGlwZWxpbmUuYXN5bmModGFzayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZW5lcmFsIGludGVyZmFjZSB1c2VkIHRvIHByZWxvYWQgYXNzZXRzIHdpdGggYSBwcm9ncmVzc2lvbiBjYWxsYmFjayBhbmQgYSBjb21wbGV0ZSBjYWxsYmFjay5JdCBpcyBoaWdobHkgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIG1vcmUgc2ltcGxlIEFQSSwgc3VjaCBhcyBgcHJlbG9hZFJlc2AsIGBwcmVsb2FkUmVzRGlyYCBldGMuXG4gICAgICogRXZlcnl0aGluZyBhYm91dCBwcmVsb2FkIGlzIGp1c3QgbGlrZXMgYGNjLmFzc2V0TWFuYWdlci5sb2FkQW55YCwgdGhlIGRpZmZlcmVuY2UgaXMgYGNjLmFzc2V0TWFuYWdlci5wcmVsb2FkQW55YCB3aWxsIG9ubHkgZG93bmxvYWQgYXNzZXQgYnV0IG5vdCBwYXJzZSBhc3NldC4gWW91IG5lZWQgdG8gaW52b2tlIGBjYy5hc3NldE1hbmFnZXIubG9hZEFueShwcmVsb2FkVGFzaylgIFxuICAgICAqIHRvIGZpbmlzaCBsb2FkaW5nIGFzc2V0XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmAmueUqOmihOWKoOi9vei1hOa6kOaOpeWPo++8jOWPr+S8oOWFpei/m+W6puWbnuiwg+S7peWPiuWujOaIkOWbnuiwg++8jOmdnuW4uOW7uuiuruS9oOS9v+eUqOabtOeugOWNleeahCBBUEkg77yM5L6L5aaCIGBwcmVsb2FkUmVzYCwgYHByZWxvYWRSZXNEaXJgIOetieOAgmBwcmVsb2FkQW55YCDlkowgYGxvYWRBbnlgIOWHoOS5juS4gOagt++8jOWMuuWIq+WcqOS6jiBgcHJlbG9hZEFueWAg5Y+q5Lya5LiL6L296LWE5rqQ77yM5LiN5Lya5Y676Kej5p6Q6LWE5rqQ77yM5L2g6ZyA6KaB6LCD55SoIGBjYy5hc3NldE1hbmFnZXIubG9hZEFueShwcmVsb2FkVGFzaylgXG4gICAgICog5p2l5a6M5oiQ6LWE5rqQ5Yqg6L2944CCXG4gICAgICogXG4gICAgICogQG1ldGhvZCBwcmVsb2FkQW55XG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW118T2JqZWN0fE9iamVjdFtdfSByZXF1ZXN0cyAtIFRoZSByZXF1ZXN0IHlvdSB3YW50IHRvIHByZWxvYWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvblByb2dyZXNzXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2hlZCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtc1xuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW19IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBjdXJyZW50IHJlcXVlc3QgaXRlbVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBmaW5pc2ggcHJlbG9hZGluZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIGVycm9yIG9jY3VyZWQgaW4gcHJlbG9hZGluZyBwcm9jZXNzLlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW1bXX0gb25Db21wbGV0ZS5pdGVtcyAtIFRoZSBwcmVsb2FkZWQgY29udGVudFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLnByZWxvYWRBbnkoJzBjYlphNVk3MUNUWkFjY2FJRmx1dVonLCAoZXJyKSA9PiBjYy5hc3NldE1hbmFnZXIubG9hZEFueSgnMGNiWmE1WTcxQ1RaQWNjYUlGbHV1WicpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHByZWxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Qcm9ncmVzczogKGZpbmlzaGVkOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IGNjLkFzc2V0TWFuYWdlci5SZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGl0ZW1zOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBpdGVtczogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgaXRlbXM6IGNjLkFzc2V0TWFuYWdlci5SZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGl0ZW1zOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXG4gICAgICogcHJlbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdKTogdm9pZFxuICAgICAqL1xuICAgIHByZWxvYWRBbnkgKHJlcXVlc3RzLCBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICBcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAncHJlbG9hZCc7XG4gICAgICAgIHZhciB0YXNrID0gbmV3IFRhc2soe2lucHV0OiByZXF1ZXN0cywgb25Qcm9ncmVzcywgb25Db21wbGV0ZTogYXN5bmNpZnkob25Db21wbGV0ZSksIG9wdGlvbnN9KTtcbiAgICAgICAgZmV0Y2hQaXBlbGluZS5hc3luYyh0YXNrKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIExvYWQgbmF0aXZlIGZpbGUgb2YgYXNzZXQsIGlmIHlvdSBjaGVjayB0aGUgb3B0aW9uICdBc3luYyBMb2FkIEFzc2V0cycsIHlvdSBtYXkgbmVlZCB0byBsb2FkIG5hdGl2ZSBmaWxlIHdpdGggdGhpcyBiZWZvcmUgeW91IHVzZSB0aGUgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5Yqg6L296LWE5rqQ55qE5Y6f55Sf5paH5Lu277yM5aaC5p6c5L2g5Yu+6YCJ5LqGJ+W7tui/n+WKoOi9vei1hOa6kCfpgInpobnvvIzkvaDlj6/og73pnIDopoHlnKjkvb/nlKjotYTmupDkuYvliY3osIPnlKjmraTmlrnms5XmnaXliqDovb3ljp/nlJ/mlofku7ZcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHBvc3RMb2FkTmF0aXZlXG4gICAgICogQHBhcmFtIHtBc3NldH0gYXNzZXQgLSBUaGUgYXNzZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGZpbmlzaCBsb2FkaW5nXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgZXJyb3Igb2NjdXJlZCBpbiBsb2FkaW5nIHByb2Nlc3MuXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIucG9zdExvYWROYXRpdmUodGV4dHVyZSwgKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwb3N0TG9hZE5hdGl2ZShhc3NldDogY2MuQXNzZXQsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHBvc3RMb2FkTmF0aXZlKGFzc2V0OiBjYy5Bc3NldCwgb25Db21wbGV0ZTogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcG9zdExvYWROYXRpdmUoYXNzZXQ6IGNjLkFzc2V0LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxuICAgICAqIHBvc3RMb2FkTmF0aXZlKGFzc2V0OiBjYy5Bc3NldCk6IHZvaWRcbiAgICAgKi9cbiAgICBwb3N0TG9hZE5hdGl2ZSAoYXNzZXQsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgaWYgKCEoYXNzZXQgaW5zdGFuY2VvZiBjYy5Bc3NldCkpIHRocm93IG5ldyBFcnJvcignaW5wdXQgaXMgbm90IGFzc2V0Jyk7XG4gICAgICAgIHZhciB7IG9wdGlvbnMsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCB1bmRlZmluZWQsIG9uQ29tcGxldGUpO1xuXG4gICAgICAgIGlmICghYXNzZXQuX25hdGl2ZSB8fCBhc3NldC5fbmF0aXZlQXNzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3luY2lmeShvbkNvbXBsZXRlKShudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZXBlbmQgPSBkZXBlbmRVdGlsLmdldE5hdGl2ZURlcChhc3NldC5fdXVpZCk7XG4gICAgICAgIGlmIChkZXBlbmQpIHtcbiAgICAgICAgICAgIGlmICghYnVuZGxlcy5oYXMoZGVwZW5kLmJ1bmRsZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnVuZGxlID0gYnVuZGxlcy5maW5kKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1bmRsZS5nZXRBc3NldEluZm8oYXNzZXQuX3V1aWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChidW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kLmJ1bmRsZSA9IGJ1bmRsZS5uYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5sb2FkQW55KGRlcGVuZCwgb3B0aW9ucywgZnVuY3Rpb24gKGVyciwgbmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgIWFzc2V0Ll9uYXRpdmVBc3NldCAmJiAoYXNzZXQuX25hdGl2ZUFzc2V0ID0gbmF0aXZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlLCBlcnIuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBMb2FkIHJlbW90ZSBhc3NldCB3aXRoIHVybCwgc3VjaCBhcyBhdWRpbywgaW1hZ2UsIHRleHQgYW5kIHNvIG9uLlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDkvb/nlKggdXJsIOWKoOi9vei/nOeoi+i1hOa6kO+8jOS+i+Wmgumfs+mike+8jOWbvueJh++8jOaWh+acrOetieetieOAglxuICAgICAqIFxuICAgICAqIEBtZXRob2QgbG9hZFJlbW90ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdXJsIG9mIGFzc2V0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7Y2MuQXVkaW9DbGlwLkxvYWRNb2RlfSBbb3B0aW9ucy5hdWRpb0xvYWRNb2RlXSAtIEluZGljYXRlIHdoaWNoIG1vZGUgYXVkaW8geW91IHdhbnQgdG8gbG9hZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBmaW5pc2ggbG9hZGluZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIGVycm9yIG9jY3VyZWQgaW4gbG9hZGluZyBwcm9jZXNzLlxuICAgICAqIEBwYXJhbSB7QXNzZXR9IG9uQ29tcGxldGUuYXNzZXQgLSBUaGUgbG9hZGVkIHRleHR1cmVcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKCdodHRwOi8vd3d3LmNsb3VkLmNvbS90ZXN0MS5qcGcnLCAoZXJyLCB0ZXh0dXJlKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZSgnaHR0cDovL3d3dy5jbG91ZC5jb20vdGVzdDIubXAzJywgKGVyciwgYXVkaW9DbGlwKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxvYWRSZW1vdGU8VCBleHRlbmRzIGNjLkFzc2V0Pih1cmw6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGFzc2V0OiBUKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRSZW1vdGU8VCBleHRlbmRzIGNjLkFzc2V0Pih1cmw6IHN0cmluZywgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGFzc2V0OiBUKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRSZW1vdGU8VCBleHRlbmRzIGNjLkFzc2V0Pih1cmw6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBsb2FkUmVtb3RlPFQgZXh0ZW5kcyBjYy5Bc3NldD4odXJsOiBzdHJpbmcpOiB2b2lkXG4gICAgICovXG4gICAgbG9hZFJlbW90ZSAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IG9wdGlvbnMsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCB1bmRlZmluZWQsIG9uQ29tcGxldGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmFzc2V0cy5oYXModXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFzeW5jaWZ5KG9uQ29tcGxldGUpKG51bGwsIHRoaXMuYXNzZXRzLmdldCh1cmwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMuX19pc05hdGl2ZV9fID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAncmVtb3RlJztcbiAgICAgICAgdGhpcy5sb2FkQW55KHt1cmx9LCBvcHRpb25zLCBudWxsLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVyciwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5LmNyZWF0ZSh1cmwsIGRhdGEsIG9wdGlvbnMuZXh0IHx8IGNjLnBhdGguZXh0bmFtZSh1cmwpLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBMb2FkIHNjcmlwdCBcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5Yqg6L296ISa5pysXG4gICAgICogXG4gICAgICogQG1ldGhvZCBsb2FkU2NyaXB0XG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHVybCAtIFVybCBvZiB0aGUgc2NyaXB0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pc0FzeW5jXSAtIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGxvYWRpbmcgcHJvY2VzcyBzaG91bGQgYmUgYXN5bmNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBDYWxsYmFjayB3aGVuIHNjcmlwdCBsb2FkZWQgb3IgZmFpbGVkXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxvYWRTY3JpcHQoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9pbmRleC5qcycsIG51bGwsIChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZFNjcmlwdCh1cmw6IHN0cmluZ3xzdHJpbmdbXSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkO1xuICAgICAqIGxvYWRTY3JpcHQodXJsOiBzdHJpbmd8c3RyaW5nW10sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yKSA9PiB2b2lkKTogdm9pZDtcbiAgICAgKiBsb2FkU2NyaXB0KHVybDogc3RyaW5nfHN0cmluZ1tdLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZDtcbiAgICAgKiBsb2FkU2NyaXB0KHVybDogc3RyaW5nfHN0cmluZ1tdKTogdm9pZDtcbiAgICAgKi9cbiAgICBsb2FkU2NyaXB0ICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XG4gICAgICAgIG9wdGlvbnMuX19yZXF1ZXN0VHlwZV9fID0gUmVxdWVzdFR5cGUuVVJMO1xuICAgICAgICBvcHRpb25zLnByZXNldCA9IG9wdGlvbnMucHJlc2V0IHx8ICdzY3JpcHQnO1xuICAgICAgICB0aGlzLmxvYWRBbnkodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGxvYWQgYnVuZGxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWKoOi9vei1hOa6kOWMhVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgbG9hZEJ1bmRsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lT3JVcmwgLSBUaGUgbmFtZSBvciByb290IHBhdGggb2YgYnVuZGxlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXIsIHNhbWUgbGlrZSBkb3dubG9hZGVyLmRvd25sb2FkRmlsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy52ZXJzaW9uXSAtIFRoZSB2ZXJzaW9uIG9mIHRoaXMgYnVuZGxlLCB5b3UgY2FuIGNoZWNrIGNvbmZpZy5qc29uIGluIHRoaXMgYnVuZGxlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgd2hlbiBidW5kbGUgbG9hZGVkIG9yIGZhaWxlZFxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHtCdW5kbGV9IG9uQ29tcGxldGUuYnVuZGxlIC0gVGhlIGxvYWRlZCBidW5kbGVcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxvYWRCdW5kbGUoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC90ZXN0JywgbnVsbCwgKGVyciwgYnVuZGxlKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxvYWRCdW5kbGUobmFtZU9yVXJsOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZEJ1bmRsZShuYW1lT3JVcmw6IHN0cmluZywgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkQnVuZGxlKG5hbWVPclVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxuICAgICAqIGxvYWRCdW5kbGUobmFtZU9yVXJsOiBzdHJpbmcpOiB2b2lkXG4gICAgICovXG4gICAgbG9hZEJ1bmRsZSAobmFtZU9yVXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IG9wdGlvbnMsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCB1bmRlZmluZWQsIG9uQ29tcGxldGUpO1xuXG4gICAgICAgIGxldCBidW5kbGVOYW1lID0gY2MucGF0aC5iYXNlbmFtZShuYW1lT3JVcmwpO1xuXG4gICAgICAgIGlmICh0aGlzLmJ1bmRsZXMuaGFzKGJ1bmRsZU5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYXN5bmNpZnkob25Db21wbGV0ZSkobnVsbCwgdGhpcy5nZXRCdW5kbGUoYnVuZGxlTmFtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAnYnVuZGxlJztcbiAgICAgICAgb3B0aW9ucy5leHQgPSAnYnVuZGxlJztcbiAgICAgICAgdGhpcy5sb2FkUmVtb3RlKG5hbWVPclVybCwgb3B0aW9ucywgb25Db21wbGV0ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWxlYXNlIGFzc2V0IGFuZCBpdCdzIGRlcGVuZGVuY2llcy5cbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIG5vdCBvbmx5IHJlbW92ZSB0aGUgY2FjaGUgb2YgdGhlIGFzc2V0IGluIGFzc2V0TWFuYWdlciwgYnV0IGFsc28gY2xlYW4gdXAgaXRzIGNvbnRlbnQuXG4gICAgICogRm9yIGV4YW1wbGUsIGlmIHlvdSByZWxlYXNlIGEgdGV4dHVyZSwgdGhlIHRleHR1cmUgYXNzZXQgYW5kIGl0cyBnbCB0ZXh0dXJlIGRhdGEgd2lsbCBiZSBmcmVlZCB1cC5cbiAgICAgKiBOb3RpY2UsIHRoaXMgbWV0aG9kIG1heSBjYXVzZSB0aGUgdGV4dHVyZSB0byBiZSB1bnVzYWJsZSwgaWYgdGhlcmUgYXJlIHN0aWxsIG90aGVyIG5vZGVzIHVzZSB0aGUgc2FtZSB0ZXh0dXJlLCB0aGV5IG1heSB0dXJuIHRvIGJsYWNrIGFuZCByZXBvcnQgZ2wgZXJyb3JzLlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDph4rmlL7otYTmupDku6Xlj4rlhbbkvp3otZbotYTmupAsIOi/meS4quaWueazleS4jeS7heS8muS7jiBhc3NldE1hbmFnZXIg5Lit5Yig6Zmk6LWE5rqQ55qE57yT5a2Y5byV55So77yM6L+Y5Lya5riF55CG5a6D55qE6LWE5rqQ5YaF5a6544CCXG4gICAgICog5q+U5aaC6K+077yM5b2T5L2g6YeK5pS+5LiA5LiqIHRleHR1cmUg6LWE5rqQ77yM6L+Z5LiqIHRleHR1cmUg5ZKM5a6D55qEIGdsIOi0tOWbvuaVsOaNrumDveS8muiiq+mHiuaUvuOAglxuICAgICAqIOazqOaEj++8jOi/meS4quWHveaVsOWPr+iDveS8muWvvOiHtOi1hOa6kOi0tOWbvuaIlui1hOa6kOaJgOS+nei1lueahOi0tOWbvuS4jeWPr+eUqO+8jOWmguaenOWcuuaZr+S4reWtmOWcqOiKgueCueS7jeeEtuS+nei1luWQjOagt+eahOi0tOWbvu+8jOWug+S7rOWPr+iDveS8muWPmOm7keW5tuaKpSBHTCDplJnor6/jgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgcmVsZWFzZUFzc2V0XG4gICAgICogQHBhcmFtIHtBc3NldH0gYXNzZXQgLSBUaGUgYXNzZXQgdG8gYmUgcmVsZWFzZWRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHJlbGVhc2UgYSB0ZXh0dXJlIHdoaWNoIGlzIG5vIGxvbmdlciBuZWVkXG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCh0ZXh0dXJlKTtcbiAgICAgKlxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcmVsZWFzZUFzc2V0KGFzc2V0OiBjYy5Bc3NldCk6IHZvaWRcbiAgICAgKi9cbiAgICByZWxlYXNlQXNzZXQgKGFzc2V0KSB7XG4gICAgICAgIHJlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UoYXNzZXQsIHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFJlbGVhc2UgYWxsIHVudXNlZCBhc3NldHMuIFJlZmVyIHRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDph4rmlL7miYDmnInmsqHmnInnlKjliLDnmoTotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgcmVsZWFzZVVudXNlZEFzc2V0c1xuICAgICAqIEBwcml2YXRlXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWxlYXNlVW51c2VkQXNzZXRzKCk6IHZvaWRcbiAgICAgKi9cbiAgICByZWxlYXNlVW51c2VkQXNzZXRzICgpIHtcbiAgICAgICAgYXNzZXRzLmZvckVhY2goZnVuY3Rpb24gKGFzc2V0KSB7XG4gICAgICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKGFzc2V0KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVsZWFzZSBhbGwgYXNzZXRzLiBSZWZlciB0byB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb25zLlxuICAgICAqIFxuICAgICAqICEjemggXG4gICAgICog6YeK5pS+5omA5pyJ6LWE5rqQ44CC6K+m57uG5L+h5oGv6K+35Y+C6ICDIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VBbGxcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJlbGVhc2VBbGwoKTogdm9pZFxuICAgICAqL1xuICAgIHJlbGVhc2VBbGwgKCkge1xuICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgIHJlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UoYXNzZXQsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX3RyYW5zZm9ybSAoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHN1YlRhc2sgPSBUYXNrLmNyZWF0ZSh7aW5wdXQsIG9wdGlvbnN9KTtcbiAgICAgICAgdmFyIHVybHMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cmFuc2Zvcm1QaXBlbGluZS5zeW5jKHN1YlRhc2spO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZXN1bHQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSByZXN1bHRbaV07XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IGl0ZW0udXJsO1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVjeWNsZSgpO1xuICAgICAgICAgICAgICAgIHVybHMucHVzaCh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YlRhc2sub3V0cHV0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHN1YlRhc2sub3V0cHV0W2ldLnJlY3ljbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmVycm9yKGUubWVzc2FnZSwgZS5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgc3ViVGFzay5yZWN5Y2xlKCk7XG4gICAgICAgIHJldHVybiB1cmxzLmxlbmd0aCA+IDEgPyB1cmxzIDogdXJsc1swXTtcbiAgICB9XG59O1xuXG5jYy5Bc3NldE1hbmFnZXIgPSBBc3NldE1hbmFnZXI7XG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuLyoqXG4gKiBAcHJvcGVydHkgYXNzZXRNYW5hZ2VyXG4gKiBAdHlwZSB7QXNzZXRNYW5hZ2VyfVxuICovXG5jYy5hc3NldE1hbmFnZXIgPSBuZXcgQXNzZXRNYW5hZ2VyKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYywgJ3Jlc291cmNlcycsIHtcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogY2MucmVzb3VyY2VzIGlzIGEgYnVuZGxlIGFuZCBjb250cm9scyBhbGwgYXNzZXQgdW5kZXIgYXNzZXRzL3Jlc291cmNlc1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiBjYy5yZXNvdXJjZXMg5piv5LiA5LiqIGJ1bmRsZe+8jOeUqOS6jueuoeeQhuaJgOacieWcqCBhc3NldHMvcmVzb3VyY2VzIOS4i+eahOi1hOa6kFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSByZXNvdXJjZXNcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7QXNzZXRNYW5hZ2VyLkJ1bmRsZX1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gYnVuZGxlcy5nZXQoQnVpbHRpbkJ1bmRsZU5hbWUuUkVTT1VSQ0VTKTtcbiAgICB9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLmFzc2V0TWFuYWdlcjtcblxuLyoqXG4gKiAhI2VuXG4gKiBUaGlzIG1vZHVsZSBjb250cm9scyBhc3NldCdzIGJlaGF2aW9ycyBhbmQgaW5mb3JtYXRpb24sIGluY2x1ZGUgbG9hZGluZywgcmVsZWFzaW5nIGV0Yy4gXG4gKiBBbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXJgLiBBbGwgY2xhc3Mgb3IgZW51bSBjYW4gYmUgYWNjZXNzZWQgd2l0aCBgY2MuQXNzZXRNYW5hZ2VyYFxuICogXG4gKiAhI3poXG4gKiDmraTmqKHlnZfnrqHnkIbotYTmupDnmoTooYzkuLrlkozkv6Hmga/vvIzljIXmi6zliqDovb3vvIzph4rmlL7nrYnvvIzmiYDmnInmiJDlkZjog73lpJ/pgJrov4cgYGNjLmFzc2V0TWFuYWdlcmAg6LCD55SoLiDmiYDmnInnsbvlnovmiJbmnprkuL7og73pgJrov4cgYGNjLkFzc2V0TWFuYWdlcmAg6K6/6ZeuXG4gKiBcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXG4gKi8iXSwic291cmNlUm9vdCI6Ii8ifQ==