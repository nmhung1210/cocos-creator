
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/bundle.js';
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
var Config = require('./config');

var releaseManager = require('./releaseManager');

var _require = require('./utilities'),
    parseParameters = _require.parseParameters,
    parseLoadResArgs = _require.parseLoadResArgs;

var _require2 = require('./shared'),
    RequestType = _require2.RequestType,
    assets = _require2.assets,
    bundles = _require2.bundles;
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * A bundle contains an amount of assets(includes scene), you can load, preload, release asset which is in this bundle
 * 
 * !#zh
 * 一个包含一定数量资源（包括场景）的包，你可以加载，预加载，释放此包内的资源
 * 
 * @class Bundle
 */


function Bundle() {
  this._config = new Config();
}

Bundle.prototype = {
  /**
   * !#en
   * Create a bundle
   * 
   * !#zh
   * 创建一个 bundle
   * 
   * @method constructor
   * 
   * @typescript
   * constructor()
   */
  constructor: Bundle,

  /**
   * !#en
   * The name of this bundle
   * 
   * !#zh
   * 此 bundle 的名称
   * 
   * @property name
   * @type {string}
   */
  get name() {
    return this._config.name;
  },

  /**
   * !#en
   * The dependency of this bundle
   * 
   * !#zh
   * 此 bundle 的依赖
   * 
   * @property deps
   * @type {string[]}
   */
  get deps() {
    return this._config.deps;
  },

  /**
   * !#en
   * The root path of this bundle, such like 'http://example.com/bundle1'
   * 
   * !#zh
   * 此 bundle 的根路径, 例如 'http://example.com/bundle1'
   * 
   * @property base
   * @type {string}
   */
  get base() {
    return this._config.base;
  },

  /**
   * !#en
   * Get asset's info using path, only valid when asset is in bundle folder.
   *  
   * !#zh
   * 使用 path 获取资源的配置信息
   * 
   * @method getInfoWithPath
   * @param {string} path - The relative path of asset, such as 'images/a'
   * @param {Function} [type] - The constructor of asset, such as  `cc.Texture2D`
   * @returns {Object} The asset info 
   * 
   * @example
   * var info = bundle.getInfoWithPath('image/a', cc.Texture2D);
   * 
   * @typescript
   * getInfoWithPath (path: string, type?: typeof cc.Asset): Record<string, any>
   */
  getInfoWithPath: function getInfoWithPath(path, type) {
    return this._config.getInfoWithPath(path, type);
  },

  /**
   * !#en
   * Get all asset's info within specific folder
   * 
   * !#zh
   * 获取在某个指定文件夹下的所有资源信息
   * 
   * @method getDirWithPath
   * @param {string} path - The relative path of folder, such as 'images'
   * @param {Function} [type] - The constructor should be used to filter paths
   * @param {Array} [out] - The output array
   * @returns {Object[]} Infos
   * 
   * @example 
   * var infos = [];
   * bundle.getDirWithPath('images', cc.Texture2D, infos);
   * 
   * @typescript
   * getDirWithPath (path: string, type: typeof cc.Asset, out: Array<Record<string, any>>): Array<Record<string, any>>
   * getDirWithPath (path: string, type: typeof cc.Asset): Array<Record<string, any>>
   * getDirWithPath (path: string): Array<Record<string, any>>
   */
  getDirWithPath: function getDirWithPath(path, type, out) {
    return this._config.getDirWithPath(path, type, out);
  },

  /**
   * !#en
   * Get asset's info with uuid
   * 
   * !#zh
   * 通过 uuid 获取资源信息
   * 
   * @method getAssetInfo
   * @param {string} uuid - The asset's uuid
   * @returns {Object} info 
   * 
   * @example
   * var info = bundle.getAssetInfo('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getAssetInfo (uuid: string): Record<string, any>
   */
  getAssetInfo: function getAssetInfo(uuid) {
    return this._config.getAssetInfo(uuid);
  },

  /**
   * !#en
   * Get scene'info with name
   * 
   * !#zh
   * 通过场景名获取场景信息
   * 
   * @method getSceneInfo
   * @param {string} name - The name of scene
   * @return {Object} info
   * 
   * @example
   * var info = bundle.getSceneInfo('first.fire');
   * 
   * @typescript
   * getSceneInfo(name: string): Record<string, any>
   */
  getSceneInfo: function getSceneInfo(name) {
    return this._config.getSceneInfo(name);
  },

  /**
   * !#en
   * Initialize this bundle with options
   * 
   * !#zh
   * 初始化此 bundle
   * 
   * @method init
   * @param {Object} options 
   * 
   * @typescript
   * init(options: Record<string, any>): void
   */
  init: function init(options) {
    this._config.init(options);

    bundles.add(options.name, this);
  },

  /**
   * !#en
   * Load the asset within this bundle by the path which is relative to bundle's path
   * 
   * !#zh
   * 通过相对路径加载分包中的资源。路径是相对分包文件夹路径的相对路径
   *
   * @method load
   * @param {String|String[]} paths - Paths of the target assets.The path is relative to the bundle's folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {RequestItem} onProgress.item - The finished request item.
   * @param {Function} [onComplete] - Callback invoked when all assets loaded.
   * @param {Error} onComplete.error - The error info or null if loaded successfully.
   * @param {Asset|Asset[]} onComplete.assets - The loaded assets.
   *
   * @example
   * // load the texture (${project}/assets/resources/textures/background.jpg) from resources
   * cc.resources.load('textures/background', cc.Texture2D, (err, texture) => console.log(err));
   * 
   * // load the audio (${project}/assets/resources/music/hit.mp3) from resources
   * cc.resources.load('music/hit', cc.AudioClip, (err, audio) => console.log(err));
   * 
   * // load the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
   * bundle1.load('misc/character/cocos', cc.Prefab, (err, prefab) => console.log(err));
   *
   * // load the sprite frame (${project}/assets/some/xxx/bundle2/imgs/cocos.png) from bundle2 folder
   * bundle2.load('imgs/cocos', cc.SpriteFrame, null, (err, spriteFrame) => console.log(err));
   * 
   * @typescript
   * load<T extends cc.Asset>(paths: string|string[], type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], type: typeof cc.Asset, onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], type: typeof cc.Asset): void
   * load<T extends cc.Asset>(paths: string|string[]): void
   */
  load: function load(paths, type, onProgress, onComplete) {
    var _parseLoadResArgs = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs.type,
        onProgress = _parseLoadResArgs.onProgress,
        onComplete = _parseLoadResArgs.onComplete;

    cc.assetManager.loadAny(paths, {
      __requestType__: RequestType.PATH,
      type: type,
      bundle: this.name,
      __outputAsArray__: Array.isArray(paths)
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Preload the asset within this bundle by the path which is relative to bundle's path. 
   * After calling this method, you still need to finish loading by calling `Bundle.load`.
   * It will be totally fine to call `Bundle.load` at any time even if the preloading is not
   * yet finished
   * 
   * !#zh
   * 通过相对路径预加载分包中的资源。路径是相对分包文件夹路径的相对路径。调用完后，你仍然需要通过 `Bundle.load` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.load`。
   *
   * @method preload
   * @param {String|String[]} paths - Paths of the target asset.The path is relative to bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {RequestItem} onProgress.item - The finished request item.
   * @param {Function} [onComplete] - Callback invoked when the resource loaded.
   * @param {Error} onComplete.error - The error info or null if loaded successfully.
   * @param {RequestItem[]} onComplete.items - The preloaded items.
   * 
   * @example
   * // preload the texture (${project}/assets/resources/textures/background.jpg) from resources
   * cc.resources.preload('textures/background', cc.Texture2D);
   * 
   * // preload the audio (${project}/assets/resources/music/hit.mp3) from resources
   * cc.resources.preload('music/hit', cc.AudioClip);
   * // wait for while
   * cc.resources.load('music/hit', cc.AudioClip, (err, audioClip) => {});
   * 
   * * // preload the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
   * bundle1.preload('misc/character/cocos', cc.Prefab);
   *
   * // load the sprite frame of (${project}/assets/bundle2/imgs/cocos.png) from bundle2 folder
   * bundle2.preload('imgs/cocos', cc.SpriteFrame);
   * // wait for while
   * bundle2.load('imgs/cocos', cc.SpriteFrame, (err, spriteFrame) => {});
   * 
   * @typescript
   * preload(paths: string|string[], type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], type: typeof cc.Asset, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], type: typeof cc.Asset): void
   * preload(paths: string|string[], onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[]): void
   */
  preload: function preload(paths, type, onProgress, onComplete) {
    var _parseLoadResArgs2 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs2.type,
        onProgress = _parseLoadResArgs2.onProgress,
        onComplete = _parseLoadResArgs2.onComplete;

    cc.assetManager.preloadAny(paths, {
      __requestType__: RequestType.PATH,
      type: type,
      bundle: this.name
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Load all assets under a folder inside the bundle folder.<br>
   * <br>
   * Note: All asset paths in Creator use forward slashes, paths using backslashes will not work.
   * 
   * !#zh
   * 加载目标文件夹中的所有资源, 注意：路径中只能使用斜杠，反斜杠将停止工作
   *
   * @method loadDir
   * @param {string} dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} onComplete.error - If one of the asset failed, the complete callback is immediately called with the error. If all assets are loaded successfully, error will be null.
   * @param {Asset[]|Asset} onComplete.assets - An array of all loaded assets.
   * 
   * @example
   * // load all audios (resources/audios/) 
   * cc.resources.loadDir('audios', cc.AudioClip, (err, audios) => {});
   *
   * // load all textures in "resources/imgs/"
   * cc.resources.loadDir('imgs', cc.Texture2D, null, function (err, textures) {
   *     var texture1 = textures[0];
   *     var texture2 = textures[1];
   * });
   * 
   * // load all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
   * bundle1.loadDir('misc/characters', cc.Prefab, (err, prefabs) => console.log(err));
   *
   * // load all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
   * bundle2.loadDir('skills', cc.SpriteFrame, null, (err, spriteFrames) => console.log(err));
   *
   * @typescript
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset): void
   * loadDir<T extends cc.Asset>(dir: string, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string): void
   */
  loadDir: function loadDir(dir, type, onProgress, onComplete) {
    var _parseLoadResArgs3 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs3.type,
        onProgress = _parseLoadResArgs3.onProgress,
        onComplete = _parseLoadResArgs3.onComplete;

    cc.assetManager.loadAny(dir, {
      __requestType__: RequestType.DIR,
      type: type,
      bundle: this.name,
      __outputAsArray__: true
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Preload all assets under a folder inside the bundle folder.<br> After calling this method, you still need to finish loading by calling `Bundle.loadDir`.
   * It will be totally fine to call `Bundle.loadDir` at any time even if the preloading is not yet finished
   * 
   * !#zh
   * 预加载目标文件夹中的所有资源。调用完后，你仍然需要通过 `Bundle.loadDir` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.loadDir`。
   *
   * @method preloadDir
   * @param {string} dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be preloaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} onComplete.error - If one of the asset failed, the complete callback is immediately called with the error. If all assets are preloaded successfully, error will be null.
   * @param {RequestItem[]} onComplete.items - An array of all preloaded items.
   * 
   * @example
   * // preload all audios (resources/audios/) 
   * cc.resources.preloadDir('audios', cc.AudioClip);
   *
   * // preload all textures in "resources/imgs/"
   * cc.resources.preloadDir('imgs', cc.Texture2D);
   * // wait for while
   * cc.resources.loadDir('imgs', cc.Texture2D, (err, textures) => {});
   * 
   * // preload all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
   * bundle1.preloadDir('misc/characters', cc.Prefab);
   *
   * // preload all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
   * bundle2.preloadDir('skills', cc.SpriteFrame);
   * // wait for while
   * bundle2.loadDir('skills', cc.SpriteFrame, (err, spriteFrames) => {});
   *                                             
   * @typescript
   * preloadDir(dir: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, type: typeof cc.Asset, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, type: typeof cc.Asset): void
   * preloadDir(dir: string, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string): void
   */
  preloadDir: function preloadDir(dir, type, onProgress, onComplete) {
    var _parseLoadResArgs4 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs4.type,
        onProgress = _parseLoadResArgs4.onProgress,
        onComplete = _parseLoadResArgs4.onComplete;

    cc.assetManager.preloadAny(dir, {
      __requestType__: RequestType.DIR,
      type: type,
      bundle: this.name
    }, onProgress, onComplete);
  },

  /**
   * !#en 
   * Loads the scene within this bundle by its name.  
   * 
   * !#zh 
   * 通过场景名称加载分包中的场景。
   *
   * @method loadScene
   * @param {String} sceneName - The name of the scene to load.
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - callback, will be called after scene launched.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {SceneAsset} onComplete.sceneAsset - The scene asset
   * 
   * @example
   * bundle1.loadScene('first', (err, sceneAsset) => cc.director.runScene(sceneAsset));
   * 
   * @typescript
   * loadScene(sceneName: string, options: Record<string, any>, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, options: Record<string, any>, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, options: Record<string, any>): void
   * loadScene(sceneName: string): void
   */
  loadScene: function loadScene(sceneName, options, onProgress, onComplete) {
    var _parseParameters = parseParameters(options, onProgress, onComplete),
        options = _parseParameters.options,
        onProgress = _parseParameters.onProgress,
        onComplete = _parseParameters.onComplete;

    options.preset = options.preset || 'scene';
    options.bundle = this.name;
    cc.assetManager.loadAny({
      'scene': sceneName
    }, options, onProgress, function (err, sceneAsset) {
      if (err) {
        cc.error(err.message, err.stack);
        onComplete && onComplete(err);
      } else if (sceneAsset instanceof cc.SceneAsset) {
        var scene = sceneAsset.scene;
        scene._id = sceneAsset._uuid;
        scene._name = sceneAsset._name;
        onComplete && onComplete(null, sceneAsset);
      } else {
        onComplete && onComplete(new Error('The asset ' + sceneAsset._uuid + ' is not a scene'));
      }
    });
  },

  /**
   * !#en
   * Preloads the scene within this bundle by its name. After calling this method, you still need to finish loading by calling `Bundle.loadScene` or `cc.director.loadScene`.
   * It will be totally fine to call `Bundle.loadDir` at any time even if the preloading is not yet finished
   * 
   * !#zh 
   * 通过场景名称预加载分包中的场景.调用完后，你仍然需要通过 `Bundle.loadScene` 或 `cc.director.loadScene` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.loadScene` 或 `cc.director.loadScene`。
   *
   * @method preloadScene
   * @param {String} sceneName - The name of the scene to preload.
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onProgress] - callback, will be called when the load progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed
   * @param {Number} onProgress.total - The total number of the items
   * @param {RequestItem} onProgress.item The latest request item
   * @param {Function} [onComplete] - callback, will be called after scene loaded.
   * @param {Error} onComplete.error - null or the error object.
   * 
   * @example
   * bundle1.preloadScene('first');
   * // wait for a while
   * bundle1.loadScene('first', (err, scene) => cc.director.runScene(scene));
   * 
   * @typescript
   * preloadScene(sceneName: string, options: Record<string, any>, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, options: Record<string, any>, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, options: Record<string, any>): void
   * preloadScene(sceneName: string): void
   */
  preloadScene: function preloadScene(sceneName, options, onProgress, onComplete) {
    var _parseParameters2 = parseParameters(options, onProgress, onComplete),
        options = _parseParameters2.options,
        onProgress = _parseParameters2.onProgress,
        onComplete = _parseParameters2.onComplete;

    options.bundle = this.name;
    cc.assetManager.preloadAny({
      'scene': sceneName
    }, options, onProgress, function (err) {
      if (err) {
        cc.errorID(1210, sceneName, err.message);
      }

      onComplete && onComplete(err);
    });
  },

  /**
   * !#en
   * Get asset within this bundle by path and type. <br>
   * After you load asset with {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}},
   * you can acquire them by passing the path to this API.
   * 
   * !#zh
   * 通过路径与类型获取资源。在你使用 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 之后，
   * 你能通过传路径通过这个 API 获取到这些资源。
   * 
   * @method get
   * @param {String} path - The path of asset
   * @param {Function} [type] - Only asset of type will be returned if this argument is supplied.
   * @returns {Asset} 
   * 
   * @example
   * bundle1.get('music/hit', cc.AudioClip);
   * 
   * @typescript
   * get<T extends cc.Asset> (path: string, type?: typeof cc.Asset): T
   */
  get: function get(path, type) {
    var info = this.getInfoWithPath(path, type);
    return assets.get(info && info.uuid);
  },

  /**
   * !#en 
   * Release the asset loaded by {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} and it's dependencies. 
   * Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放通过 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 加载的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   * 
   * @method release
   * @param {String} path - The path of asset
   * @param {Function} [type] - Only asset of type will be released if this argument is supplied.
   * 
   * @example
   * // release a texture which is no longer need
   * bundle1.release('misc/character/cocos');
   *
   * @typescript
   * release(path: string, type: typeof cc.Asset): void
   * release(path: string): void
   */
  release: function release(path, type) {
    releaseManager.tryRelease(this.get(path, type), true);
  },

  /**
   * !#en 
   * Release all unused assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放此包中的所有没有用到的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
   *
   * @method releaseUnusedAssets
   * @private
   * 
   * @example
   * // release all unused asset within bundle1
   * bundle1.releaseUnusedAssets();
   * 
   * @typescript
   * releaseUnusedAssets(): void
   */
  releaseUnusedAssets: function releaseUnusedAssets() {
    var self = this;
    assets.forEach(function (asset) {
      var info = self.getAssetInfo(asset._uuid);

      if (info && !info.redirect) {
        releaseManager.tryRelease(asset);
      }
    });
  },

  /**
   * !#en 
   * Release all assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放此包中的所有资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
   *
   * @method releaseAll
   * 
   * @example
   * // release all asset within bundle1
   * bundle1.releaseAll();
   * 
   * @typescript
   * releaseAll(): void
   */
  releaseAll: function releaseAll() {
    var self = this;
    assets.forEach(function (asset) {
      var info = self.getAssetInfo(asset._uuid);

      if (info && !info.redirect) {
        releaseManager.tryRelease(asset, true);
      }
    });
  },
  _destroy: function _destroy() {
    this._config.destroy();
  }
};
module.exports = Bundle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvYnVuZGxlLmpzIl0sIm5hbWVzIjpbIkNvbmZpZyIsInJlcXVpcmUiLCJyZWxlYXNlTWFuYWdlciIsInBhcnNlUGFyYW1ldGVycyIsInBhcnNlTG9hZFJlc0FyZ3MiLCJSZXF1ZXN0VHlwZSIsImFzc2V0cyIsImJ1bmRsZXMiLCJCdW5kbGUiLCJfY29uZmlnIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZGVwcyIsImJhc2UiLCJnZXRJbmZvV2l0aFBhdGgiLCJwYXRoIiwidHlwZSIsImdldERpcldpdGhQYXRoIiwib3V0IiwiZ2V0QXNzZXRJbmZvIiwidXVpZCIsImdldFNjZW5lSW5mbyIsImluaXQiLCJvcHRpb25zIiwiYWRkIiwibG9hZCIsInBhdGhzIiwib25Qcm9ncmVzcyIsIm9uQ29tcGxldGUiLCJjYyIsImFzc2V0TWFuYWdlciIsImxvYWRBbnkiLCJfX3JlcXVlc3RUeXBlX18iLCJQQVRIIiwiYnVuZGxlIiwiX19vdXRwdXRBc0FycmF5X18iLCJBcnJheSIsImlzQXJyYXkiLCJwcmVsb2FkIiwicHJlbG9hZEFueSIsImxvYWREaXIiLCJkaXIiLCJESVIiLCJwcmVsb2FkRGlyIiwibG9hZFNjZW5lIiwic2NlbmVOYW1lIiwicHJlc2V0IiwiZXJyIiwic2NlbmVBc3NldCIsImVycm9yIiwibWVzc2FnZSIsInN0YWNrIiwiU2NlbmVBc3NldCIsInNjZW5lIiwiX2lkIiwiX3V1aWQiLCJfbmFtZSIsIkVycm9yIiwicHJlbG9hZFNjZW5lIiwiZXJyb3JJRCIsImdldCIsImluZm8iLCJyZWxlYXNlIiwidHJ5UmVsZWFzZSIsInJlbGVhc2VVbnVzZWRBc3NldHMiLCJzZWxmIiwiZm9yRWFjaCIsImFzc2V0IiwicmVkaXJlY3QiLCJyZWxlYXNlQWxsIiwiX2Rlc3Ryb3kiLCJkZXN0cm95IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztB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LENBQW5CO0FBcWpCQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEUsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuY29uc3QgcmVsZWFzZU1hbmFnZXIgPSByZXF1aXJlKCcuL3JlbGVhc2VNYW5hZ2VyJyk7XG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycywgcGFyc2VMb2FkUmVzQXJncyB9ID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcbmNvbnN0IHsgUmVxdWVzdFR5cGUsIGFzc2V0cywgYnVuZGxlcyB9ID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxuICovXG5cbi8qKlxuICogISNlblxuICogQSBidW5kbGUgY29udGFpbnMgYW4gYW1vdW50IG9mIGFzc2V0cyhpbmNsdWRlcyBzY2VuZSksIHlvdSBjYW4gbG9hZCwgcHJlbG9hZCwgcmVsZWFzZSBhc3NldCB3aGljaCBpcyBpbiB0aGlzIGJ1bmRsZVxuICogXG4gKiAhI3poXG4gKiDkuIDkuKrljIXlkKvkuIDlrprmlbDph4/otYTmupDvvIjljIXmi6zlnLrmma/vvInnmoTljIXvvIzkvaDlj6/ku6XliqDovb3vvIzpooTliqDovb3vvIzph4rmlL7mraTljIXlhoXnmoTotYTmupBcbiAqIFxuICogQGNsYXNzIEJ1bmRsZVxuICovXG5mdW5jdGlvbiBCdW5kbGUgKCkge1xuICAgIHRoaXMuX2NvbmZpZyA9IG5ldyBDb25maWcoKTtcbn1cblxuQnVuZGxlLnByb3RvdHlwZSA9IHtcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ3JlYXRlIGEgYnVuZGxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWIm+W7uuS4gOS4qiBidW5kbGVcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb25zdHJ1Y3RvcigpXG4gICAgICovXG4gICAgY29uc3RydWN0b3I6IEJ1bmRsZSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGJ1bmRsZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmraQgYnVuZGxlIOeahOWQjeensFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgbmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcubmFtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBkZXBlbmRlbmN5IG9mIHRoaXMgYnVuZGxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOatpCBidW5kbGUg55qE5L6d6LWWXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGRlcHNcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICovXG4gICAgZ2V0IGRlcHMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlcHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgcm9vdCBwYXRoIG9mIHRoaXMgYnVuZGxlLCBzdWNoIGxpa2UgJ2h0dHA6Ly9leGFtcGxlLmNvbS9idW5kbGUxJ1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmraQgYnVuZGxlIOeahOaguei3r+W+hCwg5L6L5aaCICdodHRwOi8vZXhhbXBsZS5jb20vYnVuZGxlMSdcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgYmFzZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IGJhc2UgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmJhc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgYXNzZXQncyBpbmZvIHVzaW5nIHBhdGgsIG9ubHkgdmFsaWQgd2hlbiBhc3NldCBpcyBpbiBidW5kbGUgZm9sZGVyLlxuICAgICAqICBcbiAgICAgKiAhI3poXG4gICAgICog5L2/55SoIHBhdGgg6I635Y+W6LWE5rqQ55qE6YWN572u5L+h5oGvXG4gICAgICogXG4gICAgICogQG1ldGhvZCBnZXRJbmZvV2l0aFBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSByZWxhdGl2ZSBwYXRoIG9mIGFzc2V0LCBzdWNoIGFzICdpbWFnZXMvYSdcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBUaGUgY29uc3RydWN0b3Igb2YgYXNzZXQsIHN1Y2ggYXMgIGBjYy5UZXh0dXJlMkRgXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIGFzc2V0IGluZm8gXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgaW5mbyA9IGJ1bmRsZS5nZXRJbmZvV2l0aFBhdGgoJ2ltYWdlL2EnLCBjYy5UZXh0dXJlMkQpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0SW5mb1dpdGhQYXRoIChwYXRoOiBzdHJpbmcsIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gICAgICovXG4gICAgZ2V0SW5mb1dpdGhQYXRoIChwYXRoLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZ2V0SW5mb1dpdGhQYXRoKHBhdGgsIHR5cGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IGFsbCBhc3NldCdzIGluZm8gd2l0aGluIHNwZWNpZmljIGZvbGRlclxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blnKjmn5DkuKrmjIflrprmlofku7blpLnkuIvnmoTmiYDmnInotYTmupDkv6Hmga9cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldERpcldpdGhQYXRoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcmVsYXRpdmUgcGF0aCBvZiBmb2xkZXIsIHN1Y2ggYXMgJ2ltYWdlcydcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBUaGUgY29uc3RydWN0b3Igc2hvdWxkIGJlIHVzZWQgdG8gZmlsdGVyIHBhdGhzXG4gICAgICogQHBhcmFtIHtBcnJheX0gW291dF0gLSBUaGUgb3V0cHV0IGFycmF5XG4gICAgICogQHJldHVybnMge09iamVjdFtdfSBJbmZvc1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlIFxuICAgICAqIHZhciBpbmZvcyA9IFtdO1xuICAgICAqIGJ1bmRsZS5nZXREaXJXaXRoUGF0aCgnaW1hZ2VzJywgY2MuVGV4dHVyZTJELCBpbmZvcyk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXREaXJXaXRoUGF0aCAocGF0aDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG91dDogQXJyYXk8UmVjb3JkPHN0cmluZywgYW55Pj4pOiBBcnJheTxSZWNvcmQ8c3RyaW5nLCBhbnk+PlxuICAgICAqIGdldERpcldpdGhQYXRoIChwYXRoOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+XG4gICAgICogZ2V0RGlyV2l0aFBhdGggKHBhdGg6IHN0cmluZyk6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+XG4gICAgICovXG4gICAgZ2V0RGlyV2l0aFBhdGggKHBhdGgsIHR5cGUsIG91dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmdldERpcldpdGhQYXRoKHBhdGgsIHR5cGUsIG91dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgYXNzZXQncyBpbmZvIHdpdGggdXVpZFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4cgdXVpZCDojrflj5botYTmupDkv6Hmga9cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldEFzc2V0SW5mb1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVGhlIGFzc2V0J3MgdXVpZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGluZm8gXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgaW5mbyA9IGJ1bmRsZS5nZXRBc3NldEluZm8oJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldEFzc2V0SW5mbyAodXVpZDogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgYW55PlxuICAgICAqL1xuICAgIGdldEFzc2V0SW5mbyAodXVpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmdldEFzc2V0SW5mbyh1dWlkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCBzY2VuZSdpbmZvIHdpdGggbmFtZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4flnLrmma/lkI3ojrflj5blnLrmma/kv6Hmga9cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldFNjZW5lSW5mb1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2Ygc2NlbmVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluZm9cbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBpbmZvID0gYnVuZGxlLmdldFNjZW5lSW5mbygnZmlyc3QuZmlyZScpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0U2NlbmVJbmZvKG5hbWU6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgICAgKi9cbiAgICBnZXRTY2VuZUluZm8gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5nZXRTY2VuZUluZm8obmFtZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJbml0aWFsaXplIHRoaXMgYnVuZGxlIHdpdGggb3B0aW9uc1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliJ3lp4vljJbmraQgYnVuZGxlXG4gICAgICogXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbml0KG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXG4gICAgICovXG4gICAgaW5pdCAob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9jb25maWcuaW5pdChvcHRpb25zKTtcbiAgICAgICAgYnVuZGxlcy5hZGQob3B0aW9ucy5uYW1lLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIExvYWQgdGhlIGFzc2V0IHdpdGhpbiB0aGlzIGJ1bmRsZSBieSB0aGUgcGF0aCB3aGljaCBpcyByZWxhdGl2ZSB0byBidW5kbGUncyBwYXRoXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmAmui/h+ebuOWvuei3r+W+hOWKoOi9veWIhuWMheS4reeahOi1hOa6kOOAgui3r+W+hOaYr+ebuOWvueWIhuWMheaWh+S7tuWkuei3r+W+hOeahOebuOWvuei3r+W+hFxuICAgICAqXG4gICAgICogQG1ldGhvZCBsb2FkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8U3RyaW5nW119IHBhdGhzIC0gUGF0aHMgb2YgdGhlIHRhcmdldCBhc3NldHMuVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhlIGJ1bmRsZSdzIGZvbGRlciwgZXh0ZW5zaW9ucyBtdXN0IGJlIG9taXR0ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHByb2dyZXNzaW9uIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2ggLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW19IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBmaW5pc2hlZCByZXF1ZXN0IGl0ZW0uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGFsbCBhc3NldHMgbG9hZGVkLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyb3IgLSBUaGUgZXJyb3IgaW5mbyBvciBudWxsIGlmIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICogQHBhcmFtIHtBc3NldHxBc3NldFtdfSBvbkNvbXBsZXRlLmFzc2V0cyAtIFRoZSBsb2FkZWQgYXNzZXRzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBsb2FkIHRoZSB0ZXh0dXJlICgke3Byb2plY3R9L2Fzc2V0cy9yZXNvdXJjZXMvdGV4dHVyZXMvYmFja2dyb3VuZC5qcGcpIGZyb20gcmVzb3VyY2VzXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWQoJ3RleHR1cmVzL2JhY2tncm91bmQnLCBjYy5UZXh0dXJlMkQsIChlcnIsIHRleHR1cmUpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIC8vIGxvYWQgdGhlIGF1ZGlvICgke3Byb2plY3R9L2Fzc2V0cy9yZXNvdXJjZXMvbXVzaWMvaGl0Lm1wMykgZnJvbSByZXNvdXJjZXNcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZCgnbXVzaWMvaGl0JywgY2MuQXVkaW9DbGlwLCAoZXJyLCBhdWRpbykgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogXG4gICAgICogLy8gbG9hZCB0aGUgcHJlZmFiICgke3Byb2plY3R9L2Fzc2V0cy9idW5kbGUxL21pc2MvY2hhcmFjdGVyL2NvY29zKSBmcm9tIGJ1bmRsZTEgZm9sZGVyXG4gICAgICogYnVuZGxlMS5sb2FkKCdtaXNjL2NoYXJhY3Rlci9jb2NvcycsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFiKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKlxuICAgICAqIC8vIGxvYWQgdGhlIHNwcml0ZSBmcmFtZSAoJHtwcm9qZWN0fS9hc3NldHMvc29tZS94eHgvYnVuZGxlMi9pbWdzL2NvY29zLnBuZykgZnJvbSBidW5kbGUyIGZvbGRlclxuICAgICAqIGJ1bmRsZTIubG9hZCgnaW1ncy9jb2NvcycsIGNjLlNwcml0ZUZyYW1lLCBudWxsLCAoZXJyLCBzcHJpdGVGcmFtZSkgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsb2FkPFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IFR8QXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogVHxBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkPFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IFR8QXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogVHxBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkPFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZFxuICAgICAqIGxvYWQ8VCBleHRlbmRzIGNjLkFzc2V0PihwYXRoczogc3RyaW5nfHN0cmluZ1tdKTogdm9pZFxuICAgICAqL1xuICAgIGxvYWQgKHBhdGhzLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlTG9hZFJlc0FyZ3ModHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHBhdGhzLCB7IF9fcmVxdWVzdFR5cGVfXzogUmVxdWVzdFR5cGUuUEFUSCwgdHlwZTogdHlwZSwgYnVuZGxlOiB0aGlzLm5hbWUsIF9fb3V0cHV0QXNBcnJheV9fOiBBcnJheS5pc0FycmF5KHBhdGhzKSB9LCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFByZWxvYWQgdGhlIGFzc2V0IHdpdGhpbiB0aGlzIGJ1bmRsZSBieSB0aGUgcGF0aCB3aGljaCBpcyByZWxhdGl2ZSB0byBidW5kbGUncyBwYXRoLiBcbiAgICAgKiBBZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kLCB5b3Ugc3RpbGwgbmVlZCB0byBmaW5pc2ggbG9hZGluZyBieSBjYWxsaW5nIGBCdW5kbGUubG9hZGAuXG4gICAgICogSXQgd2lsbCBiZSB0b3RhbGx5IGZpbmUgdG8gY2FsbCBgQnVuZGxlLmxvYWRgIGF0IGFueSB0aW1lIGV2ZW4gaWYgdGhlIHByZWxvYWRpbmcgaXMgbm90XG4gICAgICogeWV0IGZpbmlzaGVkXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmAmui/h+ebuOWvuei3r+W+hOmihOWKoOi9veWIhuWMheS4reeahOi1hOa6kOOAgui3r+W+hOaYr+ebuOWvueWIhuWMheaWh+S7tuWkuei3r+W+hOeahOebuOWvuei3r+W+hOOAguiwg+eUqOWujOWQju+8jOS9oOS7jeeEtumcgOimgemAmui/hyBgQnVuZGxlLmxvYWRgIOadpeWujOaIkOWKoOi9veOAglxuICAgICAqIOWwseeul+mihOWKoOi9vei/mOayoeWujOaIkO+8jOS9oOS5n+WPr+S7peebtOaOpeiwg+eUqCBgQnVuZGxlLmxvYWRg44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHByZWxvYWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xTdHJpbmdbXX0gcGF0aHMgLSBQYXRocyBvZiB0aGUgdGFyZ2V0IGFzc2V0LlRoZSBwYXRoIGlzIHJlbGF0aXZlIHRvIGJ1bmRsZSBmb2xkZXIsIGV4dGVuc2lvbnMgbXVzdCBiZSBvbWl0dGVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIE9ubHkgYXNzZXQgb2YgdHlwZSB3aWxsIGJlIGxvYWRlZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvblByb2dyZXNzXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtcy5cbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtfSBvblByb2dyZXNzLml0ZW0gLSBUaGUgZmluaXNoZWQgcmVxdWVzdCBpdGVtLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiB0aGUgcmVzb3VyY2UgbG9hZGVkLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyb3IgLSBUaGUgZXJyb3IgaW5mbyBvciBudWxsIGlmIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbVtdfSBvbkNvbXBsZXRlLml0ZW1zIC0gVGhlIHByZWxvYWRlZCBpdGVtcy5cbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHByZWxvYWQgdGhlIHRleHR1cmUgKCR7cHJvamVjdH0vYXNzZXRzL3Jlc291cmNlcy90ZXh0dXJlcy9iYWNrZ3JvdW5kLmpwZykgZnJvbSByZXNvdXJjZXNcbiAgICAgKiBjYy5yZXNvdXJjZXMucHJlbG9hZCgndGV4dHVyZXMvYmFja2dyb3VuZCcsIGNjLlRleHR1cmUyRCk7XG4gICAgICogXG4gICAgICogLy8gcHJlbG9hZCB0aGUgYXVkaW8gKCR7cHJvamVjdH0vYXNzZXRzL3Jlc291cmNlcy9tdXNpYy9oaXQubXAzKSBmcm9tIHJlc291cmNlc1xuICAgICAqIGNjLnJlc291cmNlcy5wcmVsb2FkKCdtdXNpYy9oaXQnLCBjYy5BdWRpb0NsaXApO1xuICAgICAqIC8vIHdhaXQgZm9yIHdoaWxlXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWQoJ211c2ljL2hpdCcsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgYXVkaW9DbGlwKSA9PiB7fSk7XG4gICAgICogXG4gICAgICogKiAvLyBwcmVsb2FkIHRoZSBwcmVmYWIgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTEvbWlzYy9jaGFyYWN0ZXIvY29jb3MpIGZyb20gYnVuZGxlMSBmb2xkZXJcbiAgICAgKiBidW5kbGUxLnByZWxvYWQoJ21pc2MvY2hhcmFjdGVyL2NvY29zJywgY2MuUHJlZmFiKTtcbiAgICAgKlxuICAgICAqIC8vIGxvYWQgdGhlIHNwcml0ZSBmcmFtZSBvZiAoJHtwcm9qZWN0fS9hc3NldHMvYnVuZGxlMi9pbWdzL2NvY29zLnBuZykgZnJvbSBidW5kbGUyIGZvbGRlclxuICAgICAqIGJ1bmRsZTIucHJlbG9hZCgnaW1ncy9jb2NvcycsIGNjLlNwcml0ZUZyYW1lKTtcbiAgICAgKiAvLyB3YWl0IGZvciB3aGlsZVxuICAgICAqIGJ1bmRsZTIubG9hZCgnaW1ncy9jb2NvcycsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcHJpdGVGcmFtZSkgPT4ge30pO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcHJlbG9hZChwYXRoczogc3RyaW5nfHN0cmluZ1tdLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgaXRlbXM6IFJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZChwYXRoczogc3RyaW5nfHN0cmluZ1tdLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZFxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgaXRlbXM6IFJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZChwYXRoczogc3RyaW5nfHN0cmluZ1tdKTogdm9pZFxuICAgICAqL1xuICAgIHByZWxvYWQgKHBhdGhzLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlTG9hZFJlc0FyZ3ModHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5wcmVsb2FkQW55KHBhdGhzLCB7IF9fcmVxdWVzdFR5cGVfXzogUmVxdWVzdFR5cGUuUEFUSCwgdHlwZTogdHlwZSwgYnVuZGxlOiB0aGlzLm5hbWUgfSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBMb2FkIGFsbCBhc3NldHMgdW5kZXIgYSBmb2xkZXIgaW5zaWRlIHRoZSBidW5kbGUgZm9sZGVyLjxicj5cbiAgICAgKiA8YnI+XG4gICAgICogTm90ZTogQWxsIGFzc2V0IHBhdGhzIGluIENyZWF0b3IgdXNlIGZvcndhcmQgc2xhc2hlcywgcGF0aHMgdXNpbmcgYmFja3NsYXNoZXMgd2lsbCBub3Qgd29yay5cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5Yqg6L2955uu5qCH5paH5Lu25aS55Lit55qE5omA5pyJ6LWE5rqQLCDms6jmhI/vvJrot6/lvoTkuK3lj6rog73kvb/nlKjmlpzmnaDvvIzlj43mlpzmnaDlsIblgZzmraLlt6XkvZxcbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZERpclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXIgLSBwYXRoIG9mIHRoZSB0YXJnZXQgZm9sZGVyLlRoZSBwYXRoIGlzIHJlbGF0aXZlIHRvIHRoZSBidW5kbGUgZm9sZGVyLCBleHRlbnNpb25zIG11c3QgYmUgb21pdHRlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSBsb2FkZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmZpbmlzaCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLnRvdGFsIC0gVGhlIHRvdGFsIG51bWJlciBvZiB0aGUgaXRlbXMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBsYXRlc3QgcmVxdWVzdCBpdGVtXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQSBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2hlbiBhbGwgYXNzZXRzIGhhdmUgYmVlbiBsb2FkZWQsIG9yIGFuIGVycm9yIG9jY3Vycy5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVycm9yIC0gSWYgb25lIG9mIHRoZSBhc3NldCBmYWlsZWQsIHRoZSBjb21wbGV0ZSBjYWxsYmFjayBpcyBpbW1lZGlhdGVseSBjYWxsZWQgd2l0aCB0aGUgZXJyb3IuIElmIGFsbCBhc3NldHMgYXJlIGxvYWRlZCBzdWNjZXNzZnVsbHksIGVycm9yIHdpbGwgYmUgbnVsbC5cbiAgICAgKiBAcGFyYW0ge0Fzc2V0W118QXNzZXR9IG9uQ29tcGxldGUuYXNzZXRzIC0gQW4gYXJyYXkgb2YgYWxsIGxvYWRlZCBhc3NldHMuXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBsb2FkIGFsbCBhdWRpb3MgKHJlc291cmNlcy9hdWRpb3MvKSBcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZERpcignYXVkaW9zJywgY2MuQXVkaW9DbGlwLCAoZXJyLCBhdWRpb3MpID0+IHt9KTtcbiAgICAgKlxuICAgICAqIC8vIGxvYWQgYWxsIHRleHR1cmVzIGluIFwicmVzb3VyY2VzL2ltZ3MvXCJcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZERpcignaW1ncycsIGNjLlRleHR1cmUyRCwgbnVsbCwgZnVuY3Rpb24gKGVyciwgdGV4dHVyZXMpIHtcbiAgICAgKiAgICAgdmFyIHRleHR1cmUxID0gdGV4dHVyZXNbMF07XG4gICAgICogICAgIHZhciB0ZXh0dXJlMiA9IHRleHR1cmVzWzFdO1xuICAgICAqIH0pO1xuICAgICAqIFxuICAgICAqIC8vIGxvYWQgYWxsIHByZWZhYnMgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTEvbWlzYy9jaGFyYWN0ZXJzLykgZnJvbSBidW5kbGUxIGZvbGRlclxuICAgICAqIGJ1bmRsZTEubG9hZERpcignbWlzYy9jaGFyYWN0ZXJzJywgY2MuUHJlZmFiLCAoZXJyLCBwcmVmYWJzKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKlxuICAgICAqIC8vIGxvYWQgYWxsIHNwcml0ZSBmcmFtZSAoJHtwcm9qZWN0fS9hc3NldHMvc29tZS94eHgvYnVuZGxlMi9za2lsbHMvKSBmcm9tIGJ1bmRsZTIgZm9sZGVyXG4gICAgICogYnVuZGxlMi5sb2FkRGlyKCdza2lsbHMnLCBjYy5TcHJpdGVGcmFtZSwgbnVsbCwgKGVyciwgc3ByaXRlRnJhbWVzKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKlxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZERpcjxUIGV4dGVuZHMgY2MuQXNzZXQ+KGRpcjogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogQXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZERpcjxUIGV4dGVuZHMgY2MuQXNzZXQ+KGRpcjogc3RyaW5nLCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IEFycmF5PFQ+KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWREaXI8VCBleHRlbmRzIGNjLkFzc2V0PihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IEFycmF5PFQ+KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWREaXI8VCBleHRlbmRzIGNjLkFzc2V0PihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZFxuICAgICAqIGxvYWREaXI8VCBleHRlbmRzIGNjLkFzc2V0PihkaXI6IHN0cmluZywgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4oZGlyOiBzdHJpbmcpOiB2b2lkXG4gICAgICovXG4gICAgbG9hZERpciAoZGlyLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlTG9hZFJlc0FyZ3ModHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KGRpciwgeyBfX3JlcXVlc3RUeXBlX186IFJlcXVlc3RUeXBlLkRJUiwgdHlwZTogdHlwZSwgYnVuZGxlOiB0aGlzLm5hbWUsIF9fb3V0cHV0QXNBcnJheV9fOiB0cnVlIH0sIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUHJlbG9hZCBhbGwgYXNzZXRzIHVuZGVyIGEgZm9sZGVyIGluc2lkZSB0aGUgYnVuZGxlIGZvbGRlci48YnI+IEFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QsIHlvdSBzdGlsbCBuZWVkIHRvIGZpbmlzaCBsb2FkaW5nIGJ5IGNhbGxpbmcgYEJ1bmRsZS5sb2FkRGlyYC5cbiAgICAgKiBJdCB3aWxsIGJlIHRvdGFsbHkgZmluZSB0byBjYWxsIGBCdW5kbGUubG9hZERpcmAgYXQgYW55IHRpbWUgZXZlbiBpZiB0aGUgcHJlbG9hZGluZyBpcyBub3QgeWV0IGZpbmlzaGVkXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmihOWKoOi9veebruagh+aWh+S7tuWkueS4reeahOaJgOaciei1hOa6kOOAguiwg+eUqOWujOWQju+8jOS9oOS7jeeEtumcgOimgemAmui/hyBgQnVuZGxlLmxvYWREaXJgIOadpeWujOaIkOWKoOi9veOAglxuICAgICAqIOWwseeul+mihOWKoOi9vei/mOayoeWujOaIkO+8jOS9oOS5n+WPr+S7peebtOaOpeiwg+eUqCBgQnVuZGxlLmxvYWREaXJg44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHByZWxvYWREaXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyIC0gcGF0aCBvZiB0aGUgdGFyZ2V0IGZvbGRlci5UaGUgcGF0aCBpcyByZWxhdGl2ZSB0byB0aGUgYnVuZGxlIGZvbGRlciwgZXh0ZW5zaW9ucyBtdXN0IGJlIG9taXR0ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgcHJlbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHByb2dyZXNzaW9uIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2ggLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvblByb2dyZXNzLml0ZW0gLSBUaGUgbGF0ZXN0IHJlcXVlc3QgaXRlbVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGFzc2V0cyBoYXZlIGJlZW4gbG9hZGVkLCBvciBhbiBlcnJvciBvY2N1cnMuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnJvciAtIElmIG9uZSBvZiB0aGUgYXNzZXQgZmFpbGVkLCB0aGUgY29tcGxldGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLiBJZiBhbGwgYXNzZXRzIGFyZSBwcmVsb2FkZWQgc3VjY2Vzc2Z1bGx5LCBlcnJvciB3aWxsIGJlIG51bGwuXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbVtdfSBvbkNvbXBsZXRlLml0ZW1zIC0gQW4gYXJyYXkgb2YgYWxsIHByZWxvYWRlZCBpdGVtcy5cbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHByZWxvYWQgYWxsIGF1ZGlvcyAocmVzb3VyY2VzL2F1ZGlvcy8pIFxuICAgICAqIGNjLnJlc291cmNlcy5wcmVsb2FkRGlyKCdhdWRpb3MnLCBjYy5BdWRpb0NsaXApO1xuICAgICAqXG4gICAgICogLy8gcHJlbG9hZCBhbGwgdGV4dHVyZXMgaW4gXCJyZXNvdXJjZXMvaW1ncy9cIlxuICAgICAqIGNjLnJlc291cmNlcy5wcmVsb2FkRGlyKCdpbWdzJywgY2MuVGV4dHVyZTJEKTtcbiAgICAgKiAvLyB3YWl0IGZvciB3aGlsZVxuICAgICAqIGNjLnJlc291cmNlcy5sb2FkRGlyKCdpbWdzJywgY2MuVGV4dHVyZTJELCAoZXJyLCB0ZXh0dXJlcykgPT4ge30pO1xuICAgICAqIFxuICAgICAqIC8vIHByZWxvYWQgYWxsIHByZWZhYnMgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTEvbWlzYy9jaGFyYWN0ZXJzLykgZnJvbSBidW5kbGUxIGZvbGRlclxuICAgICAqIGJ1bmRsZTEucHJlbG9hZERpcignbWlzYy9jaGFyYWN0ZXJzJywgY2MuUHJlZmFiKTtcbiAgICAgKlxuICAgICAqIC8vIHByZWxvYWQgYWxsIHNwcml0ZSBmcmFtZSAoJHtwcm9qZWN0fS9hc3NldHMvc29tZS94eHgvYnVuZGxlMi9za2lsbHMvKSBmcm9tIGJ1bmRsZTIgZm9sZGVyXG4gICAgICogYnVuZGxlMi5wcmVsb2FkRGlyKCdza2lsbHMnLCBjYy5TcHJpdGVGcmFtZSk7XG4gICAgICogLy8gd2FpdCBmb3Igd2hpbGVcbiAgICAgKiBidW5kbGUyLmxvYWREaXIoJ3NraWxscycsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcHJpdGVGcmFtZXMpID0+IHt9KTtcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkRGlyKGRpcjogc3RyaW5nLCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkRGlyKGRpcjogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWREaXIoZGlyOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkRGlyKGRpcjogc3RyaW5nLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkRGlyKGRpcjogc3RyaW5nKTogdm9pZFxuICAgICAqL1xuICAgIHByZWxvYWREaXIgKGRpciwgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xuICAgICAgICB2YXIgeyB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlIH0gPSBwYXJzZUxvYWRSZXNBcmdzKHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIucHJlbG9hZEFueShkaXIsIHsgX19yZXF1ZXN0VHlwZV9fOiBSZXF1ZXN0VHlwZS5ESVIsIHR5cGU6IHR5cGUsIGJ1bmRsZTogdGhpcy5uYW1lIH0sIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIExvYWRzIHRoZSBzY2VuZSB3aXRoaW4gdGhpcyBidW5kbGUgYnkgaXRzIG5hbWUuICBcbiAgICAgKiBcbiAgICAgKiAhI3poIFxuICAgICAqIOmAmui/h+WcuuaZr+WQjeensOWKoOi9veWIhuWMheS4reeahOWcuuaZr+OAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBsb2FkU2NlbmVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2NlbmVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNjZW5lIHRvIGxvYWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvblByb2dyZXNzXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtcy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Qcm9ncmVzcy5pdGVtIC0gVGhlIGxhdGVzdCByZXF1ZXN0IGl0ZW1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgc2NlbmUgbGF1bmNoZWQuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcbiAgICAgKiBAcGFyYW0ge1NjZW5lQXNzZXR9IG9uQ29tcGxldGUuc2NlbmVBc3NldCAtIFRoZSBzY2VuZSBhc3NldFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogYnVuZGxlMS5sb2FkU2NlbmUoJ2ZpcnN0JywgKGVyciwgc2NlbmVBc3NldCkgPT4gY2MuZGlyZWN0b3IucnVuU2NlbmUoc2NlbmVBc3NldCkpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBzY2VuZUFzc2V0OiBjYy5TY2VuZUFzc2V0KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgc2NlbmVBc3NldDogY2MuU2NlbmVBc3NldCkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIHNjZW5lQXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBzY2VuZUFzc2V0OiBjYy5TY2VuZUFzc2V0KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcpOiB2b2lkXG4gICAgICovXG4gICAgbG9hZFNjZW5lIChzY2VuZU5hbWUsIG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgIFxuICAgICAgICBvcHRpb25zLnByZXNldCA9IG9wdGlvbnMucHJlc2V0IHx8ICdzY2VuZSc7XG4gICAgICAgIG9wdGlvbnMuYnVuZGxlID0gdGhpcy5uYW1lO1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh7ICdzY2VuZSc6IHNjZW5lTmFtZSB9LCBvcHRpb25zLCBvblByb2dyZXNzLCBmdW5jdGlvbiAoZXJyLCBzY2VuZUFzc2V0KSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzY2VuZUFzc2V0IGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCkge1xuICAgICAgICAgICAgICAgIHZhciBzY2VuZSA9IHNjZW5lQXNzZXQuc2NlbmU7XG4gICAgICAgICAgICAgICAgc2NlbmUuX2lkID0gc2NlbmVBc3NldC5fdXVpZDtcbiAgICAgICAgICAgICAgICBzY2VuZS5fbmFtZSA9IHNjZW5lQXNzZXQuX25hbWU7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwsIHNjZW5lQXNzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG5ldyBFcnJvcignVGhlIGFzc2V0ICcgKyBzY2VuZUFzc2V0Ll91dWlkICsgJyBpcyBub3QgYSBzY2VuZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQcmVsb2FkcyB0aGUgc2NlbmUgd2l0aGluIHRoaXMgYnVuZGxlIGJ5IGl0cyBuYW1lLiBBZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kLCB5b3Ugc3RpbGwgbmVlZCB0byBmaW5pc2ggbG9hZGluZyBieSBjYWxsaW5nIGBCdW5kbGUubG9hZFNjZW5lYCBvciBgY2MuZGlyZWN0b3IubG9hZFNjZW5lYC5cbiAgICAgKiBJdCB3aWxsIGJlIHRvdGFsbHkgZmluZSB0byBjYWxsIGBCdW5kbGUubG9hZERpcmAgYXQgYW55IHRpbWUgZXZlbiBpZiB0aGUgcHJlbG9hZGluZyBpcyBub3QgeWV0IGZpbmlzaGVkXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDpgJrov4flnLrmma/lkI3np7DpooTliqDovb3liIbljIXkuK3nmoTlnLrmma8u6LCD55So5a6M5ZCO77yM5L2g5LuN54S26ZyA6KaB6YCa6L+HIGBCdW5kbGUubG9hZFNjZW5lYCDmiJYgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWAg5p2l5a6M5oiQ5Yqg6L2944CCXG4gICAgICog5bCx566X6aKE5Yqg6L296L+Y5rKh5a6M5oiQ77yM5L2g5Lmf5Y+v5Lul55u05o6l6LCD55SoIGBCdW5kbGUubG9hZFNjZW5lYCDmiJYgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWDjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgcHJlbG9hZFNjZW5lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzY2VuZSB0byBwcmVsb2FkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgbG9hZCBwcm9ncmVzc2lvbiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbX0gb25Qcm9ncmVzcy5pdGVtIFRoZSBsYXRlc3QgcmVxdWVzdCBpdGVtXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gY2FsbGJhY2ssIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHNjZW5lIGxvYWRlZC5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVycm9yIC0gbnVsbCBvciB0aGUgZXJyb3Igb2JqZWN0LlxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogYnVuZGxlMS5wcmVsb2FkU2NlbmUoJ2ZpcnN0Jyk7XG4gICAgICogLy8gd2FpdCBmb3IgYSB3aGlsZVxuICAgICAqIGJ1bmRsZTEubG9hZFNjZW5lKCdmaXJzdCcsIChlcnIsIHNjZW5lKSA9PiBjYy5kaXJlY3Rvci5ydW5TY2VuZShzY2VuZSkpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcHJlbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvcikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcpOiB2b2lkXG4gICAgICovXG4gICAgcHJlbG9hZFNjZW5lIChzY2VuZU5hbWUsIG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuXG4gICAgICAgIG9wdGlvbnMuYnVuZGxlID0gdGhpcy5uYW1lO1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIucHJlbG9hZEFueSh7J3NjZW5lJzogc2NlbmVOYW1lfSwgb3B0aW9ucywgb25Qcm9ncmVzcywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMTIxMCwgc2NlbmVOYW1lLCBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgYXNzZXQgd2l0aGluIHRoaXMgYnVuZGxlIGJ5IHBhdGggYW5kIHR5cGUuIDxicj5cbiAgICAgKiBBZnRlciB5b3UgbG9hZCBhc3NldCB3aXRoIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBvciB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZERpcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0sXG4gICAgICogeW91IGNhbiBhY3F1aXJlIHRoZW0gYnkgcGFzc2luZyB0aGUgcGF0aCB0byB0aGlzIEFQSS5cbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+H6Lev5b6E5LiO57G75Z6L6I635Y+W6LWE5rqQ44CC5Zyo5L2g5L2/55SoIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSDmiJbogIUge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWREaXI6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOS5i+WQju+8jFxuICAgICAqIOS9oOiDvemAmui/h+S8oOi3r+W+hOmAmui/h+i/meS4qiBBUEkg6I635Y+W5Yiw6L+Z5Lqb6LWE5rqQ44CCXG4gICAgICogXG4gICAgICogQG1ldGhvZCBnZXRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIG9mIGFzc2V0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgcmV0dXJuZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cbiAgICAgKiBAcmV0dXJucyB7QXNzZXR9IFxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogYnVuZGxlMS5nZXQoJ211c2ljL2hpdCcsIGNjLkF1ZGlvQ2xpcCk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXQ8VCBleHRlbmRzIGNjLkFzc2V0PiAocGF0aDogc3RyaW5nLCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0KTogVFxuICAgICAqL1xuICAgIGdldCAocGF0aCwgdHlwZSkge1xuICAgICAgICB2YXIgaW5mbyA9IHRoaXMuZ2V0SW5mb1dpdGhQYXRoKHBhdGgsIHR5cGUpO1xuICAgICAgICByZXR1cm4gYXNzZXRzLmdldChpbmZvICYmIGluZm8udXVpZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVsZWFzZSB0aGUgYXNzZXQgbG9hZGVkIGJ5IHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBvciB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZERpcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gYW5kIGl0J3MgZGVwZW5kZW5jaWVzLiBcbiAgICAgKiBSZWZlciB0byB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb25zLlxuICAgICAqIFxuICAgICAqICEjemggXG4gICAgICog6YeK5pS+6YCa6L+HIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSDmiJbogIUge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWREaXI6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOWKoOi9veeahOi1hOa6kOOAguivpue7huS/oeaBr+ivt+WPguiAgyB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcmVsZWFzZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggb2YgYXNzZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSByZWxlYXNlZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gcmVsZWFzZSBhIHRleHR1cmUgd2hpY2ggaXMgbm8gbG9uZ2VyIG5lZWRcbiAgICAgKiBidW5kbGUxLnJlbGVhc2UoJ21pc2MvY2hhcmFjdGVyL2NvY29zJyk7XG4gICAgICpcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJlbGVhc2UocGF0aDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkXG4gICAgICogcmVsZWFzZShwYXRoOiBzdHJpbmcpOiB2b2lkXG4gICAgICovXG4gICAgcmVsZWFzZSAocGF0aCwgdHlwZSkge1xuICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKHRoaXMuZ2V0KHBhdGgsIHR5cGUpLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBSZWxlYXNlIGFsbCB1bnVzZWQgYXNzZXRzIHdpdGhpbiB0aGlzIGJ1bmRsZS4gUmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDph4rmlL7mraTljIXkuK3nmoTmiYDmnInmsqHmnInnlKjliLDnmoTotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VVbnVzZWRBc3NldHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gcmVsZWFzZSBhbGwgdW51c2VkIGFzc2V0IHdpdGhpbiBidW5kbGUxXG4gICAgICogYnVuZGxlMS5yZWxlYXNlVW51c2VkQXNzZXRzKCk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWxlYXNlVW51c2VkQXNzZXRzKCk6IHZvaWRcbiAgICAgKi9cbiAgICByZWxlYXNlVW51c2VkQXNzZXRzICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgIGxldCBpbmZvID0gc2VsZi5nZXRBc3NldEluZm8oYXNzZXQuX3V1aWQpO1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgIWluZm8ucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKGFzc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVsZWFzZSBhbGwgYXNzZXRzIHdpdGhpbiB0aGlzIGJ1bmRsZS4gUmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDph4rmlL7mraTljIXkuK3nmoTmiYDmnInotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VBbGxcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHJlbGVhc2UgYWxsIGFzc2V0IHdpdGhpbiBidW5kbGUxXG4gICAgICogYnVuZGxlMS5yZWxlYXNlQWxsKCk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWxlYXNlQWxsKCk6IHZvaWRcbiAgICAgKi9cbiAgICByZWxlYXNlQWxsICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgIGxldCBpbmZvID0gc2VsZi5nZXRBc3NldEluZm8oYXNzZXQuX3V1aWQpO1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgIWluZm8ucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKGFzc2V0LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9kZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlc3Ryb3koKTtcbiAgICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQnVuZGxlOyJdLCJzb3VyY2VSb290IjoiLyJ9