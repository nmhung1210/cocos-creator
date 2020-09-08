
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
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onComplete: (err: Error, data: any) => void): void
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
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
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
   * postLoadNative(asset: cc.Asset, options: Record<string, any>): void
   * postLoadNative(asset: cc.Asset, onComplete: (err: Error) => void): void
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
   * loadRemote<T extends cc.Asset>(url: string, options: Record<string, any>): void
   * loadRemote<T extends cc.Asset>(url: string, onComplete: (err: Error, asset: T) => void): void
   * loadRemote<T extends cc.Asset>(url: string): void
   */
  loadRemote: function loadRemote(url, options, onComplete) {
    var _parseParameters4 = parseParameters(options, undefined, onComplete),
        options = _parseParameters4.options,
        onComplete = _parseParameters4.onComplete;

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
   * loadScript(url: string|string[], options: Record<string, any>): void;
   * loadScript(url: string|string[], onComplete: (err: Error) => void): void;
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
   * loadBundle(nameOrUrl: string, options: Record<string, any>): void
   * loadBundle(nameOrUrl: string, onComplete: (err: Error, bundle: cc.AssetManager.Bundle) => void): void
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvQ0NBc3NldE1hbmFnZXIuanMiXSwibmFtZXMiOlsicHJlcHJvY2VzcyIsInJlcXVpcmUiLCJmZXRjaCIsIkNhY2hlIiwiaGVscGVyIiwicmVsZWFzZU1hbmFnZXIiLCJkZXBlbmRVdGlsIiwibG9hZCIsIlBpcGVsaW5lIiwiVGFzayIsIlJlcXVlc3RJdGVtIiwiZG93bmxvYWRlciIsInBhcnNlciIsInBhY2tNYW5hZ2VyIiwiQnVuZGxlIiwiYnVpbHRpbnMiLCJmYWN0b3J5IiwicGFyc2UiLCJjb21iaW5lIiwicGFyc2VQYXJhbWV0ZXJzIiwiYXN5bmNpZnkiLCJhc3NldHMiLCJmaWxlcyIsInBhcnNlZCIsInBpcGVsaW5lIiwidHJhbnNmb3JtUGlwZWxpbmUiLCJmZXRjaFBpcGVsaW5lIiwiUmVxdWVzdFR5cGUiLCJidW5kbGVzIiwiQnVpbHRpbkJ1bmRsZU5hbWUiLCJBc3NldE1hbmFnZXIiLCJfcHJlcHJvY2Vzc1BpcGUiLCJfZmV0Y2hQaXBlIiwiX2xvYWRQaXBlIiwiYXBwZW5kIiwiX2ZpbGVzIiwiX3BhcnNlZCIsImdlbmVyYWxJbXBvcnRCYXNlIiwiZ2VuZXJhbE5hdGl2ZUJhc2UiLCJfcmVsZWFzZU1hbmFnZXIiLCJjYWNoZUFzc2V0IiwiZm9yY2UiLCJ1dGlscyIsImNhY2hlTWFuYWdlciIsInByZXNldHMiLCJwcmlvcml0eSIsIm1heENvbmN1cnJlbmN5IiwibWF4UmVxdWVzdHNQZXJGcmFtZSIsIm1heFJldHJ5Q291bnQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm1haW4iLCJnZXQiLCJNQUlOIiwicmVzb3VyY2VzIiwiUkVTT1VSQ0VTIiwiaW50ZXJuYWwiLCJJTlRFUk5BTCIsImluaXQiLCJvcHRpb25zIiwiT2JqZWN0IiwiY3JlYXRlIiwiY2xlYXIiLCJidW5kbGVWZXJzIiwiaW1wb3J0QmFzZSIsIm5hdGl2ZUJhc2UiLCJnZXRCdW5kbGUiLCJuYW1lIiwicmVtb3ZlQnVuZGxlIiwiYnVuZGxlIiwiX2Rlc3Ryb3kiLCJyZW1vdmUiLCJsb2FkQW55IiwicmVxdWVzdHMiLCJvblByb2dyZXNzIiwib25Db21wbGV0ZSIsInByZXNldCIsInRhc2siLCJpbnB1dCIsImFzeW5jIiwicHJlbG9hZEFueSIsInBvc3RMb2FkTmF0aXZlIiwiYXNzZXQiLCJjYyIsIkFzc2V0IiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJfbmF0aXZlIiwiX25hdGl2ZUFzc2V0IiwiZGVwZW5kIiwiZ2V0TmF0aXZlRGVwIiwiX3V1aWQiLCJoYXMiLCJmaW5kIiwiZ2V0QXNzZXRJbmZvIiwiZXJyIiwibmF0aXZlIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhY2siLCJsb2FkUmVtb3RlIiwidXJsIiwiX19pc05hdGl2ZV9fIiwiZGF0YSIsImV4dCIsInBhdGgiLCJleHRuYW1lIiwibG9hZFNjcmlwdCIsIl9fcmVxdWVzdFR5cGVfXyIsIlVSTCIsImxvYWRCdW5kbGUiLCJuYW1lT3JVcmwiLCJidW5kbGVOYW1lIiwiYmFzZW5hbWUiLCJyZWxlYXNlQXNzZXQiLCJ0cnlSZWxlYXNlIiwicmVsZWFzZVVudXNlZEFzc2V0cyIsImZvckVhY2giLCJyZWxlYXNlQWxsIiwiX3RyYW5zZm9ybSIsInN1YlRhc2siLCJ1cmxzIiwicmVzdWx0Iiwic3luYyIsImkiLCJsIiwibGVuZ3RoIiwiaXRlbSIsInJlY3ljbGUiLCJwdXNoIiwiZSIsIm91dHB1dCIsImFzc2V0TWFuYWdlciIsImRlZmluZVByb3BlcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUExQjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQU1FLEtBQUssR0FBR0YsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBTUcsTUFBTSxHQUFHSCxP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T0FBTDtBQUNBUCxRQUFBQSxJQUFJLENBQUNRLElBQUwsQ0FBVTVCLEdBQVY7QUFDSDtBQUNKLEtBUkQsQ0FTQSxPQUFPNkIsQ0FBUCxFQUFVO0FBQ04sV0FBSyxJQUFJTixDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdMLE9BQU8sQ0FBQ1csTUFBUixDQUFlTCxNQUFuQyxFQUEyQ0YsQ0FBQyxHQUFHQyxDQUEvQyxFQUFrREQsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuREosUUFBQUEsT0FBTyxDQUFDVyxNQUFSLENBQWVQLENBQWYsRUFBa0JJLE9BQWxCO0FBQ0g7O0FBQ0Q3QyxNQUFBQSxFQUFFLENBQUNjLEtBQUgsQ0FBU2lDLENBQUMsQ0FBQ2hDLE9BQVgsRUFBb0JnQyxDQUFDLENBQUMvQixLQUF0QjtBQUNIOztBQUNEcUIsSUFBQUEsT0FBTyxDQUFDUSxPQUFSO0FBQ0EsV0FBT1AsSUFBSSxDQUFDSyxNQUFMLEdBQWMsQ0FBZCxHQUFrQkwsSUFBbEIsR0FBeUJBLElBQUksQ0FBQyxDQUFELENBQXBDO0FBQ0g7QUFyZG9CLENBQXpCO0FBd2RBdEMsRUFBRSxDQUFDckQsWUFBSCxHQUFrQkEsWUFBbEI7QUFDQTs7OztBQUdBOzs7OztBQUlBcUQsRUFBRSxDQUFDaUQsWUFBSCxHQUFrQixJQUFJdEcsWUFBSixFQUFsQjtBQUVBOEIsTUFBTSxDQUFDeUUsY0FBUCxDQUFzQmxELEVBQXRCLEVBQTBCLFdBQTFCLEVBQXVDO0FBQ25DOzs7Ozs7Ozs7OztBQVdBL0IsRUFBQUEsR0FabUMsaUJBWTVCO0FBQ0gsV0FBT3hCLE9BQU8sQ0FBQ3dCLEdBQVIsQ0FBWXZCLGlCQUFpQixDQUFDMEIsU0FBOUIsQ0FBUDtBQUNIO0FBZGtDLENBQXZDO0FBa0JBK0UsTUFBTSxDQUFDQyxPQUFQLEdBQWlCcEQsRUFBRSxDQUFDaUQsWUFBcEI7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgcHJlcHJvY2VzcyA9IHJlcXVpcmUoJy4vcHJlcHJvY2VzcycpO1xuY29uc3QgZmV0Y2ggPSByZXF1aXJlKCcuL2ZldGNoJyk7XG5jb25zdCBDYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUnKTtcbmNvbnN0IGhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVyJyk7XG5jb25zdCByZWxlYXNlTWFuYWdlciA9IHJlcXVpcmUoJy4vcmVsZWFzZU1hbmFnZXInKTtcbmNvbnN0IGRlcGVuZFV0aWwgPSByZXF1aXJlKCcuL2RlcGVuZC11dGlsJyk7XG5jb25zdCBsb2FkID0gcmVxdWlyZSgnLi9sb2FkJyk7XG5jb25zdCBQaXBlbGluZSA9IHJlcXVpcmUoJy4vcGlwZWxpbmUnKTtcbmNvbnN0IFRhc2sgPSByZXF1aXJlKCcuL3Rhc2snKTtcbmNvbnN0IFJlcXVlc3RJdGVtID0gcmVxdWlyZSgnLi9yZXF1ZXN0LWl0ZW0nKTtcbmNvbnN0IGRvd25sb2FkZXIgPSByZXF1aXJlKCcuL2Rvd25sb2FkZXInKTtcbmNvbnN0IHBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyJyk7XG5jb25zdCBwYWNrTWFuYWdlciA9IHJlcXVpcmUoJy4vcGFjay1tYW5hZ2VyJyk7XG5jb25zdCBCdW5kbGUgPSByZXF1aXJlKCcuL2J1bmRsZScpO1xuY29uc3QgYnVpbHRpbnMgPSByZXF1aXJlKCcuL2J1aWx0aW5zJyk7XG5jb25zdCBmYWN0b3J5ID0gcmVxdWlyZSgnLi9mYWN0b3J5Jyk7XG5jb25zdCB7IHBhcnNlLCBjb21iaW5lIH0gPSByZXF1aXJlKCcuL3VybFRyYW5zZm9ybWVyJyk7XG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycywgYXN5bmNpZnkgfSA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzJyk7XG5jb25zdCB7IGFzc2V0cywgZmlsZXMsIHBhcnNlZCwgcGlwZWxpbmUsIHRyYW5zZm9ybVBpcGVsaW5lLCBmZXRjaFBpcGVsaW5lLCBSZXF1ZXN0VHlwZSwgYnVuZGxlcywgQnVpbHRpbkJ1bmRsZU5hbWUgfSA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XG5cblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cbi8qKlxuICogISNlblxuICogVGhpcyBtb2R1bGUgY29udHJvbHMgYXNzZXQncyBiZWhhdmlvcnMgYW5kIGluZm9ybWF0aW9uLCBpbmNsdWRlIGxvYWRpbmcsIHJlbGVhc2luZyBldGMuIGl0IGlzIGEgc2luZ2xldG9uXG4gKiBBbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXJgLlxuICogXG4gKiAhI3poXG4gKiDmraTmqKHlnZfnrqHnkIbotYTmupDnmoTooYzkuLrlkozkv6Hmga/vvIzljIXmi6zliqDovb3vvIzph4rmlL7nrYnvvIzov5nmmK/kuIDkuKrljZXkvovvvIzmiYDmnInmiJDlkZjog73lpJ/pgJrov4cgYGNjLmFzc2V0TWFuYWdlcmAg6LCD55SoXG4gKiBcbiAqIEBjbGFzcyBBc3NldE1hbmFnZXJcbiAqL1xuZnVuY3Rpb24gQXNzZXRNYW5hZ2VyICgpIHtcblxuICAgIHRoaXMuX3ByZXByb2Nlc3NQaXBlID0gcHJlcHJvY2VzcztcblxuICAgIHRoaXMuX2ZldGNoUGlwZSA9IGZldGNoO1xuXG4gICAgdGhpcy5fbG9hZFBpcGUgPSBsb2FkO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBOb3JtYWwgbG9hZGluZyBwaXBlbGluZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmraPluLjliqDovb3nrqHnur9cbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgcGlwZWxpbmVcbiAgICAgKiBAdHlwZSB7UGlwZWxpbmV9XG4gICAgICovXG4gICAgdGhpcy5waXBlbGluZSA9IHBpcGVsaW5lLmFwcGVuZChwcmVwcm9jZXNzKS5hcHBlbmQobG9hZCk7XG4gICAgXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBGZXRjaGluZyBwaXBlbGluZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDkuIvovb3nrqHnur9cbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgZmV0Y2hQaXBlbGluZVxuICAgICAqIEB0eXBlIHtQaXBlbGluZX1cbiAgICAgKi9cbiAgICB0aGlzLmZldGNoUGlwZWxpbmUgPSBmZXRjaFBpcGVsaW5lLmFwcGVuZChwcmVwcm9jZXNzKS5hcHBlbmQoZmV0Y2gpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBVcmwgdHJhbnNmb3JtZXJcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICogVXJsIOi9rOaNouWZqFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSB0cmFuc2Zvcm1QaXBlbGluZVxuICAgICAqIEB0eXBlIHtQaXBlbGluZX1cbiAgICAgKi9cbiAgICB0aGlzLnRyYW5zZm9ybVBpcGVsaW5lID0gdHJhbnNmb3JtUGlwZWxpbmUuYXBwZW5kKHBhcnNlKS5hcHBlbmQoY29tYmluZSk7XG5cblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogVGhlIGNvbGxlY3Rpb24gb2YgYnVuZGxlIHdoaWNoIGlzIGFscmVhZHkgbG9hZGVkLCB5b3UgY2FuIHJlbW92ZSBjYWNoZSB3aXRoIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZW1vdmVCdW5kbGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOW3suWKoOi9vSBidW5kbGUg55qE6ZuG5ZCI77yMIOS9oOiDvemAmui/hyB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVtb3ZlQnVuZGxlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSDmnaXnp7vpmaTnvJPlrZhcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgYnVuZGxlc1xuICAgICAqIEB0eXBlIHtDYWNoZX1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGJ1bmRsZXM6IEFzc2V0TWFuYWdlci5DYWNoZTxBc3NldE1hbmFnZXIuQnVuZGxlPlxuICAgICAqL1xuICAgIHRoaXMuYnVuZGxlcyA9IGJ1bmRsZXM7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFRoZSBjb2xsZWN0aW9uIG9mIGFzc2V0IHdoaWNoIGlzIGFscmVhZHkgbG9hZGVkLCB5b3UgY2FuIHJlbW92ZSBjYWNoZSB3aXRoIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOW3suWKoOi9vei1hOa6kOeahOmbhuWQiO+8jCDkvaDog73pgJrov4cge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0g5p2l56e76Zmk57yT5a2YXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGFzc2V0c1xuICAgICAqIEB0eXBlIHtDYWNoZX1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGFzc2V0czogQXNzZXRNYW5hZ2VyLkNhY2hlPGNjLkFzc2V0PlxuICAgICAqL1xuICAgIHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuICAgIFxuICAgIHRoaXMuX2ZpbGVzID0gZmlsZXM7XG4gICAgXG4gICAgdGhpcy5fcGFyc2VkID0gcGFyc2VkO1xuXG4gICAgdGhpcy5nZW5lcmFsSW1wb3J0QmFzZSA9ICcnO1xuXG4gICAgdGhpcy5nZW5lcmFsTmF0aXZlQmFzZSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBNYW5hZ2UgcmVsYXRpb25zaGlwIGJldHdlZW4gYXNzZXQgYW5kIGl0cyBkZXBlbmRlbmNpZXNcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog566h55CG6LWE5rqQ5L6d6LWW5YWz57O7XG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGRlcGVuZFV0aWxcbiAgICAgKiBAdHlwZSB7RGVwZW5kVXRpbH1cbiAgICAgKi9cbiAgICB0aGlzLmRlcGVuZFV0aWwgPSBkZXBlbmRVdGlsO1xuXG4gICAgdGhpcy5fcmVsZWFzZU1hbmFnZXIgPSByZWxlYXNlTWFuYWdlcjtcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogV2hldGhlciBvciBub3QgY2FjaGUgdGhlIGxvYWRlZCBhc3NldFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmmK/lkKbnvJPlrZjlt7LliqDovb3nmoTotYTmupBcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgY2FjaGVBc3NldFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuY2FjaGVBc3NldCA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFdoZXRoZXIgb3Igbm90IGxvYWQgYXNzZXQgZm9yY2VseSwgaWYgaXQgaXMgdHJ1ZSwgYXNzZXQgd2lsbCBiZSBsb2FkZWQgcmVnYXJkbGVzcyBvZiBlcnJvclxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmmK/lkKblvLrliLbliqDovb3otYTmupAsIOWmguaenOS4uiB0cnVlIO+8jOWKoOi9vei1hOa6kOWwhuS8muW/veeVpeaKpemUmVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBmb3JjZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuZm9yY2UgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogU29tZSB1c2VmdWwgZnVuY3Rpb25cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5LiA5Lqb5pyJ55So55qE5pa55rOVXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHV0aWxzXG4gICAgICogQHR5cGUge0hlbHBlcn1cbiAgICAgKi9cbiAgICB0aGlzLnV0aWxzID0gaGVscGVyO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBNYW5hZ2UgYWxsIGRvd25sb2FkaW5nIHRhc2tcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog566h55CG5omA5pyJ5LiL6L295Lu75YqhXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGRvd25sb2FkZXJcbiAgICAgKiBAdHlwZSB7RG93bmxvYWRlcn1cbiAgICAgKi9cbiAgICB0aGlzLmRvd25sb2FkZXIgPSBkb3dubG9hZGVyOyBcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogTWFuYWdlIGFsbCBwYXJzaW5nIHRhc2tcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog566h55CG5omA5pyJ6Kej5p6Q5Lu75YqhXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHBhcnNlclxuICAgICAqIEB0eXBlIHtQYXJzZXJ9XG4gICAgICovXG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIE1hbmFnZSBpbnRlcm5hbCBhc3NldFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDnrqHnkIblhoXnva7otYTmupBcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgYnVpbHRpbnNcbiAgICAgKiBAdHlwZSB7QnVpbHRpbnN9XG4gICAgICovXG4gICAgdGhpcy5idWlsdGlucyA9IGJ1aWx0aW5zO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBNYW5hZ2UgYWxsIHBhY2tlZCBhc3NldFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDnrqHnkIbmiYDmnInlkIjlubblkI7nmoTotYTmupBcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgcGFja01hbmFnZXJcbiAgICAgKiBAdHlwZSB7UGFja01hbmFnZXJ9XG4gICAgICovXG4gICAgdGhpcy5wYWNrTWFuYWdlciA9IHBhY2tNYW5hZ2VyO1xuXG4gICAgdGhpcy5mYWN0b3J5ID0gZmFjdG9yeTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogQ2FjaGUgbWFuYWdlciBpcyBhIG1vZHVsZSB3aGljaCBjb250cm9scyBhbGwgY2FjaGVzIGRvd25sb2FkZWQgZnJvbSBzZXJ2ZXIgaW4gbm9uLXdlYiBwbGF0Zm9ybS5cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog57yT5a2Y566h55CG5Zmo5piv5LiA5Liq5qih5Z2X77yM5Zyo6Z2eIFdFQiDlubPlj7DkuIrvvIznlKjkuo7nrqHnkIbmiYDmnInku47mnI3liqHlmajkuIrkuIvovb3kuIvmnaXnmoTnvJPlrZhcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgY2FjaGVNYW5hZ2VyXG4gICAgICogQHR5cGUge2NjLkFzc2V0TWFuYWdlci5DYWNoZU1hbmFnZXJ9XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjYWNoZU1hbmFnZXI6IGNjLkFzc2V0TWFuYWdlci5DYWNoZU1hbmFnZXJ8bnVsbFxuICAgICAqL1xuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogVGhlIHByZXNldCBvZiBvcHRpb25zXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWPr+mAieWPguaVsOeahOmihOiuvumbhlxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBwcmVzZXRzXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHByZXNldHM6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+XG4gICAgICovXG4gICAgdGhpcy5wcmVzZXRzID0ge1xuICAgICAgICAnZGVmYXVsdCc6IHtcbiAgICAgICAgICAgIHByaW9yaXR5OiAwLFxuICAgICAgICB9LFxuXG4gICAgICAgICdwcmVsb2FkJzoge1xuICAgICAgICAgICAgbWF4Q29uY3VycmVuY3k6IDIsIFxuICAgICAgICAgICAgbWF4UmVxdWVzdHNQZXJGcmFtZTogMixcbiAgICAgICAgICAgIHByaW9yaXR5OiAtMSxcbiAgICAgICAgfSxcblxuICAgICAgICAnc2NlbmUnOiB7XG4gICAgICAgICAgICBtYXhDb25jdXJyZW5jeTogOCwgXG4gICAgICAgICAgICBtYXhSZXF1ZXN0c1BlckZyYW1lOiA4LFxuICAgICAgICAgICAgcHJpb3JpdHk6IDEsXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ2J1bmRsZSc6IHtcbiAgICAgICAgICAgIG1heENvbmN1cnJlbmN5OiA4LCBcbiAgICAgICAgICAgIG1heFJlcXVlc3RzUGVyRnJhbWU6IDgsXG4gICAgICAgICAgICBwcmlvcml0eTogMixcbiAgICAgICAgfSxcblxuICAgICAgICAncmVtb3RlJzoge1xuICAgICAgICAgICAgbWF4UmV0cnlDb3VudDogNFxuICAgICAgICB9LFxuXG4gICAgICAgICdzY3JpcHQnOiB7XG4gICAgICAgICAgICBwcmlvcml0eTogMlxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbkFzc2V0TWFuYWdlci5QaXBlbGluZSA9IFBpcGVsaW5lO1xuQXNzZXRNYW5hZ2VyLlRhc2sgPSBUYXNrO1xuQXNzZXRNYW5hZ2VyLkNhY2hlID0gQ2FjaGU7XG5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0gPSBSZXF1ZXN0SXRlbTtcbkFzc2V0TWFuYWdlci5CdW5kbGUgPSBCdW5kbGU7XG5Bc3NldE1hbmFnZXIuQnVpbHRpbkJ1bmRsZU5hbWUgPSBCdWlsdGluQnVuZGxlTmFtZTtcblxuQXNzZXRNYW5hZ2VyLnByb3RvdHlwZSA9IHtcblxuICAgIGNvbnN0cnVjdG9yOiBBc3NldE1hbmFnZXIsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFRoZSBidWlsdGluICdtYWluJyBidW5kbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5YaF572uIG1haW4g5YyFXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IG1haW5cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7QnVuZGxlfVxuICAgICAqL1xuICAgIGdldCBtYWluICgpIHtcbiAgICAgICAgcmV0dXJuIGJ1bmRsZXMuZ2V0KEJ1aWx0aW5CdW5kbGVOYW1lLk1BSU4pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFRoZSBidWlsdGluICdyZXNvdXJjZXMnIGJ1bmRsZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlhoXnva4gcmVzb3VyY2VzIOWMhVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSByZXNvdXJjZXNcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7QnVuZGxlfVxuICAgICAqL1xuICAgIGdldCByZXNvdXJjZXMgKCkge1xuICAgICAgICByZXR1cm4gYnVuZGxlcy5nZXQoQnVpbHRpbkJ1bmRsZU5hbWUuUkVTT1VSQ0VTKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgYnVpbHRpbiAnaW50ZXJuYWwnIGJ1bmRsZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlhoXnva4gaW50ZXJuYWwg5YyFXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGludGVybmFsXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge0J1bmRsZX1cbiAgICAgKi9cbiAgICBnZXQgaW50ZXJuYWwgKCkge1xuICAgICAgICByZXR1cm4gYnVuZGxlcy5nZXQoQnVpbHRpbkJ1bmRsZU5hbWUuSU5URVJOQUwpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSW5pdGlhbGl6ZSBhc3NldE1hbmFnZXIgd2l0aCBvcHRpb25zXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWIneWni+WMlui1hOa6kOeuoeeQhuWZqFxuICAgICAqIFxuICAgICAqIEBtZXRob2QgaW5pdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogaW5pdChvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxuICAgICAqL1xuICAgIGluaXQgKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZmlsZXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fcGFyc2VkLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX3JlbGVhc2VNYW5hZ2VyLmluaXQoKTtcbiAgICAgICAgdGhpcy5hc3NldHMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5idW5kbGVzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMucGFja01hbmFnZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLmRvd25sb2FkZXIuaW5pdChvcHRpb25zLmJ1bmRsZVZlcnMpO1xuICAgICAgICB0aGlzLnBhcnNlci5pbml0KCk7XG4gICAgICAgIHRoaXMuZGVwZW5kVXRpbC5pbml0KCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhbEltcG9ydEJhc2UgPSBvcHRpb25zLmltcG9ydEJhc2U7XG4gICAgICAgIHRoaXMuZ2VuZXJhbE5hdGl2ZUJhc2UgPSBvcHRpb25zLm5hdGl2ZUJhc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogR2V0IHRoZSBidW5kbGUgd2hpY2ggaGFzIGJlZW4gbG9hZGVkXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluW3suWKoOi9veeahOWIhuWMhVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZ2V0QnVuZGxlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiBidW5kbGUgXG4gICAgICogQHJldHVybiB7QnVuZGxlfSAtIFRoZSBsb2FkZWQgYnVuZGxlXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyAke3Byb2plY3R9L2Fzc2V0cy90ZXN0MVxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUoJ3Rlc3QxJyk7XG4gICAgICogXG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZSgncmVzb3VyY2VzJyk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRCdW5kbGUgKG5hbWU6IHN0cmluZyk6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGVcbiAgICAgKi9cbiAgICBnZXRCdW5kbGUgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGJ1bmRsZXMuZ2V0KG5hbWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIFJlbW92ZSB0aGlzIGJ1bmRsZS4gTk9URTogVGhlIGFzc2V0IHdodGhpbiB0aGlzIGJ1bmRsZSB3aWxsIG5vdCBiZSByZWxlYXNlZCBhdXRvbWF0aWNhbGx5LCB5b3UgY2FuIGNhbGwge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1hbnVhbGx5IGJlZm9yZSByZW1vdmUgaXQgaWYgeW91IG5lZWRcbiAgICAgKiBcbiAgICAgKiAhI3poIFxuICAgICAqIOenu+mZpOatpOWMhSwg5rOo5oSP77ya6L+Z5Liq5YyF5YaF55qE6LWE5rqQ5LiN5Lya6Ieq5Yqo6YeK5pS+LCDlpoLmnpzpnIDopoHnmoTor53kvaDlj6/ku6XlnKjmkafmr4HkuYvliY3miYvliqjosIPnlKgge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOi/m+ihjOmHiuaUvlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZW1vdmVCdW5kbGVcbiAgICAgKiBAcGFyYW0ge0J1bmRsZX0gYnVuZGxlIC0gVGhlIGJ1bmRsZSB0byBiZSByZW1vdmVkIFxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcmVtb3ZlQnVuZGxlKGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSk6IHZvaWRcbiAgICAgKi9cbiAgICByZW1vdmVCdW5kbGUgKGJ1bmRsZSkge1xuICAgICAgICBidW5kbGUuX2Rlc3Ryb3koKTtcbiAgICAgICAgYnVuZGxlcy5yZW1vdmUoYnVuZGxlLm5hbWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2VuZXJhbCBpbnRlcmZhY2UgdXNlZCB0byBsb2FkIGFzc2V0cyB3aXRoIGEgcHJvZ3Jlc3Npb24gY2FsbGJhY2sgYW5kIGEgY29tcGxldGUgY2FsbGJhY2suIFlvdSBjYW4gYWNoaWV2ZSBhbG1vc3QgYWxsIGVmZmVjdCB5b3Ugd2FudCB3aXRoIGNvbWJpbmF0aW9uIG9mIGByZXF1ZXN0c2AgYW5kIGBvcHRpb25zYC5cbiAgICAgKiBJdCBpcyBoaWdobHkgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIG1vcmUgc2ltcGxlIEFQSSwgc3VjaCBhcyBgbG9hZGAsIGBsb2FkRGlyYCBldGMuIEV2ZXJ5IGN1c3RvbSBwYXJhbWV0ZXIgaW4gYG9wdGlvbnNgIHdpbGwgYmUgZGlzdHJpYnV0ZSB0byBlYWNoIG9mIGByZXF1ZXN0c2AuIFxuICAgICAqIGlmIHJlcXVlc3QgYWxyZWFkeSBoYXMgc2FtZSBvbmUsIHRoZSBwYXJhbWV0ZXIgaW4gcmVxdWVzdCB3aWxsIGJlIGdpdmVuIHByaW9yaXR5LiBCZXNpZGVzLCBpZiByZXF1ZXN0IGhhcyBkZXBlbmRlbmNpZXMsIGBvcHRpb25zYCB3aWxsIGRpc3RyaWJ1dGUgdG8gZGVwZW5kZW5jaWVzIHRvby5cbiAgICAgKiBFdmVyeSBjdXN0b20gcGFyYW1ldGVyIGluIGByZXF1ZXN0c2Agd2lsbCBiZSB0cmFuZmVyZWQgdG8gaGFuZGxlciBvZiBgZG93bmxvYWRlcmAgYW5kIGBwYXJzZXJgIGFzIGBvcHRpb25zYC4gXG4gICAgICogWW91IGNhbiByZWdpc3RlciB5b3Ugb3duIGhhbmRsZXIgZG93bmxvYWRlciBvciBwYXJzZXIgdG8gY29sbGVjdCB0aGVzZSBjdXN0b20gcGFyYW1ldGVycyBmb3Igc29tZSBlZmZlY3QuXG4gICAgICogXG4gICAgICogUmVzZXJ2ZWQgS2V5d29yZDogYHV1aWRgLCBgdXJsYCwgYHBhdGhgLCBgZGlyYCwgYHNjZW5lYCwgYHR5cGVgLCBgcHJpb3JpdHlgLCBgcHJlc2V0YCwgYGF1ZGlvTG9hZE1vZGVgLCBgZXh0YCwgYGJ1bmRsZWAsIGBvbkZpbGVQcm9ncmVzc2AsIGBtYXhDb25jdXJyZW5jeWAsIGBtYXhSZXF1ZXN0c1BlckZyYW1lYFxuICAgICAqIGBtYXhSZXRyeUNvdW50YCwgYHZlcnNpb25gLCBgcmVzcG9uc2VUeXBlYCwgYHdpdGhDcmVkZW50aWFsc2AsIGBtaW1lVHlwZWAsIGB0aW1lb3V0YCwgYGhlYWRlcmAsIGByZWxvYWRgLCBgY2FjaGVBc3NldGAsIGBjYWNoZUVuYWJsZWRgLFxuICAgICAqIFBsZWFzZSBETyBOT1QgdXNlIHRoZXNlIHdvcmRzIGFzIGN1c3RvbSBvcHRpb25zIVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpgJrnlKjliqDovb3otYTmupDmjqXlj6PvvIzlj6/kvKDlhaXov5vluqblm57osIPku6Xlj4rlrozmiJDlm57osIPvvIzpgJrov4fnu4TlkIggYHJlcXVlc3RgIOWSjCBgb3B0aW9uc2Ag5Y+C5pWw77yM5Yeg5LmO5Y+v5Lul5a6e546w5ZKM5omp5bGV5omA5pyJ5oOz6KaB55qE5Yqg6L295pWI5p6c44CC6Z2e5bi45bu66K6u5L2g5L2/55So5pu0566A5Y2V55qEQVBJ77yM5L6L5aaCIGBsb2FkYOOAgWBsb2FkRGlyYCDnrYnjgIJcbiAgICAgKiBgb3B0aW9uc2Ag5Lit55qE6Ieq5a6a5LmJ5Y+C5pWw5bCG5Lya5YiG5Y+R5YiwIGByZXF1ZXN0c2Ag55qE5q+P5LiA6aG55Lit77yM5aaC5p6ccmVxdWVzdOS4reW3suWtmOWcqOWQjOWQjeeahOWPguaVsOWImeS7pSBgcmVxdWVzdHNgIOS4reS4uuWHhu+8jOWQjOaXtuWmguaenOacieWFtuS7llxuICAgICAqIOS+nei1lui1hOa6kO+8jOWImSBgb3B0aW9uc2Ag5Lit55qE5Y+C5pWw5Lya57un57ut5ZCR5L6d6LWW6aG55Lit5YiG5Y+R44CCcmVxdWVzdOS4reeahOiHquWumuS5ieWPguaVsOmDveS8muS7pSBgb3B0aW9uc2Ag5b2i5byP5Lyg5YWl5Yqg6L295rWB56iL5Lit55qEIGBkb3dubG9hZGVyYCwgYHBhcnNlcmAg55qE5pa55rOV5LitLCDkvaDlj6/ku6VcbiAgICAgKiDmianlsZUgYGRvd25sb2FkZXJgLCBgcGFyc2VyYCDmlLbpm4blj4LmlbDlrozmiJDmg7Plrp7njrDnmoTmlYjmnpzjgIJcbiAgICAgKiBcbiAgICAgKiDkv53nlZnlhbPplK7lrZc6IGB1dWlkYCwgYHVybGAsIGBwYXRoYCwgYGRpcmAsIGBzY2VuZWAsIGB0eXBlYCwgYHByaW9yaXR5YCwgYHByZXNldGAsIGBhdWRpb0xvYWRNb2RlYCwgYGV4dGAsIGBidW5kbGVgLCBgb25GaWxlUHJvZ3Jlc3NgLCBgbWF4Q29uY3VycmVuY3lgLCBgbWF4UmVxdWVzdHNQZXJGcmFtZWBcbiAgICAgKiBgbWF4UmV0cnlDb3VudGAsIGB2ZXJzaW9uYCwgYHJlc3BvbnNlVHlwZWAsIGB3aXRoQ3JlZGVudGlhbHNgLCBgbWltZVR5cGVgLCBgdGltZW91dGAsIGBoZWFkZXJgLCBgcmVsb2FkYCwgYGNhY2hlQXNzZXRgLCBgY2FjaGVFbmFibGVkYCxcbiAgICAgKiDor7fkuI3opoHkvb/nlKjov5nkupvlrZfmrrXkuLroh6rlrprkuYnlj4LmlbAhXG4gICAgICogXG4gICAgICogQG1ldGhvZCBsb2FkQW55XG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW118T2JqZWN0fE9iamVjdFtdfSByZXF1ZXN0cyAtIFRoZSByZXF1ZXN0IHlvdSB3YW50IHRvIGxvYWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvblByb2dyZXNzXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2hlZCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtc1xuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW19IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBjdXJyZW50IHJlcXVlc3QgaXRlbVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBmaW5pc2ggbG9hZGluZ1xuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIGVycm9yIG9jY3VyZWQgaW4gbG9hZGluZyBwcm9jZXNzLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbkNvbXBsZXRlLmRhdGEgLSBUaGUgbG9hZGVkIGNvbnRlbnRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHt1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vYS5wbmcnfSwgKGVyciwgaW1nKSA9PiBjYy5sb2coaW1nKSk7XG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoWyc2MHNWWGlUSDFELzZBZnQ0TVJ0OVZDJ10sIChlcnIsIGFzc2V0cykgPT4gY2MubG9nKGFzc2V0cykpO1xuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KFt7IHV1aWQ6ICcwY2JaYTVZNzFDVFpBY2NhSUZsdXVaJ30sIHt1cmw6ICdodHRwOi8vZXhhbXBsZS5jb20vYS5wbmcnfV0sIChlcnIsIGFzc2V0cykgPT4gY2MubG9nKGFzc2V0cykpO1xuICAgICAqIGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyLnJlZ2lzdGVyKCcuYXNzZXQnLCAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiB7XG4gICAgICogICAgICB1cmwgKz0gJz91c2VyTmFtZT0nICsgb3B0aW9ucy51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgb3B0aW9ucy5wYXNzd29yZDtcbiAgICAgKiAgICAgIGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyLmRvd25sb2FkRmlsZSh1cmwsIG51bGwsIG9uQ29tcGxldGUpO1xuICAgICAqIH0pO1xuICAgICAqIGNjLmFzc2V0TWFuYWdlci5wYXJzZXIucmVnaXN0ZXIoJy5hc3NldCcsIChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiB7XG4gICAgICogICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UoZmlsZSk7XG4gICAgICogICAgICB2YXIgc2tpbiA9IGpzb25bb3B0aW9ucy5za2luXTtcbiAgICAgKiAgICAgIHZhciBtb2RlbCA9IGpzb25bb3B0aW9ucy5tb2RlbF07XG4gICAgICogICAgICBvbkNvbXBsZXRlKG51bGwsIHtza2luLCBtb2RlbH0pO1xuICAgICAqIH0pO1xuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHsgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tL215LmFzc2V0Jywgc2tpbjogJ3h4eCcsIG1vZGVsOiAneHh4JywgdXNlck5hbWU6ICd4eHgnLCBwYXNzd29yZDogJ3h4eCcgfSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdLCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSk6IHZvaWRcbiAgICAgKi9cbiAgICBsb2FkQW55IChyZXF1ZXN0cywgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xuICAgICAgICB2YXIgeyBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlIH0gPSBwYXJzZVBhcmFtZXRlcnMob3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgICAgIFxuICAgICAgICBvcHRpb25zLnByZXNldCA9IG9wdGlvbnMucHJlc2V0IHx8ICdkZWZhdWx0JztcbiAgICAgICAgbGV0IHRhc2sgPSBuZXcgVGFzayh7aW5wdXQ6IHJlcXVlc3RzLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlOiBhc3luY2lmeShvbkNvbXBsZXRlKSwgb3B0aW9uc30pO1xuICAgICAgICBwaXBlbGluZS5hc3luYyh0YXNrKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdlbmVyYWwgaW50ZXJmYWNlIHVzZWQgdG8gcHJlbG9hZCBhc3NldHMgd2l0aCBhIHByb2dyZXNzaW9uIGNhbGxiYWNrIGFuZCBhIGNvbXBsZXRlIGNhbGxiYWNrLkl0IGlzIGhpZ2hseSByZWNvbW1lbmRlZCB0aGF0IHlvdSB1c2UgbW9yZSBzaW1wbGUgQVBJLCBzdWNoIGFzIGBwcmVsb2FkUmVzYCwgYHByZWxvYWRSZXNEaXJgIGV0Yy5cbiAgICAgKiBFdmVyeXRoaW5nIGFib3V0IHByZWxvYWQgaXMganVzdCBsaWtlcyBgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnlgLCB0aGUgZGlmZmVyZW5jZSBpcyBgY2MuYXNzZXRNYW5hZ2VyLnByZWxvYWRBbnlgIHdpbGwgb25seSBkb3dubG9hZCBhc3NldCBidXQgbm90IHBhcnNlIGFzc2V0LiBZb3UgbmVlZCB0byBpbnZva2UgYGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHByZWxvYWRUYXNrKWAgXG4gICAgICogdG8gZmluaXNoIGxvYWRpbmcgYXNzZXRcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6YCa55So6aKE5Yqg6L296LWE5rqQ5o6l5Y+j77yM5Y+v5Lyg5YWl6L+b5bqm5Zue6LCD5Lul5Y+K5a6M5oiQ5Zue6LCD77yM6Z2e5bi45bu66K6u5L2g5L2/55So5pu0566A5Y2V55qEIEFQSSDvvIzkvovlpoIgYHByZWxvYWRSZXNgLCBgcHJlbG9hZFJlc0RpcmAg562J44CCYHByZWxvYWRBbnlgIOWSjCBgbG9hZEFueWAg5Yeg5LmO5LiA5qC377yM5Yy65Yir5Zyo5LqOIGBwcmVsb2FkQW55YCDlj6rkvJrkuIvovb3otYTmupDvvIzkuI3kvJrljrvop6PmnpDotYTmupDvvIzkvaDpnIDopoHosIPnlKggYGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHByZWxvYWRUYXNrKWBcbiAgICAgKiDmnaXlrozmiJDotYTmupDliqDovb3jgIJcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHByZWxvYWRBbnlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXXxPYmplY3R8T2JqZWN0W119IHJlcXVlc3RzIC0gVGhlIHJlcXVlc3QgeW91IHdhbnQgdG8gcHJlbG9hZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHByb2dyZXNzaW9uIGNoYW5nZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmZpbmlzaGVkIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbX0gb25Qcm9ncmVzcy5pdGVtIC0gVGhlIGN1cnJlbnQgcmVxdWVzdCBpdGVtXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGZpbmlzaCBwcmVsb2FkaW5nXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgZXJyb3Igb2NjdXJlZCBpbiBwcmVsb2FkaW5nIHByb2Nlc3MuXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbVtdfSBvbkNvbXBsZXRlLml0ZW1zIC0gVGhlIHByZWxvYWRlZCBjb250ZW50XG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIucHJlbG9hZEFueSgnMGNiWmE1WTcxQ1RaQWNjYUlGbHV1WicsIChlcnIpID0+IGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KCcwY2JaYTVZNzFDVFpBY2NhSUZsdXVaJykpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcHJlbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvblByb2dyZXNzOiAoZmluaXNoZWQ6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgaXRlbXM6IGNjLkFzc2V0TWFuYWdlci5SZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGl0ZW1zOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBpdGVtczogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZEFueShyZXF1ZXN0czogc3RyaW5nIHwgc3RyaW5nW10gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdLCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgaXRlbXM6IGNjLkFzc2V0TWFuYWdlci5SZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWRBbnkocmVxdWVzdHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgUmVjb3JkPHN0cmluZywgYW55PiB8IFJlY29yZDxzdHJpbmcsIGFueT5bXSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10pOiB2b2lkXG4gICAgICovXG4gICAgcHJlbG9hZEFueSAocmVxdWVzdHMsIG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgIFxuICAgICAgICBvcHRpb25zLnByZXNldCA9IG9wdGlvbnMucHJlc2V0IHx8ICdwcmVsb2FkJztcbiAgICAgICAgdmFyIHRhc2sgPSBuZXcgVGFzayh7aW5wdXQ6IHJlcXVlc3RzLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlOiBhc3luY2lmeShvbkNvbXBsZXRlKSwgb3B0aW9uc30pO1xuICAgICAgICBmZXRjaFBpcGVsaW5lLmFzeW5jKHRhc2spO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTG9hZCBuYXRpdmUgZmlsZSBvZiBhc3NldCwgaWYgeW91IGNoZWNrIHRoZSBvcHRpb24gJ0FzeW5jIExvYWQgQXNzZXRzJywgeW91IG1heSBuZWVkIHRvIGxvYWQgbmF0aXZlIGZpbGUgd2l0aCB0aGlzIGJlZm9yZSB5b3UgdXNlIHRoZSBhc3NldFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliqDovb3otYTmupDnmoTljp/nlJ/mlofku7bvvIzlpoLmnpzkvaDli77pgInkuoYn5bu26L+f5Yqg6L296LWE5rqQJ+mAiemhue+8jOS9oOWPr+iDvemcgOimgeWcqOS9v+eUqOi1hOa6kOS5i+WJjeiwg+eUqOatpOaWueazleadpeWKoOi9veWOn+eUn+aWh+S7tlxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcG9zdExvYWROYXRpdmVcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fSBhc3NldCAtIFRoZSBhc3NldFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gZmluaXNoIGxvYWRpbmdcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBlcnJvciBvY2N1cmVkIGluIGxvYWRpbmcgcHJvY2Vzcy5cbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh0ZXh0dXJlLCAoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHBvc3RMb2FkTmF0aXZlKGFzc2V0OiBjYy5Bc3NldCwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcG9zdExvYWROYXRpdmUoYXNzZXQ6IGNjLkFzc2V0LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxuICAgICAqIHBvc3RMb2FkTmF0aXZlKGFzc2V0OiBjYy5Bc3NldCwgb25Db21wbGV0ZTogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcG9zdExvYWROYXRpdmUoYXNzZXQ6IGNjLkFzc2V0KTogdm9pZFxuICAgICAqL1xuICAgIHBvc3RMb2FkTmF0aXZlIChhc3NldCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICBpZiAoIShhc3NldCBpbnN0YW5jZW9mIGNjLkFzc2V0KSkgdGhyb3cgbmV3IEVycm9yKCdpbnB1dCBpcyBub3QgYXNzZXQnKTtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XG5cbiAgICAgICAgaWYgKCFhc3NldC5fbmF0aXZlIHx8IGFzc2V0Ll9uYXRpdmVBc3NldCkge1xuICAgICAgICAgICAgcmV0dXJuIGFzeW5jaWZ5KG9uQ29tcGxldGUpKG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlcGVuZCA9IGRlcGVuZFV0aWwuZ2V0TmF0aXZlRGVwKGFzc2V0Ll91dWlkKTtcbiAgICAgICAgaWYgKGRlcGVuZCkge1xuICAgICAgICAgICAgaWYgKCFidW5kbGVzLmhhcyhkZXBlbmQuYnVuZGxlKSkge1xuICAgICAgICAgICAgICAgIHZhciBidW5kbGUgPSBidW5kbGVzLmZpbmQoZnVuY3Rpb24gKGJ1bmRsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVuZGxlLmdldEFzc2V0SW5mbyhhc3NldC5fdXVpZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGJ1bmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBkZXBlbmQuYnVuZGxlID0gYnVuZGxlLm5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvYWRBbnkoZGVwZW5kLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyLCBuYXRpdmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAhYXNzZXQuX25hdGl2ZUFzc2V0ICYmIChhc3NldC5fbmF0aXZlQXNzZXQgPSBuYXRpdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIExvYWQgcmVtb3RlIGFzc2V0IHdpdGggdXJsLCBzdWNoIGFzIGF1ZGlvLCBpbWFnZSwgdGV4dCBhbmQgc28gb24uXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOS9v+eUqCB1cmwg5Yqg6L296L+c56iL6LWE5rqQ77yM5L6L5aaC6Z+z6aKR77yM5Zu+54mH77yM5paH5pys562J562J44CCXG4gICAgICogXG4gICAgICogQG1ldGhvZCBsb2FkUmVtb3RlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFRoZSB1cmwgb2YgYXNzZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtjYy5BdWRpb0NsaXAuTG9hZE1vZGV9IFtvcHRpb25zLmF1ZGlvTG9hZE1vZGVdIC0gSW5kaWNhdGUgd2hpY2ggbW9kZSBhdWRpbyB5b3Ugd2FudCB0byBsb2FkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGZpbmlzaCBsb2FkaW5nXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgZXJyb3Igb2NjdXJlZCBpbiBsb2FkaW5nIHByb2Nlc3MuXG4gICAgICogQHBhcmFtIHtBc3NldH0gb25Db21wbGV0ZS5hc3NldCAtIFRoZSBsb2FkZWQgdGV4dHVyZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoJ2h0dHA6Ly93d3cuY2xvdWQuY29tL3Rlc3QxLmpwZycsIChlcnIsIHRleHR1cmUpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKCdodHRwOi8vd3d3LmNsb3VkLmNvbS90ZXN0Mi5tcDMnLCAoZXJyLCBhdWRpb0NsaXApID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZFJlbW90ZTxUIGV4dGVuZHMgY2MuQXNzZXQ+KHVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgYXNzZXQ6IFQpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZFJlbW90ZTxUIGV4dGVuZHMgY2MuQXNzZXQ+KHVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxuICAgICAqIGxvYWRSZW1vdGU8VCBleHRlbmRzIGNjLkFzc2V0Pih1cmw6IHN0cmluZywgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGFzc2V0OiBUKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRSZW1vdGU8VCBleHRlbmRzIGNjLkFzc2V0Pih1cmw6IHN0cmluZyk6IHZvaWRcbiAgICAgKi9cbiAgICBsb2FkUmVtb3RlICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XG5cbiAgICAgICAgb3B0aW9ucy5fX2lzTmF0aXZlX18gPSB0cnVlO1xuICAgICAgICBvcHRpb25zLnByZXNldCA9IG9wdGlvbnMucHJlc2V0IHx8ICdyZW1vdGUnO1xuICAgICAgICB0aGlzLmxvYWRBbnkoe3VybH0sIG9wdGlvbnMsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkuY3JlYXRlKHVybCwgZGF0YSwgb3B0aW9ucy5leHQgfHwgY2MucGF0aC5leHRuYW1lKHVybCksIG9wdGlvbnMsIG9uQ29tcGxldGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIExvYWQgc2NyaXB0IFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliqDovb3ohJrmnKxcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGxvYWRTY3JpcHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gdXJsIC0gVXJsIG9mIHRoZSBzY3JpcHRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmlzQXN5bmNdIC0gSW5kaWNhdGUgd2hldGhlciBvciBub3QgbG9hZGluZyBwcm9jZXNzIHNob3VsZCBiZSBhc3luY1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gc2NyaXB0IGxvYWRlZCBvciBmYWlsZWRcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbG9hZFNjcmlwdCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2luZGV4LmpzJywgbnVsbCwgKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsb2FkU2NyaXB0KHVybDogc3RyaW5nfHN0cmluZ1tdLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvcikgPT4gdm9pZCk6IHZvaWQ7XG4gICAgICogbG9hZFNjcmlwdCh1cmw6IHN0cmluZ3xzdHJpbmdbXSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQ7XG4gICAgICogbG9hZFNjcmlwdCh1cmw6IHN0cmluZ3xzdHJpbmdbXSwgb25Db21wbGV0ZTogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkO1xuICAgICAqIGxvYWRTY3JpcHQodXJsOiBzdHJpbmd8c3RyaW5nW10pOiB2b2lkO1xuICAgICAqL1xuICAgIGxvYWRTY3JpcHQgKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xuICAgICAgICB2YXIgeyBvcHRpb25zLCBvbkNvbXBsZXRlIH0gPSBwYXJzZVBhcmFtZXRlcnMob3B0aW9ucywgdW5kZWZpbmVkLCBvbkNvbXBsZXRlKTtcbiAgICAgICAgb3B0aW9ucy5fX3JlcXVlc3RUeXBlX18gPSBSZXF1ZXN0VHlwZS5VUkw7XG4gICAgICAgIG9wdGlvbnMucHJlc2V0ID0gb3B0aW9ucy5wcmVzZXQgfHwgJ3NjcmlwdCc7XG4gICAgICAgIHRoaXMubG9hZEFueSh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogbG9hZCBidW5kbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5Yqg6L296LWE5rqQ5YyFXG4gICAgICogXG4gICAgICogQG1ldGhvZCBsb2FkQnVuZGxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVPclVybCAtIFRoZSBuYW1lIG9yIHJvb3QgcGF0aCBvZiBidW5kbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlciwgc2FtZSBsaWtlIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnZlcnNpb25dIC0gVGhlIHZlcnNpb24gb2YgdGhpcyBidW5kbGUsIHlvdSBjYW4gY2hlY2sgY29uZmlnLmpzb24gaW4gdGhpcyBidW5kbGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBDYWxsYmFjayB3aGVuIGJ1bmRsZSBsb2FkZWQgb3IgZmFpbGVkXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBAcGFyYW0ge0J1bmRsZX0gb25Db21wbGV0ZS5idW5kbGUgLSBUaGUgbG9hZGVkIGJ1bmRsZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbG9hZEJ1bmRsZSgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Rlc3QnLCBudWxsLCAoZXJyLCBidW5kbGUpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZEJ1bmRsZShuYW1lT3JVcmw6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkQnVuZGxlKG5hbWVPclVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxuICAgICAqIGxvYWRCdW5kbGUobmFtZU9yVXJsOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZEJ1bmRsZShuYW1lT3JVcmw6IHN0cmluZyk6IHZvaWRcbiAgICAgKi9cbiAgICBsb2FkQnVuZGxlIChuYW1lT3JVcmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XG5cbiAgICAgICAgbGV0IGJ1bmRsZU5hbWUgPSBjYy5wYXRoLmJhc2VuYW1lKG5hbWVPclVybCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYnVuZGxlcy5oYXMoYnVuZGxlTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBhc3luY2lmeShvbkNvbXBsZXRlKShudWxsLCB0aGlzLmdldEJ1bmRsZShidW5kbGVOYW1lKSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnByZXNldCA9IG9wdGlvbnMucHJlc2V0IHx8ICdidW5kbGUnO1xuICAgICAgICBvcHRpb25zLmV4dCA9ICdidW5kbGUnO1xuICAgICAgICB0aGlzLmxvYWRSZW1vdGUobmFtZU9yVXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlbGVhc2UgYXNzZXQgYW5kIGl0J3MgZGVwZW5kZW5jaWVzLlxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgbm90IG9ubHkgcmVtb3ZlIHRoZSBjYWNoZSBvZiB0aGUgYXNzZXQgaW4gYXNzZXRNYW5hZ2VyLCBidXQgYWxzbyBjbGVhbiB1cCBpdHMgY29udGVudC5cbiAgICAgKiBGb3IgZXhhbXBsZSwgaWYgeW91IHJlbGVhc2UgYSB0ZXh0dXJlLCB0aGUgdGV4dHVyZSBhc3NldCBhbmQgaXRzIGdsIHRleHR1cmUgZGF0YSB3aWxsIGJlIGZyZWVkIHVwLlxuICAgICAqIE5vdGljZSwgdGhpcyBtZXRob2QgbWF5IGNhdXNlIHRoZSB0ZXh0dXJlIHRvIGJlIHVudXNhYmxlLCBpZiB0aGVyZSBhcmUgc3RpbGwgb3RoZXIgbm9kZXMgdXNlIHRoZSBzYW1lIHRleHR1cmUsIHRoZXkgbWF5IHR1cm4gdG8gYmxhY2sgYW5kIHJlcG9ydCBnbCBlcnJvcnMuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmHiuaUvui1hOa6kOS7peWPiuWFtuS+nei1lui1hOa6kCwg6L+Z5Liq5pa55rOV5LiN5LuF5Lya5LuOIGFzc2V0TWFuYWdlciDkuK3liKDpmaTotYTmupDnmoTnvJPlrZjlvJXnlKjvvIzov5jkvJrmuIXnkIblroPnmoTotYTmupDlhoXlrrnjgIJcbiAgICAgKiDmr5TlpoLor7TvvIzlvZPkvaDph4rmlL7kuIDkuKogdGV4dHVyZSDotYTmupDvvIzov5nkuKogdGV4dHVyZSDlkozlroPnmoQgZ2wg6LS05Zu+5pWw5o2u6YO95Lya6KKr6YeK5pS+44CCXG4gICAgICog5rOo5oSP77yM6L+Z5Liq5Ye95pWw5Y+v6IO95Lya5a+86Ie06LWE5rqQ6LS05Zu+5oiW6LWE5rqQ5omA5L6d6LWW55qE6LS05Zu+5LiN5Y+v55So77yM5aaC5p6c5Zy65pmv5Lit5a2Y5Zyo6IqC54K55LuN54S25L6d6LWW5ZCM5qC355qE6LS05Zu+77yM5a6D5Lus5Y+v6IO95Lya5Y+Y6buR5bm25oqlIEdMIOmUmeivr+OAglxuICAgICAqXG4gICAgICogQG1ldGhvZCByZWxlYXNlQXNzZXRcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fSBhc3NldCAtIFRoZSBhc3NldCB0byBiZSByZWxlYXNlZFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gcmVsZWFzZSBhIHRleHR1cmUgd2hpY2ggaXMgbm8gbG9uZ2VyIG5lZWRcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KHRleHR1cmUpO1xuICAgICAqXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWxlYXNlQXNzZXQoYXNzZXQ6IGNjLkFzc2V0KTogdm9pZFxuICAgICAqL1xuICAgIHJlbGVhc2VBc3NldCAoYXNzZXQpIHtcbiAgICAgICAgcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZShhc3NldCwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVsZWFzZSBhbGwgdW51c2VkIGFzc2V0cy4gUmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gZm9yIGRldGFpbGVkIGluZm9ybWF0aW9ucy5cbiAgICAgKiBcbiAgICAgKiAhI3poIFxuICAgICAqIOmHiuaUvuaJgOacieayoeacieeUqOWIsOeahOi1hOa6kOOAguivpue7huS/oeaBr+ivt+WPguiAgyB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICAgICAqXG4gICAgICogQG1ldGhvZCByZWxlYXNlVW51c2VkQXNzZXRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJlbGVhc2VVbnVzZWRBc3NldHMoKTogdm9pZFxuICAgICAqL1xuICAgIHJlbGVhc2VVbnVzZWRBc3NldHMgKCkge1xuICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgIHJlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UoYXNzZXQpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBSZWxlYXNlIGFsbCBhc3NldHMuIFJlZmVyIHRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDph4rmlL7miYDmnInotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cbiAgICAgKlxuICAgICAqIEBtZXRob2QgcmVsZWFzZUFsbFxuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcmVsZWFzZUFsbCgpOiB2b2lkXG4gICAgICovXG4gICAgcmVsZWFzZUFsbCAoKSB7XG4gICAgICAgIGFzc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NldCkge1xuICAgICAgICAgICAgcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZShhc3NldCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfdHJhbnNmb3JtIChpbnB1dCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgc3ViVGFzayA9IFRhc2suY3JlYXRlKHtpbnB1dCwgb3B0aW9uc30pO1xuICAgICAgICB2YXIgdXJscyA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRyYW5zZm9ybVBpcGVsaW5lLnN5bmMoc3ViVGFzayk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlc3VsdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc3VsdFtpXTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gaXRlbS51cmw7XG4gICAgICAgICAgICAgICAgaXRlbS5yZWN5Y2xlKCk7XG4gICAgICAgICAgICAgICAgdXJscy5wdXNoKHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gc3ViVGFzay5vdXRwdXQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3ViVGFzay5vdXRwdXRbaV0ucmVjeWNsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MuZXJyb3IoZS5tZXNzYWdlLCBlLnN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJUYXNrLnJlY3ljbGUoKTtcbiAgICAgICAgcmV0dXJuIHVybHMubGVuZ3RoID4gMSA/IHVybHMgOiB1cmxzWzBdO1xuICAgIH1cbn07XG5cbmNjLkFzc2V0TWFuYWdlciA9IEFzc2V0TWFuYWdlcjtcbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG4vKipcbiAqIEBwcm9wZXJ0eSBhc3NldE1hbmFnZXJcbiAqIEB0eXBlIHtBc3NldE1hbmFnZXJ9XG4gKi9cbmNjLmFzc2V0TWFuYWdlciA9IG5ldyBBc3NldE1hbmFnZXIoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGNjLCAncmVzb3VyY2VzJywge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBjYy5yZXNvdXJjZXMgaXMgYSBidW5kbGUgYW5kIGNvbnRyb2xzIGFsbCBhc3NldCB1bmRlciBhc3NldHMvcmVzb3VyY2VzXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIGNjLnJlc291cmNlcyDmmK/kuIDkuKogYnVuZGxl77yM55So5LqO566h55CG5omA5pyJ5ZyoIGFzc2V0cy9yZXNvdXJjZXMg5LiL55qE6LWE5rqQXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHJlc291cmNlc1xuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtBc3NldE1hbmFnZXIuQnVuZGxlfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiBidW5kbGVzLmdldChCdWlsdGluQnVuZGxlTmFtZS5SRVNPVVJDRVMpO1xuICAgIH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gY2MuYXNzZXRNYW5hZ2VyO1xuXG4vKipcbiAqICEjZW5cbiAqIFRoaXMgbW9kdWxlIGNvbnRyb2xzIGFzc2V0J3MgYmVoYXZpb3JzIGFuZCBpbmZvcm1hdGlvbiwgaW5jbHVkZSBsb2FkaW5nLCByZWxlYXNpbmcgZXRjLiBcbiAqIEFsbCBtZW1iZXIgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmFzc2V0TWFuYWdlcmAuIEFsbCBjbGFzcyBvciBlbnVtIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5Bc3NldE1hbmFnZXJgXG4gKiBcbiAqICEjemhcbiAqIOatpOaooeWdl+euoeeQhui1hOa6kOeahOihjOS4uuWSjOS/oeaBr++8jOWMheaLrOWKoOi9ve+8jOmHiuaUvuetie+8jOaJgOacieaIkOWRmOiDveWkn+mAmui/hyBgY2MuYXNzZXRNYW5hZ2VyYCDosIPnlKguIOaJgOacieexu+Wei+aIluaemuS4vuiDvemAmui/hyBgY2MuQXNzZXRNYW5hZ2VyYCDorr/pl65cbiAqIFxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcbiAqLyJdLCJzb3VyY2VSb290IjoiLyJ9